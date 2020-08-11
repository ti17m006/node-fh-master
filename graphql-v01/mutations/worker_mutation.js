const { errorMessageToken, verifyWorker } = require('../../miscellaneous/jwtModels');
const { Geolocation } = require('../../database/mogodb_connection')

/**
 * 
 * @param {} 
 */

module.exports.saveLocation = (location, headers) => {
    try {
        if (!headers.authorization && !verifyWorker(headers.authorization)) {
            throw 'Token error'
        } else {
            let _location = {
                workersId: location.workersId,
                location: {
                    longitude: location.longitude,
                    latitude: location.latitude
                }
            }
            const save = Geolocation.create(location);
        }
    } catch (exception) {
        console.error(exception);
        return false;
    }
};
