import axios from "axios";
import { Configuration, OpenAIApi } from "openai";

const { OPENAI_API_KEY } = process.env;

const configuration = new Configuration({
  organization: "org-MMXK5fRsSMOKr4Dymk1RyRBY",
  apiKey: OPENAI_API_KEY,
});

export async function sendChat(message: string) {
  try {
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: message,
      temperature: 1,
      max_tokens: 25,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // const response = await axios.post(
    //   "https://api.openai.com/v1/engines/gpt-3.5-turbo/completions",
    //   {
    //     messages: [
    //       { role: "system", content: "You are a helpful assistant." },
    //       { role: "user", content: "Hello world" },
    //     ],
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${OPENAI_API_KEY}`,
    //     },
    //   }
    // );
    //   const completion = await openai.createChatCompletion({
    //     model: "gpt-3.5-turbo",
    //   messages: [
    //     { role: "system", content: "You are a helpful assistant." },
    //     { role: "user", content: "Hello world" },
    //   ],
    //   });
    console.log(response.data);
    return response.data.choices[0].text.trimStart();
  } catch (error) {
    console.log(error);
    return 'Lo siento, tengo que irme. Un gusto saludarte.'
  }
}
