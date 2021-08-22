#!/usr/bin/python3
from typing import List

class HashMapSolution:
    """
    Runtime: 2056 ms
    Memory Usage: 14.2 MB
    """
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        table = {nums[0]: 0}
        for i in range(1,len(nums)):
            for num in table:
                if target - nums[i] == num:
                    return [table[num], i]
            table[nums[i]] = i

class DoubleIterationSolution:
    """
    Runtime: 8904 ms
    Memory Usage: 14.9 MB
    """
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        for _i, x in enumerate(nums):
            for _j, y in enumerate(nums):
                if _i == _j:
                    continue
                if x+y==target:
                    return [_i, _j]
 