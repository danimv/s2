import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from './api';

const Login = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    const storedUser = getCookie('user');
    // console.log(storedUser);
    if (storedUser) {
      const decodedCookieObject = JSON.parse(storedUser);
      // console.log(decodedCookieObject);
      setUser(decodedCookieObject);
      // console.log(decodedCookieObject.username);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const postRequest = async () => {
    try {
      // console.log(JSON.stringify(loginData));
      await api.apiC
        .post(
          '/login',
          {
            username: loginData.username,
            password: loginData.password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          // console.log(response);
          if (response.status === 200) {
            setUser(response.data.user);
            setCookie('user', JSON.stringify(response.data.user));
            navigate('/');
          }
        });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Helper function to set a cookie
  const setCookie = (name, value, days = 7) => {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  };

  // Helper function to get a cookie by name
  const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName.trim() === name) {
        console.log(cookieValue);
        return cookieValue;
      }
    }
    return null;
  };


  return (
    <div className="container">
      <div className="jumbotron">
        <h3>Inicia sessió!</h3>
        <form>
          <div className="mb-3">
            <input
              type="text"
              name="username"
              placeholder="usuari"
              value={loginData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="contrasenya"
              value={loginData.password}
              onChange={handleChange}
            />
          </div>
        </form>
        <button onClick={() => postRequest()}>Entra</button>
      </div>
    </div>
  );
};

export default Login;
