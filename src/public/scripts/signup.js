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
 * Document: signup.js
 *
 * Overview: This file contains the functions used by the signup page for creating
 * a new user.
 */

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