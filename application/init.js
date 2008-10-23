App = {}

App.init = function() {
	
	window.htmlLoader.navigateInSystemBrowser = true;
	
	App.View.init();
	
	App.Model.init();
	
	App.Controller.init();
	
};
