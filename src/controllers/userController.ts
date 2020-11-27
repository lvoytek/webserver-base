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
import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import { Request, Response } from 'express';

import {user} from '../models/user';
import {unverifiedUser} from '../models/unverifiedUser';

dotenv.config();
const TOKENSECRET: string = process.env.TOKENSECRET as string;
const DOMAIN_NAME: string = process.env.DOMAIN as string;
const USINGHTTPS: boolean = process.env.USINGHTTPS === 'true';

const AUTH_EMAIL: string = process.env.AUTHENTICATIONEMAIL as string;
const AUTH_EMAIL_PASS:string = process.env.AUTHENTICATIONEMAILPASSWORD as string;
const MAIL_SERVICE: string = process.env.MAILSERVICE as string;

type UserDataType =
{
	_id: string,
	email: string,
	fullName: string,
	userName: string,
	password: string,
	passwordHash: string,
	isAdmin: boolean,
	authToken: string,
	accessToken: string
};

/**
 * Create a random 60 character alphanumeric token to be used for email 
 * link verification of a user
 * @return A random 60 character token
 */
function GenerateVerificationToken()
{
	let newKey = "";
	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (let i = 0; i < 60; i++) {
		newKey += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
	}

	return newKey;
}

/**
 * Generate a link for a user to click on in order to verify their account
 * @param email The user's email
 * @param authToken The 60 character token held in the user's unverified account
 * @return A verification link string
 */
function GenerateVerificationLink(email: string, authToken: string)
{
	return ((USINGHTTPS) ? "https" : "http") + "://" + DOMAIN_NAME + "/verify?email=" + email + "&authToken=" + authToken;
}

export class UserController
{
	/**
	 * Show the website's signin page
	 * @param req The HTTP request
	 * @param res The HTTP response being sent back
	 */
	public serveNewUserPage(req: Request, res: Response)
	{
		res.render("signup");
	}

	/**
	 * Show the website's account login page
	 * @param req The HTTP request
	 * @param res The HTTP response being sent back
	 */
	public serveLoginPage(req: Request, res: Response)
	{
		res.render("login");
	}

	/**
	 * Show the user's account info page
	 * @param req The HTTP request
	 * @param res The HTTP response being sent back
	 */
	public serveAccountPage(req: Request, res: Response)
	{
		res.render("account");
	}

	/**
	 * Add a new user to the database without verification
	 * @param req The HTTP request
	 * @param res The HTTP response being sent back
	 */
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

	/**
	 * Add a new unverified user to the database
	 * @param req The HTTP request
	 * @param res The HTTP response being sent back
	 */
	public addUnverifiedUser(req: Request, res: Response)
	{
		const newUserData = req.body as UserDataType;
		const accessToken = GenerateVerificationToken();

		bcryptjs.hash(newUserData.password, 10, (err, hash) =>
		{
			if(err)
				res.status(400).json({"error": err});
			else
			{
				const newUser = new unverifiedUser(
				{
					email: newUserData.email,
					fullName: newUserData.fullName,
					userName: newUserData.userName,
					passwordHash: hash,
					accessToken
				});

				newUser.save((saveErr, item) =>
				{
					if(err)
						res.status(400).json({"error": saveErr});
					else
					{
						const transporter = nodemailer.createTransport(
						{
							service: MAIL_SERVICE,
							auth:
							{
								user: AUTH_EMAIL,
								pass: AUTH_EMAIL_PASS
							}
						});

						const mailOptions =
						{
							from: AUTH_EMAIL,
							to: newUserData.email,
							subject: "Verify your Account",
							text: "Click on the link to verify your " + DOMAIN_NAME + " account: \n" + GenerateVerificationLink(newUserData.email, accessToken)
						};

						transporter.sendMail(mailOptions, (mailErr, mailInfo) =>
						{
							if(mailErr)
								res.status(400).json({"error": mailErr});
							else
								res.status(201).json({"message": "Success: Check your email for verification link"});
						});
					}
				});
			}
		});
	}

	/**
	 * Authenticate a login request
	 * @param req The HTTP request
	 * @param res The HTTP response being sent back
	 */
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
					if (bcryptErr)
						res.status(500).json({"error" : "Authentication error. Contact support."});

					else if(valid)
					{
						const authToken = jwt.encode({email: req.body.email, userName: req.body.userName}, TOKENSECRET);
						res.status(200).json({"message": "success", "authToken": authToken});
					}
					else
						res.status(400).json({error : "Email or password invalid."});
				});
			}
		});
	}

	/**
	 * Send back info to a user if they have the correct auth token
	 * @param req The HTTP request
	 * @param res The HTTP response being sent back
	 */
	public getUserInfo(req: Request, res: Response)
	{
		if(!req.headers["x-auth"])
			res.status(403).json({"error": "Invalid auth token"});
		else
		{
			const decodedEmail = jwt.decode(req.headers["x-auth"] as string, TOKENSECRET);

			user.findOne({email: decodedEmail.email}, (err, usr: UserDataType) =>
			{
				if (err)
					res.status(500).json({"error" : "Can't connect to DB"});

				else if(!usr)
					res.status(403).json({"error": "Invalid auth token"});

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
	}

	/**
	 * Verify a user from an emailed link
	 * @param req The HTTP request
	 * @param res The HTTP response being sent back
	 */
	public verifyUser(req: Request, res: Response)
	{
		if(req.query.email && req.query.authToken)
		{
			unverifiedUser.findOne({email: req.query.email}, (err, usr: UserDataType) =>
			{
				if (err)
					res.status(500).json({"error" : "Can't connect to DB"});

				else if(!usr)
					res.status(400).json({"error" : "Invalid authorization link"});
				else
				{
					if (req.query.authToken === usr.accessToken)
					{
						const newUser = new user(
						{
							email: usr.email,
							fullName: usr.fullName,
							userName: usr.userName,
							passwordHash: usr.passwordHash
						});

						unverifiedUser.deleteOne({_id: usr._id});

						newUser.save((saveErr, item) =>
						{
							if(err)
								res.status(400).json({"error": saveErr});
							else
								res.render("index");
						});
					}
					else
						res.status(400).json({error : "Invalid authorization link"});
				}
			});
		}
		else
			res.status(403).json({"error": "Missing parameters"});
	}
}