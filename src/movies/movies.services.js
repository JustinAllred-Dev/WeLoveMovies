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

function read(movieId) {
  return knex("movies").select("*").where({ movieId }).first();
}

module.exports = {
  listAll,
  listIsShowing,
  read,
};
