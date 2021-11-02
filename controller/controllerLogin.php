<?php

include_once ("../model/usuario_model.php");

$username = $_GET["username"];
$password = $_GET["password"];

$user = new usuario_model();

$response = array(); //RETURN

if ($username != null && $password != null) {
    $user -> username = $username;
    $user -> password = $password;
    
    $login = $user -> login(); //VALIDACION LOGIN
    
    if ($login == true) {
        $response['logged'] = true;
        $response['error'] = "No Error";
    } else {
        $response['logged'] = false;
        $response['error'] = "Error: Wrong Password";
    }
} else {
    $response['Logged'] = false;
    $response['error']="Ez da username edo password pasatu/No se ha pasado el usuario o la contraseña";
}
 
echo json_encode($response);

?>