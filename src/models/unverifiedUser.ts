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
 * Document: unverifiedUser.ts
 *
 * Overview: This document contains the MongoDB object model for a user who still
 * needs to verify their email
 */

import {db} from '../db';

const Schema = db.Schema;

const UnverifiedUser = new Schema(
{
	email:			{ type: String, required: true, unique: true },
	fullName:		{ type: String, required: true },
	userName:		{ type: String, required: true },
	passwordHash:	String,
	accessToken:	{ type: String, required: true},
	creationTime:	{ type: Date, default: Date.now}
});

export const unverifiedUser = db.model('UnverifiedUser', UnverifiedUser);