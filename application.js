var secrets = require('./secrets');

$(function() {
  var weather_stations, selected_station, selected_date, parsed_date, parsed_station;

  //returns an array with the station name and country or state code to use in 
  //the WU http request for historical weather data
  var parse_weather_station = function(station_name) {
  	var split = station_name.split(', ');
  	var parsed = split.map(function(word) {
      return word.replace(/ /g, "_");
  	});
  	return parsed
  }

  var parse_date = function(date) {
  	return date.replace(/-/g, "");
  }

	var get_city_list =  function(query) {
		$.ajax({
			url: "http://autocomplete.wunderground.com/aq?cb=cb_func&query=" + query,
			type: "GET",
			dataType: "jsonp",
			callback: "cd_func"
		});
	}

		window.cb_func = function(result) {
    console.log(result);
		$.each(result, function(indexInArray, value) {
			console.log(value);
			console.log(indexInArray)
			$.each(value, function(idx, result) {
				console.log(result);
				$("<li>")
				.data("name", result.name)
				.addClass("weather-station")
				.text(result.name)
				.appendTo("#search-results");
			});
		});
	}


	var get_weather_data = function(date, station_name, country) {
    //http://api.wunderground.com/api/[KEY]/history_YYYYMMDD/q/CA/San_Francisco.json
    		$.ajax({
			url: "http://api.wunderground.com/api/" + secrets['key'] + "/history_" + date + "/q/" + country + "/" + station_name + ".json",
			type: "GET",
			dataType: "jsonp",
			success: function(data) {
        console.log(data);
				var rainInches = data.history.dailysummary[0].rain;
				$("<div>")
				.text(rainInches + " Inches")
				.addClass(".rain-inches")
				.appendTo(".rainfall");			
			}  // need a different call back
		});
	}

	//add callback to get rainfall in inches and display on page

	window.cb_func = function(result) {
    console.log(result);
		$.each(result, function(indexInArray, value) {
			console.log(value);
			console.log(indexInArray)
			$.each(value, function(idx, result) {
				console.log(result);
				$("<li>")
				.data("name", result.name)
				.addClass("weather-station")
				.text(result.name)
				.appendTo("#search-results");
			});
		});
}

	$('#search').submit(function(event) {
		console.log("searching");
		event.preventDefault();

		var value = {};
		$.each($('#search').serializeArray(), function(i, field) {
			value[field.name] = field.value;
		});
    selected_date = value['date'];
		get_city_list(value['query']);
	})

	$('#search-results').on('click', '.weather-station', function(){
    $(this).css('background-color', '#add8e6')
           .siblings()
           .remove();
    selected_station = $(this).data('name');
    parsed_station = parse_weather_station(selected_station);
    parsed_date = parse_date(selected_date);
    console.log(parsed_date, parsed_station);
	  get_weather_data(parsed_date, parsed_station[0], parsed_station[1]);
	});
});
