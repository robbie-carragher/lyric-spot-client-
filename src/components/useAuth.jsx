
// import { useState, useEffect } from "react"
// import axios from "axios"

// export default function useAuth(code) {
//   const [accessToken, setAccessToken] = useState()
//   const [refreshToken, setRefreshToken] = useState()
//   const [expiresIn, setExpiresIn] = useState()

//   useEffect(() => {
//     const login = async () => {
//       try {
//         const res = await axios.post("http://localhost:3001/login", { code });
       
//         setAccessToken(res.data.accessToken);
//         setRefreshToken(res.data.refreshToken);
//         setExpiresIn(res.data.expiresIn);
//         window.history.pushState({}, null, "/");
//       } catch (err) {
//         console.error("Login Error:", err);
//         // Redirect only on certain conditions
//         if (err.response && err.response.status >= 500) {
//           window.location = "/";
//         }
//       }
//     };
  
//     login();
//   }, [code]);
  
  


//   useEffect(() => {
//     if (!refreshToken || !expiresIn) return;
  
//     const refresh = async () => {
//       try {
//         const res = await axios.post("http://localhost:3001/refresh", { refreshToken });
//         setAccessToken(res.data.accessToken);
//         setExpiresIn(res.data.expiresIn);
//       } catch (err) {
//         console.error("Refresh Token Error:", err);
//         // Redirect only on certain conditions
//         if (err.response && err.response.status >= 500) {
//           window.location = "/";
//         }
//       }
//     };
  
//     const interval = setInterval(() => {
//       refresh();
//     }, (expiresIn - 60) * 1000);
  
//     return () => clearInterval(interval);
//   }, [refreshToken, expiresIn]);
  


//   return accessToken
// }

import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = (code) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios.post('http://localhost:3001/login', { code })
      .then(res => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, '/');
      })
      .catch(err => {
        console.error('Login Error:', err);
        window.location = '/';
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(() => {
      axios.post('http://localhost:3001/refresh', { refreshToken })
        .then(res => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch(err => {
          console.error('Refresh Token Error:', err);
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
};

export default useAuth;
