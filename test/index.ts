import insertUrlParams, {
  TParamObj,
  TParam,
  TSearchParams,
  appendSearchParams,
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
  searchParams: {
    horse: 'ed',
    really: true,
    something: undefined,
    foo: '',
    sso: 100,
    random: null,
    blah: ['hi', 'how', 'are', 5, null, undefined, false]
  },
};

// Example 8
const example8 = {
  data: '',
  url: '/api/v1/users',
  searchParams: {
    horse: 'ed',
    random: null,
    blah: [undefined]
  },
};

// Example 9
const example9 = {
  data: '',
  url: '',
  searchParams: {
    horse: 'ed',
    random: null,
    blah: [undefined]
  },
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

// Additional Params
const additionalParams = {
  cheetah: 'cheese',
  nike: null,
  somearr: [undefined, 11, true]
}


// **** Types **** //

interface IExample {
  data: TParamObj | TParam[] | TParam;
  url: string;
  searchParams?: TSearchParams;
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
_printExample(example8, additionalParams)
_printExample(example9, additionalParams)
_printExample(example10);
_printExample(example11);
_printExample(example9, additionalParams)
console.log(appendSearchParams('a.com/api/v1', { dog: 'fido' }))
console.log(appendSearchParams('a.com/api/v1?horse=ed', { dog: 'fido' }))

// README Stuff
// const searchParams = {
//   dog: 'foo',
//   daisy: ['doo', 5, false, '', null, undefined, '', '', ''],
//   blah: '',
//   something: null,
//   else: undefined,
// }
// const resp4 = insertUrlParams('/api/v1/:id/cheese', 5, searchParams);
// console.log(resp4);


// const searchParams2 = {
//   dog: 'foo',
//   else: undefined,
// }
// const resp5 = insertUrlParams('/api/v1/cheese', '', searchParams2);
// console.log(resp5);


// **** Functions **** //

/**
 * Print Examples
 */
function _printExample(example: IExample, toAppend?: TSearchParams): void {
  let url = insertUrlParams(example.url, example.data, example.searchParams);
  if (!!toAppend) {
    url = appendSearchParams(url, toAppend);
  }
  console.log(url);
}
