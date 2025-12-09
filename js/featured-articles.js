// js/featured-articles.js
document.addEventListener('DOMContentLoaded', () => {
  const viewport = document.querySelector('.featured-viewport') || document.querySelector('#featured-articles');
  const wrapper = document.querySelector('.featured-wrapper');
  const cards = Array.from(document.querySelectorAll('.featured-card'));
  const nextBtn = document.getElementById('next-article');
  const prevBtn = document.getElementById('prev-article');

  if (!wrapper || cards.length === 0) return;

  let currentIndex = 0;

  function cardsPerSlide() { return window.innerWidth <= 700 ? 1 : 3; }

  
  function update() {
    const perSlide = cardsPerSlide();
    const maxStart = Math.max(0, cards.length - perSlide);

    if (currentIndex > maxStart) currentIndex = 0;
    if (currentIndex < 0) currentIndex = maxStart;


    let cumulative = 0;
    for (let i = 0; i < currentIndex; i++) {
      const r = cards[i].getBoundingClientRect();
      cumulative += r.width;
      
      const nextRect = cards[i + 1].getBoundingClientRect();
      const gap = Math.round(nextRect.left - r.right);
      if (gap > 0) cumulative += gap;
    }

    wrapper.style.transform = `translateX(-${cumulative}px)`;
  }

  // CHATGPT USAGE: Event listeners for navigation buttons
  nextBtn && nextBtn.addEventListener('click', () => {
    currentIndex++;

    const per = cardsPerSlide();
    const maxStart = Math.max(0, cards.length - per);
    if (currentIndex > maxStart) currentIndex = 0;
    update();
  });

  prevBtn && prevBtn.addEventListener('click', () => {
    currentIndex--;
    const per = cardsPerSlide();
    const maxStart = Math.max(0, cards.length - per);
    if (currentIndex < 0) currentIndex = maxStart;
    update();
  });

  let rTimer;
  window.addEventListener('resize', () => {
    clearTimeout(rTimer);
    rTimer = setTimeout(update, 120);
  });

  wrapper.style.transform = 'translateX(0px)';
  setTimeout(update, 40);

  // End of CHATGPT USAGE
});
