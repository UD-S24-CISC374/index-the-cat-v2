import { Subscript } from "./playableLevel";

/**
 * The different types of levels, whether it asks the player to pick an Index,
 * a Slice, or potentially either (subscript). Also has the special "Win" type
 * of level, holding the end.
 * TODO: Have a proper separate ending Scene instead of a hacky Win level.
 */
export enum LevelType {
    Index,
    Slice,
    Subscript,
    Win,
}

/**
 * Our levels use simple anonymous functions to generate their values, length, and indices.
 * These type definitions formalize those functions more concretely.
 */
export type DisplayValue = string | string[];
export type ValueGenerator = (
    n: number,
    data?: Record<string, string[]>
) => string;
// A function that consumes nothing but returns a number when executed (e.g., at random).
export type LengthGenerator = () => number;
// A function that consumes a number and returns a list of numbers (some of which may be null)
export type IndexGenerator = (n: number) => Subscript;

/**
 * Plain Old JavaScript Object to hold the representation of a Level.
 */
export class Level {
    public name: string;
    public wrapSymbols: string;
    public type: LevelType;
    public generateLength: LengthGenerator;
    public generateValue: ValueGenerator;
    public generateIndex: IndexGenerator;

    /**
     * Sets up a new level with the given name, type, and generators.
     * @param name The name of this level.
     * @param wrapSymbols The two characters to put at the start and end of the cat
     * @param type The LevelType of this level.
     * @param generateLength This function determines the length of the list for a given round.
     * @param generateValue This function is used to generate the values within the list that we're indexing.
     * @param generateIndex This function is used to generate the indexes the player is targetting. Can also
     * double as a message in a pinch.
     */
    constructor(
        name: string,
        wrapSymbols: string,
        type: LevelType,
        generateLength: LengthGenerator,
        generateValue: ValueGenerator,
        generateIndex: IndexGenerator
    ) {
        this.name = name;
        this.wrapSymbols = wrapSymbols;
        this.type = type;
        this.generateValue = generateValue;
        this.generateLength = generateLength;
        this.generateIndex = generateIndex;
    }
}
