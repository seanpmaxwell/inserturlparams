# About inserturlparams

Insert dynamic data in url path params. Works client side or in NodeJS. Really useful
for fullstack Typescript/Javascript projects where you store large numbers of long urls 
such as in React/Express projects.

- This was written in Typescript and recommended for use with that.


#### How it works

- It replaces any part of a url that starts with `/:`. i.e. `/api/v1/:param/hello` 
with a primitive from an array.

- Sample code:

```typescript
  import insertUrlParams from 'insertUrlParams';

  // **NOTE** that the array must be in the order that you intend to replace them in the url
  const data = [5, 'hello', true, undefined, null];
  const url = '/api/v1/:id/cheese/:msg/is-good/:really/dog/cow/:something/:random';

  // Format url
  const resp = insertUrlParams(url, data);
  console.log(resp) `=> /api/v1/5/cheese/hello/is-good/true/dog/cow/undefined/null`
```

#### Note from the author

- This is a simple library but a long function that I needed to use in the front-end 
(React) and the back-end (ExpressJS). Plus I hadn't written a client side library yet
so this gave me some practice with `rollup.js`. In my front-end I had a large `Routes.ts` file 
and for readability I wanted to store the routes there the same as how they appeared 
in express, that is with `/:` inside the url. This required me to format the url before 
each api call though so I wrote this function to do just that.

Happy web-deving :)
