const { Router } = require('express');
const { Activity, Country } = require('../db');
const axios = require ('axios');
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

module.exports = router;
