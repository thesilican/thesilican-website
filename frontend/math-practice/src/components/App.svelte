<script lang="ts">
  import Header from "./Header.svelte";

  import Home from "./Home.svelte";
  import Results from "./Results.svelte";
  import Session from "./Session.svelte";
</script>

<div class="wrapper">
  <Header />
  <!-- <Home /> -->
  <!-- <Session /> -->
  <Results />
</div>

<!-- <MathPractice /> -->
<style>
  :global(html),
  :global(body) {
    height: 100vh;
  }

  .wrapper {
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-rows: auto 1fr;
    align-items: stretch;
    justify-items: stretch;
  }
</style>
