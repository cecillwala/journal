document.addEventListener("DOMContentLoaded", () => {
    day_square();

    // register form
    document.querySelector("#register-form").addEventListener('submit', async (event) => {
        event.preventDefault();
        const response = await fetch('register', {
            method:'POST',
            body: JSON.stringify({
                username: document.getElementById('username').value,
                password: document.getElementById('password').value,
                confirmation: document.getElementById('confirmation').value
            })
        });
        const status = await response.json();
        if(status == 305){
            document.getElementById('match').innerHTML = 'Password and confirmation do not match!!!';
        }
        else if(status == 302){
            document.getElementById('match').innerHTML = 'Username already exists!!!';
        }
        else{
            document.getElementById('match').innerHTML = '';
            window.location.href = "home";
        }
    });

    //login form
    document.querySelector("#login-form").addEventListener('submit', async (event) => {
        event.preventDefault();
        const response = await fetch('login', {
            method:'POST',
            body: JSON.stringify({
                username: document.getElementById('username').value,
                password: document.getElementById('password').value,
            })
        });
        const status = await response.json();
        const match = document.getElementById('login-match');
        if(status == 410){
            match.innerHTML = 'Invalid Username!!!';
        }
        else if(status == 411){
            match.innerHTML = 'Invalid Password!!!';
        }
        else{
            match.innerHTML = '';
            window.location.href = "home";
        }
    });
});


function display_page(page){
    const children = document.getElementById('container').children;
    Array.from(children).forEach(child => {
        child.style.display = 'none';
    })
    document.getElementById(page).style.display = 'block';
    
}
async function day_square() {
    display_page('calendar');
    const grid = document.getElementById("grid");
    grid.innerHTML = '';
    const date = new Date();
    let days = daysInYear(date.getUTCFullYear());
    today = days_difference();
    for (let i = 0; i < days; i++)
    {
        let div = document.createElement("div");
        div.setAttribute('id', `${i}`);
        if (i < today){
            div.setAttribute('class', 'day-square-disabled');
        }
        else if(i > today){
            div.setAttribute('class', 'day-square');
        }
        else 
        {
            div.setAttribute('class', 'today');
            div.addEventListener('click', () => {
                new_entry();
            });
        }
        grid.append(div);
    }

   const response = await fetch("entries");
   const entries = await response.json();
   console.log(entries);
}


function new_entry() {
    display_page('new-entry');
    document.getElementById("entry-form").addEventListener('submit', async (event) => {
        event.preventDefault();
        const response = await fetch("new_entry", {
            method:"POST",
            body: JSON.stringify({
                "entry": document.querySelector("#entry").value
            })
        });
        document.querySelector("#entry").value = '';
        const status = await response.json();
        console.log(status);
    })
}


function daysInYear(year) {
    return ((year % 4 === 0 && year % 100 > 0) || year % 400 == 0) ? 366 : 365;
}

function days_difference(){
    let now = new Date();
    let day1 = new Date(`1/1/${now.getUTCFullYear()}`);
    return Math.floor(Math.abs(now- day1)/ (1000 * 60 * 60 * 24));
}

function reg_validation() {
    const pattern = /[a-z0-9]/i;
    let password = document.getElementById('password').value;
    let confirmation = document.getElementById('confirmation').value;
    let username = document.getElementById('username').value;
    let register_btn = document.getElementById('register-btn');
    if(pattern.test(username) == true && pattern.test(password) == true && pattern.test(confirmation) == true){
        register_btn.removeAttribute('disabled');
        register_btn.style.color = 'black';
    }
    else{
        register_btn.setAttribute('disabled', 'true');
        register_btn.style.color = '#65625a';
    }
}

function login_validation() {
    const pattern = /[a-z0-9]/i;
    let password = document.getElementById('password').value;
    let username = document.getElementById('username').value;
    let register_btn = document.getElementById('register-btn');
    if(pattern.test(username) == true && pattern.test(password) == true){
        register_btn.removeAttribute('disabled');
        register_btn.style.color = 'black';
    }
    else{
        register_btn.setAttribute('disabled', 'true');
        register_btn.style.color = '#65625a';
    }
}

async function registration(event) {
    const response = await fetch('register', {
        method:'POST',
        body: JSON.stringify({
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            confirmation: document.getElementById('confirmation').value
        })
    });
    const status = await response.json();
    if(status == 305){
        document.getElementById('match').innerHTML = 'Passoword and confirmation do not match!!!';
        event.preventDefault();
    }
}
