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
  try {
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
    if (countriesName.length) {
      res.status(200).send(countriesName)
    } else {
      throw new Error
    }      
  } 
} catch (e) {
    console.log(e);
    res.status(404).send('No se encuentra el país solicitado');
  };   
});

router.get('/countries/:id', async (req, res) => {
  const { id } =  req.params;
  try {    
    let countryId = await Country.findByPk( id, { include: [{ model: Activity }] });
    if (countryId) {
      res.status(200).send(countryId)      
    } else {
      throw new Error
    }    
  } catch (e) {
    console.log(e);
    res.status(404).send('No se encuentra el país solicitado')
  }  
})

router.post('/activities', async (req, res, next) => {
  const { name, difficulty, duration, season, countriesName } = req.body;
  try {
    if (!name || !difficulty || !duration || !season || !countriesName) {
      return res.status(404).send('No se obtuvieron los datos correspondientes')
    } else {
      const activity = {
        name,
        difficulty,
        season,
        duration,
      }
      let createdActivity = await Activity.create(activity);          
      let relateCountries = await Country.findAll({
        where: {
          name: {
            [Op.in]: countriesName
          }
        }}
      )          
      relateCountries?.map(c => c.addActivity(createdActivity));
      if (createdActivity) {
        res.json({ message:"Actividad creada correctamente", data: createdActivity })
      } else {
        throw new Error
      } 
    }
    } catch (error) {
      next(error)
    }
  })


module.exports = router;