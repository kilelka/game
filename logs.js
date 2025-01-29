import { HIT, ATTACK } from './constants.js';

const logs = {
    start: '[time] Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        '[time] Результат удара [playerWins]: [playerLose] - труп',
        '[time] [playerLose] погиб от удара бойца [playerWins]',
        '[time] Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[time] [playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага. [-player.hp] [hp/100]',
        '[time] [playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника. [-player.hp] [hp/100]',
        '[time] [playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента. [-player.hp] [hp/100]',
        '[time] [playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента. [-player.hp] [hp/100]',
    ],
    defence: [
        '[time] [playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу. [-player.hp] [hp/100]',
        '[time] [playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь. [-player.hp] [hp/100]',
        '[time] [playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке. [-player.hp] [hp/100]',
    ],
    draw: '[time] Ничья - это тоже победа!'
};

export function generateLogs(type, player1, player2, hit) {
    const currentTime = new Date().toLocaleTimeString(); 

    let logText = '';
    let playerDefence = player2;
    let playerKick = player1;

    function replaceTime(text) {
        return text.replace(/\[time\]/g, currentTime);
    }

    switch (type) {
        case 'start':
            logText = logs.start
                .replace('[player1]', player1.name)
                .replace('[player2]', player2.name);
            logText = replaceTime(logText); 
            break;
        
        case 'hit':
            const damage = HIT[hit]; 
            if (damage > 0) {
                logText = logs.hit[Math.floor(Math.random() * logs.hit.length)]
                    .replace('[playerDefence]', playerDefence.name)
                    .replace('[playerKick]', playerKick.name)
                    .replace('[-player.hp]', `-${damage}`)
                    .replace('[hp/100]', `${playerDefence.hp}/100`);
            } else {
                logText = logs.hit[Math.floor(Math.random() * logs.hit.length)]
                    .replace('[playerDefence]', playerDefence.name)
                    .replace('[playerKick]', playerKick.name)
                    .replace('[-player.hp]', '') 
                    .replace('[hp/100]', `${playerDefence.hp}/100`);
            }
            logText = replaceTime(logText);
            break;

        case 'defence':
            logText = logs.defence[Math.floor(Math.random() * logs.defence.length)]
                .replace('[playerKick]', playerKick.name)
                .replace('[playerDefence]', playerDefence.name)
                .replace('[-player.hp]', '') 
                .replace('[hp/100]', `${playerDefence.hp}/100`);
            logText = replaceTime(logText);
            break;
    

        case 'end':
            const winner = player1.hp > 0 ? player1.name : player2.name;
            const loser = player1.hp === 0 ? player1.name : player2.name;
            logText = logs.end[Math.floor(Math.random() * logs.end.length)]
                .replace('[playerWins]', winner)
                .replace('[playerLose]', loser);
            logText = replaceTime(logText);
            break;

        case 'draw':
            logText = logs.draw;
            logText = replaceTime(logText);
            break;
    }

    const chatEl = document.querySelector('.chat');
    const logEl = document.createElement('div');
    logEl.classList.add('log');
    logEl.innerText = logText;

    chatEl.prepend(logEl);
}