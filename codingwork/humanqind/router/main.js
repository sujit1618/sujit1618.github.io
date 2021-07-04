let homeLat = 0;
let homeLong = 0;
let vanLat = 0;
let vanLong = 0;
let studentName = '';
let admissionNumber = '';


function loadScreen2() {
    studentName = document.getElementById('studentName').value;
    admissionNumber = document.getElementById('admissionNumber').value;
    if (studentName === '') {
        document.getElementById('studentName').placeholder = "This field is required";
    }
    if (admissionNumber === '') {
        document.getElementById('admissionNumber').placeholder = "This field is required";
    }
    if (admissionNumber !== '' && studentName !== '') {
        document.getElementById('screen1').style.display = "none";
        document.getElementById('screen2').style.display = "block";
        console.log(studentName, admissionNumber);
    }

}
// function loadScreen2(){
// studentName = document.getElementById('studentName').value;
// admissionNumber = document.getElementById('admissionNumber').value;  
// document.getElementById('screen1').style.display="none";
// document.getElementById('screen2').style.display="block";
// }

function loadScreen3() {
    document.getElementById('screen2').style.display = "none";
    document.getElementById('screen3').style.display = "block";
}

function homeLocation() {

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        homeBucket(latitude, longitude);
    }

    function error() {
        status.textContent = 'Unable to retrieve your location';
    }

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
    } else {
        status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
    document.getElementById('but-3').innerHTML = 'Please click again in 5 seconds';
    if (homeLat > 1) {
        document.getElementById('screen3').style.display = "none";
        document.getElementById('screen4').style.display = "block";
    }

}

function homeBucket(lat, long) {
    homeLat = lat;
    homeLong = long;
    console.log(homeLat, homeLong);
}

function loadScreen5() {
    document.getElementById('screen4').style.display = "none";
    document.getElementById('screen5').style.display = "block";
    console.log(homeLat, homeLong);
}

function vanUsagePage() {
    let vanUsage = document.querySelector('input[name="van-travel"]:checked').value;
    if (vanUsage === 'yes') {
        document.getElementById('screen5').style.display = "none";
        document.getElementById('screen6').style.display = "block";
    } else if (vanUsage === 'no') {
        document.getElementById('screen5').style.display = "none";
        document.getElementById('screen9').style.display = "block";
    }
}

function loadScreen7() {
    document.getElementById('screen6').style.display = "none";
    document.getElementById('screen7').style.display = "block";
}

function vanLocation() {

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        vanBucket(latitude, longitude);
    }

    function error() {
        status.textContent = 'Unable to retrieve your location';
    }

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
    } else {
        status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
    document.getElementById('but-7').innerHTML = 'Please click again in 5 seconds';
    if (vanLat > 1) {
        document.getElementById('screen7').style.display = "none";
        document.getElementById('screen8').style.display = "block";
    }

}

function vanBucket(lat, long) {
    vanLat = lat;
    vanLong = long;
    console.log(vanLat, vanLong);
}

function loadScreen9() {
    document.getElementById('screen8').style.display = "none";
    document.getElementById('screen9').style.display = "block";
    console.log(vanLat, vanLong);
}

function loadScreen10() {
    
    let url = 'https://api.sheety.co/6be24607ea458614398f92bf55d8da84/juniorWing/sheet1';
    document.getElementById('screen9').style.display = "none";
    document.getElementById('screen10').style.display = "block";
    let body = {
        sheet1: {
            studentName,
            admissionNumber,
            homeLat,
            homeLong,
            vanLat,
            vanLong,
        }
    };
    console.log(body);

    let headers = new Headers();
    headers.set('content-type', 'application/json');
    fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: headers
        })
        .then((response) => response.json())
        .then(json => {
            console.log(json);
        });
}