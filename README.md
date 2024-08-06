# About inserturlparams

Insert dynamic data in url path/search params. Works client side or in NodeJS. Really 
useful for big web projects where you store large numbers of long urls.

- TypeScript supported :3


#### How it works
- It replaces any part of a url that starts with `/:`. i.e. `/api/v1/:param/hello` 
with a value from an array or object.
- `insertUrlParams(urlString, pathParams) => full-url-string`.


#### Installation
- `npm i -s inserturlparams`


#### Important
- For path-params, non-primitive values will throw errors, empty strings will be 
skipped, but `null` and `undefined` will still be included.
- For search-params, arrays and primitives are allowed: arrays can only contain 
primitives and will be join by `,`. Empty strings/arrays and `undefined` will be 
skipped but `null` will still be included.


#### Sample code:
```typescript
import insertUrlParams, {
  TParamObj,
  TParam,
  TSearchParams,
} from '../';


// Example 1: Object keys must match the param names in the url.
const data1: TParamObj = {
  id: 5,
  msg: 'hello',
  really: true,
  something: undefined,
  random: null,
};
const url1 = '/api/v1/:id/cheese/:msg/is-good/:really/dog/cow/:something/:random';
const resp1 = insertUrlParams(url1, data1);
console.log(resp1); // "/api/v1/5/cheese/hello/is-good/true/dog/cow/undefined/null"


// Example 2: NOTE The array must be in the order that you intend to replace them 
// with in the url and the length of the array must match the number of params.
const data2: TParam[] = [5, 'hello', true, undefined, null];
const url2 = '/api/v1/:id/cheese/:msg/is-good/:really/dog/cow/:something/:random';
const resp2 = insertUrlParams(url2, data2);
console.log(resp2); // "/api/v1/5/cheese/hello/is-good/true/dog/cow/undefined/null"


// Example 3: You can use a single primtive.
const resp3 = insertUrlParams('/api/v1/:id/cheese', 5);
console.log(resp3); // "/api/v1/5/cheese";
```


#### Note from the author
- This is a simple library but a long function that I needed to use in the front-end 
(React) and the back-end (ExpressJS). Plus I hadn't written a client side library yet
so this gave me some practice with `rollup.js`. In my front-end I had a large `Routes.ts` file 
and for readability I wanted to store the routes there the same as how they appeared 
in express, that is with `/:` inside the url. This required me to format the url before 
each api call though so I wrote this function to do just that.

Happy web-deving :)
