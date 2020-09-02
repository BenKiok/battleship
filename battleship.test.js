import ship from './src/ship.js';
import gameboard from './src/gameboard.js';

describe('the ship factory function', () => {
    it('returns an object', () => {
        expect(typeof ship(2)).toBe('object');
    });
    
    it('has a length', () => {
        expect(ship(3).length).toBe(3);
    });
    
    it('has a hit() method', () => {
        expect(typeof ship(2).hit).toBe('function');
    });
    
    it('sinks a ship with enough hits', () => {
        const ship1 = ship(3),
            ship2 = ship(4);
        let sunk1, sunk2;

        for (let i = 0; i < 3; i++) {
            sunk1 = ship1.hit();
            sunk2 = ship2.hit();
        }

        expect(sunk1).toBe(true);
        expect(sunk2).toBe(false);
    });
});

describe('the gameboard factory function', () => {
    it('records a ship and its location', () => {
        const aGameboard = gameboard();
    
        aGameboard.setShip(
            { length: 3, hit: () => {} },
            [[1,2], [1,3], [1,4]]
        )
        aGameboard.setShip(
            { length: 2, hit: () => {} },
            [[4,1], [5,1]]
        )
        
        expect(`${aGameboard.ships}`).toEqual(
            `${[
                {
                    'is': { 'length': 3, 'hit': () => {} },
                    'coordinates': [ [1,2], [1,3], [1,4] ],
                    'sunk': false
                },
                {
                    'is': { 'length': 2, 'hit': () => {} }, 
                    'coordinates': [ [4,1], [5,1] ],
                    'sunk': false
                }
            ]}`
        );
    });

    it('records opponent attacks', () => {
        const testShip = ship(3),
              board = gameboard(),
              oppAttempts = [[1,6], [2,4], [3,2], [2,3], [5,0]];
        board.setShip(testShip, [[2,3], [2,4], [2,5]]);

        oppAttempts.forEach((arr) => {
            board.receiveAttack(arr);
        });
        
        expect(`${board.opponent.hits}`).toEqual(
            `${[
                [2,4], [2,3]
            ]}`
        );
        expect(`${board.opponent.misses}`).toEqual(
            `${[
                [1,6], [3,2], [5,0]
            ]}`
        );
    });

    it('declares when all ships are sunk', () => {
        const ship1 = ship(1),
              ship2 = ship(1),
              board = gameboard();

        board.setShip(ship1, [[1,1]]);
        board.setShip(ship2, [[2,2]]);

        board.receiveAttack([2,2]);

        expect(board.checkAllShipsSunk()).toBe(false);

        board.receiveAttack([1,1]);

        expect(board.checkAllShipsSunk()).toBe(true);
    });

    it('converts a div index to a coordinate array', () => {
        const board = gameboard();

        expect(board.coordinate.fromIndex(21)).toMatchObject([2,5]);
        expect(board.coordinate.fromIndex(59)).toMatchObject([7,3]);
        expect(board.coordinate.fromIndex(0)).toMatchObject([0,0]);
    });

    it('converts a coordinate array to a div index', () => {
        const board = gameboard();

        expect(board.coordinate.toIndex([2,5])).toBe(21);
        expect(board.coordinate.toIndex([7,3])).toBe(59);
        expect(board.coordinate.toIndex([0,0])).toBe(0);
    });
});