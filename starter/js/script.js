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
            <p id="current-temp" class="card-text">Temperature: <span>${data.list[0].main.temp}</span></p>
            <p id="current-wind" class="card-text">Wind: <span>${data.list[0].wind.speed}</span></p>
            <p id="current-humidity" class="card-text">Humidity: <span>${data.list[0].main.humidity}</span></p>
        </div>
        `

        currentWeatherEL.innerHTML = currentWeatherHTML

        let weatherForecastHTML = ""

        // Write for loop that can loop through all items
        for(let i = 0; i < data.list.length; i = i + 8) {
            let forecastItem = data.list[i];
            const dateAndTime = new Date(forecastItem.dt_txt);
            const dateOnly = dateAndTime.toISOString().split('T')[0]
        }
    })
}

