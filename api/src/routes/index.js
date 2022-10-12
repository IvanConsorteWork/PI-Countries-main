const { Router } = require('express');
const { Activity, Country } = require('../db');
const axios = require ('axios');
const { Op } = require ('sequelize');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const apiURL = await axios.get('https://restcountries.com/v3/all');
    const apiInfo = await apiURL.data.map(c => {
        return {
        id: c.cca3,
        name: c.name.common,
        flag: c.flags[0],
        continent: c.continents[0],
        capital: c.capital != null ? c.capital[0] : "No data",
        subregion: c.subregion,
        area: c.area,
        population: c.population,
        };
    });
    return apiInfo
}

const getDbInfo = async () => {
    return await Country.findAll({
        include: {
            model: Activity,
            attributes: ["name", "difficulty", "duration", "season"],
            through: {
                attributes: [],
            },
          },
    })
}

const getAllCountries = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const totalInfo = apiInfo.concat(dbInfo);
    return totalInfo
}

// -----------------------------------------------------------------------------------------

router.get('/countries', async (req, res) => {
    const { name } = req.query;
    let allCountries = await getAllCountries();
    if (name) {
        let countryName = await allCountries.filter(c => c.name.toLowerCase().includes(name.toLowerCase()))
        countryName.length ?
        res.status(200).send(countryName) :
        res.status(404).send('No se encuentra el país solicitado')
    } else {
        res.status(200).send(allCountries)
    }
})

router.get('/countries/:id', async (req, res) => {
    const { id } = req.params;
    let allCountries = await getAllCountries();
    let countryId = allCountries.filter((c) =>
      c.id.toLowerCase().includes(id.toLowerCase())
    );  
    return countryId.length
      ? res.status(200).send(countryId)
      : res.status(404).send("El ID ingresado no existe");
})

router.post('/activities', async (req, res, next) => {
  const { name,difficulty,duration,season,countriesName }= req.body
  try {
  if(name&&difficulty&&duration&&season&&countriesName){
    const activity={
      name,
      difficulty,
      season,
      duration,
    }
    let createdActivity = await Activity.create(activity)
    let infoCountriesName= await Country.findAll({
      where:{
        name:{
          [Op.in]:countriesName
        }
      }}
    )
    infoCountriesName?.map(m=>m.addActivity(createdActivity))

    if(createdActivity)res.json({message:"Actividad creada correctamente",data:createdActivity})
    else res.json({message:"Error no se obtuvieron todos los datos correspondientes"})
  }
    } catch (error) {
        next(error)
    }
})


module.exports = router;
