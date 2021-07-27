const moviesServices = require("./movies.services");

async function movieExists(req, res, next) {
  try {
    const { movieId } = req.params;
    const foundMovie = await moviesServices.read(movieId);
    if (foundMovie) {
      res.locals.movie = foundMovie;
      return next();
    }
    next({ status: 404, message: "Movie cannot be found." });
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  const { is_showing } = req.query;
  try {
    if (is_showing) {
      const showingMovies = await moviesServices.listIsShowing();
      return res.json({ data: showingMovies });
    }
    const allMovies = await moviesServices.listAll();
    res.json({ data: allMovies });
  } catch (err) {
    next(err);
  }
}

async function read(req, res, next) {
  try {
    return res.json({ data: res.locals.movie });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  list,
  read: [movieExists, read],
  movieExists,
};
