# A NodeJS Gmail Client

A Gmail client which uses gmail API to send emails from node client

## Setup

* Clone repo
* Run `yarn install`
* visit https://developers.google.com/gmail/api/quickstart/nodejs and click on the Enable Gmail-Api button and it should download the credentials.json file. Save it in your project directory.
* Run `node setup.js` in root of the project to authorize application
* Run `yarn start` to start server


## Send Email

* use `/api/v1/gmailer` endpoint to send message
  ```json
    {
        "name": "your name",
        "email": "your email",
        "message": "your message here"
    }
  ```