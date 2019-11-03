import { DONE_MENU_ITEM, EDIT_MENU_ITEM, DELETE_MENU_ITEM } from '../../../constants';

export default class TaskMenu {
  constructor(parentElement, { onDone, onEdit, onDelete }) {
    Object.assign(this, {
      parentElement,
      onDone,
      onEdit,
      onDelete,
    });
    this.menuItemSelected = this.menuItemSelected.bind(this);

    const menuHolder = document.createElement('div');
    menuHolder.innerHTML = `${this}`.trim();
    menuHolder
      .querySelector('.task-menu__content')
      .addEventListener('click', this.menuItemSelected);
    this.element = menuHolder.firstChild;
  }

  menuItemSelected({ target }) {
    switch (target.textContent) {
      case DONE_MENU_ITEM:
        this.onDone(this.parentElement);
        break;
      case EDIT_MENU_ITEM:
        this.onEdit(this.parentElement);
        break;
      case DELETE_MENU_ITEM:
        this.onDelete(this.parentElement);
        break;
      default:
        break;
    }
  }

  toString() {
    return `
      <div class="task-footer__menu">
        <button class="button general-input task-menu__button">...</button>
        <aside class="task-menu__content">
          <ul>
            <li>${DONE_MENU_ITEM}</li>
            <li>${EDIT_MENU_ITEM}</li>
            <li>${DELETE_MENU_ITEM}</li>
          </ul>
        </aside>
      </div>`;
  }
}
