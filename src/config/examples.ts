const rTabs = (str: string) => str.trim().replace(/^ {4}/gm, "");

export const examples: Record<string, string> = {
  c: rTabs(`
    #include <stdio.h>

    int main(int argc, char **argv) {
      printf("Hello world!");
    } 
  `),
  cpp: rTabs(`
    #include <iostream>
    #include <vector>
    #include <algorithm>

    using namespace std;

    int main() {
      return 0;
    } 
  `),
  python: rTabs(`
    print("Hello world!")
  `),
};
