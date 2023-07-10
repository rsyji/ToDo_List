// 1. Select all elements.

const form= document.querySelector("#form")
const inputField = document.querySelector("#input-field")
const addData = document.querySelector("#add-data")
const todoArea= document.querySelector("#todo-area")
const checkboxes= document.getElementsByClassName("checkbox")
const deleteButton = document.getElementById("deleteButton");
const deleteTodos = document.getElementsByClassName("delete")
let todoList = []

// * Preventing form default behavior

form.addEventListener("submit", (e)=>{
    e.preventDefault()
})

// 2.check data is in LocalStorage or not during load.
if(localStorage.getItem("todo")!== null){
    todoList = JSON.parse(localStorage.getItem("todo"))
    let newRenderList=""
    todoList.forEach(item => {
        newRenderList+=`<li><input type="checkbox" class="checkbox">${item}<div class="delete">X</div></li>`
    });
    todoArea.innerHTML=newRenderList
}

// 3. Add button working method.

addData.addEventListener("click", ()=>{
    renderList(inputField.value)
})

// 4. Render element in UL.

function renderList(data){
    if(data.length>0){
        const newList = document.createElement("li")
        newList.innerHTML= `<input type="checkbox" class="checkbox">${data}<div class="delete">X</div>`
        todoArea.appendChild(newList)
        todoList.push(data)
        localStorage.setItem("todo",JSON.stringify(todoList))
        inputField.value=""
    }
}

// 5. Show remove button if item checked.

let myCheckboxes = Array.from(checkboxes)
// let myDeleteTodos = Array.from(deleteTodos)

myCheckboxes.forEach(element => {
    element.addEventListener("change", ()=>{
        if(element.nextElementSibling.style.display== "block"){
            element.nextElementSibling.style.display= "none"
        }
        else{
            element.nextElementSibling.style.display= "block"
            element.nextElementSibling.addEventListener("click",()=>{
                element.parentElement.style.display="none"
                let elementIndex = todoList.indexOf(element.parentElement.innerText)
                todoList.splice(elementIndex,2)
                localStorage.setItem("todo", JSON.stringify(todoList))
            })
        }
    })
});


