/**
 * MIT License
 *
 * Copyright (c) 2020 Lena Voytek
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Document: login.js
 *
 * Overview: This document contains functions used by the login page to authenticate
 * a user.
 */

function sendSigninRequest()
{
	let email = $('#email').val();
	let password = $('#password').val();

	$.ajax(
	{
		url: '/login',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify({ email : email, password : password }), 
		dataType: 'json'
	})
	.done(signinSuccess)
	.fail(signinError);
}

function signinSuccess(data, textSatus, jqXHR)
{
	window.localStorage.setItem('authToken', data.authToken);
	window.location = "/account";
}

function signinError(jqXHR, textStatus, errorThrown)
{
	if (jqXHR.statusCode == 404)
	{
		$('#ServerResponse').html("<span class='red-text text-darken-2'>Server Unavailable</p>");
		$('#ServerResponse').show();
	}
	else
	{
		$('#ServerResponse').html("<span class='red-text text-darken-2'>Error: " + jqXHR.responseJSON.error + "</span>");
		$('#ServerResponse').show();
	}
}

$(function()
{  
	if( window.localStorage.getItem('authToken'))
		window.location.replace('/account');
	else
	{
		$('#signin').click(sendSigninRequest);
		$('#password').keypress(function(event)
		{
			if( event.which === 13 )
				sendSigninRequest();
		});
	}
});