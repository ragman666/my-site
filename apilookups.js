// ACCESSING ALL THE HTML COMPONENTS REQUIRED TO PERFORM ACTIONS ON.

const sports_teams = [
    { team: 'Leeds United', thesportsdbid: '133635' },
    { team: 'Leeds Rhinos', thesportsdbid: '135216' },
    { team: 'Yorkshire CC', thesportsdbid: '135763' }
];

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

function addto1(teamId) {
    fetch(`https://www.thesportsdb.com/api/v1/json/123/eventsnext.php?id=${teamId}`)
    .then(response => response.json())
    .then(
        pushtobox)
    .catch(err => alert('add to 1 failed')); 
}
const pushtobox=(game)=>{

    const p1 = `${game.events[0].strEvent}`
    const p2 = `${game.events[0].strLeague}`
    const p3 = `${game.events[0].dateEventLocal}   ${game.events[0].strTimeLocal}`

    createnicebox("endof1",p1,p2,p3)
}




function createnicebox(column,p1text,p2text,p3text) {
  // create a new div element
  const newDiv = document.createElement("div")
  newDiv.classList.add("nicebox");

  // and give it some content
  //const newContent = document.createTextNode("Hi there and greetings!");
  const p1 = document.createElement("p")
  p1.innerText = p1text;
  const p2 = document.createElement("p")
  p2.innerText = p2text;
  const p3 = document.createElement("p")
  p3.innerText = p3text;

  // add the text node to the newly created div
  newDiv.appendChild(p1);
  newDiv.appendChild(p2);
  newDiv.appendChild(p3);


  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementById(`${column}`);
  currentDiv.parentNode.insertBefore(newDiv, currentDiv);

  const newbreak = document.createElement("br")
  currentDiv.parentNode.insertBefore(newbreak, currentDiv);
  currentDiv.parentNode.insertBefore(newbreak, currentDiv);
  currentDiv.parentNode.insertBefore(newbreak, currentDiv);

  //newDiv.appendChild(document.createElement("br"));
  //newDiv.appendChild(document.createElement("br"));
  //newDiv.appendChild(document.createElement("br"));
}


//            <div class="nicebox">
//                <p id="lufcnextgameid">-----</p>
//                <p id="lufcnextgameleagueid">-----</p>
//                <p id="lufcnextgametimeid">-----</p>
//            </div>
//                <br>



function init() {
//    pageloadweather()
//    pageloadsport()
//    lufcnextgame()
//    rhinosnextgame()
//    yorksnextgame()
//    createnicebox("endof1","p1","p2","p3")
    addto1("135763")
    addto1("133635")
}

document.addEventListener('DOMContentLoaded', init);