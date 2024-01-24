import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Empleado } from '../empleado';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <table class="tbl-empleados">
      <tr>
        <td>{{empleado.nombre}}</td>
        <td><a [routerLink]="['details',empleado.id]">Detalles</a></td>
        <td>Modificar</td>
        <td>Borrar</td>
      </tr>
    </table>              
  `,
  styleUrls: ['./empleadoslist.component.css']
})
export class HousingLocationComponent {
  @Input() empleado!: Empleado;
}
