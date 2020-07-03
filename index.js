const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.listen(port, () => {
  console.log(`We are live on port ${port}`);
});


app.get('/', (req, res) => {
  res.send('Welcome to my api');
})

app.post('/api/v1/mail', (req,res) => {
    const email = process.env.EMAIL;
    const password = process.env.PASS;
    
    var data = req.body;

    var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    auth: {
        user: email, // Your email
        pass: password // Email password
    }
    });

    var mailOptions = {
    from: data.email, // User Email
    to: email, // Your email
    subject: `${data.name}(${data.email}) sent a message`,
    html: `<p>${data.name}</p>
            <p>${data.email}</p>
            <p>${data.message}</p>`
    };

    smtpTransport.sendMail(mailOptions,
    (error, response) => {
    if(error) {
        res.send(error)
    }else {
        res.send('Success')
    }
    smtpTransport.close();
    });

})