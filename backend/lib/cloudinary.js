const cloudinary = require('cloudinary').v2;

const requiredKeys = {
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

const missingKeys = Object.entries(requiredKeys)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingKeys.length) {
  console.warn(`Cloudinary configuration incomplete. Missing: ${missingKeys.join(', ')}`);
} else {
  cloudinary.config({
    cloud_name: requiredKeys.CLOUDINARY_CLOUD_NAME,
    api_key: requiredKeys.CLOUDINARY_API_KEY,
    api_secret: requiredKeys.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

async function uploadImage({ file, folder = 'quick-facts', publicId, tags = [] }) {
  if (!file) {
    throw new Error('File is required for Cloudinary upload');
  }

  if (missingKeys.length) {
    throw new Error(`Cloudinary configuration incomplete. Missing: ${missingKeys.join(', ')}`);
  }

  const options = {
    folder,
    overwrite: true,
    resource_type: 'image',
    tags,
  };

  if (publicId) {
    options.public_id = publicId;
  }

  const preset = process.env.CLOUDINARY_UPLOAD_PRESET;
  if (preset) {
    options.upload_preset = preset;
  }

  return cloudinary.uploader.upload(file, options);
}

async function deleteImage(imageUrl) {
  if (!imageUrl) {
    return { success: false, message: 'No image URL provided' };
  }

  if (missingKeys.length) {
    console.warn('Cloudinary not configured, skipping image deletion');
    return { success: false, message: 'Cloudinary not configured' };
  }

  try {
    // Extract public_id from Cloudinary URL
    // Example: https://res.cloudinary.com/cloud-name/image/upload/v1234567890/folder/image.jpg
    const cloudName = requiredKeys.CLOUDINARY_CLOUD_NAME;
    
    // Check if URL is from Cloudinary
    if (!imageUrl.includes('cloudinary.com') || !imageUrl.includes(cloudName)) {
      return { success: false, message: 'Not a Cloudinary image' };
    }

    // Extract public_id (everything after /upload/ but without extension)
    const uploadIndex = imageUrl.indexOf('/upload/');
    if (uploadIndex === -1) {
      return { success: false, message: 'Invalid Cloudinary URL format' };
    }

    let publicId = imageUrl.substring(uploadIndex + 8); // +8 to skip '/upload/'
    
    // Remove version parameter (v1234567890/)
    publicId = publicId.replace(/^v\d+\//, '');
    
    // Remove file extension
    publicId = publicId.replace(/\.[^.]+$/, '');

    console.log(`Attempting to delete image with public_id: ${publicId}`);

    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result === 'ok') {
      console.log(`Successfully deleted image: ${publicId}`);
      return { success: true, message: 'Image deleted', publicId };
    } else {
      console.warn(`Cloudinary deletion result: ${result.result}`);
      return { success: false, message: result.result, publicId };
    }
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error.message);
    return { success: false, message: error.message };
  }
}

module.exports = {
  uploadImage,
  deleteImage,
};
