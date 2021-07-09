let newLat = '';
let newLong = '';
let busRouteNumber = '';
let schedule = '';
let busStopName = '';
let dateTime;
let url = 'https://api.sheety.co/6be24607ea458614398f92bf55d8da84/busRoutes/sheet1';

window.addEventListener('DOMContentLoaded', homeLocation);

function route(div) {
    busRouteNumber = div.innerHTML;
    console.log('Bus Route Chosen: ' + busRouteNumber);
    document.getElementById('bus-route-menu').style.display = 'none';
    document.getElementById('bus-route-label').innerHTML = busRouteNumber;
    document.getElementById('bus-route-button').style.backgroundColor = '#D5F8B7';

    document.getElementById('bus-route-error').style.color = 'darkgreen';
    document.getElementById('bus-route-error').innerHTML = 'Saved';

    let i = busRouteNumber.charAt(busRouteNumber.length - 2) + busRouteNumber.charAt(busRouteNumber.length - 1);
    console.log(i);
    showStop(i);
}

function showStop(i) {
    document.getElementById('route01').style.display = 'none';
    document.getElementById('route03').style.display = 'none';
    document.getElementById('route04').style.display = 'none';
    document.getElementById('route07').style.display = 'none';
    document.getElementById('route08').style.display = 'none';
    document.getElementById('route09').style.display = 'none';
    document.getElementById('route17').style.display = 'none';
    document.getElementById('route19').style.display = 'none';
    document.getElementById('route20').style.display = 'none';
    document.getElementById('route21').style.display = 'none';
    document.getElementById('route22').style.display = 'none';
    document.getElementById('route23').style.display = 'none';
    document.getElementById('route24').style.display = 'none';
    document.getElementById('route B').style.display = 'none';
    document.getElementById('route C').style.display = 'none';
    document.getElementById('route E').style.display = 'none';
    document.getElementById('route I').style.display = 'none';
    let showRoute = 'route' + i;
    document.getElementById(showRoute).style.display = 'block';
}

function busStop(div) {
    busStopName = div.innerHTML;
    console.log('Bus Stop Chosen: ' + busStopName);
    document.getElementById('bus-stop-menu').style.display = 'none';
    document.getElementById('bus-stop-label').innerHTML = busStopName;
    document.getElementById('bus-stop-button').style.backgroundColor = '#D5F8B7';

    document.getElementById('bus-stop-error').style.color = 'darkgreen';
    document.getElementById('bus-stop-error').innerHTML = 'Saved';
}

function tod(div) {
    schedule = div.innerHTML;
    console.log('Schedule Chosen: ' + schedule);
    document.getElementById('morning-afternoon-menu').style.display = 'none';
    document.getElementById('tod-label').innerHTML = schedule;
    document.getElementById('morning-afternoon-button').style.backgroundColor = '#D5F8B7';

    document.getElementById('tod-error').style.color = 'darkgreen';
    document.getElementById('tod-error').innerHTML = 'Saved';
}

function busRouteMenu() {

    if (document.getElementById('bus-route-menu').style.display === 'none') {
        document.getElementById('bus-route-menu').style.display = 'block';
    } else {
        document.getElementById('bus-route-menu').style.display = 'none';
    }
    document.getElementById('morning-afternoon-menu').style.display = 'none';
    document.getElementById('bus-stop-menu').style.display = 'none';
}

function todMenu() {
    if (document.getElementById('morning-afternoon-menu').style.display === 'none') {
        document.getElementById('morning-afternoon-menu').style.display = 'block';
    } else {
        document.getElementById('morning-afternoon-menu').style.display = 'none';
    }
    document.getElementById('bus-route-menu').style.display = 'none';
    document.getElementById('bus-stop-menu').style.display = 'none';
}

function busStopMenu() {
    if (document.getElementById('bus-stop-menu').style.display === 'none') {
        document.getElementById('bus-stop-menu').style.display = 'block';
    } else {
        document.getElementById('bus-stop-menu').style.display = 'none';
    }
    document.getElementById('bus-route-menu').style.display = 'none';
    document.getElementById('morning-afternoon-menu').style.display = 'none';
}

function hideAllMenus() {
    document.getElementById('bus-stop-menu').style.display = 'none';
    document.getElementById('bus-route-menu').style.display = 'none';
    document.getElementById('morning-afternoon-menu').style.display = 'none';
}


function homeLocation() {
    document.getElementById('bus-route-menu').style.display = 'none';
    document.getElementById('morning-afternoon-menu').style.display = 'none';
    document.getElementById('bus-stop-menu').style.display = 'none';

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

    if (busRouteNumber === '') {
        document.getElementById('bus-route-error').innerHTML = 'This field is required';
        document.getElementById('bus-route-error').style.color = 'tomato';
    }
    if (schedule === '') {
        document.getElementById('tod-error').innerHTML = "This field is required";
        document.getElementById('tod-error').style.color = 'tomato';
    }
    if (busStopName === '') {
        document.getElementById('bus-stop-error').innerHTML = "This field is required";
        document.getElementById('bus-stop-error').style.color = 'tomato';
    }

    if (newLat === '') {
        document.getElementById('but-9').innerHTML = 'Please Enable GPS Location and click on Whatsapp link again';
        document.getElementById('but-9').style.backgroundColor = '#555';
        console.log('GPS not working');
    }

    if (busRouteNumber !== '' && schedule !== '' && busStopName !== '' && newLat !== '') {


        let body = {
            sheet1: {
                recordDate,
                recordTime,
                busRouteNumber,
                busStopName,
                schedule,
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

        document.getElementById('screen1').style.display = "none";
        document.getElementById('screen10').style.display = "block";

    }

    


}