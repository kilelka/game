const $parent = document.querySelector('.parent');
const $player = document.querySelector('.player');

const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        if (Array.isArray(className)) {
            className.forEach(item => {
                $tag.classList.add(item);
            })
        } else {
            $tag.classList.add(className);
        }

    }

    return $tag;
}

function createEmptyPlayerBlock() {
    const el = createElement('div', ['character', 'div11', 'disabled']);
    const img = createElement('img');
    img.src = "assets/players/avatar/11.png";
    el.appendChild(img);
    $parent.appendChild(el);
}

async function init() {
    localStorage.removeItem('player1');

    const players = [
        { id: 1, name: 'Cyrax', hp: 100, avatar: 'assets/players/avatar/19.png', img: 'assets/players/fightingStance/cyrax.gif' },
        { id: 2, name: 'Ermac', hp: 100, avatar: 'assets/players/avatar/17.png', img: 'assets/players/fightingStance/ermac.gif' },
        { id: 3, name: 'Jade', hp: 100, avatar: 'assets/players/avatar/6.png', img: 'assets/players/fightingStance/jade.gif' },
        { id: 4, name: 'Jax', hp: 100, avatar: 'assets/players/avatar/4.png', img: 'assets/players/fightingStance/jax.gif' },
        { id: 5, name: 'Kabal', hp: 100, avatar: 'assets/players/avatar/20.png', img: 'assets/players/fightingStance/kabal.gif' },
        { id: 6, name: 'Kano', hp: 100, avatar: 'assets/players/avatar/9.png', img: 'assets/players/fightingStance/kano.gif' },
        { id: 7, name: 'Kitana', hp: 100, avatar: 'assets/players/avatar/16.png', img: 'assets/players/fightingStance/kitana.gif' },
        { id: 8, name: 'Kung Lao', hp: 100, avatar: 'assets/players/avatar/14.png', img: 'assets/players/fightingStance/kunglao.gif' },
        { id: 9, name: 'Liu Kang', hp: 100, avatar: 'assets/players/avatar/23.png', img: 'assets/players/fightingStance/liukang.gif' },
        { id: 10, name: 'Mileena', hp: 100, avatar: 'assets/players/avatar/10.png', img: 'assets/players/fightingStance/mileena.gif' },
        { id: 11, name: 'Sub Zero', hp: 100, avatar: 'assets/players/avatar/13.png', img: 'assets/players/fightingStance/subzero.gif' },
        { id: 12, name: 'Nightwolf', hp: 100, avatar: 'assets/players/avatar/5.png', img: 'assets/players/fightingStance/nightwolf.gif' },
        { id: 13, name: 'Noob Saibot', hp: 100, avatar: 'assets/players/avatar/7.png', img: 'assets/players/fightingStance/noobsaibot.gif' },
        { id: 14, name: 'Rain', hp: 100, avatar: 'assets/players/avatar/1.png', img: 'assets/players/fightingStance/rain.gif' },
        { id: 15, name: 'Reptile', hp: 100, avatar: 'assets/players/avatar/2.png', img: 'assets/players/fightingStance/reptile.gif' },
        { id: 16, name: 'Scorpion', hp: 100, avatar: 'assets/players/avatar/18.png', img: 'assets/players/fightingStance/scorpion.gif' },
        { id: 17, name: 'Sektor', hp: 100, avatar: 'assets/players/avatar/15.png', img: 'assets/players/fightingStance/sektor.gif' },
        { id: 18, name: 'Shang Tsung', hp: 100, avatar: 'assets/players/avatar/24.png', img: 'assets/players/fightingStance/shangtsung.gif' },
        { id: 19, name: 'Shaokahn', hp: 100, avatar: 'assets/players/avatar/12.png', img: 'assets/players/fightingStance/shaokahn.gif' },
        { id: 20, name: 'Sheeva', hp: 100, avatar: 'assets/players/avatar/11.png', img: 'assets/players/fightingStance/sheeva.gif' },
        { id: 21, name: 'Sindel', hp: 100, avatar: 'assets/players/avatar/21.png', img: 'assets/players/fightingStance/sindel.gif' },
        { id: 22, name: 'Smoke', hp: 100, avatar: 'assets/players/avatar/22.png', img: 'assets/players/fightingStance/smoke.gif' },
        { id: 23, name: 'Sonya', hp: 100, avatar: 'assets/players/avatar/8.png', img: 'assets/players/fightingStance/sonya.gif' },
        { id: 24, name: 'Stryker', hp: 100, avatar: 'assets/players/avatar/3.png', img: 'assets/players/fightingStance/stryker.gif' }
    ];

    let imgSrc = null;
    createEmptyPlayerBlock();


    players.forEach(item => {
        const el = createElement('div', ['character', `div${item.id}`]);
        const img = createElement('img');

        el.addEventListener('mousemove', () => {
            if (imgSrc === null) {
                imgSrc = item.img;
                const $img = createElement('img');
                $img.src = imgSrc;
                $player.appendChild($img);
            }
        });

        el.addEventListener('mouseout', () => {
            if (imgSrc) {
                imgSrc = null;
                $player.innerHTML = '';
            }
        });

        el.addEventListener('click', () => {
            //TODO: Мы кладем нашего игрока в localStorage что бы потом на арене его достать.
            // При помощи localStorage.getItem('player1'); т.к. в localStorage кладется строка,
            // то мы должны ее распарсить обратным методом JSON.parse(localStorage.getItem('player1'));
            // но это уже будет в нашем классе Game когда мы инициализируем игроков.
            localStorage.setItem('player1', JSON.stringify(item));

            el.classList.add('active');

            setTimeout(() => {
                window.location.pathname = "index.html";
            }, 1000);
        });

        img.src = item.avatar;
        img.alt = item.name;

        el.appendChild(img);
        $parent.appendChild(el);
    });
}

init();
