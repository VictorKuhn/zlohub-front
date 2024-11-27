import React, { useState } from "react";
import toast from "react-hot-toast";
import InputMask from "react-input-mask";
import {
  RegisterContainer,
  Header,
  BackLink,
  Image,
  Form,
  Input,
  Button,
  RoleSelectionContainer,
  RoleOption,
  Label,
  PasswordContainer,
  PasswordToggleIcon,
  CheckboxContainer,
  ErrorMessage,
} from "./RegisterPage.styles";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [role, setRole] = useState("CUIDADOR");
  const [formData, setFormData] = useState({
    nome: "",
    cpfRes: "",
    idadeRes: "",
    rgRes: "",
    contato1Res: "",
    contato2Res: "",
    contato3Res: "",
    cepRes: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    email: "",
  });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptPolicies, setAcceptPolicies] = useState(false);

  const [errors, setErrors] = useState({
    nome: "",
    cpfRes: "",
    idadeRes: "",
    rgRes: "",
    contato1Res: "",
    contato2Res: "",
    contato3Res: "",
    cepRes: "",
    logradouro: "",
    bairro: "",
    cidade: "",
    estado: "",
    email: "",
    senha: {
      minLength: false,
      hasUppercase: false,
      hasNumber: false,
      hasSymbol: false,
      isValid: false,
    },
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.(com|com\.br)$/;
    return regex.test(email);
  };

  const validateCpf = (cpf) => {
    const cleanedCpf = cpf.replace(/\D/g, "");
    return cleanedCpf.length === 11;
  };

  const validatePhone = (phone) => {
    const cleanedPhone = phone.replace(/\D/g, "");
    return cleanedPhone.length === 10 || cleanedPhone.length === 11;
  };

  // Validação da senha
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[@#$%^&*!]/.test(password);

    return {
      minLength,
      hasUppercase,
      hasNumber,
      hasSymbol,
      isValid: minLength && hasUppercase && hasNumber && hasSymbol,
    };
  };

  // Aplica a máscara no CEP: XXXXX-XXX
  const applyCepMask = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{5})(\d{1,3})$/, "$1-$2")
      .slice(0, 9);
  };

  // Valida o CEP (8 dígitos, sem considerar o hífen)
  const validateCep = (value) => {
    const numericValue = value.replace(/\D/g, "");
    return numericValue.length === 8;
  };

  const fetchAddress = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
  
      if (data.erro) {
        setErrors((prev) => ({ ...prev, cepRes: "CEP não encontrado." }));
        return;
      }
  
      // Atualiza apenas os campos relacionados ao endereço
      setFormData((prev) => ({
        ...prev,
        logradouro: data.logradouro || "",
        bairro: data.bairro || "",
        cidade: data.localidade || "",
        estado: data.uf || "",
      }));
  
      // Remove qualquer erro do CEP
      setErrors((prev) => ({ ...prev, cepRes: "" }));
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
      setErrors((prev) => ({ ...prev, cepRes: "Erro ao buscar o CEP." }));
    }
  };
  

  // Verificação da confirmação da senha
  const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validações específicas
    if (name === "email") {
      setErrors({
        ...errors,
        email: !validateEmail(value) ? "E-mail inválido." : "",
      });
    }
    if (name === "cpf") {
      const formattedCpf = value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      setFormData({ ...formData, cpf: formattedCpf });
      setErrors({
        ...errors,
        cpf: !validateCpf(formattedCpf) ? "CPF inválido." : "",
      });
    }
    // Formatação do CEP
    if (name === "cepRes") {
      const formattedCep = applyCepMask(value); // Aplica a máscara
      setFormData((prev) => ({ ...prev, cepRes: formattedCep })); // Atualiza o estado

      // Só busca o endereço se o CEP for válido
      if (validateCep(formattedCep)) {
        fetchAddress(formattedCep.replace("-", "")); // Remove o hífen antes da consulta
      } else {
        setErrors((prev) => ({ ...prev, cepRes: "CEP inválido." }));
      }
      return;
    }
    if (name === "senha") {
      const passwordValidation = validatePassword(value);
      setPassword(value);
      setErrors({
        ...errors,
        senha: passwordValidation,
      });
    }
    if (name === "confirmPassword") {
      setConfirmPassword(value);
      setErrors({
        ...errors,
        confirmPassword: !validateConfirmPassword(password, value)
          ? "As senhas não coincidem."
          : "",
      });
    }
    if (name.startsWith("telefoneContato")) {
      const formattedPhone = value
        .replace(/\D/g, "") // Remove tudo que não for número
        .replace(
          /(\d{2})(\d{4,5})(\d{4})$/,
          value.length > 10 ? "($1) $2-$3" : "($1) $2-$3"
        );
      setFormData({ ...formData, [name]: formattedPhone });
      setErrors({
        ...errors,
        [name]: !validatePhone(formattedPhone) ? "Telefone inválido." : "",
      });
    }
    if (name.startsWith("telefoneReferencia")) {
      const formattedPhone = value
        .replace(/\D/g, "") // Remove tudo que não for número
        .replace(
          /(\d{2})(\d{4,5})(\d{4})$/,
          value.length > 10 ? "($1) $2-$3" : "($1) $2-$3"
        );
      setFormData({ ...formData, [name]: formattedPhone });
      setErrors({
        ...errors,
        [name]: !validatePhone(formattedPhone) ? "Telefone inválido." : "",
      });
    }
    if (name === "dataNascimento") {
      setErrors({
        ...errors,
        dataNascimento: value ? "" : "Data de nascimento inválida.",
      });
    }
  };

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };

  // Aplica a máscara no RG: X.XXX.XXX
  const applyRgMask = (value) => {
    return value
      .replace(/\D/g, "") // Remove todos os caracteres não numéricos
      .replace(/^(\d{1})(\d{3})(\d{3})$/, "$1.$2.$3") // Aplica a máscara
      .slice(0, 9); // Limita o tamanho a 9 caracteres com máscara
  };

  // Valida o RG (7 dígitos, sem considerar os pontos)
  const validateRg = (value) => {
    const numericValue = value.replace(/\D/g, ""); // Remove os pontos para validação
    return numericValue.length === 7; // Deve ter exatamente 7 dígitos
  };

  const handleSubmitResponsavel = async (e) => {
    e.preventDefault();

    // Validação final antes de enviar
    if (
      !formData.email ||
      !password ||
      password !== confirmPassword ||
      !formData.cpfRes ||
      !formData.nomeRes ||
      !formData.idadeRes ||
      !formData.contato1Res ||
      !formData.rgRes ||
      !formData.cepRes ||
      !formData.logradouro ||
      !formData.numero ||
      !formData.bairro ||
      !formData.cidade ||
      !formData.estado
    ) {
      toast.error("Preencha o formulário corretamente.");
      return;
    }

    // Dados para o endpoint do responsável
    const responsavelData = {
      cpfRes: formData.cpfRes,
      nomeRes: formData.nomeRes,
      idadeRes: parseInt(formData.idadeRes, 10),
      contato1Res: formData.contato1Res,
      contato2Res: formData.contato2Res || null,
      contato3Res: formData.contato3Res || null,
      planoAssinado: 1,
      emailRes: formData.email,
      rgRes: formData.rgRes,
      cepRes: formData.cepRes,
      logradouro: formData.logradouro,
      numero: parseInt(formData.numero, 10),
      complemento: formData.complemento || null,
      bairro: formData.bairro,
      cidade: formData.cidade,
      estado: formData.estado,
    };

    // Dados para o serviço de autenticação
    const authDataResponsavel = {
      email: formData.email,
      password,
      role: "RESPONSÁVEL", // Exclusivo para responsável
    };

    try {
      // Envio para o serviço de cadastro do responsável
      const responsavelResponse = await fetch(
        "http://zlo-main-app.us-east-1.elasticbeanstalk.com/api/responsible/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(responsavelData),
        }
      );

      console.log(responsavelData);
      const responsavelResult = await responsavelResponse.json();

      if (
        !responsavelResponse.ok ||
        responsavelResult.infoMessage !== "Sucesso"
      ) {
        throw new Error(
          responsavelResult.statusMessage || "Erro no cadastro do responsável."
        );
      }

      // Envio para o serviço de autenticação
      const authResponse = await fetch("http://zlo-login-microservice-env-2.eba-cm4nxyyj.us-east-1.elasticbeanstalk.com/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authDataResponsavel),
      });

      if (!authResponse.ok) {
        throw new Error("Erro no cadastro de autenticação.");
      }

      // Cadastro bem-sucedido
      navigate("/", {
        state: { successMessage: "Usuário cadastrado com sucesso!" },
      });
    } catch (error) {
      console.error("Erro durante o cadastro:", error);
      toast.error(
        error.message || "Erro ao realizar o cadastro. Tente novamente."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação final antes de enviar
    if (
      !formData.email ||
      !password ||
      password !== confirmPassword ||
      !acceptPolicies
    ) {
      toast.error("Preencha o formulário corretamente e tente novamente.");
      return;
    }

    // Dados para o endpoint do cuidador
    const cuidadorData = {
      nome: formData.nome,
      sobrenome: formData.sobrenome,
      cpf: formData.cpf,
      dataNascimento: formData.dataNascimento,
      logradouro: formData.logradouro,
      numero: formData.numero,
      bairro: formData.bairro,
      cidade: formData.cidade,
      estado: formData.estado,
      cep: formData.cep,
      complemento: formData.complemento,
      telefoneContato1: formData.telefoneContato1,
      telefoneContato2: formData.telefoneContato2 || null,
      emailContato: formData.email,
      tempoExperiencia: parseInt(formData.tempoExperiencia, 10),
      formacao: formData.formacao,
      habilidades: formData.habilidades,
      referencia1: formData.referencia1,
      telefoneReferencia1: formData.telefoneReferencia1 || null,
      referencia2: formData.referencia2 || null,
      telefoneReferencia2: formData.telefoneReferencia2 || null,
      referencia3: formData.referencia3 || null,
      telefoneReferencia3: formData.telefoneReferencia3 || null,
      politicaAceita: acceptPolicies,
    };

    // Dados para o endpoint de autenticação
    const authData = {
      email: formData.email,
      password,
      role: "CUIDADOR",
    };

    try {
      // Chamada ao endpoint do cuidador
      const cuidadorResponse = await fetch(
        "http://zlo-hub-app.us-east-1.elasticbeanstalk.com/api/cuidadores",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cuidadorData),
        }
      );

      if (!cuidadorResponse.ok) {
        throw new Error("Erro no cadastro do cuidador.");
      }

      // Chamada ao endpoint de autenticação (somente se o cadastro do cuidador for bem-sucedido)
      const authResponse = await fetch("http://zlo-login-microservice-env-2.eba-cm4nxyyj.us-east-1.elasticbeanstalk.com/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
      });

      if (!authResponse.ok) {
        throw new Error("Erro no cadastro de autenticação.");
      }

      // Cadastro bem-sucedido
      navigate("/", {
        state: { successMessage: "Usuário cadastrado com sucesso!" },
      });
    } catch (error) {
      console.error(error);
      toast.error(
        error.message || "Ocorreu um erro ao cadastrar. Tente novamente."
      );
    }
  };

  return (
    <RegisterContainer>
      <Header>
        <BackLink onClick={() => navigate("/")}>Voltar</BackLink>
      </Header>
      <Image src="https://i.imgur.com/fk4J5Fk.png" alt="Logo" />
      <RoleSelectionContainer>
        <RoleOption
          selected={role === "CUIDADOR"}
          onClick={() => handleRoleChange("CUIDADOR")}
        >
          Sou um Cuidador
        </RoleOption>
        <RoleOption
          selected={role === "RESPONSAVEL"}
          onClick={() => handleRoleChange("RESPONSAVEL")}
        >
          Sou um Responsável
        </RoleOption>
      </RoleSelectionContainer>
      {role === "CUIDADOR" && (
        <Form onSubmit={handleSubmit}>
          <Label>Nome:</Label>
          <Input
            type="text"
            name="nome"
            placeholder="Digite seu nome..."
            onChange={handleInputChange}
          />
          <Label>Sobrenome:</Label>
          <Input
            type="text"
            name="sobrenome"
            placeholder="Digite seu sobrenome..."
            onChange={handleInputChange}
          />
          <Label>E-mail:</Label>
          <Input
            type="email"
            name="email"
            placeholder="Digite seu e-mail..."
            onChange={handleInputChange}
            style={{
              borderColor: errors.email
                ? "red"
                : formData.email && !errors.email
                ? "green"
                : "",
            }}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          <Label>Senha:</Label>
          <PasswordContainer>
            <Input
              type={showPassword ? "text" : "password"}
              name="senha"
              placeholder="Digite sua senha..."
              value={password}
              onChange={handleInputChange}
              style={{
                borderColor: errors.senha?.isValid ? "green" : "red",
              }}
            />
            <PasswordToggleIcon onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </PasswordToggleIcon>
          </PasswordContainer>
          <div>
            <ErrorMessage
              style={{ color: errors.senha?.minLength ? "green" : "red" }}
            >
              Mínimo 8 caracteres
            </ErrorMessage>
            <ErrorMessage
              style={{ color: errors.senha?.hasUppercase ? "green" : "red" }}
            >
              Uma letra maiúscula
            </ErrorMessage>
            <ErrorMessage
              style={{ color: errors.senha?.hasNumber ? "green" : "red" }}
            >
              Um número
            </ErrorMessage>
            <ErrorMessage
              style={{ color: errors.senha?.hasSymbol ? "green" : "red" }}
            >
              Um símbolo
            </ErrorMessage>
          </div>
          <Label>Confirme sua Senha:</Label>
          <PasswordContainer>
            <Input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirme sua senha..."
              value={confirmPassword}
              onChange={handleInputChange}
              style={{
                borderColor: errors.confirmPassword
                  ? "red"
                  : confirmPassword && !errors.confirmPassword
                  ? "green"
                  : "",
              }}
            />
            <PasswordToggleIcon onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </PasswordToggleIcon>
          </PasswordContainer>
          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
          )}
          <Label>CPF:</Label>
          <Input
            type="text"
            name="cpf"
            placeholder="Digite seu CPF..."
            value={formData.cpf || ""}
            onChange={handleInputChange}
            style={{
              borderColor: errors.cpf
                ? "red"
                : formData.cpf && !errors.cpf
                ? "green"
                : "",
            }}
          />
          {errors.cpf && <ErrorMessage>{errors.cpf}</ErrorMessage>}
          <Label>Data de Nascimento:</Label>
          <Input
            type="date"
            name="dataNascimento"
            onChange={handleInputChange}
            value={formData.dataNascimento || ""}
          />
          <Label>CEP:</Label>
          <Input
            type="text"
            name="cepRes"
            placeholder="Digite seu CEP..."
            value={formData.cepRes || ""} // Exibe o valor formatado
            onChange={handleInputChange} // Chama o `handleInputChange` para mascarar e validar
            style={{
              borderColor: errors.cepRes
                ? "red"
                : formData.cepRes
                ? "green"
                : "",
            }}
          />
          {errors.cepRes && <ErrorMessage>{errors.cepRes}</ErrorMessage>}
          {errors.cep && <ErrorMessage>{errors.cep}</ErrorMessage>}
          <Label>Logradouro:</Label>
          <Input
            type="text"
            name="logradouro"
            placeholder="Preenchido automaticamente"
            value={formData.logradouro || ""}
            disabled
          />
          <Label>Número:</Label>
          <Input
            type="text"
            name="numero"
            placeholder="Digite o número..."
            onChange={handleInputChange}
          />
          <Label>Bairro:</Label>
          <Input
            type="text"
            name="bairro"
            placeholder="Preenchido automaticamente"
            value={formData.bairro || ""}
            disabled
          />
          <Label>Cidade:</Label>
          <Input
            type="text"
            name="cidade"
            placeholder="Preenchido automaticamente"
            value={formData.cidade || ""}
            disabled
          />
          <Label>Estado:</Label>
          <Input
            as="select"
            name="estado"
            value={formData.estado || ""}
            disabled
          >
            <option value="">Preenchido automaticamente</option>
            <option value="AC">AC</option>
            <option value="AL">AL</option>
            <option value="AP">AP</option>
            <option value="AM">AM</option>
            <option value="BA">BA</option>
            <option value="CE">CE</option>
            <option value="DF">DF</option>
            <option value="ES">ES</option>
            <option value="GO">GO</option>
            <option value="MA">MA</option>
            <option value="MT">MT</option>
            <option value="MS">MS</option>
            <option value="MG">MG</option>
            <option value="PA">PA</option>
            <option value="PB">PB</option>
            <option value="PR">PR</option>
            <option value="PE">PE</option>
            <option value="PI">PI</option>
            <option value="RJ">RJ</option>
            <option value="RN">RN</option>
            <option value="RS">RS</option>
            <option value="RO">RO</option>
            <option value="RR">RR</option>
            <option value="SC">SC</option>
            <option value="SP">SP</option>
            <option value="SE">SE</option>
            <option value="TO">TO</option>
          </Input>
          <Label>Complemento:</Label>
          <Input
            type="text"
            name="complemento"
            placeholder="Digite o complemento..."
            onChange={handleInputChange}
          />
          <Label>Telefone de Contato 1:</Label>
          <Input
            type="text"
            name="telefoneContato1"
            placeholder="Digite o telefone de contato..."
            value={formData.telefoneContato1 || ""}
            onChange={handleInputChange}
            style={{
              borderColor: errors.telefoneContato1
                ? "red"
                : formData.telefoneContato1 && !errors.telefoneContato1
                ? "green"
                : "",
            }}
          />
          {errors.telefoneContato1 && (
            <ErrorMessage>{errors.telefoneContato1}</ErrorMessage>
          )}

          <Label>Telefone de Contato 2:</Label>
          <Input
            type="text"
            name="telefoneContato2"
            placeholder="Digite o telefone de contato..."
            value={formData.telefoneContato2 || ""}
            onChange={handleInputChange}
            style={{
              borderColor: errors.telefoneContato2
                ? "red"
                : formData.telefoneContato2 && !errors.telefoneContato2
                ? "green"
                : "",
            }}
          />
          {errors.telefoneContato2 && (
            <ErrorMessage>{errors.telefoneContato2}</ErrorMessage>
          )}
          <Label>Tempo de Experiência:</Label>
          <Input
            type="number"
            name="tempoExperiencia"
            placeholder="Digite o tempo de experiência em anos..."
            onChange={handleInputChange}
          />
          <Label>Formação:</Label>
          <Input
            type="text"
            name="formacao"
            placeholder="Digite sua formação..."
            onChange={handleInputChange}
          />
          <Label>Habilidades:</Label>
          <Input
            type="text"
            name="habilidades"
            placeholder="Digite suas habilidades..."
            onChange={handleInputChange}
          />
          <Label>Nome da Referência 1:</Label>
          <Input
            type="text"
            name="referencia1"
            placeholder="Digite o nome da referência..."
            onChange={handleInputChange}
          />
          <Label>Telefone da Referência 1:</Label>
          <Input
            type="text"
            name="telefoneReferencia1"
            placeholder="Digite o telefone da referência..."
            value={formData.telefoneReferencia1 || ""}
            onChange={handleInputChange}
            style={{
              borderColor: errors.telefoneReferencia1
                ? "red"
                : formData.telefoneReferencia1 && !errors.telefoneReferencia1
                ? "green"
                : "",
            }}
          />
          {errors.telefoneReferencia1 && (
            <ErrorMessage>{errors.telefoneReferencia1}</ErrorMessage>
          )}
          <Label>Nome da Referência 2:</Label>
          <Input
            type="text"
            name="referencia2"
            placeholder="Digite o nome da referência..."
            onChange={handleInputChange}
          />
          <Label>Telefone da Referência 2:</Label>
          <Input
            type="text"
            name="telefoneReferencia2"
            placeholder="Digite o telefone da referência..."
            value={formData.telefoneReferencia2 || ""}
            onChange={handleInputChange}
            style={{
              borderColor: errors.telefoneReferencia2
                ? "red"
                : formData.telefoneReferencia2 && !errors.telefoneReferencia2
                ? "green"
                : "",
            }}
          />
          {errors.telefoneReferencia2 && (
            <ErrorMessage>{errors.telefoneReferencia2}</ErrorMessage>
          )}
          <Label>Nome da Referência 3:</Label>
          <Input
            type="text"
            name="referencia3"
            placeholder="Digite o nome da referência..."
            onChange={handleInputChange}
          />
          <Label>Telefone da Referência 3:</Label>
          <Input
            type="text"
            name="telefoneReferencia3"
            placeholder="Digite o telefone da referência..."
            value={formData.telefoneReferencia3 || ""}
            onChange={handleInputChange}
            style={{
              borderColor: errors.telefoneReferencia3
                ? "red"
                : formData.telefoneReferencia3 && !errors.telefoneReferencia3
                ? "green"
                : "",
            }}
          />
          {errors.telefoneReferencia3 && (
            <ErrorMessage>{errors.telefoneReferencia3}</ErrorMessage>
          )}
          <CheckboxContainer>
            <input
              type="checkbox"
              id="acceptPolicies"
              checked={acceptPolicies}
              onChange={(e) => setAcceptPolicies(e.target.checked)}
            />
            <label htmlFor="acceptPolicies">
              Aceito as políticas da plataforma
            </label>
          </CheckboxContainer>
          <Button type="submit">Cadastrar-se</Button>
        </Form>
      )}
      {role === "RESPONSAVEL" && (
        <Form onSubmit={handleSubmitResponsavel}>
          {/* Formulário para "Sou um Responsável" */}
          <Label>Nome:</Label>
          <Input
            type="text"
            name="nomeRes"
            placeholder="Digite seu nome completo..."
            onChange={handleInputChange}
            style={{
              borderColor: formData.nomeRes ? "green" : "",
            }}
          />

          <Label>CPF:</Label>
          <InputMask
            mask="999.999.999-99" // Máscara para o CPF
            value={formData.cpfRes}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ""); // Remove símbolos para manter apenas números
              setFormData((prevData) => ({
                ...prevData,
                cpfRes: value, // Atualiza o valor sem símbolos
              }));
              setErrors((prevErrors) => ({
                ...prevErrors,
                cpfRes: value.length === 11 ? "" : "CPF Inválido.", // Verifica se são 11 números
              }));
            }}
          >
            {(inputProps) => (
              <Input
                {...inputProps}
                placeholder="Digite seu CPF..."
                style={{
                  borderColor: errors.cpfRes
                    ? "red"
                    : formData.cpfRes?.length === 11
                    ? "green"
                    : "",
                }}
              />
            )}
          </InputMask>
          {/* Exibição da mensagem de erro */}
          {errors.cpfRes && <ErrorMessage>{errors.cpfRes}</ErrorMessage>}

          <Label>Idade:</Label>
          <Input
            type="number"
            name="idadeRes"
            placeholder="Digite sua idade..."
            onChange={handleInputChange}
            style={{
              borderColor: formData.idadeRes ? "green" : "",
            }}
          />

          <Label>Telefone de Contato 1:</Label>
          <InputMask
            mask={
              formData.contato1Res?.length === 11
                ? "(99) 99999-9999"
                : "(99) 9999-9999"
            }
            value={formData.contato1Res}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ""); // Remove os símbolos para armazenar apenas números
              setFormData((prevData) => ({
                ...prevData,
                contato1Res: value,
              }));
              setErrors((prevErrors) => ({
                ...prevErrors,
                contato1Res:
                  value.length === 10 || value.length === 11
                    ? ""
                    : "Telefone inválido.",
              }));
            }}
          >
            {(inputProps) => (
              <Input
                {...inputProps}
                placeholder="Digite seu telefone de contato..."
                style={{
                  borderColor: errors.contato1Res
                    ? "red"
                    : formData.contato1Res?.length >= 10
                    ? "green"
                    : "",
                }}
              />
            )}
          </InputMask>
          {errors.contato1Res && (
            <ErrorMessage>{errors.contato1Res}</ErrorMessage>
          )}

          <Label>Telefone de Contato 2 (Opcional):</Label>
          <InputMask
            mask={
              formData.contato2Res?.length === 11
                ? "(99) 99999-9999"
                : "(99) 9999-9999"
            }
            value={formData.contato2Res}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ""); // Remove os símbolos para armazenar apenas números
              setFormData((prevData) => ({
                ...prevData,
                contato2Res: value,
              }));
              setErrors((prevErrors) => ({
                ...prevErrors,
                contato2Res:
                  value.length === 0 ||
                  value.length === 10 ||
                  value.length === 11
                    ? ""
                    : "Telefone inválido.",
              }));
            }}
          >
            {(inputProps) => (
              <Input
                {...inputProps}
                placeholder="Digite seu segundo telefone de contato..."
                style={{
                  borderColor: errors.contato2Res
                    ? "red"
                    : formData.contato2Res?.length >= 10 ||
                      !formData.contato2Res
                    ? "green"
                    : "",
                }}
              />
            )}
          </InputMask>
          {errors.contato2Res && (
            <ErrorMessage>{errors.contato2Res}</ErrorMessage>
          )}

          <Label>Telefone de Contato 3 (Opcional):</Label>
          <InputMask
            mask={
              formData.contato3Res?.length === 11
                ? "(99) 99999-9999"
                : "(99) 9999-9999"
            }
            value={formData.contato3Res}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ""); // Remove os símbolos para armazenar apenas números
              setFormData((prevData) => ({
                ...prevData,
                contato3Res: value,
              }));
              setErrors((prevErrors) => ({
                ...prevErrors,
                contato3Res:
                  value.length === 0 ||
                  value.length === 10 ||
                  value.length === 11
                    ? ""
                    : "Telefone inválido.",
              }));
            }}
          >
            {(inputProps) => (
              <Input
                {...inputProps}
                placeholder="Digite seu terceiro telefone de contato..."
                style={{
                  borderColor: errors.contato3Res
                    ? "red"
                    : formData.contato3Res?.length >= 10 ||
                      !formData.contato3Res
                    ? "green"
                    : "",
                }}
              />
            )}
          </InputMask>
          {errors.contato3Res && (
            <ErrorMessage>{errors.contato3Res}</ErrorMessage>
          )}

          <Label>RG:</Label>
          <Input
            type="text"
            name="rgRes"
            placeholder="Digite seu RG..."
            value={formData.rgRes || ""}
            onChange={(e) => {
              const maskedValue = applyRgMask(e.target.value);
              setFormData((prev) => ({ ...prev, rgRes: maskedValue }));

              // Validação dinâmica
              if (validateRg(maskedValue)) {
                setErrors((prev) => ({ ...prev, rgRes: "" }));
              } else {
                setErrors((prev) => ({ ...prev, rgRes: "RG Inválido" }));
              }
            }}
            style={{
              borderColor: errors.rgRes ? "red" : formData.rgRes ? "green" : "",
            }}
          />
          {errors.rgRes && (
            <ErrorMessage
              style={{ color: "red", fontSize: "0.9rem", marginTop: "5px" }}
            >
              {errors.rgRes}
            </ErrorMessage>
          )}

          <Label>CEP:</Label>
          <Input
            type="text"
            name="cepRes"
            placeholder="Digite seu CEP..."
            value={formData.cepRes || ""}
            onChange={(e) => {
              const maskedValue = applyCepMask(e.target.value);
              setFormData((prev) => ({ ...prev, cepRes: maskedValue }));

              // Validação dinâmica
              if (validateCep(maskedValue)) {
                setErrors((prev) => ({ ...prev, cepRes: "" }));
                fetchAddress(maskedValue); // Busca o endereço na API
              } else {
                setErrors((prev) => ({ ...prev, cepRes: "CEP Inválido" }));
              }
            }}
            style={{
              borderColor: errors.cepRes
                ? "red"
                : formData.cepRes
                ? "green"
                : "",
            }}
          />
          {errors.cepRes && (
            <ErrorMessage
              style={{ color: "red", fontSize: "0.9rem", marginTop: "5px" }}
            >
              {errors.cepRes}
            </ErrorMessage>
          )}

          <Label>Logradouro:</Label>
          <Input
            type="text"
            name="logradouro"
            placeholder="Digite seu logradouro..."
            value={formData.logradouro || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, logradouro: e.target.value }))
            }
            style={{
              borderColor: formData.logradouro ? "green" : "",
            }}
          />

          <Label>Número:</Label>
          <Input
            type="number"
            name="numero"
            placeholder="Digite o número da sua residência..."
            onChange={handleInputChange}
            style={{
              borderColor: formData.numero ? "green" : "",
            }}
          />

          <Label>Complemento (Opcional):</Label>
          <Input
            type="text"
            name="complemento"
            placeholder="Digite um complemento..."
            onChange={handleInputChange}
          />

          <Label>Bairro:</Label>
          <Input
            type="text"
            name="bairro"
            placeholder="Digite seu bairro..."
            value={formData.bairro || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, bairro: e.target.value }))
            }
            style={{
              borderColor: formData.bairro ? "green" : "",
            }}
          />

          <Label>Cidade:</Label>
          <Input
            type="text"
            name="cidade"
            placeholder="Digite sua cidade..."
            value={formData.cidade || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, cidade: e.target.value }))
            }
            style={{
              borderColor: formData.cidade ? "green" : "",
            }}
          />

          <Label>Estado:</Label>
          <Input
            type="text"
            name="estado"
            placeholder="Digite seu estado..."
            value={formData.estado || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, estado: e.target.value }))
            }
            style={{
              borderColor: formData.estado ? "green" : "",
            }}
          />

          <Label>E-mail:</Label>
          <Input
            type="email"
            name="email"
            placeholder="Digite seu e-mail..."
            onChange={handleInputChange}
            style={{
              borderColor: errors.email
                ? "red"
                : formData.email && !errors.email
                ? "green"
                : "",
            }}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

          <Label>Senha:</Label>
          <PasswordContainer>
            <Input
              type={showPassword ? "text" : "password"}
              name="senha"
              placeholder="Digite sua senha..."
              value={password}
              onChange={handleInputChange}
              style={{
                borderColor: errors.senha?.isValid ? "green" : "red",
              }}
            />
            <PasswordToggleIcon onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </PasswordToggleIcon>
          </PasswordContainer>
          <div>
            <ErrorMessage
              style={{ color: errors.senha?.minLength ? "green" : "red" }}
            >
              Mínimo 8 caracteres
            </ErrorMessage>
            <ErrorMessage
              style={{ color: errors.senha?.hasUppercase ? "green" : "red" }}
            >
              Uma letra maiúscula
            </ErrorMessage>
            <ErrorMessage
              style={{ color: errors.senha?.hasNumber ? "green" : "red" }}
            >
              Um número
            </ErrorMessage>
            <ErrorMessage
              style={{ color: errors.senha?.hasSymbol ? "green" : "red" }}
            >
              Um símbolo
            </ErrorMessage>
          </div>

          <Label>Confirme sua Senha:</Label>
          <PasswordContainer>
            <Input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirme sua senha..."
              value={confirmPassword}
              onChange={handleInputChange}
              style={{
                borderColor: errors.confirmPassword
                  ? "red"
                  : confirmPassword && !errors.confirmPassword
                  ? "green"
                  : "",
              }}
            />
            <PasswordToggleIcon onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </PasswordToggleIcon>
          </PasswordContainer>
          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
          )}

          <Button type="submit">Cadastrar</Button>
        </Form>
      )}
    </RegisterContainer>
  );
};

export default RegisterPage;
