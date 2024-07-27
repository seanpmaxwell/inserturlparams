const insertUrlParams = require('../').default;

const example = {
  data: [5, 'hello', true, undefined, null],
  url: '/api/v1/:id/cheese/:msg/is-good/:really/dog/cow/:something/:random',
};

console.log(insertUrlParams(example.url, example.data));
