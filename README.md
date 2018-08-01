# Online Course Play
A realtime online course player, built with Socket.IO, HTML5 Canva, Node.js and jQuery.

# Function
This app is used to play course recordings.
![image](/public/player.png)

# Demo
The [Live Demo](https://course-player-socketio.herokuapp.com/) is hosted on Heroku.

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

# Portfolio
Read portfolio [Course Player(Socket.IO)](http://jojozhuang.github.io/portfolio/course-player-socketio/) to learn the main functions of this course player.

# Tutorial
Read tutorial [Building Course Player with Node.js and Socket.IO](http://jojozhuang.github.io/tutorial/react/building-course-player-with-nodejs-and-socketio/) to learn how this course player is built.
