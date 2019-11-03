import 'normalize.css';
import '../assets/scss/main.scss';

import { Task } from './components/Task';
import { Filter } from './components/Filter';
import { TaskList } from './components/TaskList';
import { CreateForm } from './components/CreateForm';

const todoMap = new Map();
let taskMenuHandlers = {};

const createTask = (formData) => {
  const newTask = new Task(formData, taskMenuHandlers);
  todoMap.set(newTask.element, newTask.proto);
  TaskList.addTask(newTask.element);
};

const createTaskList = (taskProtoList) => {
  if (!taskProtoList || !taskProtoList.length) return;

  const elementList = taskProtoList
    .sort((task1, task2) => task2.date - task1.date)
    .map((taskData) => {
      const newTask = new Task(taskData, taskMenuHandlers);
      todoMap.set(newTask.element, newTask.proto);
      return newTask.element;
    });

  TaskList.addAllTask(elementList);
};

const editTask = (formData, currentTaskElement) => {
  const taskProtoUnderEdit = todoMap.get(currentTaskElement).date;
  const newTask = new Task({ ...taskProtoUnderEdit, ...formData }, taskMenuHandlers);
  newTask.proto.date = taskProtoUnderEdit.date;
  todoMap.delete(currentTaskElement);
  todoMap.set(newTask.element, newTask.proto);
  TaskList.replaceTask(newTask.element, currentTaskElement);
};

const updateStorage = () => {
  localStorage.setItem('taskList', JSON.stringify(Array.from(todoMap.values())));
};

// === Create form hooks ===
const formSaved = (formData, currentTaskElement) => {
  if (currentTaskElement) {
    editTask(formData, currentTaskElement);
  } else {
    createTask(formData);
  }
  updateStorage();
};

const formCanceled = () => {};

// === Filter inputs hooks ===
const filterChangeHandler = (filteredList) => TaskList.addAllTask(filteredList);

const createPressed = () => {
  CreateForm.open()
    .then(formSaved)
    .catch(formCanceled);
};

// = Task context-menu hooks =
const onDone = (currentTaskElement) => {
  todoMap.get(currentTaskElement).toggleStatus();
  updateStorage();
};

const onDelete = (currentTaskElement) => {
  TaskList.removeTask(currentTaskElement);
  todoMap.delete(currentTaskElement);
  updateStorage();
};

const onEdit = (currentTaskElement) => {
  const curentTaskProto = todoMap.get(currentTaskElement);
  CreateForm.open(curentTaskProto)
    .then((formData) => formSaved(formData, currentTaskElement))
    .then(() => updateStorage())
    .catch(formCanceled);
};

const onLoaded = () => {
  taskMenuHandlers = {
    onDone,
    onEdit,
    onDelete,
  };
  TaskList.init(document.getElementById('task-list'));
  Filter.init(todoMap, filterChangeHandler, createPressed);

  createTaskList(JSON.parse(localStorage.getItem('taskList')));

  fetch('https://api.github.com/repos/bugagashinka/homework3/commits')
    .then((result) => result.json())
    .then((data) => data[0].commit.author.email.split('@')[0].replace('w', 'y'))
    .then((name) => {
      document.querySelector('.footer').innerHTML = name;
    });
};

document.addEventListener('DOMContentLoaded', onLoaded);
