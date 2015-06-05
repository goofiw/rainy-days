

$(function() {
  var weather_stations, selected_station;

  var parse_weather_station = function(station_name) {
  	return 'split:', station_name.split(', ');
  }
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

	var get_weather_data = function(date, station_name) {
    //http://api.wunderground.com/api/[KEY]/history_YYYYMMDD/q/CA/San_Francisco.json
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

	$('#search-results').on('click', '.weather-station', function(){
    $(this).css('background-color', '#add8e6')
           .siblings()
           .remove();
    selected_station = $(this).data('name');
    console.log(parse_weather_station(selected_station));
	});
});
