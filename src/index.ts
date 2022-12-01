import "./components/app-component"
import "./components/nav-component"

const body = document.querySelector("body")
body.style.marginTop = "60px"
const appComponent = document.createElement("app-component")
const navComponent = document.createElement("nav-component")
body.appendChild(navComponent)
body.appendChild(appComponent)

