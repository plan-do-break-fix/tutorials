class Solution:
    """
    Runtime: 232 ms
    Memory: 25.6 MB
    """
    def search(self, nums: List[int], target: int) -> int:
        _min, _max = 0, len(nums) - 1
        while _min <= _max:
            pivot = _min + (_max - _min) // 2
            if nums[pivot] == target:
                return pivot
            if target < nums[pivot]:
                _max = pivot - 1
            elif target > nums[pivot]:
                _min = pivot + 1
        return -1

class firstAttemptFailedSolution:
    def search(self, nums: List[int], target: int) -> int:
        """
        Exceeds allowed runtime.
        """
        if nums[-1] < target:
            return -1
        cursor = int(len(nums)/2)
        _i = None
        while not _i:
            if nums[cursor] == target:
                _i = cursor
            elif nums[cursor] < target:
                cursor += int(len(nums[cursor:])/2)
            elif nums[cursor] > target:
                cursor -= int(len(nums[:cursor])/2)
        return _i


