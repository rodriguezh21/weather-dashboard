$(document).ready(function(){
    
    var cities = [];
    
    // params
    let options = {
        APPID: "be01f05cecf15c5e9a29c3550532301c",

    }
    
    let baseURL = "http://api.openweathermap.org"
    
    $('.search-button').on('click', () =>{
        $.ajax({
            url: `${ baseURL }/data/2.5/weather?q=${$('#city-input').val()}&${ $.param(options)}`,
            method: 'GET',
        }).then(response => {
            getWeather(response)
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
        cities.push('Recent Searches  '+capCity);
        
        for(var i=0;i<cities.length;i++){
            var h4 = $("<h4>");
            h4.text(cities[i]);
            $("#c").append(h4);
        }
        
        let block = `
        <h2>${capCity} <span> ${date} </span></h2>
        <h4>Temperature: ${ celsius +'°C / '+ fahrenheit + '°F' }</h4>
        <h4>Humidity: ${ response.main.humidity +'%' }</h4>
        <h4>Wind Speed: ${ response.wind.speed +'MPH' }</h4>
        `

        $('.city-name').html(block)
        console.log(response);

        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var qURL = "http://api.openweathermap.org/data/2.5/uvi?appid=be01f05cecf15c5e9a29c3550532301c&lat="+lat+"&lon="+lon;
        
        $.ajax({
            url: qURL,
            method: 'GET',
        }).then(function(res) {
            console.log("res: "+JSON.stringify(res));
            var h3 = $("<h3>");
            console.log(res.value);
            h3.text("UV Index: "+ res.value);
        $(".uv-index").append(h3);
        })
    }
});
