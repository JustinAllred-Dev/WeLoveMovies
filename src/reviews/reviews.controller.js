const reviewsServices = require("./reviews.services");

async function reviewExists(req, res, next) {
  const reviewId = Number(req.params.reviewId);
  try {
    const foundReview = await reviewExists.reviewExists(reviewId);
    if (foundReview) {
      res.locals.reviewId = reviewId;
      return next();
    }
  } catch (err) {
    next({ status: 404, message: "Review cannot be found." });
  }
}

async function destroy(req, res, next) {
  try {
    const destroyReview = await reviewsServices.destroy(res.locals.reviewId);
    res.json({ status: 204, message: "No Content" });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  const movieId = Number(req.params.movieId);
  try {
    const movieReviews = await reviewsServices.list(movieId);
    res.json({ movieReviews });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  delete: [reviewExists, destroy],
  update: [reviewExists, update],
  list,
};
