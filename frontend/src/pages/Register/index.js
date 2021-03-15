import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api'

import './style.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e){ //função responsável por fazer o cadastro do usuário
        e.preventDefault(); //evita o recarregamento da página ao clicar em submit

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };

        console.log(data);

        try { 
            const response = await api.post('ongs', data); //enviar para api e dar resposta ao usuário

            alert(`Seu ID de acesso: ${response.data.id}`);

            history.push('/'); //após cadastro,tela volta para o home
        } catch (err) {
            alert('Erro no cadastro. Tente novamente!')
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02141"/>
                        Já tenho cadastro
                    </Link>

                </section>
                <form onSubmit={handleRegister}> {/*ativar a função handleRegister ao clicar em Submit */}
                    <input 
                        placeholder="Nome da ONG" 
                        value={name} 
                        onChange={e => setName(e.target.value)} /> {/* onChange = ouvir as mudanças que acontecerem nesse input
                                                                    pega o evento de mudança "e" e dar um setName('') > e.target.value = valor do input
                                                                    com essa linha, coloca-se esse valor dentro da variável 'name */}
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email} 
                        onChange={e => setEmail(e.target.value)} /> 
                    <input 
                        placeholder="WhatsApp"
                        value={whatsapp} 
                        onChange={e => setWhatsapp(e.target.value)} />
                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={city} 
                            onChange={e => setCity(e.target.value)} />
                        <input 
                            placeholder="UF" 
                            style={{ width: 80 }}
                            value={uf} 
                            onChange={e => setUf(e.target.value)} />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );    
}