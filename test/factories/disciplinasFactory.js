import { faker } from '@faker-js/faker';

export function git anovaDisciplina() {
    const timestamp = Date.now();

    return {
        nome: faker.person.jobTitle(),
        codigo: `PC${timestamp}`,
        cargaHoraria: 60
    };
}