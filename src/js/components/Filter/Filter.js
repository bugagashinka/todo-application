import { ALL_DEF_PRIORITY, ALL_DEF_STATUS } from '../../constants';

const filterForm = document.getElementById('filter-form');
const priorityInput = document.getElementById('priority-filter');
const statusInput = document.getElementById('status-filter');
const titleInput = document.getElementById('title-filter');
const createButton = document.getElementById('create-task');
const hamburgerMenu = document.getElementById('filter-menu-button');

let filterConditions = {
  title: '',
  priority: ALL_DEF_PRIORITY,
  status: ALL_DEF_STATUS,
};

const buttonMenuHandler = () => {
  hamburgerMenu.classList.toggle('open');
  filterForm.classList.toggle('open');
};

const Filter = {
  init(todoMap, onChange, onCreatePress) {
    Object.assign(this, {
      todoMap,
      onChange,
      onCreatePress,
    });
    this.filterChanged = this.filterChanged.bind(this);
    // Add listeners on the filter block elements
    priorityInput.addEventListener('change', this.filterChanged);
    statusInput.addEventListener('change', this.filterChanged);
    titleInput.addEventListener('keyup', this.filterChanged);
    createButton.addEventListener('click', this.onCreatePress);
    hamburgerMenu.addEventListener('click', buttonMenuHandler);
  },

  filterChanged(event) {
    if (event && filterConditions.title === event.target.value.trim()) return;
    filterConditions = {
      title: titleInput.value,
      priority: priorityInput.value.toLowerCase(),
      status: statusInput.value.toLowerCase(),
    };
    this.onChange(this.filter(this.todoMap, filterConditions).reverse());
  },

  filter(todo, { title, priority, status }) {
    const titlePattern = new RegExp(`${title.trim()}`, 'ig');

    const isDefaultTitle = title === '';
    const isDefaultPriority = priority === ALL_DEF_PRIORITY;
    const isDefaultStatus = status === ALL_DEF_STATUS;

    return Array.from(todo.entries())
      .filter(
        ([, task]) =>
          (isDefaultTitle || task.title.match(titlePattern)) &&
          (isDefaultPriority || task.priority === priority) &&
          (isDefaultStatus || task.status === status),
      )
      .map(([taskElement]) => taskElement);
  },
};

export default Filter;
