export interface Place {
    type: string,
    properties: {
    name: string,
    country: string,
    country_code: string,
    state: string,
    county: string,
    city: string,
    postcode: number,
    suburb: string,
    street: string,
    housenumber: number,
    lat: number,
    lon: number,
    formatted: string,
    address_line1: string,
    address_line2: string,
    categories: Array<string>,
    details: Array<string>,
    datasource: Array<string>,
    distance: number,
    place_id: string
    },
    geometry: {type: string,coordinates:[number,number]}
}