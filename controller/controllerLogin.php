<?php

include_once ("../model/usuario_model.php");
$response = array();

if (isset($_GET["request"])) {
    if ($_GET["request"] == "login") {

        $username = $_GET["username"];
        $password = $_GET["password"];

        $user = new usuario_model();

        if ($username != null && $password != null) {
            $user -> username = $username;
            $user -> password = $password;
            
            $login = $user -> login(); //VALIDACION LOGIN
            if ($login == true) {
                $response['logged'] = true;
                $response['error'] = "No Error";

                session_start();
                $_SESSION['role'] = $user->role;

            } else {
                $response['logged'] = false;
                $response['error'] = "Error: Wrong Password";
            }
        } else {
            $response['logged'] = false;
            $response['error']="Ez da username edo password pasatu/No se ha pasado el usuario o la contrasena";
        }

    } else if ($_GET["request"] == "logout") {

        session_destroy();
        $response['logged'] = false;
        $response['error'] = "No Error";

    }
    
} else {
    $response['logged'] = false;
    $response['error'] = "Solicitud 'Login/Logout' no recibida";
}

echo json_encode($response);

?>