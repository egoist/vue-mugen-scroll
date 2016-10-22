/**
* forked from https://github.com/camwiegert/in-view/blob/master/src/viewport.js
* Check whether an element is in the viewport by
* more than offset px.
*/
export default (element, {
  offset = {},
  threshold
} = {}) => {
  const {top, right, bottom, left, width, height} = element.getBoundingClientRect()

  const intersection = {
    t: bottom,
    r: window.innerWidth - left,
    b: window.innerHeight - top,
    l: right
  }

  const elementThreshold = {
    x: threshold * width,
    y: threshold * height
  }

  return intersection.t >= (offset.top || 0 + elementThreshold.y) &&
    intersection.r >= (offset.right || 0 + elementThreshold.x) &&
    intersection.b >= (offset.bottom || 0 + elementThreshold.y) &&
    intersection.l >= (offset.left || 0 + elementThreshold.x)
}
