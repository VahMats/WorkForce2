const Route = require('express');
const { authentication, register, currentUser } = require('../controllers/UserController')

const router = new Route();

router.post('/auth', authentication);

router.post('/reg', register);

router.post('/id', currentUser);

module.exports = router;
