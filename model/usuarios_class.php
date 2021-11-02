<?php

class usuarios_class{

    public $cod;
    public $username;
    public $password;
    public $status;
    public $role;
    public $cod_cliente;

    public function getCod(){
        return $this->cod;
    }

    public function setCod($cod){
        $this->cod = $cod;

        return $this;
    }

    public function getUsername(){
        return $this->username;
    }

    public function setUsername($username){
        $this->username = $username;

        return $this;
    }

    public function getPassword(){
        return $this->password;
    }

    public function setPassword($password){
        $this->password = $password;

        return $this;
    }

    public function getStatus(){
        return $this->status;
    }

    public function setStatus($status){
        $this->status = $status;

        return $this;
    }

    public function getRole(){
        return $this->role;
    }

    public function setRole($role){
        $this->role = $role;

        return $this;
    }

    public function getCod_cliente(){
        return $this->cod_cliente;
    }

    public function setCod_cliente($cod_cliente){
        $this->cod_cliente = $cod_cliente;

        return $this;
    }
}

?>