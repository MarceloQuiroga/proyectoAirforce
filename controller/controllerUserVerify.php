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
    $login = $user -> login(); //VALIDACION LOGIN
    if ($login.str_split(":")[0] == "Error") {
        $response['Logged'] = "false";
        $response['error'] = $login.str_split(":")[1];
    } else {
        $response['Logged'] = "true";
        $response['error'] = "No Error";
    }
} else {
    $response['Logged'] = "false";
    $response['error']="Ez da username edo password pasatu/No se ha pasado el usuario o la contraseña";
}
  
echo json_encode($response);

unset($response);
unset($user);

?>