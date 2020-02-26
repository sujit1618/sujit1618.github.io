//spreadsheet link- https://docs.google.com/spreadsheets/d/e/2PACX-1vSNLla6JpobjcHF8gee2quZIBP4-CC4KYkyLx-WZ071DqKjBMeBhkTow9atPbgfaRkRurpQpTlrum-0/pubhtml
// Device_name Device_ID	User_number	Event_1_count	Event_1_timestamp	Event_1_lon	Event_1_lat	Event_1_duration_start	Event_1_duration_end	Event_1_duration_lon	Event_1_duration_lat	Event_2_count	Event_2_timestamp	Event_2_lon	Event_2_lat	Event_2_duration_start	Event_2_duration_end	Event_2_duration_lon	Event_2_duration_lat		random_1	random_2	lon	lat	blanks
var data;
function setup (){
createCanvas(400, 400);
frameRate(1);
}

function draw (){
  background(0);
  Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1qsBf8xvP98dHtfVLfY3CbJwmwojH_Z5wmUc0a0nyT2c/edit#gid=0',
                   callback: gotData,
                    simpleSheet: true
                  } );
  ellipse(200,200,Number(data[1].Event_1_count),Number(data[1].Event_2_count));
  fill(255,255,255);
  frameRate(0.75);
}

function gotData(stuff,tabletop){
  data=stuff;
  let x = data[1].Event_1_lat+data[1].Event_2_lat;
  console.log(x);
  data[1].Event_1_lat=Number(data[1].Event_1_lat);
  data[1].Event_2_lat=Number(data[1].Event_2_lat);
  let y = data[1].Event_1_lat+data[1].Event_2_lat;
  console.log(y);

}
