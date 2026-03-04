function validHour(ar) {
    let len = ar.value.length;
    if (len > 2) {
        ar.value = ar.value.slice(len - 2, len);
    }
    return ar.value;
}
function validMinSec(mi) {
    let len = mi.value.length;
    if (len > 2) {
        mi.value = mi.value.slice(len - 2, len);
    }
    let val = parseInt(mi.value);
    if (val > 59) mi.value = "59";
}

let minute = document.getElementById("minVal");
let second = document.getElementById("secVal");
let hour = document.getElementById("hourVal");
const btn = document.getElementById("pauseStart");
const reBnt=document.getElementById("restart");
let saveSec="00";
let saveMin="00";
let saveHour="00";

let summTime=0;
let id = null;
let isRunning = false;
btn.addEventListener("click", () => {
    if (isRunning == false) {
        isRunning = true;
        btn.dataset.active=isRunning;
        summTime=(parseInt(minute.value) || 0 ) * 60 + (parseInt(second.value) ||0 ) + (parseInt(hour.value) || 0 ) * 3600;
        saveSec=(parseInt(second.value)||0).toString().padStart(2,"0");
        saveMin=(parseInt(minute.value)||0).toString().padStart(2,"0");
        saveHour=(parseInt(hour.value)||0).toString().padStart(2,"0");
        id = setInterval(() => {
            if (summTime>0) {
                summTime=summTime-1;
                second.value = (summTime%60).toString().padStart(2, "0");
            } else if (summTime<=0) {
                second.value = "";
                minute.value="";
                hour.value="";
                second.value = "00";
                clearInterval(id);
            }
            if(summTime>=3600){
                hour.value=parseInt(summTime/3600).toString().padStart(2,"0");
            }
            else{
                hour.value="00";
            }
            if(summTime>=60){
                minute.value=parseInt((summTime%3600)/60).toString().padStart(2,"0");
            }
            else{
                minute.value="00";
            }
        }, 1000);
    } else {
        isRunning = false;
        btn.dataset.active=isRunning;
        clearInterval(id);
    }
});

reBnt.addEventListener("click",()=>{
    second.value=saveSec;
    minute.value=saveMin;
    hour.value=saveHour;
    clearInterval(id);
})
