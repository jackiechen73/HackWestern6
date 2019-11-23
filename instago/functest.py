def score(x, y):
   import math
   return 0.01 * (x - 2.5) * math.pow(y, 1)

print(score(1, 10000))
print(score(5, 10000))
print(score(2.5, 10000))
print(score(1, 1))
print(score(5, 1))
print(score(2.5, 1))
print(score(3, 213))
print(score(4.2, 1023))
