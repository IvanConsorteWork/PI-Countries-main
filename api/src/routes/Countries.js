const { Router } = require ('express');
const { getCountries, getCountryByActivity, getCountryById }= require ('../controllers/Country-controller.js');

const router = Router();

router.get('/activities/:activity', getCountryByActivity)

router.get('/', getCountries);

router.get('/:id', getCountryById);

module.exports = router