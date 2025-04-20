document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedbackForm');

  // Handle feedback form submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const file = document.getElementById('photo').files[0];
      const destination = document.getElementById('destination').value.trim();
      const rating = document.getElementById('rating').value;
      const comments = document.getElementById('comments').value.trim();

      const feedback = {
        photo: '',
        destination,
        rating,
        comments
      };

      const saveAndRedirect = () => {
        const allFeedback = JSON.parse(localStorage.getItem('feedbacks') || '[]');
        allFeedback.push(feedback);
        localStorage.setItem('feedbacks', JSON.stringify(allFeedback));
        window.location.href = 'index.html';
      };

      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          feedback.photo = reader.result;
          saveAndRedirect();
        };
        reader.readAsDataURL(file);
      } else {
        saveAndRedirect();
      }
    });
  }

  // Display feedbacks if on index page
  const feedbackList = document.getElementById('feedbackList');
  if (feedbackList) {
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    if (feedbacks.length === 0) {
      feedbackList.innerHTML = '<p>No feedback available.</p>';
      return;
    }

    feedbacks.forEach((f, index) => {
      const card = document.createElement('div');
      card.className = "feedback-card";
      card.style = `
        position: relative;
        border: 1px solid #ccc;
        padding: 15px;
        width: 250px;
        border-radius: 8px;
        background: #f9f9f9;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      `;

      card.innerHTML = `
        
  
        <div style="position:absolute; top:10px; right:10px;">
  <button class="menu-toggle" data-index="${index}" style="border:none; background:none; cursor:pointer;">
    <svg width="20" height="20" viewBox="0 0 24 24">
      <circle cx="12" cy="5" r="2"/>
      <circle cx="12" cy="12" r="2"/>
      <circle cx="12" cy="19" r="2"/>
    </svg>
  </button>
  <div id="menu-${index}" class="menu-popup" style="
    display: none;
    position: absolute;
    top: 30px;
    right: 0;
    background: #ffffff;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    z-index: 999;
    min-width: 100px;
  ">
    <button onclick="deleteFeedback(${index})" style="
      width: 100%;
      padding: 10px;
      border: none;
      background: none;
      text-align: left;
      font-weight: 600;
      font-size: 14px;
      color: #d32f2f;
      cursor: pointer;
    ">🗑️ Delete</button>
  </div>
</div>


        ${f.photo ? `<img src="${f.photo}" style="width:100%; height:150px; object-fit:cover; border-radius:5px;">` : ''}
        <h3 style="color:#00695c; text-align:center;">${f.destination}</h3>
        <p><strong>Rating:</strong> <span class="stars">${getStars(f.rating)}</span></p>
        <p>${f.comments}</p>
      `;

      feedbackList.appendChild(card);
    });

    // Show/hide 3-dot menus
    document.querySelectorAll('.menu-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = btn.dataset.index;
        toggleMenu(index);
      });
    });
  }

  // Hide menus when clicking outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.menu-popup').forEach(menu => menu.style.display = 'none');
  });
});

// Convert rating number to stars
function getStars(rating) {
  const count = parseInt(rating);
  return `${count} / 5`;
}


// Toggle 3-dot menu
function toggleMenu(index) {
  const menu = document.getElementById(`menu-${index}`);
  const allMenus = document.querySelectorAll('.menu-popup');
  allMenus.forEach(m => m.style.display = 'none');
  if (menu) {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  }
}

// Delete feedback
function deleteFeedback(index) {
  const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
  feedbacks.splice(index, 1);
  localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
  location.reload();
}
