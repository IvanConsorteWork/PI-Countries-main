const { Router } = require('express');
const { Activity, Country } = require('../db');
const axios = require ('axios');
const { Op } = require ('sequelize')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries', async (req, res) => {
  const { name } = req.query;  
    let dB = await Country.findAll({
      attributes: ["id", "name", "flag", "continent", "population"],
      include:{
          model: Activity,
          attributes: ["name", "difficulty", "duration", "season"],
          through: {
              attributes: []
          }
      }
  })
  if (!name) {
    return res.status(200).send(dB);
  } else {
    let countriesName = dB.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
    return countriesName.length ?
      res.status(200).send(countriesName) :
      res.status(404).send('No se encuentra el país solicitado');
  };
});

module.exports = router;