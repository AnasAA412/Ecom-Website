const cloudinary = require("cloudinary").v2;

const multer = require("multer");

cloudinary.config({
  cloud_name: "dbvlgzddf",
  api_key: "731324943126352",
  api_secret: "qurTaa15yCECQCaG0u0Zu9k9Ufk",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}
const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };


