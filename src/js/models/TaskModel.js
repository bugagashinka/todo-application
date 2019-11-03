import { OPEN_STATUS, DONE_STATUS, NORMAL_PRIORITY } from '../constants';

export default class Task {
  constructor(
    title = '',
    description = '',
    priority = NORMAL_PRIORITY,
    status = OPEN_STATUS,
    date,
  ) {
    Object.assign(this, {
      title,
      description,
      priority,
      status,
      date: Number(date) || new Date().getTime(),
    });
  }

  isOpen() {
    return this.status === OPEN_STATUS;
  }

  setTitle(value) {
    this.title = value;
  }

  setDescription(value) {
    this.description = value;
  }

  toggleStatus() {
    this.status = this.isOpen() ? DONE_STATUS : OPEN_STATUS;
  }

  setPriority(value) {
    this.status = value;
  }

  toString() {
    return JSON.stringify({ [this.date]: this });
  }
}
