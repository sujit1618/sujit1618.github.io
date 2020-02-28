//Written with love by Sujit Joshi- www.sujitjoshi.me

//spreadsheet link- https://docs.google.com/spreadsheets/d/1qsBf8xvP98dHtfVLfY3CbJwmwojH_Z5wmUc0a0nyT2c/edit#gid=0

// G-Sheet reference:
// Device_name	Device_ID	User_number	Event_1_count	Event_1_timestamp	Event_1_lat	Event_1_lon	Event_1_duration_start	Event_1_duration_end	Event_1_duration	Event_1_duration_lat	Event_1_duration_lon	Event_2_count	Event_2_timestamp	Event_2_lat	Event_2_lon	Event_2_duration_start	Event_2_duration_end	Event_2_duration	Event_2_duration_lat	Event_2_duration_lon		Referenced	Current_time	random_1	random_2	lon	lat	blanks

//chicago center

let fps = 30;
let drawCount = 0;
let sheetRefreshSeconds = 60;
let sheetDownloadCount = 0;

let baseLat = 41.8748070; // Chicago Latitude
let baseLon = -87.625219; // Chicago Longitude

let baseLatNorth = 41.887767;
let baseLatSouth = 41.861846;

let baseLonWest = -87.637190;
let baseLonEast = -87.613248

let lonRemap = 0.1 * baseLon / baseLat; //Remapping factor

let canvasX = 400; //canvas size X
let canvasY = 400; //canvas size Y

var data = new Array(200); //Re-storing json in this

var event1PosX = new Array(200);
var event1PosY = new Array(200);

var event2PosX = new Array(200);
var event2PosY = new Array(200);

//-------- Housekeeping variables start----------

let test = 0;

//----------Housekeeping variables end -------------



function setup() {
  createCanvas(vw(100), vh(100), WEBGL);
  frameRate(fps);
  downloadSheet();
  noFill();
  background(0);
}


function draw() {
  background(0);
  let east = (baseLon - baseLonEast)*10^6;
  let west = (baseLon - baseLonWest)*10^6;
  let north = (baseLon - baseLatNorth)*10^6;
  let south = (baseLon - baseLatSouth)*10^6;
for(let i=0;i<10;i++){
  fill(255);
  stroke(0,145,255);
  ellipse(100,100,event1Lat(i),event2Lat(i))
}
  console.log("East difference= ",east);
  console.log("West difference= ",west);
  console.log("north difference= ",north);
  console.log("south difference= ",south);

  scheduledMaintenance();//keep last, manages downloads and reloads
}



//--------- declare kelele custom functions ----------
//====================================================


function scheduledMaintenance() { //function to periodically trigger downloads and reloads, prevents google from limiting update rate on G-sheets
  drawCount++;
  console.log("drawCount", drawCount);
  if (drawCount >= fps * sheetRefreshSeconds) {
    downloadSheet();
    drawCount = 0;
  }

  console.log("sheetDownloadCount", sheetDownloadCount);
  if (sheetDownloadCount >= 10) {
    location.reload();
  }

}

function downloadSheet() { //downloads the latest version of G-Sheet

  console.log("downloading sheet");

  Tabletop.init({
    key: 'https://docs.google.com/spreadsheets/d/1qsBf8xvP98dHtfVLfY3CbJwmwojH_Z5wmUc0a0nyT2c/edit#gid=0',
    callback: gotData,
    simpleSheet: true
  });
  sheetDownloadCount = sheetDownloadCount + 1;
  console.log("sheet downloaded");
}

function gotData(stuff, tabletop) { //function which works inside update loop
  data = stuff;

  test = Number(data[199].Device_ID);
  console.log(test);
  console.log("Current file timestamp", data[6].Current_time); //update timestamp of GSheet file
  console.log(millis() / 1000, "seconds since page refresh");
}


//------------ data functions -----------

function deviceName(i) {
  if (test > 0) {
    let bucket = Number(data[i].Device_name);
    console.log("Device_name", bucket);
    return bucket;
  }
}

function deviceID(i) {
  if (test > 0) {
    let bucket = Number(data[i].Device_ID);
    console.log("Device_ID", bucket);
    return bucket;
  }
}

function userNumber(i) {
  if (test > 0) {
    let bucket = Number(data[i].User_number);
    console.log(bucket);
    return bucket;
  }
}

function event1Count(i) {
  if (test > 0) {
    let bucket = Number(data[i].Event_1_count);
    console.log(bucket);
    return bucket;
  }
}

function event1Lat(i) {
  if (test > 0) {
    let bucket = Number(data[i].Event_1_lat);
    console.log(bucket);
    return bucket;
  }
}

function event1Lon(i) {
  if (test > 0) {
    let bucket = Number(data[i].Event_1_lon);
    console.log(bucket);
    return bucket;
  }
}

function event1Duration(i) {
  if (test > 0) {
    let bucket = Number(data[i].Event_1_duration);
    console.log(bucket);
    return bucket;
  }
}

function event1DurationLat(i) {
  if (test > 0) {
    let bucket = Number(data[i].Event_1_duration_lat);
    console.log(bucket);
    return bucket;
  }
}

function event1DurationLon(i) {
  if (test > 0) {
    let bucket = Number(data[i].Event_1_duration_lon);
    console.log(bucket);
    return bucket;
  }
}

function event2Count(i) {
  if (test > 0) {
    let bucket = Number(data[i].Event_2_count);
    console.log(bucket);
    return bucket;
  }
}

function event2Lat(i) {
  if (test > 0) {
    let bucket = Number(data[i].Event_2_lat);
    console.log(bucket);
    return bucket;
  }
}

function event2Lon(i) {
  if (test > 0) {
    let bucket = Number(data[i].Event_2_lon);
    console.log(bucket);
    return bucket;
  }
}

function event2Duration(i) {
  if (test > 0) {
    let bucket = Number(data[i].Event_2_duration);
    console.log(bucket);
    return bucket;
  }
}

function event2DurationLat(i) {
  if (test > 0) {
    let bucket = Number(data[i].Event_2_duration_lat);
    console.log(bucket);
    return bucket;
  }
}

function event2DurationLon(i) {
  if (test > 0) {
    let bucket = Number(data[i].Event_2_duration_lon);
    console.log(bucket);
    return bucket;
  }
}


//--------- animationiey functions go here ---------------

function positions() {
  for (let i = 0; i < 200; i++) {

    event1posX[i] = canvasX / 2 + 60000 * lonRemap * (baseLon - event1lon[i]); //longitudes change according to X axis
    event1PosY[i] = canvasY / 2 + 10000 * (baseLat - event1lat[i]); //latitudes change according to Y axis
    magEvent1[i] = event1count[i];

    ellipse(event1posX[i], event1PosY[i], magEvent1[i], magEvent1[i]); //x,y,diaX,diaY

  }
}

//---------- viewport related functions go here------------

function vh(v) {
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (v * h) / 100;
}

function vw(v) {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return (v * w) / 100;
}
