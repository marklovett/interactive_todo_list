//Problem: User interaction doesn't provide desired results.
//Solution: Add interactivty so the user can manage daily tasks.

//retreived element id's and assigned to global variables 
var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); 
var completedTasksHolder= document.getElementById("completed-tasks"); 

//add new-task element function
var createNewTaskElement = function(taskString) {
  
   //created new list item element and assigned it to a variable
      var listItem = document.createElement('li');
  
  
  //created new input (checkbox) element and assigned it to a variable
      var checkBox = document.createElement('input');
  
    // created new label element and assigned it to a variable
      var label = document.createElement('label');
  
    //created new input (text) element and assigned it to a variable
      var editInput = document.createElement('input');
  
    //created new button.edit element and assigned it to a variable
      var editButton = document.createElement('button');
  
    //created new button.delete element and assigned it to a variable
      var deleteButton = document.createElement('button');
    
    //Elements needs modifying 
  checkBox.type = 'checkbox';
  editInput.type = 'text';
  
  //modify classes
  editButton.innerText = 'Edit';
  editButton.className = 'edit';
  deleteButton.innerText = 'Delete';
  deleteButton.className = 'delete';
  
  label.innerText = taskString;
  
    //Append each element to listItem same order as in html
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
  return listItem;
}



//Add a new task function

var addTask = function() {
    console.log("Add task...");
  if( taskInput.value !== '' ) {
    //Create a new list item with the text from #new-task
    var listItem = createNewTaskElement(taskInput.value);  
    //append new list item to incompleteTasksHolder  
    incompleteTasksHolder.appendChild(listItem);
     bindTaskEvents(listItem, taskCompleted);//rebound
    //set to empty string-removes text from add task input after adding     task
   }
   
    taskInput.value = '';
}
 


//Edit an existing task
var editTask = function() {
  console.log("Edit task...");

  var listItem = this.parentNode; 
  var editInput = listItem.querySelector("input[type=text");
  var label = listItem.querySelector("label");
  var containsClass = listItem.classList.contains("editMode");
  var editButton = listItem.querySelector(".edit");
  
  //if the class of the parent is .editMode
  if(containsClass) {
    //edit mode -label text becomes the input's value
    label.innerText = editInput.value;
     editButton.innerText = "Save";
    
  } else {
    //input value becomes the label's text
    editInput.value = label.innerText;    
  }
  
  //Toggle .editMode on the list item
  listItem.classList.toggle("editMode");
}


//Delete an existing task function
var deleteTask = function() {
    console.log("Delete task...");
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
  
      //Remove the parent list item from the ul
      ul.removeChild(listItem);
}

//Mark a task as complete function
var taskCompleted = function() {
    console.log("Task complete...");
  
    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);//rebound
}

//Mark a task as incomplete function
var taskIncomplete = function() {
     console.log("Task incomplete...");
  //When the checkbox is unchecked
    //Append the task list item to the #incomplete-tasks
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);//rebound
}

//taskListItem is the li's of the ul's,checkBoxEventHandler is taskCompleted for cimpleted tasks and taskIncomplete for the incomplete tasks
var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
      console.log("Bind list item events");
  
  //used a traverse method to select li child elements and assign them to variables
      var checkBox = taskListItem.querySelector('input[type=checkbox]');
      var editButton = taskListItem.querySelector('button.edit');
      var deleteButton = taskListItem.querySelector('button.delete');
  
  //bind edit task to edit button
      editButton.onclick = editTask;
    
  //bind deleteTask to delete button
      deleteButton.onclick = deleteTask;
  
  //bind checkBoxEventHandler to checkbox
      checkBox.onchange = checkBoxEventHandler;
}


 var ajaxRequest = function () {
   console.log('Ajax Request');
}
 
//Set the click handlers/event listeners to the addTask function
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);



//cycle over incompleteTasksHolder ul li's
for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
    //bind events to li children (taskCompleted),passing taskCompleted function thru bindTaskEvents function
   bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul li's
for(var i = 0; i < completedTasksHolder.children.length; i++) {
    //bind events to li children (taskIncomplete)
   bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

var editButton = document.getElementsByClassName('edit');
 editButton.innerText = 'Save';










