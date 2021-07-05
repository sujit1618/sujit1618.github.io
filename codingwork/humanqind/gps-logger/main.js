

let homeLat = 0;
let homeLong = 0;
let staffName = '';
let employmentCode = '';

window.addEventListener('DOMContentLoaded',homeLocation);

function loadScreen2() {
    staffName = document.getElementById('staffName').value;
    employmentCode = document.getElementById('employmentCode').value;
    if (staffName === '') {
        document.getElementById('staffName').placeholder = "This field is required";
    }
    if (employmentCode === '') {
        document.getElementById('staffName').placeholder = "This field is required";
    }
    if (employmentCode !== '' && staffName !== '') {
        document.getElementById('screen1').style.display = "none";
        document.getElementById('screen2').style.display = "block";
        console.log(staffName, employmentCode);
    }

}
// function loadScreen2(){
// staffName = document.getElementById('staffName').value;
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
    document.getElementById('h1').innerHTML=lat+','+long;
}

function loadScreen9() {
    document.getElementById('screen4').style.display = "none";
    document.getElementById('screen9').style.display = "block";
}

function loadScreen10() {
    
    let url = 'https://api.sheety.co/6be24607ea458614398f92bf55d8da84/staff/sheet1';
    document.getElementById('screen9').style.display = "none";
    document.getElementById('screen10').style.display = "block";
    let body = {
        sheet1: {
            staffName,
            employmentCode,
            homeLat,
            homeLong,
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