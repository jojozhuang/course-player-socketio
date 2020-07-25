# Online Course Player
A realtime online course player, built with Socket.IO, HTML5 Canva, Node.js and jQuery.

# Function
This app is used to play course recordings.
![image](/public/player.png)

# Demo
Two available demos:
* `Live Demo on Heroku:` <a href="https://course-player-socketio.herokuapp.com/" target="\_blank">https://course-player-socketio.herokuapp.com/</a>
* `Live Demo on Azure:` <a href="https://course-player-socketio.azurewebsites.net/" target="\_blank">https://course-player-socketio.azurewebsites.net/</a>

*Note: The demo websites may be slow when you access them for the first time. Be patient!*

# Setup Locally
```bash
git clone https://github.com/jojozhuang/course-player-socketio.git
cd course-player-socketio
npm install
npm start
```
Access http://localhost:12103/ in web browser and click 'Play' button, enjoy!

# Deploy to Heroku
As this is a server application(express), no need to build, just push the entire project folder to Heroku.
```bash
git clone https://github.com/jojozhuang/course-player-socketio.git
cd course-player-socketio
heroku create course-player-socketio
git push heroku master
```
Access https://course-player-socketio.herokuapp.com/ in web browser and click 'Play' button, enjoy!

# Deployment
Follow the tutorial [Deploying Socket.IO App to Heroku](https://jojozhuang.github.io/tutorial/deploying-socketio-app-to-heroku) to deploy this app to Heroku.

Follow the tutorial [Deploying Socket.IO App to Azure](https://jojozhuang.github.io/tutorial/deploying-socketio-app-to-azure) to deploy this app to Azure.

# Portfolio
Read portfolio [Course Player(Socket.IO)](https://jojozhuang.github.io/project/course-player-socketio) to learn the main functions of this course player.

# Tutorial
Read tutorial [Building Course Player with Node.js and Socket.IO](https://jojozhuang.github.io/tutorial/building-course-player-with-nodejs-and-socketio) to learn how this course player is built.
