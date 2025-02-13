import * as PIAS_DATA from "./import/data/plateforme-data.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
var customViewportCorrectionVariable = "vh";
function setViewportProperty(doc) {
  var prevClientHeight;
  var customVar = "--" + customViewportCorrectionVariable;
  function handleResize() {
    var clientHeight = doc.clientHeight;
    if (clientHeight === prevClientHeight) return;
    requestAnimationFrame(function updateViewportHeight() {
      doc.style.setProperty(customVar, clientHeight * 0.01 + "px");
      prevClientHeight = clientHeight;
    });
  }
  handleResize();
  return handleResize;
}
window.addEventListener("resize", setViewportProperty(document.documentElement));
const docHTML = document.documentElement;
window.requestAnimationFrame = function() {
  return window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
    window.setTimeout(callback, 1e3 / 60);
  };
}();
window.performance = window.performance || {};
performance.now = function() {
  return performance.now || performance.webkitNow || function() {
    return (/* @__PURE__ */ new Date()).getTime();
  };
}();
const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
function clearTextSelection() {
  if (window.getSelection) {
    window.getSelection().removeAllRanges();
  } else if (document.selection) {
    document.selection.empty();
  }
}
function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}
function removeAllNodes(elements) {
  elements.forEach((el) => {
    el.remove();
  });
}
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
function isChildOf(el, elParent) {
  while ((el = el.parentNode) && el !== elParent) ;
  return !!el;
}
function eventAtTransitionEnd(elem, func, options = { property: false, once: true, debug: false }) {
  if (!options.property) {
    elem.addEventListener("transitionend", () => {
      func();
    }, { once: options.once });
  } else {
    elem.addEventListener("transitionend", (ev) => {
      if (ev.propertyName == options.property) {
        func();
      }
    }, { once: options.once });
  }
  if (options.debug) {
    elem.addEventListener("transitionend", (ev) => {
      console.debug("tr end: " + ev.propertyName + (options.property ? " (selected)" : ""));
    });
  }
  var isNotAlready = true;
  trEndAlready.forEach((e) => {
    isNotAlready &= e == elem ? false : true;
  });
  if (isNotAlready) {
    trEndAlready.push(elem);
    elem.childNodes.forEach((el) => {
      el.addEventListener("transitionend", (ev) => {
        ev.stopPropagation();
      });
    });
  }
}
var trEndAlready = [];
function animateScrollToFollowElement(elementTarget, elementScrollerRef, elementScroller, duration = 850, reach = 1) {
  let timeStart = performance.now(), durationElapsed = 0;
  function loopAnim() {
    durationElapsed = performance.now() - timeStart;
    if (durationElapsed <= duration) {
      elementScroller.scrollTo({
        top: lerp(
          elementScrollerRef.getBoundingClientRect().top * -1,
          elementTarget.offsetTop,
          Math.min(1, durationElapsed / (duration * reach))
        ),
        behavior: "instant"
      });
      requestAnimationFrame(loopAnim);
      return;
    }
  }
  loopAnim();
}
let ANAP = {
  elements: {
    themeSwitcher: document.querySelectorAll(".anap-theme-switcher"),
    searchInputsLinked: document.querySelectorAll("input[data-anap-id='search-input'][data-anap-search-link-id]"),
    searchButtonsLinked: document.querySelectorAll("button[data-anap-id='search-button'][data-anap-search-link-id]")
  },
  theme: {
    names: ["light", "dark"],
    current: 1,
    force: false,
    // isUserDark : boolean
    init: (setValue = void 0) => {
      ANAP.theme.isUserDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (ANAP.theme.isUserDark) {
        ANAP.theme.switch(1);
      } else {
        ANAP.theme.switch(0);
      }
      if (ANAP.elements.themeSwitcher) {
        ANAP.elements.themeSwitcher.forEach((el) => {
          el.addEventListener("click", (ev) => {
            ANAP.theme.switch();
          });
        });
      }
    },
    switch: (setValue = void 0) => {
      ANAP.theme.current = setValue != void 0 ? setValue : ANAP.theme.current + 1;
      if (ANAP.theme.current >= ANAP.theme.names.length) {
        ANAP.theme.current = 0;
      }
      docHTML.setAttribute("data-anap-theme", ANAP.theme.names[ANAP.theme.current]);
    }
  },
  search: {
    linked: {
      init: (keyEnterSend = true) => {
        if (ANAP.elements.searchInputsLinked.length != 0 && ANAP.elements.searchButtonsLinked.length != 0) {
          if (ANAP.elements.searchInputsLinked.length > 0 && ANAP.elements.searchButtonsLinked.length > 0) {
            ANAP.elements.searchInputsLinked.forEach((searchInput) => {
              const searchID_Input = searchInput.getAttribute("data-anap-search-link-id");
              let areCorresponding = false;
              ANAP.elements.searchButtonsLinked.forEach((searchButton) => {
                const searchID_Button = searchButton.getAttribute("data-anap-search-link-id");
                if (searchID_Input.localeCompare(searchID_Button) == 0) {
                  areCorresponding = true;
                  searchButton.addEventListener("click", () => {
                    ANAP.search.linked.triggerSearch(
                      searchInput.value,
                      PIAS.APP.results.search.generate,
                      PIAS.APP.results.search.setup,
                      PIAS.APP.results.search.condition
                    );
                  });
                  if (keyEnterSend) {
                    searchInput.addEventListener("keydown", (e) => {
                      if (e.key === "Enter") {
                        ANAP.search.linked.triggerSearch(
                          searchInput.value,
                          PIAS.APP.results.search.generate,
                          PIAS.APP.results.search.setup,
                          PIAS.APP.results.search.condition
                        );
                      }
                    });
                  }
                }
              });
              if (!areCorresponding) {
                console.error("[ANAP.search] Couldn't find corresponding linked search button for : " + searchID_Input);
              }
            });
          } else {
            console.warn("[ANAP.search] Missing linked elements", ANAP.elements.searchInputsLinked, ANAP.elements.searchButtonsLinked);
          }
        }
      },
      triggerSearch: (inputSearch, callbackGenerate, callbackSetup, condition = true) => {
        if (condition === true || condition === false) {
          if (!condition) {
            return;
          }
        } else if (!condition()) {
          return;
        }
        if (callbackSetup) {
          callbackSetup();
        }
        const fichesKeys = PIAS.APP.fiches.getFichesKeysFromSearchInput(inputSearch);
        if (callbackGenerate) {
          callbackGenerate(fichesKeys);
        }
      }
    }
  }
};
let PIAS = {
  introVideoByThemes: [
    "assets/intro/intro-proto2-light.mp4",
    "assets/intro/intro-proto2-dark.mp4"
  ],
  introDuration: 5e3,
  introTransitionDuration: 2e3,
  viewportWidthBreakpoints: {
    tablet: 900,
    mobile: 400
  },
  viewportHeightBreakpoint: 700,
  // rect : { w, h, top, left }
  honeycomb: {
    tileRealSize: { w: 420, h: 728 },
    // tileAspectRatio : float
    // tileSize : { w, h }
    // tileSizeSelect : integer
    tileSizesWidth: {
      desktop: [85, 60],
      tablet: [70, 60],
      mobile: [60, 60]
    },
    // itemCount : integer
    blobs: {
      active: true,
      activeLayoutRelative: false,
      nb: 8,
      duration: 1e4,
      colorNbRand: 3,
      sizeRand: [200, 800]
    },
    blobFollow: {
      active: true,
      activeLayoutRelative: false,
      touch: false,
      size: 300,
      hoveringScale: 2.5
    },
    menu: {
      animClassDelay: 1e3,
      actionsClassDelayAdd: 1e3
    }
  },
  fiches: {
    // prevScrollPos : integer
    // prevScrollHeight : integer
    // currentFicheSmallOpen : element
    // forceBackExit : false
  },
  elements: {
    main: document.querySelector(".plateforme-main-container"),
    introVideoElement: document.querySelector(".plateforme-intro video"),
    honeycombWrapper: document.querySelector(".plateforme-honeycomb > wrapper"),
    honeycombMenuColorContainer: document.querySelector(".plateforme-honeycomb .honeycomb-container .menu-colors"),
    honeycombBlobsContainer: document.querySelector(".plateforme-honeycomb .honeycomb-container .blobs"),
    honeycombBlobFollowContainer: document.querySelector(".plateforme-honeycomb .honeycomb-container .blobs-follow"),
    interactiveContainer: document.querySelector(".interactive-container"),
    itemMenusContainer: document.querySelector(".plateforme-menu .item-menus-container"),
    menuBackground: document.querySelector(".plateforme-menu .menu-background"),
    fichesBtnRetour: document.querySelector(".plateforme-fiches .anap-btn[data-id='close-results']"),
    fichesContainer: document.querySelector(".plateforme-fiches .fiches-container"),
    fichesContainerWrapper: document.querySelector(".plateforme-fiches .fiches-container > wrapper"),
    fichesContainerScrollerInside: document.querySelector(".plateforme-fiches .fiches-container .scroller > wrapper"),
    topBarSecondaryWrapper: document.querySelector(".plateforme-top .top-secondary"),
    topBarSecondaryTitle: document.querySelector(".plateforme-top .top-secondary wrapper[data-pias-id='title-secondary']"),
    topBarSecondaryTitleText: document.querySelector(".plateforme-top .top-secondary wrapper[data-pias-id='title-secondary'] .titre-secondaire"),
    topBarSecondarySearchBar: document.querySelector(".plateforme-top .top-secondary wrapper[data-pias-id='search-bar']"),
    topBarSecondarySearchBarInput: document.querySelector(".plateforme-top .top-secondary wrapper[data-pias-id='search-bar'] input"),
    topBarSearchBtn: document.querySelector(".plateforme-top button[data-pias-id='search-toggle']"),
    proposerProjetContainer: document.querySelector(".plateforme-proposer-projet"),
    proposerProjetSidebarWrapper: document.querySelector(".plateforme-proposer-projet .widget-container"),
    proposerProjetSideToggle: document.querySelectorAll("*[data-pias-id='proposer-projet-toggle']")
  },
  APP: {
    isTouch: "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0,
    isBrowser: {
      firefox: navigator.userAgent.toLowerCase().indexOf("firefox") >= 0,
      safari: navigator.vendor && navigator.vendor.indexOf("Apple") > -1 && navigator.userAgent && navigator.userAgent.indexOf("CriOS") == -1 && navigator.userAgent.indexOf("FxiOS") == -1
    },
    rectUpdate: () => {
      const elMainRect = PIAS.elements.main.getBoundingClientRect();
      return {
        w: elMainRect.width,
        h: elMainRect.height,
        top: elMainRect.top,
        left: elMainRect.left
      };
    },
    init: () => {
      Object.entries(PIAS.APP.isBrowser).forEach((br) => {
        if (!!br[1]) {
          docHTML.setAttribute("data-pias-is-browser", br[0].toString());
        }
      });
      if (PIAS.APP.isTouch) {
        docHTML.classList.add("deviceIsTouch");
      }
      PIAS.rect = PIAS.APP.rectUpdate();
      PIAS.honeycomb.tileAspectRatio = PIAS.honeycomb.tileRealSize.h / PIAS.honeycomb.tileRealSize.w;
      PIAS.honeycomb.tileSize = {};
      ANAP.theme.init();
      ANAP.search.linked.init();
      if (PIAS.elements.introVideoElement) {
        PIAS.elements.introVideoElement.src = PIAS.introVideoByThemes[ANAP.theme.current];
        PIAS.APP.intro.setSize();
      }
      PIAS.APP.honeycomb.tileSizeUpdate();
      function windowResizeEvents() {
        PIAS.APP.intro.setSize();
        PIAS.APP.honeycomb.tileSizeUpdate();
      }
      window.addEventListener("resize", windowResizeEvents);
      docHTML.setAttribute("data-pias-intro-state", "init");
      PIAS.APP.intro.transition();
      docHTML.setAttribute("data-pias-item-opened", "false");
      PIAS.honeycomb.itemCount = 0;
      PIAS.APP.honeycomb.placeItem();
      PIAS.elements.menuBackground.addEventListener("click", PIAS.APP.honeycomb.itemActions.close);
      PIAS.elements.fichesBtnRetour.addEventListener("click", PIAS.APP.fiches.back);
      PIAS.elements.topBarSearchBtn.addEventListener("click", PIAS.APP.topBar.searchOpenToggle);
      PIAS.elements.topBarSearchBtn.addEventListener("click", PIAS.APP.results.search.close);
      document.querySelector(".plateforme-top nav .logo-anap-nav").addEventListener("click", () => {
        if (docHTML.getAttribute("data-pias-search-opened") === "false" && docHTML.getAttribute("data-pias-fiches-results") === "false" && docHTML.getAttribute("data-pias-fiche-opened") === "false" && docHTML.getAttribute("data-pias-item-opened") === "false") {
          window.location.href = "https://anap.fr/";
          return;
        }
        PIAS.APP.fiches.back(false, true);
        PIAS.APP.honeycomb.itemActions.close();
      });
      PIAS.APP.fiches.init();
      PIAS.APP.url.init();
      if (PIAS.honeycomb.blobs.active == true) {
        PIAS.APP.honeycomb.blob.init();
      }
      if (PIAS.elements.proposerProjetSideToggle.length > 0) {
        PIAS.elements.proposerProjetSideToggle.forEach((el) => {
          el.addEventListener("click", PIAS.APP.proposerProjetSideBar.toggle);
        });
      }
      PIAS.elements.fichesContainer.scrollTo({ top: 0, behavior: "instant" });
    },
    url: {
      getKeysFromURL: () => {
        const keys = {};
        location.search.slice(1).split("&").forEach((item) => {
          let [key, value] = item.split("=");
          keys[key] = value;
        });
        return keys;
      },
      slugifyString: (inputString) => {
        return inputString.toLowerCase().replace(/\s+/g, "-").replaceAll("&", "_").replaceAll("=", "_").replaceAll("'", "_").replaceAll("é", "e").replaceAll("è", "e").replaceAll("ë", "e").replaceAll("ê", "e").replaceAll("à", "a").replaceAll("ù", "u").replaceAll("ç", "c").replace(/[^\w-]+/g, "");
      },
      // false => clear ; true => keep ; string => replace
      push: (keyTag = false, keyFiche = false) => {
        const keysFromURL = PIAS.APP.url.getKeysFromURL();
        history.replaceState({}, "", window.location.pathname);
        if (keyTag === false && keyFiche === false) {
          return;
        }
        let newURL = "?";
        if (keyTag !== false) {
          if (keyTag === true) {
            if (keysFromURL.t) {
              newURL += "t=" + keysFromURL.t;
            }
          } else {
            newURL += "t=" + PIAS.APP.url.slugifyString(keyTag);
          }
        }
        if (keyFiche !== false) {
          if (newURL.match("=")) {
            newURL += "&";
          }
          if (keyFiche === true) {
            if (keysFromURL.f) {
              newURL += "f=" + keysFromURL.f;
            }
          } else {
            newURL += "f=" + PIAS.APP.url.slugifyString(keyFiche);
          }
        }
        if (newURL.length > 2) {
          history.replaceState({}, "", newURL);
        }
      },
      openOnLoad: () => {
        const keysFromURL = PIAS.APP.url.getKeysFromURL();
        history.replaceState({}, "", window.location.pathname);
        let isValidT = false, isValidF = false;
        if (keysFromURL.t) {
          for (let i = 0; i < PIAS_DATA.HC_ITEMS.length; i++) {
            let itemLinks = PIAS_DATA.HC_ITEMS[i].menu.links;
            for (let l = 0; l < itemLinks.length; l++) {
              if (PIAS.APP.url.slugifyString(itemLinks[l]) == keysFromURL.t) {
                isValidT = true;
                PIAS.APP.results.create("tag", itemLinks[l]);
                break;
              }
            }
            if (isValidT) {
              break;
            }
          }
          if (!isValidT) {
            console.error("[PIAS.url] Key '?t' not valid : " + keysFromURL.t);
          }
        }
        if (keysFromURL.f) {
          const fichesKeys = Object.keys(PIAS_DATA.FICHES);
          for (let i = 0; i < fichesKeys.length; i++) {
            if (PIAS.APP.url.slugifyString(fichesKeys[i]) == keysFromURL.f) {
              isValidF = true;
              PIAS.APP.results.show(true, false);
              PIAS.APP.fiches.createSmall(Object.entries(PIAS_DATA.FICHES)[i], true);
              if (!isValidT) {
                PIAS.fiches.forceBackExit = true;
              }
              break;
            }
          }
          if (!isValidF) {
            console.error("[PIAS.url] Key '?f' not valid : " + keysFromURL.f);
          }
        }
      },
      init: () => {
        PIAS.APP.url.openOnLoad();
      }
    },
    proposerProjetSideBar: {
      toggle: () => {
        PIAS.elements.proposerProjetContainer.classList.toggle("active");
        clearTextSelection();
        setTimeout(() => {
          if (PIAS.elements.proposerProjetContainer.classList.contains("active")) {
            PIAS.elements.proposerProjetSideToggle.forEach((el) => {
              el.classList.add("active");
            });
            window.addEventListener("click", PIAS.APP.proposerProjetSideBar.closeIfClickOutside);
          }
        }, 50);
      },
      closeIfClickOutside: (event) => {
        if (event) {
          const check = isChildOf(event.target, PIAS.elements.proposerProjetSidebarWrapper);
          if (!check) {
            PIAS.elements.proposerProjetContainer.classList.remove("active");
            PIAS.elements.proposerProjetSideToggle.forEach((el) => {
              el.classList.remove("active");
            });
            window.removeEventListener("click", PIAS.APP.proposerProjetSideBar.closeIfClickOutside);
          }
        }
      }
    },
    intro: {
      setSize: () => {
        PIAS.rect = PIAS.APP.rectUpdate();
        PIAS.elements.introVideoElement.width = PIAS.rect.w;
        PIAS.elements.introVideoElement.height = PIAS.rect.h;
      },
      transition: () => {
        setTimeout(() => {
          docHTML.setAttribute("data-pias-intro-state", "transition");
        }, Math.max(PIAS.introDuration - PIAS.introTransitionDuration, 0));
        setTimeout(() => {
          window.removeEventListener("resize", PIAS.APP.intro.setSize);
          docHTML.setAttribute("data-pias-intro-state", "transition-finished");
          PIAS.APP.intro.callbackFinish();
        }, PIAS.introDuration);
      },
      callbackFinish: () => {
        if (PIAS.honeycomb.blobFollow.active == true) {
          if (PIAS.isTouch) {
            if (PIAS.honeycomb.blobFollow.touch) {
              PIAS.APP.honeycomb.blobFollow.init();
            }
          } else {
            if (!PIAS.honeycomb.blobFollow.activeLayoutRelative) {
              PIAS.elements.honeycombBlobFollowContainer.setAttribute("data-pias-stop", "layout-relative");
              if (PIAS.rect.w > PIAS.viewportWidthBreakpoints.tablet) {
                PIAS.APP.honeycomb.blobFollow.init();
              }
            } else {
              PIAS.APP.honeycomb.blobFollow.init();
            }
          }
        }
      }
    },
    honeycomb: {
      tileSizeUpdate: () => {
        PIAS.rect = PIAS.APP.rectUpdate();
        PIAS.honeycomb.tileSizeSelect = PIAS.rect.h > PIAS.viewportHeightBreakpoint ? 0 : 1;
        if (PIAS.rect.w < PIAS.viewportWidthBreakpoints.tablet) {
          if (PIAS.rect.w < PIAS.viewportWidthBreakpoints.mobile) {
            PIAS.honeycomb.tileSize.w = PIAS.honeycomb.tileSizesWidth.mobile[PIAS.honeycomb.tileSizeSelect];
          } else {
            PIAS.honeycomb.tileSize.w = PIAS.honeycomb.tileSizesWidth.tablet[PIAS.honeycomb.tileSizeSelect];
          }
        } else {
          PIAS.honeycomb.tileSize.w = PIAS.honeycomb.tileSizesWidth.desktop[PIAS.honeycomb.tileSizeSelect];
        }
        PIAS.honeycomb.tileSize.h = (PIAS.honeycomb.tileSize.w * PIAS.honeycomb.tileAspectRatio).toFixed(6);
        docHTML.style.setProperty("--honeycomb-tile-width", PIAS.honeycomb.tileSize.w + "px");
        docHTML.style.setProperty("--honeycomb-tile-height", PIAS.honeycomb.tileSize.h + "px");
      },
      itemMenusScrollReset: () => {
        PIAS.elements.itemMenusContainer.childNodes.forEach((el) => {
          el.scrollTo({ top: 0, behavior: "smooth" });
        });
      },
      placeItem: () => {
        PIAS_DATA.HC_ITEMS.forEach((itemData) => {
          let itemHexElement = document.createElement("div");
          itemHexElement.setAttribute("data-pias-id", PIAS.honeycomb.itemCount);
          itemHexElement.classList.add("hc-item");
          itemHexElement.innerHTML = `
                        <wrapper>
                            <div class="content-txt">
                                <wrapper>
                                    <span>${itemData.itemHex.titre ? itemData.itemHex.titre : itemData.menu.titre}</span>
                                </wrapper>
                            </div>
                            <div class="content-hex">
                                <img src="${itemData.itemHex.img}">
                            </div>
                        </wrapper>
                    `;
          itemHexElement.style.setProperty("--item-position-x", itemData.itemHex.position[0]);
          itemHexElement.style.setProperty("--item-position-y", itemData.itemHex.position[1]);
          itemHexElement.style.setProperty("--item-odd-offset", itemData.itemHex.position[1] % 2);
          itemHexElement.setAttribute(
            "data-pias-item-orientation",
            (itemData.itemHex.position[0] > 0 ? "+" : "-") + (itemData.itemHex.position[1] > 0 ? "+" : "-")
          );
          if (itemData.couleur) {
            let itemMenuColorElement = document.createElement("div");
            itemMenuColorElement.setAttribute("data-pias-id--menu", PIAS.honeycomb.itemCount);
            if (typeof itemData.couleur === "string") {
              itemData.couleurCSS_accent = itemData.couleur;
              itemData.couleurCSS_hex = itemData.couleur;
            } else {
              if (itemData.couleur.length < 2) {
                itemData.couleurCSS_accent = itemData.couleur;
                itemData.couleurCSS_hex = itemData.couleur;
              } else {
                itemData.couleurCSS_accent = itemData.couleur[0];
                itemData.couleurCSS_hex = "linear-gradient(90deg, " + itemData.couleur[0] + " 30%, " + itemData.couleur[1] + " 80%)";
              }
            }
            itemData.couleurCSS_menuBg = itemData.couleurCSS_hex;
            itemMenuColorElement.style.background = itemData.couleurCSS_hex;
            PIAS.elements.honeycombMenuColorContainer.appendChild(itemMenuColorElement);
          }
          let itemHexElementMenu = document.createElement("div");
          itemHexElementMenu.setAttribute("data-pias-id", PIAS.honeycomb.itemCount);
          itemHexElementMenu.classList.add("hc-item");
          if (!itemData.itemMenu || !itemData.itemMenu.imgBg) {
            itemHexElementMenu.setAttribute("data-pias-item-parallax", "false");
            itemHexElementMenu.innerHTML = `
                            <wrapper>
                                <div class="content-hex">
                                    <img src="${itemData.itemHex.img}">
                                </div>
                            </wrapper>
                        `;
          } else {
            itemHexElementMenu.setAttribute("data-pias-item-parallax", "true");
            if (itemData.itemMenu.fillSize) {
              itemHexElementMenu.setAttribute("data-pias-item-parallax-fillsize", itemData.itemMenu.fillSize);
            }
            if (itemData.itemMenu.parallaxAnchor) {
              itemHexElementMenu.setAttribute("data-pias-item-parallax-anchor", itemData.itemMenu.parallaxAnchor);
            }
            if (itemData.itemMenu.scale) {
              itemHexElementMenu.style.setProperty("--pias-item-parallax-scale", itemData.itemMenu.scale);
            }
            itemHexElementMenu.innerHTML = `
                            <wrapper>
                                <div class="content-hex dfc">
                                    <img src="${itemData.itemMenu.imgBg}">
                                    <div class="item-parallax fca">
                                        <img src="${itemData.itemMenu.imgParallax}">
                                    </div>
                                </div>
                            </wrapper>
                        `;
          }
          let itemMenuContainerElement = document.createElement("div");
          itemMenuContainerElement.classList.add("item-menu");
          itemMenuContainerElement.setAttribute("data-pias-id--menu", PIAS.honeycomb.itemCount);
          let itemMenuLinksHTML = "";
          if (itemData.menu.links) {
            let lCount = 0;
            itemData.menu.links.forEach((l) => {
              lCount += 1;
              itemMenuLinksHTML += '<div style="--pias-delay-add: ' + 100 * lCount + 'ms;"><div class="arrow"><div></div><svg viewBox="0 0 24 24"><polyline points="0 0 12 12 0 24"/></svg></div><div class="texte">' + l + "</div></div>";
            });
          }
          itemMenuContainerElement.innerHTML = `
                        <wrapper>
                            <div class="color-bg fca" style="${itemData.couleurCSS_menuBg ? "--menu-bg-color: " + itemData.couleurCSS_menuBg : ""}">
                                <div class="close-btn"><div class="mobile-bg-target"></div><div class="bg fca0"></div><wrapper class="icon"><svg viewBox="0 0 24 24"><line x2="24" y2="24" /><line y1="24" x2="24" /></svg></wrapper></div>
                                <div class="color fca0"></div>
                            </div>
                            <div class="sidebar">
                                <wrapper>
                                    <div class="head">
                                        <span class="titre">${itemData.menu.titre ? itemData.menu.titre : itemData.itemHex.titre}</span>
                                        ${itemData.menu.description ? "<p class='desc'>" + itemData.menu.description + "</p>" : ""}
                                    </div>
                                    <div class="content">
                                        <div class="links">
                                            ${itemMenuLinksHTML}
                                        </div>
                                    </div>
                                </wrapper>
                            </div>
                        </wrapper>
                    `;
          PIAS.elements.interactiveContainer.appendChild(itemHexElement);
          PIAS.elements.itemMenusContainer.appendChild(itemMenuContainerElement);
          itemMenuContainerElement.firstElementChild.appendChild(itemHexElementMenu);
          itemHexElement.addEventListener("click", PIAS.APP.honeycomb.itemActions.open);
          itemHexElement.addEventListener("mouseenter", PIAS.APP.honeycomb.blobFollow.hoveringYes);
          itemHexElement.addEventListener("mouseleave", PIAS.APP.honeycomb.blobFollow.hoveringNo);
          itemMenuContainerElement.querySelectorAll(".close-btn > *").forEach((el) => {
            el.addEventListener("click", PIAS.APP.honeycomb.itemActions.close);
          });
          itemMenuContainerElement.querySelectorAll(".sidebar .links > *").forEach((linkEl) => {
            linkEl.addEventListener("click", () => {
              PIAS.APP.results.create("tag", linkEl.querySelector(".texte").innerText);
            });
          });
          PIAS.honeycomb.itemCount += 1;
        });
      },
      itemActions: {
        close: () => {
          docHTML.setAttribute("data-pias-item-opened", "false");
          docHTML.style.setProperty("--pias-menu-accent-color", null);
          docHTML.style.setProperty("--pias-menu-accent-style", null);
          PIAS.elements.interactiveContainer.querySelectorAll(".hc-item").forEach((item) => {
            item.classList.remove("active");
          });
          PIAS.elements.main.querySelectorAll("*[data-pias-id--menu]").forEach((item) => {
            item.classList.remove("active");
            item.classList.remove("anim-delay");
            item.classList.remove("actions-delay");
          });
          clearTextSelection();
        },
        open: (event) => {
          const itemID = parseInt(event.target.getAttribute("data-pias-id"));
          const itemData = PIAS_DATA.HC_ITEMS[itemID];
          const itemOrientation = event.target.getAttribute("data-pias-item-orientation");
          PIAS.APP.honeycomb.itemActions.close();
          PIAS.APP.honeycomb.itemMenusScrollReset();
          event.target.classList.add("active");
          PIAS.elements.main.querySelectorAll("*[data-pias-id--menu='" + itemID + "']").forEach((item) => {
            item.classList.add("active");
          });
          const itemMenuElement = PIAS.elements.itemMenusContainer.querySelector(".item-menu[data-pias-id--menu='" + itemID + "']");
          setTimeout(() => {
            itemMenuElement.classList.add("anim-delay");
            setTimeout(() => {
              itemMenuElement.classList.add("actions-delay");
            }, PIAS.honeycomb.menu.actionsClassDelayAdd);
          }, PIAS.honeycomb.menu.animClassDelay);
          if (itemOrientation) {
            docHTML.setAttribute("data-pias-hc-orientation", itemOrientation);
          }
          docHTML.setAttribute("data-pias-item-opened", "true");
          docHTML.style.setProperty("--pias-menu-accent-color", itemData.couleurCSS_accent);
          clearTextSelection();
        }
      },
      blob: {
        init: () => {
          function animationLoop(blobEl) {
            blobEl.style.display = "none";
            setTimeout(() => {
              blobEl.style.setProperty("--pias-blob-pos-x", randomIntFromInterval(0, PIAS.rect.w) + "px");
              blobEl.style.setProperty("--pias-blob-pos-y", randomIntFromInterval(0, PIAS.rect.h) + "px");
              blobEl.style.setProperty("--pias-blob-pos-size", randomIntFromInterval(PIAS.honeycomb.blobs.sizeRand[0], PIAS.honeycomb.blobs.sizeRand[1]) + "px");
              blobEl.style.setProperty("--pias-blob-color", "var(--pias-c-honeycomb-blob-" + randomIntFromInterval(1, PIAS.honeycomb.blobs.colorNbRand) + ")");
              blobEl.style.display = null;
              setTimeout(() => {
                animationLoop(blobEl);
              }, PIAS.honeycomb.blobs.duration);
            }, Math.max(200, PIAS.honeycomb.blobs.duration - randomIntFromInterval(-1e4, PIAS.honeycomb.blobs.duration)));
          }
          if (PIAS.honeycomb.blobs.active && PIAS.elements.honeycombBlobsContainer) {
            for (let b = 1; b <= PIAS.honeycomb.blobs.nb; b++) {
              docHTML.style.setProperty("--pias-blob-duration", PIAS.honeycomb.blobs.duration + "ms");
              let blobElement = document.createElement("div");
              PIAS.elements.honeycombBlobsContainer.appendChild(blobElement);
              animationLoop(blobElement);
            }
          }
        }
      },
      blobFollow: {
        init: () => {
          function move(event) {
            PIAS.elements.blobFollowElement.style.setProperty("--pias-blob-pos-x", event.clientX - PIAS.rect.left + "px");
            PIAS.elements.blobFollowElement.style.setProperty("--pias-blob-pos-y", event.clientY - PIAS.rect.top + "px");
          }
          PIAS.elements.blobFollowElement = document.createElement("div");
          PIAS.elements.blobFollowElement.classList.add("follow");
          PIAS.elements.blobFollowElement.style.setProperty("--pias-blob-pos-size", PIAS.honeycomb.blobFollow.size + "px");
          PIAS.elements.blobFollowElement.style.setProperty("--pias-blob-hovering-scale", PIAS.honeycomb.blobFollow.hoveringScale);
          PIAS.elements.honeycombBlobFollowContainer.appendChild(PIAS.elements.blobFollowElement);
          PIAS.elements.main.addEventListener("mousemove", (e) => {
            move(e);
          });
          PIAS.elements.main.addEventListener("mouseleave", PIAS.APP.honeycomb.blobFollow.hide);
          PIAS.elements.main.addEventListener("mouseenter", PIAS.APP.honeycomb.blobFollow.show);
        },
        hide: () => {
          docHTML.classList.add("pias-blob-follow-hide");
        },
        show: () => {
          docHTML.classList.remove("pias-blob-follow-hide");
        },
        hoveringYes: () => {
          docHTML.classList.add("pias-blob-follow-hovering");
        },
        hoveringNo: () => {
          docHTML.classList.remove("pias-blob-follow-hovering");
        }
      }
    },
    fiches: {
      init: () => {
        docHTML.setAttribute("data-pias-search-opened", "false");
        docHTML.setAttribute("data-pias-fiches-results", "false");
        docHTML.setAttribute("data-pias-fiche-opened", "false");
        if (!PIAS.fiches.forceBackExit) {
          PIAS.fiches.forceBackExit = false;
        }
      },
      getFichesObjectsFromTagName: (tagName) => {
        let passFichesObjects = {};
        Object.entries(PIAS_DATA.FICHES).forEach((ficheData) => {
          if (ficheData[1].tags.includes(tagName)) {
            passFichesObjects[ficheData[0]] = ficheData[1];
          }
        });
        return passFichesObjects;
      },
      getFichesObjectsFromKeys: (fichesKeys) => {
        let passFichesObjects = {};
        fichesKeys.forEach((key) => {
          if (PIAS_DATA.FICHES[key]) {
            passFichesObjects[key] = PIAS_DATA.FICHES[key];
          } else {
            console.error("[PIAS] Fiche introuvable : " + key);
          }
        });
        return passFichesObjects;
      },
      // algorithme de recherche des fiches
      getFichesKeysFromSearchInput: (inputSearch) => {
        let foundFichesKeys = ["identifier", "id3"];
        return foundFichesKeys;
      },
      createSmall: (ficheObject, forceOpenDirectly = false) => {
        let ficheData = ficheObject[1];
        let newFicheSmall = document.createElement("div");
        newFicheSmall.classList.add("plateforme-fiche-small");
        const exists = {
          tags: ficheData.tags && ficheData.tags.length > 0,
          location: ficheData.location && ficheData.location.length > 0,
          description: ficheData.description && ficheData.description.length > 0
        };
        let htmlTags = "";
        if (exists.tags) {
          ficheData.tags.forEach((data) => {
            htmlTags += `<span class="anap-tag style-secondaire">${data}</span>`;
          });
        }
        let htmlLocation = "";
        if (exists.location) {
          htmlLocation += `<div class="location">
                        <div><svg viewBox="0 0 25 25" fill="none"><g><path d="M12.7961 19.6093C14.8295 17.7426 16.3378 16.0468 17.3211 14.5218C18.3045 12.9968 18.7961 11.6426 18.7961 10.4593C18.7961 8.64261 18.217 7.15511 17.0586 5.99678C15.9003 4.83844 14.4795 4.25928 12.7961 4.25928C11.1128 4.25928 9.69198 4.83844 8.53364 5.99678C7.37531 7.15511 6.79614 8.64261 6.79614 10.4593C6.79614 11.6426 7.28781 12.9968 8.27114 14.5218C9.25448 16.0468 10.7628 17.7426 12.7961 19.6093ZM12.7961 21.5843C12.5628 21.5843 12.3295 21.5426 12.0961 21.4593C11.8628 21.3759 11.6545 21.2509 11.4711 21.0843C10.3878 20.0843 9.42948 19.1093 8.59614 18.1593C7.76281 17.2093 7.06698 16.2884 6.50864 15.3968C5.95031 14.5051 5.52531 13.6468 5.23364 12.8218C4.94198 11.9968 4.79614 11.2093 4.79614 10.4593C4.79614 7.95928 5.60031 5.96761 7.20864 4.48428C8.81698 3.00094 10.6795 2.25928 12.7961 2.25928C14.9128 2.25928 16.7753 3.00094 18.3836 4.48428C19.992 5.96761 20.7961 7.95928 20.7961 10.4593C20.7961 11.2093 20.6503 11.9968 20.3586 12.8218C20.067 13.6468 19.642 14.5051 19.0836 15.3968C18.5253 16.2884 17.8295 17.2093 16.9961 18.1593C16.1628 19.1093 15.2045 20.0843 14.1211 21.0843C13.9378 21.2509 13.7295 21.3759 13.4961 21.4593C13.2628 21.5426 13.0295 21.5843 12.7961 21.5843ZM12.7961 12.2593C13.3461 12.2593 13.817 12.0634 14.2086 11.6718C14.6003 11.2801 14.7961 10.8093 14.7961 10.2593C14.7961 9.70928 14.6003 9.23844 14.2086 8.84678C13.817 8.45511 13.3461 8.25928 12.7961 8.25928C12.2461 8.25928 11.7753 8.45511 11.3836 8.84678C10.992 9.23844 10.7961 9.70928 10.7961 10.2593C10.7961 10.8093 10.992 11.2801 11.3836 11.6718C11.7753 12.0634 12.2461 12.2593 12.7961 12.2593Z" /></svg></div>
                        <span>${ficheData.location}</span>
                    </div>`;
        }
        newFicheSmall.innerHTML = `
                    <clicker></clicker>
                    <wrapper class="fiche-block">
                        <div class="content">
                            <div class="main">
                                <wrapper><span class="titre">${ficheData.titre}</span></wrapper>
                                ${exists.description ? `<div class="description-container">
                                        <div class="small"><p class="description">${ficheData.description}</p></div>
                                        <div class="large"><p class="description">${ficheData.description}</p></div>
                                        </div>` : ""}
                            </div>
                            ${exists.tags || exists.location ? '<div class="foot">' + htmlTags + htmlLocation + "</div>" : ""}
                        </div>
                        <div class="side">
                            <div class="arrow-container">
                                <svg class="anap-svg-stroke" viewBox="0 0 24 22" fill="none"><g><polyline points="3.71 7.85 12 16.15 20.29 7.85" /></g></svg>
                            </div>
                            <div class="logo-container"></div>
                        </div>
                    </wrapper>
                `;
        PIAS.elements.fichesContainerScrollerInside.appendChild(newFicheSmall);
        newFicheSmall.querySelector("clicker").addEventListener("click", () => {
          PIAS.APP.fiches.open(ficheObject, newFicheSmall);
        });
        newFicheSmall.querySelector(".arrow-container").addEventListener("click", PIAS.APP.fiches.back);
        if (forceOpenDirectly) {
          PIAS.APP.fiches.open(ficheObject, newFicheSmall);
        }
      },
      open: (ficheObject, ficheElement) => {
        if (ficheElement.classList.contains("active")) {
          return;
        }
        let ficheData = ficheObject[1];
        PIAS.fiches.currentFicheSmallOpen = ficheElement;
        docHTML.setAttribute("data-pias-fiche-opened", "building");
        PIAS.elements.fichesContainerScrollerInside.querySelectorAll(".plateforme-fiche-small").forEach((otherFicheSmall) => {
          if (ficheElement == otherFicheSmall) {
            return;
          }
          otherFicheSmall.style.height = otherFicheSmall.getBoundingClientRect().height + "px";
          setTimeout(() => {
            otherFicheSmall.classList.add("hide");
          }, 50);
        });
        let newFicheContent = document.createElement("div");
        newFicheContent.classList.add("plateforme-fiche-content");
        const exists = {
          logo: ficheData.logo && ficheData.logo.length > 0,
          maturation: ficheData.infosProjet.maturation && String(ficheData.infosProjet.maturation) > 0,
          infosProjetDetails: ficheData.infosProjet.details && ficheData.infosProjet.details.length > 0,
          infosProjetMeta: ficheData.infosProjet.meta && Object.keys(ficheData.infosProjet.meta).length > 0,
          infosProjetKeywords: ficheData.infosProjet.keywords && ficheData.infosProjet.keywords.length > 0,
          contacts: ficheData.contacts && ficheData.contacts.length > 0,
          timeline: ficheData.timeline && ficheData.timeline.length > 0
        };
        let htmlMaturationGraduations = "";
        if (exists.maturation) {
          let maturationGraduationsArray = [
            `<path style="fill: #da1542;" data-name="1"  d="M20.83,63.96l-20.83.72c.21,5.99,1.26,11.78,3.05,17.25l19.81-6.48c-1.19-3.63-1.89-7.48-2.03-11.5Z" />`,
            `<path style="fill: #dc1c41;" data-name="2"  d="M23.37,48.06l-19.56-7.22C1.59,46.86.27,53.31,0,60.04l20.83.81c.17-4.48,1.05-8.78,2.53-12.79Z" />`,
            `<path style="fill: #e02e3c;" data-name="3"  d="M31.88,34.19l-15.3-14.15c-4.43,4.79-8.11,10.27-10.88,16.26l18.93,8.74c1.85-4,4.3-7.65,7.26-10.85Z" />`,
            `<path style="fill: #e54038;" data-name="4"  d="M45.05,24.61l-8.74-18.93c-5.99,2.77-11.47,6.46-16.26,10.88l14.15,15.3c3.19-2.95,6.85-5.41,10.85-7.26Z" />`,
            `<path style="fill: #e74e33;" data-name="5"  d="M60.85,20.83l-.81-20.83c-6.73.26-13.18,1.58-19.2,3.8l7.22,19.56c4.01-1.48,8.31-2.36,12.79-2.53Z" />`,
            `<path style="fill: #ec672b;" data-name="6"  d="M64.15,20.83c4.48.17,8.78,1.05,12.79,2.53l7.22-19.56C78.13,1.58,71.68.26,64.95,0l-.81,20.83Z" />`,
            `<path style="fill: #ef7328;" data-name="7"  d="M88.69,5.69l-8.74,18.93c4,1.85,7.65,4.3,10.85,7.26l14.15-15.3c-4.79-4.43-10.27-8.11-16.26-10.88Z" />`,
            `<path style="fill: #f38523;" data-name="8"  d="M108.42,20.04l-15.3,14.15c2.95,3.19,5.41,6.85,7.26,10.85l18.93-8.74c-2.77-5.99-6.46-11.47-10.88-16.26Z" />`,
            `<path style="fill: #f6951e;" data-name="9"  d="M121.19,40.84l-19.56,7.22c1.48,4.01,2.36,8.31,2.53,12.79l20.83-.81c-.26-6.73-1.58-13.18-3.8-19.2Z" />`,
            `<path style="fill: #f9a31c;" data-name="10" d="M125,64.68l-20.83-.72c-.14,4.01-.84,7.87-2.03,11.5l19.81,6.48c1.79-5.47,2.84-11.26,3.05-17.25Z" />`
          ];
          for (let level = 0; level < Math.min(parseInt(ficheData.infosProjet.maturation), 10); level++) {
            htmlMaturationGraduations += maturationGraduationsArray[level];
          }
        }
        let htmlInfosProjetDetails = "";
        if (exists.infosProjetDetails) {
          ficheData.infosProjet.details.forEach((data) => {
            htmlInfosProjetDetails += `<li><p><b>${data.titre}</b><br>${data.texte}</p></li>`;
          });
        }
        let htmlInfosProjetKeywords = "";
        if (exists.infosProjetKeywords) {
          ficheData.infosProjet.keywords.forEach((data) => {
            htmlInfosProjetKeywords += `<span>${data}</span>`;
          });
        }
        let htmlContacts = "";
        if (exists.contacts) {
          ficheData.contacts.forEach((data) => {
            let htmlConnections = "";
            if (data.details && data.details.length > 0) {
              data.details.forEach((d) => {
                htmlConnections += `<p class="nb-full-height"><tcolor><b>${d.titre} :&nbsp;</b><a ${d.href && d.href.length > 0 ? `href="${d.href}"` : ""}>${d.contact}</a></tcolor></p>`;
              });
            }
            htmlContacts += `<div class="contact"><ul><li>
                            <p><b>${data.name}</b>
                            ${data.role ? "<br>" + data.role : ""}</p>
                            ${htmlConnections}
                        </li></ul></div>`;
          });
        }
        let htmlTimeline = "";
        if (exists.timeline) {
          let timelineDetails_generateChildren = function(text, _inRecursion = false) {
            htmlLists += `<li style="--anim-delay-factor: ${listCount};"><p>${text}</p></li>`;
            listCount += _inRecursion ? 0.5 : 1;
          }, timelineDetails_generateRecursive = function(dataArray, inRecursion = false) {
            dataArray.forEach((d) => {
              if (Array.isArray(d) && d.length > 0) {
                htmlLists += '<li class="indent"><ul>';
                timelineDetails_generateRecursive(d, true);
                htmlLists += "</ul></li>";
              } else {
                if (d.length < 1) {
                  return;
                }
                timelineDetails_generateChildren(d, inRecursion);
              }
            });
          };
          let htmlLists = "", listCount = 0;
          ficheData.timeline.forEach((data) => {
            htmlLists = "", listCount = 0;
            if (data.details && data.details.length > 0) {
              timelineDetails_generateRecursive(data.details);
            }
            htmlTimeline += `
                            <wrapper class="timeline-step">
                                <div class="timeline-step-title">
                                    <wrapper>
                                        <h7 class="title"><b>${data.titre}</b></h7>
                                        <div class="shape-container"><svg viewBox="0 0 45 25.98" fill="none"><path d="M45,0H0s45,25.98,45,25.98V0Z"/></svg></div>
                                    </wrapper>
                                    <div class="hex-dot-container"><svg viewBox="0 0 100 115.47"><polygon points="0 28.87 0 86.6 50 115.47 100 86.6 100 28.87 50 0 0 28.87"/></svg></svg></div>
                                </div>
                                <div class="timeline-step-list"><ul>
                                    ${htmlLists}
                                </ul></div>
                            </wrapper>
                        `;
          });
        }
        newFicheContent.innerHTML = `
                    <wrapper class="generated">

                        <div class="fiche-block" data-pias-fiche-block="infos">
                            ${exists.maturation ? `
                            <wrapper data-pias-fiche-block="maturation" title="Maturation de ${ficheData.infosProjet.maturation} sur 10">
                                <div class="maturation-graduations">
                                    <svg viewBox="0 0 125 81.93" tabindex="0" aria-label="Maturation de ${ficheData.infosProjet.maturation} sur 10">
                                        <g data-name="bg">
                                            <path data-name="10" d="M125,64.68l-20.83-.72c-.14,4.01-.84,7.87-2.03,11.5l19.81,6.48c1.79-5.47,2.84-11.26,3.05-17.25Z" />
                                            <path data-name="9"  d="M121.19,40.84l-19.56,7.22c1.48,4.01,2.36,8.31,2.53,12.79l20.83-.81c-.26-6.73-1.58-13.18-3.8-19.2Z" />
                                            <path data-name="8"  d="M108.42,20.04l-15.3,14.15c2.95,3.19,5.41,6.85,7.26,10.85l18.93-8.74c-2.77-5.99-6.46-11.47-10.88-16.26Z" />
                                            <path data-name="7"  d="M88.69,5.69l-8.74,18.93c4,1.85,7.65,4.3,10.85,7.26l14.15-15.3c-4.79-4.43-10.27-8.11-16.26-10.88Z" />
                                            <path data-name="6"  d="M64.15,20.83c4.48.17,8.78,1.05,12.79,2.53l7.22-19.56C78.13,1.58,71.68.26,64.95,0l-.81,20.83Z" />
                                            <path data-name="5"  d="M60.85,20.83l-.81-20.83c-6.73.26-13.18,1.58-19.2,3.8l7.22,19.56c4.01-1.48,8.31-2.36,12.79-2.53Z" />
                                            <path data-name="4"  d="M45.05,24.61l-8.74-18.93c-5.99,2.77-11.47,6.46-16.26,10.88l14.15,15.3c3.19-2.95,6.85-5.41,10.85-7.26Z" />
                                            <path data-name="3"  d="M31.88,34.19l-15.3-14.15c-4.43,4.79-8.11,10.27-10.88,16.26l18.93,8.74c1.85-4,4.3-7.65,7.26-10.85Z" />
                                            <path data-name="2"  d="M23.37,48.06l-19.56-7.22C1.59,46.86.27,53.31,0,60.04l20.83.81c.17-4.48,1.05-8.78,2.53-12.79Z" />
                                            <path data-name="1"  d="M20.83,63.96l-20.83.72c.21,5.99,1.26,11.78,3.05,17.25l19.81-6.48c-1.19-3.63-1.89-7.48-2.03-11.5Z" />
                                        </g>
                                        <g data-name="fg">
                                            ${htmlMaturationGraduations}
                                        </g>
                                    </svg>
                                </div>
                                <h5 class="small-title">Maturation</h5>
                            </wrapper>
                            ` : ``}

                            <wrapper data-pias-fiche-block="infos-content">
                                <h7 class="small-title-left"><trouge>${ficheData.infosProjet.titre}</trouge></h7>
                                ${exists.infosProjetDetails ? "<ul>" + htmlInfosProjetDetails + "</ul>" : ""}
                            </wrapper>
                        </div>


                        ${exists.timeline ? `
                        <div class="fiche-block" data-pias-fiche-block="timeline">
                            <wrapper>
                            <div class="timeline-bar">
                                <div class="hex-dot-container"><svg viewBox="0 0 100 115.47"><polygon points="0 28.87 0 86.6 50 115.47 100 86.6 100 28.87 50 0 0 28.87"/></svg></svg></div>
                                <div class="hex-dot-container"><svg viewBox="0 0 100 115.47"><polygon points="0 28.87 0 86.6 50 115.47 100 86.6 100 28.87 50 0 0 28.87"/></svg></svg></div>
                            </div>
                            ${htmlTimeline}
                            </wrapper>
                        </div>
                        ` : ``}

                        ${exists.infosProjetMeta || exists.infosProjetKeywords ? `
                        <div class="fiche-block grid--2-sep" data-pias-fiche-block="meta">
                            ${exists.infosProjetMeta ? `
                            <wrapper data-pias-fiche-block="data">
                                <h5 class="small-title">Données utilisées</h5>
                                <p><tcolor>${ficheData.infosProjet.meta.details}
                                <br><br><b>Hébergement : </b>${ficheData.infosProjet.meta.hosting}</tcolor></p>
                            </wrapper>
                            ` : ``}

                            ${exists.infosProjetMeta && exists.infosProjetKeywords ? '<div class="anap-separator sideways"></div>' : ""}

                            ${exists.infosProjetKeywords ? `
                            <wrapper data-pias-fiche-block="keywords">
                                <h5 class="small-title">Mots-clés</h5>
                                <wrapper class="fiche-tags">
                                    ${htmlInfosProjetKeywords}
                                </wrapper>
                            </wrapper>
                            ` : ``}
                        </div>
                        ` : ``}

                        ${exists.contacts ? `
                        <div class="fiche-block" data-pias-fiche-block="contacts">
                            <h5 class="small-title">Contacts de l'établissement</h5>
                            <div class="grid--2">
                                ${htmlContacts}
                            </div>
                        </div>
                        ` : ``}

                    </wrapper>

                    <div class="foot">
                        <div class="anap-separator"></div>

                        <div class="fiche-block" data-pias-fiche-block="share">
                            <wrapper class="space-children center-wrapper">
                                <h7 class="small-title-left"><b>Partager</b></h7>

                                <wrapper class="actions">

                                    <button class="anap-btn size-xl">
                                        <div class="icon-container"><svg viewBox="0 0 24 24" fill="none">
                                            <path d="M12,15.57c-.13,0-.26-.02-.38-.06-.12-.04-.23-.11-.32-.21l-3.6-3.6c-.2-.2-.3-.43-.29-.7,0-.27.1-.5.29-.7.2-.2.44-.3.71-.31.27,0,.51.09.71.29l1.88,1.88v-7.15c0-.28.1-.52.29-.71.19-.19.43-.29.71-.29s.52.1.71.29c.19.19.29.43.29.71v7.15l1.88-1.88c.2-.2.44-.3.71-.29.28,0,.51.11.71.31.18.2.28.43.29.7,0,.27-.09.5-.29.7l-3.6,3.6c-.1.1-.21.17-.32.21-.12.04-.24.06-.38.06ZM6,20c-.55,0-1.02-.2-1.41-.59-.39-.39-.59-.86-.59-1.41v-2c0-.28.1-.52.29-.71.19-.19.43-.29.71-.29s.52.1.71.29c.19.19.29.43.29.71v2h12v-2c0-.28.1-.52.29-.71.19-.19.43-.29.71-.29s.52.1.71.29c.19.19.29.43.29.71v2c0,.55-.2,1.02-.59,1.41-.39.39-.86.59-1.41.59H6Z" />
                                        </svg></div>
                                        <span>Télécharger la fiche</span>
                                    </button>
                                    <div class="social-buttons">
                                        <a href="#" target="_blank" title="Partager sur LinkedIn" class="anap-btn size-xl style-pastille style-noir">
                                            <div class="icon-container"><svg viewBox="0 0 36 36" fill="none">
                                                <path d="M11.72,29.43h-4.8v-15.25h4.8v15.25ZM9.32,12.07c-.54,0-1.08-.17-1.53-.47-.45-.3-.8-.74-1.01-1.24-.21-.5-.26-1.06-.15-1.59.11-.53.37-1.02.76-1.41.39-.38.88-.64,1.41-.75s1.09-.05,1.59.16c.5.21.93.56,1.23,1.02.3.45.46.99.46,1.53,0,.36-.06.73-.2,1.06-.14.34-.34.64-.6.9-.26.26-.57.46-.91.6-.34.14-.7.2-1.07.19ZM29.42,29.45h-4.8v-8.33c0-2.46-1.04-3.22-2.39-3.22-1.42,0-2.82,1.07-2.82,3.28v8.27h-4.8v-15.25h4.62v2.11h.06c.46-.94,2.09-2.54,4.56-2.54,2.68,0,5.57,1.59,5.57,6.25v9.43Z" />
                                            </svg></div>
                                        </a>
                                        <a href="#" target="_blank" title="Partager sur Instagram" class="anap-btn size-xl style-pastille style-noir">
                                            <div class="icon-container"><svg viewBox="0 0 36 36" fill="none">
                                                <path d="M18.52,6.51c3.75,0,4.19.02,5.66.08,1.37.06,2.11.29,2.6.48.65.25,1.12.56,1.61,1.05.49.49.79.96,1.05,1.61.19.49.42,1.24.48,2.6.07,1.48.08,1.92.08,5.66s-.02,4.19-.08,5.66c-.06,1.37-.29,2.11-.48,2.6-.25.65-.56,1.12-1.05,1.61-.49.49-.96.79-1.61,1.05-.49.19-1.24.42-2.6.48-1.48.07-1.92.08-5.66.08s-4.19-.02-5.66-.08c-1.37-.06-2.11-.29-2.6-.48-.65-.25-1.12-.56-1.61-1.05-.49-.49-.79-.96-1.05-1.61-.19-.49-.42-1.24-.48-2.6-.07-1.48-.08-1.92-.08-5.66s.02-4.19.08-5.66c.06-1.37.29-2.11.48-2.6.25-.65.56-1.12,1.05-1.61.49-.49.96-.79,1.61-1.05.49-.19,1.24-.42,2.6-.48,1.47-.07,1.92-.08,5.66-.08ZM18.52,3.98c-3.81,0-4.28.02-5.78.08-1.49.07-2.51.31-3.4.65-.93.36-1.71.84-2.49,1.62-.78.78-1.26,1.56-1.62,2.48-.34.89-.59,1.91-.65,3.4-.07,1.5-.08,1.98-.08,5.78s.02,4.28.08,5.78c.07,1.49.31,2.51.65,3.4.36.93.84,1.71,1.62,2.49.78.78,1.56,1.26,2.48,1.62.89.34,1.91.59,3.4.65,1.49.07,1.97.08,5.78.08s4.28-.02,5.78-.08c1.49-.07,2.51-.31,3.4-.65.92-.36,1.7-.84,2.48-1.62.78-.78,1.26-1.56,1.62-2.48.34-.89.59-1.91.65-3.4.07-1.5.08-1.97.08-5.78s-.02-4.28-.08-5.78c-.07-1.49-.31-2.51-.65-3.4-.35-.93-.82-1.71-1.6-2.49-.78-.78-1.56-1.26-2.48-1.62-.89-.34-1.91-.59-3.4-.65-1.5-.07-1.98-.09-5.78-.09ZM18.52,10.8c-3.98,0-7.2,3.23-7.2,7.2s3.23,7.2,7.2,7.2,7.2-3.23,7.2-7.2-3.23-7.2-7.2-7.2ZM18.52,22.67c-2.58,0-4.67-2.09-4.67-4.67s2.09-4.67,4.67-4.67,4.67,2.09,4.67,4.67-2.09,4.67-4.67,4.67ZM27.69,10.52c0,.93-.76,1.68-1.68,1.68s-1.68-.76-1.68-1.68.76-1.68,1.68-1.68,1.68.76,1.68,1.68Z" />
                                            </svg></div>
                                        </a>
                                        <a href="#" target="_blank" title="Partager sur X (Twitter)" class="anap-btn size-xl style-pastille style-noir">
                                            <div class="icon-container"><svg viewBox="0 0 36 36" fill="none">
                                                <path d="M24.86,7.21h3.66l-8,9.14,9.41,12.44h-7.37l-5.77-7.54-6.6,7.54h-3.66l8.55-9.78L6.07,7.21h7.55l5.21,6.89,6.03-6.89ZM23.58,26.6h2.03L12.52,9.29h-2.18l13.24,17.31Z" />
                                            </svg></div>
                                        </a>
                                        <a href="#" target="_blank" title="Partager sur Facebook" class="anap-btn size-xl style-pastille style-noir">
                                            <div class="icon-container"><svg viewBox="0 0 36 36" fill="none">
                                                <path d="M25.01,21.2l1.03-5.59h-5.97v-1.98c0-2.95,1.16-4.09,4.16-4.09.93,0,1.68.02,2.11.07v-5.06c-.82-.23-2.82-.45-3.97-.45-6.11,0-8.92,2.88-8.92,9.11v2.41h-3.77v5.59h3.77v12.16c1.41.35,2.89.54,4.42.54.75,0,1.49-.05,2.21-.13v-12.56h4.95Z" />
                                            </svg></div>
                                        </a>
                                    </div>

                                </wrapper>
                            </wrapper>
                        </div>

                        <div class="fiche-block grid--2-sep" data-pias-fiche-block="cta">
                            <wrapper class="center-inside">
                                <h7 class="small-title"><b>Envie d'en savoir plus ?</b></h7>
                                <a href="" target="_blank" class="anap-btn style-bleu">
                                    <span>Contacter l'ANAP</span>
                                </a>
                            </wrapper>

                            <div class="anap-separator sideways"></div>

                            <wrapper class="center-inside">
                                <h7 class="small-title"><b>Proposer un projet</b></h7>
                                <a href="" target="_blank" class="anap-btn style-secondaire">
                                    <span>Contacter l'ANAP</span>
                                </a>
                            </wrapper>
                        </div>

                    </div>
                `;
        if (exists.logo) {
          const logoContainer = ficheElement.querySelector(".logo-container");
          if (!logoContainer.firstChild) {
            logoContainer.innerHTML = `<img src="${ficheData.logo}">`;
          }
        }
        PIAS.fiches.prevScrollPos = PIAS.elements.fichesContainerWrapper.getBoundingClientRect().top * -1;
        PIAS.fiches.prevScrollHeight = PIAS.elements.fichesContainerScrollerInside.getBoundingClientRect().height;
        PIAS.elements.fichesContainerScrollerInside.insertBefore(newFicheContent, ficheElement.nextSibling);
        animateScrollToFollowElement(
          ficheElement,
          PIAS.elements.fichesContainerWrapper,
          PIAS.elements.fichesContainer,
          950,
          0.5
        );
        PIAS.APP.url.push(true, ficheObject[0]);
        setTimeout(() => {
          ficheElement.classList.add("active");
          setTimeout(() => {
            docHTML.setAttribute("data-pias-fiche-opened", "true");
            newFicheContent.classList.add("show");
          }, 400);
        }, 300);
        if (exists.timeline) {
          const timelineStepElements = newFicheContent.querySelectorAll('*[data-pias-fiche-block="timeline"] .timeline-step');
          if (timelineStepElements.length > 0) {
            let timelineStepsObserver = new IntersectionObserver(PIAS.APP.fiches.timelineScrollStepReveal, {
              root: PIAS.elements.fichesContainer,
              rootMargin: "0px",
              threshold: 0
            });
            timelineStepElements.forEach((timelineStepEl) => {
              timelineStepsObserver.observe(timelineStepEl);
            });
          }
        }
      },
      timelineScrollStepReveal: (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
          } else {
            if (entry.target.getBoundingClientRect().top > 0) {
              entry.target.classList.remove("is-inview");
            }
          }
        });
      },
      removeFicheContent: (el) => {
        el.style.height = el.getBoundingClientRect().height + "px";
        el.classList.add("hide");
        setTimeout(() => {
          el.style.height = 0;
          setTimeout(() => {
            eventAtTransitionEnd(el, () => {
              el.remove();
            }, { property: "height" });
          }, 50);
        }, 50);
      },
      back: (event, forceExit = false) => {
        forceExit = PIAS.fiches.forceBackExit ? true : forceExit;
        PIAS.fiches.forceBackExit = false;
        if (docHTML.getAttribute("data-pias-fiche-opened") != "false") {
          docHTML.setAttribute("data-pias-fiche-opened", "false");
          PIAS.APP.url.push(true, false);
          PIAS.elements.fichesContainerScrollerInside.querySelectorAll(".plateforme-fiche-small").forEach((ficheEl) => {
            ficheEl.classList.remove("active");
            ficheEl.classList.remove("hide");
            eventAtTransitionEnd(ficheEl, () => {
              ficheEl.style.height = null;
            }, { once: true });
          });
          PIAS.elements.fichesContainerScrollerInside.querySelectorAll(".plateforme-fiche-content").forEach((ficheContentEl) => {
            PIAS.APP.fiches.removeFicheContent(ficheContentEl);
          });
          if (PIAS.fiches.prevScrollHeight < PIAS.rect.h * 0.75) {
            PIAS.elements.fichesContainer.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            const currentScrollPos = PIAS.elements.fichesContainerWrapper.getBoundingClientRect().top * -1;
            if (!(currentScrollPos > PIAS.fiches.prevScrollPos - 400 && currentScrollPos < PIAS.fiches.prevScrollPos + 400)) {
              setTimeout(() => {
                if (docHTML.getAttribute("data-pias-fiches-results") == "true") {
                  PIAS.elements.fichesContainer.scrollTo({ top: PIAS.fiches.prevScrollPos, behavior: "smooth" });
                  if (PIAS.fiches.currentFicheSmallOpen) {
                    setTimeout(() => {
                      animateScrollToFollowElement(
                        PIAS.fiches.currentFicheSmallOpen,
                        PIAS.elements.fichesContainerWrapper,
                        PIAS.elements.fichesContainer,
                        800,
                        1
                      );
                    }, currentScrollPos > 600 ? 200 : 50);
                  }
                }
              }, 200);
            }
          }
          setTimeout(() => {
            if (docHTML.getAttribute("data-pias-search-opened") != "false") {
              PIAS.elements.topBarSearchBtn.classList.add("active");
              PIAS.APP.topBar.secondaryOpen("search");
            } else {
              PIAS.elements.topBarSearchBtn.classList.remove("active");
              PIAS.APP.topBar.secondaryOpen(false);
            }
          }, 30);
          if (!forceExit) {
            return;
          }
        }
        PIAS.APP.results.hide();
      }
    },
    results: {
      create: (type, value, instant = false, postponeCreation = false, callbackPostGenerate) => {
        docHTML.setAttribute("data-pias-fiches-results", "building");
        let fichesObjectsSelected = {};
        if (type === "tag") {
          fichesObjectsSelected = PIAS.APP.fiches.getFichesObjectsFromTagName(value);
        } else if (type === "id") {
          fichesObjectsSelected = PIAS.APP.fiches.getFichesObjectsFromKeys(value);
        } else {
          console.error("[PIAS.results.create] 'type' is invalid : " + type);
          return;
        }
        function generate(fichesObjectsSelected2) {
          if (Object.entries(fichesObjectsSelected2).length > 0) {
            Object.entries(fichesObjectsSelected2).forEach((ficheObject) => {
              PIAS.APP.fiches.createSmall(ficheObject);
            });
          } else {
            let newNothingEl = document.createElement("div");
            newNothingEl.classList.add("plateforme-fiche-nothing-found");
            newNothingEl.innerHTML = `<wrapper><span>Aucun résultat trouvé.</span></wrapper>`;
            PIAS.elements.fichesContainerScrollerInside.appendChild(newNothingEl);
          }
        }
        if (postponeCreation) {
          postponeCreation = () => {
            generate(fichesObjectsSelected);
          };
        } else {
          generate(fichesObjectsSelected);
        }
        PIAS.APP.results.show(
          instant,
          type == "tag" ? value : false,
          postponeCreation,
          callbackPostGenerate
        );
      },
      show: (instant = false, tagName, callbackPostponeCreation, callbackPostGenerate) => {
        let timings = instant ? [400, 0] : [300, 400];
        docHTML.setAttribute("data-pias-fiches-results", "true-generated");
        setTimeout(() => {
          if (callbackPostGenerate) {
            callbackPostGenerate();
          }
          if (callbackPostponeCreation) {
            callbackPostponeCreation();
          }
          PIAS.elements.fichesContainer.scrollTo({ top: 0, behavior: "instant" });
          docHTML.setAttribute("data-pias-fiches-results", "true-transition");
          setTimeout(() => {
            docHTML.setAttribute("data-pias-fiches-results", "true");
          }, timings[1]);
        }, timings[0]);
        if (tagName) {
          PIAS.APP.topBar.secondaryOpen("title", tagName);
          PIAS.APP.url.push(tagName);
        } else {
          PIAS.APP.url.push(true, false);
        }
      },
      hide: () => {
        docHTML.setAttribute("data-pias-search-opened", "false");
        docHTML.setAttribute("data-pias-fiche-opened", "false");
        docHTML.setAttribute("data-pias-fiches-results", "removing");
        PIAS.APP.url.push(false, false);
        PIAS.elements.topBarSearchBtn.classList.remove("active");
        PIAS.APP.topBar.secondaryOpen(false);
        setTimeout(() => {
          docHTML.setAttribute("data-pias-fiches-results", "false");
          removeAllChildNodes(PIAS.elements.fichesContainerScrollerInside);
        }, 600);
      },
      search: {
        setup: () => {
          PIAS.fiches.forceBackExit = false;
          if (docHTML.getAttribute("data-pias-fiche-opened") !== "false") {
            PIAS.APP.fiches.back();
          }
          PIAS.APP.honeycomb.itemActions.close();
          PIAS.APP.url.push(false, false);
          setTimeout(() => {
            docHTML.setAttribute("data-pias-search-opened", "true");
          }, 15);
        },
        generate: (fichesKeys) => {
          const currentResults = Array.prototype.slice.call(PIAS.elements.fichesContainerScrollerInside.children);
          PIAS.APP.results.create(
            "id",
            fichesKeys,
            true,
            true,
            () => {
              removeAllNodes(currentResults);
            }
          );
        },
        close: () => {
          if (docHTML.getAttribute("data-pias-search-opened") !== "false") {
            PIAS.APP.fiches.back(void 0, true);
          }
        },
        condition: () => {
          return !docHTML.getAttribute("data-pias-fiches-results").includes("-generated");
        }
      }
    },
    topBar: {
      secondaryOpen: (type = false, value) => {
        function animateHeight(el, callback) {
          el.style.height = el.firstElementChild.getBoundingClientRect().height + "px";
          setTimeout(() => {
            callback();
            eventAtTransitionEnd(
              el,
              () => {
                el.style.height = null;
              },
              { once: true }
            );
          }, 50);
        }
        Array.from(PIAS.elements.topBarSecondaryWrapper.children).forEach((sEl) => {
          if (sEl.classList.contains("active")) {
            animateHeight(sEl, () => {
              sEl.classList.remove("active");
            });
          }
        });
        if (type == "title" || !type && docHTML.getAttribute("data-pias-fiches-results") != "false" && docHTML.getAttribute("data-pias-fiches-results") != "removing" && docHTML.getAttribute("data-pias-search-opened") == "false") {
          PIAS.elements.topBarSearchBtn.classList.remove("active");
          if (value) {
            PIAS.elements.topBarSecondaryTitleText.innerText = value;
          }
          animateHeight(PIAS.elements.topBarSecondaryTitle, () => {
            PIAS.elements.topBarSecondaryTitle.classList.add("active");
          });
        } else if (type == "search") {
          animateHeight(PIAS.elements.topBarSecondarySearchBar, () => {
            PIAS.elements.topBarSecondarySearchBar.classList.add("active");
          });
        }
      },
      searchOpenToggle: () => {
        PIAS.elements.topBarSearchBtn.classList.toggle("active");
        if (PIAS.elements.topBarSearchBtn.classList.contains("active")) {
          PIAS.APP.topBar.secondaryOpen("search");
          setTimeout(() => {
            PIAS.elements.topBarSecondarySearchBarInput.focus({ preventScroll: true });
          }, 100);
        } else {
          PIAS.APP.topBar.secondaryOpen(false);
          PIAS.elements.topBarSecondarySearchBarInput.blur();
        }
      }
    }
  }
};
PIAS.APP.init();
