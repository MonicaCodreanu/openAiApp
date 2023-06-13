import { Configuration, OpenAIApi } from "openai";
import fs from "fs";
import path from "path";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }
  console.log("url", req.body);
  const url = req.body.replace("http://localhost:3000/", "");
  console.log("file", url);
  const filePath = path.join(process.cwd(), "public", url);
  console.log(filePath);

  try {
    const response = await openai.createImageVariation(
      fs.createReadStream(filePath), //"public/images/cat.png"
      2,
      "256x256"
    );
    console.log(response.data.data);
    res.send(response.data.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error generating image variations." });
  }
}
