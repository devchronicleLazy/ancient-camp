export interface Course {
  id: string;
  title: string;
  description: string;
  lessons: number;
  duration: string;
  modules: Module[];
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
}

const courses: Course[] = [
  {
    id: "1",
    title: "Blockchain Fundamentals",
    description: "Learn the basics of blockchain technology and cryptography",
    lessons: 12,
    duration: "4 weeks",
    modules: [
      {
        id: "m1",
        title: "Introduction to Blockchain",
        lessons: [
          { id: "l1", title: "What is Blockchain?" },
          { id: "l2", title: "Cryptography Basics" },
          { id: "l3", title: "Consensus Mechanisms" },
        ],
      },
      {
        id: "m2",
        title: "Smart Contracts",
        lessons: [
          { id: "l4", title: "Introduction to Smart Contracts" },
          { id: "l5", title: "Solidity Basics" },
          { id: "l6", title: "Writing Your First Smart Contract" },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Smart Contract Development",
    description: "Master Solidity and build secure smart contracts",
    lessons: 15,
    duration: "6 weeks",
    modules: [
      {
        id: "m1",
        title: "Solidity Fundamentals",
        lessons: [
          { id: "l1", title: "Solidity Syntax" },
          { id: "l2", title: "Data Types" },
          { id: "l3", title: "Functions" },
        ],
      },
    ],
  },
];

export function getAllCourses(): Course[] {
  return courses;
}

export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}
