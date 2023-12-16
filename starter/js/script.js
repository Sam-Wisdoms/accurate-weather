console.log('test')


// fetch('https://api.openweathermap.org/data/2.5/forecast?q=london&+&appid=326cdcca5d5f8ca6a617c5ff3750800a')

$('#search-form').on('click', function(event) {
    event.preventDefault()
    // console.log(event.target)
    let cityName = $('#search-input').val()
    console.log(cityName)
    getDataFromApi(cityName)
})

function getDataFromApi(cityName) {
    // api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=326cdcca5d5f8ca6a617c5ff3750800a')
.then(function(response) {
    return response.json()
    // console.log(response)
})
.then(function(data) {
    console.log(data)
})
}



// https://openweathermap.org/forecast5#name5

// Built in API request by city name

// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

// api.openweathermap.org/data/2.5/forecast?q={city name},{country code}&appid={API key}

//