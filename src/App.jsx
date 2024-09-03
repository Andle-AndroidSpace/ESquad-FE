// eslint-disable-next-line no-unused-vars
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from "./pages/home/Home";
import Join from "./pages/join/Join";
import Login from "./pages/login/Login";
import {AuthProvider, useAuth} from "./AuthContext.jsx";

const App = () => {
  return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/*" element={<PrivateRoute />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  );
};

const PrivateRoute = () => {
  const { user } = useAuth();
  return user ? <Home /> : <Navigate to="/login" />;
};

export default App;
