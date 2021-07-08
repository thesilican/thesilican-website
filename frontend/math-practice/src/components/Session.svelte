<script lang="ts">
  import {
    formatMinutesSeconds,
    sessionSumTime,
    timeDiff,
    generateSession,
    QUESTION_TYPE_SYMBOLS,
  } from "../lib";
  import type { Session, SessionOptions } from "../lib";
  import { createEventDispatcher, onMount } from "svelte";

  const dispatch = createEventDispatcher<{ finish: Session }>();

  export let sessionOptions: SessionOptions;
  let session = generateSession(sessionOptions);
  let input = "";
  $: {
    const currQuestion = session.questions[session.currQuestion];
    if (parseInt(input, 10) === currQuestion.ans) {
      setTimeout(() => {
        input = "";
        const elapsed = timeDiff(session.start);
        const prev = sessionSumTime(session);
        const time = elapsed - prev;
        currQuestion.time = time;
        if (session.currQuestion + 1 === session.questions.length) {
          const seconds = formatMinutesSeconds(sessionSumTime(session));
          alert(`Finished in ${seconds}`);
          dispatch("finish", session);
        } else {
          session.currQuestion += 1;
        }
      }, 100);
    }
  }
  $: currQuestion = session.questions[session.currQuestion];
  $: progress = Math.round(
    (100 * session.currQuestion) / (session.questions.length - 1)
  );

  function handleClearInput() {
    input = "";
  }

  let inputBox: HTMLInputElement;
  onMount(() => {
    inputBox.focus();
  });
</script>

<div class="wrapper">
  <div class="session-progress progress">
    <div
      class="progress-bar"
      role="progressbar"
      style="width: {progress}%"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  </div>
  <form class="question-answer" on:submit|preventDefault={handleClearInput}>
    <div class="question">
      <div />
      <span>{currQuestion.num1}</span>
      <span class="operator">{QUESTION_TYPE_SYMBOLS[currQuestion.type]}</span>
      <span>{currQuestion.num2}</span>
    </div>
    <input
      type="number"
      class="answer"
      bind:value={input}
      bind:this={inputBox}
    />
  </form>
</div>

<style>
  .wrapper {
    display: grid;
    grid-template-rows: auto 1fr;
  }

  .question-answer {
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-self: center;

    padding: 1rem;

    font-size: calc(4rem + 5vw);
    line-height: 1.25;
  }
  @media (min-width: 1200px) {
    .question-answer {
      font-size: 7.5rem;
    }
  }
  .question {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    justify-items: end;

    border-bottom: 0.5rem solid black;
    margin-bottom: 0.5rem;
  }
  .answer {
    /* font-size: smaller; */
    width: calc(15rem + 8vw);
    text-align: end;
  }
  /* Hide Spinner */
  .answer::-webkit-outer-spin-button,
  .answer::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .answer[type="number"] {
    -moz-appearance: textfield;
  }

  .session-progress {
    border-radius: 0;
    margin-bottom: 1rem;
  }
</style>
