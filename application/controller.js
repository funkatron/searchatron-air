/*
	Controller handles events and triggers model and/or view methods
*/

App.Controller = {}

App.Controller.init = function() {
	
	
	/*
		Window event bindings
	*/
	window.nativeWindow.addEventListener(air.Event.CLOSING, function(e) {
		App.Prefs.saveWindowState();
		App.Prefs.save();
	});
    window.nativeWindow.addEventListener(air.NativeWindowBoundsEvent.RESIZE, function(e) {
		App.Prefs.saveWindowState();
	});
    window.nativeWindow.addEventListener(air.NativeWindowBoundsEvent.MOVE, function(e) {
		App.Prefs.saveWindowState();
	});

	
	
	/*
		DOM event bindings via delegation
	*/
	$('#sidebar').intercept( 'click', {
		
		'.saved-search': function(e) {
			var searchstr = $(e.target).text();
			App.Prefs.set('current-search', searchstr);
			App.View.setSelectedSearch(e.target);
			$().trigger('startSearch');
		},
	
		'#add-search': function(e) {
			App.View.promptForNewSearch();
		},

	} );
	$('#sidebar').intercept( 'contextmenu', {
		
		'.saved-search': function(e) {
			e.preventDefault();
			App.View.showSearchContextMenu(e);
		},
		
	} );

	


	/*
		Custom event bindings
	*/
	$().bind('startSearch', function() {
		App.View.showStatus("Sending search request…");
		var searchstr = App.Prefs.get('current-search');
		if (searchstr) {
			App.Model.getSearchResults(searchstr);
		}
	});
	
	$().bind('beginNewSearchResults', function(e) {
		App.View.showStatus("Processing response…");
		App.View.beginNewSearchResults();
	});

	$().bind('endNewSearchResults', function(e) {
		App.View.hideStatus();
		App.View.endNewSearchResults();
	});
	
	$().bind('newSearchSubmitted', function(e, str) {
		// update the model
		air.trace('newSearchSubmitted:'+str);
		App.Model.addSearch(str);
		
		// update the view
		air.trace('searchAdded:'+str);
		App.View.addNewSearch(str);
	});
	
	$().bind('deleteSearch', function(e, searchstr) {
		// update view
		App.View.deleteSearch(searchstr);
		
		// update model
		App.Model.deleteSearch(searchstr);
	});

	
	$().bind('refreshCurrentView', function() {
		$().trigger('startSearch');
	})


	/*
		Repeating timed events
	*/
	App.Controller.timers = {};
	App.Controller.timers.refresh = $.timer(App.Prefs.get('refresh-rate'), function() {
		$().trigger('startSearch');
	});

};