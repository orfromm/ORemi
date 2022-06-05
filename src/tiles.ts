type TileValue = number | "JOKER";

const JOKER = "JOKER";
const LOWEST_TILE_VALUE: TileValue = 1;
const HIGHEST_TILE_VALUE: TileValue = 13;

enum Color {
    BLUE = "Blue",
    RED = "Red",
    YELLOW = "Yellow",
    BLACK = "Black",
}

export interface Tile {
    value: TileValue;
    color: Color;
}

// initialize tiles
const tiles: Map<Tile, number> = new Map([
    [{value: JOKER, color: Color.BLACK}, 1],
    [{value: JOKER, color: Color.RED}, 1],
]);

for (let tileValue = LOWEST_TILE_VALUE; tileValue <= HIGHEST_TILE_VALUE; tileValue++) {
    tiles.set({value: tileValue, color: Color.BLUE}, 2);
    tiles.set({value: tileValue, color: Color.RED}, 2);
    tiles.set({value: tileValue, color: Color.YELLOW}, 2);
    tiles.set({value: tileValue, color: Color.BLACK}, 2);
}

export function pullTile(): Tile {
    const availableTiles: Tile[] = [];
    tiles.forEach(
        (amount, tile) => {
            if (!amount) return;
            for (let i = 0; i < amount; i++) {
                availableTiles.push(tile);
            }
        }
    );

    const pulledTile = availableTiles[Math.floor(Math.random() * availableTiles.length)];

    const tileAmount = tiles.get(pulledTile);
    if (tileAmount === undefined) throw `Pulled tile (${pulledTile.value}, ${pulledTile.color}) not found within tiles`;
    tiles.set(pulledTile, tileAmount - 1);

    return pulledTile;
}

const TILES_NUM_PER_PLAYER = 14;
//
export function getStartingTiles(): Tile[] {
    const tiles: Tile[] = [];
    for (let i = 0; i < TILES_NUM_PER_PLAYER; i++) {
        tiles.push(pullTile());
    }
    return tiles;
}
