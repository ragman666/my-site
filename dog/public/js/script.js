const form = document.getElementById('entry-form');
const statusDiv = document.getElementById('status');
const entriesList = document.getElementById('entries-list');
const entryCount = document.getElementById('entry-count');
const submitBtn = document.getElementById('submit-btn');

// ---- Show status message ----

function showStatus(message, type) {
  statusDiv.textContent = message;
  statusDiv.className = `status ${type}`;
  // Auto-hide after 3 seconds
  setTimeout(() => {
    statusDiv.className = 'status hidden';
  }, 3000);
}

// ---- Submit a new entry ----
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = 'Saving...';
 
  const data = {
    name: document.getElementById('name').value.trim(),
    totalpeeps: document.getElementById('totalpeeps').value.trim(),
    behaviour: document.getElementById('behaviour').value.trim(),
    pulling: document.getElementById('pulling').value.trim(),
    reactive: document.getElementById('reactive').value.trim(),
    datetime: document.getElementById('datetime').value.trim(),
    length: document.getElementById('length').value.trim(),
    notes: document.getElementById('notes').value.trim(),
  };
 
  try {
    const response = await fetch('/api/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
 
    const result = await response.json();
 
    if (response.ok && result.success) {
      showStatus('Entry saved successfully!', 'success');
      form.reset();
      loadEntries();
    } else {
      showStatus(result.error || 'Something went wrong', 'error');
    }
  } catch (err) {
    console.error('Submit error:', err);
    showStatus('Could not connect to server', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Save Entry';
  }
});

// ---- Load and display entries ----
async function loadEntries() {
  try {
    const response = await fetch('/api/entries');
    const entries = await response.json();
 
    entryCount.textContent = `${entries.length} ${entries.length === 1 ? 'entry' : 'entries'}`;
 
    if (entries.length === 0) {
      entriesList.innerHTML = '<p class="no-entries">No entries yet. Add one above!</p>';
      return;
    }
 
    entriesList.innerHTML = entries.map(entry => `
      <div class="entry-card" data-id="${entry.id}">
        <button class="delete-btn" title="Delete entry" onclick="deleteEntry(${entry.id})">✕</button>
        <span class="entry-name">${escapeHtml(entry.name)}</span>
        ${entry.notes ? `<span class="entry-notes"> · ${escapeHtml(entry.notes)}</span>` : ''}
        ${entry.length ? `<p class="entry-length">${escapeHtml(entry.length)}</p>` : ''}
        <div class="entry-datetime">${new Date(entry.datetime).toLocaleString()}</div>
      </div>
    `).join('');
 
  } catch (err) {
    console.error('Load error:', err);
    entriesList.innerHTML = '<p class="no-entries">Failed to load entries.</p>';
  }
}
 
// ---- Delete an entry ----
async function deleteEntry(id) {
  if (!confirm('Are you sure you want to delete this entry?')) return;
 
  try {
    const response = await fetch(`/api/entries/${id}`, { method: 'DELETE' });
    const result = await response.json();
 
    if (response.ok && result.success) {
      showStatus('Entry deleted', 'success');
      loadEntries();
    } else {
      showStatus(result.error || 'Failed to delete', 'error');
    }
  } catch (err) {
    console.error('Delete error:', err);
    showStatus('Could not connect to server', 'error');
  }
}
 
// ---- Prevent XSS ----
function escapeHtml(text) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}
 
// ---- Initial load ----
loadEntries();