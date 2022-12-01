import produce from 'immer'
import { FormulaData, Race } from './model/formula-data'
import store from './model/model'

const year = "2022"
const round = "1"
const url = `https://ergast.com/api/f1/${year}/results.json?limit=1000`

const yearUrl = `https://ergast.com/api/f1/${year}.json?limit=1000`

const raceUrl = `https://ergast.com/api/f1/${year}/${round}/results.json?limit=1000`

class F1RaceService {

    async fetchRaces() {
        const response = await fetch(url)
        let data: FormulaData = await response.json()
        let races: Race[] = data.MRData.RaceTable.Races

        let nextState = produce(store.getValue(), draft => {
            draft.races = races
        })
        store.next(nextState)
    }
}

const f1RaceService = new F1RaceService();
export default f1RaceService;