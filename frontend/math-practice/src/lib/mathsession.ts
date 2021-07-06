import { shuffle } from "./util";

export type QuestionType = "add" | "sub" | "mul" | "div";
export type QuestionDifficulty = "easy" | "med" | "hard";
export type SessionType = QuestionType | "mix";

export type Question = {
  type: QuestionType;
  num1: number;
  num2: number;
  ans: number;
  // Time in seconds
  time: number | null;
};

export type Session = {
  options: SessionOptions;
  start: Date;
  questions: Question[];
  // if currQuestion === questions.length, then session is completed
  currQuestion: number;
};
export type SessionOptions = {
  type: SessionType;
  difficulty: QuestionDifficulty;
  numQuestions: number;
};

const QUESTION_RANGES: {
  [type in QuestionType]: {
    [diff in QuestionDifficulty]: [
      min1: number,
      max1: number,
      min2: number,
      max2: number
    ];
  };
} = {
  add: {
    easy: [1, 12, 1, 12],
    med: [1, 100, 1, 100],
    hard: [1, 1000, 1, 1000],
  },
  sub: {
    easy: [1, 12, 1, 12],
    med: [1, 100, 1, 100],
    hard: [1, 1000, 1, 1000],
  },
  mul: {
    easy: [1, 12, 1, 12],
    med: [1, 100, 1, 10],
    hard: [1, 1000, 1, 10],
  },
  div: {
    easy: [1, 12, 1, 12],
    med: [1, 100, 1, 10],
    hard: [1, 1000, 1, 10],
  },
};

function generateQuestion({ type, a, b }: QuestionOptions): Question {
  let num1: number, num2: number, ans: number;
  if (type === "add") {
    num1 = a;
    num2 = b;
    ans = a + b;
  } else if (type === "sub") {
    num1 = a + b;
    num2 = a;
    ans = b;
  } else if (type === "mul") {
    num1 = a;
    num2 = b;
    ans = a * b;
  } else if (type === "div") {
    num1 = a * b;
    num2 = a;
    ans = b;
  }
  return { type, num1, num2, ans, time: null };
}

type QuestionOptions = { type: QuestionType; a: number; b: number };
const QUESTION_TYPES: QuestionType[] = ["add", "sub", "mul", "div"];
function generatePool(
  type: SessionType,
  difficulty: QuestionDifficulty
): QuestionOptions[] {
  const pool: QuestionOptions[] = [];
  function addRangeToPool(type: QuestionType) {
    const range = QUESTION_RANGES[type][difficulty];
    for (let a = range[0]; a <= range[1]; a++) {
      for (let b = range[2]; b <= range[3]; b++) {
        pool.push({ type, a, b });
      }
    }
  }

  if (type === "mix") {
    for (const type of QUESTION_TYPES) {
      addRangeToPool(type);
    }
  } else {
    addRangeToPool(type);
  }

  return pool;
}

export function generateSession(options: SessionOptions): Session {
  console.assert(options.numQuestions > 0);
  const questions: Question[] = [];
  l: while (true) {
    const pool = generatePool(options.type, options.difficulty);
    shuffle(pool);
    for (const questionOptions of pool) {
      const question = generateQuestion(questionOptions);
      questions.push(question);
      if (questions.length === options.numQuestions) {
        break l;
      }
    }
  }
  const start = new Date();
  return {
    start,
    options,
    questions,
    currQuestion: 0,
  };
}
