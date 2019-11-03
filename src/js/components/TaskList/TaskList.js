const TaskList = {
  init(element) {
    this.element = element;
  },

  addTask(taskElement) {
    this.element.insertAdjacentElement('afterbegin', taskElement);
  },

  addAllTask(elementList) {
    const holder = document.createDocumentFragment();
    elementList.forEach((element) => {
      holder.appendChild(element);
    });
    this.element.innerHTML = '';
    this.element.appendChild(holder);
  },

  replaceTask(newTaskElement, taskElement) {
    this.element.replaceChild(newTaskElement, taskElement);
  },

  removeTask(taskElement) {
    this.element.removeChild(taskElement);
  },
};

export default TaskList;
