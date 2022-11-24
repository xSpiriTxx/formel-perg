import { html, render } from 'lit-html'
import userService from '../f1-service';

import store from '../model/model';
import { Race } from "../model/formula-data";

const f1ComponentTemplate = (race: Race) => html`
    <button id="backbutton">Back</button>
    <div>Season: ${race.season}</div>
    <div>Round: ${race.round}</div>
    <div>Date: ${race.date}</div>
    <div>Time: ${race.time}</div>`


class F1DetailComponent extends HTMLElement {

    static get observedAttributes() {
        return ["season", "round"]
    }

    season: string = "2022"
    round: string = "1"

    private root: ShadowRoot;

    constructor() {
        super()
        this.root = this.attachShadow({ mode: "open" })
    }

    connectedCallback() {
        this.render()
    }

    attributeChangedCallback(name: string, _: string, value: string) {
        if (name === "season") {
            this.season = value
        }
        if (name === "round") {
            this.round = value
        }
        this.render()
    }

    private async render() {
        let race: Race
        store.subscribe(model => {
            race = model.races.find(r => r.season == this.season && r.round == this.round)
        })
        render(f1ComponentTemplate(race), this.root)
        this.root.getElementById("backbutton").onclick = () => {
            const event = new CustomEvent("back")
            this.dispatchEvent(event)
        }
    }
}

customElements.define("f1-component", F1DetailComponent)