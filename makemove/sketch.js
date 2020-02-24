//spreadsheet link- https://docs.google.com/spreadsheets/d/e/2PACX-1vSNLla6JpobjcHF8gee2quZIBP4-CC4KYkyLx-WZ071DqKjBMeBhkTow9atPbgfaRkRurpQpTlrum-0/pubhtml

var output;
var x;
var y;

function setup (){
  createCanvas(400,400);
  background(200);
  frameRate(0.5);
}

function draw (){

  Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1PixA5wHtRBWytglsBEjgGmsQYl_NAQP5yKjQ-C4ZwxE/edit#gid=0',
                    callback: function(data, tabletop) {
                      console.log(data)
                    },
                    simpleSheet: true } )

}
