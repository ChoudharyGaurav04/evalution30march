// script.js

// Ensure Footer Stays at Bottom
function adjustFooter() {
    const footer = document.querySelector('footer');
    const bodyHeight = document.body.offsetHeight;
    const windowHeight = window.innerHeight;
  
    if (bodyHeight < windowHeight) {
      footer.style.position = 'fixed';
      footer.style.bottom = '0';
      footer.style.width = '100%';
    } else {
      footer.style.position = 'static';
    }
  }
  
  window.addEventListener('load', adjustFooter);
  window.addEventListener('resize', adjustFooter);
  
  // Dark Mode Toggle
  window.addEventListener('DOMContentLoaded', () => {
    const toggleDarkModeBtn = document.getElementById('toggle-dark-mode');
    if (!toggleDarkModeBtn) return;
  
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    document.body.classList.toggle('dark-mode', isDarkMode);
  
    function toggleDarkMode() {
      const isDarkModeActive = document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', isDarkModeActive ? 'enabled' : 'disabled');
    }
  
    toggleDarkModeBtn.addEventListener('click', toggleDarkMode);
  });
  
  // Form Submission
  const noteForm = document.getElementById('note-form');
  const successMessage = document.getElementById('success-message');
  
  if (noteForm) {
    noteForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
      const tags = Array.from(document.getElementById('tags').selectedOptions).map(option => option.value);
      const priority = document.getElementById('priority').value;
      const image = document.getElementById('image').files[0];
  
      if (!title || !description) {
        alert('Please fill in all required fields.');
        return;
      }
  
      const noteData = {
        title,
        description,
        tags,
        priority,
        image: image ? URL.createObjectURL(image) : null,
        createdAt: new Date().toISOString(),
      };
  
      // Save to LocalStorage
      const notes = JSON.parse(localStorage.getItem('notes')) || [];
      notes.push(noteData);
      localStorage.setItem('notes', JSON.stringify(notes));
  
      // Display Success Message
      successMessage.style.display = 'block';
      setTimeout(() => successMessage.style.display = 'none', 3000);
  
      noteForm.reset();
    });
  }
  
  // Load Notes
  const loadNotesBtn = document.getElementById('load-notes');
  const notesContainer = document.getElementById('notes-container');
  
  if (loadNotesBtn) {
    loadNotesBtn.addEventListener('click', function () {
      const notes = JSON.parse(localStorage.getItem('notes')) || [];
      notesContainer.innerHTML = '';
  
      if (notes.length === 0) {
        notesContainer.innerHTML = '<p>No notes available.</p>';
        return;
      }
  
      notes.forEach((note, index) => {
        const noteCard = document.createElement('div');
        noteCard.classList.add('note-card');
        noteCard.innerHTML = `
          <h3>${note.title}</h3>
          <p>${note.description}</p>
          <p><strong>Priority:</strong> ${note.priority}</p>
          <p><strong>Tags:</strong> ${note.tags.join(', ')}</p>
          ${note.image ? `<img src="${note.image}" alt="Note Image" style="max-width: 100%; height: auto;" />` : ''}
          <p><small>Created at: ${new Date(note.createdAt).toLocaleString()}</small></p>
          <button onclick="deleteNote(${index})">Delete</button>
        `;
        notesContainer.appendChild(noteCard);
      });
    });
  }
  
  // Delete Note
  function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    if (confirm('Are you sure you want to delete this note?')) {
      notes.splice(index, 1);
      localStorage.setItem('notes', JSON.stringify(notes));
      document.getElementById('load-notes').click();
    }
  }
  