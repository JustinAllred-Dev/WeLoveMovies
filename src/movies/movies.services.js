const knex = require("../db/connection");

function listAll() {
  return knex("movies").select("*");
}

function listIsShowing() {
  return knex("movies_theaters").select("*").where({ is_showing: true });
}

function read(movieId) {
  return knex("movies").select("*").where({ movieId }).first();
}

module.exports = {
  listAll,
  listIsShowing,
  read,
};
