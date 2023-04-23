One approach might be to use `for` loops in order to solve this problem. Example code in `C++` that solves this problem is written below:

```cpp
long long int getSum(int* a, int n) {
    long long int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += i;
    }
    return sum;
}
```

Note that you should use `long long` type in C++ because `int` would not be able to fit the sum of elements for some large test cases.
