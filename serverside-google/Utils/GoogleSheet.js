
const { google } = require('googleapis');
const keys = require('../Utils/token.json');
const Sheet = require('../Models/sheetSchema');
const { generateTokenForSheet } = require('./GlobalFunctions');
const User = require('../Models/userSchema');

const auth = new google.auth.GoogleAuth({
    credentials: keys,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

exports.addToSheet = async (req, res) => {
    try {
        const { id } = req.query;
        const { data } = req.body;

        const existingSheet = await Sheet.findById(id);
        if (!existingSheet) {
            return res.status(400).json({ success: false, message: 'Sheet does not exist.' });
        }

        const alldata = await sheets.spreadsheets.values.append({
            spreadsheetId: existingSheet.sheetId,
            range: existingSheet.sheetName,
            valueInputOption: 'RAW',
            requestBody: {
                values: data,
            },
        });

        const updatedData = await sheets.spreadsheets.values.get({
            spreadsheetId: existingSheet.sheetId,
            range: existingSheet.sheetName,
        });

        const sheetValues = updatedData.data.values;

        return res.status(200).json({ success: true, message: 'Data added to sheet successfully.', data: sheetValues });
    } catch (error) {
        console.error('Error adding data to sheet:', error);
        return res.status(500).json({ success: false, error: 'Failed to add data to sheet.' });
    }
};


exports.getDataFromSheet = async (req, res) => {
    try {
        const { id } = req.query;

        const existingSheet = await Sheet.findById(id);
        if (!existingSheet) {
            return res.status(400).json({ success: false, message: 'Sheet does not exist.' });
        }


        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: existingSheet.sheetId,
            range: existingSheet.sheetName,
        });

        const values = response.data.values;
        if (!values) return res.status(200).json({ success: true, data: [], message: 'Empty Data retrieved from sheet successfully.' })
        return res.status(200).json({ success: true, data: values, message: 'Data retrieved from sheet successfully.' });
    } catch (error) {
        console.error('Error getting data from sheet:', error);
        return res.status(500).json({ success: false, error: 'Failed to get data from sheet.' });
    }
};



exports.generateAccessToken = async (req, res) => {
    try {
        const userId = req.user._id
        const token = generateTokenForSheet(userId);

        await User.findByIdAndUpdate(userId, { accessSheetToken: token });

        return res.status(200).json({ success: true, token });
    } catch (error) {
        console.error('Error generating token:', error);
        return res.status(500).json({ success: false, error: 'Failed to generate token.' });
    }
}
