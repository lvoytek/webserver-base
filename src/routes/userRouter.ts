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
 * Document: baseRouter.ts
 *
 * Overview: This document acts as an Express router for base server endpoints
 */

import express from "express";

import {UserController} from "../controllers/userController";

export class UserRouter
{
	public userController: UserController = new UserController();

	/**
	 * Add routing locations for the website
	 * @param app The global Express app
	 */
	public userRoute(app: express.Application): void
	{
		// get the new user page
		app.route('/new-user').get(this.userController.serveNewUserPage);

		// get the user's account page
		app.route('/account').get(this.userController.serveAccountPage);

		app.route('/login')

			// get the login page
			.get(this.userController.serveLoginPage)

			// attempt to log in
			.post(this.userController.authenticateUser);

		app.route('/users')

			// handle base model objects
			.post(this.userController.addUser)

			// get info on a user if authorized
			.get(this.userController.getUserInfo);
	}
}