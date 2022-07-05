const express = require("express");
const routerKue = express.Router();
const controllerKue = require("../controllers/kue");

// squential search

routerKue
  .route("/kue")
  .get(controllerKue.getKue)

  .post(controllerKue.insert);

routerKue
  .route("/kue")
  .get((req, res) => {
    res.send(kue);
  })

  .post((req, res) => {
    res.send("Data Kue Sukses Tersimpan");
  });

routerKue
  .route("/kue/:kode")
  .put(controllerKue.update)

  // session delete
  .delete(controllerKue.delete)
  .get(controllerKue.getKueByKode);

routerKue.get("/kue/:nama/:alamat", (req, res) => {
  const nama = req.params.nama;
  const alamat = req.params.alamat;
  res.send("kue nama : " + nama + "alamat :" + alamat);
});

routerKue.route("/kue/nama/kode").get(controllerKue.getNamaByKode);

module.exports = routerKue;
