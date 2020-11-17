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

		// get the login page
		app.route('/login').get(this.userController.serveLoginPage);

		// handle base model objects
		app.route('/users').post(this.userController.addUser);
	}
}