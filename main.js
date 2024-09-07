'use strick';
{
// コメの年齢月
function getKomeAge(){

const age = document.querySelector('#age');
const birthday= new Date(document.querySelector('#birthday').textContent);
const today =new Date();
const y = today.getFullYear() - birthday.getFullYear()
let m = today.getMonth() - birthday.getMonth()

if (today.getDate() < birthday.getDate()) {
    m--;
}
return `${y}歳${m}カ月`;
}
age.textContent = getKomeAge();
}


