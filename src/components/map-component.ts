import { html, render } from 'lit-html'

import * as L from 'leaflet'
import { icon, Marker } from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';


const mapTemplate = () => html`
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
        integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
        crossorigin=""/>
        <style>
            #map{
                height: 500px;
                /*width: 60vw;*/
            }
        </style>

    <div id="map"></div>
`

class MapComponent extends HTMLElement {

    static get observedAttributes() {
        return ["lat", "long"]
    }

    mapInit: boolean = false;
    lat: number = 0
    long: number = 0
    map: L.Map = null;

    private root: ShadowRoot;

    constructor() {
        super()
        this.root = this.attachShadow({ mode: "open" })
    }

    connectedCallback() {
        this.render()
        console.log("map")
    }

    attributeChangedCallback(name: string, _: string, value: number) {
        if (name === "lat") {
            this.lat = value
        }
        if (name === "long") {
            this.long = value
        }
        this.render()
    }

    private render() {
        render(mapTemplate(), this.root)

        if (this.mapInit == true) {
            this.map.remove()
        }


        const iconDefault = icon({
            iconRetinaUrl,
            iconUrl,
            shadowUrl,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41]
        });
        Marker.prototype.options.icon = iconDefault;

        var mapEl = this.root.getElementById('map')

        this.map = L.map(mapEl)

        /*this.map.on("load", function () {
            setTimeout(() => {
                this.map.invalidateSize();
            }, 1);
        });*/

        this.addEventListener("resize-map", () => {
            this.map.invalidateSize();
        })

        console.log(this.map.getSize())
        this.map.invalidateSize()

        this.map.setView([this.lat, this.long], 6)

        var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        var marker = L.marker([this.lat, this.long]).addTo(this.map);
        var Basemaps = {
            "OSM": osm
        }
        var Overlaymaps = {
            "Marker": marker
        }
        L.control.layers(Basemaps, Overlaymaps).addTo(this.map);

        this.mapInit = true;

        //console.log("map changed", this.map)

        this.map.invalidateSize()
    }

    onMapReady(map: L.Map) {
        setTimeout(() => {
            map.invalidateSize();
        }, 0);
    }
}

customElements.define("map-component", MapComponent)