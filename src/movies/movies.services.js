const knex = require("../db/connection");

function listAll() {
  return knex("movies").select("*");
}

function listIsShowing() {
  return knex("movies_theaters as mt")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({ is_showing: true })
    .groupBy("m.title", "m.movie_id");
}

function read(movie_id) {
  return knex("movies").select("*").where({ movie_id }).first();
}

module.exports = {
  listAll,
  listIsShowing,
  read,
};
