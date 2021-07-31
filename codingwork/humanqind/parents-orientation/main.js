let dateTime;
let day;
let hour;
let minutes;
let session=['https://youtu.be/2StYT58YxCc','https://youtu.be/ssLyfHbxEa8','sesh3','sesh4','sesh5'];


// window.addEventListener('DOMContentLoaded', getHour);

function getHour(){
    const today = new Date();
    day = today.getDate();
    hour = today.getHours();
    minutes = today.getMinutes();

    console.log(day+' '+hour+' '+minutes);

    if (day===31 && hour<13) {
        document.getElementById('h2').innerHTML='Please click on the link below to go to the session';
        document.getElementById('banner').style.display='none';
    }

    if (day===31 && hour>17 && hour<19 ) {
        document.getElementById('h2').innerHTML='Please click on the link below to go to the session';
        document.getElementById('banner').style.display='none';
    }

    else{
        document.getElementById('h2').innerHTML='Session stream has <b>not started yet.</b> Please check back as per the scheduled time below:<br><br>';
        document.getElementById('button').style.display='none';
        document.getElementById('banner').style.display='block';
    }
}

function openSession() {
    window.open(session[1]);
}