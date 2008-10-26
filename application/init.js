App = {}

App.init = function() {
	
	window.htmlLoader.navigateInSystemBrowser = true;
	
	/*
		Init and load prefs
	*/
	App.Prefs = new FunkyPrefs({
		'searches':['spaz', 'al3x', 'poop']
	});
	App.Prefs.load();
	
	
	
	App.View.init();
	
	App.Model.init();
	
	App.Controller.init();
	
};
