import request from 'supertest';
import 'dotenv/config';

//Isolar a declaração da API para que seja possível alterar a URL base de acordo com o ambiente de teste (local, homologação, produção, etc.).

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

export function api() {
    return request(BASE_URL);
}
