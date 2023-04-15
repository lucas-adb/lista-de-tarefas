// Get the list element
var list = document.getElementById('myList');

// Add event listeners for drag and drop events
list.addEventListener('dragstart', function(event) {
  // Set the dragged item's data and add a 'dragging' class
  event.dataTransfer.setData('text/plain', event.target.textContent);
  event.target.classList.add('dragging');
});

list.addEventListener('dragover', function(event) {
  // Prevent the default behavior to allow drop
  event.preventDefault();
});

list.addEventListener('drop', function(event) {
  // Prevent the default behavior to allow drop
  event.preventDefault();

  // Remove the 'dragging' class from the dragged item
  var draggingItem = list.querySelector('.dragging');
  draggingItem.classList.remove('dragging');

  // Insert the dragged item before the drop target
  var dropTarget = event.target;
  if (event.target.tagName === 'LI') {
    dropTarget = event.target.parentNode;
  }
  dropTarget.insertBefore(draggingItem, event.target);
});
