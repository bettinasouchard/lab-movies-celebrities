const express = require("express");
const router = new express.Router();
const movieModel = require("./../models/movie");
const celebrityModel = require("./../models/celebrity");



// aller sur la page "new-movie" et en créer un nouveau
router.get("/new", (req, res, next) => {
  celebrityModel.find()
.then(result=> res.render("movies/new-movie", {celebs : result}))
.catch(next)
});

router.post("/create", (req, res, next) => {
    movieModel.create(req.body)
    .then (() => {
        res.redirect("/movies")
    })
    .catch(next)
});



//aller sur la page avec touts les movies
 router.get("/", (req, res, next) => {
     movieModel.find()
     .then ((dbResult) => { 
     res.render("movies/movies.hbs", { movies : dbResult })
 })
     .catch(next)
   });


// aller sur la page détaillée du movie
router.get("/movie-details/:id", (req, res, next) => {
    movieModel.findById(req.params.id)
    .then ((dbResult) => { 
    res.render("movies/movie-details.hbs", { movie : dbResult });
})
    .catch(next)
  });


// supp le movie
  router.get("/delete/:id", (req, res, next) => {
    movieModel.findByIdAndRemove(req.params.id)
    .then (() => {
        res.redirect("/movies")
    })
    .catch(next)
});


// modifier le movie
router.get("/edit/:id", (req, res, next) => {
    movieModel.findById(req.params.id)
    .then ((dbResult) => { 
    res.render("movies/edit-movie.hbs", { movieupdate : dbResult })
})
    .catch(next)
  });

router.post("/:id", (req, res, next) => {
    movieModel.findByIdAndUpdate(req.params.id, req.body)
      .then(() => {
        res.redirect("/movies/movie-details/" + req.params.id)
      })
      .catch(next);
  });


module.exports=router

//-------------------------------------------------------//
// ERROR => Router.use() requires a middleware function but got a Object 
// = CHECK *** const express **** + *** const router *** + *** const celebrityModel ***
// = CHECK *** app.use => app.use("/movies", require("./routes/movies.routes"));
//-------------------------------------------------------//