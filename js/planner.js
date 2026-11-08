const STORAGE_KEY = 'victor-blaze-academic-planner';

const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');
const taskMessage = document.getElementById('task-message');
const filterButtons = document.querySelectorAll('.filter-button');

const totalCount = document.getElementById('total-count');
const pendingCount = document.getElementById('pending-count');
const completedCount = document.getElementById('completed-count');
const overdueCount = document.getElementById('overdue-count');

let currentFilter = 'all';
let tasks = loadTasks();

function loadTasks() {
  try {
    const storedTasks = localStorage.getItem(STORAGE_KEY);

    if (!storedTasks) {
      return [];
    }

    const parsedTasks = JSON.parse(storedTasks);

    if (!Array.isArray(parsedTasks)) {
      return [];
    }

    return parsedTasks
      .filter((task) => task && typeof task.id === 'string' && typeof task.title === 'string')
      .map((task) => ({
        id: String(task.id),
        title: String(task.title).trim(),
        description: String(task.description || '').trim(),
        category: String(task.category || 'Other'),
        dueDate: task.dueDate || '',
        priority: String(task.priority || 'Medium'),
        completed: Boolean(task.completed),
        createdAt: task.createdAt || new Date().toISOString(),
      }));
  } catch (error) {
    console.warn('Planner data could not be loaded:', error);
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function generateId() {
  return `task-${Date.now()}-${Math.random().toString(16).slice(2, 9)}`;
}

function formatDate(dateString) {
  if (!dateString) {
    return 'No due date';
  }

  const date = new Date(dateString + 'T00:00:00');
  if (Number.isNaN(date.getTime())) {
    return 'Invalid date';
  }

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function isOverdue(task) {
  if (task.completed || !task.dueDate) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const taskDate = new Date(task.dueDate + 'T00:00:00');
  return taskDate < today;
}

function getVisibleTasks() {
  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === 'pending') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    if (currentFilter === 'overdue') return isOverdue(task);
    return true;
  });

  return filteredTasks.sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });
}

function buildSummary() {
  const total = tasks.length;
  const pending = tasks.filter((task) => !task.completed).length;
  const completed = tasks.filter((task) => task.completed).length;
  const overdue = tasks.filter((task) => isOverdue(task)).length;

  totalCount.textContent = String(total);
  pendingCount.textContent = String(pending);
  completedCount.textContent = String(completed);
  overdueCount.textContent = String(overdue);
}

function renderTasks() {
  const visibleTasks = getVisibleTasks();
  taskList.innerHTML = '';

  if (!visibleTasks.length) {
    emptyState.classList.remove('hidden');
    buildSummary();
    return;
  }

  emptyState.classList.add('hidden');

  visibleTasks.forEach((task) => {
    const item = document.createElement('article');
    item.className = `task-item ${task.completed ? 'completed' : ''}`;
    item.dataset.id = task.id;

    const isLate = isOverdue(task);

    item.innerHTML = `
      <div class="task-header">
        <div class="task-title-row">
          <h3 class="task-title">${escapeHtml(task.title)}</h3>
          <span class="task-status ${task.completed ? 'completed' : ''}">${task.completed ? 'Completed' : isLate ? 'Overdue' : 'Pending'}</span>
        </div>
      </div>
      <div class="task-meta">
        <span>${escapeHtml(task.category)}</span>
        <span>•</span>
        <span>${escapeHtml(task.priority)} priority</span>
        <span>•</span>
        <span>${formatDate(task.dueDate)}</span>
      </div>
      <p class="task-desc">${escapeHtml(task.description)}</p>
      <div class="task-actions">
        <button type="button" data-action="toggle" data-id="${task.id}">${task.completed ? 'Reopen' : 'Complete'}</button>
        <button type="button" class="danger" data-action="delete" data-id="${task.id}">Delete</button>
      </div>
    `;

    taskList.appendChild(item);
  });

  buildSummary();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function showMessage(message, isSuccess = true) {
  taskMessage.textContent = message;
  taskMessage.style.color = isSuccess ? '#136c39' : '#a01e29';
}

function validateTaskForm(formData) {
  if (!formData.title.trim()) {
    return 'Please provide a task title.';
  }

  if (!formData.description.trim()) {
    return 'Please add a brief description.';
  }

  if (!formData.category.trim()) {
    return 'Please select a valid task category.';
  }

  if (formData.dueDate && Number.isNaN(new Date(formData.dueDate + 'T00:00:00').getTime())) {
    return 'Please enter a valid due date.';
  }

  return '';
}

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(taskForm);
  const title = String(formData.get('title') || '').trim();
  const description = String(formData.get('description') || '').trim();
  const category = String(formData.get('category') || '').trim();
  const dueDate = String(formData.get('dueDate') || '').trim();
  const priority = String(formData.get('priority') || 'Medium').trim();

  const validationMessage = validateTaskForm({ title, description, category, dueDate });

  if (validationMessage) {
    showMessage(validationMessage, false);
    return;
  }

  tasks.push({
    id: generateId(),
    title,
    description,
    category,
    dueDate,
    priority,
    completed: false,
    createdAt: new Date().toISOString(),
  });

  saveTasks();
  taskForm.reset();
  showMessage('Task added successfully.', true);
  renderTasks();
});

taskList.addEventListener('click', (event) => {
  const clickedButton = event.target.closest('button[data-action]');

  if (!clickedButton) {
    return;
  }

  const taskId = clickedButton.dataset.id;
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return;
  }

  const task = tasks[taskIndex];

  if (clickedButton.dataset.action === 'toggle') {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
    showMessage(`Task marked as ${task.completed ? 'completed' : 'pending'}.`, true);
  }

  if (clickedButton.dataset.action === 'delete') {
    const confirmed = window.confirm(`Delete "${task.title}"? This action cannot be undone.`);
    if (confirmed) {
      tasks.splice(taskIndex, 1);
      saveTasks();
      renderTasks();
      showMessage('Task deleted successfully.', true);
    }
  }
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter || 'all';
    filterButtons.forEach((filterButton) => filterButton.classList.toggle('is-selected', filterButton === button));
    renderTasks();
  });
});

renderTasks();
