const SIDEBAR: SidebarType = Object.freeze({
  SIDEBAR_WIDTH: '20vw',
  SIDEBAR_WIDTH_MOBILE: '100vw',
});

type SidebarType = {
  SIDEBAR_WIDTH: string | number;
  SIDEBAR_WIDTH_MOBILE: string | number;
};

export default SIDEBAR;