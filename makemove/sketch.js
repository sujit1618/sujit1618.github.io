//Written with love by Sujit Joshi- www.sujitjoshi.me

//spreadsheet link- https://docs.google.com/spreadsheets/d/1qsBf8xvP98dHtfVLfY3CbJwmwojH_Z5wmUc0a0nyT2c/edit#gid=0

// Device_name	Device_ID	User_number	Event_1_count	Event_1_timestamp	Event_1_lat	Event_1_lon	Event_1_duration_start	Event_1_duration_end	Event_1_duration	Event_1_duration_lat	Event_1_duration_lon	Event_2_count	Event_2_timestamp	Event_2_lat	Event_2_lon	Event_2_duration_start	Event_2_duration_end	Event_2_duration	Event_2_duration_lat	Event_2_duration_lon		Referenced	Current_time	random_1	random_2	lon	lat	blanks

//chicago center

let fps = 30;
let drawCount = 0;
let sheetRefreshSeconds = 30;
let sheetDownloadCount = 0;

let baseLat = 41.8748065; // Chicago Latitude
let baseLon = -87.625219; // Chicago Longitude

let lonRemap = 0.1 * baseLon / baseLat; //Remapping factor

let canvasX = 400; //canvas size X
let canvasY = 400; //canvas size Y

var data = new Array(200); //Re-storing json in this

var event1PosX = new Array(200);
var event1PosY = new Array(200);

var event2PosX = new Array(200);
var event2PosY = new Array(200);

//-------- Housekeeping variables start----------

let a=0;
let deviceID;
/*
var userNumber = new Array(200);

var event1count = new Array(200);
var event2count = new Array(200);

var event1lat = new Array(200);
var event2lat = new Array(200);

var event1lon = new Array(200);
var event2lon = new Array(200);

var event1Duration = new Array(200);
var event2Duration = new Array(200);

var event1DurationLat = new Array(200);
var event2DurationLat = new Array(200);

var event1DurationLon = new Array(200);
var event2DurationLon = new Array(200);
*/
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

  if (a>0){
  console.log (Number(data[100].Device_ID));
  //return Number(data[i].Device_ID);
  }


  scheduledMaintenance();
}



//--------- declare kelele custom functions ----------



function scheduledMaintenance() {//function to periodically trigger downloads and reloads, prevents google from limiting update rate on G-sheets
  drawCount++;
  if (drawCount >= fps * sheetRefreshSeconds) {
    downloadSheet();
    drawCount = 0;
  }

  if (sheetDownloadCount >= 10) {
    location.reload();
  }
  //console.log("sheetDownloadCount", sheetDownloadCount);
  //console.log("drawCount", drawCount);
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

  a=Number(data[190].deviceID);
  console.log(a);
  /*
  console.log("big chunk of arrays");
  for (let i = 0; i < 200; i++) {

    //deviceName[i]=data[i].Device_name;
    deviceID[i] = Number(data[i].Device_ID);
    userNumber[i] = Number(data[i].User_number);

    event1count[i] = Number(data[i].Event_1_count);
    event1lat[i] = Number(data[i].Event_1_lat);
    event1lon[i] = Number(data[i].Event_1_lon);
    event1Duration[i] = Number(data[i].Event_1_duration);
    event1DurationLat[i] = Number(data[i].Event_1_duration_lat);
    event1DurationLon[i] = Number(data[i].Event_1_duration_lon);

    event2count[i] = Number(data[i].Event_2_count);
    event2lat[i] = Number(data[i].Event_2_lat);
    event2lon[i] = Number(data[i].Event_2_lon);
    event2Duration[i] = Number(data[i].Event_2_duration);
    event2DurationLat[i] = Number(data[i].Event_2_duration_lat);
    event2DurationLon[i] = Number(data[i].Event_2_duration_lon);

  }
  console.log("finished arraying");
  */


  console.log(data[6].Current_time); //update timestamp of GSheet file
  console.log(millis() / 1000, "seconds since page refresh");
}

function DeviceID(i){
  if (a>0){
  console.log (Number(data[i].Device_ID));
  return Number(data[i].Device_ID);
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
