// **** Variables **** //

const incorrectNumOfParamsErr = 'Supplied number of params does not match ' + 
  'number of url params';
const urlNotAStringErr = 'url must be a string';


// **** Types **** //

export type TPrimitive = string | number | boolean | null | undefined;
export type TObject = Record<string, TPrimitive>;


// **** Functions **** //

/**
 * Change '/api/:userId/something' => "/api/1/something"
 */
function insertUrlParams(
  url: string, 
  params: TPrimitive | TPrimitive[] | TObject,
): string {
  // Check url
  if (typeof url !== 'string') {
    throw Error(urlNotAStringErr);
  }
  // Convert to array if a primitive.
  if (typeof params !== 'object') {
    params = [params];
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
      // Get param value
      let val;
      if (params instanceof Array) {
        val = params[paramArrIdx++]
      } else {
        const j = (urlEndReached ? paramEnd + 1 : paramEnd);
        const paramKey = url.slice(i + 2, j);
        val = (params as TObject)[paramKey];
      }
      const param = String(val);
      // Splice in the value
      const urlRemaining = (urlEndReached ? '' : url.slice(paramEnd));
      url = (url.slice(0, i + 1) + param + urlRemaining);
      i = (i + param.length + 1);
    // New param not found
    } else {
      i++;
    }
  }
  // Check number of params correct
  if (params instanceof Array && paramArrIdx !== params.length) {
    throw Error(incorrectNumOfParamsErr);
  }
  // Return
  return url;
}


// **** Export default **** //

export default insertUrlParams;
