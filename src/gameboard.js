const gameboard = () => {
    const ships = [],
          opponent = {
              hits: [],
              misses: []
          };

    const checkAllShipsSunk = () => {
        let allShipsAreSunk = true; 

        ships.forEach((ship) => {
            if (!ship.sunk) {
                allShipsAreSunk = false;
            }
        });

        return allShipsAreSunk;
    }

    const setShip = (obj, arr) => {
        if (obj.length && obj.hit && arr.length > 0) {
            ships.push({'is': obj, 'coordinates': arr, 'sunk': false});
        }

        return ships;
    }

    const receiveAttack = (arr) => {
        let hitAShip, shipIsSunk;

        ships.forEach((ship) => {
            ship.coordinates.forEach((coordinate) => {
                if (`${coordinate}` === `${arr}`) {
                    shipIsSunk = ship.is.hit();
                    opponent.hits.push(arr);
                    hitAShip = true;
                }
            });

            if (shipIsSunk) {
                ship.sunk = true;
                shipIsSunk = !shipIsSunk;
            }
        });

        if (!hitAShip) {
            opponent.misses.push(arr);
        }

        return hitAShip;
    }

    const coordinate = (() => {
        const fromIndex = (index) => {
            let x, y;

            y = index % 8;
            x = Math.floor(index / 8);

            return [x,y];
        }

        const toIndex = (coord) => {
            let x = coord[0], y = coord[1];

            return (x * 8 + y);
        }

        return { fromIndex, toIndex };
    })();

    return { ships, opponent, setShip, receiveAttack, coordinate, checkAllShipsSunk };
};

export default gameboard;