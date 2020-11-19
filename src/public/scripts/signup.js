function sendRegisterRequest()
{
	let username = $('#username').val();
	let email = $('#email').val();
	let password = $('#password').val();
	let fullName = $('#fullName').val();
	let passwordConfirm = $('#passwordConfirm').val();

	if (password != passwordConfirm)
	{
		$('#ServerResponse').html("<span class='red-text text-darken-2'>Passwords do not match.</span>");
		$('#ServerResponse').show();
	}
	else
	{ 
		var alphanumericTest = /^[a-zA-Z0-9_]{8,}$/;
		if (alphanumericTest.test(password))
		{
			$.ajax({
			url: '/users',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(
			{
				email: 	email, 
				fullName: fullName, 
				userName: username,
				password: password
			}),
			dataType: 'json'
			})
			.done(registerSuccess)
			.fail(registerError);
		} 
		else
		{
			$('#ServerResponse').html("<span class='red-text text-darken-2'>Password needs to be alphanumeric and at least 8 characters.</span>");
			$('#ServerResponse').show();
		}
	}
}

function registerSuccess(data, textStatus, jqXHR)
{
	if (data.error)
	{
		$('#ServerResponse').html("<span class='red-text text-darken-2'>Error: " + data.error + "</span>");
		$('#ServerResponse').show();
	}
	else
	{
		window.location.replace('/account');
	}
}
  
function registerError(jqXHR, textStatus, errorThrown)
{
	$('#ServerResponse').html("<span class='red-text text-darken-2'>Error: " + jqXHR.responseText + "</span>");
}

$(function ()
{
	$('#signup').click(sendRegisterRequest);
});