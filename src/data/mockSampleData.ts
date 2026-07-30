import { UserProfile, VideoStudyPackage, Collection, NotificationItem } from '../types';

export const currentUserMock: UserProfile = {
  id: 'user_01',
  name: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  streakDays: 8,
  totalHoursStudied: 24.5,
  quizScoreAvg: 92,
  flashcardsLearned: 142,
  level: 'Master Scholar',
  points: 1250,
};

export const sampleCollections: Collection[] = [
  {
    id: 'col_webdev',
    name: 'Web Development & Frontend',
    description: 'React, TypeScript, Next.js, CSS Architecture and Web APIs.',
    color: 'from-blue-500 to-cyan-500',
    videoIds: ['yt_react19'],
    createdAt: '2026-07-20',
  },
  {
    id: 'col_dsa',
    name: 'DSA & Algorithms',
    description: 'Data Structures, Computer Science Fundamentals & Interview Prep.',
    color: 'from-emerald-500 to-teal-500',
    videoIds: ['yt_dsa'],
    createdAt: '2026-07-22',
  },
  {
    id: 'col_systemdesign',
    name: 'System Design & Architecture',
    description: 'Scalable Systems, Microservices, Caching, Databases.',
    color: 'from-purple-500 to-indigo-500',
    videoIds: ['yt_sysdesign'],
    createdAt: '2026-07-25',
  },
];

