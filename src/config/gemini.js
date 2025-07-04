//AIzaSyBWqXp0lSKnNZIIzgwM2z2qMU5EXCQUEcY

/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from"@google/generative-ai";
async function run(prompt) {
const apiKey = "AIzaSyDbvhnVhDs8LzdOH5SCZgw-dep4itB5CjY";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro", });

const generationConfig = {
  temperature: 0.9,
  topP: 1,
  maxOutputTokens: 2048,
  responseMimeType: "text/plain",
};
const safetySettings=[
  {
      category : HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold : HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category : HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold : HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category : HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold : HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category : HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold : HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  ];

  const chatSession = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  const response = result.response;
  console.log(response.text());
  return response.text();
}

export default run;