import { Configuration, OpenAIApi } from "openai";

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

  console.log(req.body.message);

  try {
    const response = await openai.createImage({
      prompt: req.body.message,
      n: 2,
      size: "1024x1024",
    });
    console.log(response.data.data);
    res.status(200).json({ result: response.data.data});
  } catch (error) {
    console.error(error);
  }
}
