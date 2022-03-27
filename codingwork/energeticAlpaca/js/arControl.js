function logger(x) {
    console.log(x);
  }

  function playVid(vidId) {
    console.log(vidId);
    var v = document.querySelector(vidId);
    v.play();
  }

  function openSwiss(){
    window.location='./videos/rhine.mp4';
  }
  function openSurf(){
    window.location='https://www.youtube.com/watch?v=Uqmc0891L2U?fs=1';
  }
  function openRoyalenf(){
    window.location='https://www.royalenfield.com/in/en/motorcycles/continental-gt/';
  }
  function openCanon(){
    window.location='https://www.youtube.com/watch?v=Fe45iRMSwRc';
  }
  function openLakehotel(){
    window.location='http://museumsrajasthan.gov.in/VirtualTour/amber/index.html';
  }

  function inHover() {
    let cursorEnt = document.getElementById('cursorEnt');
    let circleEnt = document.getElementById('selectionCirlce');
    // cursorEnt.setAttribute("material","color: teal; shader: standard; opacity:1;");
    circleEnt.setAttribute("material","side: double; color:teal; opacity: 0.4");
    //   console.log(x);
  }

  function outHover(){
    let cursorEnt = document.getElementById('cursorEnt');
    let circleEnt = document.getElementById('selectionCirlce');
    // cursorEnt.setAttribute("material","color: white; shader: flat; opacity: 0.3");
    circleEnt.setAttribute("material","side: double; color:teal; opacity: 0");
  }