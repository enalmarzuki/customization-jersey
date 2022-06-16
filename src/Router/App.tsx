import { Route, Routes } from 'react-router-dom';
import Customization from '../Pages/Customization';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Motive from '../Pages/Motive';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/motive" element={<Motive />} />
        <Route path="/customization" element={<Customization />} />
      </Routes>
    </>
  );
};

export default App;
