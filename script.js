(function(){
    var tasks = [];
    const taskList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');
    
    console.log('Working');
    
     async function fetchTodos(){
        // fetch('https://jsonplaceholder.typicode.com/todos')
        // .then(function(Response){
        //     // console.log(Response);
        //     return Response.json();
        // }).then(function(data){
        //     // console.log(data);
        //     tasks=data.slice(0,10);
        //     renderList();
        // })
        // .catch(function(error){
        //     console.log('error',error);
        // })
        // cnvert the fetch promise to asunchronous syntax
    try{
        const Response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data  = await Response.json();
        tasks=data.slice(0,10);
        renderList();
    
    }
    catch (error){
    console.log(error);
    }
    }
    function addTaskToDOM(task){
        const li = document.createElement('li');
      li.innerHTML= `
      
              <input type="checkbox" id="${task.id}"${task.completed ? 'checked' : ''}  class="custom-checkbox">
              <label for="${task.id}">${task.title}</label>
              <i class="fa-solid fa-trash-can" id="delete" data-id="${task.id}"></i> 
            
      `;
    
    taskList.append(li);
    }
    function renderList () {
        taskList.innerHTML='';
        for(let i=0;i<tasks.length;i++){
            addTaskToDOM(tasks[i]);
        }
        tasksCounter.innerHTML=tasks.length;
    }
    
    function toggleTask (taskId) {
        const task=tasks.filter(function(task){
            return task.id == taskId
        });
        if(task.length>0){
            const currentTask = task[0];
            currentTask.completed = !currentTask.completed;
            renderList();
            showNotification('task toggled successfully');
             return;
        }
        showNotification('could not toggle the task');
    }
    
    function deleteTask (taskId) {
        console.log(taskId,tasks);
        const newTasks=tasks.filter(function(task){
            return task.id !== Number(taskId);
        });
        tasks=newTasks;
        renderList();
        showNotification('task deleted successfully');
    }
    
    
    function addTask (task) {
        if(task){
        // fetch('https://jsonplaceholder.typicode.com/todos', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //       },
        //       body: JSON.stringify(task),
        //     }).then(function(Response){
        //         return Response.json();
        //     }).then(function(data){
        //         console.log(data);
        //         tasks.push(task);
        //         renderList();
        //         showNotification('task added successfully');
        //     })
        //     .catch(function(error){
        //         console.log(error);
        //     })
        
       
            tasks.push(task);
            renderList();
            showNotification('task added successfully');
        return;
        }
        showNotification('task can not be added');
    
    }
    
    function showNotification(text) {
        alert(text);
    }
    function handleInputkeypress(e){
        if(e.key=='Enter'){
            const text=e.target.value;
            console.log('text',text);
            if(!text){
                showNotification('task text can not be empty');
                return;
    
            }
            const task ={
                text,
                id: Date.now().toString(),
                done:false
            }
            e.target.value='';
            addTask(task);
    
        }
    
    }
    function handleClickListener(e){
        const target=e.target;
        console.log(target.id);
    
        if(target.id =='delete'){
            console.log(target);
            const taskId= target.dataset.id;
            console.log(taskId);
          deleteTask(taskId);
           return;
        }
        else  if(target.className=='custom-checkbox'){
            const taskId= target.id;
            toggleTask(taskId);
            return;
    
        }
    }
    function intialized(){
    addTaskInput.addEventListener('keyup',handleInputkeypress);
    document.addEventListener('click',handleClickListener);
    fetchTodos();
    }
    intialized();
})

();
