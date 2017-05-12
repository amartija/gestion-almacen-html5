
var colecciones = [1,2,3,4,5,6,7];

$.noConflict();
jQuery(document).ready(function($){
    $("#contactForm").on("submit",fncValidarContacto);
    $("#contactForm").click(function (event) {
        if ($(this).is(":checked")) {

            $("tbody input[type=checkbox]").attr("checked", true);
        } else {
            $("tbody input[type=checkbox]").attr("checked", false);
        }
    })
    
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

        cargarArrayColecciones();
        function cargarArrayColecciones(){
            if (colecciones.length > 0) {
                for (var c in colecciones) {//añadir html correspondiente a la pagina
                    console.log(c);
                    var texto = "<tr><td><input type='text' value='" + c + "'></td><td></td><td></td><td></td></tr>";
                    $("#tablaColecciones tbody").append(texto);
                }
                $("#tablaColecciones tfoot td").html("<span class= ´text-error'>Total colecciones: </span>" + colecciones.length);
            }else{
                $("#tablaColecciones").remove();
                $("#listadoColecciones").text("No se han encontrado Colecciones.");
            }
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