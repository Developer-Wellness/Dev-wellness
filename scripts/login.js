'use strict';

function checkUser(){
  let username = localStorage.getItem('user');
  if(username){
    $('.btn btn-primary').hide();
  }else{
    let userNameGet = $('#userId');
    localStorage.setItem('user', userNameGet);
  }
}

$(window).on('load', checkUser());
