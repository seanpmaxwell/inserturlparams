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


// **** Functions **** //

/**
 * Main function where everything starts from.
 */
function formatUrl(
  url: string, 
  pathParams: TParamObj | TParam[] | TParam,
): string {
  // Check url
  if (typeof url !== 'string') {
    throw Error(Errors.UrlNotAStr);
  }
  // Return
  return _insertPathParams(url, pathParams);
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


// **** Export default **** //

export default formatUrl;
