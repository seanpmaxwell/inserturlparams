// Import 
import formatUrl, {
  appendSearchParams as asp,
  TParamObj as tpo,
  TParam as tp,
  TSearchParams as tsp,
} from './formatUrl';


// Export 
export const appendSearchParams = asp;
export type TParamObj = tpo;
export type TParam = tp;
export type TSearchParams = tsp;
export default formatUrl;
