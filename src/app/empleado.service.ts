import { Injectable } from '@angular/core';
import { Empleado } from './empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  url : string = 'https://localhost:44365/api/Empleados';
  
  constructor() { }

  async getAllEmployees():Promise<Empleado[]>{
    const data = await fetch(this.url);    
    return await data.json()??[];
  }

  async getEmployeeById(id:Number):Promise<Empleado|undefined>{
    const data = await fetch(`${this.url}/GetEmployeeById/${id}`);
    return await data.json() ?? {};
  }

  submitApplication(id:number,nombre:string, apellido:string,fechaNacimiento:string, correoElectronico:string,direccion:string, telefono:string ){
    console.log(correoElectronico,telefono);
    let body = {        
      id,
      fotografia: "XXXXXX.jpg",
      nombre,
      apellido,
      puestoId: 1,
      fechaNacimiento,
      fechaContratacion: "2022-03-23T00:00:00",
      direccion,
      telefono,
      correoElectronico,
      estadoId: "1"
    }
    fetch(this.url,{
      method:'PUT',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(body),
      cache: 'default'
    })
  }
}
