const async = require("async");
const Gerecht = require("../models/gerecht");
const Categorie = require("../models/categorie");
const WinkelMand = require("../models/winkelmand");




exports.gerecht_detail = (req, res, next) => {
    
  Gerecht.findById(req.params.id)
    .populate("name")
    .exec((err, gerecht) => {
      if (err) {
        return next(err);
      }
      if (gerecht == null) {
        // No results.
        const err = new Error("Gerecht not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("gerecht_detail", {
        title: `${gerecht.name}`,
        gerecht,
      });
    });
};





exports.gerecht_voegToeAanWinkelmand = (req, res, next) => {
    Gerecht.findById(req.params.id)
    .populate("name")
    .exec((err, gerecht) => {
      if (err) {
        return next(err);
      }
      if (gerecht == null) {
        // No results.
        const err = new Error("Gerecht not found");
        err.status = 404;
        return next(err);
      }
      WinkelMand.gerechten.push(gerecht)
      res.render("gerecht_voegToe", {
        gerecht,
      });
    });
       
};
