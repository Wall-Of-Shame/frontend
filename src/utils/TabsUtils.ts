export function hideTabs() {
  const tabsEl = document.querySelector("ion-tab-bar");
  if (tabsEl) {
    tabsEl.hidden = true;
  }
}

export function showTabs() {
  const tabsEl = document.querySelector("ion-tab-bar");
  if (tabsEl) {
    tabsEl.hidden = false;
  }
}
