// ACCESSING ALL THE HTML COMPONENTS REQUIRED TO PERFORM ACTIONS ON.
const buttonclick = document.querySelector("#click");

const buttondontclick = document.querySelector("#dont-click");

const the_sportsdb_teams = [
    { team: 'Leeds United', thesportsdbid: '133635', gametime: ``, gamename: ``, gameleague: `` },
    { team: 'Leeds Rhinos', thesportsdbid: '135216', gametime: ``, gamename: ``, gameleague: `` },
    { team: 'Yorkshire CC', thesportsdbid: '135763', gametime: ``, gamename: ``, gameleague: `` },
    { team: 'England Football - Men', thesportsdbid: '133914', gametime: ``, gamename: ``, gameleague: `` },
    { team: 'England Rugby - Men', thesportsdbid: '137123', gametime: ``, gamename: ``, gameleague: `` },
    { team: 'England Football - Women', thesportsdbid: '136811', gametime: ``, gamename: ``, gameleague: `` },
    { team: 'England Rugby - Women', thesportsdbid: '150799', gametime: ``, gamename: ``, gameleague: `` },
    { team: 'England Cricket - Men', thesportsdbid: '137142', gametime: ``, gamename: ``, gameleague: `` },
];

let count = 1;

let displayall = document.querySelector("#sportid");
//let sport = document.querySelector("#sportid");


function pageloadweather() {
    displayall.innerText=JSON.stringify(the_sportsdb_teams, null, 2)
}



function iterrateThroughTeamsGatherInfo() {
    const promises = the_sportsdb_teams.map(team => {
        return addgameinfotoarray(team.thesportsdbid, team.team);
    });
    return Promise.all(promises);
}

function addgameinfotoarray(teamId, teamName) {
    return fetch(`https://www.thesportsdb.com/api/v1/json/123/eventsnext.php?id=${teamId}`)
    .then(response => response.json())
    .then(response => {
        if (response.events !== null) {
            const gamename = `${response.events[0].strEvent}`
            const gameleague = `${response.events[0].strLeague}`
            const nextgametime = `${response.events[0].dateEventLocal}   ${response.events[0].strTimeLocal}`;
            for (let i = 0; i < the_sportsdb_teams.length; i++) {
                if (the_sportsdb_teams[i].team === teamName) {
                    the_sportsdb_teams[i].gametime = nextgametime;
                    the_sportsdb_teams[i].gamename = gamename;
                    the_sportsdb_teams[i].gameleague = gameleague;
                }
            }
        } else {
            const gamename = `No upcoming games for ${teamName}`;
            const gameleague = `No upcoming games`;
            const nextgametime = `Sorry...`;
            for (let i = 0; i < the_sportsdb_teams.length; i++) {
                if (the_sportsdb_teams[i].team === teamName) {
                    the_sportsdb_teams[i].gametime = nextgametime;
                    the_sportsdb_teams[i].gamename = gamename;
                    the_sportsdb_teams[i].gameleague = gameleague;
                }
            }
        }
    })
    .catch(err => {
        alert('add next date failed');
        throw err;
    });
}

function sortTeamsByGametime(callback) {
  the_sportsdb_teams.sort((a, b) => {
    return parseGameTime(a.gametime) - parseGameTime(b.gametime);
  });
  if (callback) {
    callback();
  }
}

function parseGameTime(value) {
  if (!value) return Infinity;
  return Date.parse(value.replace(/\s+/g, ' '));
}


function CreateContent() {
    the_sportsdb_teams.forEach(team => {
        const columnId = `endof${count}`;
        //alert(JSON.stringify(team, null, 2));
        createnicebox(columnId, team.gamename, team.gameleague, team.gametime, team.team);
        count += 1;
        if (count > 3) {
            count = 1;
        }
    });
}


// Create a nice box to display the data in the page
function createnicebox(column,p1text,p2text,p3text,teamname) {

  const newDiv = document.createElement("div")
  newDiv.classList.add("nicebox");
  newDiv.setAttribute("title", teamname);

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
  //const newbreak3 = document.createElement("br")
  currentDiv.parentNode.insertBefore(newbreak, currentDiv);
  currentDiv.parentNode.insertBefore(newbreak2, currentDiv);
  //currentDiv.parentNode.insertBefore(newbreak3, currentDiv);

}

buttonclick.addEventListener("click", sortTeamsByGametime);

buttondontclick.addEventListener("click", CreateContent);


async function init() {
    await iterrateThroughTeamsGatherInfo();
    await sortTeamsByGametime();
    //alert(JSON.stringify(the_sportsdb_teams, null, 2));
    //setTimeout(sortTeamsByGametime, 500);
    //sortTeamsByGametime(iterate_sportsdb_teams)
    //setTimeout(pageloadweather, 500);
    CreateContent();
    //alert(JSON.stringify(the_sportsdb_teams, null, 2));
    //setTimeout(iterate_sportsdb_teams, 1000);
    //setTimeout(CreateContent, 500);

}

init();

//document.addEventListener('DOMContentLoaded', init);