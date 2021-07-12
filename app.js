function Todo(){
    this.todoList = []
    this.complete = [];

    this.addTask = function(task){
        this.todoList.push(task)
    }
    this.removeTask = function(taskIndex){
        this.todoList.splice(taskIndex, 1);
        this.complete.splice(taskIndex, 1);
    }
    this.completed = function(taskIndex){
        this.complete.push(this.todoList[taskIndex])
    }
    this.delCompleted = function(taskIndex){
        this.complete.splice(taskIndex, 1)
    }
    this.clearCompleted = function(){
        for(let i of this.todoList){
            if(this.complete.includes(i)){
                this.todoList.splice(this.todoList.indexOf(i), 1)
            }
        }
        this.complete.splice(0, this.complete.length)
    }
    this.active = function(){
        let activeTask = this.todoList.filter(t => !this.complete.includes(t));
        return activeTask;
    }
    this.getSize = function(){
        return this.todoList.length
    }
}



let setUp = [
    {
        bodyColor : "hsl(235, 21%, 11%)",
        todoListBg: "hsl(235, 24%, 19%)",
        liColor: "hsl(234, 39%, 85%)",
        circleBorderItems:"hsl(234, 11%, 52%)",
        inputBg: "hsl(235, 24%, 19%)",
        inputColor:"hsl(234, 39%, 85%)",
        todoList: "hsl(235, 24%, 19%)",
        liBorderBottom: "1px solid hsl(234, 11%, 52%)",
        showText:"hsl(234, 39%, 85%)",
        liText:'hsl(234, 11%, 52%)',
        bullet: "hsl(234, 39%, 85%)"
    },
    {
        bodyColor : "hsl(236, 33%, 92%)",
        todoListBg: "hsl(236, 33%, 92%)",
        liColor: "hsl(235, 19%, 35%)",
        circleBorderItems:"hsl(233, 11%, 84%)",
        inputBg: "hsl(0, 0%, 98%)",
        inputColor:"hsl(236, 9%, 61%)",
        todoList: "hsl(236, 33%, 92%)", 
        liBorderBottom: "1px solid hsl(236, 9%, 61%)",
        showText:"hsl(234, 11%, 52%)",
        liText:"hsl(235, 19%, 35%)",
        bullet: "hsl(236, 9%, 61%)"
    }
]

//selecting items 
let toogleIcon = document.getElementById('img-toogle');
let themeImg = document.getElementById('img');
let hero = document.querySelector('.hero');
let bottom = document.querySelector('.todo-bottom')
let input = document.querySelector('input');
let numberItem = document.getElementById('item');
let paras = document.querySelectorAll("p");
let ul = document.querySelector('ul');
let todolist = document.querySelector('.todo-list');
let attriPara = document.querySelector('.attribution p');
let choice = document.querySelector('.choice');
let mobileChoice = document.querySelector('.mobile-choice');




// theme changer
toogleIcon.addEventListener('click', () =>{
    if(hero.classList.contains('light-img')){
        themeImg.src="./images/icon-sun.svg";
        hero.classList.remove('light-img');
        changeTheme(0)
       
    }
    else{
        themeImg.src="./images/icon-moon.svg";
        hero.classList.add('light-img');
        changeTheme(1)
        
    }
    
})

//change Theme
function changeTheme(pos){
    document.body.style.backgroundColor = setUp[pos].bodyColor;
    input.style.backgroundColor = setUp[pos].inputBg;
    input.style.color = setUp[pos].inputColor;
    todolist.style.backgroundColor = setUp[pos].inputBg;
    let liTexts = document.querySelectorAll('.text')
    liTexts.forEach(text => text.style.color = setUp[pos].liText);
    let lis = document.querySelectorAll('li');
    let newlist = Array.from(lis);
    newlist.pop()
    newlist.forEach(li => li.style.borderBottom = setUp[pos].liBorderBottom);
    attriPara.style.color = setUp[pos].liText;
    choice.style.backgroundColor = setUp[pos].inputBg;
    mobileChoice.style.backgroundColor = setUp[pos].inputBg;
    
}
//New todos
let todos = new Todo()
//storing each todo items
input.addEventListener("keypress", event => {
    if(event.key == "Enter"){
        todos.addTask(input.value)
        input.value = "";
        
    }
    displayTask(todos.todoList)
    if(todos.getSize() >= 1){
        bottom.style.borderTop = '1px solid hsl(234, 11%, 52%)'  
    }
    else{
        bottom.style.borderTop = 'None' 
    }
    //showing completed task
    let bullets = document.querySelectorAll(".bullet")
    bulletCompletedTask(bullets)
    //deleting a task
    let deleteBtns = document.querySelectorAll(".delete");
    taskDelete(deleteBtns)
    //display number of active items
    numberOfItems(todos.active().length)
    

})

