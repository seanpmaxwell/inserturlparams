// import insertUrlParams, { TPrimitive } from './src';
import insertUrlParams, { TPrimitive } from './dist';


// **** Setup Examples **** //

const example1 = {
  data: ['hello'],
  url: '/api/v1/dude/:msg/dog',
};

const example2 = {
  data: 'hello',
  url: '/api/v1/dude/:msg/dog',
};

const example3 = {
  data: [],
  url: '/api/v1/dude/cheese/dog',
};

const example4 = {
  data: [5, 'hello', true, undefined, null],
  url: '/api/v1/:id/cheese/:msg/is-good/:really/dog/cow/:something/:random',
};

// Should throw err
const example5 = {
  data: [5, 'hello', null],
  url: '/api/v1/:id/cheese/:msg/is-good/:really/dog/cow/:something/:random',
};

// Should throw err
const example6 = {
  data: 'hello',
  url: 1234,
};


// **** Print Examples **** //

printExample(example1);
printExample(example2);
printExample(example3);
printExample(example4);
printExample(example5);
printExample(example6 as any);


// **** Types **** //

interface IExample {
  data: TPrimitive | TPrimitive[];
  url: string;
}


// **** Shared **** //

function printExample(example: IExample): void {
  console.log(insertUrlParams(example.url, example.data));
}
