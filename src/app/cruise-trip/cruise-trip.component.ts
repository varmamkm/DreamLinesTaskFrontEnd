import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { CruiseTrip, Route, KeyValuePair } from './cruise-trip-model';
import { CruiseService } from './cruise-trip.service';

@Component({
  selector: 'app-cruise-trip',
  templateUrl: './cruise-trip.component.html',
  styleUrls: ['./cruise-trip.component.scss']
})
export class CruiseTripComponent implements OnInit {
  public dateTime: Date;
  cruiselineList:KeyValuePair[];
  shipList:KeyValuePair[];
  portList:KeyValuePair[];
  cabinCategoryList:KeyValuePair[];
  cruisetrip: CruiseTrip = this.getEmptyCruiseTrip();
  routeList:Route[]=[]; 
  selectedCruiseLine:string;
  staticList:string[]=[];
  reponse:any;

  constructor(private toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    private cruiseService: CruiseService) { 
      
    }

  ngOnInit() {
    this.getCruiseLines();
    this.getPorts();
    this.cruisetrip.Routes.push({Day:1,PortId:0,Port:""});
    this.dateTime = new Date();
  }

  getCruiseLines(): void {
    this.cruiseService.getCruiseLines()
      .subscribe(data => {
        this.cruiselineList = data;        
      })
      ;
  }

  getPorts(): void {
    this.cruiseService.getPorts()
      .subscribe(data => {
        this.portList = data;   
        this.portList.forEach(element => {
          this.staticList.push(element.title);
        });           
      })
      ;
  }

  getShips(id): void {
    this.cruiseService.getShips(id)
      .subscribe(data => {
        this.shipList = data;       
        this.cabinCategoryList= null; 
      })
      ;
  }

  getCabinCategory(id): void {
    this.cruiseService.getCabinCategory(id)
      .subscribe(data => {
        this.cabinCategoryList = data;        
      })
      ;
  }

  private getEmptyCruiseTrip(): CruiseTrip {
    return {
      CompanyId: 0,
      ShipId: 0,
      CabinTypeId: 0,
      DapartureDate: undefined,
      IsFlightIncluded: false,
      Routes: []
    };
  } 

  onCruiseLineChange(id) {
    this.getShips(id);
  } 

  onShipChange(id) {
    this.getCabinCategory(id);
  }

  onAddRow() {
    let prevRoute = this.cruisetrip.Routes[this.cruisetrip.Routes.length-1];
    this.cruisetrip.Routes.push({Day:prevRoute.Day+1,PortId:0,Port:""});
  }

  onRemoveRow(index){
    this.cruisetrip.Routes.splice(index, 1);
  }

  public handleStaticResultSelected (result, route) {
    route.PortId = this.portList.find(p=>p.title==result).id;
    route.Port = result;
  }


  Create()
  {
    if (this.cruisetrip.CompanyId==0)
    {
      this.toastr.error("Please selct the cruiseline");
      return;
    }
    if (this.cruisetrip.ShipId==0)
    {
      this.toastr.error("Please selct the ship");
      return;
    }
    if (this.cruisetrip.CabinTypeId==0)
    {
      this.toastr.error("Please selct the cabin category");
      return;
    }
    if (this.cruisetrip.Routes.length==0)
    {
      this.toastr.error("Please select at least one route");
      return;
    }
    this.cruisetrip.Routes.forEach(element => {
      if (element.PortId==0)
      {
        this.toastr.error("Please select a port");
        return;
      }
    });
    if (this.cruisetrip.DapartureDate==null)
    {
      this.toastr.error("Please select the departure date");
      return;
    }    

    this.createCruiseTrip(this.cruisetrip);
  }

  createCruiseTrip(trip): void {
    this.cruiseService.createCruiseTrip(trip)
      .subscribe(data => {
        this.reponse=data;
        this.toastr.success("Cruise trip created successfully")     
      })
      ;
  }

}
