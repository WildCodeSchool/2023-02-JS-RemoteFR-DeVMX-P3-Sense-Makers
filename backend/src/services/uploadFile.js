const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const postFile = (req, res) => {
  const { originalname } = req.file;

  const { filename } = req.file;

  const newFileName = `${uuidv4()}-${originalname}`;
  fs.rename(
    `./public/uploads/${filename}`,
    `./public/uploads/${newFileName}`,
    (err) => {
      if (err) throw err;
    }
  );
  res.status(201).json({
    message: "File uploaded",
    newUploadedFileName: newFileName,
  });
};

module.exports = { postFile };
