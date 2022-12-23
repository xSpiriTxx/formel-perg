import { html, render } from 'lit-html'
import "./f1-table-component"
import "./f1-detail-component"

const appComponentTemplate = html`
    <f1-table-component></f1-table-component>
    <f1-component style="display:none" season="2022" round="1"></f1-component>
`


class AppComponent extends HTMLElement {

    private root: ShadowRoot;

    constructor() {
        super()
        this.root = this.attachShadow({ mode: "open" })
    }

    connectedCallback() {
        this.render()
    }
    private render() {
        render(appComponentTemplate, this.root)
        const f1TableComponent: HTMLElement = this.root.querySelector("f1-table-component")
        const f1Component: HTMLElement = this.root.querySelector("f1-component")
        f1TableComponent.addEventListener("race-selected", (e: CustomEvent) => {
            const race = e.detail.race
            //console.log("race-selected", race)
            f1Component.setAttribute("season", race.season)
            f1Component.setAttribute("round", race.round)
            f1TableComponent.style.display = "none"
            f1Component.style.display = "block"
            f1Component.dispatchEvent(new CustomEvent("detail"))
        })
        f1Component.addEventListener("back", (e: CustomEvent) => {
            f1TableComponent.style.display = "block"
            f1Component.style.display = "none"
        })
        this.addEventListener("year-changed", () => {
            f1TableComponent.style.display = "block"
            f1Component.style.display = "none"
        })
    }
}

customElements.define("app-component", AppComponent)