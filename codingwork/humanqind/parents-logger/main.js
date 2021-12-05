let homeLat = '';
let homeLong = '';
let studentName = '';
let admissionNumber = '';
let divisionName = '';
let className = '';
let body;
let errors;


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



function busRouteMenu() {

    if (document.getElementById('bus-route-menu').style.display === 'none') {
        document.getElementById('bus-route-menu').style.display = 'block';
    } else {
        document.getElementById('bus-route-menu').style.display = 'none';
    }
    document.getElementById('division-menu').style.display = 'none';
}

function route(div) {
    className = div.innerHTML;
    console.log('class chosen: ' + className);
    document.getElementById('bus-route-menu').style.display = 'none';
    document.getElementById('bus-route-label').innerHTML = className;
    document.getElementById('bus-route-button').style.backgroundColor = '#D5F8B7';

    document.getElementById('bus-route-error').style.color = 'darkgreen';
    document.getElementById('bus-route-error').innerHTML = 'Saved';
}


function division(div) {
    divisionName = div.innerHTML;
    console.log('Division Chosen: ' + divisionName);
    document.getElementById('division-menu').style.display = 'none';
    document.getElementById('division-label').innerHTML = divisionName;
    document.getElementById('division-button').style.backgroundColor = '#D5F8B7';

    document.getElementById('division-error').style.color = 'darkgreen';
    document.getElementById('division-error').innerHTML = 'Saved';
}

function divisionMenu() {

    if (document.getElementById('division-menu').style.display === 'none') {
        document.getElementById('division-menu').style.display = 'block';
    } else {
        document.getElementById('division-menu').style.display = 'none';
    }
}

function loadScreen10() {
    
    // let url = 'https://api.sheety.co/ce8c8894a7547b3bcc22ebdaed462b14/davvkSchoolAddress/sheet1';
    let url = 'https://api.sheety.co/ce8c8894a7547b3bcc22ebdaed462b14/davvkSurveyDec21/sheet1';
    document.getElementById('screen9').style.display = "none";
    document.getElementById('screen10').style.display = "block";
    body = {
        sheet1: {
            className,
            divisionName,
            studentName,
            admissionNumber,
            homeLat,
            homeLong
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
            document.getElementById('dataStatus').innerHTML='Data Submitted Successfully';
            document.getElementById('submittedDataText').innerHTML='Data Submitted For:';
            document.getElementById('classNameData').innerHTML='Class: '+json.sheet1.className;
            document.getElementById('DivisionNameData').innerHTML='Division: '+json.sheet1.divisionName;
            document.getElementById('studentNameData').innerHTML='Student: '+json.sheet1.studentName;
            document.getElementById('admissionNumberData').innerHTML='Adm. No.: '+json.sheet1.admissionNumber;
            document.getElementById('closeWindowtext').innerHTML=' Thank you! You may close this window.';


            // <p id="classNameData"></p>
            // <p id="DivisionNameData"></p>
            // <p id="studentNameData"></p>
            // <p id="AdmissionNumberData"></p>

            console.log(json);
        });
}