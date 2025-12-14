let isModalShowing = false;

function changeToggleIcon(menuBtn) {
  if (isModalShowing) {
    menuBtn.textContent = "▲";
  } else {
    menuBtn.textContent = "▼";
  }
}

function openOrCloseMenu(ulLinks, menuBtn) {
  if (!isModalShowing) {
    ulLinks.classList.add("show");
    isModalShowing = true;
  } else {
    ulLinks.classList.remove("show");
    isModalShowing = false;
  }

  changeToggleIcon(menuBtn);
}

function closeMenu(ulLinks, menuBtn) {
  if (isModalShowing) {
    ulLinks.classList.remove("show");
    isModalShowing = false;
  }

  changeToggleIcon(menuBtn);
}

export { closeMenu, openOrCloseMenu };
