import File from '../models/file.js';

export const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Create new file document
        const file = new File({
            filename: req.file.filename,
            originalName: req.file.originalname,
            path: req.file.path,
            size: req.file.size,
            type: req.file.mimetype
        });

        // Save to database
        await file.save();

        res.status(200).json({
            message: 'File uploaded successfully',
            file: {
                filename: file.filename,
                originalName: file.originalName,
                path: file.path,
                size: file.size,
                type: file.type,
                uploadDate: file.uploadDate
            }
        });
    } catch (error) {
        console.error('Error in file upload:', error);
        res.status(500).json({ error: 'Error uploading file' });
    }
};

export const getAllFiles = async (req, res) => {
    try {
        const files = await File.find({}).sort({ uploadDate: -1 });
        res.status(200).json(files);
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ error: 'Error fetching files' });
    }
}; 