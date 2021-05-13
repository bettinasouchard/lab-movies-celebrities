const express = require("express");
const router = new express.Router();
const celebrityModel = require("./../models/celebrity");


// aller sur la page "new-celebrity" et en créer une nouvelle
router.get("/new", (req, res) => {
    res.render("celebrities/new-celebrity.hbs");
  });

router.post("/create", (req, res, next) => {
    celebrityModel.create(req.body)
    .then (() => {
        res.redirect("/celebrities")
    })
    .catch(next)
});


//aller sur la page avec toutes les celebrities
 router.get("/", (req, res, next) => {
     celebrityModel.find()
     .then ((dbResult) => { 
     res.render("celebrities/celebrities.hbs", { celebrities : dbResult })
 })
     .catch(next)
   });


// aller sur la page détaillée de la celebrity
router.get("/celebrity-details/:id", (req, res, next) => {
    celebrityModel.findById(req.params.id)
    .then ((dbResult) => { 
    res.render("celebrities/celebrity-details.hbs", { celebrity : dbResult });
})
    .catch(next)
  });


// supp la celebrity
  router.get("/delete/:id", (req, res, next) => {
    celebrityModel.findByIdAndRemove(req.params.id)
    .then (() => {
        res.redirect("/celebrities")
    })
    .catch(next)
});


// modifier la celebrity
router.get("/edit/:id", (req, res, next) => {
    celebrityModel.findById(req.params.id)
    .then ((dbResult) => { 
    res.render("celebrities/edit-celebrity.hbs", { celebupdate : dbResult })
})
    .catch(next)
  });

router.post("/:id", (req, res, next) => {
    celebrityModel.findByIdAndUpdate(req.params.id, req.body)
      .then(() => {
        res.redirect("/celebrities/celebrity-details/" + req.params.id) 
      })
      .catch(next);
  });
  
module.exports=router

