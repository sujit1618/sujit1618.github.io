let homeLat = 0;
let homeLong = 0;
let staffName = '';
let employmentCode = '';

window.addEventListener('DOMContentLoaded', userAction);


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

function userAction(){
    const routeUrl = 'http://dev.virtualearth.net/REST/v1/Routes?';
    let wayPoint = {
        1:{
            latitude: '28.521145',
            longitude: '77.1626807'
        },
        2:{
            latitude: '28.5018069',
            longitude: '77.1677462'
        },
        3:{
            latitude: '28.498021',
            longitude: '77.1592888'
        },
        4:{
            latitude: '28.4903814',
            longitude: '77.1404989'
        }
    };
    let optimize = 'optimize = timeWithTraffic';
    let optimizeWaypoints= 'optimizeWaypoints=true';
    let maxSolns = 'maxSolns=3';
    let key = 'key = AkVBUWL3G_-bC_ig5TLrGLMjgrd4Yh2-1Ur1lAmb-v240gu3h6jI9RoKGcPua1kQ';

    console.log(wayPoint.id(1));

    // 'wayPoint.1={wayPoint1}&viaWaypoint.2={viaWaypoint2}&waypoint.3={waypoint3}&wayPoint.n={waypointN}&heading={heading}&optimize={optimize}&avoid={avoid}&distanceBeforeFirstTurn={distanceBeforeFirstTurn}&routeAttributes={routeAttributes}&timeType={timeType}&dateTime={dateTime}&maxSolutions={maxSolutions}&tolerances={tolerances}&distanceUnit={distanceUnit}&key={BingMapsKey}'
    // const response = await fetch(routeUrl, {
    //   method: 'POST',
    //   body: JSON.stringify(waypoints), // string or object
    //   headers: {
        // 'Content-Type': 'application/json'
    //   }
    // });
    // const myJson = await response.json(); //extract JSON from the http response
    // console.log(myJson);
  }