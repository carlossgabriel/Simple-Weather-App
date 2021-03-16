const fetch = require('node-fetch');
const generateWebAppURL = require('server/utils').generateWebAppURL;

module.exports = (app) => {

  let zipcode;

  app.post('/search-location-weather', (req, res) => {

    zipcode = req.body.zipcode;

    if (!zipcode || zipcode.length < 8 || zipcode.length > 8) {
      res.redirect('/error');
    } else {
      res.redirect('/current-weather');
    }
  });


  app.get('/search-location-weather', (req, res) => {
    
    const requestBody = req.body;
    const apiUrl = generateWebAppURL(requestBody.locationType, requestBody.locationData);

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        res.send({ data });
      })
      .catch(err => {
        res.redirect('/error');
      });

  })
};
