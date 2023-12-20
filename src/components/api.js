import axios from 'axios';

// axios.defaults.withCredentials = true;
const url ='http://192.168.1.23:3006';// 'https://s1-wcfn.onrender.com';//'http://192.168.1.23:3006'//

const apiC = axios.create({
  baseURL: url, //process.env.REACT_APP_API_URL, // Set the base URL for
    withCredentials: true, 
});

const apiG = (url, setData) => {
  apiC
    .get(url)
    .then((response) => {
      if (response.data) {
        response.data !== null && setData(response.data);
      } else {
        console.error('Invalid response format:', response.data);
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
};

const apiP = axios.create({
  baseURL: url, //process.env.REACT_APP_API_URL, // Set the base URL for yo
  withCredentials: true, 
});

const api = {
  apiG: apiG,
  apiP: apiP,
  apiC: apiC
};

export default api;
