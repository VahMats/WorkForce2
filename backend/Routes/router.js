const Route = require('express');
const UserRouter = require('./UserRoutes')
const AdminRoutes = require('./AdminRoutes')

const router = new Route();

router.use('/user', UserRouter);

router.use('/admin', AdminRoutes);

module.exports = router;
