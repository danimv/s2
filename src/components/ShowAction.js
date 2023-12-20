import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ShowAction = ({ currentUser }) => {
  const location = useLocation();
  const newData = location.state && location.state.data;
  console.log(currentUser);

  if (newData == null) {
    // Handle the case where newData is not an array (e.g., set a default or show a loading message)
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-md-2">
          <div className="list-group text-start">
            <li className="list-group-item">
              <b>{newData && newData.author.username}</b>
            </li>
            <li className="list-group-item">
              <b>{newData.lloc}</b>
            </li>
            <li style={{ color: 'green' }} className="list-group-item">
              #{newData.tipus}
            </li>
            <li className="list-group-item">
              <b>
                {newData.quantitat} {newData.unitat}
              </b>
            </li>
          </div>
        </div>
        <div className="col-md-9">
          <div className="img-thumbnail">
            <img className="card-img-top" src={`/uploads/${newData.imageName}`} alt="" />
            <div className="caption-full p-4">
              <div className="d-flex justify-content-between">
                <h4>
                  <a>{newData.name}</a>
                </h4>
                <p className="text-justify">{newData.description}</p>
              </div>
              {currentUser && newData.author.id === currentUser.id && (
                <div className="d-flex justify-content-between p-4">
                  <a className="btn btn-warning" href={`/contrib/${newData.id}/edit`}>
                    Edita!
                  </a>
                  <form id="delete-form" action={`/contrib/${newData.id}?_method=DELETE`} method="POST">
                    <button className="btn btn-danger">Elimina</button>
                  </form>
                </div>
              )}
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div>
              <div className="card shadow-0 border" style={{ backgroundColor: '#f0f2f5' }}>
                <div className="card-body p-4">
                  <div className="form-outline mb-4">
                    <form>
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="escriu un comentari..."
                          name="comment[text]"
                          // value={}
                          // onChange={(e) => setCommentText(e.target.value)}
                        />
                      </div>
                      <div className="form-group justify-content-center">
                        <button type="submit" className="btn btn-outline-secondary">
                          Envia
                        </button>
                      </div>
                    </form>
                  </div>
                  {newData.comments.map((comment) => (
                    <div key={comment.id} className="card mb-4">
                      <div className="card-body">
                        <p>{comment.text}</p>
                        <div className="d-flex justify-content-between">
                          <div className="d-flex flex-row align-items-center">
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp"
                              alt="avatar"
                              width="25"
                              height="25"
                            />
                            <p className="small mb-0 ms-2">{comment.author.username}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a href="/">Endarrere</a>
    </div>
  );
};

export default ShowAction;
