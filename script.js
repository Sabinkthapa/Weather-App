var inputElement = document.getElementById("inputCity");
// console.log(inputElment);
var btnElement = document.getElementById("btn-City");
// console.log(btnElement);
var weatherCards = document.getElementsByClassName("weatherFiveDays");
// console.log("check",weatherCards);


const ApiKey = 'dcf43dd6744f3456f9b93aca898f1db6'; //weather APi key

const cardWeather = (itemWeather) => {
    return `<li class="forecast">
            <h3>(${itemWeather.dt_txt.split(" ")[0]})</h3>
            <h4>Temp:${(itemWeather.main.temp - 273.15)} c</h4>
            <h4>Humidity:${itemWeather.main.humidity}%</h4>
            <h4>Wind:${itemWeather.wind.speed} M/S</h4>
            </li>`;
}

function GeoCoordinate(event) {
    event.preventDefault();
var cityName =inputElement.value;
// console.log(input_check);
if (!cityName){
    console.error("please enter city name");
    return;
}

// Get weather details like rain, humidity and temperature, date etc
const getweatherdetails = (cityName,lat,lon) => {
    const weather_api =`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${ApiKey}`;

    fetch (weather_api).then (res => res.json()).then(data => {
        console.log('weather',data);
        const forecastDays =[];
        const fiveDaysForecast=data.list.filter(forecast =>{
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if(!forecastDays.includes(forecastDate)) {
               return forecastDays.push(forecastDate);
            }
        });
        console.log(fiveDaysForecast);
        fiveDaysForecast.forEach(itemWeather => { 
          weatherCards.insertAdjacentHTML("beforeend", cardWeather(itemWeather));
        
        });
    }) .catch (() =>{
        alert("Error fetching the weather  forecast data");
    });

    }

const Geocoding_link = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${ApiKey}`;
//Get entered city coordinates from the api
fetch (Geocoding_link).then (res => res.json()).then(data => {
    const {name ,lat, lon} = data[0];
    getweatherdetails(name, lat, lon);
}).catch(() => {
    alert("Error fetching to show cooordinates");
});
}
btnElement.addEventListener("click", GeoCoordinate);

