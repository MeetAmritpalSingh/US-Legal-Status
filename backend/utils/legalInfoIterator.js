const getLegalInfo = require('./legalInfo.js')



const getLegalInfoPromise = (number, numberType) => {
    return new Promise((resolve, reject) => {
      getLegalInfo(number, numberType, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  };
  
async function executeGetLegalInfo(number, callback) {
const promises = [];
for (let i = 0; i < number.length; i++) {

      promises.push(getLegalInfoPromise(number[i][0], number[i][1]).catch(error => console.error(error)));
    

}
const results = await Promise.all(promises);
callback(results);
}

module.exports = executeGetLegalInfo