import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { 
    RecoverContainer, 
    BackButton, 
    Image, 
    Title, 
    Subtitle, 
    Form, 
    Input, 
    Button,
    ErrorMessage
} from './RecoverPasswordPage.styles';

const RecoverPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/'); // Redireciona para a página de login
    };

    // Função para validar o e-mail
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.(com|com\.br)$/;
        return regex.test(email);
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setIsValidEmail(validateEmail(value));
    };

    const handleRecover = async (e) => {
        e.preventDefault();

        if (!isValidEmail) {
            toast.error('Preencha o e-mail corretamente antes de prosseguir.');
            return;
        }

        try {
            // Faz a requisição para o endpoint de recuperação de senha
            const response = await axios.post('http://localhost:5000/auth/forgot-password', {
                email,
            });

            // Exibe um toaster de sucesso com a mensagem do backend
            toast.success(response.data);

            // Redireciona para a página inicial (login)
            navigate('/');
        } catch (error) {
            console.error('Erro ao enviar e-mail de recuperação:', error);

            // Exibe um toaster de erro com a mensagem do backend
            if (error.response && error.response.data) {
                toast.error(error.response.data);
            } else {
                toast.error('Erro ao enviar e-mail. Tente novamente mais tarde.');
            }
        }
    };

    return (
        <RecoverContainer>
            <Toaster position="top-center" reverseOrder={false} />
            <BackButton onClick={handleBackClick}>Voltar</BackButton>
            <Image src="https://i.imgur.com/fk4J5Fk.png" alt="Logo" />
            <Title>Recuperar acesso</Title>
            <Subtitle>Insira seu e-mail e recupere acesso a sua conta.</Subtitle>
            <Form onSubmit={handleRecover}>
                <Input
                    type="email"
                    placeholder="E-mail..."
                    value={email}
                    onChange={handleEmailChange}
                    style={{
                        borderColor: isValidEmail 
                            ? (email ? 'green' : '')
                            : 'red',
                    }}
                />
                {!isValidEmail && <ErrorMessage>E-mail inválido.</ErrorMessage>}
                <Button type="submit">Recuperar</Button>
            </Form>
        </RecoverContainer>
    );
};

export default RecoverPasswordPage;