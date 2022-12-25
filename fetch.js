async function fetchPosts() {
    // Write logic here
     try{
        const Response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data  = await Response.json();
        tasks=data.slice(0,10);
        console.log(tasks);
       return tasks;
       
    
    }
    catch (error){
    console.log(error);
    }
}
console.log(fetchPosts())
