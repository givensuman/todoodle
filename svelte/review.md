## Overall - 8/10
Overall I kind of liked Svelte. It feels most comparable so far to Vue3, but with more of a focus on being close to vanilla JavaScript, i.e. reactive state is simply a `let` rather than an import like `ref` or `useState`.

## Documentation/Help - 9/10
Svelte has pretty good documentation. There is a guided tutorial, playground, and reference page. There isn't as much help out there as there is with other frameworks, but there was a respectable amount.

## API - 8/10
I did run into issues with reactively setting state into localStorage. Unlike other frameworks, Svelte wanted to write to localStorage the initial values of state, which effectively erased localStorage. I think I appreciate the intuitive control something like `watch` or `useEffect` offered, even if it is more code.

I was really surprised at how extensive the API for Svelte is. There are animation controls, accessibility warnings, built-in debugging, etc.