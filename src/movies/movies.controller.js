const moviesServices = require("./movies.services");

async function movieExists(req, res, next) {
  const { movieId } = req.params.movieId;
  try {
    const foundMovie = await moviesServices.read(movieId);
    if (foundMovie) {
      res.locals.movieId = movieId;
      return next();
    }
  } catch (err) {
    next({ status: 404, message: "Movie cannot be found." });
  }
}

async function list(req, res, next) {
  const { is_showing } = req.query;
  try {
    if (is_showing) {
      const data = await moviesServices.listIsShowing();
      return res.json({ data });
    }
    const data = await moviesServices.listAll();
    res.json({ data });
  } catch (err) {
    next(err);
  }
}

async function read(req, res, next) {
  try {
    const foundMovie = await moviesServices.read(res.locals.movieId);
    return res.json({ foundMovie });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  list,
  read: [movieExists, read],
  movieExists,
};
