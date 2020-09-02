const ship = (length) => {
    let hits = 0,
        sunk = false;
    const hit = () => {
        if (hits < length) {
            hits++;
            if (hits === length) {
                sunk = true;
            }
        }
        
        return sunk;
    }
    
    return { length, hit };
}

export default ship;