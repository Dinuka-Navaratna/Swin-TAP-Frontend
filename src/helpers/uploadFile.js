// uploadFile.js
import axios from "axios";
const FormData = require('form-data');

const uploadFile = async (file, token) => {
  let data = new FormData();
  data.append('file', file);
  data.append('dimensions', '[{"width":300,"height":300},{"width":180,"height":270}]');

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_API_URL}/api/files/`,
    headers: { 
      'Authorization': `Token ${token}`
    },
    data : data
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default uploadFile;
