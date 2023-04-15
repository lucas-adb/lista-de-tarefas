const btnCreateTask = document.querySelector('#criar-btn');
const inputTextTask = document.querySelector('#texto-tarefa');
const taskList = document.querySelector('#lista-tarefas');
const btnClearList = document.querySelector('#apaga-tudo');
const btnClearDone = document.querySelector('#remover-finalizados');
const btnSaveList = document.querySelector('#salvar-tarefas');
const btnMoveUp = document.querySelector('#mover-cima');
const btnMoveDown = document.querySelector('#mover-baixo');
const btnRemove = document.querySelector('#remover-selecionado');
const deleteBTN = document.querySelector('.delete-btn');

const createTask = () => {
  const task = inputTextTask.value;
  const li = document.createElement('li');
  li.innerText = task;
  li.innerHTML = `${task}<button class='delete-btn'>✕</button>`;
  taskList.appendChild(li);
  inputTextTask.value = '';
  deleteTask();
}

const clickCriar = () => btnCreateTask
  .addEventListener('click', () => createTask() )

clickCriar();

const pressEnter = () => {
  inputTextTask.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      createTask();
    }
  });
};

pressEnter();

const deleteTask = () => {
document.querySelectorAll('.delete-btn').forEach(item => {
  item.addEventListener('click', event => {
    const li = (event.target).parentElement;
    li.remove();
  })
});
};

deleteTask();

const clearList = () => {
    const completed = document.querySelectorAll('li');
    completed.forEach((item) => item.remove());
    // taskList.replaceChildren();
};

btnClearList.addEventListener('click', () => {
  clearList();
});

const saveList = () => {
  btnSaveList.addEventListener('click', () => {
    const allLi = document.querySelectorAll('li');
    const arrayLi = [];
    for (let index = 0; index < allLi.length; index += 1) {
      arrayLi.push(allLi[index].innerHTML);
    }
    // console.log(arrayLi);
    localStorage.setItem('listSaved', JSON.stringify(arrayLi));
  });
};

saveList();

let getListSaved = [];

if (localStorage.getItem('listSaved')) {
  getListSaved = JSON.parse(localStorage.getItem('listSaved'));
  const completed = document.querySelectorAll('li');
  completed.forEach((item) => item.remove());
}

const loadSaved = () => {
  for (let index = 0; index < getListSaved.length; index += 1) {
    const li = document.createElement('li');
    const task = getListSaved[index];
    li.innerHTML = task;
    taskList.appendChild(li);
    }
  };

loadSaved();

const markSelected = () => {
  taskList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
      const li = event.target;
      li.style.backgroundColor = '#EEFF01'; 
      deselect(li);
    }
  });
};

markSelected();

function deselect(li) {
  const allTask = taskList.children;
  for (let index = 0; index < allTask.length; index += 1) {
    if (allTask[index] !== li) {
      allTask[index].style.backgroundColor = '#F8F8F8';
    }
  }
}

const moveUp = () => {
  btnMoveUp.addEventListener('click', () => {
    const allTask = taskList.children;
    for (let index = 1; index < allTask.length; index += 1) {
      if (allTask[index].style.backgroundColor === 'rgb(238, 255, 1)') {
        taskList.insertBefore(allTask[index], allTask[index - 1]);
      }
    }
  });
};

moveUp();

const moveDown = () => {
  btnMoveDown.addEventListener('click', () => {
    const allTask = taskList.children;
    for (let index = 0; index < allTask.length - 1; index += 1) {
      const current = allTask[index];
      const nextElement = current.nextElementSibling;
      if (nextElement && isSelected(current)) {
        taskList.insertBefore(nextElement, current);
        break;
      }
    }
  });
};

moveDown();

const isSelected = (task) => {
  const result = task.style.backgroundColor === 'rgb(238, 255, 1)';
  return result;
};
