const { Router } = require('express');

const { uploadImage } = require('../lib/cloudinary');

const router = Router();

router.post('/image', async (req, res, next) => {
  try {
    const { file, folder, publicId, tags } = req.body;

    if (!file) {
      return res.status(400).json({ error: 'Missing `file` in request body.' });
    }

    const uploadResult = await uploadImage({ file, folder, publicId, tags });

    return res.status(201).json({
      publicId: uploadResult.public_id,
      url: uploadResult.secure_url,
      bytes: uploadResult.bytes,
      width: uploadResult.width,
      height: uploadResult.height,
      format: uploadResult.format,
    });
  } catch (error) {
    error.status = error.http_code || error.status || 500;
    error.message = error.message || 'Failed to upload image to Cloudinary';
    next(error);
  }
});

module.exports = router;
