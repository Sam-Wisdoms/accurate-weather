const historyElement = document.getElementById('history')
const todayElement = document.getElementById('today')
const forecastElement = document.getElementById('forecast')
const searchFormElement = document.getElementById('search-form')
const searchInputElement = document.getElementById('search-input') 
const currentWeather = document.querySelector('.current-Weather')

const mainCardHeader = document.querySelector('.main-header')
const cityTitle = document.querySelector('.city-title')
const tempText = document.querySelector('.temp-text')
const humidityText = document.querySelector('.humidity-text')
const windText = document.querySelector('.wind-text')

// https://openweathermap.org/img/w/' + weather[0].icon + '.png



searchFormElement.addEventListener('submit', function(event) {
    event.preventDefault()
  
    let cityName = searchInputElement.value
   
    getDataFromApi(cityName) // Passing city name to this function.
})

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

function getDataFromApi(cityName) {
    // api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=326cdcca5d5f8ca6a617c5ff3750800a&units=metric')
.then(function(response) {
    return response.json()
    // console.log(response)
})
.then(function(data) {
    console.log(data);

  
    // Date, time, tempretature, wind speed, humidity, weather icon
    let currentWeatherHTML = `` 

    // console.log(data.list[0].dt_txt)
    // const markup = `<div>
    // <h2>${data.city.name.toUpperCase()} ${data.list[0].dt_txt}</h2>
    // <p>Temp: ${data.list[0].main.temp}</p>
    // <p> Wind: ${data.list[0].wind.speed}</p>
    // <p> Humidity: ${data.list[0].main.humidity}</p>
    // </div>` 

    // currentWeather.innerHTML = markup

 cityTitle.textContent = `City: ${data.city.name.toUpperCase()} ${data.list[0].dt_txt}`
 tempText.textContent = `Temperature: ${data.list[0].main.temp}`
 humidityText.textContent = `Humidity: ${data.list[0].main.humidity}`
 windText.textContent = `Wind: ${data.list[0].wind.speed}`
    


  
})
}

// Function to render data for 5 day forecast
async function renderData() {
    const container = document.querySelector('.container');
    const data = await fectchData();

    if(!data){
        return;
    }

    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        const title = document.createElement('h2');
        title.textContent = item.title;

        const body = document.createElement('p');
        body.textContent = item.body;
        
    });
}




















// function fiveDayForecast(lat, lon) {
//     var URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=326cdcca5d5f8ca6a617c5ff3750800a`;
//     fetch(URL)
//     .then(res => {
//         return res.json()
//     })
//     .then(data => {
//         console.log("DATA: ", data)
//     })
// }

// https://openweathermap.org/forecast5#name5

// Built in API request by city name

// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

// api.openweathermap.org/data/2.5/forecast?q={city name},{country code}&appid={API key}

//