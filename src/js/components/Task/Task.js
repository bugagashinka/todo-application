import { DONE_STATUS, MAX_UI_STRING_LENGTH } from '../../constants';

import { Filter } from '../Filter';
import TaskModel from '../../models/TaskModel';
import { TaskMenu } from './TaskMenu';

const checkStringLength = (str) => {
  return str.length > MAX_UI_STRING_LENGTH
    ? str.slice(0, MAX_UI_STRING_LENGTH).concat('...')
    : str;
};

export default class Task {
  constructor({ title, description, priority, status }, handlers) {
    this.proto = new TaskModel(title, description, priority, status);

    const taskElement = document.createElement('div');
    taskElement.innerHTML = `${this}`.trim();
    this.element = taskElement.firstChild;

    const clonedHandlers = {
      ...handlers,
      onDone: (currentTaskElement) => {
        this.onDone();
        handlers.onDone(currentTaskElement);
      },
    };

    const contextMenuProto = new TaskMenu(this.element, clonedHandlers);
    this.element.querySelector('.task-footer').appendChild(contextMenuProto.element);
  }

  onDone() {
    this.element.classList.toggle(`task_${DONE_STATUS}`);
    this.showCheckbox();
  }

  showCheckbox() {
    Promise.resolve().then(() => {
      setTimeout(() => {
        const statusCheckbox = this.element.querySelector('.task-header__status');
        statusCheckbox.checked = !statusCheckbox.checked;

        statusCheckbox.addEventListener(
          'click',
          ({ target }) => {
            target.checked = false;
            this.proto.toggleStatus();
            this.element.classList.toggle(`task_${DONE_STATUS}`);
            Filter.filterChanged();
          },
          { once: true, capture: false },
        );
      }, 0);
    });
  }

  toString() {
    const title = checkStringLength(this.proto.title);
    const description = checkStringLength(this.proto.description);
    const isOpenStatus = this.proto.isOpen() ? '' : `task_${DONE_STATUS}`;
    if (isOpenStatus) this.showCheckbox();

    return `
      <div class="task ${isOpenStatus}">
        <div class="task-header">
          <input type="checkbox" class="task-header__status" name="status"/>
          <h4 class="task-header__title">${title}</h4>
          <p class="task-header__description">${description}</p>
        </div>
        <div class="task-footer">
          <div class="task-footer__priority">${this.proto.priority}</div>
        </div>
      </div>`;
  }
}
