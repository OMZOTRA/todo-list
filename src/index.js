import "./style.css";

const ul = document.querySelector("ul");
const form = document.querySelector("form");
const input = document.querySelector("form > input");

const todos = [
    {
        text : "Je suis une ",
        done : false,
        editMode : true
    },
    {
        text : "Faire du JavaScript",
        done : true,
        editMode : false
    }
];

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input.value;
    input.value = "";
    addTodo(value);
});

const displayTodo = () => {
    const todosNode = todos.map((todo, index) => {

        if(todo.editMode){
            return createTodoEditElement(todo, index);
        } else {
            return createTodoElement(todo, index);
        }
        
    });
    ul.innerHTML="";
    ul.append(...todosNode);
}

const createTodoElement = (todo, index) => {
    const li =document.createElement("li");
    const buttonDelete = document.createElement("button");
    buttonDelete.classList.add("danger");
    buttonDelete.innerHTML ="supprimer";
    const buttonEdit = document.createElement("button");
    buttonEdit.classList.add("primary");
    buttonEdit.innerHTML ="Edit";
    buttonDelete.addEventListener("click", (event) => {
        event.stopPropagation();
        return deleteButton(index);
    });

    buttonEdit.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleEditMode(index);
    })
    li.innerHTML =`
    <span class="todo ${todo.done ?"done" :""}"></span>
    <p class="${todo.done? "done" :""}">${todo.text}</p>
    `;

    li.addEventListener("click", (event) => {
        return toggleTodo(index);
    });

    //Rendre l'edition possible sur un double click 
    //  li.addEventListener("dblclick", (event) =>{
    //      toggleEditMode(index);
    //  })

    //Empêcher le double clic de changer le statut deux fois de suite de la todo

    let timer;

    li.addEventListener("click", (event) => {

        if (event.detail === 1) {
          timer = setTimeout(() => {
                toggleTodo(index);
            }, 2000);
        } else if (event.detail > 1){f
            clearTimeout(index);
            toggleEditMode(index);
        };
    });

    li.append(buttonEdit, buttonDelete);
    return li;
};

const createTodoEditElement = (todo, index) => {
    const li = document.createElement("li");
    const input = document.createElement("input");
    input.type = "text";
    input.value = todo.text;
    const buttonCancel = document.createElement("button");
    buttonCancel.innerHTML = "Cancel";
    const buttonSave = document.createElement("button");
    buttonSave.innerHTML ="Save";
    buttonCancel.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleEditMode(index);
    });

    buttonSave.addEventListener("click", (event) => {
        event.stopPropagation();
        editTodo(index, input);
    })

   
    li.append(input, buttonCancel, buttonSave);
    return li;

};

const addTodo = text => {
    text = text.trim(); // Supprime les espace en début et fin d'une chaine de caractere 

    if (text) {
        todos.push({
            text : `${text[0].toUpperCase()}${text.slice(1)}`,
            done: false
        });
    }

    displayTodo();
}

const deleteButton = (index) => {
    todos.splice(index, 1);
    displayTodo();
}

const toggleTodo = (index) => {
        todos[index].done = !todos[index].done;
        displayTodo();

}

const toggleEditMode = (index) => {
    todos[index].editMode = !todos[index].editMode;
    displayTodo();
}

const editTodo = (index, input) => {
    const value = input.value;
    todos[index].text = value;
    todos[index].editMode = false;
    displayTodo();
}

displayTodo();c