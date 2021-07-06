<script lang="ts">
</script>

<nav class="bg-dark py-2">
  <button class="back btn btn-dark" on:click={() => alert("Are you sure?")}>
    <i class="bi-arrow-left fs-2" />
  </button>
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
