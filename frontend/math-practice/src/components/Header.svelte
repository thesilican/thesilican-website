<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { AppState } from "../lib";

  const dispatch = createEventDispatcher<{ back: null }>();

  export let appState: AppState;
  $: showBackButton = appState !== "home";

  function handleBackClick() {
    if (appState === "session") {
      const confirmExit = confirm(
        "Are you sure you want to quit your current session?"
      );
      if (!confirmExit) {
        return;
      }
    }
    dispatch("back", null);
  }
</script>

<nav class="bg-dark py-2">
  {#if showBackButton}
    <button class="back btn btn-dark" on:click={handleBackClick}>
      <i class="bi-arrow-left fs-2" />
    </button>
  {:else}
    <span />
  {/if}
  <h1 class="my-2 fw-normal text-light text-center fs-1">
    Mental Math Practice
  </h1>
  <span />
</nav>

<style>
  nav {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .back {
    position: absolute;
    left: 0;
    margin-left: 0.5rem;
    justify-self: start;
  }
</style>
