/*
	Controller handles events and triggers model and/or view methods
*/

App.Controller = {}

App.Controller.init = function() {
	
	// applying these intercepts to the whole document
	$('#sidebar').intercept( 'click',
		'.saved-search', function(e) {
			var searchstr = $(e.target).text();
			App.Model.getSearchResults(searchstr);
		}
	);






	$().bind('beginNewSearchResults', function() {
		App.View.beginNewSearchResults();
	});

	$().bind('endNewSearchResults', function() {
		App.View.endNewSearchResults();
	});
};