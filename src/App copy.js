// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import './App.css';
import ShowAction from './components/ShowAction';
import Register from './components/Register';
import Login from './components/Login';
import NewAction from './components/NewAction';
const currentUser = window.currentUser || null;

function App() {
  return (
    <Router>
      <div className="App">
        <Header currentUser={currentUser}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/showAction" element={<ShowAction />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/newAction" element={<NewAction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
