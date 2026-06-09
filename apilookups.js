// ACCESSING ALL THE HTML COMPONENTS REQUIRED TO PERFORM ACTIONS ON.

const sports_teams = [
    { team: 'Leeds United', thesportsdbid: '133635' },
    { team: 'Leeds Rhinos', thesportsdbid: '135216' },
    { team: 'Yorkshire CC', thesportsdbid: '135763' }
];

let count = 1;

let displayall = document.querySelector("#displayallid");
let sport = document.querySelector("#sportid");

let lufcgamename = document.querySelector("#lufcnextgameid");
let lufcgameleague = document.querySelector("#lufcnextgameleagueid");
let lufcgametime = document.querySelector("#lufcnextgametimeid");

let rhinosgamename = document.querySelector("#rhinosnextgameid");
let rhinosgameleague = document.querySelector("#rhinosnextgameleagueid");
let rhinosgametime = document.querySelector("#rhinosnextgametimeid");

let yorksgamename = document.querySelector("#yorksnexgameid");
let yorksgameleague = document.querySelector("#yorksnexgameleagueid");
let yorksgametime = document.querySelector("#yorksnexgametimeid");



function pageloadweather() {
    // Fection data from open weather API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=leeds&units=metric&appid=04309a577b7ccab5d527babbaf4600b9`)
    .then(response => response.json())
    .then(
        displayData)
    .catch(err => alert('Wrong City name')); 
}
const displayData=(weather)=>{
    temp.innerText=`${weather.main.temp}°C`
    desc.innerText=`${weather.weather[0].main}`
    displayall.innerText=JSON.stringify(weather, null, 2)
}

function lufcnextgame() {
    // Fection data from open weather API
    fetch(`https://www.thesportsdb.com/api/v1/json/123/eventsnext.php?id=133635`)
    .then(response => response.json())
    .then(
        displayDatalufc)
    .catch(err => alert('LUFC next game failed')); 
}
const displayDatalufc=(lufcgame)=>{
    lufcgamename.innerText=`${lufcgame.events[0].strEvent}`
    lufcgameleague.innerText=`${lufcgame.events[0].strLeague}`
    lufcgametime.innerText=`${lufcgame.events[0].dateEventLocal}   ${lufcgame.events[0].strTimeLocal}`
}

function rhinosnextgame() {
    // Fection data from open weather API
    fetch(`https://www.thesportsdb.com/api/v1/json/123/eventsnext.php?id=135216`)
    .then(response => response.json())
    .then(
        displayDatarhinos)
    .catch(err => alert('Rhinos next game failed')); 
}
const displayDatarhinos=(rhinosgame)=>{
    rhinosgamename.innerText=`${rhinosgame.events[0].strEvent}`
    rhinosgameleague.innerText=`${rhinosgame.events[0].strLeague}`
    rhinosgametime.innerText=`${rhinosgame.events[0].dateEventLocal}   ${rhinosgame.events[0].strTimeLocal}`
}


function yorksnextgame() {
    // Fection data from open weather API
    fetch(`https://www.thesportsdb.com/api/v1/json/123/eventsnext.php?id=135763`)
    .then(response => response.json())
    .then(
        displayDatayorks)
    .catch(err => alert('LUFC next game failed')); 
}
const displayDatayorks=(yorksgame)=>{
    yorksgamename.innerText=`${yorksgame.events[0].strEvent}`
    yorksgameleague.innerText=`${yorksgame.events[0].strLeague}`
    yorksgametime.innerText=`${yorksgame.events[0].dateEventLocal}   ${yorksgame.events[0].strTimeLocal}`
}

// gather Data from the sportsdb API and add it to the columns on the page. This is done by calling the addtocolumns function with the team id as an argument. The addtocolumns function then fetches the data from the API and calls the pushtobox function with the column id and the game data as arguments. The pushtobox function then creates a new box with the game data and adds it to the column.
function addtocolumns(teamId) {
    const columnId = `endof${count}`;
    count += 1;

    fetch(`https://www.thesportsdb.com/api/v1/json/123/eventsnext.php?id=${teamId}`)
    .then(response => response.json())
    .then(game => pushtobox(columnId, game))
    .catch(err => alert('add to 1 failed'));
}
// Gather the data from the API and push it to the box. This is done by calling the createnicebox function with the column id and the game data as arguments. The createnicebox function then creates a new box with the game data and adds it to the column.
const pushtobox=(columnId, game)=>{

    const p1 = `${game.events[0].strEvent}`
    const p2 = `${game.events[0].strLeague}`
    const p3 = `${game.events[0].dateEventLocal}   ${game.events[0].strTimeLocal}`

    createnicebox(columnId, p1, p2, p3)

}

// Create a nice box to display the data in the page
function createnicebox(column,p1text,p2text,p3text) {

  const newDiv = document.createElement("div")
  newDiv.classList.add("nicebox");

  const p1 = document.createElement("p")
  p1.innerText = p1text;
  const p2 = document.createElement("p")
  p2.innerText = p2text;
  const p3 = document.createElement("p")
  p3.innerText = p3text;

  newDiv.appendChild(p1);
  newDiv.appendChild(p2);
  newDiv.appendChild(p3);
  
  const currentDiv = document.getElementById(`${column}`);
  currentDiv.parentNode.insertBefore(newDiv, currentDiv);

  const newbreak = document.createElement("br")
  const newbreak2 = document.createElement("br")
  const newbreak3 = document.createElement("br")
  currentDiv.parentNode.insertBefore(newbreak, currentDiv);
  currentDiv.parentNode.insertBefore(newbreak2, currentDiv);
  currentDiv.parentNode.insertBefore(newbreak3, currentDiv);

}



function init() {
//    pageloadweather()
//    pageloadsport()
//    lufcnextgame()
//    rhinosnextgame()
//    yorksnextgame()
//    createnicebox("endof1","p1","p2","p3")
    addtocolumns("135763")
    addtocolumns("133635")
}

document.addEventListener('DOMContentLoaded', init);