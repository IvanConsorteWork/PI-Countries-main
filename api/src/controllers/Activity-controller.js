const { Country, Activity } = require("../db");
const { Op } = require('sequelize');

const getActivity = async (req, res) => {
    try {
        const activities = await Activity.findAll({order: [[
            'name', 'ASC'
          ]]})
        res.status(200).send(activities)    
    } catch (e) {
        console.log(e)
    }
}

const postActivity = async (req, res) => {
  const { name, difficulty, duration, season, relatedCountries } = req.body;
  if (!name || !difficulty || !duration || !season || !relatedCountries) 
      return res.status(404).send({msg: 'No se obtuvieron los datos correspondientes'})
  try {
  const [instance, created] = await Activity.findOrCreate({
      where: {
          name: name,
      },
      defaults: {
          name: name,
          difficulty: difficulty,
          duration: duration,
          season: season,
      }
  });
  if(created) {
    let relateCountries = await Country.findAll({
        where: {
          name: {
            [Op.in]: relatedCountries
          }
        }}
    )          
    relateCountries?.forEach(c => c.addActivity(instance));
    return res.send({msg: 'Actividad creada con éxito'})
  } else {
      return res.send({msg: "Ya existe una actividad con el mismo nombre"});
  }
  } catch (error) {
  console.log(error)
  }
}

  module.exports = {
      getActivity,
      postActivity
  }