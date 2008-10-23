/*
	This is a port of the CodeIgniter helper "autolink" to javascript
*/
function autolink(str, type, popup) {
	if (!type) {
		type = 'both';
	}

	var re_noemail = /(^|\s|\()((http(s?):\/\/)|(www\.))(\w+[^\s\)<]+)/gi;
	var re_nourl   = /([a-zA-Z0-9_\.\-\+]+)@([a-zA-Z0-9\-]+)\.([a-zA-Z0-9\-\.]*)/gi;
	
	// air.trace(re_nourl);
	// air.trace(re_noemail);

	if (type != 'email')
	{
		if (ms = re_noemail.exec(str)) {
			air.trace(ms.toString());
			var pop = (popup == true) ? " target=\"_blank\" ": "";
			var period = ''
			if ( /\.$/.test(ms[6]) ) {
				period = '.';
				ms[6] = ms[6].slice(0, -1);
			}
			
			/*
				sometimes we can end up with a null instead of a blank string,
				so we need to force the issue in javascript.
			*/
			for (var x=0; x<ms.length; x++) {
				if (!ms[x]) {
					ms[x] = '';
				}
			}

			var newstr = ms[1]+'<a href="http'+ms[4]+'://'+ms[5]+ms[6]+'"'+pop+'>http'+ms[4]+'://'+ms[5]+ms[6]+'</a>'+period;
			str = str.replace(ms[0], newstr);
			air.trace(str)

		}
	}

	if (type != 'url')
	{
		if (ms = re_nourl.exec(str))
		{
			// alert(ms.toString());
			
			var period = ''
			if ( /\./.test(ms[3]) ) {
				period = '.';
				ms[3] = ms[3].slice(0, -1);
			}
			
			air.trace(ms);
			air.trace(str);
			/*
				sometimes we can end up with a null instead of a blank string,
				so we need to force the issue in javascript.
			*/
			for (var x=0; x<ms.length; x++) {
				if (!ms[x]) {
					ms[x] = '';
				}
			}
			str = str.replace(ms[0], '<a href="mailto:'+ms[1]+'@'+ms[2]+'.'+ms[3]+'">'+ms[1]+'@'+ms[2]+'.'+ms[3]+'<a/>'+period);
			air.trace(str);
			// for (i = 0; i < sizeof(matches['0']); i++)
			// {
			// 	period = '';
			// 	if (preg_match("|\.|", matches['3'][i]))
			// 	{
			// 		period = '.';
			// 		matches['3'][i] = substr(matches['3'][i], 0, -1);
			// 	}
			// 
			// 	
			// }
		}
	}

	return str;


}