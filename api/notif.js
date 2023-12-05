const URI = "mongodb+srv://newuser:1234%401234@cluster0.t1qjn.mongodb.net/test";
const Mongodb = require("mongodb");
const client = new Mongodb.MongoClient(URI);
// API Imports
var Cibil = require("../modules/cibil.js");
var EMIGen = require("../modules/emi.js");
var nodemailer = require('nodemailer');
const { query } = require("express");

async function SendNotif(req, res){
    try{
        let query = req.body;
        let notification = {
           msg : query.message,
           time: new Date(),
        }
        await client.connect();
        const db = client.db("Flipr");
        var usr = await db.collection("Users").findOne({"_id" : Mongodb.ObjectID(query._id)});
        usr = usr.notifications;
        usr.push(notification);
        await db.collection("Users").updateOne({"_id" : Mongodb.ObjectID(query._id)}, {$set: {"notifications" : usr}});
    }catch(err){
        console.log(`Error: ${err.msg}`);
    }
}

async function SendMail(req, res){
    try{
        await client.connect();
        const db = client.db("Flipr");
        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'fliprhackathonfullstack@gmail.com',
          pass: 'tejaswi@123'
        }
      });
      let som = await db.collection("Users").findOne({"_id" : Mongodb.ObjectID(req.body._id)});
      som = som.email;
      var mailOptions = {
        from: 'fliprhackathonfullstack@gmail.com',
        to: som,
        subject: req.body.subject,
        text: req.body.message,
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent : ' + info.response);
        }
      });
    } catch(err){
        console.log(`Error : ${err.message}`)
    }
}
exports.execute = async (req,res) => {
    await SendNotif(req,res);
    await SendMail(req,res);
    res.status(200).json({
        success: true,
        message: "Email and Notification sent!",
    });
}