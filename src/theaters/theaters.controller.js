const theatersServices = require("./theaters.services");

async function list(req, res, next) {
  try {
    const theaters = await theatersServices.list();
    res.json({ data: theaters });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  list,
};
