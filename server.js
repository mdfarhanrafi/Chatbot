import express from "express"
import { GoogleGenerativeAI } from "@google/generative-ai"
import "ejs"
import "dotenv/config.js"
const app = express()
app.use(express.json());
app.use(express.static('public'))
app.set('view engine','ejs')
const genAI = new GoogleGenerativeAI(process.env.API_KEY);




app.post('/chat', async (req, res) => {
     try {
          const { usertext } = req.body;
          console.log(usertext)
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
          const chat =  model.startChat({
               history: [
                    { role: 'user', parts: [{ text: "Hello" }] },
                    { role: 'model', parts: [{ text: "Hi, how can I help?" }] },
               ]
          });
          const result = await chat.sendMessage(usertext);
          return res.json({ response: result.response.text() });
     } catch (error) {
          console.error("Error in chat:", error);
          res.status(500).json({ error: 'Internal Server Error' });
     }
});

app.listen(3000, () => {
     console.log('Server is running on port 3000');
});

app.get("/", (req,res) =>{
     res.render('pages/index')
})