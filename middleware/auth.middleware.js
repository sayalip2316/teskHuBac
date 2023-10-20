function checkUserRoles(requiredRoles) {
    return (req, res, next) => {
      const userRole = req.role; // Assuming you've set this in a previous authentication middleware
  
      // Check if the user's role matches at least one of the required roles
      if (requiredRoles.includes(userRole)) {
        next(); // User has one of the required roles, continue to the next middleware or route
      } else {
        res.status(403).json({ message: 'Access denied' }); // User doesn't have any of the required roles
      }
    };
  }

  module.exports={checkUserRoles}