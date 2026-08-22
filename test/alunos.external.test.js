import request from 'supertest';
import { expect } from 'chai';
import { getToken } from './helpers/auth.js';

describe('Login', () => {
    let token;

    beforeEach(async () => {
        token = await getToken('admin@escola.com', 'admin123');
    });

    it('deve cadastrar um aluno quando ele informa dados válidos', async () => {
        //Cadastrar o aluno
        const cadastroAlunoResposta = await request('http://localhost:3000')
            .post('/api/admin/alunos')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                'nome': 'João Pereira da Silva',
                'email': 'joao.pereira@example.com',
                'matricula': '2024-002',
                'senha': 'senha123',


            });

        //Valida que ele foi cadastrado com sucesso
        expect(cadastroAlunoResposta.status).to.equal(201);
        expect(cadastroAlunoResposta.body.nome).to.equal('João Pereira da Silva');
        expect(cadastroAlunoResposta.body.email).to.equal('joao.pereira@example.com');
        expect(cadastroAlunoResposta.body.matricula).to.equal('2024-002');

    });

    it('deve negar o cadastro de um aluno quando ele já existe', async () => {             
        // Tenta cadastrar o mesmo aluno novamente
        const cadastroAlunoResposta = await request('http://localhost:3000')
            .post('/api/admin/alunos')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                'nome': 'Ana Souza',
                'email': 'ana.souza@example.com',
                'matricula': '2024001',
                'senha': '123456' 
            });
           


        // Valida que o cadastro foi negado 
        // Erro e msg estão no services / alunos.service.js
        expect(cadastroAlunoResposta.status).to.equal(409);
        expect(cadastroAlunoResposta.body.error).to.equal('Já existe um aluno cadastrado com essa matrícula ou e-mail.');

    });

});


