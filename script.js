const textarea = document.getElementById('gratitude-input');
const saveBtn = document.getElementById('save-btn');
const entriesContainer = document.getElementById('entries-container');

// Load existing entries from localStorage
let entries = JSON.parse(localStorage.getItem('gratitudeEntries')) || [];

function saveEntry() {
    const text = textarea.value.trim();
    if (text === '') return;

    const entry = {
        id: Date.now(),
        date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        content: text
    };

    entries.unshift(entry);
    localStorage.setItem('gratitudeEntries', JSON.stringify(entries));
    
    // Clear textarea
    textarea.value = '';
    
    // Add to UI
    renderEntries();
    
    // Tiny bounce animation on save
    saveBtn.style.transform = 'scale(1.1)';
    setTimeout(() => {
        saveBtn.style.transform = 'scale(1)';
    }, 200);
}

function renderEntries() {
    entriesContainer.innerHTML = '';
    
    if (entries.length === 0) {
        entriesContainer.innerHTML = '<p style="color: grey; font-style: italic; text-align: center; font-weight: 300;">No entries yet. Start by writing what you are grateful for today.</p>';
        return;
    }

    entries.forEach(entry => {
        const card = document.createElement('div');
        card.className = 'entry-card';
        card.innerHTML = `
            <div class="entry-date">${entry.date}</div>
            <div class="entry-content">${entry.content}</div>
        `;
        entriesContainer.appendChild(card);
    });
}

saveBtn.addEventListener('click', saveEntry);

// Initialize UI
renderEntries();

// Add focus effect on textarea
textarea.addEventListener('focus', () => {
    textarea.placeholder = "Type your heart out...";
});
textarea.addEventListener('blur', () => {
    textarea.placeholder = "What are you grateful for today?";
});
