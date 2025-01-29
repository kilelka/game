import Game from './game.js';

const player1Data = JSON.parse(localStorage.getItem('player1'));

if (player1Data.id !== 1) {
    player1Data.id = 1; 
}

const player2Data = {
    id: 2,
    name: 'SHEEVA',
    hp: 100,
    img: '/assets/players/fightingStance/sheeva.gif',
};

const game = new Game([player1Data, player2Data]);

game.init();



