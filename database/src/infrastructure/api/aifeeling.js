// npm install openai

import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://yqbv69dp12j0cexn.us-east4.gcp.endpoints.huggingface.cloud/v1/",
  apiKey: "hf_XXXXX" // <-- ใส่ API key ของคุณตรงนี้
});


const statement = "มีความสุขที่สุดเลยชีวิตนี้";

const promptStyle = `Select a feeling value from 1 to 5 according to the emotion level below.
Only show the emotion level value as numbers.

Emotion Level :
1 - Worst
2 - Bad
3 - Okay
4 - Good
5 - Best

### Instruction:
You are a psychologist with advanced expertise in analyzing emotions.
Please analyze the emotion in the following statement and provide the corresponding emotion level as number.

### Statement:
${statement}

### Response:
<think>{}
`;

const stream = await openai.chat.completions.create({
  model: "tgi",
  messages: [
    { role: "system", content: promptStyle },
    { role: "user", content: statement }
  ],
  max_tokens: 150,
  stream: true
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || "");
}
