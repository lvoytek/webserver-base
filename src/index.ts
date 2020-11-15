import * as dotenv from "dotenv";
import express from "express";

//get environment variables
dotenv.config();

//confirm port value exists as an environment variable
if (!process.env.PORT)
{
	process.exit(1);
}
 
//set server's port number and initialize express
const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

app.use(express.json());

const server = app.listen(PORT, () =>
{
	console.log(`Listening on port ${PORT}`);
});