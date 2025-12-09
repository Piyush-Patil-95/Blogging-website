// middleware/auth.js
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // user is logged in, allow access
  }
  res.status(401).json({ msg: "Please log in to access this route" }); // not logged in
}

export default ensureAuthenticated;
