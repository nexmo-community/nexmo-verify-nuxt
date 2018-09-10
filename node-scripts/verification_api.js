if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const Nexmo = require('nexmo');
const jwt = require('jsonwebtoken');

const API_KEY = process.env.apiKey;
const API_SECRET = process.env.apiSecret;
const JWT_SECRET = process.env.jwtSecret;

const app = express();
app.use(express.json());

const nexmo = new Nexmo({ apiKey: API_KEY, apiSecret: API_SECRET });

app.post('/send', async (req, res) => {
  // Get the phone number from the request body of our main app
  let phoneNumber = req.body.phoneNumber;

  nexmo.verify.request(
    {
      number: phoneNumber,
      brand: 'MyApp',
      code_length: 6,
      pin_expiry: 60
    },
    async (err, result) => {
      if (err || result.status !== '0') {
        res.json({ error: err || result.error_text });
      } else {
        const accessToken = await jwt.sign(
          {
            phoneNumber,
            request_id: result.request_id
          },
          JWT_SECRET
        );
        res.json({ token: accessToken });
      }
    }
  );
});

app.post('/verify', async (req, res) => {
  let { token, code } = req.body;
  const tokenObject = await jwt.verify(token, JWT_SECRET);

  nexmo.verify.check(
    { request_id: tokenObject.request_id, code: code },
    async (err, result) => {
      if (err || result.status !== '0') {
        res.json({ error: err || result.error_text });
      } else {
        const tokenizeResult = await jwt.sign(result, JWT_SECRET);
        res.json({ token: tokenizeResult });
      }
    }
  );
});

app.post('/auth-check', async (req, res) => {
  let { token } = req.body;
  const tokenObject = await jwt.verify(token, JWT_SECRET);
  const { request_id } = tokenObject;

  nexmo.verify.search(request_id, async (err, result) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json(result);
    }
  });
});

module.exports = {
  path: '/verification',
  handler: app
};
