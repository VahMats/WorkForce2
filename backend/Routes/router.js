const Route = require('express');
const UserRouter = require('./UserRoutes')

const router = new Route();

router.use('/user', UserRouter);

module.exports = router;
