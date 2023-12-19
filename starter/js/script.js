// Targeting various HTML element classes and IDs
const searchInputEl = document.getElementById('search-input');
const searchFormEl = document.getElementById('search-form');
const forecastContainerEl = document.querySelector('all-forecast-cards');
const searchHistoryEl = document.querySelector('.search-history');
const currentWeatherEL = document.querySelector('.current-weather');
const forecastTitleEl = document.querySelector('.forecast-title');

//Add eventlistener to search form
searchFormEl.addEventListener('submit', function(event) {
    event.preventDefault()

    let cityName = searchInputEl.value; 
    if(cityName !== "") {
        getDataFromApi(cityName)
        forecastTitleEl.classList.remove('hide')
        searchInputEl.value = ""

        const newHistoryBtn = document.createElement('button')
        newHistoryBtn.textContent = cityName.trim()
        newHistoryBtn.classList.add('history-btn')

        if(searchHistoryEl.children.length > 0) {
            searchHistoryEl.insertBefore(newHistoryBtn, null)
        } else {
            searchHistoryEl.appendChild(newHistoryBtn)
        }
    }       
})

function getDataFromApi(cityName) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + 
    '&appid=326cdcca5d5f8ca6a617c5ff3750800a&units=metric')
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        // console.log(data)
        const dateAndTime = new Date(data.list[0].dt_txt);
        const dateOnly = dateAndTime.toISOString().split('T')[0];

        // Remember to search and add units
        const currentWeatherHTML = `
        <div class= "card-body">
            <h3 id="location-name" class="card-title">${data.city.name} ${dateOnly}</h3>
            <p id="current-temp" class="card-text">Temperature: <span>${data.list[0].main.temp}°C</span></p>
            <p id="current-wind" class="card-text">Wind: <span>${data.list[0].wind.speed} Km/hr</span></p>
            <p id="current-humidity" class="card-text">Humidity: <span>${data.list[0].main.humidity} %</span></p>
        </div>
        `

        currentWeatherEL.innerHTML = currentWeatherHTML

        let weatherForecastHTML = ""

        // Write for loop that can loop through all items
        for(let i = 0; i < data.list.length; i = i + 8) {
            let forecastItem = data.list[i];
            const dateAndTime = new Date(forecastItem.dt_txt);
            const dateOnly = dateAndTime.toISOString().split('T')[0]

            const singleForecastHTML = `
            <div class="card single-forecast">
                <div class="card-body">
                    <h5 class="card-title forecast-date">${dateOnly}</h5>
                    <h5 class="card-title forecast-date">Image</h5>
                    <!-- <img src="" alt="weather conditions"-->
                    <p class="card-text forecast-temp">Temp: ${forecastItem.main.temp} °C</p>
                    <p class="card-text forecast-wind">Wind: ${forecastItem.wind.speed} Km/hr</p>
                    <p class="card-text forecast-humidity">Humidity: ${forecastItem.main.humidity} %</p>
                </div>
            </div>
            `
            weatherForecastHTML += singleForecastHTML
        }

        forecastContainerEl.innerHTML = weatherForecastHTML

        let weatherData = []

        for(let i = 0; i < data.list.length; i+8) {
            const dateData = data.list[i].dt_txt;
            const dateAndTime = new Date(dateData);
            const dateOnly = dateAndTime.toISOString().split('T')[0]

            const temp = data.list[i].main.temp
            const wind = data.list[i].wind.speed
            const humidity = data.list[i].main.humidity

            const extractedWeatherData ={
                dateData: dateOnly,
                tempData: temp,
                windData: wind,
                humidityData: humidity,
            }
            weatherData.push(extractedWeatherData)
        }
        localStorage.setItem(cityName, JSON.stringify(weatherData))
    })
    .catch(error => {
        allert('You have probably typed the wrong city name. Please try again.')
    })
}

searchHistoryEl.addEventListener('click', function(event) {
    if(event.target.classList.contains('history-btn')) {
        const location = event.target.textContent.trim()
        const dataFromStorage = localStorage.getItem(location)
        const weatherData = JSON.parse(dataFromStorage)

        const currentWeatherHTML = `
        <div class="card-body">
            <h3 id="location-name" class="card-title">${location} ${weatherData[0].dateData}</h3>
            <p id="current-temp"> class="card-text">Temp: <span>${weatherData[0].tempData}</span></p>
            <p id="current-wind"> class="card-text">Wind: <span>${weatherData[0].windData}</span></p>
            <p id="current-humidity"> class="card-text">Humidity: <span>${weatherData[0].humidityData}</span></p>
        </div>
        `

        currentWeatherEL.innerHTML = currentWeatherHTML;

        let weatherDataHTML = ``

        for(let i = 0; i < weatherData.length; i) {
            const singleWeatherCard = `
            <div class="card single-forecast">
                <div class="card-body">
                    <h5 class="card-title forecast-date">${weatherData[i].dateData}</h5>
                    <h5 class="card-title forecast-date">Image</h5>
                    <!--<img src="" alt="weather-conditions">-->
                    <p class="card-text forecast-temp">Temp: ${weatherData[i].tempData} °C</p>
                    <p class="card-text forecast-wind">Wind: ${weatherData[i].windData} Km/hr</p>
                    <p class="card-text forecast-humidity">Humidity: ${weatherData[i].humidityData} %</p>
                </div>
            </div>
            `
            weatherDataHTML += singleWeatherCard
        }
        console.log(weatherDataHTML)
        forecastContainerEl.innerHTML = weatherDataHTML
    }
})

function displaySearchHistory() {
    const citiesInStorage = Object.keys(localStorage)
    historyButtonsHTML += ``

    if(citiesInStorage.length > 0) {
        citiesInStorage.forEach(name =>{
            historyButtonsHTML += `
            <button class="history-btn">${name}</button>
            `
        })
    }
    searchFormEl.innerHTML = historyButtonsHTML 
}
displaySearchHistory()

