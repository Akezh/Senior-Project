You have to use `for` loops in order to solve this problem. Example code in `C++` that solves this problem is written below:

```cpp
long long int getSum(int* a, int n) {
    long long int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += i;
    }
    return sum;
}
```
