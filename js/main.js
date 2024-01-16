// Get the current date, day, and month
let today = new Date();
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
let currentDay = days[today.getDay()];
let currentMonth = months[today.getMonth()];
let currentDate = today.getDate();
// Select DOM elements
let date = document.querySelectorAll('.date');
let countrylocation = document.querySelectorAll(".location-city");
let degree = document.querySelectorAll(".num");
let forecastLcon = document.querySelectorAll(".forecast-icon img");
let custom = document.querySelectorAll(".custom");
let Rain = document.querySelectorAll(".Rain");
let winds = document.querySelectorAll(".winds");
let minTemp = document.querySelectorAll('.min-temp');
let maxTemp = document.querySelectorAll('.max-temp');
let searchLocation = document.getElementById('searchLocation');
let find = document.getElementById('find');
let currentDegree = document.querySelector('.num-current');
let currentCountry = "london";
let day = document.querySelectorAll('#currentDay');

// function to get location user
async function getLocation(){
    let request = await fetch('https://apiip.net/api/check?accessKey=bc3c3e09-daa5-46a5-8855-6ad4248e019d')
    let response = await request.json();
    currentCountry = response.city;
    // Initial weather update with default location
    weather(currentCountry);
    console.log(currentCountry);
}

// Weather function to fetch and display weather information
async function weather(location){
    // Fetch weather data from the API
    let request = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=36de1764b5764c99b2b162326241401&q=${location}&days=3&aqi=no`)
    let response = await request.json();

    for (let i = 0; i < date.length; i++) {
        // Logic for handling the end of the month
        date[i].innerHTML = `${today.getDate()+i} ${currentMonth}`;
        if (
            (currentMonth == 'January' || currentMonth == 'March' || currentMonth == 'May' || currentMonth == 'July' || currentMonth == 'August' || currentMonth == 'October' || currentMonth == 'December') && today.getDate() == 31 ||
            (currentMonth == 'April' || currentMonth == 'June' || currentMonth == 'September' || currentMonth == 'November') && today.getDate() == 30 ||
            (currentMonth == 'February' && today.getDate() == 28)
        ) {
            currentDate = 0;
            currentMonth = months[(today.getMonth() + 1)];
        }
    }
    // Calculate and display the day of the week
    for (let i = 0; i < day.length; i++) {
        day[i].innerHTML = days[today.getDay()+i]
        if(today.getDay() == 7){
            today.getDay() = 0
        }
    }
    for (let i = 0; i < countrylocation.length; i++) {
        countrylocation[i].innerHTML = response.location.name
    }
    currentDegree.innerHTML = `${response.current.temp_c}
    <sup>o</sup>
    C`
    for (let i = 0; i < degree.length; i++) {
        degree[i].innerHTML = `${response.forecast.forecastday[i].day.avgtemp_c}
        <sup>o</sup>
        C`
    }
    for (let i = 0; i < forecastLcon.length; i++) {
        forecastLcon[i].src = response.forecast.forecastday[i].day.condition.icon;
    }
    for (let i = 0; i < custom.length; i++) {
        custom[i].innerHTML = response.forecast.forecastday[i].day.condition.text;
    }
    for (let i = 0; i < Rain.length; i++) {
        Rain[i].innerHTML = ` <img src="./imgs/icon-umberella.png" alt="">
        ${response.forecast.forecastday[i].day.avgvis_km}% `
    }
    for (let i = 0; i < winds.length; i++) {
        winds[i].innerHTML = ` <img src="./imgs/icon-wind.png" alt="">
        ${response.forecast.forecastday[i].day.maxwind_kph}km/h `
    }
    for (let i = 0; i < minTemp.length; i++) {
        minTemp[i].innerHTML = `${response.forecast.forecastday[i].day.mintemp_c}
        <sup>o</sup>
        `;
    }
    for (let i = 0; i < maxTemp.length; i++) {
        maxTemp[i].innerHTML = `${response.forecast.forecastday[i].day.maxtemp_c}
        <sup>o</sup>
        `;
    }
    
}
// Event listener for the search button
find.addEventListener('click',function(){
    currentCountry = searchLocation.value;
    weather(currentCountry);
    searchLocation.value = "";
})
// display weather function with current user location
getLocation();