//display each forms of task(active, completed or all)
paras.forEach(para => {
    para.addEventListener("click", event => {
        if(event.currentTarget.textContent === "All"){
            
            displayTask(todos.todoList);
            let bullets = document.querySelectorAll(".bullet");
            bulletCompletedTask(bullets);
            let deleteBtns = document.querySelectorAll(".delete");
            taskDelete(deleteBtns);
            event.currentTarget.style.color = "hsl(220, 98%, 61%)";
            event.currentTarget.parentNode.lastElementChild.style.color = "hsl(235, 19%, 35%)";
            event.currentTarget.nextElementSibling.style.color = "hsl(235, 19%, 35%)";
            if(todos.getSize() >= 1){
                bottom.style.borderTop = '1px solid hsl(234, 11%, 52%)'  
            }
            else{
                bottom.style.borderTop = 'None' 
            }
        }
        else if(event.currentTarget.textContent === "Active"){
            displayTask(todos.active());
            event.currentTarget.nextElementSibling.style.color = "hsl(235, 19%, 35%)";
            event.currentTarget.previousElementSibling.style.color = "hsl(235, 19%, 35%)";
            event.currentTarget.style.color = "hsl(220, 98%, 61%)";
            if(todos.active().length >= 1){
                bottom.style.borderTop = '1px solid hsl(234, 11%, 52%)'  
            }
            else{
                bottom.style.borderTop = 'None' 
            }
        }
        else if(event.currentTarget.textContent === "Completed"){
            displayTask(todos.complete);
            let bullets = document.querySelectorAll(".bullet")
            bulletCompletedTask(bullets);
            event.currentTarget.parentNode.firstElementChild.style.color = "hsl(235, 19%, 35%)";
            event.currentTarget.previousElementSibling.style.color = "hsl(235, 19%, 35%)"
            event.currentTarget.style.color = "hsl(220, 98%, 61%)";
            //display number of active items
            numberOfItems(todos.active().length);
            if(todos.complete.length >= 1){
                bottom.style.borderTop = '1px solid hsl(234, 11%, 52%)'  
            }
            else{
                bottom.style.borderTop = 'None' 
            }
            
        }
        else if(event.currentTarget.textContent === "Clear Completed"){
            todos.clearCompleted()
        }
        
    })
})
// function to display each task
function displayTask(taskList){
    myTasks = taskList.map(task => {
        return `<li>
        <div class="bullet">
       </div> 
       <p class="text">${task}</p>
       <div class="delete">
         <img src="./images/icon-cross.svg" alt="cross-icon">
       </div>
     </li>`
    })
    ul.innerHTML = myTasks.join("")
}

// function to diplay number active items
function numberOfItems(count){
    if(count > 1){
        numberItem.textContent = `${count} items left `
    }
    else{
        numberItem.textContent = `${count} item left `
    }

}

//delete task
function taskDelete(deleteBtns){
    let cancelBtn = deleteBtns.forEach( cancel => { 
        cancel.addEventListener("click", event => {
            let currentParent = event.currentTarget.parentNode;
            let prevSibling = event.currentTarget.previousElementSibling
            ul.removeChild(currentParent);
            todos.removeTask(todos.todoList.indexOf(prevSibling.textContent));

            // top border for task list elements
            if(todos.getSize() == 0){
                bottom.style.borderTop = 'None' 
            };
            //display number of active items
            numberOfItems(todos.active().length)
        })
        
    })

}

//Select bullet for completed task
function bulletCompletedTask(bullets){
    bullets.forEach(bullet => {
        if(todos.complete.includes(bullet.nextElementSibling.textContent) ){
            bullet.parentNode.classList.add("show-complete")
        }
        bullet.addEventListener("click", event=>{
            let current = event.currentTarget.parentNode;
            let text = event.currentTarget.nextElementSibling
            if(current.classList.contains("show-complete")){
                current.classList.remove("show-complete");
                todos.delCompleted(todos.complete.indexOf(text.textContent));
                //display number of active items
                numberOfItems(todos.active().length)
            }
            else{
                current.classList.add("show-complete");
                todos.completed(todos.todoList.indexOf(text.textContent));
                let show = document.querySelectorAll('.show-complete .text');
                show.forEach(s => s.style.color = setUp[0].showText)
                //display number of active items
                numberOfItems(todos.active().length)
            }
        })
    })
}

//clear all completed  task
function clearCompleteTodos(){
    todos.clearCompleted();
    let lists = ul.childNodes;
    lists.forEach(list => {
        if(list.classList.contains("show-complete")){
            ul.removeChild(list)
        }
    } )
    if(todos.complete.length === 0){
        bottom.style.borderTop = 'None' 
    }  
}
    




