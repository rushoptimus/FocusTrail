// routes/imageUpload.route.js
import express from 'express';
import multer from 'multer';
import cloudinary from "../utils/cloudinary.js"
import streamifier from 'streamifier';


const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log("File received:", req.file.originalname); // Add log

    const streamUpload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'user_images' },
          (error, result) => {
            if (error) {
              console.error("Cloudinary Upload Error:", error);
              reject(error);
            } else {
              console.log("Upload success:", result); // Add log
              resolve(result);
            }
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await streamUpload();

    console.log("Sending response to client..."); // Add log
    res.status(200).json({ imageUrl: result.secure_url });

  } catch (error) {
    console.error("Catch error:", error); // Add log
    res.status(500).json({ error: 'Image upload failed', details: error.message });
  }
});


export default router;
