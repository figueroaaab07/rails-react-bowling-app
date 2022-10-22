# Bowling Tournament Application

#### By _**Alejandro Figueroa**_

#### _Bowling Tournament App is designed to keep track of bowling tournaments, assigning teams to each match that is established with the number of people per team and dates_

## Technologies Used

 _Back End (API):_
* _ruby: '2.7.4p191'_
* _rails: '6.1.7'_
* _pg: '1.4.3'_
* _puma: '5.6.5'_
* _bcrypt: '3.1.7'_
* _active_model_serializers: '0.10.13'_
* _phonelib: '0.7.3'_
* _byebug: '11.1.3_
* _listen: '3.7.1'_
* _tzinfo-data: '2.0.5'_

_Front End:_
* _react: '18.2.0'_
* _react-datepicker: '4.8.0'_
* _react-dom: '18.2.0'_
* _react-router-dom: '6.4.1'_
* _react-scripts: '5.0.1'_
* _recoil: '0.7.5'_
* _bowling: '1.4.2' (not install, only code)_

## Entity Relationship Diagram and Associations (Back End)

![](./client/src/images/ERD%20Bowling%20Tournament%20App%20rev%203.png)

## Components (Front End)

![](./client/src/images/Components%20Bowling%20App%20rev%201.png)

## Description

As I indicated at the beginning, this application is aimed at the administration of tournaments, which ranges from the choice of the location and Bowling Center, through the creation of the matches and incorporating the teams that will participate for each date, to the loading of the information of each line played by each bowler.

Below I show the two public screens of the Home and About application.

* Home

![](./client/src/images/Home%20Bowling%20App.png)

* About

![](./client/src/images/About%20Bowling%20App.png)

In order to interact with the App, registration is required, for which the user must provide a valid email address and a password. 

* Sign Up / Login

![](./client/src/images/Sign%20Up%20Bowling%20App.png)

![](./client/src/images/Login%20Bowling%20App.png)

Likewise, the user has to provide his role within the application: either as administrator, team captain or bowler. Depending on the supplied role the user will be allowed access to certain functions.

Italic letters indicate that they do not have access to the function or functions that they delimit.

Administrator: Full Access, the only one who can Manage the Matches

![](./client/src/images/Login%20Administrator%20Bowling%20App.png)

Team Captain: Has Access to the Management of Teams and their Bowlers

![](./client/src/images/Login%20Captain%20Bowling%20App.png)

Bowler: has access to the Games and their Annotations

![](./client/src/images/Login%20Bowler%20Bowling%20App.png)

Let's go into the details of the App. 

* Match Administration - Locations

The administration of the locations and their selection is the first part of the creation, updating or maintenance of the different Matches that the Teams participating in a Tournament can have. As indicated above, it is the responsibility of the Administrator.

As a sample, it has loaded 120 Bowling Centers or Alleys in the State of Washington. However, the number of lines per installation needs to be modified, as they all have 24 lines in this sample, which is obviously far from the truth.

![](./client/src/images/Match%20Administration%20-%20Locations%20Bowling%20App.png)

The format of the page that you observe is preserved in the following pages: on the left side is the form to add or edit the information of the page, in this case the locations. On the right side there is a table that displays all the available information, and incorporates action buttons for the selection, updating and deletion of each record.

* Match Administration - Tournaments

Once the location is selected, the tournament information is displayed, if any. Failing that, you can add, edit and select in the same way.

![](./client/src/images/Match%20Administration%20-%20Tournaments%20Bowling%20App.png)

It is important to highlight that for reasons of guaranteeing the integrity of the information, the action buttons will be enabled if there are no firm dependencies on the associated information.

* Match Administration - Matches

Next we proceed to create the Matches, where the date range in which it will be played, the number of players per team and the number of dates of its duration are indicated.

![](./client/src/images/Match%20Administration%20-%20Matches%20Bowling%20App.png)

* Match Administration - Match Teams

At this point, each Team Captain is expected to have registered their respective team and bowlers. Otherwise, the administrator, if he has received the information from the Captain, will be able to register the teams and members through Teams Administration.

