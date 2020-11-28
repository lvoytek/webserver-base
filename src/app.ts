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
 * Document: app.ts
 *
 * Overview: This document contains code for server initialization and
 * the basic routing system. It takes incoming requests and sends them
 * to the proper router.
 */

import express from "express";
import bodyParser from "body-parser";
import path from "path";

import {BaseRouter} from "./routes/baseRouter";
import {UserRouter} from "./routes/userRouter";
import {requestHandlers} from './controllers/requestHandlers';

class App
{
	public app: express.Application;

	// Routers
	public baseRouter: BaseRouter = new BaseRouter();
	public userRouter: UserRouter = new UserRouter();

	/**
	 * Runs all server initialization code
	 */
	constructor()
	{
		// Initialize Express server, database, and set up routing
		this.app = express();
		this.config();
		this.baseRouter.baseRoute(this.app);
		this.userRouter.userRoute(this.app);
		this.finalRoute();
	}

	/**
	 * Configures cross origin ajax request access and JSON body parsing
	 */
	private config(): void
	{
		this.app.use(express.json());
		this.app.use(express.static("dist/public"));

		// This allows AJAX requests to be made to the server from other applications like JCT Word
		this.app.use((req, res, next) =>
		{
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
			res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
			res.setHeader('Access-Control-Allow-Credentials', 'true');

			next();
		});

		this.app.set("views", path.join(__dirname, "views"));
		this.app.set("view engine", "ejs");

		// Use body parser to obtain JSON information from incoming request bodies
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: false }));
	}

	/**
	 * If no other routes work then the route ends up here resulting in 404
	 */
	private finalRoute(): void
	{
		this.app.use((req, res, next) =>
		{
			res.render("notfound", {mobile: requestHandlers.isRequestFromMobile(req)});
		});
	}
}

export default new App().app;