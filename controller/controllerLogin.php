<?php

session_start();

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
        
        $_SESSION['role'] = $user->role;
    } else {
        session_destroy();
        $response['logged'] = false;
        $response['error'] = "Error: Wrong Password";
    }
} else {
    session_destroy();
    $response['logged'] = false;
    $response['error']="Ez da username edo password pasatu/No se ha pasado el usuario o la contrasena";
}

if(isset($_SESSION['role'])) { // Magic, ns pork, pero la session no termina en el mismo timelapse es asincrono?
    $response['Debug'] = $_SESSION['role'];
}

echo json_encode($response);

?>