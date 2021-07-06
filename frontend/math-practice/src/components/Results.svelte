<script lang="ts">
</script>

<div class="container">
  <div class="row">
    <div class="col-0 col-md-2 col-lg-3" />
    <div class="main col-12 col-md-8 col-lg-6">
      <h1>Results</h1>
      <div class="times-table fs-2">
        <span class="fw-bold">Total Time:</span>
        <span class="fw-bold">0:30</span>
        <span>Session type:</span>
        <span>Addition/Medium</span>
        <span>Number of questions:</span>
        <span>4</span>
        <span>Average time per question:</span>
        <span>0:30</span>
      </div>
      <h1>Fastest questions</h1>
      <div class="times-table fs-2">
        <span>12 x 12 </span>
        <span>0:32</span>
        <span>1 x 100 </span>
        <span>0:01</span>
        <span>1 + 1 </span>
        <span>0:32</span>
        <span>11 * 12 </span>
        <span>0:01</span>
        <span>1 + 10 </span>
        <span>0:10</span>
      </div>
      <h1>Slowest questions</h1>
      <div class="times-table fs-2">
        <span>12 x 12 </span>
        <span>0:32</span>
        <span>1 x 100 </span>
        <span>0:01</span>
        <span>1 + 1 </span>
        <span>0:32</span>
        <span>11 * 12 </span>
        <span>0:01</span>
        <span>1 + 10 </span>
        <span>0:10</span>
      </div>
      <button class="btn btn-primary fs-4">Return to homepage</button>
    </div>
    <div class="col-0 col-md-2 col-lg-3" />
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
  .times-table {
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 1rem;
    align-items: center;
    justify-items: start;

    margin-bottom: 1rem;
  }
</style>
