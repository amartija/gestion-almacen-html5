//var $ = require('jquery')
//var colecciones = [1,2,3,4,5,6,7];
import $ from "jquery";
window.jQuery = window.$ = $;
require("bootstrap");
import * as coleccion from "./colecciones";
import * as fabricante from "./fabricantes";
import * as prenda from "./prendas";



var $listadoColecciones =$("#listadoColecciones");
var $listadoFabricantes =$("#listadoFabricantes");
var $listadoPrendas =$("#listadoPrendas");
var $coleccion =$("#coleccion");

var $pagebody =$("#page-body");

var $botonCrear = $("#botonCrear");


var $contactForm = $("#contactForm");

var $crearUsuario = $('#crearUsuario');
var $form = $('#form');

if($listadoColecciones.length) {//estamos en la página de alumnos
    let p1 = coleccion.renderizar();
    p1.then(function (txt) {
        $listadoColecciones.find("div.flexcontainer:last-child").append(txt);
    }).catch(function (txt) {

    });
}

if($coleccion.length){
    let codigo = libreria.getURLParameter('codigo');
    // console.log(codigo);
    let p2 =coleccion.rederizarFormulario(codigo);

    p2.then(function (html) {
        console.log("html"+html);
        $coleccion.find("div.flexcontainer:last-child").append(html);
    }).catch(function (txt) {
        console.log("html"+txt);
    });
}

if($listadoFabricantes.length) {
    let p1 = fabricante.renderizar();
    p1.then(function (txt) {
        console.log(txt);
        $listadoFabricantes.find("div.flexcontainer:last-child").append(txt);
    });
}
if($listadoPrendas.length) {
    let p1 = prenda.renderizar();
    p1.then(function (txt) {
        console.log(txt);
        $listadoPrendas.find("div.flexcontainer:last-child").append(txt);
    });
}



$(document).ready(function($){
    $("#contactForm").on("submit",fncValidarContacto);
    $("#contactForm").click(function (event) {
        if ($(this).is(":checked")) {

            $("tbody input[type=checkbox]").attr("checked", true);
        } else {
            $("tbody input[type=checkbox]").attr("checked", false);
        }
    })

    $("#tablaColecciones tbody").on("click","td:last-child button:last-child",function(){
        //alert("has pulsado el boton de borrado");
        var codigo = $(this).parents("tr").find("input[type=checkbox]").val();
        //Llamar al REST para Borrar
        //
        //alert(codigo);
        //borra la tupla del boton que se ha seleccionado
        $(this).parents("tr").remove();
    });
    $("#tablaColecciones tbody").on("click","td:last-child button:first-child",function(){
        //alert("has pulsado el boton de actualizar");
        var codigo = $(this).parents("tr").find("input[type=checkbox]").val();
        //Llamar al REST para el GetById
        var nombre = $(this).parents("tr").find("td:nth-child(2)").text();
    });
    function fncValidarContacto () {

        var pnombre = $("#nombre");
        var pidentificadorFabricante = $("#identificadorFabricante");
        var ppersonaContacto = $("#personaContacto");
        var ptelefono = $("#telefono");
        var valido = false;

        var nombrevalido = validarNombre(pnombre);
        var identificadorFabricantevalido = validarIdentificadorFabricante(pidentificadorFabricante);
        var personaContactovalido = validarPersonaContacto(ppersonaContacto);
        var telefonovalido = validarTelefono(ptelefono);

        $("#nombre").siblings("div.text-error").text("");
        $("#identificadorFabricante").siblings("div.text-error").text("");
        $("#personaContacto").siblings("div.text-error").text("");
        $("#telefono").siblings("div.text-error").text("");

        if (nombrevalido && identificadorFabricantevalido && personaContactovalido && telefonovalido) {
            valido = true;
        } else {
            if (!nombrevalido) {
                $("#nombre").siblings("div.text-error").text("El nombre2 tiene que tener al menos 3 letra");
            }
            if (!identificadorFabricantevalido) {
                $("#identificadorFabricante").siblings("div.text-error").text("El identificador tiene que tener al menos 5 numeros");
            }
            if (!personaContactovalido) {
                $("#personaContacto").siblings("div.text-error").text("El nombre y apellido deben de tener al menos 3 letras");
            }
            if (!telefonovalido) {
                $("#telefono").siblings("div.text-error").text("El telefono no es valido, tiene que tener 9 numeros");
            }

        }
        return false;
    }

     //   cargarArrayColecciones();
        function cargarArrayColecciones(colecciones){
            if (colecciones.length > 0) {
                for (var i = 0; i < colecciones.length; i++) {//añadir html correspondiente a la pagina
                    console.log(colecciones[i]);
                    var codigo = colecciones[i].codigo;
                    var fentrada = colecciones[i].fentrada;
                    var year = colecciones[i].year;
                    var gama = colecciones[i].gama;
                    var tematica = colecciones[i].tematica;

                    var htmlEdit ="<button>Editar</button>";
                    var htmlDelete ="<button>Borrar</button>";
                    var texto = "<tr><td><input type='checkbox' value='" + codigo + "'></td><td>"+year+"</td><td>"+fentrada+"</td><td>"+gama+"</td><td>"+tematica+"</td><td>"+htmlEdit+htmlDelete+"</td></tr>";
                    $("#tablaColecciones tbody").append(texto);
                }
                $("#tablaColecciones tfoot td").html("<span class= ´text-error'>Total colecciones: </span>" + colecciones.length);
            }else{
                $("#tablaColecciones").remove();
                $("#listadoColecciones").text("No se han encontrado Colecciones.");
            }
        }
    const urlColecciones = "http://localhost:8080/gestionalmacen/api/colecciones/"
    ajax({"url":urlColecciones})
        .then(function (data){
        //tengo los datos cargados
        console.log(data);
        //for (var i = 0; i <data.length; i++){
          //  var alumno= data[i];
        //}
        cargarArrayColecciones(data);
    }).catch(function(jqXHR, textStatus, errorThrown ){
        //gestion de errores
        console.log(jqXHR);
    })
    function ajax(opciones){
        return new Promise(function (resolve, reject){
            $.ajax(opciones).done(resolve).fail(reject);
        })
    }
});

