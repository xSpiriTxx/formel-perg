import { html, render } from 'lit-html'
import "./f1-table-component"
import "./f1-detail-component"

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
    }
}

customElements.define("nav-component", NavComponent)