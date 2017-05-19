/**
 * Created by Curso on 18/05/2017.
 */
import $ from "jquery";
window.jQuery = window.$ = $;
const urlPrendas = "http://localhost:8080/gestionalmacen/api/prendas";
import * as service from "./genericService";

export class PrendaService extends  service.genericService{
    constructor(){
        super();
    }

    getAll(){
        return super.ajax(urlPrendas, "get", null);
    }

    getById(codigo){
        return super.ajax(urlPrendas+"/"+codigo, "get", null);
    }
}

export class Prenda{

    constructor (){
        this.codigo = -1;
        this.nombre = "";
        this.talla = "";
        this.color ="";
        this.tipotela = "";

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

    get talla(){
        return this.talla;
    }

    set talla(talla){
        this.talla = talla;
    }

    get color(){
        return this.color;
    }

    set color(color){
        this.color = color;
    }

    get tipotela (){
        return this.tipotela;
    }

    set tipotela (tipotela){
        this.tipotela = tipotela;
    }


}
