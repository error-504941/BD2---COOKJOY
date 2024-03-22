import React from 'react';
import axios from 'axios'

const AxiosRequest = async (method="GET", url, data = null, headers = {}) => {
  try {

    if(headers == null){
      headers = {
        'Content-Type': 'application/json',
      }
    }
    
    const response = await axios({
      method,
      url,
      data,
      headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default AxiosRequest;