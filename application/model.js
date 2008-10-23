/*
	Model controls reading and writing of data. Triggers view methods via events when appropriate
*/

App.Model = {}

App.Model.init = function() {
	
	
	
};


App.Model.getSearchResults = function(searchstr) {
	air.trace('gettingSearchResults');
	$.ajax({
		'url':'http://search.twitter.com/search.json?',
		'data':{
			"rpp": 50,
			"q": searchstr,
		},
		'dataType':'text',
		'type':'GET',
		'success':function(data, textStatus) {
			
			$().trigger('beginNewSearchResults');
			
			data = JSON.parse(data);
			
			$.each(data.results, function() {
				this.searchstr = searchstr;
				var then = new Date(this.created_at);
				this.unixdate = then.getTime();
				this.relative_time = 
				App.View.addMessage(this);
			});
			
			$().trigger('endNewSearchResults');
			
			// air.trace(JSON.stringify(data.results));
		},
		'error':function() {
			air.trace('there was an error');
		}
	});
	
};