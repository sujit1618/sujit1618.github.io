function getLocation(){
    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');

  mapLink.href = '';
  mapLink.textContent = '';

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log('Latitutde: ',latitude);
    console.log('Longitude',longitude);
    status.textContent = '';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;

    postData(latitude,longitude);
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if(!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

function postData(lat,long) {
    console.log(lat,' ',long);
    let url = 'https://api.sheety.co/b5451f2c22c91b7055c9c9714d070461/test1Sheets/sheet1';
    let body = {
        sheet1: {
            text: 'falalala more',
            latValue: lat,
            longValue: long
        }
    };
    let website = 'https://maps.google.com/maps?q='+lat+',%20'+long; //https://maps.google.com/maps?q=1%20Grafton%20Street,%20Dublin,%20Ireland
    document.getElementById('map').src=website;
    // let headers = new Headers();
	// headers.set('content-type', 'application/json');
    // fetch(url, {
            // method: 'POST',
            // body: JSON.stringify(body),
            // headers: headers
        // })
        // .then((response) => response.json())
        // .then(json => {
            // console.log(json);
        // });
}

function getData() {
    let url = 'https://api.sheety.co/b5451f2c22c91b7055c9c9714d070461/test1Sheets/sheet1';
    fetch(url)
        .then((response) => response.json())
        .then(json => {
            // Do something with the data
            console.log(json.sheet1[0]);
        });
}