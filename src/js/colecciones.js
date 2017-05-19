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
export function renderizarFormulario(codigo){
    let as = new ColeccionService();
    let coleccion = new Coleccion();
    return new Promise(function (resolve, reject){
        
    });
    if(codigo > .1) {
        as.getById(codigo)
            .then(function (col) {
                parseForm(col);

            });
    }else {
            txt = parseForm(coleccion);
    
    }
}

export  function rederizarFormulario(codigo = -1){
    let as = new ColeccionService();
    let coleccion = new Coleccion();
    let txt ="";
    return new Promise(function(resolve, reject) {
        if(codigo > -1){
            as.getById(codigo)
                .then(function(col){
                    txt = parseForm(col);
                    resolve(txt);
                })
                .catch(function () {
                    reject("No se han podido acceder a los datos del codigo "+codigo);
                });
        }else{
            txt = parseForm(coleccion);
            resolve(txt);
        }
    });


    //rellaner datos en el form
}
function parseForm (coleccion){

    let txt="";
    txt="<form action='#' id='coleccionForm' method='post'>";
    txt = "<input type='text' name='nombre'"
        +" id='nombre' value=''+alumno.nombre()+'>"
    txt+="</form>";
    return txt;
}

function parseColeccion (coleccion){
    let codigo = coleccion.codigo;
    let nombre = coleccion.nombre;
    let apellidos = coleccion.apellidos;
    let email = coleccion.email;
    let dni = coleccion.dni;
    let htmlEdit ="<button>Editar</button>";
    let htmlDelete ="<button>Borrar</button>";

    let texto = "<tr><td><input type='checkbox' value='" + codigo + "'></td><td>"+nombre+"</td><td>"+apellidos+"</td><td>"+dni+"</td><td>"+email+"</td><td>"+htmlEdit+htmlDelete+"</td></tr>";

    return texto;

}

export function renderizar(){
    let as = new ColeccionService();
    let txt = "";
    return new Promise(function(resolve, reject) {
        as.getAll().then(function(data) {
            let colecciones = JSON.parse(data);
            //   console.log(colecciones);
            if (colecciones.length > 0) {
                txt ="<table id='tablaColecciones' class='rwd-table'><thead><tr>"
                    +"<th><input type='checkbox' name='borrartodos' id='borrartodos'/></th>"
                    +"<th>Nombre</th>"
                    +"<th>Apellidos</th>"
                    +"<th>DNI</th>"
                    +"<th>Email</th>"
                    +"<th></th></tr></thead><tbody>";
                for (let i = 0; i < colecciones.length; i++) {
                    let coleccion = colecciones[i];
                    console.log(coleccion);
                    txt += parseColeccion(coleccion);
                }
                txt+="</tbody><tfoot><tr><td colspan='6'>Total Colecciones: "+colecciones.length+"</td></tr></tfoot></table>";
            }else{
                txt ="no se encuentran alumnos en la BBDD";
            }
            resolve(txt)
        }, function(error) {//error
            console.log(error);
            txt ="error en la carga de alumnos";
            reject(txt);
        });
    });
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
