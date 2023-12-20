import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from './api';

const NewAction = () => {
  const [newData, setData] = useState(null);
  const [selectedType, setSelectedType] = useState('');
  const [quantitat, setQuantitat] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [lloc, setLloc] = useState('');
  const [image, setImage] = useState(null);

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setSelectedType(type);
  };

  api.apiG('/contrib/new', setData);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSelectedType('');
    setQuantitat('');
    setName('');
    setDescription('');
    setDateInput('');
    setTimeInput('');
    setLloc('');
    setImage(null);
  };

  if (!Array.isArray(newData)) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container mt-4">
      <div className="row">
        <h1 style={{ textAlign: 'center' }}>Crea</h1>
        <div style={{ width: '50%', margin: 'auto auto', textAlign: 'center' }}>
          <form
            className="p-2 bg-light border rounded"
            action="/contrib/new"
            method="POST"
            encType="multipart/form-data"
            onSubmit={handleSubmit}>
            {/* Your form inputs go here */}
            <div className="row g-2">
              <div className="col-md">
                <div className="form-floating mb-3">
                  <select
                    className="form-control custom-select-lg"
                    id="tipus"
                    name="tipus"
                    value={selectedType}
                    onChange={handleTypeChange}>
                    <option value="" selected></option>
                    {newData &&
                      newData.map((option) => (
                        <option key={option.name} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                  </select>
                  <label htmlFor="tipus" className="form-label">
                    Tipus d'acció
                  </label>
                </div>
              </div>
              {/* Additional form fields go here */}
            </div>
          </form>
          <div className="form-floating mb-3">
            <button type="submit" className="btn btn-success">
              Envia
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAction;
