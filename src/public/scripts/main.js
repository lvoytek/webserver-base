$(function ()
{
	if(window.localStorage.getItem('authToken'))
		$('#signinbutton').html("Account");
});