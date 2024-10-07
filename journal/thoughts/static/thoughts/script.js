document.addEventListener("DOMContentLoaded", () => {
    day_square();
})

async function day_square() {
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
        }
        grid.append(div);
    }

   const response = await fetch("entries");
   const entries = await response.json();
   console.log(entries);
}

function daysInYear(year) {
    return ((year % 4 === 0 && year % 100 > 0) || year %400 == 0) ? 366 : 365;
}

function days_difference(){
    let now = new Date();
    let day1 = new Date(`1/1/${now.getUTCFullYear()}`);
    return Math.floor(Math.abs(now- day1)/ (1000 * 60 * 60 * 24));
}