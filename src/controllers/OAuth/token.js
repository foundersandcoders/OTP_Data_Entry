const queryString = require('query-string');
const Request = require('request');
// const jwt = require('jsonwebtoken');
const { oauthTokenBaseURL } = require('../../constants/urls.json');

module.exports = (req, res) => {
  const tokenQueries = {
    code: req.query.code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
    grant_type: 'authorization_code'
  };

  const options = {
    method: 'POST',
    uri: oauthTokenBaseURL,
    body: queryString.stringify(tokenQueries),
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  };

  if (req.query.state !== process.env.STATE) {
    return res.redirect('error', {
      statusCode: 400,
      errorMessage: res.locals.localText.oauthError
    });
  } else {
    Request(options, (error, res, body) => {
      if (error || res.statusCode !== 200) {
        res.redirect('error', {
          statusCode: 500,
          errorMessage: res.locals.localText.serverError
        });
      } else {
        // const parsedBody = JSON.parse(body);
        // const token = parsedBody.access_token;
      }
    });
  }
};