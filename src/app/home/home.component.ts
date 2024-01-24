import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../empleadoslist/empleadoslist.component';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filtrar por nombre" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    
    <table>
      <app-housing-location *ngFor="let empleado of empleadoFilteredList" 
        [empleado]="empleado">
      </app-housing-location>
    </table>          
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  empleadoList:Empleado[]=[];
  housingService: EmpleadoService= inject(EmpleadoService);
  empleadoFilteredList : Empleado[] = [];

  constructor(){
    this.housingService.getAllEmployees().then((empleadoList:Empleado[])=>{
      console.log(empleadoList);
      this.empleadoList = empleadoList;
      this.empleadoFilteredList = empleadoList;
    });
    
  }

  filterResults(text:string){
    if(!text) this.empleadoFilteredList = this.empleadoList;    
  }
}
