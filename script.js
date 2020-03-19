$(document).ready(function(){
    
    var cities = [];
    
    // params
    let options = {
        APPID: "be01f05cecf15c5e9a29c3550532301c",

    }

    

    // click again
    
    

    // intro
    var intro = $("<h1>");
    intro.text("Your Daily Forecast!");
    $('.city-name').append(intro)
    
    $('.search-button').on('click', () =>{
        
        let baseURL = "https://api.openweathermap.org"
        var city = $('#city-input').val();
        $.ajax({
            url: `${ baseURL }/data/2.5/weather?q=${city}&${ $.param(options)}`,
            method: 'GET',
        }).then(response => {
            getWeather(response);
            // forecast call 
            var fUrl = "https://api.openweathermap.org"
            
            $.ajax({
                url: `${fUrl}/data/2.5/forecast/?q=${city}&${ $.param(options)}`,
                method: 'GET',
            }).then(function(cast) {
                console.log((cast));
                $(".forecast").empty();

            //     // loops 5 days
                for(var i=0;i<120;i+=24){
                
                let fBlock = `
                <div class='col-md-2 col-sm-6 col-sm-12'>
                <div class='columns'>
                <h4>${ cast.list[i].dt_txt }</h4><br>
                <i class= ${cast.data[i].weather.icon}> </i>
                <h5>Temp: ${ cast.list[i].main.temp+ '°F' }</h5>
                <h5>Humidity: ${ cast.data[i].rh +'%' }</h5></div></div>`;
                
                $('.forecast').append(fBlock)
            }
            
            // <img src="http://openweathermap.org/img/wn/${cast.weather[0].icon}.png"/>
            })
        })
        })
       

    // })
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
            var h5 = $("<h5>");
            var hr = $("<hr>");
            h5.text(cities[i]);
            
            $("#c").append(h5);
            $("#c").append(hr);
        }
        

        // block for today's weather
        let block = `
        <h2>${capCity} ${date}<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}.png"/></h2>
        
        <h5>Temperature: ${ celsius +'°C / '+ fahrenheit + '°F' }</h5>
        <h5>Humidity: ${ response.main.humidity +'%' }</h5>
        <h5>Wind Speed: ${ response.wind.speed +'MPH' }</h5>
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
        
            var h4 = $("<h4>");
            
            h4.text("UV Index: "+ res.value);
        $(".city-name").append(h4);

            
        })
        
            
          
    }
});
