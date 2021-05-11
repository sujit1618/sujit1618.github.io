//spreadsheet link- https://docs.google.com/spreadsheets/d/e/2PACX-1vSNLla6JpobjcHF8gee2quZIBP4-CC4KYkyLx-WZ071DqKjBMeBhkTow9atPbgfaRkRurpQpTlrum-0/pubhtml
// Device_name Device_ID	User_number	Event_1_count	Event_1_timestamp	Event_1_lon	Event_1_lat	Event_1_duration_start	Event_1_duration_end	Event_1_duration_lon	Event_1_duration_lat	Event_2_count	Event_2_timestamp	Event_2_lon	Event_2_lat	Event_2_duration_start	Event_2_duration_end	Event_2_duration_lon	Event_2_duration_lat		random_1	random_2	lon	lat	blanks

//chicago center

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
frameRate(1/10);
baseXfactor=canvasY/baseLon;
baseYfactor=canvasX/baseLat;
}

function draw (){

  Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1qsBf8xvP98dHtfVLfY3CbJwmwojH_Z5wmUc0a0nyT2c/edit#gid=0',
                   callback: gotData,
                    simpleSheet: true
                  } );

  //frameRate(12);
}

function gotData(stuff,tabletop){
  data=stuff;
  background(255);
  noFill();
  stroke(30);
  for (let i=0;i<200;i++){

    data[i].Event_1_duration_lon=Number(data[i].Event_1_duration_lon);


    posX[i]=canvasX/2+60000*lonRemap*(baseLon-Number(data[i].Event_1_duration_lon));//longitudes change according to X axis
    posY[i]=canvasY/2+10000*(baseLat-Number(data[i].Event_1_duration_lat));//latitudes change according to Y axis
    magEvent1[i]=Number(data[i].Event_1_count/2);

    ellipse(posX[i],posY[i],magEvent1[i],magEvent1[i]); //x,y,diaX,diaY

  }
  console.log(data[8].Event_1_lat);
  fill(0,10,255);
  noStroke();
  ellipse(canvasX/2,canvasY/2,20,20);
}
