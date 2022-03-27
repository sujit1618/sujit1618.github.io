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
    window.location='https://www.youtube.com/watch?v=Uqmc0891L2U';
  }
  function openRoyalenf(){
    window.location='https://www.royalenfield.com/in/en/motorcycles/continental-gt/';
  }

  function inHover() {
    let cursorEnt = document.getElementById('cursorEnt');
    cursorEnt.setAttribute("material","color: teal; shader: flat; opacity: 0.6;");
    //   console.log(x);
  }

  function outHover(){
    let cursorEnt = document.getElementById('cursorEnt');
    cursorEnt.setAttribute("material","color: white; shader: flat; opacity: 0.3");
  }