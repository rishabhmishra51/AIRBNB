const express = require("express")
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override")

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
main().then(()=>{
     console.log("connceted to db");    
})
.catch(err =>{
     console.log(err);
     
});
async function main(){
     await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
app.get("/",(req,res)=>{
     res.send("Hi,I a root");
     
})
//index route
app.get("/listings",async (req,res)=>{
     const allListings = await Listing.find({});
     res.render("./listings/index.ejs",{allListings});
});

// NEW Route create and Show route
app.get("/listings/new",(req,res)=>{
     res.render("listings/new.ejs");
})

//show route
app.get("/listings/:id",async(req,res)=>{
     let{id} = req.params;
     const listing = await Listing.findById(id);
     res.render("listings/show.ejs",{listing});
})

//new route
app.post("/listings",async(req,res)=>{
     const newListing = new Listing(req.body.listing);
     await newListing.save();
     res.redirect("/listings");
})

//edit 
app.get("/listings/:id/edit", async (req,res)=>{
       let {id} = req.params;
       const listing = await Listing.findById(id);
       res.render("./listings/edit.ejs",{listing});
       
})
//update
app.put("/listings/:id",async (req,res)=>{
     let {id} = req.params;
   await Listing.findByIdAndUpdate(id,{...req.body.listing});
   res.redirect("/listings");
});
// app.get("/testlisting",async(req,res)=>{
//    let sampleListing = new Listing({
//      title :"My New Villa",
//      description:"By the beach", 
//      price:1000,
//      location:"kushinagar",
//      country:"India",
//    });
//    await sampleListing.save();
//    console.log("sample was saved");
//    res.send("successful testing");
   
// })
app.listen(8080,()=>{
     console.log("Server is listing");
     
});