import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import CuidadorPage from './pages/Cuidador/CuidadorPage';
import ResponsavelPage from './pages/Responsavel/ResponsavelPage';
import AdminPage from './pages/Admin/AdminPage';
import GlobalStyles from './styles/GlobalStyles';
import RegisterPage from './pages/Register/RegisterPage';
import RecoverPasswordPage from './pages/RecoverPassword/RecoverPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';

function App() {
    return (
        <>
            <GlobalStyles />
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/cuidador" element={<CuidadorPage />} />
                <Route path="/responsavel" element={<ResponsavelPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/recoverPassword" element={<RecoverPasswordPage />} />
                <Route path="/reset-password/reset-password" element={<ResetPasswordPage />} />
            </Routes>
        </>
    );
}

export default App;