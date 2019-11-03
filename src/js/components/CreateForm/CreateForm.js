import { NORMAL_PRIORITY } from '../../constants';

const titleInput = document.getElementById('title-input');
const descriptionInput = document.getElementById('description-input');
const priorityInput = document.getElementById('priority-input');

const createFormElement = document.getElementById('create-form');
const cancelButton = document.getElementById('cancel-button');
const saveButton = document.getElementById('save-button');

const createWindow = document.getElementById('create-window');

const saveResolve = (event, resolve) => {
  titleInput.value = titleInput.value.trim();
  descriptionInput.value = descriptionInput.value.trim();
  priorityInput.value = priorityInput.value.trim();

  if (createFormElement.checkValidity()) {
    event.preventDefault();
    resolve({
      title: titleInput.value,
      description: descriptionInput.value,
      priority: priorityInput.value,
    });
  }
};

const cancelReject = (event, reject) => {
  event.preventDefault();
  reject();
};

const CreateForm = {
  init() {},

  open(formData = { title: '', description: '', priority: NORMAL_PRIORITY }) {
    [titleInput.value, descriptionInput.value, priorityInput.value] = [
      ...[formData.title, formData.description, formData.priority],
    ];

    createWindow.classList.toggle('create-task_visible');
    titleInput.focus();
    const options = {
      once: true,
      capture: false,
    };
    return new Promise((resolve, reject) => {
      cancelButton.addEventListener(
        'click',
        (event) => cancelReject(event, reject),
        options,
      );
      saveButton.addEventListener(
        'click',
        (event) => saveResolve(event, resolve),
        options,
      );
    }).finally(this.close);
  },

  close() {
    createWindow.classList.toggle('create-task_visible');
  },
};

export default CreateForm;
