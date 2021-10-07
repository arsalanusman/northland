import { loadable } from "frontity";
import pMinDelay from 'p-min-delay'
/**
 * Codesplit the post component so it's not included if the users
 * load a post directly.
 */
const delay = promise => {
    if (typeof window === 'undefined') return promise
    return pMinDelay(promise, 200)
}
export default loadable(() => import("./page"));
