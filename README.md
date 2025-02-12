# WXT Repro

## Source files

```plaintext
/entrypoints
  content.ts
worker.ts
```

`entrypoints/content.ts`:

```ts
import Worker from '../worker?worker&inline'

export default defineContentScript({
  matches: ['https://*/*'],
  main() {
    new Worker()
  }
});
```

`worker.ts`:

```ts
console.log('From worker')
```

## Steps to reproduce

1. Run `pnpm dev`
2. Side-load the extension in Chrome
3. Open the console in a tab and navigate to any page

## Expected behavior

No error.

## Actual behavior

```plaintext
Uncaught ReferenceError: content is not defined
```

## Potential issue

`worker.ts` is transformed into

```js
(function() {
  "use strict";
  console.log("From worker");
  content;
})();
content;
```

Where `content` is not defined.
