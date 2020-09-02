import ship from './ship.js';
import gameboard from './gameboard.js';
import ui from './ui.js';

const app = (() => {
    const game = document.querySelector('#game'),
          h2 = document.querySelector('h2');
    // *** not needed for cpu play ***
    // let playerClickFuncs = [], 
    let cpuClickFuncs = [],
        cpuPlays = [],
        isPlayerTurn = true;

    h2.innerHTML = 'Player 1 goes first!';

    ui.forEach((node) => {
       game.appendChild(node);
    });

    const player = gameboard();
    player.name = 'Player 1';
    const cpu = gameboard();
    cpu.name = 'CPU';

    player.setShip(ship(1), [[0,6]]);
    player.setShip(ship(2), [[1,1],[1,2]]);
    player.setShip(ship(3), [[3,4],[3,5],[3,6]]);
    player.setShip(ship(4), [[4,2],[5,2],[6,2],[7,2]]);

    cpu.setShip(ship(1), [[1,1]]);
    cpu.setShip(ship(2), [[6,5],[6,6]]);
    cpu.setShip(ship(3), [[4,1],[5,1],[6,1]]);
    cpu.setShip(ship(4), [[3,4],[3,5],[3,6],[3,7]]);

    player.ships.forEach((ship) => {
        ship.coordinates.forEach((coord) => {
            let index = player.coordinate.toIndex(coord);

            game.childNodes[0].childNodes[index].classList.add('placed');
        }); 
    });

    // *** can be later used for pvp/cpu selection ***
    //
    // game.childNodes[0].childNodes.forEach((node) => {
    //     let playerClick = () => {
    //         if (!isPlayerTurn) {
    //             h2.innerHTML = 'It\'s the player\'s turn!';
    //             clickToHit(node, player, 0);
    //             isPlayerTurn = !isPlayerTurn;
    //             node.removeEventListener('click', playerClick);
    //         }
    //     }
    //     playerClickFuncs.push(playerClick);
    //     node.addEventListener('click', playerClick);
    // });

    game.childNodes[1].childNodes.forEach((node) => {
        let cpuClick = () => {
            if (isPlayerTurn) {
                if (!clickToHit(node, cpu, 1)) {
                    isPlayerTurn = !isPlayerTurn;
                    node.removeEventListener('click', cpuClick);

                    h2.innerHTML = 'CPU is playing...';
                    cpuLogic();
                }
            }
        }
        cpuClickFuncs.push(cpuClick);
        node.addEventListener('click', cpuClick);
    });
    
    function clickToHit(el, obj, val) {
        let index, coord, shipWasHit;

        if (!el.classList.contains('hit') && !el.classList.contains('missed')) {
            index = Array.from(game.childNodes[val].childNodes).indexOf(el);
            coord = obj.coordinate.fromIndex(index);
            shipWasHit = obj.receiveAttack(coord);
    
            if (shipWasHit) {
                el.classList.add('hit');
                
                if (obj.checkAllShipsSunk()) {
                    endOfGame();
                    return true;
                }
            } else {
                el.classList.add('missed');
            }
        }
    }

    function endOfGame() {
        const playerBoard = Array.from(game.childNodes[0].childNodes),
              cpuBoard = Array.from(game.childNodes[1].childNodes);
        let obj = (isPlayerTurn === true) ? player : cpu;
        h2.innerHTML = `${obj.name} won!`;

        // *** not needed for cpu play ***
        // playerBoard.forEach((node) => {
        //     node.removeEventListener('click', playerClickFuncs[playerBoard.indexOf(node)]);
        // });
        cpuBoard.forEach((node) => {
            node.removeEventListener('click', cpuClickFuncs[cpuBoard.indexOf(node)]);
        });
    }

    function cpuLogic() {
        let index = Math.floor(Math.random() * 64),
            node = game.childNodes[0].childNodes[index];

        cpuPlays.forEach((play) => {
            if (index === play) {
                index = Math.floor(Math.random() * 64);
            }
        });
        cpuPlays.push(index);

        setTimeout(() => {
            h2.innerHTML = 'It\'s the player\'s turn!';
            isPlayerTurn = !isPlayerTurn;
            clickToHit(node, player, 0);
        }, 1000);
    }
})();