const historyElement = document.getElementById('history')
const todayElement = document.getElementById('today')
const forecastElement = document.getElementById('forecast')
const searchFormElement = document.getElementById('search-form')
const searchInputElement = document.getElementById('search-input') 
const currentWeather = document.querySelector('.current-Weather')



// https://openweathermap.org/img/w/' + weather[0].icon + '.png

// //for example
// https://openweathermap.org/img/w/04n.png


// fetch('https://api.openweathermap.org/data/2.5/forecast?q=london&+&appid=326cdcca5d5f8ca6a617c5ff3750800a')


// link for icon
https://openweathermap.org/img/w/' + weather[0].icon + '.png




searchFormElement.addEventListener('submit', function(event) {
    event.preventDefault()
  
    let cityName = searchInputElement.value
   
    getDataFromApi(cityName) // Passing city name to this function.
})

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

    console.log(data.list[0].dt_txt)


    const markup = `<div>
    <h2>${data.city.name.toUpperCase()} ${data.list[0].dt_txt}</h2>
    <p>Temp: ${data.list[0].main.temp}</p>
    <p> Wind: ${data.list[0].wind.speed}</p>
    <p> Humidity: ${data.list[0].main.humidity}</p>
    
    </div>` 

    currentWeather.innerHTML = markup




  
})
}



// https://openweathermap.org/forecast5#name5

// Built in API request by city name

// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

// api.openweathermap.org/data/2.5/forecast?q={city name},{country code}&appid={API key}

//