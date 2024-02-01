import axios from "axios";

const { OPENAI_API_KEY } = process.env;

export async function sendChat(message: string) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        max_tokens: 100,
        messages: [
          {
            role: "system",
            content: `Actua como un amigo o amiga que esta platicando por chat, trata de usar maximo 400 caracteres por mensaje. Puedes usar emojis o cualquier otro medio para sonar lo mas real posible. Recuerda reflejar la emocion correcta al hablar y tenerlo
            en cuenta en tus respuestas. No seas cortante con la conversacion, trata de mantenerla viva. A menos que el usuario de a entender que se acabo el tema o la conversacion.`,
          },
          { role: "user", content: message },
        ],
        model: "gpt-3.5-turbo",
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.choices[0].message.content.trimStart();
  } catch (error) {
    console.log(error);
    return "Lo siento, tengo que irme. Un gusto saludarte.";
  }
}
