// ==UserScript==
// @name         Temu: Always Sort by Price↗️Low→High (SPA-aware)
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Auto-sort temu.com results by Price low→high on full reloads and in-app searches
// @match        https://www.temu.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const TOGGLE_CLASS = '._1IIB2fxD';
  const OPTION_CLASS = '._1VM4cdvr';
  const SORT_PREFIX  = 'Sort by:';
  const TARGET_TEXT  = 'Price low to high';

  function clickPriceSort() {
    const toggle = [...document.querySelectorAll(`span${TOGGLE_CLASS}`)]
      .find(el => el.textContent.trim().startsWith(SORT_PREFIX));
    if (!toggle || !toggle.textContent.includes('Relevance')) return;

    toggle.click();
    setTimeout(() => {
      const opt = [...document.querySelectorAll(`span${OPTION_CLASS}`)]
        .find(el => el.textContent.trim() === TARGET_TEXT);
      if (opt) opt.click();
    }, 150);
  }

  // History API hooks
  for (let fn of ['pushState','replaceState']) {
    const orig = history[fn];
    history[fn] = function(...args) {
      const ret = orig.apply(this, args);
      clickPriceSort();
      return ret;
    };
  }
  window.addEventListener('popstate', clickPriceSort);

  // URL-change poll
  let lastHref = location.href;
  setInterval(() => {
    if (location.href !== lastHref) {
      lastHref = location.href;
      clickPriceSort();
    }
  }, 500);

  // Initial sort + header observer
  clickPriceSort();
  const header = document.querySelector('div[data-test="search-sort-bar"]') || document.body;
  const obs = new MutationObserver(mr => {
    for (let m of mr) {
      if (m.addedNodes.length || m.type==='characterData') {
        clickPriceSort();
        if ([...document.querySelectorAll(`span${TOGGLE_CLASS}`)]
              .some(el => el.textContent.trim() === `${SORT_PREFIX} ${TARGET_TEXT}`)) {
          obs.disconnect();
        }
        break;
      }
    }
  });
  obs.observe(header, { childList:true, subtree:true, characterData:true });
})();
