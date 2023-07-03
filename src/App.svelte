<script lang="ts">
  import { data } from './lib/store'

  let size: number = 4
</script>

<main>
  <div class="p-6">
    {#if $data.length == 0}
      <div class="max-w-sm mx-auto mt-8">
        <div class="text-center text-4xl font-bold font-mono mb-4">
          size: {size}x{size}
        </div>
        <input type="range" min="3" max="8" step="1" bind:value={size} class="range range-primary" />
        <div class="w-full flex justify-between text-xs px-2">
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
        </div>
        <button on:click={() => data.init(size)} class="btn btn-primary w-full mt-6">Start</button>
      </div>
    {:else}
      <div class="text-center text-4xl font-bold font-mono mt-8">
        size: {size}x{size}
      </div>
      <div class="max-w-md mx-auto relative aspect-square border border-primary mt-8">
        {#each {length: size ** 2 - 1} as _, i}
          <button
            on:click={() => data.move(i)}
            class="absolute aspect-square transition"
            style="
              width: calc(100% / {size});
              left: calc(100% / {size} * {$data[i][0]});
              top: calc(100% / {size} * {$data[i][1]});
              transition-property: left, top;
            ">
            <div class="h-full flex justify-center items-center bg-primary border-base-100 border-2 rounded text-primary-content text-xl">{i + 1}</div>
          </button>
        {/each}
      </div>
    {/if}
  </div>
</main>
