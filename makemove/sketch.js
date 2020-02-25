//spreadsheet link- https://docs.google.com/spreadsheets/d/e/2PACX-1vSNLla6JpobjcHF8gee2quZIBP4-CC4KYkyLx-WZ071DqKjBMeBhkTow9atPbgfaRkRurpQpTlrum-0/pubhtml
// Device_name Device_ID	User_number	Event_1_count	Event_1_timestamp	Event_1_lon	Event_1_lat	Event_1_duration_start	Event_1_duration_end	Event_1_duration_lon	Event_1_duration_lat	Event_2_count	Event_2_timestamp	Event_2_lon	Event_2_lat	Event_2_duration_start	Event_2_duration_end	Event_2_duration_lon	Event_2_duration_lat		random_1	random_2	lon	lat	blanks
let output;
var x;
var y;

function setup (){
  createCanvas(400,400);
  background(200);
}

function draw (){

  Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1qsBf8xvP98dHtfVLfY3CbJwmwojH_Z5wmUc0a0nyT2c/edit#gid=0',
                    callback: function(data, tabletop) {
                      //console.log(data)
                      output=data;
                    },
                    simpleSheet: true } )
console.log(output[2].Event_1_lon);
background(201);
//ellipse(output[20].Event_1_lat,200,200,200);
frameRate(0.25);
}
