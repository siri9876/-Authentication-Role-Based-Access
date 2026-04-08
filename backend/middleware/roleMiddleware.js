// Role hierarchy and permissions
const rolePermissions = {
  'Admin': {
    canAccess: ['Admin', 'Recruiter', 'Delivery Manager', 'Finance/HR Ops'],
    permissions: ['read', 'write', 'delete', 'manage_users'],
  },
  'Recruiter': {
    canAccess: ['Recruiter'],
    permissions: ['read', 'write'],
  },
  'Delivery Manager': {
    canAccess: ['Delivery Manager'],
    permissions: ['read', 'write'],
  },
  'Finance/HR Ops': {
    canAccess: ['Finance/HR Ops'],
    permissions: ['read'],
  },
};

// Middleware to check if user has required role
const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      });
    }

    const userRole = req.user.role;

    // Admin has access to everything
    if (userRole === 'Admin') {
      return next();
    }

    // Check if user's role is in allowed roles
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.',
        requiredRoles: allowedRoles,
        yourRole: userRole,
      });
    }

    next();
  };
};

// Middleware to check specific permission
const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      });
    }

    const userRole = req.user.role;
    const userPermissions = rolePermissions[userRole]?.permissions || [];

    if (!userPermissions.includes(permission)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. '${permission}' permission required.`,
      });
    }

    next();
  };
};

// Check if user can only read (Finance/HR)
const readOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required.',
    });
  }

  const userRole = req.user.role;
  
  if (userRole === 'Finance/HR Ops' && req.method !== 'GET') {
    return res.status(403).json({
      success: false,
      message: 'Read-only access. Cannot perform this action.',
    });
  }

  next();
};

module.exports = {
  requireRole,
  requirePermission,
  readOnly,
  rolePermissions,
};
