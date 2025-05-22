const COMMON:commonType = Object.freeze({
  MAX_PAGE_INDEX: 99,
  MIN_PAGE_INDEX: 0,
  DEFAULT_VIEWPORT: 1024,
  MAX_VIEWPORT_MOBILE: 767,
  DEFAULT_PAGE_INDEX: 0,
})

type commonType = {
  DEFAULT_VIEWPORT: number;
  MAX_VIEWPORT_MOBILE: number;
  DEFAULT_PAGE_INDEX: number;
};
export default COMMON;