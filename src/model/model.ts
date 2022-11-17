import { BehaviorSubject } from 'rxjs'
import { Race } from './formula-data'

export class Model {
    races: Race[]
}

const initialState: Model = {
    races: []
}

const store = new BehaviorSubject<Model>(initialState)
export default store