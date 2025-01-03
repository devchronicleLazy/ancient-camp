import { ILessonContent } from '@/types/lesson';

const lessonContents: Record<string, ILessonContent> = {
  l1: {
    id: 'l1',
    courseId: '1',
    moduleId: 'm1',
    moduleTitle: 'Introduction to Solidity',
    title: 'What is Solidity?',
    description:
      'Learn the basic syntax of Solidity and how to write your first smart contract.',
    challenge:
      'Create a simple contract called `HelloWorld` that stores and retrieves a greeting.',
    hints: [
      'Start by defining a contract using the `contract` keyword.',
      'Use a state variable to store the greeting.',
      'Implement a function to update the greeting and another to retrieve it.',
    ],
    objectives: [
      'Understand the basic syntax of Solidity.',
      'Learn how to define contracts and state variables.',
      'Implement getter and setter functions.',
    ],
    language: 'solidity',
    steps: [
      {
        id: 's1',
        title: 'Define a Contract',
        description: 'Start by creating a basic contract structure.',
        challenge:
          'Define a contract called `HelloWorld` with a state variable `greeting`.',
        hints: [
          'Use the `contract` keyword to define the contract.',
          'Declare `greeting` as a public state variable of type `string`.',
        ],
        initialCode: `
pragma solidity ^0.8.0;

contract HelloWorld {
}`,
        solution: `pragma solidity ^0.8.0;

contract HelloWorld {
    string public greeting;
}`,
        tests: [
          {
            input: 'greeting state variable',
            expected: 'string',
            description:
              'State variable `greeting` should be declared as a public string.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Add a Constructor',
        description: 'Initialize the `greeting` variable using a constructor.',
        challenge:
          'Add a constructor that takes an initial greeting as an argument.',
        hints: [
          'Use the `constructor` keyword to define the constructor.',
          'Assign the input value to the `greeting` variable.',
        ],
        initialCode: `pragma solidity ^0.8.0;

contract HelloWorld {
    string public greeting;

}`,
        solution: `pragma solidity ^0.8.0;

contract HelloWorld {
    string public greeting;

    constructor(string memory initialGreeting) {
        greeting = initialGreeting;
    }
}`,
        tests: [
          {
            input: 'constructor',
            expected: 'initialize greeting',
            description:
              'Constructor should initialize the `greeting` variable with the input value.',
          },
        ],
      },
    ],
  },
  l2: {
    id: 'l2',
    courseId: '1',
    moduleId: 'm2',
    moduleTitle: 'Functions in Solidity',
    title: 'Writing Functions',
    description: 'Learn how to write and call functions in Solidity.',
    challenge:
      'Implement a function to update the `greeting` variable and another to retrieve it.',
    hints: [
      'Use `function` keyword to define a function.',
      'Use `public` visibility to make the function callable from outside.',
      'Update `greeting` with the new value in the setter function.',
    ],
    objectives: [
      'Understand how to define functions in Solidity.',
      'Learn how to use getter and setter functions.',
    ],
    language: 'solidity',
    steps: [
      {
        id: 's1',
        title: 'Write a Getter Function',
        description: 'Implement a function to return the current greeting.',
        challenge:
          'Write a public function `getGreeting` that returns the `greeting` variable.',
        hints: [
          'Use `returns` keyword to specify the return type.',
          'Return the value of `greeting`.',
        ],
        initialCode: `pragma solidity ^0.8.0;

contract HelloWorld {
    string public greeting;

    constructor(string memory initialGreeting) {
        greeting = initialGreeting;
    }

    // Write your getter function here
}`,
        solution: `pragma solidity ^0.8.0;

contract HelloWorld {
    string public greeting;

    constructor(string memory initialGreeting) {
        greeting = initialGreeting;
    }

    function getGreeting() public view returns (string memory) {
        return greeting;
    }
}`,
        tests: [
          {
            input: 'getGreeting function',
            expected: 'return greeting',
            description:
              'The `getGreeting` function should return the value of `greeting`.',
          },
        ],
      },
      {
        id: 's2',
        title: 'Write a Setter Function',
        description: 'Implement a function to update the `greeting` variable.',
        challenge:
          'Write a public function `setGreeting` that updates the `greeting` variable.',
        hints: [
          'Use a string parameter to accept the new greeting.',
          'Update the `greeting` variable with the input parameter.',
        ],
        initialCode: `pragma solidity ^0.8.0;

contract HelloWorld {
    string public greeting;

    constructor(string memory initialGreeting) {
        greeting = initialGreeting;
    }

    function getGreeting() public view returns (string memory) {
        return greeting;
    }

    // Write your setter function here
}`,
        solution: `pragma solidity ^0.8.0;

contract HelloWorld {
    string public greeting;

    constructor(string memory initialGreeting) {
        greeting = initialGreeting;
    }

    function getGreeting() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory newGreeting) public {
        greeting = newGreeting;
    }
}`,
        tests: [
          {
            input: 'setGreeting function',
            expected: 'update greeting',
            description:
              'The `setGreeting` function should update the value of `greeting`.',
          },
        ],
      },
    ],
  },
  // Continue adding more lessons (l3, l4, l5) with increasing complexity...
};

export function getLessonById(
  courseId: string,
  lessonId: string
): ILessonContent | undefined {
  const lesson = lessonContents[lessonId];
  return lesson?.courseId === courseId ? lesson : undefined;
}
