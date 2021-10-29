<?php

class usuario_class {
    private $cod;
    private $username;
    private $password;
    private $status;
    private $role;
    private $cod_cliente;

    /**
     * Get the value of cod
     */ 
    public function getCod() {
        return $this->cod;
    }

    /**
     * Set the value of cod
     *
     * @return  self
     */ 
    public function setCod($cod) {
        $this->cod = $cod;

        return $this;
    }

    /**
     * Get the value of username
     */ 
    public function getUsername() {
        return $this->username;
    }

    /**
     * Set the value of username
     *
     * @return  self
     */ 
    public function setUsername($username) {
        $this->username = $username;

        return $this;
    }

    /**
     * Get the value of password
     */ 
    public function getPassword() {
        return $this->password;
    }

    /**
     * Set the value of password
     *
     * @return  self
     */ 
    public function setPassword($password) {
        $this->password = $password;

        return $this;
    }

    /**
     * Get the value of status
     */ 
    public function getStatus() {
        return $this->status;
    }

    /**
     * Set the value of status
     *
     * @return  self
     */ 
    public function setStatus($status) {
        $this->status = $status;

        return $this;
    }

    /**
     * Get the value of role
     */ 
    public function getRole() {
        return $this->role;
    }

    /**
     * Set the value of role
     *
     * @return  self
     */ 
    public function setRole($role) {
        $this->role = $role;

        return $this;
    }

    /**
     * Get the value of cod_cliente
     */ 
    public function getCod_cliente() {
        return $this->cod_cliente;
    }

    /**
     * Set the value of cod_cliente
     *
     * @return  self
     */ 
    public function setCod_cliente($cod_cliente) {
        $this->cod_cliente = $cod_cliente;

        return $this;
    }
}