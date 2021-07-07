<script lang="ts">
  import type { AppState, Session, SessionOptions } from "../lib";
  import Header from "./Header.svelte";
  import HomeView from "./Home.svelte";
  import ResultsView from "./Results.svelte";
  import SessionView from "./Session.svelte";

  let appState: AppState = "home";
  let sessionOptions: SessionOptions | null = null;
  let completedSession: Session | null = null;

  function handleSessionStart(e: CustomEvent<SessionOptions>) {
    sessionOptions = e.detail;
    appState = "session";
  }
  function handleSessionFinish(e: CustomEvent<Session>) {
    completedSession = e.detail;
    appState = "results";
  }
  function handleNavigateHome() {
    appState = "home";
  }
</script>

<div class="wrapper">
  <Header {appState} on:back={handleNavigateHome} />
  {#if appState === "home"}
    <HomeView on:start={handleSessionStart} />
  {:else if appState === "session"}
    <SessionView {sessionOptions} on:finish={handleSessionFinish} />
  {:else if appState === "results"}
    <ResultsView session={completedSession} on:back={handleNavigateHome} />
  {/if}
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
