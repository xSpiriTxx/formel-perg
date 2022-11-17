export interface FormulaData {
    MRData: MRData;
}

export interface MRData {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
    RaceTable: RaceTable;
}

export interface RaceTable {
    season: string;
    Races: Race[];
}

export interface Race {
    season: string;
    round: string;
    url: string;
    raceName: string;
    Circuit: Circuit;
    date: Date;
    time: string;
    Results: Result[];
}

export interface Circuit {
    circuitId: string;
    url: string;
    circuitName: string;
    Location: Location;
}

export interface Location {
    lat: string;
    long: string;
    locality: string;
    country: string;
}

export interface Result {
    number: string;
    position: string;
    positionText: string;
    points: string;
    Driver: Driver;
    Constructor: Constructor;
    grid: string;
    laps: string;
    status: string;
    Time?: ResultTime;
    FastestLap?: FastestLap;
}

export interface Constructor {
    constructorId: string;
    url: string;
    name: string;
    nationality: Nationality;
}

export enum Nationality {
    American = "American",
    Austrian = "Austrian",
    British = "British",
    French = "French",
    German = "German",
    Italian = "Italian",
    Swiss = "Swiss",
}

export interface Driver {
    driverId: string;
    permanentNumber: string;
    code: string;
    url: string;
    givenName: string;
    familyName: string;
    dateOfBirth: Date;
    nationality: string;
}

export interface FastestLap {
    rank: string;
    lap: string;
    Time: FastestLapTime;
    AverageSpeed: AverageSpeed;
}

export interface AverageSpeed {
    units: Units;
    speed: string;
}

export enum Units {
    Kph = "kph",
}

export interface FastestLapTime {
    time: string;
}

export interface ResultTime {
    millis: string;
    time: string;
}
