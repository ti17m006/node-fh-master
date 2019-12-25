

/**
 * model - Start
 * 
 */


const UserModelAsync = {

    id: {
        type: Number,
        min: 2,
        required: true
    },

    username: {
        type: String,
        minlen: 3,
        maxlen: 255,
        required: true
        // Async validator - no special characters are allowed (ASCII)
    },

    isActive: {
        type: Boolean,
        default: false,
        required: true
    },

    registration: {
        type: Date,
        default: Date.now()
    },

    personalData: {

        fullname: {
            type: String,
            minlen: 3,
            maxlen: 255,
            required: false
            // Async validator - no numbers or special characters are allowed (UTF-8)
        },
        email: {
            type: String,
            minlen: 10,
            maxlen: 255,
            required: false
            // Async email validator
        }
    }
}

/**
 * https://gist.github.com/aheckmann/5241574
 * 
 * https://docs.mongodb.com/manual/reference/geojson/
 * 
 * https://tools.ietf.org/html/rfc7946#section-3.1.8
 * https://tools.ietf.org/pdf/rfc7946.pdf
 */
GeolocationModelAsync = {
    // TODO - Async validation if necessary
    userId: {
        type: UserModelAsync.id,
        reference: UserModelAsync.username
    },
    location: {
        type: { type: String, default: 'MultiPoint' },
        date: { type: Date, default: Date.now() },
        index: Number,
        coordinates: [[ Number, Number ]]
    }

}

// TODO
MetadataModelAsync = {

}

module.exports.User = UserModelAsync;
module.exports.Geolocation = GeolocationModelAsync;
module.exports.Metadata = MetadataModelAsync;
// Metadata for User and metadata for Geolocation

/**
 * model - End
 */