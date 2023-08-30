const weatherApi = {
    key : '1583a8c1140f569ff45c57f17ec621eb',
    baseUrl : 'https://api.openweathermap.org/data/2.5/weather'
}
let seachinputBox=document.getElementById('inputbox');

// derteminer quelle key in keybo
seachinputBox.addEventListener('keypress',(e)=>{
    if(e.key==='Enter'){
        getweatherreport(seachinputBox.value);
    }
})


function  getweatherreport(city){ 
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    // appelle d' API
    .then(data=>{return data.json()})
    .then(showweatherreport)
    .catch(err=> alert('ERROR HAPPEND'))
}
function showweatherreport(weather){
    let city_code=weather.cod;
    if(city_code==='400'){
        alert('empty')
    }
    else if(city_code==='404'){
        alert("not matched")
    }
    else{
       let op=document.getElementById('weather-body');
       let parent=document.getElementById('parent');
       op.style.display='block';
       op.innerHTML=`
       <div class='location-details'>
       <div class='city'> ${weather.name}, ${weather.sys.country}</div>
       <div class='date'> ${new Date()}</div>
       </div>
       <div class="weater-status">
    <div class="temp">
        ${Math.round(weather.main.temp)}&deg;c
    </div>
    <div class="min_max">
       ${Math.floor(weather.main.temp_min)}&deg;c (min) /
       ${Math.ceil(weather.main.temp_max)}&deg;c (max) 
    </div>
    <div class="weather"> ${weather.weather[0].main} <i class="${geticon(weather.weather[0].main)}"></i></div>
    </div>
    <hr>
    <div class="status">
    <p>Feels like ${Math.round(weather.main.feels_like)}&deg;c | Humidity ${Math.round(weather.main.humidity)} %</p>
    <p> Pressure ${Math.round(weather.main.pressure)}  | Wind ${Math.round(weather.wind.speed)}KMPH </p>
    </div>
       `;
       parent.append(op);
       changebg(weather.weather[0].main);
    }
}

function changebg(s){
    if(s==='Clear'){
        document.body.style.backgroundImage='url(img/clear.jpg)';
    }
    if(s==='Clouds'){
        document.body.style.backgroundImage='url(img/cloud.jpg)';
    }
    if(s==='Rain'){
        document.body.style.backgroundImage='url(img/rainny.jpg)';
    }
    if(s==='Snow'){
        document.body.style.backgroundImage='url(img/Snow.jpg)';
    }
    if(s==='Thunderstorm'){
        document.body.style.backgroundImage='url(img/thunder.jpg)';
    }
    if(s==='Mist'){
        document.body.style.backgroundImage='url(img/mist.jpg)';
    }
}

function geticon(s){
    if(s==='Rain'){
        return 'fas fa-cloud-showers-heavy'
    }
    if(s==="Clear"){
        return "fas fa-regular fa-sun"
    }
    if(s==='Clouds'){
        return "fas fa-solid fa-cloud";
    }
    if(s==="Thunderstorm"){
        return "fas fa-solid fa-cloud-bolt";
    }
    if(s==="Snow"){
        return "fas fa-solid fa-snowflake";
    }
    if(s==="Mist"){
        return "fas fa-solid fa-smog";
    }
}