const mongoose = require('mongoose');
const { Schema } = mongoose;

const AccessSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },

}, { timestamps: true });

const Access = mongoose.model('access', AccessSchema);

module.exports = Access;