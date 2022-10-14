const { Country, Activity } = require("../db");

const getCountries = async (req, res) => {
    const { name } = req.query;  
    try {
      let allCountries = await Country.findAll({
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
      return res.status(200).send(allCountries);
    } else {
      let countriesName = allCountries.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
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
  };
  
  const getCountryById = async (req, res) => {
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
  }

  module.exports = {
    getCountries, 
    getCountryById
  }


