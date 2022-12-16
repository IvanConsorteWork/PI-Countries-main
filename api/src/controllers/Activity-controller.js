const { Country, Activity } = require("../db");
const { Op } = require('sequelize');

const getActivity = async (req, res) => {
    try {
        const activities = await Activity.findAll({include: {
            model: Country,
            attributes: ["id", "name"],
            through: {
                attributes: []
                }
            }, 
            order: [[
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
        return res.status(404).send({msg: 'Required data is missing'})
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
            return res.send({msg: 'Activity created successfully'})
        } else {
            return res.status(404).send({msg: "There is an activity by that name already"});
        }
    } catch (error) {
    console.log(error)
    }
}

const deleteActivity = async (req, res) => {
    const { id } = req.query;
    try {
        const activityToDelete = await Activity.findByPk(id);
        if(!activityToDelete) {
            return res.status(404).send({message: 'Activity not found'}) 
        } else {
            activityToDelete.destroy()
        }
        res.send({message: 'Activity deleted successfully'})
    } catch (e) {
        console.log(e)
    }
}

const putActivity = async (req, res) => {
    const { id } = req.query;
    const { newName, newDifficulty, newDuration, newSeason, newRelatedCountries } = req.body;
    try {        
        const targetActivity = await Activity.findByPk(id);
        if (!targetActivity) {
            res.send("Activity not found");
        } else {            
            const updateActivity = await targetActivity.update({ 
                name: newName, 
                difficulty: newDifficulty, 
                duration: newDuration, 
                season: newSeason
                })
            await updateActivity.save();  
            // RESOLVER COMO ACTUALIZAR LOS PAISES
            res.send("Activity successfully updated");
        }
    } catch (error) {
        res.json( error.message );
    }
}

module.exports = {
    deleteActivity,
    getActivity,
    postActivity,
    putActivity
}