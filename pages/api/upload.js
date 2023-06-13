import multer from "multer";
import path from "path";

////////////// To be able to upload in Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};
//////////////

const storage = multer.diskStorage({
  destination: "./public/images",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage }).single("file");
let filePath;

export default async function (req, res) {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error uploading file." });
    } else if (err) {
      return res.status(500).json(err);
    }
    // filePath = req.file.path;
    filePath = req.file.path.replace(/\\/g, "/");
    console.log("filePath from inside upload", filePath);
    return res.status(200).json({ message: "File uploaded successfully." });
  });
}

export { filePath };
