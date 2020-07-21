/**
 * About
 *
 * @module      :: Routes
 * @description :: Maps routes and actions
 * @author      :: Aditya Salman
 */

var About = require('../app/models/about.js');

module.exports = function (app) {

  findAllAbouts = function (req, res) {
    console.log("Method Get About");
    return About.find(function (err, about) {
      if (!err) {
        return res.json(about);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };


  addAbout = function (req, res) {
    console.log('Method Post About');
    var about = new About({
      deskripsi: req.body.deskripsi
    });
    about.save(function (err) {
      if (err) {
        console.log('Error while saving about: ' + err);
        res.send({ error: err });
        return;
      } else {
        console.log("About Berhasil Dibuat");
        return res.redirect('/admin_editabout');
      }
    });
  };

  updateAbout = function (req, res) {
    console.log("Method Put About");
    return About.findById(req.params.id, function (err, about) {
      if (!about) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if (req.body.deskripsi != null) about.deskripsi = req.body.deskripsi;

      return about.save(function (err) {
        if (!err) {
          console.log('Updated');
          return res.send({ status: 'OK', about: about });
        } else {
          if (err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
          } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
          }
          console.log('Internal error(%d): %s', res.statusCode, err.message);
        }
        res.send(about);
      });
    });
  };

  deleteAbout = function (req, res) {

    console.log("Method Delete About");
    return About.findById(req.params.id, function (err, about) {
      if (!about) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      return about.remove(function (err) {
        if (!err) {
          console.log('Hapus About');
          return res.send({ status: 'OK' });
        } else {
          res.statusCode = 500;
          console.log('Internal error(%d): %s', res.statusCode, err.message);
          return res.send({ error: 'Server error' });
        }
      })
    });
  }

  //Link routes and actions
  app.get('/about', findAllAbouts);
  app.post('/about', addAbout);
  app.put('/about/:id', updateAbout);
  app.delete('/about/:id', deleteAbout);

}
