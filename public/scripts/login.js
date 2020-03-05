'use strict';

function checkUser(){
  let username = localStorage.getItem('user');
  if(username){
    $('.btn btn-primary').hide();
    let userNameGet = $('#userId').val();
    localStorage.setItem('user', JSON.stringify(userNameGet));
  }else{
    let userNameGet = $('#userId').val();
    localStorage.setItem('user', JSON.stringify(userNameGet));
  }
}
$('#userId').on('change', checkUser());


function logOut(){
  localStorage.clear();
};

$('#logout').on('click', logOut);
