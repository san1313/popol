const COMMON:commonType = Object.freeze({
  MIN_VIEWPORT_DESKTOP: 1024,
  MAX_VIEWPORT_MOBILE: 767,
  DEFAULT_PAGE_INDEX: 0,
})

type commonType = {
  MIN_VIEWPORT_DESKTOP: number;
  MAX_VIEWPORT_MOBILE: number;
  DEFAULT_PAGE_INDEX: number;
};
export default COMMON;