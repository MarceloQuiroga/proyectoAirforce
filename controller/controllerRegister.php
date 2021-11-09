<?php

include_once ("../model/usuario_model.php");

$username = $_POST["username"];
$contrasenia = $_POST["password"];

$user = new usuario_model();

$user -> username = $username;
$user -> contrasenia = $contrasenia;

$response = array();

if ($username != null && $contrasenia != null) {
    $user -> username = $username;
    $user -> contrasenia = $contrasenia;

    $login = $user -> register(); //VALIDACION LOGIN
    // $response['Debug'] = $login;

    if ($login == true) {
        $response['registered'] = true;
        $response['error'] = "No Error";
    } else {
        $response['registered'] = false;
        $response['error'] = "Error: Wrong Password";
    }
} else {
    $response['registered'] = false;
    $response['error']="Ez da username edo password pasatu / No se ha pasado el usuario o la contraseña";
}

echo json_encode($response);

?>