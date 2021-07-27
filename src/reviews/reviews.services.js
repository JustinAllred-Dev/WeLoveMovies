const knex = require("../db/connection");

function addCritic() {}

function reviewExists(reviewId) {
  return knex("reviews").select("*").where({ reviewId }).first();
}

function destroy(reviewId) {
  return knex("reviews").select("*").where({ reviewId }).del();
}

function update(reviewId) {}

function list(movieId) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": movieId })
    .then((data) => data.map((i) => addCritic(i)));
}

module.exports = {
  destroy,
  update,
};
