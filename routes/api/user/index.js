const router = require('express').Router();
const hash_controller = require('./hash_controller');



router.post('/hashAdd', hash_controller.hashAdd)

module.exports = router;