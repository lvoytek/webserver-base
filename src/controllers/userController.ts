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
 * Document: userController.ts
 *
 * Overview: This document handles the logic within user router endpoints
 */

import bcryptjs from "bcryptjs";
import jwt from "jwt-simple";
import * as dotenv from "dotenv";
import { Request, Response } from 'express';

import {user} from '../models/user';

dotenv.config();
const TOKENSECRET: string = process.env.TOKENSECRET as string;

type UserDataType =
{
	email: string,
	fullName: string,
	userName: string,
	password: string,
	passwordHash: string,
	isAdmin: boolean
};

export class UserController
{
	public serveNewUserPage(req: Request, res: Response)
	{
		res.render("signup");
	}

	public serveLoginPage(req: Request, res: Response)
	{
		res.render("login");
	}

	public addUser(req: Request, res: Response)
	{
		const newUserData = req.body as UserDataType;

		bcryptjs.hash(newUserData.password, 10, (err, hash) =>
		{
			if(err)
				res.status(400).json({"error": err});
			else
			{
				const newUser = new user(
				{
					email: newUserData.email,
					fullName: newUserData.fullName,
					userName: newUserData.userName,
					passwordHash: hash
				});

				newUser.save((saveErr, item) =>
				{
					if(err)
						res.status(400).json({"error": saveErr});
					else
						res.status(201).json({"message": "success"});
				});
			}
		});
	}

	public authenticateUser(req: Request, res: Response)
	{
		user.findOne({email: req.body.email}, (err, usr: UserDataType) =>
		{
			if (err)
				res.status(500).json({"error" : "Can't connect to DB"});

			else if(!usr)
				res.status(400).json({"error" : "Email or password invalid."});

			else
			{
				bcryptjs.compare(req.body.password, usr.passwordHash, (bcryptErr, valid) =>
				{
					if (err)
					res.status(500).json({"error" : "Authentication error. Contact support."});

					else if(valid)
					{
					const authToken = jwt.encode({email: req.body.email}, TOKENSECRET);
					res.status(200).json({"message": "success", "authToken": authToken});
					}
					else
					res.status(400).json({error : "Email or password invalid."});
				});
			}
		});
	}

	public getUserInfo(req: Request, res: Response)
	{
		const correctAuthToken : string = jwt.encode({email: req.body.email}, TOKENSECRET);
		
		if(correctAuthToken == req.body.authToken)
		{
			user.findOne({email: req.body.email}, (err, usr: UserDataType) =>
			{
				if (err)
					res.status(500).json({"error" : "Can't connect to DB"});

				else if(!usr)
					res.status(400).json({"error" : "Email or password invalid."});

				else
				{
					res.status(200).json(
					{
						email: usr.email,
						fullName: usr.fullName,
						userName: usr.userName,
						isAdmin: usr.isAdmin
					});
				}
			});
		}
		else
		{
			res.status(403).json({"error": "Invalid auth token"});
		}
	}
}