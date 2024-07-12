'use strick';
{

function getKomeAge(){

const age = document.querySelector('#age');
const birthday= new Date(document.querySelector('#birthday').textContent);
const today =new Date();

const y = today.getFullYear() - birthday.getFullYear()
let m = today.getMonth() - birthday.getMonth()

if (today.getDay() < birthday.getDate()) {
    m--;
}

console.log(today.getFullYear());
console.log(birthday.getFullYear());
return `${y}歳${m}カ月`;
}

age.textContent = getKomeAge();

}
