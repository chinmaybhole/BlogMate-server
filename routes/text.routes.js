const router = require("express").Router();
const fetch = require("node-fetch");
const { Configuration, OpenAIApi } = require("openai");

async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B",
    {
      headers: {
        Authorization: "Bearer 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",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

// async function openai(data) {
//   const configuration = new Configuration({
//     apiKey: "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",
//   });
//   const openai = new OpenAIApi(configuration);

//   const completion = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: "Hello world" }],
//   });
//   console.log(completion.data.choices[0].message);
// }

router.post("/textbot", (req, res) => {
  try {
    const message = req.body.message;
    // const response = {
    //   message: "Hello, I am a simple chatbot. How can I assist you today?",
    // };
    query({
      inputs: message,
    }).then((response) => {
      console.log(JSON.stringify(response));
      res.json(response);
    });
    // openai(message);
  } catch (err) {
    res.status(501).send(err.message);
  }
});

module.exports = router;
