// ACCESSING ALL THE HTML COMPONENTS REQUIRED TO PERFORM ACTIONS ON.

const the_sportsdb_teams = [
    { team: 'Leeds United', thesportsdbid: '133635', gametime: `` },
    { team: 'Leeds Rhinos', thesportsdbid: '135216', gametime: `` },
    { team: 'Yorkshire CC', thesportsdbid: '135763', gametime: `` },
    { team: 'England Football - Men', thesportsdbid: '133914', gametime: `` },
    { team: 'England Rugby - Men', thesportsdbid: '137123', gametime: `` },
    { team: 'England Football - Women', thesportsdbid: '136811', gametime: `` },
    { team: 'England Rugby - Women', thesportsdbid: '150799', gametime: `` },
    { team: 'England Cricket - Men', thesportsdbid: '137142', gametime: `` },
];

let count = 1;

let displayall = document.querySelector("#sportid");
//let sport = document.querySelector("#sportid");

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
    displayall.innerText=JSON.stringify(the_sportsdb_teams, null, 2)
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
function addtocolumns(teamId, teamName) {
    const columnId = `endof${count}`;
    count += 1;
    if (count > 3) {
        count = 1;
    }

    fetch(`https://www.thesportsdb.com/api/v1/json/123/eventsnext.php?id=${teamId}`)
    .then(response => response.json())
    .then(response => {
        if (response.events !== null) {
            pushtobox(columnId, response);
        } else {
            // Handle the case where there are no upcoming games
            const p1 = `No upcoming games for ${teamName}`;
            const p2 = `No upcoming games`;
            const p3 = `Sorry...`;
            createnicebox(columnId, p1, p2, p3); 
        }
    })
    .catch(err => alert('add to page failed'));
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

function addnextdate(teamId, teamName) {
    return fetch(`https://www.thesportsdb.com/api/v1/json/123/eventsnext.php?id=${teamId}`)
    .then(response => response.json())
    .then(response => {
        if (response.events !== null) {
            const nextgametime = `${response.events[0].dateEventLocal}   ${response.events[0].strTimeLocal}`;

            for (let i = 0; i < the_sportsdb_teams.length; i++) {
                if (the_sportsdb_teams[i].team === teamName) {
                    the_sportsdb_teams[i].gametime = nextgametime; 
                }
            }

        }
        return response;
    })
    .catch(err => {
        alert('add next date failed');
        throw err;
    });
}

function addteamsbynextdate() {
    const promises = the_sportsdb_teams.map(team => addnextdate(team.thesportsdbid, team.team));
    return Promise.all(promises);
}

function iterate_sportsdb_teams() {
    the_sportsdb_teams.forEach(team => {
        addtocolumns(team.thesportsdbid, team.team);
    });
}

function parseGameTime(value) {
  if (!value) return Infinity;
  return Date.parse(value.replace(/\s+/g, ' '));
}

function sortTeamsByGametime() {
  the_sportsdb_teams.sort((a, b) => {
    return parseGameTime(a.gametime) - parseGameTime(b.gametime);
  });
}

async function init() {
//    pageloadweather()
    try {
        await addteamsbynextdate();
    } catch (e) {
        // already alerted in addnextdate; continue
    }
    try {
        await sortTeamsByGametime();
    } catch (e) {
        // already alerted in addnextdate; continue
    }
    try {
        await iterate_sportsdb_teams();
    } catch (e) {
        // already alerted in addnextdate; continue
    }

    //sortTeamsByGametime();
    //alert(the_sportsdb_teams);
    //iterate_sportsdb_teams();
    pageloadweather();
}

document.addEventListener('DOMContentLoaded', init);