export const samplePackages: VideoStudyPackage[] = [
  {
    id: 'yt_react19',
    collectionId: 'col_webdev',
    createdAt: '2026-07-26',
    metadata: {
      id: 'yt_react19',
      youtubeId: 'SqcY0GlETPk',
      url: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
      title: 'React 19 Full Course - Server Actions, useActionState & Compiler',
      channelTitle: 'Tech Lead Academy',
      thumbnailUrl: 'https://img.youtube.com/vi/SqcY0GlETPk/hqdefault.jpg',
      duration: '22:15',
      durationSeconds: 1335,
      views: '184,200 views',
      category: 'Software Development',
      publishedAt: '2026-06-15',
    },
    notes: {
      summary: 'Comprehensive deep-dive into React 19 major features including Server Actions, useActionState, useFormStatus, Optimistic UI updates, and how the React Compiler eliminates manual useMemo and useCallback hooks.',
      introduction: 'React 19 represents a monumental paradigm shift in component state management, server-driven UI, and build-time optimization. This video walks through practical code implementations.',
      keyConcepts: [
        {
          concept: 'Server Actions',
          explanation: 'Asynchronous functions executed on the server, invokable directly from client forms or event handlers without writing express endpoints.',
        },
        {
          concept: 'useActionState',
          explanation: 'A hook that manages form action state, pending status, and returned payload seamlessly.',
        },
        {
          concept: 'React Compiler (Forget)',
          explanation: 'An auto-memoization compiler that automatically memoizes values and components, rendering manual useMemo & useCallback obsolete.',
        },
        {
          concept: 'useOptimistic',
          explanation: 'Hook for applying optimistic UI updates while server transactions are in progress.',
        },
      ],
      detailedSections: [
        {
          title: '1. Understanding Server Actions & Form Mutations',
          content: 'Server actions allow client components to invoke server-side functions natively. When combined with form elements, they enable progressive enhancement even before client JS loads.',
          bulletPoints: [
            'No need for manual axios/fetch boilerplate for simple form submits',
            'Integrated automatic revalidation with revalidatePath() and revalidateTag()',
            'Full end-to-end type safety between client payload and server action parameters',
          ],
        },
        {
          title: '2. Simplified State with useActionState',
          content: 'Replacing traditional useState + handleSubmit combinations, useActionState receives an action and initial state, returning [state, formAction, isPending].',
          bulletPoints: [
            'isPending boolean indicates active server execution',
            'Return object contains error messages or updated data',
            'Ideal for submit feedback and disable buttons during loading',
          ],
        },
      ],
      importantDefinitions: [
        {
          term: 'Progressive Enhancement',
          definition: 'Designing web applications so that core features work without client-side JavaScript, and are enhanced when JS is active.',
        },
        {
          term: 'Optimistic UI Update',
          definition: 'Immediately updating the UI assuming a network request will succeed, reverting only if the server responds with an error.',
        },
      ],
      commonMistakes: [
        'Attempting to pass non-serializable objects (like functions or class instances) into Server Actions.',
        'Manually adding useMemo wrappers in React 19 projects running the React Compiler.',
        'Forgetting to mark server action files with "use server" at the very top.',
      ],
      keyTakeaways: [
        'React 19 reduces boilerplate state management code by 40%.',
        'Server Actions unify server processing and client UI state.',
        'React Compiler optimizes re-renders automatically without extra developer code.',
      ],
    },
    flashcards: [
      {
        id: 'fc_1',
        question: 'What directive must be added at the top of a file containing Server Actions in React 19?',
        answer: 'The `"use server"` directive at the top of the module or function body.',
        difficulty: 'Easy',
        topic: 'Server Actions',
        isLearned: true,
      },
      {
        id: 'fc_2',
        question: 'What tuple does the `useActionState` hook return?',
        answer: '`[state, formAction, isPending]` where `state` is the current state, `formAction` is passed to `<form action>`, and `isPending` is a boolean.',
        difficulty: 'Medium',
        topic: 'Hooks',
        isLearned: true,
      },
      {
        id: 'fc_3',
        question: 'How does the React 19 Compiler change how we write memoization?',
        answer: 'It automatically memoizes values, objects, and components during compilation, rendering `useMemo` and `useCallback` largely unnecessary.',
        difficulty: 'Hard',
        topic: 'React Compiler',
        isLearned: false,
      },
      {
        id: 'fc_4',
        question: 'What is the purpose of the `useOptimistic` hook?',
        answer: 'It lets you display optimistic UI state while an async action (like a Server Action) is pending.',
        difficulty: 'Medium',
        topic: 'Hooks',
        isLearned: false,
      },
    ],
    quizzes: [
      {
        id: 'q_1',
        type: 'mcq',
        question: 'Which new React 19 hook replaces manual form pending state tracking?',
        options: ['useActionState', 'useFormPending', 'useServerStatus', 'useFormSubmit'],
        correctAnswer: 'useActionState',
        explanation: 'useActionState provides the pending state, error response, and action dispatcher in a clean tuple.',
        difficulty: 'Easy',
      },
      {
        id: 'q_2',
        type: 'mcq',
        question: 'What happens if a Server Action fails while using `useOptimistic`?',
        options: [
          'The app crashes immediately',
          'React automatically reverts the UI state back to the previous stable state',
          'The user is redirected to an error page',
          'The optimistic value stays on screen permanently',
        ],
        correctAnswer: 'React automatically reverts the UI state back to the previous stable state',
        explanation: 'React 19 restores the baseline state if the underlying async Server Action fails.',
        difficulty: 'Medium',
      },
      {
        id: 'q_3',
        type: 'true_false',
        question: 'True or False: React 19 requires developers to manually wrap every custom hook in useCallback to prevent memory leaks.',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanation: 'The React 19 Compiler performs automatic fine-grained memoization across components and hooks.',
        difficulty: 'Easy',
      },
      {
        id: 'q_4',
        type: 'short',
        question: 'Explain what directive is needed at the top of a Server Action file in Next.js / React 19.',
        correctAnswer: '"use server"',
        explanation: 'The "use server" directive signals to the bundler that functions in this file are server entry points.',
        difficulty: 'Medium',
      },
    ],
    codeSnippets: [
      {
        id: 'code_1',
        title: 'React 19 Form Submission with useActionState',
        language: 'typescript',
        code: `'use client';
import { useActionState } from 'react';
import { updateUsernameAction } from './actions';

export function ProfileForm() {
  const [state, formAction, isPending] = useActionState(updateUsernameAction, {
    message: '',
    success: false,
  });

  return (
    <form action={formAction} className="space-y-4">
      <input name="username" placeholder="New Username" required />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Saving...' : 'Update Profile'}
      </button>
      {state.message && (
        <p className={state.success ? 'text-green-600' : 'text-red-600'}>
          {state.message}
        </p>
      )}
    </form>
  );
}`,
        explanation: 'Demonstrates modern React 19 form state handling using useActionState and Server Actions with automatic pending indicators.',
        bestPractices: [
          'Always disable submit buttons when isPending is true to prevent duplicate triggers.',
          'Keep action responses serializable JSON objects.',
        ],
      },
    ],
    timeline: [
      {
        id: 'tm_1',
        timestamp: '00:00',
        timeInSeconds: 0,
        title: 'Introduction to React 19 Paradigm Shift',
        summary: 'Overview of new hooks, Server Actions, and compiler optimizations.',
      },
      {
        id: 'tm_2',
        timestamp: '03:45',
        timeInSeconds: 225,
        title: 'Deep Dive: Server Actions & Direct Form Binding',
        summary: 'How "use server" actions eliminate REST API endpoints for forms.',
      },
      {
        id: 'tm_3',
        timestamp: '10:12',
        timeInSeconds: 612,
        title: 'useActionState & useFormStatus Hands-on',
        summary: 'Building a full profile editor form with loading and error states.',
      },
      {
        id: 'tm_4',
        timestamp: '16:50',
        timeInSeconds: 1010,
        title: 'React Compiler vs Manual Memoization',
        summary: 'Comparing old useMemo/useCallback code against auto-compiled code.',
      },
    ],
    interviewQuestions: [
      {
        id: 'iq_1',
        question: 'How do React 19 Server Actions differ from traditional REST API routes?',
        answer: 'Server Actions are asynchronous functions declared on the server that can be directly imported and invoked in client component event handlers or forms. They simplify data mutations by removing manual fetch calls and endpoint routing.',
        keyPoints: [
          'Direct function invocation syntax',
          'Automatic request serialization and header handling',
          'Built-in integration with React transition states',
        ],
        difficulty: 'Senior',
      },
      {
        id: 'iq_2',
        question: 'What problem does the React 19 Compiler solve for large-scale web applications?',
        answer: 'It eliminates developer overhead of manually calculating dependency arrays for useMemo, useCallback, and React.memo. It prevents unnecessary component re-renders at compile-time with mathematical accuracy.',
        keyPoints: [
          'Automatic memoization at build time',
          'Fewer human errors with missing dependency arrays',
          'Clean, readable functional code',
        ],
        difficulty: 'Mid',
      },
    ],
    revisionSchedule: {
      id: 'rev_1',
      todayTasks: [
        'Review React 19 useActionState code syntax',
        'Complete 4 flashcards on Optimistic UI',
      ],
      tomorrowTasks: [
        'Practice writing a Server Action with validation',
        'Take the React 19 MCQ quiz',
      ],
      nextWeekTasks: [
        'Build a mini full-stack CRUD app using React 19 & Next.js 15',
      ],
      pomodoroSessions: 2,
      estimatedMinutes: 45,
      isCompleted: false,
    },
    knowledgeGraph: {
      nodes: [
        {
          id: 'react19',
          label: 'React 19 Framework',
          category: 'Core',
          importance: 'high',
          details: 'The latest major release of React introducing server actions and compiler auto-memoization.',
        },
        {
          id: 'server_actions',
          label: 'Server Actions',
          category: 'Data Mutation',
          importance: 'high',
          details: 'Server-side functions called directly from client components.',
        },
        {
          id: 'use_action_state',
          label: 'useActionState Hook',
          category: 'State Management',
          importance: 'medium',
          details: 'Manages action responses, form state, and pending execution status.',
        },
        {
          id: 'react_compiler',
          label: 'React Compiler',
          category: 'Optimization',
          importance: 'high',
          details: 'Build-time memoization tool that replaces manual useMemo/useCallback.',
        },
        {
          id: 'use_optimistic',
          label: 'useOptimistic Hook',
          category: 'UI UX',
          importance: 'medium',
          details: 'Renders optimistic UI updates before server confirmation.',
        },
      ],
      edges: [
        { source: 'react19', target: 'server_actions', relationship: 'includes' },
        { source: 'server_actions', target: 'use_action_state', relationship: 'managed_by' },
        { source: 'react19', target: 'react_compiler', relationship: 'optimized_by' },
        { source: 'server_actions', target: 'use_optimistic', relationship: 'complements' },
      ],
    },
  },
  {
    id: 'yt_dsa',
    collectionId: 'col_dsa',
    createdAt: '2026-07-24',
    metadata: {
      id: 'yt_dsa',
      youtubeId: '8hly31xKli0',
      url: 'https://www.youtube.com/watch?v=8hly31xKli0',
      title: 'Data Structures & Algorithms - Binary Trees, Graphs & Dynamic Programming',
      channelTitle: 'Algorithm Visualized',
      thumbnailUrl: 'https://img.youtube.com/vi/8hly31xKli0/hqdefault.jpg',
      duration: '35:40',
      durationSeconds: 2140,
      views: '412,000 views',
      category: 'Computer Science',
      publishedAt: '2026-05-10',
    },
    notes: {
      summary: 'An intuitive breakdown of tree traversals (BFS & DFS), graph representations (Adjacency Matrix vs List), and dynamic programming memoization strategies for coding interviews.',
      introduction: 'Mastering algorithmic problem solving requires understanding fundamental data structure properties, spatial complexity trade-offs, and recursive state transitions.',
      keyConcepts: [
        {
          concept: 'Breadth-First Search (BFS)',
          explanation: 'Level-order traversal using a Queue data structure. Ideal for finding the shortest path in unweighted graphs.',
        },
        {
          concept: 'Depth-First Search (DFS)',
          explanation: 'Explores as far as possible along each branch before backtracking using a Call Stack or explicit Stack.',
        },
        {
          concept: 'Dynamic Programming (Top-Down)',
          explanation: 'Combines recursion with memoization to store subproblem solutions, reducing O(2^N) exponential time to O(N).',
        },
      ],
      detailedSections: [
        {
          title: '1. Graph Traversals: BFS vs DFS',
          content: 'Graphs consist of vertices (nodes) and edges. Traversing graphs cleanly requires keeping track of visited nodes to prevent infinite loops in cyclic graphs.',
          bulletPoints: [
            'BFS uses Queue (FIFO): O(V + E) time, O(V) space',
            'DFS uses Stack/Recursion (LIFO): O(V + E) time, O(H) call stack space',
          ],
        },
      ],
      importantDefinitions: [
        {
          term: 'Memoization',
          definition: 'An optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.',
        },
      ],
      commonMistakes: [
        'Forgetting to mark nodes as visited in BFS, resulting in infinite queue loops.',
        'Using recursion for deep graphs without considering stack overflow limits.',
      ],
      keyTakeaways: [
        'Use BFS for shortest path in unweighted graphs.',
        'Use Dynamic Programming when subproblems overlap and possess optimal substructure.',
      ],
    },
    flashcards: [
      {
        id: 'fc_dsa_1',
        question: 'Which data structure is primarily used to implement Breadth-First Search (BFS)?',
        answer: 'A Queue (First-In, First-Out).',
        difficulty: 'Easy',
        topic: 'Graph Traversal',
        isLearned: true,
      },
      {
        id: 'fc_dsa_2',
        question: 'What is the time complexity of BFS/DFS on a graph with V vertices and E edges?',
        answer: 'O(V + E).',
        difficulty: 'Medium',
        topic: 'Complexity Analysis',
        isLearned: true,
      },
    ],
    quizzes: [
      {
        id: 'q_dsa_1',
        type: 'mcq',
        question: 'What is the primary difference between Top-Down DP and Bottom-Up DP?',
        options: [
          'Top-Down uses recursion + memoization; Bottom-Up uses iteration + tabulation',
          'Top-Down is always faster',
          'Bottom-Up requires more memory',
          'There is no difference',
        ],
        correctAnswer: 'Top-Down uses recursion + memoization; Bottom-Up uses iteration + tabulation',
        explanation: 'Top-Down solves subproblems recursively on demand with cache, while Bottom-Up builds solutions sequentially from base cases.',
        difficulty: 'Medium',
      },
    ],
    codeSnippets: [
      {
        id: 'code_dsa_1',
        title: 'BFS Graph Traversal in TypeScript',
        language: 'typescript',
        code: `function bfs(graph: Map<number, number[]>, startNode: number): number[] {
  const visited = new Set<number>();
  const queue: number[] = [startNode];
  const result: number[] = [];

  visited.add(startNode);

  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node);

    const neighbors = graph.get(node) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return result;
}`,
        explanation: 'Clean BFS implementation using JavaScript Queue and Set for visited tracking.',
        bestPractices: [
          'Always add neighbor to visited set BEFORE pushing to queue to avoid duplicate processing.',
        ],
      },
    ],
    timeline: [
      {
        id: 'tm_dsa_1',
        timestamp: '00:00',
        timeInSeconds: 0,
        title: 'Trees vs Graphs Architecture',
        summary: 'Understanding acyclic vs cyclic structures.',
      },
      {
        id: 'tm_dsa_2',
        timestamp: '12:30',
        timeInSeconds: 750,
        title: 'BFS Algorithm Step-by-Step Visualizer',
        summary: 'Tracing queue pushes and pops.',
      },
    ],
    interviewQuestions: [
      {
        id: 'iq_dsa_1',
        question: 'How do you detect a cycle in a Directed Graph?',
        answer: 'Use DFS with 3 node states: Unvisited (0), Visiting in current path (1), Fully Visited (2). If you encounter a node in state 1 during traversal, a back-edge exists, indicating a cycle.',
        keyPoints: ['3-color graph state algorithm', 'Detects back-edges in O(V+E) time'],
        difficulty: 'Senior',
      },
    ],
    revisionSchedule: {
      id: 'rev_dsa',
      todayTasks: ['Solve 1 Graph BFS LeetCode problem', 'Review visited set logic'],
      tomorrowTasks: ['Implement Top-Down Fibonacci with memoization'],
      nextWeekTasks: ['Practice Dijkstra Algorithm'],
      pomodoroSessions: 3,
      estimatedMinutes: 60,
      isCompleted: false,
    },
    knowledgeGraph: {
      nodes: [
        { id: 'dsa', label: 'Data Structures & Algo', category: 'CS', importance: 'high', details: 'Core software engineering principles.' },
        { id: 'graphs', label: 'Graphs & Trees', category: 'Structures', importance: 'high', details: 'Nodes connected by edges.' },
        { id: 'bfs', label: 'BFS Traversal', category: 'Algorithms', importance: 'high', details: 'Level order search with queue.' },
        { id: 'dfs', label: 'DFS Traversal', category: 'Algorithms', importance: 'medium', details: 'Deep stack search.' },
      ],
      edges: [
        { source: 'dsa', target: 'graphs', relationship: 'contains' },
        { source: 'graphs', target: 'bfs', relationship: 'traversed_by' },
        { source: 'graphs', target: 'dfs', relationship: 'traversed_by' },
      ],
    },
  },
];

export const sampleNotifications: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Revision Due Today! 🔥',
    message: 'React 19 Server Actions revision schedule is due today. Complete your 4 flashcards now!',
    type: 'revision',
    time: '10 mins ago',
    read: false,
  },
  {
    id: 'notif_2',
    title: '8 Day Study Streak Active!',
    message: 'Awesome consistency! You have logged study sessions for 8 consecutive days.',
    type: 'streak',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 'notif_3',
    title: 'Quiz Performance High Score',
    message: 'You scored 100% on the React 19 MCQ Quiz. +50 Level Points added!',
    type: 'quiz',
    time: 'Yesterday',
    read: true,
  },
];
