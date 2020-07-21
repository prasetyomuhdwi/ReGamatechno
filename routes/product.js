/**
 * Product
 *
 * @module      :: Routes
 * @description :: Maps routes and actions
 * @author      :: Aditya Salman
 */

var Product = require('../app/models/product.js');

module.exports = function (app) {
  findAllProduct = function (req, res) {
    console.log("Method Get Product");
    return Product.find(function (err, product) {
      if (!err) {
        return res.json(product);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };

  findById = function (req, res) {
    console.log("Method Get Id Product");
    return Product.findById(req.params.id, function (err, product) {
      if (!product) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      if (!err) {
        return res.send({ status: 'OK', product: product });
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };

  addProduct = function (req, res) {
    console.log('Method Post Product');

    let file = req.files.lokasi
    let arrF = file.name.split(".")
    let format = arrF[arrF.length - 1]

    if (req.body.nama != null) {
      filename = req.body.nama + "." + format;
    }

    var product = new Product({
      nama: req.body.nama,
      deskripsi: req.body.deskripsi,
      tag: req.body.tag,
      lokasi: filename
    });

    product.save(function (err) {
      if (err) {
        if (err.code == 11000) {
          res.redirect('/admin_inputproducts?error=11000&nama=' + req.body.nama + '&tag=' + req.body.tag + '&deskripsi=' + req.body.deskripsi);
        } else {
          console.log('Error while saving product: ' + err);
          res.send({ error: err });
        }
        return;
      } else {
        file.mv("./public/img/Product/" + filename, function (err) {
          if (err) {
            console.log(err)
            res.send("ERROR ACCURED")
          }
          else {
            console.log("Product Berhasil Dibuat");
            return res.redirect('/products');
          }
        })

      }
    });

  };

  updateProduct = function (req, res) {
    console.log("Method Put Product");
    return Product.findById(req.params.id, function (err, product) {
      if (!product) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      let file = req.files.lokasi
      let arrF = file.name.split(".")
      let format = arrF[arrF.length - 1]

      if (req.body.nama != null) {
        product.nama = req.body.nama
        filename = req.body.nama + "." + format;
      };

      if (req.body.deskripsi != null) product.deskripsi = req.body.deskripsi;
      if (req.body.tag != null) product.tag = req.body.tag;
      if (filename != null) product.lokasi = filename;

      return product.save(function (err) {
        if (!err) {
          file.mv("./public/img/Product/" + filename, function (err) {
            if (err) {
              console.log(err)
              res.send("ERROR ACCURED")
            }
            else {
              console.log("Data Berhasil Diedit");
            }
          });
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
        return res.redirect('/products');
      });
    });
  };

  deleteProduct = function (req, res) {
    console.log("Method Delete Product");
    return Product.findById(req.params.id, function (err, product) {
      if (!product) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      return product.remove(function (err) {
        if (!err) {
          console.log('Hapus product');
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
  app.get('/product', findAllProduct);
  app.get('/product/:id', findById);
  app.post('/product', addProduct);
  app.post('/product/:id', updateProduct);
  app.delete('/product/:id', deleteProduct);

}
