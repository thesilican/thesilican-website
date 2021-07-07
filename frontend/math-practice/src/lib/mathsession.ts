import { shuffle } from "./util";

export type QuestionType = "add" | "sub" | "mul" | "div";
export const QUESTION_TYPE_SYMBOLS: { [k in QuestionType]: string } = {
  add: "+",
  sub: "-",
  mul: "×",
  div: "÷",
};
export const SESSION_TYPE_NAME: { [k in SessionType]: string } = {
  add: "Addition",
  sub: "Subtraction",
  mul: "Multiplication",
  div: "Division",
  mix: "All",
};
export type QuestionDifficulty = "easy" | "med" | "hard";
export const QUESTION_DIFFICULTY_NAME: { [k in QuestionDifficulty]: string } = {
  easy: "Easy",
  med: "Medium",
  hard: "Hard",
};
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

export const DEFAULT_SESSION_OPTIONS: SessionOptions = {
  type: "add",
  difficulty: "easy",
  numQuestions: 20,
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
    med: [1, 10, 1, 100],
    hard: [1, 10, 1, 1000],
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
const MAX_POOL_SIZE = 144;
function generatePool(
  type: SessionType,
  difficulty: QuestionDifficulty
): QuestionOptions[] {
  const pool: QuestionOptions[] = [];
  function addRangeToPool(type: QuestionType) {
    const range = QUESTION_RANGES[type][difficulty];
    let temp = [];
    for (let a = range[0]; a <= range[1]; a++) {
      for (let b = range[2]; b <= range[3]; b++) {
        temp.push({ type, a, b });
      }
    }
    shuffle(temp);
    if (temp.length > MAX_POOL_SIZE) {
      temp = temp.slice(0, MAX_POOL_SIZE);
    }
    pool.push(...temp);
  }

  if (type === "mix") {
    for (const type of QUESTION_TYPES) {
      addRangeToPool(type);
    }
  } else {
    addRangeToPool(type);
  }
  shuffle(pool);

  return pool;
}

export function generateSession(options: SessionOptions): Session {
  console.assert(options.numQuestions > 0);
  const questions: Question[] = [];
  l: while (true) {
    const pool = generatePool(options.type, options.difficulty);
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

export function sessionSumTime(session: Session): number {
  let elapsed = 0;
  for (const question of session.questions) {
    elapsed += question.time ?? 0;
  }
  return elapsed;
}

export function sessionExtremeTimes(
  session: Session,
  fastest: boolean,
  amount = 5
) {
  const questions = [...session.questions];
  questions.sort((a, b) => (a.time - b.time) * (fastest ? 1 : -1));
  return questions.slice(0, amount);
}
