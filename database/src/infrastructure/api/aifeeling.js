require('dotenv').config({ path: '../../../.env' });
const OpenAI = require("openai").default || require("openai"); 

const openai = new OpenAI({
  baseURL: process.env.HF_BASE_URL,
  apiKey: process.env.OPENAI_API_KEY
});

const analyzeEmotion = async (text) => {
  const promptStyle = `Select a feeling value from 1 to 5 according to the emotion level below.
Only show the emotion level value as numbers. Please response with only the number, nothing else.

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
${text}

### Response:
<think>{}
`;

  try {
    const stream = await openai.chat.completions.create({
      model: "tgi",
      messages: [
        { role: "user", content: promptStyle }
      ],
      max_tokens: 150,
      stream: true
    });

    let result = '';
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      result += content;
      process.stdout.write(content);
    }

    const match = result.match(/>\s*(\d+)/);
    const emotionLevel = match ? parseInt(match[1]) : 0;
    return emotionLevel

  } catch (error) {
    console.error('Error analyzing emotion:', error);
    return 0;
  }
};

module.exports = { analyzeEmotion };
