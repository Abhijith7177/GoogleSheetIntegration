const User = require('../Models/userSchema');
const Access = require('../Models/accessSchema');
const Sheet = require('../Models/sheetSchema');

exports.createSheet = async (req, res) => {
    try {
        const existingSheet = await Sheet.findOne({ sheetName: req.body.sheetName, accessId: req.body.accessId });

        if (existingSheet) {
            return res.json({ success: true, message: 'Sheet already exists.' });
        }

        const newSheet = new Sheet({
            user: req.user._id,
            sheetId: req.body.sheetId,
            sheetName: req.body.sheetName,
            accessId: req.body.accessId,
        });

        await newSheet.save();

        return res.json({ success: true, message: 'Sheet created successfully.' });
    } catch (error) {

        console.error('Error creating sheet :', error);
        return res.status(500).json({ success: false, error: 'Failed to create sheet.' });
    }
};


exports.getSheet = async (req, res) => {
    try {
        const accessId = req.query.accessId;

        const sheet = await Sheet.find({ accessId: accessId });

        if (sheet) {
            return res.json({ success: true, sheet: sheet });
        } else {
            return res.json({ success: false, message: 'Sheet not found.' });
        }
    } catch (error) {
        console.error('Error getting sheet:', error);
        return res.status(500).json({ success: false, error: 'Failed to get sheet.' });
    }
};



exports.deleteSheet = async (req, res) => {
    try {
        const id = req.query.id;
        const sheet = await Sheet.findOneAndDelete({ _id: id });

        if (!sheet) {
            return res.status(404).json({ success: false, error: 'Sheet not found.' });
        }

        return res.json({ success: true, message: 'Sheet deleted successfully.' });
    } catch (error) {
        console.error('Error deleting sheet:', error);
        return res.status(500).json({ success: false, error: 'Failed to delete sheet.' });
    }
};


exports.editSheet = async (req, res) => {
    try {

        const id = req.query.id;
        const existingSheet = await Sheet.findOne({ _id: id });

        if (!existingSheet) {
            return res.status(404).json({ success: false, error: 'Sheet not found.' });
        }

        if (req.body.sheetId) {
            existingSheet.sheetId = req.body.sheetId;
        }
        if (req.body.sheetName) {
            existingSheet.sheetName = req.body.sheetName;
        }

        await existingSheet.save();

        return res.json({ success: true, message: 'Sheet updated successfully.' });
    } catch (error) {
        console.error('Error editing sheet:', error);
        return res.status(500).json({ success: false, error: 'Failed to edit sheet.' });
    }
};
