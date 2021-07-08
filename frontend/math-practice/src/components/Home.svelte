<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { SessionOptions } from "../lib";
  import { DEFAULT_SESSION_OPTIONS } from "../lib";
  import { clone } from "../lib";
  const LOCAL_STORAGE_KEY = "/mental-math/sessionOptions";

  const dispatch = createEventDispatcher<{ start: SessionOptions }>();

  let sessionOptions: SessionOptions = clone(DEFAULT_SESSION_OPTIONS);

  function handleStartClick() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sessionOptions));
    dispatch("start", sessionOptions);
  }

  onMount(() => {
    const item = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (item) {
      sessionOptions = JSON.parse(item);
    }
  });
</script>

<div class="wrapper">
  <form class="game-options" on:submit|preventDefault={handleStartClick}>
    <label for="gamemode" class="fs-4">Type</label>
    <select
      id="gamemode"
      class="gamemode form-select form-select-lg mb-3 fs-3"
      bind:value={sessionOptions.type}
    >
      <option value="add">Addition</option>
      <option value="sub">Subtraction</option>
      <option value="mul">Multiplication</option>
      <option value="div">Division</option>
      <option value="mix">All</option>
    </select>
    <label for="difficulty" class="fs-4">Difficulty</label>
    <select
      id="difficulty"
      class="form-select form-select-lg mb-3 fs-3"
      bind:value={sessionOptions.difficulty}
    >
      <option value="easy">Easy</option>
      <option value="med">Medium</option>
      <option value="hard">Hard</option>
    </select>
    <label for="num-questions" class="fs-4">Number of Questions</label>
    <select
      id="num-questions"
      class="form-select form-select-lg mb-3 fs-3"
      bind:value={sessionOptions.numQuestions}
    >
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
      <option value={20}>30</option>
      <option value={50}>60</option>
      <option value={100}>120</option>
      <option value={200}>240</option>
    </select>
    <input
      type="submit"
      class="start btn btn-primary mb-3 fs-2"
      value="Start"
    />
  </form>
</div>

<style>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .game-options {
    display: flex;
    flex-direction: column;
    width: 400px;
    padding: 1rem;
  }
</style>
