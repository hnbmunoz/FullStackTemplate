const express = require ('express');
const bodyParser = require('body-parser')

const app = express();

const middlewares = [bodyParser.urlencoded({ extended: true }), bodyParser.json()];
app.use(middlewares);

app.post("/message",  async (req, res) => {
  const { conversation_id , message } = req.body;

  const RegEx = /([H](ello|i))|(((Goodbye|bye)))/i
  let responseMessage = "Sorry, I don't understand."

  let result = message.match(RegEx);
  if (Array.isArray(result) && result.length > 0 ) {
    if (result[0].toLowerCase().trim() === 'hello' || result[0].toLowerCase().trim() === 'hi' ) {
      responseMessage = "Welcome to StationFive."
    }
    if (result[0].toLowerCase().trim() === 'goodbye' || result[0].toLowerCase().trim() === 'bye' ) {
      responseMessage = "Thank you, see you around."
    }
  }  

  res.send({
    response_id: conversation_id ,
    response: `${responseMessage}`})
});

app.get("/", (req, res) => {
  res.send("Server Started")
})

app.get("/Menu", (req, res) => {
  const mainMenu = {
    menus: [
      // first group of radio-buttons
      [
        { id: '101', value: 'Vegetarian' },
        { id: '102', value: 'Nut allergy' },
        { id: '103', value: 'Halal' }
      ],
      // second group of radio-buttons
      [
        { id: '201', value: 'Cashew chicken' },
        { id: '202', value: 'Sweet and sour pork' },
        { id: '203', value: 'Stir fried Tofu' },
        { id: '204', value: 'Vegetable fried rice' },
        { id: '205', value: 'Pad Thai' },
        { id: '206', value: 'Massaman beef' },
      ],
      // third group of radio-buttons
      [
        { id: '301', value: 'Peanut sauce' },
        { id: '302', value: 'Oyster sauce' },
        { id: '303', value: 'Vegetable spring rolls' },
        { id: '304', value: 'Steamed rice' },
      ],
    ],
    rules: {
      // 'Vegetarian' is NOT compatible with 'Cashew chicken', 'Sweet and sour pork', 'Massaman beef', 'Oyster sauce'
      101: [201, 202, 206, 302], 
      // 'Nut allergy' is NOT compatible with 'Cashew chicken', 'Peanut sauce',
      102: [201, 301], 
      // 'Halal' is NOT compatible with 'Sweet and sour pork',
      103: [202], 
      // 'Vegetable fried rice' is NOT compatible with 'Steamed rice' (you don't need more rice... carb overload),
      204: [304],
      // 'Pad thai' is NOT compatible with 'Steamed rice' (Pad thai comes with noodles),
      205: [304],
    }
  }
  res.send(mainMenu);
});


app.listen(process.env.PORT || 3000, () => {
  console.log("Server has Started");
})