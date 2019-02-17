const ENTER_KEY_CODE='13';


function sendMessage(){
    var text=$('#text').val();
    if(text!=''){
        var xhttp= new XMLHttpRequest();
        xhttp.open('POST','/Chat/SendMessage',true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send('text='+text);
    }
}

function displayMessage(){
    var text=$('#text').val();
    if(text!=''){
    sendMessage();
    $('#text').val('');
    var innerText='<div class="yourChatMessage"> <b>You</b> <p>'+text+'</p> </div>';
    $('.chatLog').append(innerText);
    
    //This pinpoints the new location of the chat log's scroll bar. 
    var newScrollLocation=($('.chatLog').scrollTop()+300)*200;
    $('.chatLog').scrollTop(scrollLocation);
    }
   }

//Custom function for keypress on 'Enter' key only.
$.fn.enterKey = function (fnc) {
return this.each(function () {
    $(this).keypress(function (ev) {
        var keycode = (ev.keyCode ? ev.keyCode : ev.which);
        if (keycode == 	ENTER_KEY_CODE) {
            fnc.call(this, ev);
        }
    });
});
}

function eventListener(){
    Echo
    .listen('Chat1','h',function(){
    $('.chatLog').append("<p> Reached here</p>");
    $innerText="<div class='thierChatMessage'> <b>Them</b> <p></p> </div>";
    $('.chatLog').append(innerText);
    var newScrollLocation=($('.chatLog').scrollTop()+300)*200;
    $('.chatLog').scrollTop(scrollLocation);
   });
  
}

$(document).ready(function(){
$('#text').enterKey(displayMessage);
$('#send').click(displayMessage);
eventListener();
});