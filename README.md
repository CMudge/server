# Quiz App

Version: 1.0

Date: 09/05/2018

## Overview

This document demonstrates how to use this implementation of the Quiz apps. The implementation consists of three components:
1. the server, written in Node.js;
2. the quiz client, an Android app;
3. the question setting app, a Web application accessible via a browser.

## Server

The server allows the user to insert new questions into the database, retrieve questions that are close to a location and save answers provided by users.

### Installation and Usage

The server runs on Node.js®, a JavaScript runtime built on Chrome's V8 JavaScript engine. To download Node.js, visit https://nodejs.org/en/ 

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

## Quiz client

The quiz client tracks a user’s location and pops up a multiple-choice question as the user nears a question location. The app then displays the question, 4 possible answers, and asks the user to indicate which is the correct answer. Finally, the user’s answer is submitted to the server, which saves it.

### Building and Installation

The app requires Adobe PhoneGap in order to be built. The following steps can be followed:
- Register and sign in to Adobe PhoneGap Build.
- Create a new app.
- Specify the app GitHub repository `https://github.com/CMudge/quiz`.
- Build the app.
- Scan the QR code with your device to install the app.
- Follow the instructions on the device to complete the installation.

### Implementation details

The mobile app is built using Adobe PhoneGap, an open-source distribution of Cordova. 
Available for download at:
http://docs.phonegap.com/getting-started/1-install-phonegap/desktop/

The app uses the Leaflet API, an open-source Javascript library, available at:
https://leafletjs.com/download.html

The app design uses the Google Material Design Lite template, available at:
https://getmdl.io

## Question setting client

The question setting app is a web app which allows a user to enter a multiple-choice question for a location-based quiz. The app prompts the user for a written question, 4 written possible answers, and asks the user to indicate which is the correct answer. The location for the question is set by simply clicking on the chosen location on the map. Finally, the data is to a server, which saves it in a database.

### Running the client

The client can be served using PhoneGap and typing in a terminal `phonegap serve --no-autoreload`. The client can be then accessed through a web browser.

### Implementation details

The mobile app is built using Adobe PhoneGap, an open-source distribution of Cordova. 
Available for download at:
http://docs.phonegap.com/getting-started/1-install-phonegap/desktop/

The app uses the Leaflet API, an open-source Javascript library, available at:
https://leafletjs.com/download.html

The app design uses the Google Material Design Lite template, available at:
https://getmdl.io
———————————————

# Author

Claire Mudge (ztnvudg@ucl.ac.uk)