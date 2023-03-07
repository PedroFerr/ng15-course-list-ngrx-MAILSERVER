const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

// app.use(cors({ origin: '*' }));
// const corsOpts = {
//     origin: '*',
//     methods: [
//         'GET',
//         'POST',
//     ],
//     allowedHeaders: [
//         'Content-Type',
//     ],
// };
// app.use(cors(corsOpts));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', ['https://ng15-ngrx.miles-net.com']);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    return next();
});
app.use(bodyParser.json());

app.listen(3000, () => console.log('The server started on port 3000 !!!!!!'));

app.get('/', (req, res) => {
    res.send(
        "<h1 style='text-align: center'>Wellcome to Miles-NET <br><br>😃👽🙌👽👌👽🫡👽🫢👽</h1>"
    );
});

app.post('/sendmail', (req, res) => {
    let user = req.body;
    console.log('Request came from ', user);
    sendMail(user, (info) => {
        console.log(`The mail has been sent 😃👽 !`);
        res.send(info);
    });
});

async function sendMail(user, callback) {
    // create reusable transporter object using the default SMTP transport of Miles-NET
    let transporter = nodemailer.createTransport({
        host: 'mail.miles-net.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        },
    });

    let mailOptions = {
        from: `${user.name} <${user.email}>`,
        to: process.env.EMAIL,                   // list of receivers
        subject: 'Wellcome to Miles-NET 👽!!',
        html: `<h1>Hi ${user.name}</h1><br>
        <h4>Thanks for joining us!</h4>
        <p>${user.message}</p>`,
    };

    let info = transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("Something went wrong.");
        }
        res.status(200).send("Email successfully sent to recipient!");
    });

    callback(info);
}
