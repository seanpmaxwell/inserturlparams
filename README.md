# About inserturlparams

Insert dynamic data in url path params. Works client side or in NodeJS. Really useful
for fullstack Typescript/Javascript where you store large numbers of long urls such as 
in React/Express projects.


#### How it works

- It replaces any part of a url that starts with `/:`. i.e. `/api/v1/:param`.


```typescript
  import insertUrlParams from 'insertUrlParams';


  // Setup params
  const data = [5, 'hello', true, undefined, null];
  const url = '/api/v1/:id/cheese/:msg/is-good/:really/dog/cow/:something/:random';

  // Format url
  const resp = insertUrlParams(url, data);
  console.log(resp) `=> /api/v1/5/cheese/hello/is-good/true/dog/cow/undefined/null`
```
