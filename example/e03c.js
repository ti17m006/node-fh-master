/** DB model */
const UserModel = {
    index: {
        type: Number,
        min: 1,
        required: true
    },
    fullname: {
        type: String,
        minlen: 2,
        maxlen: 255,
        required: true
    },
    email: {
        type: String,
        minlen: 10,
        maxlen: 255,
        required: true
    }
}
module.exports.User = UserModel;