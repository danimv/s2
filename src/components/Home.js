import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from './api';

const Home = () => {
  const navigate = useNavigate();
  const [newData, setData] = useState(null);
  useEffect(() => {
    api.apiG('/', setData);
  }, []);

  const postRequest = async (postId) => {
    try {
      api.apiP
        .post('/contrib', {
          postId: postId,
        })
        .then((response) => {
          if (response.data) {
            console.log(response.data);
            navigate('/showAction', { state: { data: response.data } });
          } else {
            console.error('Invalid response format:', response.data);
          }
        });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!Array.isArray(newData)) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <header className="rounded mb-3 mt-2 justify-content-between align-items-center" id="background-header">
        <h2 style={{ fontSize: '250%' }}></h2>
        <a style={{ fontSize: '220%', fontWeight: 'bold', width:'20%' }} className="btn background-primary-color" href="/newAction">
          Nou +
        </a>
      </header>
      <div className="row">
        {newData.map((foodItem) => (
          <div key={encodeURIComponent(foodItem._id)} className="col-lg-4 col-md-6 col-sm-6 mb-4">
            <div className="card p-2">
              <img className="card-img-top" src={`/uploads/${foodItem.imageName}`} alt={foodItem.name} />
              <div className="card-title d-flex justify-content-between">
                <h4>{foodItem.name}</h4>
                <p style={{ color: 'green' }}>#{foodItem.tipus}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>
                  <button className="btn background-secondary-color" onClick={() => postRequest(foodItem._id)}>
                    Més
                  </button>
                </p>
                <p>
                  {foodItem.comments.length} <i className="fa-regular fa-comment"></i>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
