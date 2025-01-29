export default class Player {
    constructor({ id, name, hp, img }) {
        this.id = id;
        this.name = name;
        this.hp = hp;
        this.img = img;
    }

    attack = () => {
        console.log(`${this.name} Fight...`);
    };

    changeHP = (damage) => {
        this.hp -= damage;
        if (this.hp < 0) {
            this.hp = 0;
        }
    };

    elHP = () => document.querySelector(`.player${this.id} .life`);

    renderHP = () => {
        const lifeEl = this.elHP();
        lifeEl.style.width = `${this.hp}%`;
    };

    createPlayer = () => {
        const rootEl = document.createElement('div');
        rootEl.classList.add(`player${this.id}`);

        const progressbarEl = document.createElement('div');
        progressbarEl.classList.add('progressbar');

        const lifeEl = document.createElement('div');
        lifeEl.classList.add('life');
        lifeEl.style.width = `${this.hp}%`;

        const nameEl = document.createElement('div');
        nameEl.classList.add('name');
        nameEl.innerText = this.name;

        progressbarEl.appendChild(lifeEl);
        progressbarEl.appendChild(nameEl);

        const characterEl = document.createElement('div');
        characterEl.classList.add('character');

        const imgEl = document.createElement('img');
        imgEl.src = this.img;
        characterEl.appendChild(imgEl);

        rootEl.appendChild(progressbarEl);
        rootEl.appendChild(characterEl);

        return rootEl;
    };
}
