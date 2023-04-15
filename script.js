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
  li.innerHTML = `${task}<button class='delete-btn'>x</button>`;
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

// function deselect(li) {
//   const allTask = taskList.children;
//   for (let index = 0; index < allTask.length; index += 1) {
//     if (allTask[index] !== li) {
//       allTask[index].style.backgroundColor = '#F8F8F8';
//     }
//   }
// }

// const changeBackgroundColor = () => {
//   taskList.addEventListener('click', (event) => {
//     if (event.target.tagName === 'LI') {
//       const li = event.target;
//       // li.style.backgroundColor = 'gray';
//       li.style.backgroundColor = '#EEFF01'; 
//       deselect(li);
//     }
//   });
// };

// changeBackgroundColor();

// const taskCompleted = () => {
//   taskList.addEventListener('dblclick', (event) => {
//     const li = event.target;
//     const liClassList = event.target.classList;
//     if (event.target.tagName === 'LI' && !liClassList.contains('completed')) {
//       li.classList.add('completed');
//     } else if (event.target.tagName === 'LI' && liClassList.contains('completed')) {
//       li.classList.remove('completed');
//     }
//   });
// };

// taskCompleted();

// const clearList = () => {
//   btnClearList.addEventListener('click', () => {
//     const completed = document.querySelectorAll('li');
//     completed.forEach((item) => item.remove());
//     // taskList.replaceChildren();
//   });
// };

// clearList();

// const clearDone = () => {
//   btnClearDone.addEventListener('click', () => {
//     const completed = document.querySelectorAll('.completed');
//     completed.forEach((item) => item.remove());
//   });
// };

// clearDone();

// const saveList = () => {
//   btnSaveList.addEventListener('click', () => {
//     const allLi = document.querySelectorAll('li');
//     const arrayLi = [];
//     for (let index = 0; index < allLi.length; index += 1) {
//       arrayLi.push(allLi[index].innerHTML);
//     }
//     console.log(arrayLi);
//     localStorage.setItem('listSaved', JSON.stringify(arrayLi));
//   });
// };

// saveList();

// const saveClass = () => {
//   btnSaveList.addEventListener('click', () => {
//     const allLi = document.querySelectorAll('li');
//     const arrayClass = [];
//     for (let index = 0; index < allLi.length; index += 1) {
//       if (allLi[index].classList.contains('completed')) {
//         arrayClass.push('completed');
//       } else {
//         arrayClass.push('todo');
//       }
//     }
//     localStorage.setItem('classSaved', JSON.stringify(arrayClass));
//   });
// };

// saveClass();

// let getListSaved = [];
// let getClassSaved = [];

// if (localStorage.getItem('listSaved') && localStorage.getItem('classSaved')) {
//   getListSaved = JSON.parse(localStorage.getItem('listSaved'));
//   getClassSaved = JSON.parse(localStorage.getItem('classSaved'));
// }

// const loadSaved = () => {
//   for (let index = 0; index < getListSaved.length; index += 1) {
//     const li = document.createElement('li');
//     const task = getListSaved[index];
//     li.innerHTML = task;
//     const allClass = getClassSaved[index];
//     if (allClass === 'completed') {
//       li.classList.add('completed');
//     }
//     taskList.appendChild(li);
//   }
// };

// loadSaved();

// const moveUp = () => {
//   btnMoveUp.addEventListener('click', () => {
//     const allTask = taskList.children;
//     for (let index = 1; index < allTask.length; index += 1) {
//       if (allTask[index].style.backgroundColor === 'gray') {
//         taskList.insertBefore(allTask[index], allTask[index - 1]);
//       }
//     }
//   });
// };

// moveUp();

// const isBgGray = (task) => {
//   const result = task.style.backgroundColor === 'gray';
//   return result;
// };

// const moveDown = () => {
//   btnMoveDown.addEventListener('click', () => {
//     const allTask = taskList.children;
//     for (let index = 0; index < allTask.length - 1; index += 1) {
//       const current = allTask[index];
//       const nextElement = current.nextElementSibling;
//       if (nextElement && isBgGray(current)) {
//         taskList.insertBefore(nextElement, current);
//         break;
//       }
//     }
//   });
// };

// moveDown();

// const removeSelected = () => {
//   btnRemove.addEventListener('click', () => {
//     const allTask = taskList.children;
//     for (let index = 0; index < allTask.length; index += 1) {
//       if (isBgGray(allTask[index])) {
//         allTask[index].remove();
//       }
//     }
//   });
// };

// removeSelected();
