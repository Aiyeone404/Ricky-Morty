"use strict";
let valuepers = document.getElementById('search');
let pers = document.getElementById('personagem');
const resultado = document.getElementById('resultado');
pers.addEventListener('click', () => {
    let character = valuepers.value.trim();
    if (!character) {
        alert('DIGITE O NOME DE UM PERSONAGEM');
        return;
    }
    const ApiUrl = `https://rickandmortyapi.com/api/character/?name=${character}`;
    fetch(ApiUrl)
        .then(res => {
        if (!res.ok)
            throw new Error("Personagem não encontrado");
        return res.json();
    })
        .then(data => {
        resultado.innerHTML = '';
        const personagem = data.results[0];
        const card = document.createElement('div');
        const statusColor = personagem.status === 'Dead' ? 'color: red;' : 'color:blue';
        const statustext = personagem.status === 'Dead' ? '💀' : '';
        card.id = 'box-card';
        card.innerHTML = `
            <h1>${personagem.name}</h1>
            <img src="${personagem.image}" alt="img-personagem">
            <p style="${statusColor}">${personagem.status} ${statustext}</p>
            <p>${personagem.species}</p>
            <p>${personagem.location.name}</p>
            `;
        resultado.appendChild(card);
        valuepers.value = '';
        console.log(data);
    })
        .catch(err => {
        resultado.innerHTML = `<p style="color: red">${err.message}</p>`;
    });
});
valuepers.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        pers.click();
    }
});
