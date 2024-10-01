// uploadFile.js
const axios = require('axios');
const FormData = require('form-data');

const uploadFile = (file, token) => {
  let data = new FormData();
  data.append('file', file);

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_API_URL}/api/files/`,
    headers: { 
      'Authorization': `Token ${token}`, 
      ...data.getHeaders()
    },
    data : data
  };

  return axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

module.exports = uploadFile;
