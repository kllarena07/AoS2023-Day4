<script lang="ts">
  import { heartRateStream } from '$lib/index'
	import { onDestroy } from 'svelte';

  type HeartRate = {
	  heartRate: string;
  };

  type HeartRateLog = HeartRate[]

  let heartRateLog: HeartRateLog = []

  type HeartRateStream = () => Promise<HeartRate>

  const handleData = async (dataStream: HeartRateStream) => {
    const response = await dataStream()
    heartRateLog = [...heartRateLog, response]
  }

  $: logLength = heartRateLog.length

  const unsubscribe = heartRateStream.subscribe((val) => {
    handleData(val.stream)
  })

  onDestroy(unsubscribe)
</script>

<main>
  <h1>Day 4 Advent of Svelte: Santa Heart Rate Logger</h1>
  <p>Live logging of Santa's heart rate</p>
  <table>
    <tr>
      <th>Time</th>
      <th>Heart Rate</th>
    </tr>
    {#each Array(logLength) as _, i}
      <tr>
        <td>{new Date()}</td>
        <td>{heartRateLog[i].heartRate}</td>
      </tr>
    {/each}
  </table>
</main>

<style>
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  
  tr:nth-child(even) {
    background-color: #dddddd;
  }
</style>