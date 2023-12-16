HTML
1. When User search for a City in the input, call weather API and show the result in the HTML
- Add Eventlistener to form submit
- Get the user input value
- Build the API query URL based on the user input value
- Call the API and render the result in the HTML
    - Get the city name and show it in the main weather forecast card.
    - Get the first weather forecast item and get the following values.
        - date 
        - temperature
        - wind speed
        - humidity
        - icon
    - Render those values to the main card
    - Loop through all weather array and get the following values
        - date
        - temperature
        - wind speed
        - humidity
        - icon
    - Render those values to the smaller card.
2. When user search for a city, store it in local storage
3. on initial page, load the search history and show it as a list in the HTML
    - Build the API query URL based on the history stored in local storage.
    - Call the API and render the result in the HTML
4. When user clicks on the search history call weather API and show the result in the HTML.
5. CSS

// 
1. THE WEATHER DASHBOARD OVERVIEW
- User see App Title
- There is input button
- There a clickable search button
- When user search a city, he is able to see current and future weather conditions for that city
- When a city search is done, the city is added to the search history.

A. CSS


2. WHEN USER VIEWS CURRENT WEATHER CONDITION FOR A CITY
- They can see the city name
- Date
- An icon representation of weather conditions
- Teamperature
- Humidity
- Wind Speed

3. WHEN USER VIEWS FUTURE WEATHER CONDITION FOR A CITY
- They can see 5-day weather forecast
- Dates
- An icon representation of weather conditions
- Teamperature
- Humidity

4. WHEN USER CLICKS ON A CITY IN THE SEARCH HISTORY
- They are presented with current and future weather condition for that city

5. APPLICATION DEMO OVERVIEW
1. Main title centered
2. London

