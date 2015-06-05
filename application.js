

$(function() {
  var weather_stations;
	var get_history = function(location, date){
		$.ajax({
			url : "http://api.wunderground.com/api/" + WU_KEY + "/geolookup/conditions/q/IA/" + location + ".json",
			dataType : "jsonp",
			success : function(parsed_json) {
		console.log("success");
			}
		});
	}

	var get_city_list =  function(query) {
		$.ajax({
			url: "http://autocomplete.wunderground.com/aq?cb=cb_func&query=" + query,
			type: "GET",
			dataType: "jsonp",
			callback: "cb_func"
		});
	}

	var get_weather_data = function(date, country, station_name) {
		
	}

	window.cb_func = function(result) {
    console.log(result);
		$.each(result, function(indexInArray, value) {
			console.log(value);
			console.log(indexInArray)
			$.each(value, function(idx, result) {
				console.log(result);
				$("<li>")
				.data("country_code", result.c)
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
    
		console.log(value);
		get_city_list(value['query'])
	})
});
