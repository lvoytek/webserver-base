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
 * Document: account.js
 *
 * Overview: This document contains functions for getting and handling a user's
 * account information.
 */

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