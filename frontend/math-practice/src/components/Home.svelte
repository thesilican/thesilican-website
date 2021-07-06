<script lang="ts">
</script>

<div class="wrapper">
  <form class="game-options" on:submit|preventDefault={() => alert("hi")}>
    <label for="gamemode" class="fs-4">Game Mode</label>
    <select id="gamemode" class="gamemode form-select form-select-lg mb-3 fs-3">
      <option>Addition</option>
      <option>Subtraction</option>
      <option>Multiplication</option>
      <option>Division</option>
      <option>All</option>
    </select>
    <label for="difficulty" class="fs-4">Difficulty</label>
    <select id="difficulty" class="form-select form-select-lg mb-3 fs-3">
      <option>Easy</option>
      <option>Medium</option>
      <option>Hard</option>
    </select>
    <label for="num-questions" class="fs-4">Number of Questions</label>
    <select id="num-questions" class="form-select form-select-lg mb-3 fs-3">
      <option>5</option>
      <option>10</option>
      <option>20</option>
      <option>50</option>
      <option>100</option>
      <option>200</option>
      <option>500</option>
      <option>1000</option>
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
