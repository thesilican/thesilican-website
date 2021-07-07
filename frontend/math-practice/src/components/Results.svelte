<script lang="ts">
  import {
    formatMiliseconds,
    QUESTION_DIFFICULTY_NAME,
    sessionSumTime,
    SESSION_TYPE_NAME,
    sessionExtremeTimes,
    QUESTION_TYPE_SYMBOLS,
  } from "../lib";
  import type { Session } from "../lib";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher<{ back: null }>();

  export let session: Session;
  $: totalTime = formatMiliseconds(sessionSumTime(session));
  $: sessionType =
    SESSION_TYPE_NAME[session.options.type] +
    " / " +
    QUESTION_DIFFICULTY_NAME[session.options.difficulty];
  $: numQuestions = session.questions.length;
  $: avgTime = formatMiliseconds(sessionSumTime(session) / numQuestions, 2);
  $: fastest = sessionExtremeTimes(session, true);
  $: slowest = sessionExtremeTimes(session, false);

  function handleReturnToHomepageClick() {
    dispatch("back", null);
  }
</script>

<div class="container">
  <div class="row">
    <div class="col-0 col-lg-2" />
    <div class="main col-12 col-lg-8">
      <h1>Results</h1>
      <div class="info-table result-table fs-2">
        <span class="fw-bold">Total Time:</span>
        <span class="fw-bold">{totalTime}</span>
        <span>Session type: </span>
        <span>{sessionType}</span>
        <span>Number of questions:</span>
        <span>{numQuestions}</span>
        <span>Average time per question:</span>
        <span>{avgTime}</span>
      </div>
      <h1>Fastest questions</h1>
      <div class="info-table fs-2">
        {#each fastest as { num1, num2, type, time }}
          <span class="extremes-question"
            >{num1} {QUESTION_TYPE_SYMBOLS[type]} {num2}</span
          >
          <span>&nbsp;- {formatMiliseconds(time)}</span>
        {/each}
      </div>
      <h1>Slowest questions</h1>
      <div class="info-table fs-2">
        {#each slowest as { num1, num2, type, time }}
          <span class="extremes-question"
            >{num1} {QUESTION_TYPE_SYMBOLS[type]} {num2}</span
          >
          <span>&nbsp;- {formatMiliseconds(time)}</span>
        {/each}
      </div>
      <button
        class="btn btn-primary fs-4"
        on:click={handleReturnToHomepageClick}>Return to homepage</button
      >
    </div>
    <div class="col-0 col-lg-2" />
  </div>
</div>

<style>
  .main {
    padding-top: 2rem;
    padding-bottom: 2rem;

    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .info-table {
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    justify-items: start;

    margin-bottom: 1rem;
  }
  .result-table {
    column-gap: 1rem;
  }
  .extremes-question {
    justify-self: right;
  }
</style>
