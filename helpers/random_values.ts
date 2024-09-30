import {faker} from '@faker-js/faker'

export function getStringWithSpaceIncide() {
    const part1 = faker.string.alpha({length: 8});
    const part2 = faker.string.alpha({length: 7});

    return `${part1} ${part2}`
}

export function getStringWithSpaceInEnd() {
    const part1 = faker.string.alpha({length: 8});
    const part2 = faker.string.alpha({length: 7});

    return `${part1}${part2} `
}

