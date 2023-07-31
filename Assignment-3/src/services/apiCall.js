import axios from 'axios';
// const axios = require('axios');
import environment from "../environment/environment";

export const  apiCall = async (
  url,
  method = "POST",
  data,
  contentType = "application/json"
) => {
  const _headers = {
    "Content-Type": contentType,
    Authorization: localStorage.getItem("token") || "",
  };

  let _response = "";
  await axios(environment.baseUrl + url, {
    method: method,
    data: data,
    headers: _headers,
  })
    .then((response) => {
      _response = response.data;
    })
    .catch((error) => {
      console.log(error);
     
    });

  return _response;
};
