
  const searchInput = document.getElementById('projectSearch');
  const clearBtn = document.getElementById('clearSearch');

  const cards = Array.from(document.querySelectorAll('.project-card'));

  function getCardText(card){
    const title = card.querySelector('h3')?.textContent || '';
    const tag = card.querySelector('.project-tag')?.textContent || '';
    return (title + ' ' + tag).toLowerCase();
  }

  function filterCards(){
    const q = (searchInput.value || '').trim().toLowerCase();

    cards.forEach(card => {
      const text = getCardText(card);
      const match = text.includes(q);
      card.style.display = match ? '' : 'none';
    });
  }

  // اگر کاربر تایپ کرد
  searchInput.addEventListener('input', filterCards);

  // پاک کردن
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    filterCards();
    searchInput.focus();
  });

