import insertUrlParams, {
  TParamObj,
  TParam,
} from '../dist/esm';


// **** Variables **** //

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

// Example 7
const example7 = {
  data: {
    id: 5,
    msg: 'hello',
    really: true,
    something: undefined,
    random: null,
  },
  url: '/api/v1/:id/cheese/:msg/is-good/:really/dog/cow/:something/:random',
};

// Example 8
const example8 = {
  data: '',
  url: '/api/v1/users',
};

// Example 9
const example9 = {
  data: '',
  url: '',
};

// Example 10
const example10 = {
  data: {
    id: 5,
    msg: 'hello',
    really: '',
    something: undefined,
    random: null,
    end: '',
  },
  url: '/api/v1/:id/cheese/:msg/is-good/:really/dog/cow/:something/:random/:end',
};

// Example 11
const example11 = {
  data: [5, 'hello', true, '', null],
  url: '/api/v1/:id/cheese/:msg/is-good/:really/dog/cow/:something/:random',
};


// **** Types **** //

interface IExample {
  data: TParamObj | TParam[] | TParam;
  url: string;
}


// **** Run **** //

// Similar
_printExample(example1);
_printExample(example2);
_printExample(example3);
_printExample(example4);
// printExample(example5);
// printExample(example6 as any);
_printExample(example7)
_printExample(example8)
_printExample(example9)
_printExample(example10);
_printExample(example11);


// **** Functions **** //

/**
 * Print Examples
 */
function _printExample(example: IExample): void {
  const url = insertUrlParams(example.url, example.data);
  console.log(url);
}
