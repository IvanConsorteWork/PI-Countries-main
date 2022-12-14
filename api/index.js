//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Country } = require('./src/db.js');
const axios = require('axios');
const { PORT } = process.env;

async function saveCountriesFromApiInDb () {
  try {
      const verifyDB = await Country.findAll();
      if (!verifyDB.length > 0) {
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
              }
          })      
          await Country.bulkCreate(apiInfo, { validate: true })
      }
  } catch (e) {
      console.log(e)
  }
}

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  await saveCountriesFromApiInDb();
  server.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
  });
});
