const EXPANSION_TABLE: number[] = [8, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 1];

const PERMUTATION_TABLE: number[] = [2, 8, 4, 7, 6, 5, 3, 1];

const PERMUTED_CHOICE: number[] = [8, 7, 1, 4, 10, 5, 3, 9, 2, 12, 6, 11];

const S_BOXES: number[][][] = [
  [
    [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
    [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
    [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
    [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13],
  ],
  [
    [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
    [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
    [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
    [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9],
  ],
];

const INPUT: string = "0101101011011101";

const KEY: string = "110001001000";

/**
 * Performs a left cyclic shift on an array of bits.
 * @param {number[]} bits - Array of bits to be shifted.
 * @param {number} shift - Number of positions to shift the bits.
 * @returns {number[]} Array of bits after the left cyclic shift.
 */
const leftCyclicShift = (bits: number[], shift: number): number[] =>
  bits.slice(shift).concat(bits.slice(0, shift));

/**
 * Determines the shift amount based on the current round and performs a cyclic shift on the key.
 * @param {number[]} key - Array of bits representing the encryption key.
 * @param {number} round - Current round number.
 * @returns {number[]} Array of bits after the cyclic shift.
 */
const keyShift = (key: number[], round: number): number[] => {
  const shift =
    round === 1 || round === 2 || round === 9 || round === 16 ? 1 : 2;

  return leftCyclicShift(key, shift);
};

/**
 * Permutes the order of keys bytes based on the permutation table.
 * @param {number[]} bits - Array of bits to be permuted.
 * @returns {number[]} Permuted array of bits.
 */
const permuteChoice = (bits: number[]): number[] => {
  const permutedBits = new Array(12).fill(0);

  for (let i = 0; i < 12; i++) {
    permutedBits[i] = bits[PERMUTED_CHOICE[i] - 1];
  }

  return permutedBits;
};

/**
 * Generates 16 subkeys, each of 12 bits, from the original key.
 * @param {number[]} binaryKey - Array of bits representing the encryption key.
 * @returns {number[][]} Array of 16 subkeys, each of which is an array of 12 bits.
 */
const generateSubkeys = (binaryKey: number[]): number[][] => {
  const subkeys: number[][] = [];

  let keyLeft = binaryKey.slice(0, 6);
  let keyRight = binaryKey.slice(6, 12);

  for (let round = 1; round <= 16; round++) {
    keyLeft = keyShift(keyLeft, round);
    keyRight = keyShift(keyRight, round);

    const shiftedKey = keyLeft.concat(keyRight);

    const permutedKey = permuteChoice(shiftedKey);
    subkeys.push(permutedKey);
  }

  return subkeys;
};

/**
 * Converts a binary string into an array of bits.
 * @param {string} binaryString - Binary string to be converted.
 * @returns {number[]} Array of bits.
 */
const convertBinaryStringToBitArray = (binaryString: string): number[] => {
  const bitArray = new Array(8).fill(0);

  for (let i = 0; i < 8; i++) bitArray[7 - i] = binaryString[i] === "1" ? 1 : 0;

  return bitArray;
};

/**
 * Permutes the order of bits based on the permutation table.
 * @param {number[]} bits - Array of bits to be permuted.
 * @returns {number[]} Permuted array of bits.
 */
const permute = (bits: number[]): number[] => {
  const permutedBits = new Array(8).fill(0);

  for (let i = 0; i < 8; i++) permutedBits[i] = bits[PERMUTATION_TABLE[i] - 1];

  return permutedBits;
};

/**
 * Applies S-box transformation on a 6-bit input array using S-box 1.
 * @param {number[]} bits - Array of 6 bits to be transformed using S-box 1.
 * @returns {number[]} Transformed array of 4 bits.
 */
const sBox1 = (bits: number[]): number[] => {
  const row = (bits[0] << 1) | bits[5];
  const col = (bits[1] << 3) | (bits[2] << 2) | (bits[3] << 1) | bits[4];
  const value = S_BOXES[0][row][col];
  const outputBits = new Array(4).fill(0);

  for (let i = 0; i < 4; i++) outputBits[3 - i] = (value >> i) & 1;

  return outputBits;
};

/**
 * Applies S-box transformation on a 6-bit input array using S-box 2.
 * @param {number[]} bits - Array of 6 bits to be transformed using S-box 2.
 * @returns {number[]} Transformed array of 4 bits.
 */
const sBox2 = (bits: number[]): number[] => {
  const row = (bits[0] << 1) | bits[5];
  const col = (bits[1] << 3) | (bits[2] << 2) | (bits[3] << 1) | bits[4];
  const value = S_BOXES[1][row][col];
  const outputBits = new Array(4).fill(0);

  for (let i = 0; i < 4; i++) outputBits[3 - i] = (value >> i) & 1;

  return outputBits;
};

/**
 * Expands an 8-bit input array to 12 bits based on the EXPANSION_TABLE table.
 * @param {number[]} bits - Array of 8 bits to be expanded.
 * @returns {number[]} Expanded array of 12 bits.
 */
const expand = (bits: number[]): number[] => {
  const expandedBits = new Array(12).fill(0);

  for (let i = 0; i < 12; i++) expandedBits[i] = bits[EXPANSION_TABLE[i] - 1];

  return expandedBits;
};

/**
 * Main function to execute the cipher encryption process.
 * @param {string} input - 16-bit binary string representing the message.
 * @param {number[]} key - 12-bit array representing the encryption key.
 * @returns {void} None (outputs the encrypted message to console).
 */
const main = (input: string, key: number[]) => {
  const subkeys = generateSubkeys(key);

  // Steps
  // Takes in 16 bits as input
  // Splits the 16 into 2 sets of 8 bits
  const liString = input.substr(0, 8);
  const riString = input.substr(8, 8);

  let li = convertBinaryStringToBitArray(liString);
  let ri = convertBinaryStringToBitArray(riString);

  let liNext: number[], riNext: number[];

  for (let round = 0; round < 16; round++) {
    // On the right side, EXPANSION_TABLE steps:
    // Takes the EXPANSION_TABLE const to place in an array the numbers of the the last 8 bits.
    // The numbers in the const are used as index to place them
    // Create the 16 bits array and place "right" bits according to the index in "EXPANSION_TABLE"
    const expandedRi = expand(ri);
    const xorResult = expandedRi.map(
      (bit, index) => bit ^ subkeys[round][index]
    );

    // Now, we split the 16 bits array into two arrays of 8 bits
    const xorResultLeft = xorResult.slice(0, 6);
    const xorResultRight = xorResult.slice(6, 12);

    // For each array, we apply associated sBox
    const sBox1Result = sBox1(xorResultLeft);
    const sBox2Result = sBox2(xorResultRight);

    // Array concat.
    const sBoxResult = sBox1Result.concat(sBox2Result);

    // Permutation
    const permutedSboxResult = permute(sBoxResult);

    liNext = ri;

    // Final XOR between left and right itération to give new right
    riNext = li.map((bit, index) => bit ^ permutedSboxResult[index]);

    // Reverse left and right for next iteration
    li = liNext;
    ri = riNext;
  }

  const cipher = ri.concat(li).join("");

  console.log("Cipher:", cipher);

  return;
};

main(
  INPUT,
  KEY.split("").map((i) => parseInt(i, 10))
);
