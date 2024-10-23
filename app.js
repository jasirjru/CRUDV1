
const form = document.getElementById('crud-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const tableBody = document.getElementById('crud-table-body');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');

let editIndex = null; 

document.addEventListener('DOMContentLoaded', loadEntries);


form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    
    if (name === '' || email === '') {
        alert('Please fill in all fields.');
        return;
    }
    
    if (editIndex === null) {
        addEntry(name, email);
    } else {  
        updateEntry(editIndex, name, email);
    }

    clearForm();
    loadEntries();
});

function addEntry(name, email) {
    let entries = getEntriesFromStorage();
    entries.push({ name, email });
    localStorage.setItem('entries', JSON.stringify(entries));
}

function updateEntry(index, name, email) {
    let entries = getEntriesFromStorage();
    entries[index] = { name, email };
    localStorage.setItem('entries', JSON.stringify(entries));
    editIndex = null;
    formTitle.textContent = 'Add New Entry';
    submitBtn.textContent = 'Add Entry';
}


function deleteEntry(index) {
    let entries = getEntriesFromStorage();
    entries.splice(index, 1);
    localStorage.setItem('entries', JSON.stringify(entries));
    loadEntries();
}
function editEntry(index) {
    let entries = getEntriesFromStorage();
    const entry = entries[index];
    nameInput.value = entry.name;
    emailInput.value = entry.email;
    
    formTitle.textContent = 'Edit Entry';
    submitBtn.textContent = 'Update Entry';
    editIndex = index;
}


function loadEntries() {
    const entries = getEntriesFromStorage();
    tableBody.innerHTML = '';
    
    entries.forEach((entry, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>
                <button class="action-btn edit" onclick="editEntry(${index})">Edit</button>
                <button class="action-btn delete" onclick="deleteEntry(${index})">Delete</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Get entries from localStorage
function getEntriesFromStorage() {
    return localStorage.getItem('entries') ? JSON.parse(localStorage.getItem('entries')) : [];
}

// Clear form fields
function clearForm() {
    nameInput.value = '';
    emailInput.value = '';
    editIndex = null;
    formTitle.textContent = 'Add New Entry';
    submitBtn.textContent = 'Add Entry';
}
