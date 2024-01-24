import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { EmpleadoService } from "../empleado.service";
import { Empleado } from "../empleado";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-details",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `    
    <h2 class="section-heading">Modificar empleado</h2>
    <form [formGroup]="applyForm" (submit)="submitApplication()">
      <label for="first-name">First Name</label>
      <input id="first-name" type="text" formControlName="firstName" value="{{empleado?.nombre}}"/>

      <label for="last-name">Last Name</label>
      <input id="last-name" type="text" formControlName="lastName" value="{{empleado?.apellido}}"/>

      <label for="fechaNacimiento">Fecha de nacimiento</label>
      <input id="fechaNacimiento" type="date" formControlName="fechaNacimiento" value="{{empleado?.fechaNacimiento}}"/>

      <label for="email">Email</label>
      <input id="email" type="email" formControlName="email" value="{{empleado?.correoElectronico}}"/>

      <label for="direccion">Direccion</label>
      <input id="direccion" type="text" formControlName="direccion" value="{{empleado?.direccion}}"/>

      <label for="telefono">Telefono</label>
      <input id="telefono" type="text" formControlName="telefono" value="{{empleado?.telefono}}"/>

      <button type="submit" class="primary">Guardar</button>
    </form>
  `,
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  empleadoService = inject(EmpleadoService);
  empleado: Empleado | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    fechaNacimiento: new FormControl(""),
    direccion: new FormControl(""),
    email: new FormControl(""),
    telefono: new FormControl(""),
  });
  employeeId:number=0;
  constructor(private router:Router) {
    const employeeId = Number(this.route.snapshot.params["id"]);
    this.employeeId=employeeId;
    
    this.empleadoService.getEmployeeById(employeeId).then((employee) => {
      this.empleado = employee;
    });
  }

  

  submitApplication() {
    this.empleadoService.submitApplication(
      this.employeeId,
      this.applyForm.value.firstName ?? "",
      this.applyForm.value.lastName ?? "",
      this.applyForm.value.fechaNacimiento ?? "",
      this.applyForm.value.email ?? "",
      this.applyForm.value.direccion ?? "",
      this.applyForm.value.telefono ?? ""
    );

    this.router.navigate(['/']);
  }
}
