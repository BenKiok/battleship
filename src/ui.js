const ui = (() => {
    const player1grid = document.createElement('div');
    const player2grid = document.createElement('div');

    for (let i = 0; i < 64; i++) {
        player1grid.appendChild(document.createElement('div'));
        player2grid.appendChild(document.createElement('div'));
    }

    return [ player1grid, player2grid ];
})();

export default ui;