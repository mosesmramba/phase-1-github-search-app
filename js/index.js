document.addEventListener('DOMContentLoaded',()=>{
  function submitForm() {
     //selecting form element
 const form = document.querySelector('form');
 //creating an event listener using form
 form.addEventListener('submit',(e) => {
  // preventing the form from reloading when submitted
  //prevent submission of an empty form
   e.preventDefault();
   
   //selecting the input value which is the user name
   let userInput = document.querySelector('input#search').value;
  // console.log(userInput)

  //fetching data using the user input
   fetch(`https://api.github.com/search/users?q=${userInput}`)
     .then((res) => res.json())
     //handling response
     .then((users) => {
       
       handlingResponse(users);
         
       }); 
           
     });
   }
   submitForm();
 })  
 

// A function to handle response

function handlingResponse(users) {

 const items = users.items;
 items.forEach(item => {
   
   const ul = document.querySelector('ul#user-list');    
    //getting the number of total count and appending it to the dom
 //   const match = users.total_count;
 // const h4 = document.createElement('h4');
 // h4.innerHTML = `<h4>Total count: ${match}</h4>`;
 // document.querySelector('#github-container').appendChild(h4);
   const li = document.createElement('li');
   //adding elements to li
   ul.innerHTML=""
   li.innerHTML = `
     <p>Username: ${item.login}</p>
     <img src="${item.avatar_url}"><br>
     <a href="${item.html_url}">profile</a>
   `;
   //appending li to ul
   ul.appendChild(li);

   //adding an click event to li to display the repos
   li.addEventListener('click', () => {
     const reposurl = item.repos_url;
     fetch(`${reposurl}`)
       .then(res => res.json())
       .then(repos => {
         //iterating over each repo in repos
         document.querySelector('ul#repos-list').innerHTML=""
         repos.forEach(element => {
           console.log(element)
           const repoNames = element.name;
           
           //appending rList to the dom
           document.querySelector('ul#repos-list').innerHTML+=`<li>${repoNames}</li>`
         });
       });
   });
 });
}
       