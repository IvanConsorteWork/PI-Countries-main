const { Router } = require ('express');
const { getActivity, postActivity } = require ('../controllers/Activity-controller.js');

const router = Router();

router.get('/', getActivity);
router.post('/', postActivity);

module.exports = router