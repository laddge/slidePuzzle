<script lang="ts">
  import { data } from './lib/store.ts'
  data.init(4)
  console.log($data)
</script>

<main>
  {$data}
</main>
