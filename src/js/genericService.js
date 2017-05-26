/**
 * Created by Curso on 17/05/2017.
 */

export class genericService {
    constructor(){

    }



    ajax(url,method,data,tipo){
        return new Promise(function(resolve, reject){
           $.ajax({
               "url":url,
               "data": data,
               contentType: "application/json; charset=utf 8",
               crossDomain: true,
               dataType: tipo,
               type: method
           }).done(function(data){
              resolve(data);
            }).fail(function(error,errorMsj){
               reject(errorMsj);
           });

        });
    }
}