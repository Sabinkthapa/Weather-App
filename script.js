var inputElement = document.getElementById("inputCity");
// console.log(inputElment);
var btnElement = document.getElementById("btn-City");
// console.log(btnElement);
const weatherCards = document.querySelector(".weatherFiveDays");
// console.log("check",weatherCards);
const weatherTodayDiv =document.querySelector(".weatherToday .details");
// console.log(weatherTodayDiv);

const ApiKey = 'dcf43dd6744f3456f9b93aca898f1db6'; //weather APi key

// function displayLastSearchedCities(){
//     const lastSearchCities = JSON.parse(localStorage.getItem("lastSearchCities"));
//     const lastSearchedList=document.getElementById("lastSearchList");
//     console.log(lastSearchedList);
//     lastSearchedList.innerHTML = "";

//     const citiesToDisplay = lastSearchCities.slice(0,5);

//     for(const city of citiesToDisplay) {
//         const listItem = document.createElement("li");
//         listItem.textContent = city;
//         lastSearchedList.appendChild(listItem);
//     }
// }

// function storeLastSearchedCity(cityName) { 
//     let lastSearchCities = JSON.parse( localStorage.getItem("lastSearchedCities"))|| [];
//     if (!lastSearchCities.includes(cityName)) {
//         lastSearchCities.unshift(cityName);
//         if (lastSearchCities.length > 5){
//             lastSearchCities.pop();
//         }
//         localStorage.setItem("lastSearchedCities", JSON.stringify(lastSearchCities));
// }
// }

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
// storeLastSearchedCity(cityName);
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
    // console.log(data[0]);
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
        // console.log (data.list);
        const forecastDays =[];
        const fiveDaysForecast = data.list.filter((forecast) => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            // console.log (forecastDate);
          
            //Get 5 days forecast and check if the forecast date is not already added to the forecastDays array
        
            if (forecastDays.length<5 && !forecastDays.includes(forecastDate)) {
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

        //Get the date from the API's dt_txt field and formwat it tolocaleDatestring format in the brower
        const date = new Date(todayWeather.dt_txt).toLocaleDateString();

        //appending one day weather to the DOM
        //adding todaydate and img tag with the icon url and alt in h2 element of dom
        weatherTodayDiv.innerHTML = `
        <h2>${cityName}  ${date} <img src ="${iconUrl}" alt="${weatherDescription}"></h2>
        <p>Temperature: ${(todayWeather.main.temp - 273.15).toFixed(2)} C</p>
        <p>Humidity: ${todayWeather.main.humidity}%</p>
        <p>Wind: ${todayWeather.wind.speed}M/s</p>`;

        weatherCards.innerHTML = "";
        fiveDaysForecast.forEach((itemWeather) => {
            weatherCards.insertAdjacentHTML('beforeend', cardWeather(itemWeather));
        });
    })
    .catch((err) => {
        console.error(err);
        alert("Error fetching weather forecast data");
    });
};
        //creating a card list for 5 days and appending to DOM
        const cardWeather = (itemWeather) => {
        return `<li class="forecast">
                <h2>(${cityName} ${itemWeather.dt_txt.split(" ")[0]})</h2>
                <p>Temp:${(itemWeather.main.temp - 273.15).toFixed(2)} c</p>
                <p>Humidity:${itemWeather.main.humidity}%</p>
                <p>Wind:${itemWeather.wind.speed} M/S</p>
                </li>`;
        }
    };
btnElement.addEventListener("click", GeoCoordinate);

// window.addEventListener("load", () => {
//     displayLastSearchedCities();
// });




