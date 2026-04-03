const multer = require("multer");

//configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-resume-${file.originalname}`);
    }
});

// File Filter for PDF
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["application/pdf"];
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true);
    }else{
        cb(new Error("Invalid file type. Only PDF is allowed."), false);
    }
};

//configure upload
const uploadPdf = multer({ storage, fileFilter });

module.exports = uploadPdf;
