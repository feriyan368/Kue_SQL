const SqlString = require("mysql/lib/protocol/SqlString");
const db = require("./db");

let kue = [
  { kode: "101", nama: "Kue Tart", harga: "Rp80.000", expired: "7 Hari", create: new Date() },
  { kode: "102", nama: "Kue Brownis", harga: "Rp70.000", expired: "7 Hari", create: new Date() },
  { kode: "103", nama: "Kue Pasar", harga: "Rp10.000", expired: "7 Hari", create: new Date() },
];
const cari = (arrData, kode) => {
  ketemu = -1;
  indeks = 0;
  while (ketemu == -1 && indeks < arrData.length) {
    if (arrData[indeks].kode == kode) {
      ketemu = indeks;
      return indeks;
    }
    indeks++;
  }
  return -1;
};

module.exports = {
  insert: (kueBaru, result) => {
    db.query("INSERT INTO kue SET ?", kueBaru, (err, res) => {
      if (err) {
        console.log("error:", err);
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...kueBaru });
    });
  },
  getKue(result) {
    let query = "SELECT * FROM kue";
    db.query(query, (err, res) => {
      if (err) {
        console.log("error:", err);
        return;
      }
      result(null, res);
    });
  },
  getKueByKode: (nim, result) => {
    db.query(`SELECT * FROM kue WHERE kode = ${kode}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("kue ditemukan:", res[0]); //opsi
        result(null, res[0]);
        return;
      }
      result({ kind: "tidak ditemukan" }, null);
    });
  },

  update: (kode, kue, result) => {
    db.query("UPDATE kue SET nama= ?, harga=?, prodi=? WHERE kode=?", [kue.nama, kue.harga, kue.expired, kode], (err, res) => {
      if (err) {
        console.log("error:", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("update kue: ", { kode: kode, ...kue });
      result(null, { kode: kode, ...kue });
    });
  },

  delete: (kode, result) => {
    db.query("DELETE FROM kue WHERE kode = ?", kode, (err, res) => {
      if (err) {
        console.log("error:", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted kue with nim : ", kode);
      result(null, res);
    });
  },
};
