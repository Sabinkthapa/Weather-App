var inputElement = document.getElementById("inputCity");
// console.log(inputElment);
var btnElement = document.getElementById("btn-City");
// console.log(btnElement);
const weatherCards = document.querySelector(".weatherFiveDays");
// console.log("check",weatherCards);
const weatherTodayDiv =document.querySelector(".weatherToday .details");
// console.log(weatherTodayDiv);

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
var cityName =inputElement.value.trim();
// console.log(input_check);

//check user input
if (!cityName ){
    alert("please enter city name");
} else if(!isNaN(cityName)){
    alert("city cannot be a number");
    return;
}

const Geocoding_link = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${ApiKey}`;
//Get entered city coordinates from the api
fetch (Geocoding_link)
.then((res) => {
    if (!res.ok) {
        return res.json().then((body)=> {
            console.log('geocoding error:',body);

            throw new Error('Geocoding API error');
        });
    }
    return res.json();
})
.then(data => {
 
    const {name ,lat, lon} = data[0];
    getweatherdetails (name, lat, lon);
})
.catch((err) => {
    alert ('Error fetching to show coordinates');
});


const getweatherdetails = (cityName, lat, lon) =>{
    const weather_api = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${ApiKey}`;
    
    //fetching weather details
    fetch (weather_api)
    .then((res) => {
//check if response is successful
if (!res.ok) {
    throw new Error('Failed to fetch weather details');
    }
    return res.json();
    })
    .then((data) => {
        // console.log (data);
        console.log (data.list);
        const forecastDays =[];
        const fiveDaysForecast = data.list.filter((forecast) => {
            const forecastDate = new Date(forecast.dt_txt).getDate();

            //Get 5 days forecast and check if the forecast date is not already added to the forecastDays array
            if (forecastDate.length<5 && !forecastDays.includes(forecastDate)) {
                //add forecast date to forecastDays DOM
                forecastDays.push(forecastDate);
                return true;
            }
        });
        //Get weather details like rain, humidity ,temperature, date etc
        // today weather
        const todayWeather = data.list[0];
        //To display weather icons for today weather
        const iconUrl = `https://openweathermap.org/img/w/${todayWeather.weather[0].icon}.png`;
        //Accessing weather description 
        const weatherDescription = todayWeather.weather[0].description;
        

    });

}};




        




btnElement.addEventListener("click", GeoCoordinate);

