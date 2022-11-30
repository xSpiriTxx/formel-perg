import { html, render } from 'lit-html'

import { Model } from "../model/model";
import { FormulaData, Race } from "../model/formula-data";
import f1RaceService from "../f1-service";
import store from '../model/model';

const tableTemplate = html`
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <style>table{font-family: 'Arial'}</style>
    <table class="w3-table w3-striped w3-bordered">
        <thead>
            <th>Season</th>
            <th>Round</th>
            <th>Date</th>
            <th>Time</th>
            <th>Racename</th>
            <th>Circuitename</th>
        </thead>
        <tbody style="cursor: pointer">
        </tbody>
    </table>
`

const rowTemplate = (race: Race) => html`
    <td>${race.season}</td>
    <td>${race.round}</td>
    <td>${race.date}</td>
    <td>${race.time}</td>
    <td>${race.raceName}</td>
    <td>${race.Circuit.circuitName}</td>
`

export class F1TableComponent extends HTMLElement {

    private root: ShadowRoot;

    constructor() {
        super()
        this.root = this.attachShadow({ mode: "closed" })
    }

    async connectedCallback() {
        store.subscribe(model => {
            this.render(model.races)
        })
        f1RaceService.fetchUsers()
    }


    private render(races: Race[]) {

        render(tableTemplate, this.root)

        const body = this.root.querySelector("tbody")

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

