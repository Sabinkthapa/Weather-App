var inputElement = document.getElementById("inputCity");
// console.log(inputElment);
var btnElement = document.getElementById("btn-City");
// console.log(btnElement);

function GeoCoordinate(event) {
    event.preventDefault();
var cityName =inputElement.value;
// console.log(input_check);
if (!cityName){
    console.error("please enter city name");
    return;
}

const ApiKey = 'dcf43dd6744f3456f9b93aca898f1db6'; //weather APi key
// Get weather details like rain, humidity and temperature, date etc
const getweatherdetails = (cityName,lat,lon) => {
    const weather_api =`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${ApiKey}`;
    fetch (weather_api).then (res => res.json()).then(data => {
        console.log(data);
    });
    }

const Geocoding_link = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${ApiKey}`;
//Get entered city coordinates from the api
fetch (Geocoding_link).then (res => res.json()).then(data => {
    const {name ,lat, lon} = data[0];
    getweatherdetails(name, lat, lon);
}).catch(() => {
    alert("Error fetching to show cooordinates");
});
}
btnElement.addEventListener("click", GeoCoordinate);

