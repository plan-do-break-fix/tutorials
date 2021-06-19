#!/usr/bin/python3
from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        for _i, x in enumerate(nums):
            for _j, y in enumerate(nums):
                if _i == _j:
                    continue
                if x+y==target:
                    return [_i, _j]
 