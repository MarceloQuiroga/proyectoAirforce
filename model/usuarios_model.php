<?php
include_once ('connect_data.php');
include_once ('usuarios_class.php');
include_once ('');

class usuarios_model extends usuarios_class{

    public $link;
    public $objEditorial;

    public function OpenConnect(){

        $konData = new connect_data();

        try{
            $this->link=new mysqli($konData->host,$konData->userbbdd,$konData->passbbdd,$konData->ddbbname);
        } catch(Exception $e){
            echo $e->getMessage();
        }

        $this-> link-> set_charset("utf8");
    }

    public function CloseConnect(){
        $this->link->close();
    }

    public function getUser(){
        $this->OpenConnect();
        $usuario = $this->usuario;
        $contrasenia = $this->contrasenia;

        $sql = "SELECT * FROM usuarios WHERE username='$usuario' AND `password`=$contrasenia";

        $result = $this->link->query($sql);

        mysqli_free_result($result);
        $this->CloseConnect();

    }

    public function insertUser(){

        $this->OpenConnect();
        $usuario = $this->usuario;
        $contrasenia = $this->contrasenia;

        $sql = "INSERT INTO `usuarios`(`username`, `password`) VALUES ('$usuario','$contrasenia')";

        $result = $this->link->query($sql);

        if ($this->link->affected_rows == 1) {
            $msg = $sql." El usuario se ha registrado correctamente, numero de usuarios insertados: ".$this->link->affected_rows;
        }  else{
            $msg = $sql." Fallo al registrar el usuario
        }




    }

}


?>