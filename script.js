const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.main-navigation');
const header = document.querySelector('.site-header');
const menuLabel = menuButton.querySelector('.sr-only');
const mobileLayout = window.matchMedia('(max-width: 900px)');

function closeMenu(returnFocus = false) {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
  menuLabel.textContent = 'Open navigation';
  if (returnFocus) menuButton.focus();
}

header.classList.add('navigation-ready');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  if (isOpen || !mobileLayout.matches) {
    closeMenu();
    return;
  }
  menuButton.setAttribute('aria-expanded', 'true');
  navigation.classList.add('open');
  menuLabel.textContent = 'Close navigation';
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    closeMenu(mobileLayout.matches);
  });
});

header.querySelector('.brand').addEventListener('click', () => closeMenu());

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu(true);
  }
});

document.addEventListener('click', (event) => {
  if (!header.contains(event.target)) closeMenu();
});

document.addEventListener('focusin', (event) => {
  if (!header.contains(event.target)) closeMenu();
});

// Reset when rotating a phone or switching to the desktop layout.
mobileLayout.addEventListener('change', () => closeMenu());
window.addEventListener('pageshow', () => closeMenu());

document.querySelector('#year').textContent = new Date().getFullYear();
