import { html, render } from 'lit-html'
import "./map-component"

import * as L from 'leaflet'

import store from '../model/model';
import { Race, Result } from "../model/formula-data";
import { filter, find, flatMap, map, mergeMap } from 'rxjs';

const f1ComponentTemplate = (race: Race) => html`
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">    

    <style>
        *{font-family: 'Arial'}
        .container{width: 80%; margin:auto}
        button{font-family: 'Arial'}
        .map{
            width: 80vw;
            height: 600px;
        }
        map-component { height: 200px; width: 500px }
    </style>

    <div class="container">
        <button id="backbutton" class="btn btn-primary">Back</button>
        <div style="display:flex">
            <div>
                <h2>${race.Circuit.Location.country} : ${race.Circuit.circuitName} (${race.season} | ${race.round})</h2>
                <h3>${race.date} ${race.time}</h3>
            </div>
        </div>

        <map-component id="map" lat=${race.Circuit.Location.lat} long=${race.Circuit.Location.long}></map-component>

        <table class="table">
            <thead>
                <th>#</th>
                <th>Driver</th>
                <th>Constructor</th>
                <th>Time</th>
                <th>Points gained</th>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
    <!--<script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBpf76Zv5s2n50z-_uw0N875P_R6rxyb1g&callback=initMap"
      defer
    ></script>-->`


const rowTemplate = (result: Result) => html`
    <td>${result.positionText}</td>
    <td>${result.Driver.givenName} ${result.Driver.familyName} (${result.number})</td>
    <td>${result.Constructor.name}</td>
    <td>${result.Time != undefined ? result.Time.time : result.status}</td>
    <td>${result.points}</td>`

class F1DetailComponent extends HTMLElement {

    static get observedAttributes() {
        return ["season", "round"]
    }

    season: string = "2022"
    round: string = "1"
    map: any = null

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

        store.pipe(mergeMap(race => race.races), filter(race => race.season == this.season && race.round == this.round))
            .subscribe(async r => {
                render(f1ComponentTemplate(r), this.root)
                this.root.getElementById("backbutton").onclick = () => {
                    const event = new CustomEvent("back")
                    this.dispatchEvent(event)
                }

                const body = this.root.querySelector("tbody")
                body.innerHTML = ""

                r.Results.forEach(result => {
                    const row = body.insertRow()
                    render(rowTemplate(result), row)
                })
                this.addEventListener("detail", () => {
                    this.root.getElementById("map").dispatchEvent(new CustomEvent("resize-map"))
                })
            })
    }
}

customElements.define("f1-component", F1DetailComponent)