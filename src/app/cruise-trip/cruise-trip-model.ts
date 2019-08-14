export class CruiseTrip {
    CompanyId: number;
    ShipId: number;
    CabinTypeId: number;
    DapartureDate: Date;
    IsFlightIncluded: boolean;
    Routes:Route[];
}

export class Route {
    Day: number;
    Port: string;
    PortId: number;
}

export class KeyValuePair{
    id: number;
    title: string;
}
