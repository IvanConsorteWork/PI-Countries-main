const { Country, Activity } = require("../db");
const { Op } = require('sequelize');

const postActivity = async (req, res, next) => {
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
    }

    module.exports = {
        postActivity
    }