(function () {
  const ANCHOR_ID = 'join-the-discussion';

  // Delegate click so it works across SPA navigations
  document.addEventListener('click', (e) => {
    const fab = e.target.closest('.feedback-fab');
    if (!fab) return;
    e.preventDefault();

    const path = location.pathname.startsWith('/') ? location.pathname : `/${location.pathname}`;
    const fullLink = `${path}#${ANCHOR_ID}`;
    const target = document.getElementById(ANCHOR_ID);

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', fullLink);
    } else {
      window.location.href = fullLink; // fallback
    }
  });

  function wire() {
    const fab = document.querySelector('.feedback-fab');
    if (!fab) return;

    const path = location.pathname.startsWith('/') ? location.pathname : `/${location.pathname}`;
    fab.setAttribute('href', `${path}#${ANCHOR_ID}`);
    fab.setAttribute('target', '_self');
    fab.setAttribute('rel', 'noopener');

    const reveal = () => {
      if (document.body.scrollHeight <= window.innerHeight + 200 || window.scrollY > 150) {
        fab.classList.add('is-visible');
      } else {
        fab.classList.remove('is-visible');
      }
    };
    reveal();
    window.addEventListener('scroll', reveal, { passive: true });
    setTimeout(reveal, 250);
  }

  document.addEventListener('DOMContentLoaded', wire);
  if (window.document$) window.document$.subscribe(wire);
})();
