function requestAccountInfo()
{
	$.ajax({
		url: '/users',
		type: 'GET',
		headers: { 'x-auth': window.localStorage.getItem("authToken") },
		dataType: 'json'
	})
	.done(accountInfoSuccess)
	.fail(accountInfoError);
}

function accountInfoSuccess(data, textSatus, jqXHR)
{
	$("#email").html("Email: " + data.email);
	$("#fullName").html("Full Name: " + data.fullName);
	$("#userName").html("Username: " + data.userName);
	$("#isAdmin").html("Admin Status: " + ((data.isAdmin) ? "Admin" : "Normal User"));
}
  
function accountInfoError(jqXHR, textStatus, errorThrown)
{
	if(jqXHR.status === 403)
	{
		window.localStorage.removeItem("authToken");
		window.location.replace("/login");
	} 
	else
	{
		$("#ServerResponse").html("Error: " + status.message);
		$("#ServerResponse").show();
	} 
}

$(function()
{  
	if(!window.localStorage.getItem('authToken'))
		window.location.replace('/login');
	else
		requestAccountInfo();
});