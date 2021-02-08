var express = require('express');
var app=express();
var bodyParser=require('body-parser');
var cors=require('cors');
app.use(cors());
app.use(bodyParser.json());
var mongo=require('mongodb').MongoClient;
var url = 'mongodb://nadisha:123@localhost:27017/singers';

mongo.connect(url, (err)=>{
    console.log('connected to database!')
})

app.get('/data', (req, res)=>{
    mongo.connect(url, (err, db)=>{
        var collection =db.collection('details');
        collection.find({}).toArray((x, data)=>{
            res.send(data);
        })
    })
})


app.post('/data', (req, res)=>{
    mongo.connect(url, (err, db)=>{
        var collection = db.collection('details');
        var mydetails = {
            ArtistName: req.body.ArtistName,
            CollectionName: req.body.CollectionName,
            TrackName:req.body.TrackName,
            ArtWorkUrl:req.body.ArtWorkUrl,
            TrackPrice:req.body.TrackPrice,
            ReleaseDate:req.body.ReleaseDate,
        }
        collection.insert(mydetails, (x, data)=>{
            res.send(data);
        })
    })
})

/*
app.delete('/data',(req,res)=>{
    mongo.connect(url,(err,db)=>{
        var collection = db.collection('details'); 
    })
})*/

app.listen(3000, ()=>{
    console.log('Server listen 3000!');
})

