type CourseDataProps = Array<{
  title: string;
  subtitle: string;
  imageSrc: string;
  difficulty: "easy" | "medium" | "hard";
}>;

export const coursesData: CourseDataProps = [
  {
    title: "Arrays",
    subtitle: "10 problems",
    difficulty: "easy",
    imageSrc: "/Arrays.png",
  },
  {
    title: "Binary Search",
    subtitle: "10 problems",
    difficulty: "easy",
    imageSrc: "/BinarySearch.png",
  },
  {
    title: "Binary Tree",
    subtitle: "10 problems",
    difficulty: "easy",
    imageSrc: "/BinaryTree.png",
  },
  {
    title: "N-ary Tree",
    subtitle: "10 problems",
    difficulty: "medium",
    imageSrc: "/N-aryTree.png",
  },
  {
    title: "Graph",
    subtitle: "10 problems",
    difficulty: "hard",
    imageSrc: "/Graph.png",
  },
  {
    title: "Queue & Stack",
    subtitle: "10 problems",
    difficulty: "easy",
    imageSrc: "/QueueAndStack.png",
  },
  {
    title: "Heap",
    subtitle: "10 problems",
    difficulty: "easy",
    imageSrc: "/Heap.png",
  },
  {
    title: "Linked List",
    subtitle: "10 problems",
    difficulty: "medium",
    imageSrc: "/LinkedList.png",
  },
  {
    title: "Sorting",
    subtitle: "10 problems",
    difficulty: "medium",
    imageSrc: "/Sorting.png",
  },
  {
    title: "Recursion",
    subtitle: "10 problems",
    difficulty: "medium",
    imageSrc: "/Recursion.png",
  },
  {
    title: "Hash Table",
    subtitle: "10 problems",
    difficulty: "medium",
    imageSrc: "/HashTable.png",
  },
  {
    title: "Trie",
    subtitle: "4 problems",
    difficulty: "hard",
    imageSrc: "/Trie.png",
  },
];
