const { Router } = require ('express');
const { getActivity, postActivity, deleteActivity, putActivity } = require ('../controllers/Activity-controller.js');

const router = Router();

router.delete('/', deleteActivity);
router.get('/', getActivity);
router.post('/', postActivity);
router.put('/', putActivity);

module.exports = router