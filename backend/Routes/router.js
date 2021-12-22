const Route = require('express');
const UserRouter = require('./UserRoutes')
const AdminRoutes = require('./AdminRoutes')
const AdminCheck = require('../middleware/AdminCheck')

const router = new Route();

router.use('/user', UserRouter);

router.use('/admin', AdminCheck, AdminRoutes);

module.exports = router;
