<?php

include_once ("../model/usuario_model.php");

$data=json_decode(file_get_contents("php://input"),true);

$username = $data['username'];
$password = $data['password'];

$user = new usuario_model();

$response = array();

if (isset($username) && isset($password)) {
    $user -> username = $username;
    $user -> password = $password;
    $response['Logged'] = $user -> login();
} else {
    $response['error']="Ez da username edo password pasatu/No se ha pasado el usuario o la contraseña";
}
  
echo json_encode($response);

unset($response);
unset($user);

?>