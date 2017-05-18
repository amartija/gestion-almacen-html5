/**
 * Created by Curso on 18/05/2017.
 */

import $ from "jquery";
window.jQuery = window.$ = $;
const urlFabricantes = "http://localhost:8080/gestionalmacen/api/fabricantes/";
import * as service from "./genericService";

export class FabricanteService extends  service.genericService{
    constructor(){
        super();
    }

    getAll(){
        return super.ajax(urlFabricantes, "get", null);
    }

    getById(codigo){
        return super.ajax(urlFabricantes+"/"+codigo, "get", null);
    }
}

export class Fabricante{

    constructor (){
        this.codigo = -1;
        this.nombre = "";
        this.telefono = "";
        this.ciudad ="";
        this.personacontacto = "";
       
    }

    get codigo(){
        return this.codigo;
    }

    set codigo(codigo){
        this.codigo = codigo;
    }

    get nombre (){
        return this.nombre;
    }

    set nombre (nombre){
        this.nombre = nombre;
    }

    get telefono(){
        return this.telefono;
    }

    set telefono(telefono){
        this.telefono = telefono;
    }

    get ciudad(){
        return this.ciudad;
    }

    set ciudad(ciudad){
        this.ciudad = ciudad;
    }

    get personacontacto (){
        return this.personacontacto;
    }

    set personacontacto (personacontacto){
        this.personacontacto = personacontacto;
    }


}
