// animated counters

const counters = document.querySelectorAll('[data-count]');

counters.forEach(counter => {

  const target = +counter.dataset.count;
  let current = 0;

  const updateCounter = () => {

    const increment = target / 80;

    if (current < target) {

      current += increment;

      counter.innerText = Math.floor(current);

      requestAnimationFrame(updateCounter);

    } else {

      counter.innerText = target.toLocaleString();
    }
  };

  updateCounter();
});

// animate capacity bars

document.querySelectorAll('.capacity-bar-fill').forEach(bar => {

  const fill = bar.dataset.fill;

  setTimeout(() => {
    bar.style.width = fill + '%';
  }, 300);
});

// filter events

window.filterEvents = () => {

  const search =
    document.getElementById('eventSearch')?.value.toLowerCase() || '';

  const category =
    document.getElementById('categoryFilter')?.value.toLowerCase() || '';

  const date =
    document.getElementById('dateFilter')?.value || '';

  const cards =
    document.querySelectorAll('.event-card-wrapper');

  let visibleCount = 0;

  cards.forEach(card => {

    const title = card.dataset.title;
    const cardCategory = card.dataset.category;
    const cardDate = card.dataset.date;

    const matchesSearch =
      title.includes(search);

    const matchesCategory =
      !category || cardCategory === category;

    const matchesDate =
      !date || cardDate === date;

    const visible =
      matchesSearch &&
      matchesCategory &&
      matchesDate;

    card.style.display = visible ? 'block' : 'none';

    if (visible) visibleCount++;
  });

  const noResults = document.getElementById('noResults');

  if (noResults) {

    noResults.style.display =
      visibleCount === 0 ? 'block' : 'none';
  }
};

// trigger filters

['eventSearch', 'categoryFilter', 'dateFilter']
.forEach(id => {

  const el = document.getElementById(id);

  if (el) {
    el.addEventListener('input', filterEvents);
  }
});