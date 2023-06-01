// elementos capturados
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

// funções e eventos
const createTask = () => {
  const task = inputTextTask.value;
  const li = document.createElement('li');
  // li.innerText = task;
  li.innerHTML = `${task}<button class='delete-btn'>✕</button>`;
  taskList.appendChild(li);
  inputTextTask.value = '';
  // precisa passar o deleteTask() para que o botão consiga deletar a lista
  addDeleteEvent();
}

const BtnCreateTaskEvent = () => btnCreateTask
  .addEventListener('click', () => createTask() )

  BtnCreateTaskEvent();

const SetEnterToCreateTask = () => {
  inputTextTask.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      createTask();
    }
  });
};

SetEnterToCreateTask();

const addDeleteEvent = () => {
const allDeleteBtns = document.querySelectorAll('.delete-btn');
allDeleteBtns.forEach(item => {
  item.addEventListener('click', event => {
    const li = (event.target).parentElement;
    li.remove();
  })
});
};

addDeleteEvent();

const clearList = () => {
    const allTasks = document.querySelectorAll('li');
    allTasks.forEach((item) => item.remove());
    // taskList.replaceChildren();
};

const btnClearListEvent = () => {
  btnClearList.addEventListener('click', () => {
    clearList();
  });
}

btnClearListEvent();

// salvar e recuperar listas no localStorage

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

// pega a lista a cada refresh

let getListSaved = [];

if (localStorage.getItem('listSaved')) {
  getListSaved = JSON.parse(localStorage.getItem('listSaved'));
  // remove as 3 tarefas padrões no arquivo HTML
  const defaultTasks = document.querySelectorAll('li');
  defaultTasks.forEach((item) => item.remove());
}

const loadSaved = () => {
  for (let index = 0; index < getListSaved.length; index += 1) {
    const li = document.createElement('li');
    const task = getListSaved[index];
    li.innerHTML = task;
    li.draggable = true;
    taskList.appendChild(li);
  }
    addDeleteEvent();
  };

loadSaved();

const markSelected = () => {
  taskList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
      const li = event.target;
      li.style.backgroundColor = 'rgb(238, 255, 1)'; 
      deselectTask(li);
    }
  });
};

markSelected();

const deselectTask = (li) => {
  const allTask = taskList.children;
  for (let index = 0; index < allTask.length; index += 1) {
    if (allTask[index] !== li) {
      allTask[index].style.backgroundColor = 'rgb(247 , 247 , 247)';
    }
  }
}

const moveTaskUp = () => {
  btnMoveUp.addEventListener('click', () => {
    const allTask = taskList.children;
    for (let index = 1; index < allTask.length; index += 1) {
      if (allTask[index].style.backgroundColor === 'rgb(238, 255, 1)') {
        taskList.insertBefore(allTask[index], allTask[index - 1]);
      }
    }
  });
};

moveTaskUp();

const moveTaskDown = () => {
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

moveTaskDown();

const isSelected = (task) => {
  const result = task.style.backgroundColor === 'rgb(238, 255, 1)';
  return result;
};

// Adiciona a feature drag/drop

// Add event listeners for drag and drop events
taskList.addEventListener('dragstart', function(event) {
  // Set the dragged item's data and add a 'dragging' class
  event.dataTransfer.setData('text/plain', event.target.textContent);
  event.target.classList.add('dragging');
});

taskList.addEventListener('dragover', function(event) {
  // Prevent the default behavior to disallow drop
  event.preventDefault();
});

taskList.addEventListener('drop', function(event) {
  event.preventDefault();

  let draggingItem = taskList.querySelector('.dragging');
  draggingItem.classList.remove('dragging');

  let dropTarget = event.target;
  if (event.target.tagName === 'UL') {
    dropTarget = event.target.lastElementChild;
  } else if (event.target.tagName === 'LI') {
    dropTarget = event.target;
  }

  const nextSibling = dropTarget.nextElementSibling;
  if (nextSibling === draggingItem) {
    taskList.insertBefore(draggingItem, dropTarget);
  } else {
    taskList.insertBefore(draggingItem, nextSibling);
  }
});




// taskList.addEventListener('drop', function(event) {
//   // Prevent the default behavior to open dragged item as a link
//   event.preventDefault();

//   // Remove the 'dragging' class from the dragged item
//   let draggingItem = taskList.querySelector('.dragging');
//   draggingItem.classList.remove('dragging');

//   // Insert the dragged item before the drop target
//   let dropTarget = event.target;
//   if (event.target.tagName === 'UL') {
//     dropTarget = event.target.lastElementChild;
//   } 
//   else if (event.target.tagName === 'LI') {
//     dropTarget = event.target;
//   }
//   dropTarget.insertBefore(draggingItem, event.target);
// });

// let dropTarget = event.target;
// if (event.target.tagName === 'LI') {
//   dropTarget = event.target.parentNode;
// }