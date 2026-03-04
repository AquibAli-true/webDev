const showcityName=document.getElementById("prop1");
const showTemp=document.getElementById("prop2");
const showWindSpeed=document.getElementById("prop3");
const showWindDirection=document.getElementById("prop4");
const showcTime=document.getElementById("prop5");
const showTimeZone=document.getElementById("prop6");
const inputText=document.getElementById("input1");

async function getCoordinates(inputName) {
    try{
        const response1=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${inputName}&count=1&language=en&format=json`);
        const cityData=await response1.json();
        const firstData=cityData.results[0];
        const longitude=firstData.longitude;
        const latitude=firstData.latitude;
        const timezone=firstData.timezone;
        const cityName=firstData.name;
        const tempObj={
            "lat":latitude,
            "long":longitude,
            "name":cityName,
            "zone":timezone
        }
        return tempObj;
    }
    catch(error){
        console.log("some problem");
    }
    
}

async function getData(lat, long) {
    
    try{
        const response=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`);
        const data=await response.json();
        const usefulData=data.current_weather;
        const cityTime=usefulData.time;
        const cityTemp=usefulData.temperature;
        const cityWindSpeed=usefulData.windspeed;
        const cityWindDirection=usefulData.winddirection;
        const dataObj={
            "time":cityTime,
            "temp":cityTemp,
            "windSpeed": cityWindSpeed,
            "windDir":cityWindDirection
        }
        return dataObj;
    }
    catch(error){
        console.log(error);
    }
    
}

const btn1=document.getElementById("btn1")
btn1.addEventListener("click", async ()=>{
    const inputName=inputText.value;
    try{
    const coordinateObj = await getCoordinates(inputName);
    const dataObj=await getData(coordinateObj.lat,coordinateObj.long);
    showTemp.textContent = `Temperature: ${dataObj.temp}°C`;
    showcityName.textContent=`City: ${coordinateObj.name}`;
    showWindSpeed.textContent=`Wind Speed: ${dataObj.windSpeed} km/h`;
    showWindDirection.textContent=`Wind Direction: ${dataObj.windDir}°`;
    showcTime.textContent=`Time: ${dataObj.time}`;
    showTimeZone.textContent=`Time Zone: ${coordinateObj.zone}`;
    }
    catch(error){
        console.log(error);
    }
})