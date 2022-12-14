const { Country, Activity } = require("../db");

const getCountries = async (req, res) => {
  const { name } = req.query; 
  const condition = { include: {
    model: Activity,
    attributes: ["name", "difficulty", "duration", "season"],
    through: {
        attributes: []
    }
  }, order: [[
    'name', 'ASC'
  ]]};
  const where = {};
  if(name) where.name = name;
  condition.where = where;  
  try {
    const countries = await Country.findAll(condition);
    if (!countries.length > 0) {
      throw new Error
    } else {
      res.json(countries)
    }      
  } catch (e) {
    console.log(e)
    res.status(404).send({msg: 'Cannot find requested country'})
  }
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
    res.status(404).json({msg: 'Cannot find requested country'})
  }  
}

module.exports = {
  getCountries, 
  getCountryById
}


