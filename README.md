# Quiz App

Version: 1.0
Date: 09/05/2018

## Overview

This document demonstrates how to use this implementation of the Quiz apps. The implementation consists of three components:
- the server;
- the quiz app;
- the question setting app.

## Server

### Installation and Usage

The server runs on Node.js® , a JavaScript runtime built on Chrome's V8 JavaScript engine. To download Node.js, visit https://nodejs.org/en/ 

To run the server, simply clone https://github.com/CMudge/server.git in a terminal window by using `git clone https://github.com/CMudge/server.git`. Then execute `node httpServer.js` in a terminal window.

### API

This server has three endpoints:

- `/createQuestion`. This endpoint allows the user to insert a new multiple choice question into the database. The server accepts the following parameters:
	- `question` the text of the question (max 300 characters)
	- `answer1`, `answer2`, `answer3`, `answer4`, which constitute the texts of the four possible answers,
	- `correctAnswer`, an integer between 1 and 4, indicating which of the previously defined answers is correct;
	- `lat` and `lng` defining the POI which the question relates to.
- `/closestQuestion`. This endpoint returns the question with the nearest location attributes to specified latitude and longitude coordinates. It accepts the following parameters:
	- `lat` and `lng` defining the central search locations, for example the location of the user.
- `/submitAnswer`. This endpoint saves the answer provided by the user to a specific question. It accepts the following parameters:
	- `question`, the text of the question;
	- `submittedAnswer`, an integer between 1 and 4, indicating the answer chosen by the user;
	- `mobileUUID`, a unique string identifying the user’s handset.


# Author

Claire Mudge (ztnvudg@ucl.ac.uk)