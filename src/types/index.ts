export interface VideoMetadata {
  id: string;
  youtubeId: string;
  url: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  duration: string; // e.g. "18:42"
  durationSeconds: number;
  views?: string;
  category?: string;
  publishedAt?: string;
}

export interface NoteSection {
  title: string;
  content: string;
  bulletPoints?: string[];
}

export interface AINotes {
  summary: string;
  introduction: string;
  keyConcepts: { concept: string; explanation: string }[];
  detailedSections: NoteSection[];
  importantDefinitions: { term: string; definition: string }[];
  commonMistakes: string[];
  keyTakeaways: string[];
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  isLearned?: boolean;
  isBookmarked?: boolean;
}

export interface QuizQuestion {
  id: string;
  type: 'mcq' | 'short' | 'true_false';
  question: string;
  options?: string[]; // For MCQ
  correctAnswer: string;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  userScore?: number;
  totalQuestions?: number;
  completedAt?: string;
}

export interface CodeSnippet {
  id: string;
  title: string;
  language: string;
  code: string;
  explanation: string;
  bestPractices: string[];
}

export interface TimelineItem {
  id: string;
  timestamp: string; // e.g. "04:23"
  timeInSeconds: number;
  title: string;
  summary: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  answer: string;
  keyPoints: string[];
  difficulty: 'Junior' | 'Mid' | 'Senior';
}

export interface RevisionSchedule {
  id: string;
  todayTasks: string[];
  tomorrowTasks: string[];
  nextWeekTasks: string[];
  pomodoroSessions: number;
  estimatedMinutes: number;
  isCompleted?: boolean;
}

export interface GraphNode {
  id: string;
  label: string;
  category: string;
  importance: 'high' | 'medium' | 'low';
  details: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  relationship: string;
}

export interface KnowledgeGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  color: string;
  videoIds: string[];
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
  citations?: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  streakDays: number;
  totalHoursStudied: number;
  quizScoreAvg: number;
  flashcardsLearned: number;
  level: string;
  points: number;
}

export interface VideoStudyPackage {
  id: string; // Video ID
  metadata: VideoMetadata;
  notes: AINotes;
  flashcards: Flashcard[];
  quizzes: QuizQuestion[];
  codeSnippets: CodeSnippet[];
  timeline: TimelineItem[];
  interviewQuestions: InterviewQuestion[];
  revisionSchedule: RevisionSchedule;
  knowledgeGraph: KnowledgeGraph;
  collectionId?: string;
  createdAt: string;
  transcriptText?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'revision' | 'streak' | 'collection' | 'quiz';
  time: string;
  read: boolean;
}
