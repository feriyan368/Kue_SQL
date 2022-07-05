const kue = require("../models/kue");
const modelKue = require("../models/kue");

module.exports = {
  getKue: (req, res) => {
    kue.getKue((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || " onok error",
        });
      } else res.send(data);
    });
  },
  insert: (req, res) => {
    // ambildata request dari frontend
    if (!req.body) {
      res.status(400).send({
        message: "data tidak boleh ksong",
      });
    }
    modelKue.insert(req.body, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "terjadi error",
        });
      } else {
        res.send(data);
      }
    });
  },
  getKueByKode: (req, res) => {
    // MENAMPILKAN DATA
    kue.getKueByKode(req.params.kode, (err, data) => {
      if (err) {
        if (err.kind === "tidak ditemukan") {
          res.status(404).send({
            message: `kue  dengan kode: ${req.params.kode}tidak ditemukan`,
          });
        } else {
          res.status(500).send({
            message: "error" + req.params.kode,
          });
        }
      } else res.send(data);
    });
  },

  update: (req, res) => {
    // UPDATE
    if (!req.body) {
      res.status(400).send({
        message: "data tidak boleh kosng",
      });
    }
    kue.update(req.params.kode, req.body, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `not found kue with kode ${req.params.kode}`,
          });
        } else {
          res.status(500).send({
            message: "error updating tutorial with nim " + req.params.kode,
          });
        }
      } else res.send(data);
    });
  },

  delete: (req, res) => {
    kue.delete(req.params.kode, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `not found kue with kode ${req.params.kode}`,
          });
        } else {
          res.status(500).send({
            message: "could not delete mahasiswa with kode " + req.params.kode,
          });
        }
      } else res.send({ message: `berhasil dihapus` });
    });
  },
};
