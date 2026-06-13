// ACCESSING ALL THE HTML COMPONENTS REQUIRED TO PERFORM ACTIONS ON.
const buttonclick = document.querySelector("#click");
const buttondontclick = document.querySelector("#dont-click");

// Get ID's for teams using this link   https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=england%20cricket

const the_sportsdb_teams = [
    { team: 'Leeds United', thesportsdbid: '133635', gametime: ``, gamename: ``, gameleague: ``, date: `` },
    { team: 'Leeds Rhinos', thesportsdbid: '135216', gametime: ``, gamename: ``, gameleague: ``, date: `` },
    { team: 'Yorkshire CC', thesportsdbid: '135763', gametime: ``, gamename: ``, gameleague: ``, date: `` },
    { team: 'England Cricket - Women', thesportsdbid: '145688', gametime: ``, gamename: ``, gameleague: ``, date: `` },
    { team: 'England Football - Men', thesportsdbid: '133914', gametime: ``, gamename: ``, gameleague: ``, date: `` },
    { team: 'England Rugby - Men', thesportsdbid: '137123', gametime: ``, gamename: ``, gameleague: ``, date: `` },
    { team: 'England Football - Women', thesportsdbid: '136811', gametime: ``, gamename: ``, gameleague: ``, date: `` },
    { team: 'England Rugby - Women', thesportsdbid: '150799', gametime: ``, gamename: ``, gameleague: ``, date: `` },
    { team: 'England Cricket - Men', thesportsdbid: '137142', gametime: ``, gamename: ``, gameleague: ``, date: `` },
];

let count = 1;
let today = formatDate();
//alert(`${today}`);

function formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

let displayall = document.querySelector("#sportid");
//let sport = document.querySelector("#sportid");


function output_array() {
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
            const gamename = `${response.events[0].strEvent}`;
            const gameleague = `${response.events[0].strLeague}`;
            let nextgametime;
            let date;
            if (response.events[0].dateEventLocal !== null) {
                nextgametime = `${response.events[0].dateEventLocal}   ${response.events[0].strTime}`;
                date = `${response.events[0].dateEventLocal}`;
            } else {
                nextgametime = `${response.events[0].dateEvent}   ${response.events[0].strTime}`;
                date = `${response.events[0].dateEvent}`;
            }
            for (let i = 0; i < the_sportsdb_teams.length; i++) {
                if (the_sportsdb_teams[i].team === teamName) {
                    the_sportsdb_teams[i].gametime = nextgametime;
                    the_sportsdb_teams[i].gamename = gamename;
                    the_sportsdb_teams[i].gameleague = gameleague;
                    the_sportsdb_teams[i].date = date;
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

function sortTeamsByGametime() {
  the_sportsdb_teams.sort((a, b) => {
    return parseGameTime(a.gametime) - parseGameTime(b.gametime);
  });
}

function parseGameTime(value) {
  if (!value) return Infinity;
  return Date.parse(value.replace(/\s+/g, ' '));
}


function CreateContent() {
    the_sportsdb_teams.forEach(team => {
        const columnId = `endof${count}`;
        //alert(JSON.stringify(team, null, 2));
        createnicebox(columnId, team.gamename, team.gameleague, team.gametime, team.team, team.date);
        count += 1;
        if (count > 3) {
            count = 1;
        }
    });
}


// Create a nice box to display the data in the page
function createnicebox(column,p1text,p2text,p3text,teamname,date) {

    const newDiv = document.createElement("div")
    if (date === today) {
        newDiv.classList.add("todaybox");
//    newDiv.setAttribute("onclick", "location.href='https://www.vipleague.ws/live-now-games';");
//    newDiv.setAttribute("target", "_blank");
    } else {
        newDiv.classList.add("nicebox");
    }
    newDiv.setAttribute("title", teamname);

    let p1;
    if (date === today) {
        p1 = document.createElement("a")
        const linktext = document.createTextNode(p1text);
        p1.appendChild(linktext);
        p1.title = p1text;
        p1.href = "https://www.vipleague.ws/live-now-games";
        p1.setAttribute("target", "_blank");
    } else {
        p1 = document.createElement("p")
        p1.innerText = p1text;
    }
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
    currentDiv.parentNode.insertBefore(newbreak, currentDiv);
    currentDiv.parentNode.insertBefore(newbreak2, currentDiv);

}

buttonclick.addEventListener("click", sortTeamsByGametime);

buttondontclick.addEventListener("click", CreateContent);




async function init() {

    await iterrateThroughTeamsGatherInfo();
    await sortTeamsByGametime();
    CreateContent();

    output_array();

}

//init();

document.addEventListener('DOMContentLoaded', init);