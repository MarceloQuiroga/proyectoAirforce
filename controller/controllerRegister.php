<?php
include_once ("../model/usuario_model.php");
$response = array();

$username = $_POST["username"];
$contrasenia = $_POST["password"];


$user = new usuario_model();

$user -> username = $username;
$user -> password = $contrasenia;



if ($username != null && $contrasenia != null) {
    $register = $user -> findUser();

    if ($register == true) {
        $response['debug'] = "Lo siento ese usuario esta en uso introduzca uno que no exista";
    }else{

        $login = $user -> register(); //VALIDACION LOGIN
        // $response['Debug'] = $login;

        if ($login == true) {
            $response['registered'] = true;
            $response['error'] = "No Error";
        } else {
            $response['registered'] = false;
            $response['error'] = "Error: Wrong Password";
        }

        
    }
}else {
    $response['registered'] = false;
    $response['error']="Ez da username edo password pasatu / No se ha pasado el usuario o la contraseña";
}


echo json_encode($response);


?>