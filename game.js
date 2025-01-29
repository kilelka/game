import Player from './player.js';
import { generateLogs } from './logs.js';
import { HIT, ATTACK } from './constants.js';

export default class Game {
    constructor(players) {
        this.arenaEl = document.querySelector('.arenas');
        this.formEl = document.querySelector('.control');
        this.buttonEl = document.querySelector('.control .button');

        this.players = players;
        this.player1 = new Player(players[0]);
        this.player2 = new Player(players[1]);
    }

    init() {
        this.arenaEl.appendChild(this.player1.createPlayer());
        this.arenaEl.appendChild(this.player2.createPlayer());

        generateLogs('start', this.player1, this.player2);

        this.formEl.addEventListener('submit', (event) => this.handleFormSubmit(event));
    }

    handleFormSubmit(event) {
        event.preventDefault();

        const attackData = this.getAttackData();
        if (attackData.hit && attackData.defence) {
            const enemy = this.enemyAttack();

            this.checkHit(attackData.hit, enemy.defence, this.player1, this.player2);
            this.checkHit(enemy.hit, attackData.defence, this.player2, this.player1);

            this.player1.renderHP();
            this.player2.renderHP();

            

            this.checkWinner();
        }
    }

    getAttackData() {
        const attackData = {
            hit: '',
            defence: ''
        };

        const hitRadios = document.querySelectorAll('input[name="hit"]');
        hitRadios.forEach(radio => {
            if (radio.checked) attackData.hit = radio.value;
        });

        const defenceRadios = document.querySelectorAll('input[name="defence"]');
        defenceRadios.forEach(radio => {
            if (radio.checked) attackData.defence = radio.value;
        });

        return attackData;
    }

    enemyAttack() {
        const hit = ATTACK[Math.floor(Math.random() * ATTACK.length)];
        const defence = ATTACK[Math.floor(Math.random() * ATTACK.length)];
        return { hit, defence };
    }

    checkHit(hit, defence, player, enemy) {
        if (hit !== defence) {
            const damage = HIT[hit];
            enemy.changeHP(damage);
            player.renderHP();
            enemy.renderHP();
            generateLogs('hit', player, enemy, hit);
        } else {
            generateLogs('defence', player, enemy);
        }
    }

    checkWinner() {
        if (this.player1.hp === 0 || this.player2.hp === 0) {
            this.buttonEl.disabled = true;
            this.createReloadButton();

            if (this.player1.hp === 0 && this.player2.hp > 0) {
                this.showWinner(this.player2.name);
                generateLogs('end', this.player2, this.player1);
            } else if (this.player2.hp === 0 && this.player1.hp > 0) {
                this.showWinner(this.player1.name);
                generateLogs('end', this.player1, this.player2);
            } else {
                this.showWinner('draw');
                generateLogs('draw', this.player1, this.player2);
            }
        }
    }

    showWinner(name) {
        const winnerEl = document.createElement('div');
        winnerEl.classList.add('showResult');
        winnerEl.innerText = `${name} wins!`;
        this.arenaEl.appendChild(winnerEl);
    }

    createReloadButton() {
        const reloadWrap = document.createElement('div');
        reloadWrap.classList.add('reloadWrap');

        const reloadButton = document.createElement('button');
        reloadButton.classList.add('button');
        reloadButton.innerText = 'Restart';

        reloadButton.addEventListener('click', () => {
            window.location.href = 'select.html';
        });

        reloadWrap.appendChild(reloadButton);
        this.arenaEl.appendChild(reloadWrap);
    }
}
