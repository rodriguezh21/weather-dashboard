$(document).ready(function(){
    
    var cities = [];
    
    // params
    let options = {
        APPID: "be01f05cecf15c5e9a29c3550532301c",

    }
    // click again
    
    

    let baseURL = "https://api.openweathermap.org"
    // intro
    var intro = $("<h1>");
    intro.text("Your Daily Forecast!");
    $('.city-name').append(intro)

    $('.search-button').on('click', () =>{

        var city = $('#city-input').val();
        $.ajax({
            url: `${ baseURL }/data/2.5/weather?q=${city}&${ $.param(options)}`,
            method: 'GET',
        }).then(response => {
            getWeather(response);
            // forecast call
            var fUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=4c6a14a8cf91420981cacdcc4a6442b4`;
            
            $.ajax({
                url: fUrl,
                method: 'GET',
            }).then(function(cast) {
                console.log((cast));
                $(".forecast").empty();

                // loops 5 days
                for(let i=0;i<5;i++){
                let fBlock = `
                <div class='col-md-2 col-sm-6 col-xs-12'>
                <h4>${ cast.data[i].valid_date }</h4>
                <i class= ${cast.data[i].weather.icon}> </i>
                <h5>Temp: ${ cast.data[i].temp+ '°F' }</h5>
                <h5>Humidity: ${ cast.data[i].rh +'%' }</h5></div>`;
                
                $('.forecast').append(fBlock)
                }

            })
        })
    })
    function getWeather(response) {
        var date = moment().format('L');
        $("#c").empty();
        
        // converts kelvin to celsius
        var celsius = Math.ceil(response.main.temp - 273)

        // converts celsius to fahrentheit
        var fahrenheit = Math.ceil(celsius * 1.8 + 32)
        var city = $("#city-input").val();
        $("#city-input").val("");

        // first letter of the city is in uppercase
        var capCity = city.substring(0,1).toUpperCase()+ city.substring(1).toLowerCase();
        cities.push(capCity);
        
        // loops the recently searched cities
        for(var i=0;i<cities.length;i++){
            var h4 = $("<h4>");
            h4.text(cities[i]);
            $("#c").append(h4);
        }
        // block for today's weather
        let block = `
        <h2>${capCity} <span> ${date} </span></h2>
        <h4>Temperature: ${ celsius +'°C / '+ fahrenheit + '°F' }</h4>
        <h4>Humidity: ${ response.main.humidity +'%' }</h4>
        <h4>Wind Speed: ${ response.wind.speed +'MPH' }</h4>
        `

        $('.city-name').html(block)
        console.log(response);

        // Calls for UV index
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var qURL = "https://api.openweathermap.org/data/2.5/uvi?appid=be01f05cecf15c5e9a29c3550532301c&lat="+lat+"&lon="+lon;
        
        $.ajax({
            url: qURL,
            method: 'GET',
        }).then(function(res) {
            console.log("res: "+JSON.stringify(res));
            var h4 = $("<h4>");
            
            h4.text("UV Index: "+ res.value);
        $(".city-name").append(h4);
        })
        
            
          
    }
});
