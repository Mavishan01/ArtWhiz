import * as dotenv from "dotenv";
import OpenAI from 'openai';
import { writeFile } from "fs/promises";

dotenv.config();

// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// // const client = new OpenAI();


// export const generateImage = async () => {
//   try {
//     const img = await client.images.generate({
//       model: "dall-e-2",
//       prompt: "A cute baby sea otter",
//       n: 1,
//       size: "256x256"
//     });

//     // Safety check: ensure the API returned data
//     if (!img.data || !img.data[0]?.b64_json) {
//       throw new Error("No image returned from OpenAI API");
//     }

//     // Convert Base64 string to binary
//     const imageBuffer = Buffer.from(img.data[0].b64_json, "base64");

//     // Save to file
//     await writeFile("output.png", imageBuffer);

//     console.log("✅ Image saved as output.png");
//   } catch (error) {
//     console.error("Error generating image:", error.message);
//   }

// // const models = await client.models.list();
// // console.log(models.data.map(m => m.id));

// };

import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

export async function generateImage(req, res) {

  try {
    const { prompt } = req.body;
    const ai = new GoogleGenAI({});

    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt || 'no input',
      config: {
        numberOfImages: 1,
      },
    });

      const generatedImage = response.generatedImages[0];
      let imgBytes = generatedImage.image.imageBytes;
      const buffer = Buffer.from(imgBytes, "base64");
      fs.writeFileSync(`imagen-${Date.now()}.png`, buffer);
      
      console.log("Image Saved");
      console.log('buffer: ', buffer);

      // convert buffer to base64 Data URL
      const base64Data = buffer.toString("base64");
      const dataUrl = `data:image/png;base64,${base64Data}`;
      console.log('url: ', dataUrl);

      // send to frontend as JSON
      res.json({ image: dataUrl });


  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: "Failed to generate image" });
  }
  
}

