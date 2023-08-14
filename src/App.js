import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import HomePage from './routes/home/HomePage';
import LoginPage from './routes/login/LoginPage';

function App() {
  return (
    <Router>
      <div className="App">

        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
