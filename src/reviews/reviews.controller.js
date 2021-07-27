const reviewsServices = require("./reviews.services");
const hasProperties = require("../errors/hasProperties");

const hasRequiredProperties = hasProperties("content" || "score");

const validProperties = [
  "review_id",
  "content",
  "score",
  "created_at",
  "updated_at",
  "critic_id",
  "movie_id",
  "critic",
];

function hasValidProperties(req, res, next) {
  const { data = {} } = req.body;
  const invalidFields = Object.keys(data).filter(
    (field) => !validProperties.includes(field)
  );
  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

async function reviewExists(req, res, next) {
  try {
    const { reviewId } = req.params;
    const foundReview = await reviewsServices.read(reviewId);
    if (foundReview) {
      res.locals.review = foundReview;
      return next();
    }
    next({ status: 404, message: "Review cannot be found." });
  } catch (err) {
    next(err);
  }
}

async function destroy(req, res, next) {
  try {
    const destroyReview = await reviewsServices.destroy(
      res.locals.review.review_id
    );
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const updatedReview = {
      ...req.body.data,
      review_id: res.locals.review.review_id,
    };
    reviewsServices.update(updatedReview);
    let data = await reviewsServices.list(res.locals.review.movie_id);
    data = data.find((item) => item.review_id === updatedReview.review_id);
    res.json({ data: data });
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  const { movieId } = req.params;
  try {
    const movieReviews = await reviewsServices.list(movieId);
    res.json({ data: movieReviews });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  delete: [reviewExists, destroy],
  update: [reviewExists, hasValidProperties, hasRequiredProperties, update],
  list,
};
