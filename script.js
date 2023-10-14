const listContainer=document.querySelector(".list-container"),
inputBox=document.querySelector(".inputbox"),
cancelBtn=document.querySelector(".cancel-btn"),
addBtn=document.querySelector(".add-btn"),
clearallBtn=document.querySelector(".clearall-button"),
additionMessage=document.querySelector(".addition-message"),
totalTaskEl=document.querySelector(".total")
remainingTaskEl=document.querySelector(".remaining")


//Required to edit the element
let editElement;
let isEditing=false;
let total=0;
let remaining=0;


//get items from local storage
listContainer.innerHTML=localStorage.getItem("items")
if(localStorage.getItem("total")!=null){
    total=localStorage.getItem("total")
    remaining=localStorage.getItem("remaining")
}else{
    total=0;
    remaining=0;
}
taskDetails();
addTask();

addBtn.onclick=function(){
    if(inputBox.value){
        addTask();
        clearallBtn.style.display="inline"
    }
    else{
        displayMessage("Enter your Task First","warning")

    }
    saveItems();
}

//function to add task
function addTask(){
    if(inputBox.value && isEditing===false)
    {
        let list=
        `<article class="list">
        <p class="items ">${inputBox.value}</p>
        <i class="fa fa-edit"></i>
        <i class="fa fa-trash"></i>
    </article>`
    listContainer.innerHTML+=list
    displayMessage("Task Added Successfully","success");
    inputBox.value='';
    total++;
    remaining++;
    taskDetails();

    }else if(inputBox.value && isEditing===true){
      editElement.innerText=inputBox.value
      displayMessage("Task Edited Successfully","success");
      addBtn.innerText='Add'
      isEditing=false;
      inputBox.value=''
    }
    let listItems=listContainer.querySelectorAll(".items")
    let editBtn=listContainer.querySelectorAll(".fa-edit")
    let deleteBtn=listContainer.querySelectorAll(".fa-trash")

    listItems.forEach((item)=>
    item.onclick=function(){
        item.classList.toggle("checked")
        if(item.classList.contains("checked")){
            remaining--;
        }else{
            remaining++;
        }
        taskDetails();
        saveItems();
    })

    //delete the task
    deleteBtn.forEach((btn)=>
    btn.onclick=function(){
        btn.parentElement.remove();
        displayMessage("Task Deleted","inform");
        //updating task details
        if(btn.parentElement.firstElementChild.classList.contains("checked"))
        {
            total--;
        }
        else{
            total--;
            remaining--;
        }
        taskDetails();
        saveItems();
    })


    //edit the task
    editBtn.forEach((btn)=>
    btn.onclick=function(){
        isEditing=true;
        editElement=btn.previousElementSibling;
        inputBox.value=editElement.innerText;
        addBtn.innerText='Save'
    })
}

//clear all button
clearallBtn.onclick=function(){
    listContainer.innerHTML='';
    displayMessage("All task deleted","inform")
    clearallBtn.style.display="none"
    total=0
    remaining=0
    taskDetails();
    saveItems();
}
//cancel button
inputBox.onfocus=function(){
    cancelBtn.style.display="inline"
    cancelBtn.onclick=function(){
        inputBox.value='';
        cancelBtn.style.display="none"
    }
}


function displayMessage(message,type){
    additionMessage.style.top="1%"
    additionMessage.innerText=`${message} !!`
    additionMessage.classList.remove('inform','success','warning')
    additionMessage.classList.add(`${type}`)
    

    setTimeout(()=>{
        additionMessage.style.top="-100%"
    },2000)
}


function taskDetails(){
    totalTaskEl.innerText=`Total Task:${total}`
    remainingTaskEl.innerText=`Remaining Task:${remaining}`
}


//function to save items in local storage
function saveItems(){
    localStorage.setItem("items",listContainer.innerHTML);
    localStorage.setItem("total",total);
    localStorage.setItem("remaining",remaining);
}