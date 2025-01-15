import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import EmpDashboard from './pages/EmpDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';
import Error404 from './pages/Error404';



function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='*' element={<Error404 />} />

          <Route path='/admindashboard' element={<AdminDashboard />} />


          <Route path='/empdashboard' element={<EmpDashboard />} />

        </Routes>
        {/* </Route> */}

      </Router >
    </>
  );
}

export default App;