Once the fields (2) and the rival team of each team (Home Team / Guest Team) have been determined, the system is ready to generate the number of games of each Match on each date.

![](./client/src/images/Match%20Administration%20-%20Match%20Teams%20Bowling%20App.png)

* Team Administration - Teams

As indicated in advance, each Team Captain must register his team and bowlers through the two screens indicated below, taking care to have the minimum requested for the games in which he will participate.

![](./client/src/images/Team%20Administration%20-%20Teams%20Bowling%20App.png)

* Team Administration - Bowlers

![](./client/src/images/Team%20Administration%20-%20Bowlers%20Bowling%20App.png)


* Enjoy Games - Games

At this point we are ready to record the results for each participating bowler in each game or see the results obtained on each date played. Previously, when pressing the Enjoy Games Link, we must indicate the team that participates, and all the games made or programmed will be shown.

![](./client/src/images/Enjoy%20Games%20-%20Games%20Bowling%20App.png)

* Enjoy Games - Bowler Games

When selecting the game, it will show the players selected for that game and team.

![](./client/src/images/Enjoy%20Games%20-%20Bowler%20Games%20Bowling%20App.png)

* Enjoy Games - Frames

Once we ratify the Bowlers Selected, we finally enter the presentation of the Scoreboards of each player.

![](./client/src/images/Enjoy%20Games%20-%20Frames-1%20Bowling%20App.png)

![](./client/src/images/Enjoy%20Games%20-%20Frames-2%20Bowling%20App.png)

## Setup/Installation Requirements (with Heroku Deployment)

* Create a Rails app specifying that the database that will be used is Postgres

      rails _6.1.6_ new <app-name> --api --minimal -T --database=postgresql
      rvm use 2.7.4
      cd app-name
      bundle lock --add-platform x86_64-linux --add-platform ruby

* To create a new development database

      rails db:create

* Define a fallback route inside config/routes.rb

      get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

* Create a fallback_controller.rb that inherits from ActionController::Base

      class FallbackController < ActionController::Base
        def index
          render file: 'public/index.html'
        end
      end
* Create a package.json file at the root of the project, within the rails app

      touch package.json
      {
        "name": "heroku-deploy",
        "description": "Build scripts for Heroku",
        "engines": {
          "node": "16.16.0"
        },
        "scripts": {
          "clean": "rm -rf public",
          "build": "npm install --prefix client && npm run build --prefix client",
          "deploy": "cp -a client/build/. public/",
          "heroku-postbuild": "npm run clean && npm run build && npm run deploy"
        }
      }

* Create a React application while inside Rails app

      npx create-react-app client --use-npm

* Inside react app package.json file add proxy and default port

      {
        "name": "client",
        "version": "0.1.0",
        "private": true,
        "proxy": "http://localhost:3000",
        "dependencies": {...},
        "scripts": {
          "start": "PORT=4000 react-scripts start",...}...
      }

* Test Rails + React application to catch any bugs

      npm start --prefix client
* In a separate terminal

      rails s

* Test out configurations by running inside Rails directory

      npm run heroku-postbuild
      rails s

* Create a procfile

      touch Procfile
      web: bundle exec rails s
      release: bin/rake db:migrate

* Login in to Heroku from app

      heroku login
* Initializing a Heroku application

      heroku create
* Tell Heroku to first run a build script for our React app using NodeJS before running the build script for our Rails app

      heroku buildpacks:add heroku/nodejs --index 1
      heroku buildpacks:add heroku/ruby --index 2

* Commit changes to Heroku

      git add .
      git commit -m "Deploying to Heroku"
      heroku stack:set heroku-20
      git push heroku main

* To run in browser
  heroku open https://app-heroku-name.herokuapp.com/

* To run Heroku locally, create a Procfile.dev in the root of your directory

      touch Procfile.dev
      web: PORT=4000 npm start --prefix client
      api: PORT=3000 bundle exec rails s

* Run the command in terminal

      heroku local -f Procfile.dev

## Deployed Project Link

https://shielded-dusk-64889.herokuapp.com/

## License

MIT

Copyright (c) _10/21/2022 Alejandro Figueroa_
