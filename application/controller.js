/*
	Controller handles events and triggers model and/or view methods
*/

App.Controller = {}

App.Controller.init = function() {
	
	
	/*
		DOM event bindings via delegation
	*/
	$('#sidebar').intercept( 'click', {
		
			'.saved-search': function(e) {
				var searchstr = $(e.target).text();
				App.Model.getSearchResults(searchstr);
			},
		
			'#add-search': function(e) {
				App.View.promptForNewSearch();
			},

		}
	);


	


	/*
		Custom event bindings
	*/
	$().bind('beginNewSearchResults', function() {
		App.View.beginNewSearchResults();
	});

	$().bind('endNewSearchResults', function() {
		App.View.endNewSearchResults();
	});
	
	$().bind('newSearchSubmitted', function(e, str) {
		// update the model
		air.trace('newSearchSubmitted:'+str);
		App.Model.addSearch(str);
	});
	
	$().bind('searchAdded', function(e, str) {
		// update the view
		air.trace('searchAdded:'+str);
		App.View.addNewSearch(str);
	});
};