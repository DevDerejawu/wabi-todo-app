import multer from "multer";

const storage = multer.memoryStorage();

const filterTheRequiredFileTypes = (req, file, cb) => {
  const requiredFileTypes = ["image/jpeg", "image/png"];
  //here is because if file is not sent it is okay, but if image is sent it must be validated.
  if (!file || requiredFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPG, JPEG allowed."), false);
  }
};

const upload = multer({
  storage,
  fileFilter: filterTheRequiredFileTypes,
});

export { upload };
