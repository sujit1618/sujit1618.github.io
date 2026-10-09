// This event listener waits for the entire HTML document, including all scripts and stylesheets, to be fully loaded and parsed.
window.addEventListener('load', () => {
    // --- DOM Element References ---
    // Get a reference to the A-Frame scene DOM element.
    const sceneEl = document.querySelector('a-scene');
    // Get a reference to the loading screen div.
    const loadingScreen = document.getElementById('loading-screen');
    // Get a reference to the text element within the loading screen.
    const loaderText = document.getElementById('loader-text');
    // Get a reference to the A-Frame <a-box> element that will represent the occlusion cube.
    const occlusionCube = document.getElementById('occlusion-cube');

    // --- State Variables ---
    // This will hold the loaded TensorFlow.js COCO-SSD model. Initialized to null.
    let model = null;
    // This will hold the HTML <video> element that streams the camera feed for TensorFlow.js processing.
    let videoForTf = null;
    // This will hold a reference to the AR.js system, useful for accessing AR.js specific functionalities.
    let arSystem;

    // --- Configuration Constants ---
    // Defines the class name of the object we want to detect (e.g., 'cup', 'person', 'car').
    // This must match one of the classes the COCO-SSD model is trained to recognize.
    const TARGET_OBJECT_CLASS = 'cup';
    // Sets the minimum confidence score (between 0 and 1) for a detection to be considered valid.
    // A higher value means more certainty but might miss some objects.
    const DETECTION_CONFIDENCE_THRESHOLD = 0.6;
    // An assumption about the real-world height of the target object in meters (e.g., 0.1m = 10cm for a cup).
    // This is a CRUCIAL parameter for estimating the distance to the object. Accuracy here directly impacts position.
    const ASSUMED_OBJECT_REAL_HEIGHT_METERS = 0.1;
    // The vertical Field of View (FOV) of the camera in degrees.
    // A-Frame's default perspective camera FOV is 50 degrees. This is used in distance calculation.
    // If the actual device camera FOV is known, using that value would be more accurate.
    const CAMERA_FOV_DEGREES = 50;


    // --- Event Listener for AR.js Video Initialization ---
    // AR.js emits the 'arjs-video-loaded' event when it has successfully initialized the camera
    // and the video stream is available.
    sceneEl.addEventListener('arjs-video-loaded', (event) => {
        console.log('AR.js video element is ready:', event.detail.video);
        // `event.detail.video` provides the actual <video> DOM element AR.js is using.
        videoForTf = event.detail.video;
        // Setting 'crossorigin' to 'anonymous' can be important if the video stream or model
        // were to be loaded from a different origin, to avoid CORS issues with canvas/TF.js.
        videoForTf.setAttribute('crossorigin', 'anonymous');
        // 'playsinline' and 'webkit-playsinline' are important for ensuring video plays directly
        // within the page on iOS devices, rather than defaulting to fullscreen.
        videoForTf.setAttribute('playsinline', '');
        videoForTf.setAttribute('webkit-playsinline', '');

        // Although AR.js should handle playing the video, this is a safeguard.
        if (videoForTf.paused) {
            videoForTf.play().catch(e => console.error("Error playing video:", e));
        }

        // Get a reference to the AR.js system component for potential advanced interactions.
        arSystem = sceneEl.systems.arjs;
        // Now that the video is ready, proceed to load the TensorFlow.js model.
        loadTensorFlowModel();
    });

    // --- Event Listener for A-Frame Scene Loaded ---
    // This event fires when the A-Frame scene and its initial entities are fully parsed and initialized.
    sceneEl.addEventListener('loaded', () => {
        console.log("A-Frame scene fully loaded.");
        // Note: At this point, AR.js might not have finished initializing the video.
        // That's why `arjs-video-loaded` is the primary trigger for starting model loading.
    });


    // --- Function to Load TensorFlow.js Model ---
    async function loadTensorFlowModel() {
        loaderText.innerText = 'Loading AI Model (COCO-SSD Lite)...';
        console.log('Loading COCO-SSD model...');
        try {
            // `cocoSsd.load()` is an asynchronous function that loads the COCO-SSD model.
            // We specify `{ base: 'lite_mobilenet_v2' }` to use a smaller, faster version of the model,
            // which is better suited for real-time performance on mobile devices.
            model = await cocoSsd.load({ base: 'lite_mobilenet_v2' });
            console.log('COCO-SSD model loaded.');
            loaderText.innerText = 'AI Model Loaded. Starting Detection...';
            // Hide the loading screen now that the model is ready.
            loadingScreen.style.display = 'none';

            // Ensure the video has enough data to start processing.
            // `readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA` (value 4) means enough data is available to start playback.
            if (videoForTf.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
                detectFrame(); // Start the detection loop.
            } else {
                // If not enough data yet, wait for the 'loadeddata' event on the video element.
                videoForTf.onloadeddata = () => {
                    console.log("Video data loaded, starting detection.")
                    detectFrame(); // Start the detection loop once data is available.
                };
            }

        } catch (err) {
            console.error('Failed to load model or start detection:', err);
            loaderText.innerText = 'Error loading AI model. Please try refreshing.';
            alert('Error loading AI model: ' + err.message); // Show an alert to the user.
        }
    }

    // --- Main Detection Loop Function ---
    // This function is called repeatedly using `requestAnimationFrame` to process video frames.
    async function detectFrame() {
        // Pre-conditions: Check if the model is loaded and the video is ready and playing.
        if (!model || !videoForTf || videoForTf.paused || videoForTf.ended || videoForTf.readyState < HTMLMediaElement.HAVE_METADATA) {
            // If not ready, request the next animation frame and try again.
            // `HAVE_METADATA` (value 1) means metadata (like dimensions) is available.
            requestAnimationFrame(detectFrame);
            return; // Exit the function for this frame.
        }

        try {
            // `model.detect(videoForTf)` performs object detection on the current video frame.
            // It returns an array of prediction objects.
            const predictions = await model.detect(videoForTf);
            let objectFound = false; // Flag to track if the target object was found in this frame.

            // Iterate through all detected objects in the current frame.
            for (let i = 0; i < predictions.length; i++) {
                const prediction = predictions[i];
                // Check if the detected object's class matches our target and its confidence score is above the threshold.
                if (prediction.class === TARGET_OBJECT_CLASS && prediction.score >= DETECTION_CONFIDENCE_THRESHOLD) {
                    objectFound = true; // Set flag to true.

                    // `prediction.bbox` contains the bounding box of the detected object: [x, y, width, height] in pixels.
                    const [bboxX, bboxY, bboxWidth, bboxHeight] = prediction.bbox;

                    // --- Simplified 3D Position Estimation ---
                    // This section attempts to convert the 2D bounding box into an approximate 3D world position.

                    // Get the actual current dimensions of the video feed.
                    const videoWidth = videoForTf.videoWidth;
                    const videoHeight = videoForTf.videoHeight;

                    // 1. Calculate Normalized Device Coordinates (NDC) for the center of the bounding box.
                    // NDC ranges from -1 to +1 for both X and Y axes.
                    // (0,0) is the center of the screen. X positive is right, Y positive is up.
                    const centerXNormalized = (bboxX + bboxWidth / 2) / videoWidth * 2 - 1;
                    // Y-coordinate in pixel space is typically top-to-bottom, but NDC Y is bottom-to-top, so it's inverted.
                    const centerYNormalized = -((bboxY + bboxHeight / 2) / videoHeight * 2 - 1);

                    // 2. Estimate the distance (Z-coordinate) to the object.
                    // This is a simplified approach using the object's known real-world height, its perceived
                    // height in pixels (bboxHeight), and the camera's vertical Field of View (VFOV).
                    // The formula is derived from principles of similar triangles and camera perspective.
                    // Distance = (RealObjectHeight * FocalLengthInPixels) / PerceivedObjectHeightInPixels
                    // Where FocalLengthInPixels = (VideoHeightInPixels / 2) / tan(VFOV_radians / 2)

                    const cameraEntity = document.querySelector('a-camera'); // Get the A-Frame camera entity.
                    const threeJsCamera = cameraEntity.getObject3D('camera'); // Get the underlying THREE.js PerspectiveCamera.

                    // Use the actual FOV from the THREE.js camera object if available, otherwise use the configured default.
                    // A-Frame camera FOV is vertical.
                    const vfov_rad = THREE.MathUtils.degToRad(threeJsCamera.fov || CAMERA_FOV_DEGREES);

                    // Calculate distance. Ensure bboxHeight is not zero to prevent division by zero.
                    let distance = ASSUMED_OBJECT_REAL_HEIGHT_METERS; // Default distance if bboxHeight is 0
                    if (bboxHeight > 0) {
                        distance = (ASSUMED_OBJECT_REAL_HEIGHT_METERS * videoHeight) / (2 * bboxHeight * Math.tan(vfov_rad / 2));
                    }
                    // Clamp the calculated distance to a reasonable range (e.g., 0.2m to 10m) to avoid extreme values.
                    distance = Math.max(0.2, Math.min(distance, 10));

                    // 3. Unproject NDC coordinates and the estimated distance to a 3D point in A-Frame's world space.
                    // Create a 3D vector with the NDC (x,y) and a z-value of 0.5 (representing the middle of the view frustum).
                    const vector = new THREE.Vector3(centerXNormalized, centerYNormalized, 0.5);
                    // `unproject(camera)` converts this 2D screen point (with depth info) into a 3D point in world space.
                    // It essentially casts a ray from the camera through that screen point.
                    vector.unproject(threeJsCamera);

                    // The unprojected vector is a point on the view frustum. To get the final world position at the
                    // estimated 'distance', we calculate a direction vector from the camera to this unprojected point,
                    // normalize it, and then scale it by the 'distance'.
                    const direction = vector.sub(threeJsCamera.position).normalize();
                    const worldPosition = new THREE.Vector3().copy(threeJsCamera.position).add(direction.multiplyScalar(distance));

                    // Update the A-Frame cube's 'position' attribute with the calculated 3D world coordinates.
                    occlusionCube.setAttribute('position', worldPosition);

                    // 4. Estimate the scale of the cube to roughly match the detected object's real-world size.
                    // The cube's height should directly correspond to `ASSUMED_OBJECT_REAL_HEIGHT_METERS`.
                    const cubeHeight = ASSUMED_OBJECT_REAL_HEIGHT_METERS;
                    // Estimate the object's real-world width based on its bounding box aspect ratio and its known height.
                    const estimatedObjectRealWidth = (bboxWidth / bboxHeight) * ASSUMED_OBJECT_REAL_HEIGHT_METERS;
                    const cubeWidth = estimatedObjectRealWidth > 0 ? estimatedObjectRealWidth : ASSUMED_OBJECT_REAL_HEIGHT_METERS * 0.75; // Fallback if bboxHeight is 0
                    // Make the cube's depth proportional, often a bit less than width/height for cup-like objects.
                    const cubeDepth = Math.min(cubeWidth, cubeHeight) * 0.8;

                    // Update the A-Frame cube's 'scale' attribute.
                    occlusionCube.setAttribute('scale', `${cubeWidth} ${cubeHeight} ${cubeDepth}`);
                    // Make the cube visible since the object is detected.
                    occlusionCube.setAttribute('visible', 'true');

                    // Once the target object is found and processed, break out of the loop for this frame.
                    // This processes only the first detected instance of the target object.
                    break;
                }
            }

            // If the target object was not found in this frame, make the cube invisible.
            if (!objectFound) {
                occlusionCube.setAttribute('visible', 'false');
            }

        } catch (error) {
            console.error("Error during detection:", error);
            // In case of an error during detection, hide the cube as a precaution.
            occlusionCube.setAttribute('visible', 'false');
        }

        // Request the next animation frame to continue the detection loop.
        // This creates a recursive loop that processes frames as fast as the browser can render them.
        requestAnimationFrame(detectFrame);
    }

    // --- Fallback Camera Setup (Currently mostly disabled in favor of AR.js handling) ---
    // This function was intended as a backup if AR.js failed to provide a video stream.
    // It uses `navigator.mediaDevices.getUserMedia` directly.
    function setupFallbackCamera() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment', // Prefer the rear-facing camera.
                    width: { ideal: 640 },    // Request a preferred resolution.
                    height: { ideal: 480 }
                }
            })
            .then(stream => {
                console.log("Fallback camera stream obtained.");
                const tempVideo = document.createElement('video'); // Create a new video element.
                tempVideo.setAttribute('autoplay', '');
                tempVideo.setAttribute('playsinline', '');
                tempVideo.setAttribute('webkit-playsinline', '');
                tempVideo.srcObject = stream; // Assign the camera stream to the video element.
                tempVideo.style.display = 'none'; // Keep this video element hidden from the user.
                document.body.appendChild(tempVideo); // Add to DOM for it to play.

                tempVideo.onloadedmetadata = () => {
                    console.log("Fallback video metadata loaded.");
                    videoForTf = tempVideo; // Use this video for TensorFlow.js.
                    videoForTf.play().catch(e => console.error("Error playing fallback video:", e));
                    loadTensorFlowModel(); // Load the model now that fallback video is ready.
                };
            })
            .catch(err => {
                console.error("Fallback camera error: ", err);
                loaderText.innerText = 'Could not access camera. Please check permissions.';
                alert("Could not access camera. Please ensure permissions are granted and no other app is using it.");
            });
        } else {
            loaderText.innerText = 'Camera API not supported by this browser.';
            alert('getUserMedia API not supported.');
        }
    }

    // --- Initial Check for AR.js Video Availability ---
    // This attempts to find the video element that AR.js might have already set up,
    // especially if the `app.js` script execution was deferred or AR.js initialized very quickly.
    const existingVideo = document.querySelector('video[arjs-video="true"]');
    if (existingVideo && existingVideo.readyState >= 2) { // `readyState >= 2` (HAVE_CURRENT_DATA)
        console.log('AR.js video already exists and has data.');
        videoForTf = existingVideo;
        videoForTf.setAttribute('crossorigin', 'anonymous');
        videoForTf.setAttribute('playsinline', '');
        videoForTf.setAttribute('webkit-playsinline', '');
        arSystem = sceneEl.systems.arjs;
        loadTensorFlowModel(); // Proceed to load the model.
    } else if (!sceneEl.hasLoaded) {
        // If the A-Frame scene itself hasn't loaded yet, it's normal that AR.js video isn't ready.
        // The 'arjs-video-loaded' event listener set up earlier will handle initialization.
        console.log("Scene not loaded, waiting for A-Frame and AR.js events.");
    } else {
        // If the scene has loaded but the AR.js video event hasn't fired and no existing video is found,
        // it might indicate an issue with AR.js initialization.
        console.warn("AR.js video not detected promptly after scene load. AR.js might have issues or be slow.");
        // A timeout could be used here to trigger a fallback, but it's generally better to rely on AR.js events.
        // The current implementation prioritizes the `arjs-video-loaded` event.
        setTimeout(() => {
            if (!videoForTf) {
                // This condition means that after 3 seconds, the `arjs-video-loaded` event hasn't fired
                // and no AR.js video element was found initially.
                console.error("AR.js did not initialize the video source correctly after timeout.");
                // setupFallbackCamera(); // Could enable this as a last resort.
                loaderText.innerText = 'Problem initializing AR. Please refresh the page.';
                // Avoid calling setupFallbackCamera if AR.js *did* create a video but it's just not ready,
                // as that could lead to multiple camera access requests or conflicts.
            }
        }, 3000); // Wait for 3 seconds.
    }
});