/*
	View controls modifications to the UI
*/

App.View = {}

App.View.init = function() {
	
};


App.View.addMessage = function(msgobj) {
	if ($('#'+msgobj.id).length < 1) {
		var msgelm = App.View.createMessageElement(msgobj);
		$.data(msgelm, 'unixtime', msgobj.unixtime);
		$('#messagelist').append(msgelm);
	}
};


App.View.createMessageElement = function(msgobj) {
	var msgelm  = '';
	msgelm += '<li class="message" id="'+msgobj.id+'">';
	msgelm += '<div class="message-avatar"><a href="http://twitter.com/'+msgobj.from_user+'" title="'+msgobj.from_user+'"><img src="'+msgobj.profile_image_url+'" title="'+msgobj.from_user+'" /></a></div>';
	msgelm += '<div class="message-body">';
	msgelm += '<div class="message-text">'+autolink(msgobj.text)+'</div>';
	msgelm += '<div class="message-meta"><a href="http://twitter.com/'+msgobj.from_user+'/status/'+msgobj.id+'">'+get_relative_time(msgobj.created_at)+' #</a></div>';
	msgelm += '</div>';
	msgelm += '</li>';
	return msgelm;
};


App.View.clearMessageList = function() {
	$('#messagelist').empty();
};


App.View.beginNewSearchResults = function() {
	App.View.clearMessageList();
}

App.View.endNewSearchResults = function() {
	$('.message:even').addClass('even');
	$('.message:odd').addClass('odd');
}

App.View.promptForNewSearch = function() {
	var rs = prompt("Enter a new search:", 'spaz');
	if (rs) {
		air.trace('promptForNewSearch:'+rs);
		$().trigger('newSearchSubmitted', [rs.toString()]);
	}
};

App.View.createSearchElement = function(str) {
	air.trace('createSearchElement:'+str);
	var srel  = '';
	srel += '<li class="saved-search">'+str+'</li>';
	return srel;
};

App.View.addNewSearch = function(str) {
	air.trace('addNewSearch:'+str);
	var srel = App.View.createSearchElement(str);
	$('#saved-searches').append(srel);
};




