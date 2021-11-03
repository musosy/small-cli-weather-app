const axios = require('axios');

module.exports = async _ => {
    const res = await axios('https://1.1.1.1/cdn-cgi/trace');
    const ipAdress = res.data.split('ip=')[1].split('\n')[0];
    const geoloc = await axios(`http://ip-api.com/json/${ipAdress}`);
    return geoloc.data.city;
}