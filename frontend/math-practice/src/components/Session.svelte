<script lang="ts">
  let progress = 10;
</script>

<div class="wrapper">
  <div class="question-answer">
    <div class="question">
      <div />
      <span>12</span>
      <span class="operator">+</span>
      <span>12</span>
    </div>
    <input type="number" class="answer" />
  </div>
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
</div>

<style>
  .wrapper {
    display: grid;
    grid-template-rows: 1fr auto;
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
    font-size: smaller;
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
    margin: 0 1rem 1rem 1rem;
  }
</style>
