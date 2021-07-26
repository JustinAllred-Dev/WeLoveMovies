const moviesServices = require("./movies.services");

async function list(req, res, next) {
  const { is_showing } = req.query;
  try {
    if (is_showing) {
      const data = await moviesServices.listIsShowing();
      return res.json({ data });
    } else {
      const data = await moviesServices.listAll();
      res.json({ data });
    }
  } catch (err) {
    next(err);
  }
}

async function read(req, res, next) {
  const movieId = Number(req.params.movieId);
  try {
    const foundMovie = await moviesServices.read(movieId);
    return res.json({ foundMovie });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  list,
  read,
};
