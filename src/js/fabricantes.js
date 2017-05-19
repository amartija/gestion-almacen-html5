/**
 * Created by Curso on 18/05/2017.
 */

import $ from "jquery";
window.jQuery = window.$ = $;
const urlFabricantes = "http://localhost:8080/gestionalmacen/api/fabricantes";
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
export function renderizarFormulario(codigo){
    let as = new FabricanteService();
    let fabricante = new Fabricante();
    return new Promise(function (resolve, reject){

    });
    if(codigo > .1) {
        as.getById(codigo)
            .then(function (fab) {
                parseForm(fab);

            });
    }else {
        txt = parseForm(fabricante);

    }
}

export  function rederizarFormulario(codigo = -1){
    let as = new FabricanteService();
    let fabricante = new Fabricante();
    let txt ="";
    return new Promise(function(resolve, reject) {
        if(codigo > -1){
            as.getById(codigo)
                .then(function(fab){
                    txt = parseForm(fab);
                    resolve(txt);
                })
                .catch(function () {
                    reject("No se han podido acceder a los datos del codigo "+codigo);
                });
        }else{
            txt = parseForm(fabricante);
            resolve(txt);
        }
    });


    //rellaner datos en el form
}
function parseForm (fabricante){

    let txt="";
    txt="<form action='#' id='fabricanteForm' method='post'>";
    txt = "<input type='text' name='nombre'"
        +" id='nombre' value='"+fabricante.nombre()+"'>"
    txt+="</form>";
    return txt;
}

function parseFabricante (fabricante){
    let codigo = fabricante.codigo;
    let nombre = fabricante.nombre;
    let apellidos = fabricante.telefono;
    let email = fabricante.ciudad;
    let dni = fabricante.persobaContacto;
    let htmlEdit ="<button>Editar</button>";
    let htmlDelete ="<button>Borrar</button>";

    let texto = "<tr><td><input type='checkbox' value='" + codigo + "'></td><td>"+nombre+"</td><td>"+telefono+"</td><td>"+ciudad+"</td><td>"+personaContacto+"</td><td>"+htmlEdit+htmlDelete+"</td></tr>";

    return texto;

}

export function renderizar(){
    let as = new FabricanteService();
    let txt = "";
    return new Promise(function(resolve, reject) {
        as.getAll().then(function(data) {
            let fabricantes = JSON.parse(data);
            //   console.log(fabricantes);
            if (fabricantes.length > 0) {
                txt ="<table id='tablaFabricantes' class='rwd-table'><thead><tr>"
                    +"<th><input type='checkbox' name='borrartodos' id='borrartodos'/></th>"
                    +"<th>Nombre</th>"
                    +"<th>Apellidos</th>"
                    +"<th>DNI</th>"
                    +"<th>Email</th>"
                    +"<th></th></tr></thead><tbody>";
                for (let i = 0; i < fabricates.length; i++) {
                    let fabricante = fabricantes[i];
                    console.log(fabricante);
                    txt += parseFabricante(fabricante);
                }
                txt+="</tbody><tfoot><tr><td colspan='6'>Total Fabricantes: "+fabricantes.length+"</td></tr></tfoot></table>";
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