function validarNombre(){
    const pattern = new RegExp(/[a-zA-Z]{3,}/);
    return pattern.test(nombre);
}

function validarIdentificadorFabricante(){
    var probado = true;
    if(identificadorFabricante != "") {
        const pattern = new RegExp(/\d[5]/);
        return pattern.test(identificadorFabricante);
    }
    return probado;
        
}

function validarPersonaContacto(){
    const pattern = new RegExp(/[a-zA-Z]{3,}s[a-zA-Z]{3,}/);
    return pattern.test(personaContacto);
}

function validarTelefono(){
    const pattern = new RegExp(/\d[9]/);
    return pattern.test(telefono);
}






$pagebody.on("click","tbody td:last-child button:last-child",function(){
    var codigo = $(this).parents("tr").find("input[type=checkbox]").val();
    $(this).parents("tr").remove();
    let nTable = $("table").attr("data-table");
    let service;
    switch (nTable){
        case 'colecciones':
            service = new colecciones.ColeccionService();
            break;
    }
    service.delete(codigo);

});

$pagebody.on("click","tbody td:last-child li:first-child",function(){//editar
    //obtener d ela base de datos  dela coleccion de BD , hay que añadir renderizar formulario
    //renderizar formulario
    //modificar formulario
    //Method = PUT
    //añadir un campo hidden con el id del usuario modificado
    var codigo = $(this).parents("tr").find("input[type=checkbox]").val();
    let nTable = $("table").attr("data-table");
    //              http:----------------//--- localhost:63342
    let txt= window.location.protocol + '//' + window.location.host+"/gestion-almacen/";
    switch (nTable){
        case 'colecciones':
            txt += "colecciones/coleccion.html?codigo="+codigo;
            break;
    }
    window.location = txt;
});



    $("#botonCrear").on("click", function() {
        $form =$("#formCrearColeccion");
        let coleccionjson = JSON.stringify($("#formCrearColeccion").serializeObject());

        const nuevaColeccion = coleccion.crearColeccion(coleccionjson);

        nuevaColeccion.then(function(){
            $form[0].reset();
            $("#myModal").modal("hide");
        });

        
    });

$("#botonEditar").on("click", function() {
    $form = $("#formEditarColeccion");
    let coleccionjson = JSON.stringify($("#formEditarColeccion").serializeObject());

    const nuevaColeccion = coleccion.updateColeccion(coleccionjson);

    nuevaColeccion.then(function () {
        $form[0].reset();
        $("#myModalE").modal("hide");
    });
});




$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};