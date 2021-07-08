let newLat = 0;
let newLong = 0;
let busRouteNumber = '';
let schedule = '';
let busStopName = '';
let dateTime;
let url = 'https://api.sheety.co/6be24607ea458614398f92bf55d8da84/busRoutes/sheet1';



window.addEventListener('DOMContentLoaded', homeLocation);


function homeLocation() {

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const today = new Date();
        const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        // const dateAndTime = date + ' ' + time;

        homeBucket(latitude, longitude, date, time);
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

}

function homeBucket(lat, long, date, time) {
    newLat = String(lat);
    newLong = String(long);
    recordDate = date;
    recordTime = time;
    console.log(newLat, newLong, recordDate, recordTime);
    // document.getElementById('h1').innerHTML = lat + ',' + long;
}

function submitData() {

    busRouteNumber = document.getElementById('busRouteNumber').value;
    schedule = document.getElementById('schedule').value;
    busStopName = document.getElementById('busStopName').value;

    if (busRouteNumber === '') {
        document.getElementById('busRouteNumber').placeholder = "This field is required";
    }
    if (schedule === '') {
        document.getElementById('schedule').placeholder = "This field is required";
    }
    if (busStopName === '') {
        document.getElementById('busStopName').placeholder = "This field is required";
    }

    if (busRouteNumber !== '' && schedule !== '' && busStopName !== '') {
        document.getElementById('screen1').style.display = "none";
        document.getElementById('screen10').style.display = "block";
        
        let body = {
            sheet1: {
                recordDate,
                recordTime,
                busRouteNumber,
                schedule,
                busStopName,
                newLat,
                newLong
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


}