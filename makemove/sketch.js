//spreadsheet link- https://docs.google.com/spreadsheets/d/e/2PACX-1vSNLla6JpobjcHF8gee2quZIBP4-CC4KYkyLx-WZ071DqKjBMeBhkTow9atPbgfaRkRurpQpTlrum-0/pubhtml
// Device_name Device_ID	User_number	Event_1_count	Event_1_timestamp	Event_1_lon	Event_1_lat	Event_1_duration_start	Event_1_duration_end	Event_1_duration_lon	Event_1_duration_lat	Event_2_count	Event_2_timestamp	Event_2_lon	Event_2_lat	Event_2_duration_start	Event_2_duration_end	Event_2_duration_lon	Event_2_duration_lat		random_1	random_2	lon	lat	blanks

//chicago center
let fps = 1/10;

let baseLat= 41.8748065; //Y
let baseLon= -87.625219;//X
let lonRemap=0.1*baseLon/baseLat;
let canvasX=600;
let canvasY=400;
var data;
var posX=new Array(200);
var posY=new Array(200);
var magEvent1=new Array(200);

function setup (){
createCanvas(canvasX, canvasY);
frameRate(fps);
baseXfactor=canvasY/baseLon;
baseYfactor=canvasX/baseLat;
}


function draw(){
var x = [1,2,3,4];
console.log(x[1]);
console.log(x[3]);
downloadSheet();
}


function downloadSheet (){

  Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1qsBf8xvP98dHtfVLfY3CbJwmwojH_Z5wmUc0a0nyT2c/edit#gid=0',
                   callback: gotData,
                    simpleSheet: true
                  } );
}

// Device_name Device_ID	User_number	Event_1_count	Event_1_timestamp	Event_1_lon	Event_1_lat	Event_1_duration_start	Event_1_duration_end	Event_1_duration_lon	Event_1_duration_lat	Event_2_count	Event_2_timestamp	Event_2_lon	Event_2_lat	Event_2_duration_start	Event_2_duration_end	Event_2_duration_lon	Event_2_duration_lat		random_1	random_2	lon	lat	blanks

function gotData(stuff,tabletop){ //function which works inside update loop
  data=stuff;

  for(let i=0;i<200;i++){
    data[i].Device_ID=Number(data[i].Device_ID);
  }


}
