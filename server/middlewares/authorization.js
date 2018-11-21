const admin = (req, res, next) => {
  if (req.userData.admin === false) {
    return res.status(403).json({
      status: 403,
      error: 'Access denied!',
    });
  }
  next();
};

export default admin;
