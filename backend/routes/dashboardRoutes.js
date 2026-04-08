const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { requireRole, readOnly } = require('../middleware/roleMiddleware');

// @desc    Admin Dashboard Data
// @route   GET /api/dashboard/admin
// @access  Private/Admin
router.get('/admin', authMiddleware, requireRole('Admin'), async (req, res) => {
  try {
    const User = require('../models/User');
    
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalUsers,
          activeUsers,
          inactiveUsers: totalUsers - activeUsers,
          usersByRole,
        },
        message: 'Admin dashboard data retrieved successfully',
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching admin dashboard data',
    });
  }
});

// @desc    Recruiter Dashboard Data
// @route   GET /api/dashboard/recruiter
// @access  Private/Recruiter
router.get('/recruiter', authMiddleware, requireRole('Admin', 'Recruiter'), async (req, res) => {
  try {
    // Mock data for requirements
    const requirements = [
      {
        id: 1,
        title: 'Senior React Developer',
        client: 'Tech Corp',
        positions: 3,
        status: 'Open',
        priority: 'High',
        createdAt: new Date(),
      },
      {
        id: 2,
        title: 'Node.js Backend Engineer',
        client: 'StartUp Inc',
        positions: 2,
        status: 'In Progress',
        priority: 'Medium',
        createdAt: new Date(),
      },
      {
        id: 3,
        title: 'Full Stack Developer',
        client: 'Enterprise Solutions',
        positions: 5,
        status: 'Open',
        priority: 'High',
        createdAt: new Date(),
      },
      {
        id: 4,
        title: 'DevOps Engineer',
        client: 'Cloud Systems',
        positions: 1,
        status: 'Closed',
        priority: 'Low',
        createdAt: new Date(),
      },
    ];

    res.status(200).json({
      success: true,
      data: {
        requirements,
        stats: {
          totalRequirements: requirements.length,
          openPositions: requirements.filter(r => r.status === 'Open').length,
          inProgress: requirements.filter(r => r.status === 'In Progress').length,
          closed: requirements.filter(r => r.status === 'Closed').length,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching recruiter dashboard data',
    });
  }
});

// @desc    Delivery Manager Dashboard Data
// @route   GET /api/dashboard/delivery
// @access  Private/Delivery Manager
router.get('/delivery', authMiddleware, requireRole('Admin', 'Delivery Manager'), async (req, res) => {
  try {
    // Mock data for team overview
    const teamMembers = [
      {
        id: 1,
        name: 'John Smith',
        role: 'Senior Developer',
        project: 'Project Alpha',
        status: 'Active',
        utilization: 95,
      },
      {
        id: 2,
        name: 'Jane Doe',
        role: 'Full Stack Developer',
        project: 'Project Beta',
        status: 'Active',
        utilization: 80,
      },
      {
        id: 3,
        name: 'Mike Johnson',
        role: 'Junior Developer',
        project: 'Project Alpha',
        status: 'Active',
        utilization: 100,
      },
      {
        id: 4,
        name: 'Sarah Williams',
        role: 'QA Engineer',
        project: 'Project Gamma',
        status: 'On Leave',
        utilization: 0,
      },
      {
        id: 5,
        name: 'Tom Brown',
        role: 'DevOps Engineer',
        project: 'Multiple',
        status: 'Active',
        utilization: 75,
      },
    ];

    const projects = [
      { name: 'Project Alpha', teamSize: 5, status: 'On Track', deadline: '2024-03-15' },
      { name: 'Project Beta', teamSize: 3, status: 'At Risk', deadline: '2024-02-28' },
      { name: 'Project Gamma', teamSize: 4, status: 'On Track', deadline: '2024-04-01' },
    ];

    res.status(200).json({
      success: true,
      data: {
        teamMembers,
        projects,
        stats: {
          totalTeamMembers: teamMembers.length,
          activeMembers: teamMembers.filter(m => m.status === 'Active').length,
          avgUtilization: Math.round(
            teamMembers.reduce((acc, m) => acc + m.utilization, 0) / teamMembers.length
          ),
          totalProjects: projects.length,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching delivery dashboard data',
    });
  }
});

// @desc    Finance/HR Dashboard Data (Read Only)
// @route   GET /api/dashboard/finance
// @access  Private/Finance-HR
router.get('/finance', authMiddleware, requireRole('Admin', 'Finance/HR Ops'), readOnly, async (req, res) => {
  try {
    // Mock data for finance/HR overview
    const employeeData = [
      {
        id: 1,
        name: 'John Smith',
        department: 'Engineering',
        salary: '$85,000',
        joinDate: '2022-01-15',
        status: 'Active',
      },
      {
        id: 2,
        name: 'Jane Doe',
        department: 'Engineering',
        salary: '$90,000',
        joinDate: '2021-06-20',
        status: 'Active',
      },
      {
        id: 3,
        name: 'Mike Johnson',
        department: 'Engineering',
        salary: '$65,000',
        joinDate: '2023-03-10',
        status: 'Active',
      },
      {
        id: 4,
        name: 'Sarah Williams',
        department: 'QA',
        salary: '$70,000',
        joinDate: '2022-08-05',
        status: 'Active',
      },
      {
        id: 5,
        name: 'Tom Brown',
        department: 'DevOps',
        salary: '$95,000',
        joinDate: '2021-11-01',
        status: 'Active',
      },
    ];

    const payrollSummary = {
      totalEmployees: 45,
      totalPayroll: '$425,000',
      avgSalary: '$78,500',
      departments: [
        { name: 'Engineering', count: 25, budget: '$250,000' },
        { name: 'QA', count: 10, budget: '$85,000' },
        { name: 'DevOps', count: 5, budget: '$55,000' },
        { name: 'HR', count: 5, budget: '$35,000' },
      ],
    };

    res.status(200).json({
      success: true,
      data: {
        employeeData,
        payrollSummary,
        readOnly: true, // Indicate this is read-only data
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching finance dashboard data',
    });
  }
});

module.exports = router;
