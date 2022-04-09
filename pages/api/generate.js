import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-davinci-002", {
    prompt: generatePrompt(req.body.question),
    temperature: 0, // TODO add temp slider UI
    max_tokens: 450,
  });
  
  res.status(200).json({ result: completion.data.choices[0].text });
}

// a child

function generatePrompt(question) {

  return `Answer my question in a way that a smart child would understand.

My question: ${question}
Your answer:`;
}
