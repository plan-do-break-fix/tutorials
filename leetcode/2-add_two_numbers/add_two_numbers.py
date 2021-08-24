# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    """
    Runtime: 72 ms
    Memory Usage: 14.2MB
    """
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        i, j, carry, head = l1, l2, 0, ListNode()
        cursor = head
        while i or j:
            x = i.val if i else 0
            y = j.val if j else 0
            total = x + y + carry
            carry = int(total / 10)
            cursor.next = ListNode(total % 10)
            cursor = cursor.next
            i = i.next if i else None
            j = j.next if j else None
        cursor.next = ListNode(carry) if carry else None
        return head.next