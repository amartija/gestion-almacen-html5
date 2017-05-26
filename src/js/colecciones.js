/**
 * Created by Curso on 17/05/2017.
 */

import $ from "jquery";
window.jQuery = window.$ = $;

const urlColecciones = "http://localhost:8080/gestionalmacen/api/colecciones";
import * as service from "./genericService";

export class ColeccionService extends service.genericService {
    constructor() {
        super();
    }

    getAll() {
        return super.ajax(urlColecciones, "get", null, "json");
    }

    getById(codigo) {
        return super.ajax(urlColecciones + "/" + codigo, "get", null);
    }
    create(coleccion){
        console.log(coleccion);
        return super.ajax(urlColecciones ,"post", coleccion, "json");
    }


}
export  function  renderizarFormulario(codigo = -1){
    let as = new ColeccionService();
    let coleccion = new Coleccion();
    let txt ="";
    return new Promise(function(resolve, reject) {
        if(codigo > -1 && codigo != null){
            as.getById(codigo)
                .then(function(col){
                    txt = parseForm(JSON.parse(col));
                    resolve(txt);
                })
                .catch(function (txt) {
                    console.log(txt);
                    reject("No se han podido acceder a los datos del codigo: "+codigo);
                });
        }else{
            txt = parseForm(coleccion);
            resolve(txt);
        }
    });


    //rellaner datos en el form
}
function parseForm (coleccion){
    console.log(coleccion);
    let txt="";
    txt="<form action='#' id='coleccionForm' method='post'>";
    txt +="<input type='text' name='year' id='year' value='"+coleccion.year()+"'>";
    txt +="<div class='flexcontainer'><button>Enviar</button><button>Cancelar</button></div></form>";
    return txt;
}

function parseColeccion (coleccion){
    let codigo = coleccion.codigo;
    let year = coleccion.year;
    let fentrada = coleccion.fentrada;
    let gama = coleccion.gama;
    let tematica = coleccion.tematica;
    let htmlEdit ="<button>Editar</button>";
    let htmlDelete ="<button>Borrar</button>";

    let texto = "<tr><td><input type='checkbox' value='" + codigo + "'></td><td>"+year+"</td><td>"+fentrada+"</td><td>"+gama+"</td><td>"+tematica+"</td><td>"+htmlEdit+htmlDelete+"</td></tr>";

    return texto;

}

export function crearColeccion(coleccionjson){
    let cs  = new ColeccionService();

    return new Promise(function(resolve, reject){
        cs.create(coleccionjson).then(function (data){
            console.log("Hecho2");
            resolve(data);
        }).catch(function(msj) {
            reject(new Error(msj));
        });
    });
}
export function renderizar(){
    let cs = new ColeccionService();
    let txt = "";
    return new Promise(function(resolve, reject) {
        cs.getAll().then(function(data) {
            console.log(colecciones);
            let colecciones = data;
            //   console.log(colecciones);
            if (colecciones.length > 0) {
                txt ="<table data-table='colecciones' id='tablaColecciones' class='rwd-table'><thead><tr>"
                    +"<th><input type='checkbox' name='borrartodos' id='borrartodos'/></th>"
                    +"<th>Year</th>"
                    +"<th>F.Entrada</th>"
                    +"<th>Gama</th>"
                    +"<th>Temanica</th>"
                    +"<th></th></tr></thead><tbody>";;
                for (let i = 0; i < colecciones.length; i++) {
                    let coleccion = colecciones[i];
                    console.log(coleccion);
                    txt += parseColeccion(coleccion);
                }
                txt+="</tbody><tfoot><tr><td colspan='6'>Total Colecciones: "+colecciones.length+"</td></tr></tfoot></table>";
            }else{
                txt ="no se encuentran colecciones en la BBDD";
            }
            resolve(txt)
        }, function(error) {//error
            console.log(error);
            txt ="error en la carga de colecciones";
            reject(txt);
        });
    });
}


export class Coleccion{

    constructor (){
        this.codigo = -1;
        this.fentrada = "";
        this.fabricante = "";
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
