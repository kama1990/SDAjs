const loggedIn = sessionStorage.getItem('loggedIn');

if (loggedIn !== 'true') {
    window.location.href = 'index.html';
}

const introElement = document.getElementById('intro');
const loginPanelElement = document.getElementById('login-panel');
const loginForm = document.querySelector('#login-form')
// console.log('loginForm', loginForm);
const taskList = document.querySelector('#task-list')

loginPanelElement.style.display = 'none' // dopisujemy aby nie było scrola

introElement.addEventListener('animationend', () => {
    introElement.style.display = 'none';
    loginPanelElement.style.display = 'inherit'; // domyslna inherit, aby nie było scrolla
    loginPanelElement.classList.add('login-fade-in');
})

const apiUrl = 'https://jsonplaceholder.typicode.com/todos'
const taskForm = document.getElementById('task-form')
const nameInput = document.getElementById('name')

taskForm.addEventListener('submit', async event => {
    
    event.preventDefault(); // nie dopuszczamy do prezładowania strony
    const value = nameInput.value.trim() // trim usuwa puste znaki z elemntu 
    if (value !== "") {
        await addTask(value); // dodajemy await - ponieważ funkcja add jest asynchroniczna , dodajemy tez asyn przy event 
    } else {

    }
})


//  pobranie listy zadań  async - zacznie sie wykonywac ale nie wiemy kidy sie skonczy
async function fetchTasks() {
    try {
        const response = await fetch(`${apiUrl}?_limit=5`) // pytajnik - ze query - ograniczamy się do pieciu, fetch domyslnie jest GET
        const tasks = await response.json(); // pozwala przekonwertowac całą odpowiedź do formatu jsonowego 
        console.log('tasks', tasks);
        tasks.forEach(task => addTaskToList(task)) // bez {} ponieważ funkcja jest jednolinijkowa 
    } catch (error) {
        console.error('Wystąpił błąd z pobieraniem danych: ', error)
    }
}

function addTaskToList(task) {
    const listItem = document.createElement('li')
    const spanItem = document.createElement('span') // wewnątrz li bedzie span

    listItem.classList.add('mt-2')
    spanItem.textContent = task.title
    spanItem.classList.add('text-white')

    if (task.completed) {
        spanItem.classList.add('line-through') // przekreśla completed - bo jest true 
    }

    listItem.appendChild(spanItem)

    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'usuń'
    deleteButton.classList.add('bg-red-500', 'hover:bg-red-600', 'ml-2', 'py-1', 'px-2' , 'rounded') // py odległość przycisków
    deleteButton.addEventListener('click', async () => {
        await deleteTask(task.id)
        listItem.remove() // element jest usuwany
    })

    listItem.appendChild(deleteButton)
    taskList.appendChild(listItem)


}

// dodaj element na listę  -> post /jako wysyłka danych dodanych na listę

async function addTask(name) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST', // dodajemy post - bo ma byc post 
            body: JSON.stringify({  // stringify - aby z java script przekształcić w json
                completed: false,
                title: name
            }),
            headers: {
                'Content-type': 'application/json; chartset=UTF-8'
            },
        });

        const newTask = await response.json();
        addTaskToList(newTask)
        nameInput.value = '' // wyczyścić wartość inputa
    } catch (error) {
        console.error('Wystąpił błąd z wysyłaniem danych: ',error);
    }
}

// usuwanie elementu z listy -> delete
async function deleteTask(id) {
    try {
        await fetch(`${apiUrl}/${id}`), {
            method: 'DELETE',
        } // chcemy aby sie wykonało połacznie i się usunęło 
    } catch (error) {
        console.error('Wystąpił błąd z usunięciem danych: ',error);
    }
}

// aktualizacja zadania -> patch
async function updateTask(id, name) {
    try {
        await fetch(`${apiUrl}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({  // stringify - aby z java script przekształcić w json
                title: name,
            }),
            headers: {
                'Content-type': 'application/json; chartset=UTF-8'
            },
        });
    } catch (error) {
        console.error('Wystąpił błąd z aktualizacją danych: ',error);
    }
}


fetchTasks();