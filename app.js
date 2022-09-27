//importerer express
const { response } = require("express");

//instansierer the library express
const express = require("express")

const app = express()

app.get("", (req,res)=>{
    //req.params er et json-objekt, hvilket gør at man kan itlgå properties
    console.log(req.params);

    if(Number(req.params.id) === "1"){
        res.send({name: "John", theBestAndOGDeer:True})

    }
    else{

    }
    res.send({errorMessage:"I don't know that deer"});
})