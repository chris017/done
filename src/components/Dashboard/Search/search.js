const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let doAll = []

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    doAll.forEach(user => {
        const isVisible =
            user.name.toLowerCase().includes(value) ||
            user.email.toLowerCase().includes(value)
        user.element.classList.toggle("hide", !isVisible)
    })
})

fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => {
        users = data.map(user => {
            const card = userCardTemplate.content.cloneNode(true).children[0]
            const header = card.querySelector("[data-header]")
            const body = card.querySelector("[data-body]")
            header.textContent = user.name
            body.textContent = user.email
            userCardContainer.append(card)
            return { name: user.name, email: user.email, element: card }
        })
    })

const Search = () => {
    return (
        <div class="user-cards" data-user-cards-container>
            <template data-user-template>
                <div class="card">
                    <div class="header" data-header></div>
                    <div class="body" data-body></div>
                </div>
            </template>
        </div>
    );
}