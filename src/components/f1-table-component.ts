import { html, render } from 'lit-html'

import { Model } from "../model/model";
import { FormulaData, Race } from "../model/formula-data";
import f1RaceService from "../f1-service";
import store from '../model/model';

const tableTemplate = html`
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

    <style>
        *{font-family: 'Arial'}
        .conatiner{width:80%; margin:auto}
    </style>
    <div class="container">
        <table class="table">
            <thead>
                <th>Season</th>
                <th>Round</th>
                <th>Date</th>
                <th>Time</th>
                <th>Racename</th>
                <th>Circuitename</th>
                <th>Country</th>
            </thead>
            <tbody style="cursor: pointer">
            </tbody>
        </table>
    </div>
`

const rowTemplate = (race: Race) => html`
    <td>${race.season}</td>
    <td>${race.round}</td>
    <td>${race.date}</td>
    <td>${race.time}</td>
    <td>${race.raceName}</td>
    <td>${race.Circuit.circuitName}</td>
    <td>${race.Circuit.Location.country}</td>
`

export class F1TableComponent extends HTMLElement {

    private root: ShadowRoot;

    constructor() {
        super()
        this.root = this.attachShadow({ mode: "closed" })
    }

    connectedCallback() {
        store.subscribe(model => {
            this.render(model.races)
        })
        f1RaceService.fetchRaces("2022")
    }


    private render(races: Race[]) {

        render(tableTemplate, this.root)

        const body = this.root.querySelector("tbody")
        body.innerHTML = ""

        races.forEach(race => {
            const row = body.insertRow()
            row.onclick = () => {
                const event = new CustomEvent("race-selected", { detail: { race } })
                this.dispatchEvent(event)
            }
            render(rowTemplate(race), row)
        })
    }
}
customElements.define("f1-table-component", F1TableComponent)

