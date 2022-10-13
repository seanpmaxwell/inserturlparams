// **** Variables **** //

const incorrectNumOfParamsErr = 'Supplied number of params does not match ' + 
  'number of url params';
const urlNotAStringErr = 'url must be a string';


// **** Types **** //

export type TPrimitive = string | number | boolean | null | undefined;


// **** Functions **** //

/**
 * Change '/api/:userId/something' => "/api/1/something"
 */
function insertUrlParams(
  url: string, 
  params: TPrimitive | TPrimitive[],
): string {
  // Check url
  if (typeof url !== 'string') {
    throw Error(urlNotAStringErr);
  }
  // Convert to array if not one.
  if (!(params instanceof Array)) {
    params = [params];
  }
  // Loop through params
  let pathParamsIdx = 0;
  let paramEnd = -1;
  let i = 0;
  while (i < url.length) {
    // New param found
    if (url[i] === '/' && url[i + 1] === ':') {
      for (let j = i + 2; j < url.length; j++) {
        if (url[j] === '/' || j === url.length - 1) {
          paramEnd = j;
          break;
        }
      }
      const param = String(params[pathParamsIdx++]);
      const strEnd = (paramEnd === url.length - 1 ? '' : url.slice(paramEnd));
      url = (url.slice(0, i + 1) + param + strEnd);
      i = (i + param.length + 1);
    // New param not found
    } else {
      i++;
    }
  }
  // Check number of params correct
  if (pathParamsIdx !== params.length) {
    throw Error(incorrectNumOfParamsErr);
  }
  // Return
  return url;
}


// **** Export default **** //

export default insertUrlParams;
