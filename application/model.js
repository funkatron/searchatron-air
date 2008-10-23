/*
	Model controls reading and writing of data. Triggers view methods via events when appropriate
*/

App.Model = {}

App.Model.init = function() {
	
	/*
		load up searches and display in view
	*/
	App.Model.savedSearches = App.Model.loadSearches();
	$.each(App.Model.savedSearches, function(i) {
		App.View.addNewSearch(this);
	});
	
};


App.Model.getSearchResults = function(searchstr) {
	air.trace('gettingSearchResults');
	$.ajax({
		'url':'http://search.twitter.com/search.json?',
		'data':{
			"rpp": 50,
			"q":   searchstr,
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


App.Model.addSearch = function(str) {
	App.Model.savedSearches.push(str);
	$().trigger('searchAdded', [str]);
};



App.Model.loadSearches = function() {
	
	var searches = ['"twitter api"', 'al3x', 'scala', 'spaz'];
	
	return searches;
};