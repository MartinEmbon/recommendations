// 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

const { Configuration, OpenAIApi } = require("openai")
const express = require('express')

const configuration = new Configuration({
    organization: "org-RpHKqbcmTOWwiLJGIbfDCw5b",
    apiKey: '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',
});

const openai = new OpenAIApi(configuration);

async function callApi() {

}

callApi()

const bodyParser = require('body-parser')
const cors = require("cors")
const port = 3080

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))

app.post('/', async (req, res) => {
    const { message } = req.body;
    console.log(message,"message")
     const response = await openai.createCompletion({
         model: "text-davinci-003",
         prompt: `${message}`,
         max_tokens: 100,
         temperature: 0.5
     })   
    res.json({
        
        message: response.data.choices[0].text
    })
})


// app.get('/models', async (req, res) => {
//     const response = await openai.listEngines();
//    console.log(response.data.data)
//     res.json({
// models:response.data.data
//     })
// })


app.listen(port, () => {
    console.log(`Example at listinet at localhost ${port}`)
})