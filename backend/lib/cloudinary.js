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

module.exports = {
  uploadImage,
};
