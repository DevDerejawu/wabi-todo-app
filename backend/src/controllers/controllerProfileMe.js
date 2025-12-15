import sharp from "sharp";
import path from "path";
import { updateUserProfile } from "../models/modelProfileMe.js";

async function HandleProfileMe(req, res) {
  try {
    //the main goal of prefering to fallback to null instead of "empty string" is the model must accecpt null value if no data is sent from client.
    const name = req.body.name || null;
    const password = req.body.password || null;
    const { userId } = req.user;

    
    let targetedUrlToSaveInDb = null;

    // checking if picture is sent
    if (req.file) {
      const fileName = `${Date.now()}-${Math.random()}-${
        req.file.originalname
      }`;
      const savePath = path.join("profilePictures/images", fileName);

      await sharp(req.file.buffer)
        .resize({ width: 180, height: 180 })
        .jpeg({ quality: 80 })
        .toFile(savePath);

      targetedUrlToSaveInDb = `profile-pictures/images/profiles/${fileName}`;
    }

    // Ensure at least one field is being updated
    if (!name && !password && !targetedUrlToSaveInDb) {
      return res.status(400).json({
        success: false,
        status: 400,
        error: "No valid data",
        message: "Please provide at least one field to update.",
        data: null,
      });
    }

    const data = await updateUserProfile({
      name,
      password,
      targetedUrlToSaveInDb,
      userId,
    });
    const statusCode = data.status || (data.success ? 200 : 400);

    return res.status(statusCode).json(data);
  } catch (err) {
 
    return res.status(500).json({
      
      success: false,
      error: "Server-error",
      message: "Internal server error.",
      status: 500,
      data: null,
    });
  }
}

export { HandleProfileMe };
