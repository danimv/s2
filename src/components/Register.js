import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import api from './api';

const Register = () => {  
  const navigate = useNavigate();
  const [statusRegister, setStatusRegister] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const postRequest = async () => {
    try {
      // console.log(formData);
      api.apiP
        .post('/register', {
          postData: formData,
        })
        .then((response) => {
          const data = response.data;
          if (data.status === 200) {
            // console.log(response.data);
            setStatusRegister(data.msg);          
            setTimeout(() => {
              navigate('/');
            }, 1500);
          } else {
            setStatusRegister(data.msg);
            console.error('Invalid response format:', data);
          }
        });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <h3>Uneix-te!</h3>
        <form>
          <input
            type="text"
            name="username"
            placeholder="Nom usuari"
            value={formData.username}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Correu electrònic"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Contrasenya"
            value={formData.password}
            onChange={handleInputChange}
          />
        </form>
        <button onClick={() => postRequest()}>Registrar</button>
        <div>{statusRegister}</div>
      </div>
    </div>
  );
};

export default Register;
