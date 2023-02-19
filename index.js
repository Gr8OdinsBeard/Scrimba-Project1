// initialise counts as 0
let homeCount = 0
let guestCount = 0
let homeScore = document.getElementById("home-score")
let guestScore = document.getElementById("guest-score")

// listen for clicks on the buttons
function increment(team, value) {
    switch(team) {
        case "home":
            homeCount += value
            homeScore.textContent = homeCount
            evalScore(homeCount, guestCount)
            break
        default:
            guestCount += value
            guestScore.textContent = guestCount
            evalScore(homeCount, guestCount)
    }
}

// evaluate the scores to determine the leader
function evalScore(home, guest){
    console.log("Home: " + home + " " + "Guest: " + guest)
    if (home > guest) {
        homeScore.style.borderStyle="dashed"
        guestScore.style.borderStyle="none"
    } else if (guest > home) {
        guestScore.style.borderStyle="dashed"
        homeScore.style.borderStyle="none"
    } else {
        guestScore.style.borderStyle="none"
        homeScore.style.borderStyle="none"
    }
}

// reset the scores for a new game
function reset() {
    location.reload()
}

// timer functionality
function initialiseClock(id) {
    let now = Date.now()
    let end = now + 120000
    let endtime = new Date(end)

    const clock = document.getElementById(id)

    const timeinterval = setInterval(() => {
        const t = getRemainingTime(endtime)
        clock.innerHTML = ('0' + t.minutes).slice(-2) + ':' + ('0' + t.seconds).slice(-2)
        checkPeriod(t.total)

    if (t.total <= 0) {
        checkWinner()
        clearInterval(timeinterval)
    }
    }, 1000)
}

function getRemainingTime(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date())
    const seconds = Math.floor( (total/1000) % 60 )
    const minutes = Math.floor( (total/1000/60) % 60 )

    return {
        total,
        minutes,
        seconds
    }
}


// period indicator
function checkPeriod(timer) {
    let period1 = document.getElementById("period-1")
    let period2 = document.getElementById("period-2")
    let period3 = document.getElementById("period-3")
    let period4 = document.getElementById("period-4")

    switch (timer) {
        case 119000:
            period1.style.backgroundColor = "#4ff95a"
            break
        case 90000:
            period1.style.backgroundColor = "white"
            period2.style.backgroundColor = "#4ff95a"
            break
        case 60000:
            period2.style.backgroundColor = "white"
            period3.style.backgroundColor = "#4ff95a"
            break
        case 30000:
            period3.style.backgroundColor = "white"
            period4.style.backgroundColor = "#4ff95a"
            break
        case 0:
            period4.style.backgroundColor = "white"
    }
}

// winner message
function checkWinner() {
    let winner = document.getElementById("winner")
    winner.style.visibility = "visible"

    if (homeCount > guestCount) {
        startConfetti()
        winner.textContent = "HOME TEAM WINS"
    } else if (homeCount < guestCount) {
        startConfetti()
        winner.textContent = "GUEST TEAM WINS"
    } else {
        winner.textContent = "DRAW"
    }
}