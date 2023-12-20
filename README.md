# My Personal Attempt at the Day 4 challenge of Advent of Svelte

It uses an exported readable that is updated every second and can be imported from `$lib/index.ts`

The readable returns a `Promise` that is then `awaited` on the client side to be handled
