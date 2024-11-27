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
    ErrorMessage,
    LoadingSpinner,
} from './RecoverPasswordPage.styles';

const RecoverPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isLoading, setIsLoading] = useState(false); // Estado para o loading
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

        setIsLoading(true); // Ativa o loading

        try {
            // Faz a requisição para o endpoint de recuperação de senha
            const response = await axios.post('http://zlo-login-microservice-env-2.eba-cm4nxyyj.us-east-1.elasticbeanstalk.com/auth/forgot-password', {
                email,
            });

            toast.success(response.data); // Exibe mensagem de sucesso
            navigate('/'); // Redireciona para a página inicial (login)
        } catch (error) {
            console.error('Erro ao enviar e-mail de recuperação:', error);

            // Exibe mensagem de erro retornada pelo backend
            if (error.response && error.response.data) {
                toast.error(error.response.data);
            } else {
                toast.error('Erro ao enviar e-mail. Tente novamente mais tarde.');
            }
        } finally {
            setIsLoading(false); // Desativa o loading
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
                            ? email
                                ? 'green'
                                : ''
                            : 'red',
                    }}
                    disabled={isLoading} // Desabilita o input durante o loading
                />
                {!isValidEmail && <ErrorMessage>E-mail inválido.</ErrorMessage>}
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Carregando...' : 'Recuperar'}
                </Button>
                {isLoading && <LoadingSpinner />} {/* Exibe o spinner durante o loading */}
            </Form>
        </RecoverContainer>
    );
};

export default RecoverPasswordPage;