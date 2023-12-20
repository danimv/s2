import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from './api';

const Header = ({ error, success }) => {
  const navigate = useNavigate();
  const [currentUser, setUser] = useState(null);
  const [newData, setData] = useState(null);
  // useEffect(() => {
  //  api.apiC.get('/user', { withCredentials: true }).then((res) => {
  //     res.data && setUser(res.data.user);
  //     // setForceUpdate((prev) => !prev);
  //   });
  // }, []);

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

  const removeCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const getRequest = async () => {
    await api.apiG('/logout', setData);
    removeCookie('user');
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'green' }}>
      <div className="container-fluid">
        <a className="navbar-brand active" href="/">
          Comunitat
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="nav navbar-nav navbar-right ms-auto">
            {!currentUser ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Entrar
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register">
                    Registrar
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="btn background-secondary-color" href={`/user/${currentUser.id}`}>
                    {currentUser.username}
                  </a>
                </li>
                <li className="nav-item">
                  <button className="btn background-primary-color" onClick={() => getRequest()}>
                    Sortir
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {error && error.length > 0 && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {success && success.length > 0 && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}
    </nav>
  );
};

export default Header;
