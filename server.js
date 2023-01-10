const express = require("express");
const bodyParser = require("body-parser");



var mongoose = require('mongoose');

const blog = require('./User')

const schema = new mongoose.Schema({ mailid: String, pass: String });
const Tank = mongoose.model('Tank', schema);

mongoAtlasUri = 'mongodb+srv://Jagadheesan:jagan2002@cluster0.4l1d3.mongodb.net/test?retryWrites=true&w=majority'
try {
    // Connect to the MongoDB cluster
     mongoose.connect(
      mongoAtlasUri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
          
        console.log(" Mongoose is connected")

        const small = new Tank({ name: 'jagan', size: 'large' });
        
        small.save(function (err) {
          if (err) console.log(err);
        });
        const s =new Tank({name:'joan'});
        s.save();
        const s1 =new Tank({name:'jonm',size:'small'});
        s1.save();
        
        Tank.find({ size: 'large'}, function (err, docs) {
          if (err){
              console.log(err);
          }
          else{
              console.log("First function call : ", docs);
              console.log(docs[1].name);
              
          }
          Tank.deleteOne({ name: 'jonm' }, function (err) {
            if (err) {return handleError(err);
            }
            else{
              console.log("deleted");
            }
            // deleted at most one tank document
          });
      });


    
    }
    );

  } catch (e) {
    console.log("could not connect");
  }


const app = express();
app.use(bodyParser.urlencoded());
app.use(express.static("public"));
 app.get("/",function (req,res){
	res.sendFile(__dirname+"/index.html");

});

app.post("/login",function(req,res){
    var mail=req.body.email;
    var firstpass=req.body.psw;
    var secondpass=req.body.confirmpass;
    if(firstpass!=secondpass){
        res.send("<h1>please repeat the same password</h1>");

    }
    else{
        password=firstpass;
        res.send("<h1>registeration successsfull</h1>")
    }
    const small = new Tank({ mailid: mail, pass: password });
        
        small.save(function (err) {
          if (err) console.log(err);
        });
        

});

app.get("/signin",function(req,res){
  res.sendFile(__dirname+"/public/signin.html");

});
app.post("/login-final",function(req,res){
  var checkmail=req.body.finalmail;
  var checkpsw=req.body.finalpsw;
  Tank.find({ mailid: checkmail} , function (err, docs) {
    if (err){
        console.log(err);
        res.send("<h1>no such mail id exists</h1>");
    }
    else{
        //console.log(docs[0].pass);
        if(docs[0].pass==checkpsw){
          res.send("<h1>you are allowed to login</h1>");
        }
        else{
          res.send("<h1>please type your correct password</h1>")
        }
    }

}
)});




app.listen(3000 || process.env.PORT,function(){
	console.log("server running on port 3000");
});