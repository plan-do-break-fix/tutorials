/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var nestedIterationTwoSum = function(nums, target) {
    for (let i=0; i < nums.length; i++) {
        for (let j=0; j < nums.length; j++) {
            if (i != j && nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// ECMAScript 2015 using Map()
// Runtime: 688 ms
// Memory Usage: 45.8 MB
var hashMap2015TwoSum = function(nums, target) {
    const table = new Map();
    table.set(nums[0], 0);
    for (let i=1; i < nums.length; i++) {
        tableIter = table.entries();
        for (let j=0; j < table.size; j++) { 
            entry = tableIter.next().value;
            if (target - entry[0] === nums[i] && entry[1] != i) {
                return [entry[1], i];
            }
        }
        table.set(nums[i], i); 
    }
};