

$(function() {

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
			url: "http://autocomplete.wunderground.com/aq?query=" + query,
			type: "GET",
			dataType: "jsonp",
			success: function(parsed_json) {
	console.log("getting city list");
}
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
	})
});