import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import ProtectedRoutes from './Shared/Components/ProtectedRoutes';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/home/*" element={<HomePage />}></Route>
        </Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
