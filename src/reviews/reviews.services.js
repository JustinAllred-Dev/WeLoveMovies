const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}

function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    .then((updatedReviews) => updatedReviews[0]);
}

function list(movieId) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": movieId })
    .then((data) => data.map((i) => addCritic(i)));
}

module.exports = {
  read,
  list,
  destroy,
  update,
};
