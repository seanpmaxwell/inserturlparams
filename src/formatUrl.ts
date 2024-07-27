// **** Variables **** //

const Errors = {
  IncorrectNumOfParams: 'Supplied number of params does not match number ' + 
    'of url params',
  UrlNotAStr: 'Url must be a string',
  ParamInvalid: 'Invalid param value. Must be a primitive type',
} as const;


// **** Types **** //

export type TParam = string | number | boolean | null | undefined;
export type TParamObj = Record<string, TParam>;
export type TSearchParams = Record<string, TParam | TParam[]>;


// **** Functions **** //

/**
 * Main function where everything starts from.
 */
function formatUrl(
  url: string, 
  pathParams: TParamObj | TParam[] | TParam,
  searchParams?: TSearchParams,
): string {
  // Check url
  if (typeof url !== 'string') {
    throw Error(Errors.UrlNotAStr);
  }
  // Setup params
  let retVal = _insertPathParams(url, pathParams);
  const searchParamsStr = _formatSearchParams(searchParams);
  retVal += searchParamsStr;
  // Return
  return retVal;
}

/**
 * Change '/api/:userId/something' => "/api/1/something"
 */
function _insertPathParams(
  url: string, 
  pathParamsArg: TParamObj | TParam[] | TParam,
): string {
  // Skip empty-string
  if (pathParamsArg === '') {
    return url;
  }
  // Convert to array if a primitive.
  let pathParams: TParamObj | TParam[];
  if (!!pathParamsArg && typeof pathParamsArg === 'object') {
    pathParams = pathParamsArg;
  } else {
    pathParams = [pathParamsArg];
  }
  // Loop through params
  let paramArrIdx = 0;
  let paramEnd = -1;
  let i = 0;
  while (i < url.length) {
    // New param found
    if (url[i] === '/' && url[i + 1] === ':') {
      // Get param end
      let urlEndReached = false;
      for (let j = i + 2; j < url.length; j++) {
        if (j === url.length - 1) {
          urlEndReached = true;
        }
        if (url[j] === '/' || urlEndReached) {
          paramEnd = j;
          break;
        }
      }
      // Get the param key
      const j = (urlEndReached ? paramEnd + 1 : paramEnd),
        paramKey = url.slice(i + 2, j);
      // Get param value
      let val;
      if (Array.isArray(pathParams)) {
        val = pathParams[paramArrIdx++]
      } else {
        val = pathParams[paramKey];
      }
      // Skip empty string
      if (val === '') {
        val = ':' + paramKey;
      }
      // Check valid (incase not using typescript)
      if (!_checkPathParamValid(val)) {
        throw Error(Errors.ParamInvalid)
      } else {
        val = String(val);
      }
      // Splice in the value
      const urlRemaining = (urlEndReached ? '' : url.slice(paramEnd));
      url = (url.slice(0, i + 1) + val + urlRemaining);
      i = (i + val.length + 1);
    // New param not found
    } else {
      i++;
    }
  }
  // Check number of params correct
  if (Array.isArray(pathParams) && (paramArrIdx !== pathParams.length)) {
    throw Error(Errors.IncorrectNumOfParams);
  }
  // Return
  return url;
}

/**
 * Check param a valid value.
 */
function _checkPathParamValid(val: unknown): boolean {
  return (
    val === undefined ||
    val === null || 
    typeof val === 'string' ||
    typeof val === 'number' || 
    typeof val === 'boolean'
  );
}

/**
 * Setup url params { id: 1, offerType: true } => "?id=1&offerType=true". Note 
 * that undefined, empty strings, and empty arrays will be skipped. Array 
 * values will be converted to strings and joined by ','. "null" will still be
 * included.
 */
function _formatSearchParams(searchParams?: TSearchParams) {
  // Check object
  if (typeof searchParams !== 'object') {
    return '';
  }
  // Loop through params
  let retVal = '';
  for (const key in searchParams) {
    const val = searchParams[key];
    if (!_checkIncludeSearchParam(val)) {
      continue;
    }
    const valF = (Array.isArray(val) ? _formatArr(val) : String(val));
    if (valF.length > 0) {
      retVal += '&' + (key + '=' + valF);
    }
  }
  // Append '?'
  if (!!retVal) {
    retVal = '?' + retVal.slice(1);
  }
  // Return
  return retVal;
}

/**
 * Check to include a search param
 */
function _checkIncludeSearchParam(param: unknown): boolean {
  if (param === undefined || param === '') {
    return false;
  }
  if (Array.isArray(param) && param.length > 0) {
    return true;
  }
  return (
    typeof param === 'string' ||
    typeof param === 'number' ||
    typeof param === 'boolean' || 
    param === null
  );
}

/**
 * Can't do a simple Array.join() cause need to exclude undefined, empty
 * strings, but do need to include null.
 */
function _formatArr(arr: TParam[]): string {
  let retVal = '';
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    if (!_checkInclueArrVal(val)) {
      continue;
    }
    retVal += (String(val) + ',');
  }
  return retVal.slice(0, -1); ;
}

/**
 * Check whether a value in a search-params array should be included
 */
function _checkInclueArrVal(item: unknown): boolean {
  if (item === '') {
    return false;
  }
  return (
    typeof item === 'string' ||
    typeof item === 'boolean' || 
    typeof item === 'number' || 
    item === null
  )
}

/**
 * Provide an existing query-params string, and append some extra queryParams.
 */
export function appendSearchParams(url: string, searchParams: TSearchParams) {
  const newStr = _formatSearchParams(searchParams);
  if (!!url && !!newStr) {
    if (url.includes('?')) {
      return url + '&' + newStr.slice(1);
    } else {
      return url + newStr;
    }
  } else if (!!url && !newStr) {
    return url;
  } else if (!url && !!newStr) {
    return newStr;
  } else {
    return '';
  }
}


// **** Export default **** //

export default formatUrl;
