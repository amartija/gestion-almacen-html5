/**
 * Created by Curso on 17/05/2017.
 */
import $ from "jquery";
window.jQuery = window.$ = $;
const urlColecciones = "http://localhost:8080/gestionalmacen/api/colecciones";
import * as service from "./genericService";

export class ColeccionService extends  service.genericService{
    constructor(){
        super();
    }

    getAll(){
        return super.ajax(urlColecciones, "get", null);
    }
    
    getById(codigo){
        return super.ajax(urlColecciones+"/"+codigo, "get", null);
    }
}

export class Coleccion{

    constructor (){
        this.codigo = -1;
        this.fentrada = "";
        this.fabricante = new Array();
        this.gama ="";
        this.prendas = new Array();
        this.tematica = "";
        this.year = "";
    }

    get codigo(){
        return this.codigo;
    }

    set codigo(codigo){
        this.codigo = codigo;
    }

    get fentrada (){
        return this.fentrada;
    }

    set fentrada (fentrada){
        this.fentrada = fentrada;
    }

    get fabricante(){
        return this.fabricante;
    }
    
    set fabricante(fabricante){
        this.fabricante = fabricante;
    }
    
    get gama(){
        return this.gama;
    }
    
    set gama(gama){
        this.gama = gama;
    }
    
    get prendas (){
        return this.prendas;
    }
    
    set prendas (prendas){
        this.prendas = prendas;
    }
    
    get tematica (){
        return this.tematica;
    }
    set tematica(tematica){
        this.tematica = tematica;
    }
    
    get year() {
        return this.year;
    }
    
    set year (year){
        this.year = year;
    }

}
