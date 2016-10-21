/**
* forked from https://github.com/camwiegert/in-view/blob/master/src/viewport.js
* Check whether an element is in the viewport by
* more than offset px.
*/
export default (element, {
  offset = {}
} = {}) => {
  const {top, right, bottom, left} = element.getBoundingClientRect()

  const intersection = {
    t: bottom,
    r: window.innerWidth - left,
    b: window.innerHeight - top,
    l: right
  }

  return intersection.t >= (offset.top || 0) &&
    intersection.r >= (offset.right || 0) &&
    intersection.b >= (offset.bottom || 0) &&
    intersection.l >= (offset.left || 0)
}
