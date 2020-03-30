//Written with love by Sujit Joshi- www.sujitjoshi.me

//spreadsheet link- https://docs.google.com/spreadsheets/d/1qsBf8xvP98dHtfVLfY3CbJwmwojH_Z5wmUc0a0nyT2c/edit#gid=0

// G-Sheet reference:
// Device_name	Device_ID	User_number	Event_1_count	Event_1_timestamp	Event_1_lat	Event_1_lon	Event_1_duration_start	Event_1_duration_end	Event_1_duration	Event_1_duration_lat	Event_1_duration_lon	Event_2_count	Event_2_timestamp	Event_2_lat	Event_2_lon	Event_2_duration_start	Event_2_duration_end	Event_2_duration	Event_2_duration_lat	Event_2_duration_lon		Referenced	Current_time	random_1	random_2	lon	lat	blanks

//chicago center
let white = 255;
let black = 0;
let fps = 8;
let drawCount = 0;
let sheetRefreshSeconds = 60;
let sheetDownloadCount = 0;

let baseLat = 41.8748070; // Chicago Latitude
let baseLon = -87.625219; // Chicago Longitude

let baseLatNorth = 41.887767;
let baseLatSouth = 41.861846;

let baseLonWest = -87.637190;
let baseLonEast = -87.613248;

let canvasX = 1000; //canvas size X
let canvasY = 1000; //canvas size Y

var data = new Array(200); //Re-storing json in this

var xPos1 = new Array(200);
var xPos2 = new Array(200);
var yPos1 = new Array(200);
var yPos2 = new Array(200);
var xMag1 = new Array(200);
var xMag2 = new Array(200);
var yMag1 = new Array(200);
var yMag2 = new Array(200);

//-------- Housekeeping variables start----------

let test = 0;

let vht = 400;
let vwt = 400;


//----------Housekeeping variables end -------------



function setup() {
  canvasX = vw(100);
  canvasY = vh(100);
  createCanvas(canvasX, canvasY);
  frameRate(fps);
  downloadSheet();
  noFill();
}

function draw() {
  circlesEvents(8, 25);

  for(i=0;i<200;i++){
    if((xPos1[i]-20)<mouseX<(xPos1[i]+20)){
      if((yPos1[i]-20)<mouseY<(yPos1[i]+20)){
        fill(0,255,100);
        noStroke();
        text(deviceID(i),mouseX+100,mouseY+100);
      }
    }
  }


  scheduledMaintenance(); //keep last, manages downloads and reloads
}




//--------- declare kelele custom functions ----------
//====================================================


function scheduledMaintenance() { //function to periodically trigger downloads and reloads, prevents google from limiting update rate on G-sheets
  drawCount++;
  console.log("drawCount", drawCount);
  if (drawCount >= fps * sheetRefreshSeconds) {
    downloadSheet();
    fill(random(0, 255), random(0, 255), random(0, 255));
    ellipse(vwt / 4, vht / 4, 10, 10);
    drawCount = 0;
  }

  console.log("sheetDownloadCount", sheetDownloadCount);
  if (sheetDownloadCount >= 10) {
    location.reload();
  }

  if (test > 0) {
    fill(white);
    noStroke();
    text(data[6].Current_time, 50, canvasY - 20);
    text(fps * sheetRefreshSeconds - drawCount, canvasX - 50, canvasY - 20);
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
  console.log('test ', test);
  noFill();
  stroke(random(0, 255), random(0, 255), random(0, 255));
  ellipse(canvasX / 2, canvasY / 2, 20, 20);
  console.log("Current file timestamp", data[6].Current_time); //update timestamp of GSheet file
  console.log(millis() / 1000, "seconds since page refresh");
}


//--------- animationiey functions go here ---------------

function circlesEvents(horizontal, vertical) {

  background(black);
  strokeWeight(1.3);
  noFill();
  stroke(white);

  let count = 0;
  let factor = 0.6;


  for (let f = 1; f <= horizontal; f++) {
    for (let d = 1; d <= vertical; d++) {


      xPos1[count] = canvasX / 2 - 46 * f;
      yPos1[count] = 35.5 * d;
      xMag1[count] = factor * random(2 + event1Count(count), event1Count(count) - 2);
      yMag1[count] = factor * random(2 + event1Count(count), event1Count(count) - 2);

      ellipse(xPos1[count], yPos1[count], xMag1[count], yMag1[count]);



      xPos2[count] = canvasX / 2 + 46 * f;
      yPos2[count] = 35.5 * d;
      xMag2[count] = 0.45*factor * random(2 + event2Count(count), event2Count(count) - 2);
      yMag2[count] = 0.45*factor * random(2 + event2Count(count), event2Count(count) - 2);

      rectMode(RADIUS);
      rect(xPos2[count], yPos2[count], xMag2[count], yMag2[count]);


      count++;


    }
  }
}


//---------- viewport related functions go here ------------

function vh(v) {
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (v * h) / 100;
}

function vw(v) {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return (v * w) / 100;
}

function lowerTriangles() {
  fill(white);
  stroke(white);
  triangle(canvasX / 2, canvasY - 0.5, 0, canvasY - 0.5, 0, 0); //lhs
  triangle(canvasX / 2, canvasY - 0.5, canvasX - 0.5, canvasY - 0.5, canvasX - 0.5, 0); //rhs
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
    //console.log("Device_ID", bucket);
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
    //console.log(bucket);
    return bucket;
  }
}

function event1Lat(i) {
  if (test > 0) {
    let bucket = Number(data[i].Event_1_lat);
    //console.log(bucket);
    return bucket;
  }
}

function event1Lon(i) {
  if (test > 0) {
    let bucket = Number(data[i].Event_1_lon);
    //console.log(bucket);
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
    //console.log(bucket);
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
