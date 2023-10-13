// Select the elements
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

// Classes names
const CHECK = "fa-circle-check";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

// Get item from local storage
let data = localStorage.getItem("TODO");

// Check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // Set the id to the last one in the list
    loadList(LIST); // Load the list to the user interface
}
else{
    // If data is empty
    LIST = [];
    id = 0;
}

// Load the items to the user interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});


// Show todays date
const options = {weekday: "long", month:"short", day:"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// Add a To-Do function
function addToDo(toDo, id, done, trash){

    if(trash) return;

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `
            <li class="item">
                <i class="fa-regular ${DONE} co" job="complete" id="${id}"></i>
                <p class="text ${LINE}">
                    ${toDo}
                </p>
                <i class="fa-regular fa-trash-can de" job="delete" id="${id}"></i>
            </li>
    `;

    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

// Add an item to the list using enter key
document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        const toDo = input.value;

        // If the input is not empty
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            // Add item to local storage (this code must be added where list item is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});


// Complete To-Do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}


// Remove To-Do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// Target the items created dynamically
list.addEventListener("click", function(event){
    const element = event.target; // Return the clicked element inside list
    const elementJob = element.attributes.job.value; // Complete or Delete
    if(elementJob == "complete"){
        completeToDo(element);
    }
    else if(elementJob == "delete"){
        removeToDo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
});


