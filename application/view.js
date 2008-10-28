/*
	View controls modifications to the UI
*/

App.View = {}

App.View.init = function() {
	App.Prefs.loadWindowState();
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
	msgelm += '<div class="message-text"><strong><a href="http://twitter.com/'+msgobj.from_user+'" title="'+msgobj.from_user+'">'+msgobj.from_user +'</a>:</strong> ';
	msgelm += autolink_twitter(autolink(msgobj.text));
	msgelm += '</div>';
	msgelm += '<div class="message-meta"><a href="http://twitter.com/'+msgobj.from_user+'/status/'+msgobj.id+'">'+get_relative_time(msgobj.created_at)+'</a> <a href="http://twitter.com/home?status=@'+msgobj.from_user+'&in_reply_to_status_id='+msgobj.id+'">↩</a></div>';
	msgelm += '</div>';
	msgelm += '</li>';
	return msgelm;
};



App.View.setSelectedSearch = function(selected_elm) {
	$('.saved-search').removeClass('selected');
	$(selected_elm).addClass('selected');
}


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


App.View.deleteSearch = function(searchstr) {
	$('.saved-search').each( function(i) {
		if ($(this).text() == searchstr) {
			$(this).remove();
		}
	})
};


App.View.showSearchContextMenu = function(e) {
	var contextMenu = App.View.buildSearchContextMenu(e);
	contextMenu.display(window.nativeWindow.stage, e.clientX, e.clientY);
};


App.View.buildSearchContextMenu = function(e) {
	var search = $(e.target).text();
	air.trace('search to delete:'+search);
	var con_menu = new air.NativeMenu();
    var command = con_menu.addItem(new air.NativeMenuItem("Delete search"));
    command.addEventListener(air.Event.SELECT, function(e) {
		$().trigger('deleteSearch', [search]);
	});
    return con_menu;
    
};


App.View.showStatus = function(msg) {
	if (App.View.statusTimeout) {
		clearTimeout(App.View.statusTimeout);
	}

	$('#statusbar-wrapper').show();
	$('#statusbar').html(msg);
	if (!$('#statusbar').is(':visible')) {
		$('#statusbar').show('slide', {direction:'down'}, 250);
	}
	
	App.View.statusTimeout = setTimeout(App.View.hideStatus, 6000);

};



App.View.hideStatus = function() {
	$('#statusbar').hide('slide', {direction:'down'}, 250, function() {
		$('#statusbar').html('');
		$('#statusbar-wrapper').hide();
	});
};