import { html, render } from 'lit-html'

import store from '../model/model';
import { Race } from "../model/formula-data";
import { filter, find, flatMap, map, mergeMap } from 'rxjs';

const f1ComponentTemplate = (race: Race) => html`
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <style>
        *{font-family: 'Arial'}
        .container{width: 80%; margin:auto}
        button{font-family: 'Arial'}
    </style>

    <div class="container">
        <button id="backbutton" class="btn btn-primary">Back</button>
        <div>Season: ${race.season}</div>
        <div>Round: ${race.round}</div>
        <div>Date: ${race.date}</div>
        <div>Time: ${race.time}</div>
    </div>`


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

        store.pipe(mergeMap(race => race.races), filter(race => race.season == this.season && race.round == this.round))
            .subscribe(r => {
                race = r

                render(f1ComponentTemplate(race), this.root)
                this.root.getElementById("backbutton").onclick = () => {
                    const event = new CustomEvent("back")
                    this.dispatchEvent(event)
                }
            })


    }
}

customElements.define("f1-component", F1DetailComponent)