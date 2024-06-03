const mongoose = require('mongoose');
const { Schema } = mongoose;

const SheetSchema = new Schema({
    sheetId: {
        type: String,
        required: true
    },
    sheetName: {
        type: String,
        required: true
    },
    accessId: {
        type: Schema.Types.ObjectId,
        ref: 'Access',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },


}, { timestamps: true });

const Sheet = mongoose.model('sheet', SheetSchema);

module.exports = Sheet;