import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadFile, getAllFiles } from '../controllers/fileController.js';

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

// Routes
router.post('/upload', upload.single('file'), uploadFile);
router.get('/files', getAllFiles);

export default router; 