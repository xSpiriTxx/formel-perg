import { html, render } from 'lit-html'
import "./f1-table-component"
import "./f1-detail-component"

import store from '../model/model';
import f1RaceService from "../f1-service";

const navTemplate = html`
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
    <style>a, div{font-family: 'Arial';}</style>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div class="container">
            <a class="navbar-brand" href="#" style="">Formel Perg</a>
            <select id="yearselect" class="custom-select" style="width: 150px; margin-left: auto">
                <option>2022</option>
                <option>2021</option>
                <option>2020</option>
                <option>2019</option>
                <option>2018</option>
                <option>2017</option>
                <option>2016</option>
                <option>2015</option>
            </select>
        </div>
    </nav>`


class NavComponent extends HTMLElement {

    private root: ShadowRoot;

    constructor() {
        super()
        this.root = this.attachShadow({ mode: "open" })
    }

    connectedCallback() {
        this.render()
    }
    private render() {
        render(navTemplate, this.root)
        const dropDown = this.root.getElementById("yearselect")

        dropDown.addEventListener('change', (event) => {
            const eventObj = event.currentTarget as HTMLInputElement
            console.log(eventObj.value)
            f1RaceService.fetchRaces(eventObj.value)
            console.log(store.value)
        });
    }
}

customElements.define("nav-component", NavComponent)