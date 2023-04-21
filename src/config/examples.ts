const rTabs = (str: string) => str.trim().replace(/^ {4}/gm, "");

export const examples: Record<string, string> = {
  c: rTabs(`
    #include <stdio.h>

    int main(int argc, char **argv) {
      printf("Love Akezhan");
    } 
  `),
  cpp: rTabs(`
    #include <iostream>

    int main() {
      std::cout << "Love Akezhan";
      return 0;
    } 
  `),
  python: rTabs(`
    print("Hello world!")
  `),
};
