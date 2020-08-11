const { errorMessageToken, verifyWorker } = require('../../miscellaneous/jwtModels');
const { GeolocationNumber } = require('../../database/mogodb_connection')

/**
 * 
 * @param {} 
 */

module.exports.saveLocation = async (data, headers) => {
    try {
        if (!headers.authorization && !verifyWorker(headers.authorization)) {
            throw 'Token error'
        } else {
            let _workerId = data.workerId;
            let _location = {
                longitude: data.longitude,
                latitude: data.latitude
            };
            const update = await GeolocationNumber.updateOne(
                { workerId: _workerId },
                {
                    $inc: { locationLength: 1 },
                    $push: { locations: _location }
                },
                {
                    new: true
                });
            return true;
        }
    } catch (exception) {
        console.error(exception);
        return false;
    }
};

// newLocation - new session - new shift
