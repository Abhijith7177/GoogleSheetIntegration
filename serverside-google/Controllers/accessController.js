const User = require('../Models/userSchema');
const Access = require('../Models/accessSchema');
const Sheet = require('../Models/sheetSchema');

exports.createAccess = async (req, res) => {
    try {
        const existingAccess = await Access.findOne({ user: req.user.id });
        if (existingAccess) {
            return res.json({ success: true, message: 'Access record already exists.' });
        }

        const newAccess = new Access({
            user: req.user._id,
            email: req.body.email,
        });


        await newAccess.save();

        return res.json({ success: true, message: 'Access record created successfully.' });
    } catch (error) {
        console.error('Error creating access record:', error);
        return res.status(500).json({ success: false, error: 'Failed to create access record.' });
    }
};



exports.getAccessToken = async (req, res) => {
    try {
        const access = await Access.find({ user: req.user._id });
        if (!access) {
            return res.status(404).json({ success: false, error: 'Access account not found.' });
        }


        return res.json({ success: true, access });
    } catch (error) {
        console.error('Error retrieving access token:', error);
        return res.status(500).json({ success: false, error: 'Failed to retrieve access token.' });
    }
};


exports.deleteAccess = async (req, res) => {
    try {

        const id = req.query.id

        const access = await Access.findOneAndDelete({ _id: id });

        if (!access) {
            return res.status(404).json({ success: false, error: 'Access account not found.' });
        }

        await Sheet.deleteMany({ accessId: access._id });

        return res.json({ success: true, message: 'Access account deleted successfully.' });
    } catch (error) {
        console.error('Error deleting access token:', error);
        return res.status(500).json({ success: false, error: 'Failed to delete access token.' });
    }
};




