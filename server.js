const express = require('express')
const {OAuth2Client} = require('google-auth-library');
const clientId = "160707844309-e7s4djsi8p0troroa47vla30ojs01qlt.apps.googleusercontent.com"
const client = new OAuth2Client(clientId)
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(
    cors({
       origin: 'http://localhost:3000',
       methods: "GET,POST,PUT,DELETE,UPDATE",
       credentials: false,
       "preflightContinue": false,
   }));
//const users = [];

// const upsert = (array, item) =>{
//     const i = array.findIndex((_item) => _item.email === item.email);
//     if (i > -1) array[i] = item;
//     else array.push(item)
// }

app.post("/api/google-login", async (req,res) => {
    const { token } = req.body;
    
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: clientId,
    });

    const data = ticket.getPayload();
    console.log(ticket.getPayload());
    //upsert(users, {name, email, picture});
    res.status(201).json(data);
});

app.listen(5000, () => {
    console.log("Server port 5000");
});
