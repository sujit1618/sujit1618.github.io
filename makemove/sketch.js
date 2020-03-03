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

let lonRemap = baseLon / baseLat; //Remapping factor

let canvasX = 1000; //canvas size X
let canvasY = 1000; //canvas size Y

var data = new Array(200); //Re-storing json in this

var event1PosX = new Array(200);
var event1PosY = new Array(200);

var event2PosX = new Array(200);
var event2PosY = new Array(200);

let sum1 = 0;
let sum2 = 0;

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
  circlesEvents(10,20);
  scheduledMaintenance(); //keep last, manages downloads and reloads
  let halfCanvasX = canvasX / 2;
  let halfCanvasY = canvasY / 2;




  if (test > 0) {
    fill(white);
    text(data[6].Current_time, 50, canvasY - 20);
    text(fps * sheetRefreshSeconds - drawCount, canvasX - 50, canvasY - 20);
  }




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
  noFill();
  stroke(random(0, 255), random(0, 255), random(0, 255));
  ellipse(canvasX / 2, canvasY / 2, 20, 20);
  console.log("Current file timestamp", data[6].Current_time); //update timestamp of GSheet file
  console.log(millis() / 1000, "seconds since page refresh");
}


//--------- animationiey functions go here ---------------

function allPositions() {
  for (let i = 1; i < 5; i++) {
    stroke(100, 100, 255);
    noFill();
    event1PosX[i] = canvasX / 2 + 600 * lonRemap * (baseLon - event1Lon(i)); //longitudes change according to X axis
    event1PosY[i] = canvasY / 2 + 600 * (baseLat - event1Lat(i)); //latitudes change according to Y axis
    ellipse(event1PosX[i], event1PosY[i], event1Count(i), event1Count(i)); //x,y,diaX,diaY
    text(deviceID(i), event1PosX[i], event1PosY[i]);
    console.log(event1PosX[i]);
    console.log(event1PosY[i]);
  }
}

function eventCountsCompare(i, j) {

  sum1 = 0;
  sum2 = 0;

  for (i; i < j - 1; i++) {
    sum1 = sum1 + event1Count(i);
    sum2 = sum2 + event2Count(i);
  }

  let percent1 = 100 * sum1 / (sum1 + sum2);

  let percent2 = 100 * sum2 / (sum1 + sum2);

  fill(white);
  text(sum1, mouseX - 20, mouseY);
  text(sum2, mouseX + 20, mouseY);

  console.log("sum1", sum1);
  console.log("sum2", sum2);
}


function staticCircles(i, j) {
  let tempVar1 = 10 + event1Count(i);
  let tempVar2 = 100 + event2Count(i);

  for (i; i < j - 1; i++) {
    noFill();
    stroke(white);
    ellipse(i + tempVar1, i + tempVar1, event1Count(i), event1Count(i));
    ellipse(i + tempVar2, i + tempVar2, event2Count(i), event2Count(i));
    tempVar1 = 100 + event1Count(i);
    tempVar2 = 100 + event2Count(i);
  }
}

function circlesEvents(i,j) {
  background(0);
  let gh = 0;
  let factor = 0.6;
  for (let f = 1; f <= i; f++) {
    for (let d = 1; d <= j; d++) {
      //fill(2.5*event1Count(gh), random(0,255) + event1Count(gh), random(0,255) + event1Count(gh));
      //noFill();
      fill(black);
      stroke(white);
      ellipse(canvasX/2 - 46 * f, 35.5 * d, factor * random(2 + event1Count(gh), event1Count(gh) - 2), factor * random(2 + event1Count(gh), event1Count(gh) - 2));
      //  fill(2.5*event2Count(gh), random(0,255) + event2Count(gh), random(0,255) + event2Count(gh));
      //noFill();
      stroke(white);
      fill(black);
      ellipse(canvasX/2 + 46 * f, 35.5 * d, factor * random(2 + event2Count(gh), event2Count(gh) - 2), factor * random(2 + event2Count(gh), event2Count(gh) - 2));
      noStroke();
      fill(white);
      text(event1Count(gh), halfCanvasX-46*f - 4.855, 35.5 * d-4.855); text(event2Count(gh), halfCanvasX + 46 * f - 4.855, d + 34.5 * d);
      gh++;
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
