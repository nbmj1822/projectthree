// DOM elements
const time = document.getElementById("time"),
    greeting = document.getElementById("greeting"),
    name = document.getElementById("name"),
    goal = document.getElementById("goal"),
    content = document.getElementById("content"),
    author = document.getElementById("author");
    input = document.querySelector('input');
    node = document.createElement('LI');
    todoInput = document.querySelector('ul');
    mainGoal = document.querySelector('#mainGoal');

// Show time
function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes();

    // Set AM or PM
    const amPm = hour >= 12 ? "PM" : "AM";

    // 12 hr format
    hour = hour % 12 || 12;

    // Output time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)} ${amPm}`;
    setTimeout(showTime, 1000);
}

    // Add zeros
    function addZero(n) {
        return (parseInt(n, 10) < 10 ? "0" : "") + n;
    }

    // Set background and greeting
    function setBgGreet() {
        let today = new Date(),
            hour = today.getHours();

        if (hour < 12) {
            // Morning
            document.body.style.backgroundImage = "url('./img/sunrise.jpg')";
            greeting.textContent = "Good Morning!";
            document.body.style.color = "white";
        } else if(hour < 18) {
            // Afternoon
            document.body.style.backgroundImage = "url('./img/sea.jpg')";
            greeting.textContent = "Good Afternoon!";
            
        } else {
            // Evening
            document.body.style.backgroundImage = "url('./img/evening.jpg')";
            greeting.textContent = "Good Evening!";
            document.body.style.color = "white";
        }
    }

    // Get name
    function getName() {
        if (localStorage.getItem('name') === null) {
            name.textContent = "[Enter your name]";
        } else {
            name.textContent = localStorage.getItem("name");
        }
    }

    // Set name
    function setName(e) {
        if (e.type === "keypress") {
            // Make sure enter is pressed
            if(e.which == 13 || e.keyCode == 13) {
                localStorage.setItem("name", e.target.innerText);
                name.blur();
            }
        } else {
            localStorage.setItem("name", e.target.innerText);
        }
    }

    name.addEventListener('keypress', setName);

// Todo functionality
    if(localStorage.buttonClass === "active"){
        node.className = "done";
      } else {
          node.className = "";
      }
      
      if(!localStorage.hasOwnProperty('todo') || (localStorage.todo === '' || localStorage.todo === null ||
        localStorage.todo === 'null')){ //if there is no todo or todo is empty
              input.addEventListener('keypress', function(e){
                  if(e.keyCode === 13 && input.value !== ''){
                      localStorage.todo = input.value;
                      showTodo();
                  }
                });
       } else {
           showTodo();
       }
      
      
      function showTodo(){
          mainGoal.innerText = 'Today\'s Goal: ';
          mainGoal.className += ' has-goal';
          node.innerHTML = '<span class="doneTodo"><span class="check-box"></span></span><span class="to-do-item">' + localStorage.todo + '</span><span class="remove">x</span>';
        todoInput.appendChild(node);
          input.style.display = 'none';
      
          input.addEventListener('keypress', function(e){
              if(e.keyCode === 13 && input.value !== ''){
                  localStorage.todo = input.value;
                  showTodo();
                  }
              });
      
              //checkmark
              const button = document.querySelector('.doneTodo');
              button.addEventListener('click', function(){
                  this.parentNode.classList.toggle('done');
                  if(this.parentNode.className === "done"){
                      localStorage.buttonClass = "active"
                  }else{
                      delete localStorage.buttonClass;
                  }
              });
      
              //X button
              const remove = document.querySelector('.remove');
              remove.addEventListener('click', function(){
                  node.parentNode.removeChild(node);
                  localStorage.todo = '';
                  mainGoal.className = "goal";
                  mainGoal.innerText = 'What is your main goal for today?';
                  input.style.display = '';
                  input.value = '';
                  node.className = "";
              });
      }
      
// Quotes and author 
axios.get('https://api.quotable.io/random').then(res => {
    content.textContent = res.data.content;
    author.textContent = res.data.author;
});

// Run Javascript
showTime();
setBgGreet();
getName();
