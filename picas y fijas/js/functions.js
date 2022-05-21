var random_number = "";
var random_number;
var digit = [];
var won = 0;


//Genera el random al ingresar por primera vez a la página
randomNumber = random();

$('.close').on('click', function() {
 // $('body').css('background-color', 'rgba(229, 232, 232, 1)');
  $('.result').show();
  $('.result.won').hide();
  beginPlay();
});


//Inicia el juego nuevamente
function beginPlay(){
    deleteTable();
    clean();
    randomNumber = null;
    random_number = [];
    randomNumber = random();
}


//Genera el random
function random(){
  for(i = 0; i < 4; i++){
    digit[i] = parseInt(Math.random()*10);
    for(j = 0; j < i; j++){
      if(digit[i] == digit[j]){
        i -= 1;
        break;
      }
     }
  }
  for(i = 0; i < 4; i++){
   random_number += digit[i];
  }
  return random_number;
} 


//Adiciona una fila con los datos a la tabla
function addPlay(e) { 
    e.preventDefault();
    const row = createRow({    
          playerNumber: $('#playerNumber').val(),
          fijas: fijas,    
          picas: picas  });  
    $('table tbody').prepend(row);  
    clean(); 
  } 

//Crea los datos de la fila de la tabla
function createRow(data) {  return (    
       `<tr>` +     
         `<td>${data.playerNumber}</td>` +    
         `<td>${data.picas}</td>` +   
         `<td>${data.fijas}</td>` +      
       `</tr>`  
      ); 
}

 $("#playerNumber").keypress(function(e) {
       if(e.which == 13) {
          playerNumber = $('#playerNumber').val();
          validation = validateplayerNumber(playerNumber);
          if (validation == 1) {
            picasFijas(playerNumber, randomNumber);
            if (won == 0 || won == 1) {
               addPlay(e);
               clean();
            }
          } 
          else {
            $("#ok").css("color","red");
          }
       }
});


//Limpia el inṕut del dato que ingresa el usuario
function clean() {
  $('#playerNumber').val('');
  $('#playerNumber').focus();
}

//Realiza el proceso de aciertos y desaciertos del número del usuario
function picasFijas (playerNumber, randomNumber){
  fijas = 0;
  picas = 0;
  for (var i = 0; i < playerNumber.length; i++) {
    for (var j = 0; j < playerNumber.length; j++) {
      if (playerNumber[i] === randomNumber[j] && i == j) {
        fijas++;
      }
      else if (playerNumber[i] === randomNumber[j]) {
        picas++;
      }
    }
  }
  if (fijas == 4) {
    won = 1;
    wonPlay();
  }
}

//Valida de que el usuario ingrese un número de 4 digitos
function validateplayerNumber(playerNumber){
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < i; j++) {
      if ((playerNumber[i] == playerNumber[j]) || (playerNumber.length != 4)) {
         i = 4;
         j = 4;
         validate = 0;
         break;
      }else{
         validate = 1;
      } 
    }
  }
return validate;
}

//Elimina las filas de los resultados de los intentos en la tabla
function deleteTable(){
 var rowsTable = $('tbody tr').length;
 for(var r=rowsTable; r>=0; r--)
  {
   $("tbody tr:eq('"+ r +"')").remove(); 
  };
};
 
//javascript
js_won = null;
//jquery 
$(function() {            
        function jq_won() {
            $('.result.won').show();
         }
        js_won = jq_won;
 }) 
 //just js 
 function wonPlay() {  
       js_won(); //== call jquery function - just Reference is globally defined not function itself
       js_won_background();
}

//javascript
js_won_background = null;
//jquery 
$(function() {            
        function jq_won_background() {
             $('.result').show();
         }
        js_won_background = jq_won_background;
 }) 

//Coloca en rojo los digitos que ingresa el usuario cuando son menos de 4 o más de 5 
$(document).ready(function(){
  $('input').on('keyup keydown', function() {
    longInput = $('#playerNumber').val().length;
    if (longInput < 4 || longInput > 4 ) {
      $("input").css("color","red");
      $("#ok").css("color","red");
    } 
     else {
      $("input").css("color","black");
      $("#ok").css("color","black");
    } 
  });
});