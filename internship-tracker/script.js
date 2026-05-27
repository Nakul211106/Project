/**
 * Internship Tracker - Core Application Script
 * Built by Nakul Timmana (MIT Manipal - Mathematics & Computing)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- State Variables ---
  let applications = [];
  let activeTheme = 'light';
  
  // --- DOM Elements ---
  const applicationsGrid = document.getElementById('applicationsGrid');
  const emptyState = document.getElementById('emptyState');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const exportCsvBtn = document.getElementById('exportCsvBtn');
  const importCsvInput = document.getElementById('importCsvInput');
  const clearAllBtn = document.getElementById('clearAllBtn');
  const openAddModalBtn = document.getElementById('openAddModalBtn');
  const emptyStateAddBtn = document.getElementById('emptyStateAddBtn');
  
  // Controls
  const searchInput = document.getElementById('searchInput');
  const statusFilter = document.getElementById('statusFilter');
  const priorityFilter = document.getElementById('priorityFilter');
  const sortBy = document.getElementById('sortBy');
  
  // Add/Edit Modal
  const formModal = document.getElementById('formModal');
  const modalTitle = document.getElementById('modalTitle');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelFormBtn = document.getElementById('cancelFormBtn');
  const applicationForm = document.getElementById('applicationForm');
  const editIndexInput = document.getElementById('editIndex');
  
  // Form Inputs
  const companyNameInput = document.getElementById('companyName');
  const roleAppliedInput = document.getElementById('roleApplied');
  const contactEmailInput = document.getElementById('contactEmail');
  const companyWebsiteInput = document.getElementById('companyWebsite');
  const companyLocationInput = document.getElementById('companyLocation');
  const contactPersonInput = document.getElementById('contactPerson');
  const applicationDateInput = document.getElementById('applicationDate');
  const followupDateInput = document.getElementById('followupDate');
  const applicationStatusInput = document.getElementById('applicationStatus');
  const priorityLevelInput = document.getElementById('priorityLevel');
  const notesInput = document.getElementById('notes');

  // Custom Confirmation Dialog
  const confirmModal = document.getElementById('confirmModal');
  const confirmTitle = document.getElementById('confirmTitle');
  const confirmMessage = document.getElementById('confirmMessage');
  const confirmCancelBtn = document.getElementById('confirmCancelBtn');
  const confirmConfirmBtn = document.getElementById('confirmConfirmBtn');
  const confirmIcon = document.getElementById('confirmIcon');

  // --- Initial Configuration ---
  initApp();

  function initApp() {
    // Set default application date in form to today
    const today = new Date().toISOString().split('T')[0];
    applicationDateInput.value = today;

    // Load theme setting
    const savedTheme = localStorage.getItem('internship_tracker_theme') || 'light';
    setTheme(savedTheme);

    // Load applications data
    const savedData = localStorage.getItem('internship_tracker_data');
    if (savedData) {
      try {
        applications = JSON.parse(savedData);
      } catch (e) {
        console.error('Failed to parse LocalStorage data:', e);
        applications = [];
      }
    } else {
      // Load sample data if empty so the resume looks good on first launch
      applications = getSampleData();
      saveToLocalStorage();
    }

    renderDashboard();
  }

  // --- Theme Toggle Handler ---
  function setTheme(theme) {
    activeTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('internship_tracker_theme', theme);
    
    // Update theme button icon
    if (theme === 'dark') {
      themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
      themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  }

  themeToggleBtn.addEventListener('click', () => {
    const newTheme = activeTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  });

  // --- Toast Notification System ---
  function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconClass = 'fa-circle-check';
    if (type === 'error') iconClass = 'fa-circle-xmark';
    if (type === 'warning') iconClass = 'fa-circle-exclamation';
    if (type === 'info') iconClass = 'fa-circle-info';

    toast.innerHTML = `
      <i class="fa-solid ${iconClass}"></i>
      <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);
    
    // Animate slide in
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    // Slide out and destroy after 3.5 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3500);
  }

  // --- Custom Confirm Modal (Promise-based) ---
  let confirmResolver = null;

  function showConfirm(title, message, isDanger = true) {
    return new Promise((resolve) => {
      confirmResolver = resolve;
      confirmTitle.textContent = title;
      confirmMessage.textContent = message;
      
      if (isDanger) {
        confirmIcon.className = 'confirm-icon';
        confirmConfirmBtn.className = 'btn btn-danger';
      } else {
        confirmIcon.className = 'confirm-icon warning-icon'; // styling classes
        confirmConfirmBtn.className = 'btn btn-primary';
      }
      
      confirmModal.classList.remove('hidden');
      confirmModal.setAttribute('aria-hidden', 'false');
    });
  }

  function closeConfirmModal(result) {
    confirmModal.classList.add('hidden');
    confirmModal.setAttribute('aria-hidden', 'true');
    if (confirmResolver) {
      confirmResolver(result);
      confirmResolver = null;
    }
  }

  confirmConfirmBtn.addEventListener('click', () => closeConfirmModal(true));
  confirmCancelBtn.addEventListener('click', () => closeConfirmModal(false));
  confirmModal.addEventListener('click', (e) => {
    if (e.target === confirmModal) closeConfirmModal(false);
  });

  // --- LocalStorage Integration ---
  function saveToLocalStorage() {
    localStorage.setItem('internship_tracker_data', JSON.stringify(applications));
  }

  // --- Statistics Calculations & Display ---
  function updateStatistics() {
    const stats = {
      total: applications.length,
      applied: 0,
      followup: 0,
      interview: 0,
      selected: 0,
      rejected: 0,
      highPriority: 0
    };

    applications.forEach(app => {
      if (app.status === 'Applied') stats.applied++;
      else if (app.status === 'Follow-up Needed') stats.followup++;
      else if (app.status === 'Interview Scheduled') stats.interview++;
      else if (app.status === 'Selected') stats.selected++;
      else if (app.status === 'Rejected') stats.rejected++;

      if (app.priority === 'High') stats.highPriority++;
    });

    // Update UI Elements
    document.querySelector('#statTotal .stat-value').textContent = stats.total;
    document.querySelector('#statApplied .stat-value').textContent = stats.applied;
    document.querySelector('#statFollowUp .stat-value').textContent = stats.followup;
    document.querySelector('#statInterview .stat-value').textContent = stats.interview;
    document.querySelector('#statSelected .stat-value').textContent = stats.selected;
    document.querySelector('#statRejected .stat-value').textContent = stats.rejected;
    document.querySelector('#statHighPriority .stat-value').textContent = stats.highPriority;
  }

  // --- Render Dashboard / Card List ---
  function renderDashboard() {
    updateStatistics();
    
    // Clear list
    applicationsGrid.innerHTML = '';

    // Apply Search & Filters
    const query = searchInput.value.toLowerCase().trim();
    const statusVal = statusFilter.value;
    const priorityVal = priorityFilter.value;
    const sortVal = sortBy.value;

    let filtered = applications.filter(app => {
      // 1. Search Query
      const matchQuery = 
        app.company.toLowerCase().includes(query) ||
        app.role.toLowerCase().includes(query) ||
        app.email.toLowerCase().includes(query) ||
        (app.location && app.location.toLowerCase().includes(query));

      // 2. Status Filter
      const matchStatus = statusVal === 'All' || app.status === statusVal;

      // 3. Priority Filter
      const matchPriority = priorityVal === 'All' || app.priority === priorityVal;

      return matchQuery && matchStatus && matchPriority;
    });

    // 4. Sorting Logic
    filtered.sort((a, b) => {
      if (sortVal === 'newest') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortVal === 'oldest') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortVal === 'company') {
        return a.company.localeCompare(b.company);
      } else if (sortVal === 'priority') {
        const priorityWeight = { 'High': 3, 'Medium': 2, 'Low': 1 };
        return priorityWeight[b.priority] - priorityWeight[a.priority];
      } else if (sortVal === 'followup') {
        // Handle applications with no follow-up date (put them at the end)
        if (!a.followup && !b.followup) return 0;
        if (!a.followup) return 1;
        if (!b.followup) return -1;
        return new Date(a.followup) - new Date(b.followup);
      }
      return 0;
    });

    // Handle Empty State
    if (filtered.length === 0) {
      applicationsGrid.classList.add('hidden');
      emptyState.classList.remove('hidden');
      // Customize empty state message if it is due to active filters
      if (applications.length > 0) {
        emptyState.querySelector('h3').textContent = 'No matching applications';
        emptyState.querySelector('p').textContent = 'Try adjusting your search query or filter options.';
        emptyStateAddBtn.classList.add('hidden');
      } else {
        emptyState.querySelector('h3').textContent = 'No internship applications added yet';
        emptyState.querySelector('p').textContent = 'Start tracking your applications by adding your first company details!';
        emptyStateAddBtn.classList.remove('hidden');
      }
      return;
    }

    emptyState.classList.add('hidden');
    applicationsGrid.classList.remove('hidden');

    // Create Cards
    const today = new Date().toISOString().split('T')[0];
    
    filtered.forEach(app => {
      const card = document.createElement('div');
      
      // Determine priority class
      let priorityClass = `priority-${app.priority.toLowerCase()}`;
      card.className = `app-card ${priorityClass}`;

      // Check follow-up dates and status to highlight warning/overdue
      let reminderHtml = '';
      if (app.followup && app.status !== 'Selected' && app.status !== 'Rejected') {
        if (app.followup === today) {
          card.classList.add('follow-up-today');
          reminderHtml = `<span class="reminder-badge"><i class="fa-solid fa-bell"></i> Follow up today</span>`;
        } else if (app.followup < today) {
          card.classList.add('follow-up-overdue');
          reminderHtml = `<span class="reminder-badge overdue"><i class="fa-solid fa-circle-exclamation"></i> Overdue follow-up</span>`;
        }
      }

      // Format clean dates for display
      const formattedAppDate = formatDate(app.date);
      const formattedFollowDate = app.followup ? formatDate(app.followup) : 'N/A';

      // Clean website URL
      let websiteLink = '';
      if (app.website) {
        const fullUrl = app.website.startsWith('http') ? app.website : `https://${app.website}`;
        websiteLink = `<a href="${fullUrl}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>`;
      }

      const statusBadgeClass = `badge-status-${app.status.toLowerCase().replace(/\s+/g, '')}`;
      const priorityBadgeClass = `badge-priority-${app.priority.toLowerCase()}`;

      // Add HTML structure
      card.innerHTML = `
        <div class="card-header">
          <div class="company-title-area">
            <span class="company-name">
              ${app.company} ${websiteLink}
            </span>
            <span class="role-name">${app.role}</span>
          </div>
          <div class="badges-area">
            <span class="badge ${statusBadgeClass}">${app.status}</span>
            <span class="badge-priority ${priorityBadgeClass}">${app.priority} Priority</span>
            ${reminderHtml}
          </div>
        </div>
        
        <div class="card-details">
          <div class="detail-row">
            <i class="fa-solid fa-location-dot"></i>
            <span class="label">Location:</span>
            <span class="value">${app.location || 'N/A'}</span>
          </div>
          <div class="detail-row">
            <i class="fa-solid fa-envelope"></i>
            <span class="label">Email:</span>
            <span class="value"><a href="mailto:${app.email}">${app.email}</a></span>
          </div>
          <div class="detail-row">
            <i class="fa-solid fa-user-tie"></i>
            <span class="label">Contact:</span>
            <span class="value">${app.contact || 'N/A'}</span>
          </div>
          <div class="detail-row">
            <i class="fa-solid fa-calendar"></i>
            <span class="label">Applied:</span>
            <span class="value">${formattedAppDate}</span>
          </div>
          <div class="detail-row">
            <i class="fa-solid fa-calendar-days"></i>
            <span class="label">Follow-up:</span>
            <span class="value">${formattedFollowDate}</span>
          </div>
        </div>

        ${app.notes ? `<div class="card-notes" title="Notes">${app.notes}</div>` : ''}

        <div class="card-actions">
          <button class="btn btn-secondary edit-btn" data-id="${app.id}">
            <i class="fa-solid fa-pen-to-square"></i> Edit
          </button>
          <button class="btn btn-danger-outline delete-btn" data-id="${app.id}">
            <i class="fa-solid fa-trash"></i> Delete
          </button>
        </div>
      `;

      applicationsGrid.appendChild(card);
    });

    // Add event listeners to newly generated buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        openEditForm(id);
      });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        deleteApplication(id);
      });
    });
  }

  // Helper date formatter
  function formatDate(dateString) {
    if (!dateString) return '';
    const dateObj = new Date(dateString);
    if (isNaN(dateObj)) return dateString;
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // --- Real-time Search and Filter Event Listeners ---
  searchInput.addEventListener('input', renderDashboard);
  statusFilter.addEventListener('change', renderDashboard);
  priorityFilter.addEventListener('change', renderDashboard);
  sortBy.addEventListener('change', renderDashboard);

  // --- Add / Edit Modal Controls ---
  function openModal(title, isEdit = false) {
    modalTitle.textContent = title;
    formModal.classList.remove('hidden');
    formModal.setAttribute('aria-hidden', 'false');
    
    // Set date to today on fresh modals if empty
    if (!isEdit) {
      applicationDateInput.value = new Date().toISOString().split('T')[0];
    }
  }

  function closeModal() {
    formModal.classList.add('hidden');
    formModal.setAttribute('aria-hidden', 'true');
    clearFormErrors();
    applicationForm.reset();
    editIndexInput.value = "-1";
  }

  openAddModalBtn.addEventListener('click', () => openModal('Add Internship Application'));
  emptyStateAddBtn.addEventListener('click', () => openModal('Add Internship Application'));
  closeModalBtn.addEventListener('click', closeModal);
  cancelFormBtn.addEventListener('click', closeModal);
  
  // Close modal when clicking on overlay
  formModal.addEventListener('click', (e) => {
    if (e.target === formModal) closeModal();
  });

  // --- Inline Form Validation ---
  function validateForm() {
    let isValid = true;
    clearFormErrors();

    // 1. Company Name
    if (!companyNameInput.value.trim()) {
      showInputError(companyNameInput, companyNameInputError, 'Company name is required.');
      isValid = false;
    }

    // 2. Role Applied For
    if (!roleAppliedInput.value.trim()) {
      showInputError(roleAppliedInput, roleAppliedInputError, 'Role applied for is required.');
      isValid = false;
    }

    // 3. Contact Email
    const emailVal = contactEmailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal) {
      showInputError(contactEmailInput, contactEmailInputError, 'Contact email is required.');
      isValid = false;
    } else if (!emailRegex.test(emailVal)) {
      showInputError(contactEmailInput, contactEmailInputError, 'Please enter a valid email address.');
      isValid = false;
    }

    // 4. Application Date
    if (!applicationDateInput.value) {
      showInputError(applicationDateInput, applicationDateInputError, 'Application date is required.');
      isValid = false;
    }

    // 5. Follow-up date validation
    if (applicationDateInput.value && followupDateInput.value) {
      const appDate = new Date(applicationDateInput.value);
      const followDate = new Date(followupDateInput.value);
      if (followDate < appDate) {
        showInputError(followupDateInput, followupDateInputError, 'Follow-up date cannot be before application date.');
        isValid = false;
      }
    }

    // 6. Website URL validation (if entered)
    const webVal = companyWebsiteInput.value.trim();
    if (webVal) {
      // Regex check for standard URLs (with or without http/s protocol)
      const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
      if (!urlRegex.test(webVal)) {
        showInputError(companyWebsiteInput, companyWebsiteInputError, 'Please enter a valid website URL.');
        isValid = false;
      }
    }

    return isValid;
  }

  function showInputError(inputEl, errorEl, message) {
    const group = inputEl.closest('.form-group');
    if (group) group.classList.add('has-error');
    errorEl.textContent = message;
  }

  function clearFormErrors() {
    document.querySelectorAll('.form-group').forEach(group => {
      group.classList.remove('has-error');
    });
    document.querySelectorAll('.error-msg').forEach(msg => {
      msg.textContent = '';
    });
  }

  // Clear errors dynamically on input change
  const inputElements = [companyNameInput, roleAppliedInput, contactEmailInput, applicationDateInput, followupDateInput, companyWebsiteInput];
  inputElements.forEach(input => {
    input.addEventListener('input', () => {
      const group = input.closest('.form-group');
      if (group && group.classList.contains('has-error')) {
        group.classList.remove('has-error');
        const errorEl = group.querySelector('.error-msg');
        if (errorEl) errorEl.textContent = '';
      }
    });
  });

  // --- CRUD Operation: Add or Edit ---
  applicationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast('Please correct form errors.', 'error');
      return;
    }

    const editId = editIndexInput.value;

    const appObject = {
      id: editId !== "-1" ? editId : Date.now().toString(),
      company: companyNameInput.value.trim(),
      role: roleAppliedInput.value.trim(),
      email: contactEmailInput.value.trim(),
      website: companyWebsiteInput.value.trim(),
      location: companyLocationInput.value.trim(),
      contact: contactPersonInput.value.trim(),
      date: applicationDateInput.value,
      followup: followupDateInput.value || null,
      status: applicationStatusInput.value,
      priority: priorityLevelInput.value,
      notes: notesInput.value.trim()
    };

    if (editId !== "-1") {
      // Edit mode
      const index = applications.findIndex(app => app.id === editId);
      if (index !== -1) {
        applications[index] = appObject;
        showToast('Application updated successfully!');
      }
    } else {
      // Add mode
      applications.push(appObject);
      showToast('Application added successfully!');
    }

    saveToLocalStorage();
    closeModal();
    renderDashboard();
  });

  // --- CRUD Operation: Trigger Edit Form ---
  function openEditForm(id) {
    const app = applications.find(item => item.id === id);
    if (!app) return;

    // Fill form fields
    editIndexInput.value = app.id;
    companyNameInput.value = app.company;
    roleAppliedInput.value = app.role;
    contactEmailInput.value = app.email;
    companyWebsiteInput.value = app.website || '';
    companyLocationInput.value = app.location || '';
    contactPersonInput.value = app.contact || '';
    applicationDateInput.value = app.date;
    followupDateInput.value = app.followup || '';
    applicationStatusInput.value = app.status;
    priorityLevelInput.value = app.priority;
    notesInput.value = app.notes || '';

    openModal('Edit Internship Application', true);
  }

  // --- CRUD Operation: Delete ---
  async function deleteApplication(id) {
    const app = applications.find(item => item.id === id);
    if (!app) return;

    const confirmed = await showConfirm(
      'Delete Application?',
      `Are you sure you want to delete your application for ${app.company} (${app.role})? This action cannot be undone.`,
      true
    );

    if (confirmed) {
      applications = applications.filter(item => item.id !== id);
      saveToLocalStorage();
      renderDashboard();
      showToast('Application deleted successfully!', 'warning');
    }
  }

  // --- Clear All Data Handler ---
  clearAllBtn.addEventListener('click', async () => {
    if (applications.length === 0) {
      showToast('No applications to clear.', 'info');
      return;
    }

    const confirmed = await showConfirm(
      'Clear All Data?',
      'Are you sure you want to permanently delete ALL internship applications? This cannot be undone.',
      true
    );

    if (confirmed) {
      applications = [];
      saveToLocalStorage();
      renderDashboard();
      showToast('All internship applications deleted.', 'warning');
    }
  });

  // --- CSV Export Functionality ---
  exportCsvBtn.addEventListener('click', () => {
    if (applications.length === 0) {
      showToast('No data available to export.', 'error');
      return;
    }

    // CSV Headers
    const headers = [
      'Company Name',
      'Role Applied For',
      'Contact Email',
      'Company Website',
      'Company Location',
      'Contact Person',
      'Application Date',
      'Follow-up Date',
      'Application Status',
      'Priority Level',
      'Notes'
    ];

    // CSV Rows mapping
    const rows = applications.map(app => [
      app.company,
      app.role,
      app.email,
      app.website || '',
      app.location || '',
      app.contact || '',
      app.date,
      app.followup || '',
      app.status,
      app.priority,
      app.notes || ''
    ]);

    // Construct CSV text content (escape quotes and commas)
    const csvContent = [
      headers.join(','),
      ...rows.map(row => 
        row.map(value => {
          // Escape quotes and wrap cell value in quotes
          const escaped = String(value).replace(/"/g, '""');
          return `"${escaped}"`;
        }).join(',')
      )
    ].join('\n');

    // Create file download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', url);
    downloadLink.setAttribute('download', `Internship_Applications_${new Date().toISOString().split('T')[0]}.csv`);
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    showToast('CSV export successful!');
  });

  // --- CSV Import Functionality ---
  importCsvInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const csvText = event.target.result;
      const importedApps = parseCSV(csvText);

      if (importedApps.length === 0) {
        showToast('Invalid CSV format. Please ensure correct headers.', 'error');
        importCsvInput.value = ''; // Reset input file
        return;
      }

      const confirmed = await showConfirm(
        'Import Applications',
        `Found ${importedApps.length} internship applications. Do you want to merge them into your tracker?`,
        false
      );

      if (confirmed) {
        // Merge apps (check for duplications or simply add)
        applications = [...applications, ...importedApps];
        saveToLocalStorage();
        renderDashboard();
        showToast(`Successfully imported ${importedApps.length} applications!`);
      }
      importCsvInput.value = ''; // Reset input file
    };
    
    reader.onerror = () => {
      showToast('Error reading CSV file.', 'error');
      importCsvInput.value = '';
    };

    reader.readAsText(file);
  });

  // Simple CSV Parser ignoring basic split bugs
  function parseCSV(text) {
    const lines = text.split(/\r?\n/);
    if (lines.length < 2) return [];

    // Parse header to check correctness
    const headerLine = lines[0].split(',');
    // Strip surrounding quotes
    const headers = headerLine.map(h => h.replace(/^"(.*)"$/, '$1').trim().toLowerCase());
    
    // Map required column index
    const companyIndex = headers.indexOf('company name');
    const roleIndex = headers.indexOf('role applied for');
    const emailIndex = headers.indexOf('contact email');
    const appDateIndex = headers.indexOf('application date');
    const statusIndex = headers.indexOf('application status');
    
    // Fail if critical headers are missing
    if (companyIndex === -1 || roleIndex === -1 || emailIndex === -1 || appDateIndex === -1 || statusIndex === -1) {
      return [];
    }

    // Optional indices
    const websiteIndex = headers.indexOf('company website');
    const locationIndex = headers.indexOf('company location');
    const contactIndex = headers.indexOf('contact person');
    const followupIndex = headers.indexOf('follow-up date');
    const priorityIndex = headers.indexOf('priority level');
    const notesIndex = headers.indexOf('notes');

    const result = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Handle quoted commas properly using regex splits
      const values = [];
      let isInsideQuotes = false;
      let currentValue = '';

      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '"') {
          // Check for escaped double quotes
          if (isInsideQuotes && line[j+1] === '"') {
            currentValue += '"';
            j++; // Skip next quote
          } else {
            isInsideQuotes = !isInsideQuotes;
          }
        } else if (char === ',' && !isInsideQuotes) {
          values.push(currentValue.trim());
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      values.push(currentValue.trim());

      // Skip lines that don't match header length roughly
      if (values.length < 5) continue;

      // Map and clean values
      const company = values[companyIndex] || '';
      const role = values[roleIndex] || '';
      const email = values[emailIndex] || '';
      const date = values[appDateIndex] || '';
      let status = values[statusIndex] || 'Applied';
      
      // Default fallback validations
      if (!company || !role || !email || !date) continue;

      // Clean status values
      const validStatuses = ['Not Applied', 'Applied', 'Follow-up Needed', 'Interview Scheduled', 'Selected', 'Rejected'];
      if (!validStatuses.includes(status)) status = 'Applied';

      // Clean priority values
      let priority = 'Medium';
      if (priorityIndex !== -1 && values[priorityIndex]) {
        const pVal = values[priorityIndex];
        if (['High', 'Medium', 'Low'].includes(pVal)) priority = pVal;
      }

      result.push({
        id: (Date.now() + i).toString(),
        company,
        role,
        email,
        website: websiteIndex !== -1 ? values[websiteIndex] : '',
        location: locationIndex !== -1 ? values[locationIndex] : '',
        contact: contactIndex !== -1 ? values[contactIndex] : '',
        date,
        followup: (followupIndex !== -1 && values[followupIndex]) ? values[followupIndex] : null,
        status,
        priority,
        notes: notesIndex !== -1 ? values[notesIndex] : ''
      });
    }

    return result;
  }

  // --- Sample Mock Data ---
  function getSampleData() {
    return [
      {
        id: "1",
        company: "EyeROV",
        role: "Software Intern",
        email: "careers@eyerov.com",
        website: "https://eyerov.com",
        location: "Kochi",
        contact: "HR Team",
        date: new Date(Date.now() - 24 * 60 * 60 * 1000 * 5).toISOString().split('T')[0], // 5 days ago
        followup: new Date(Date.now() + 24 * 60 * 60 * 1000 * 2).toISOString().split('T')[0], // 2 days in future
        status: "Applied",
        priority: "High",
        notes: "Robotics startup. Good for Python/C++ internship. Talked to lead developer."
      },
      {
        id: "2",
        company: "Google",
        role: "SWE Intern",
        email: "swe-hiring@google.com",
        website: "https://careers.google.com",
        location: "Bengaluru",
        contact: "Recruiting Coordinator",
        date: new Date(Date.now() - 24 * 60 * 60 * 1000 * 15).toISOString().split('T')[0], // 15 days ago
        followup: new Date().toISOString().split('T')[0], // Today
        status: "Follow-up Needed",
        priority: "High",
        notes: "Resume screened. Need to follow up on status regarding online assessment."
      },
      {
        id: "3",
        company: "Razorpay",
        role: "Backend Engineer Intern",
        email: "jobs@razorpay.com",
        website: "https://razorpay.com",
        location: "Remote",
        contact: "Hiring Manager",
        date: new Date(Date.now() - 24 * 60 * 60 * 1000 * 30).toISOString().split('T')[0], // 30 days ago
        followup: new Date(Date.now() - 24 * 60 * 60 * 1000 * 5).toISOString().split('T')[0], // 5 days overdue
        status: "Interview Scheduled",
        priority: "Medium",
        notes: "System design rounds scheduled. Focus on Redis, Node.js and SQL."
      },
      {
        id: "4",
        company: "Microsoft",
        role: "Research Intern",
        email: "msr-india@microsoft.com",
        website: "https://microsoft.com",
        location: "Bengaluru",
        contact: "Aditya Roy (Researcher)",
        date: new Date(Date.now() - 24 * 60 * 60 * 1000 * 8).toISOString().split('T')[0],
        followup: null,
        status: "Selected",
        priority: "High",
        notes: "Mathematics and computing research role. Selected! Offer letter received."
      }
    ];
  }
});
