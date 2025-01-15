const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.user.isAdmin ? 'Admin' : 'Employee';
    if (userRole === requiredRole) {
      return next();
    }
    return res.status(403).json({ message: "Forbidden: You don't have the required permissions." });
  };
};

module.exports = roleMiddleware;
