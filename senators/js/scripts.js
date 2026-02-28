import { senators } from './senators.js'

const container = document.querySelector('#peopleHere')
const nav = document.querySelector('#buttonContainer')


const buttons = [
    {
        label: "All Senators",
        filter: () => senators
    },
    {
        label: "Democrats",
        filter: () => senators.filter(s => s.party === "D")
    },
    {
        label: "Republicans",
        filter: () => senators.filter(s => s.party === "R")
    },
    {
        label: "Senior Senators",
        filter: () => senators.filter(s => s.state_rank === "senior")
    },
    {
        label: "Junior Senators",
        filter: () => senators.filter(s => s.state_rank === "junior")
    }
]

buttons.forEach(btnData => {
    const button = document.createElement('button')
    button.textContent = btnData.label

    button.addEventListener('click', () => {
        displaySenators(btnData.filter())
    })

    nav.appendChild(button)
})


function displaySenators(list) {
    container.innerHTML = ""

    list.forEach(senator => {

        const card = document.createElement('section')

        if (senator.party === "D") {
            card.className = "card democrat"
        } else if (senator.party === "R") {
            card.className = "card republican"
        } else {
            card.className = "card"
        }

        const photo = document.createElement('img')
        photo.src = `https://unitedstates.github.io/images/congress/225x275/${senator.id}.jpg`
        photo.alt = `${senator.first_name} ${senator.last_name}`
        photo.loading = "lazy"

        const info = document.createElement('div')
        info.className = "info"

        const name = document.createElement('h2')
        name.textContent = `${senator.first_name} ${senator.last_name}`

        const party = document.createElement('p')
        party.textContent = `Party: ${senator.party}`

        const state = document.createElement('p')
        state.textContent = `State: ${senator.state}`

        const rank = document.createElement('p')
        rank.textContent = `Rank: ${senator.state_rank}`

        const seniority = document.createElement('p')
        seniority.textContent = `Seniority: ${senator.seniority} years`

        info.appendChild(name)
        info.appendChild(party)
        info.appendChild(state)
        info.appendChild(rank)
        info.appendChild(seniority)

        card.appendChild(photo)
        card.appendChild(info)

        container.appendChild(card)
    })
}


displaySenators(senators)