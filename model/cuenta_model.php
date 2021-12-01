<?php
if ($_SERVER['SERVER_NAME']== "bat.zerbitzaria.net") {
    include_once ("connect_data_SERV.php");
} else {
    include_once ("connect_data_LOCAL.php");
}

include_once ("cuenta_class.php");
include_once ("movimiento_model.php");

class cuenta_model extends cuenta_class {

    public $ArrMovimientos=array();

    private $link;  // datu basera lotura - enlace a la bbdd  

    public function OpenConnect() {
        $konDat=new connect_data();
        try
        {
            $this->link=new mysqli($konDat->host,$konDat->userbbdd,$konDat->passbbdd,$konDat->ddbbname);
            // mysqli klaseko link objetua sortzen da dagokion konexio datuekin
            // se crea un nuevo objeto llamado link de la clase mysqli con los datos de conexión. 
        }
        catch(Exception $e)
        {
            echo $e->getMessage();
        }
        $this->link->set_charset("utf8"); // honek behartu egiten du aplikazio eta 
                        //databasearen artean UTF -8 erabiltzera datuak trukatzeko
    }                   
        
    public function CloseConnect() {
        mysqli_close ($this->link);
    }

     /********* FUNCIONES **********/

    public function getCuenta(){       

        $this->OpenConnect();
        $ref=$this->ref;
        $sql="select * from cuentas where ref='$ref'";
        $result= $this->link->query($sql);
        
        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
        {    
            //FILL the SCHOOL with info $THIS
            $cuenta=new cuenta_model();
            $cuenta->ref=$row['ref'];
            $cuenta->nombre=$row['nombre'];
            $cuenta->type=$row['type'];
            $cuenta->saldo=$row['saldo'];
            
            $movimiento=new movimiento_model();
            $movimiento->ref_cuenta=$row['ref'];
            //$this->ArrMovimientos=
            $cuenta->ArrMovimientos=$movimiento->getMovimientos();
            
            
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $cuenta;

    }

    public function getCuentas(){

        $this->OpenConnect();
        $sql="select * from cuentas";
        
        $cuentas=array();
        
        $result = $this->link->query($sql);
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
        {         
            //FILL LIST with all families
            $cuenta=new cuenta_model();
            $cuenta->ref=$row['ref'];
            $cuenta->nombre=$row['nombre'];
            $cuenta->type=$row['type'];
            $cuenta->saldo=$row['saldo'];
            
            array_push($cuentas, $cuenta);    
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $cuentas;

    }

    public function updateCuenta(){       

        $this->OpenConnect();
        $ref=$this->ref;
        $saldo=$this->saldo;
        $sql="UPDATE cuentas SET saldo = $saldo WHERE ref='$ref'";
        $result= $this->link->query($sql);
        $this->CloseConnect();

    }

    public function updateSaldo($importe) {

        $this->OpenConnect();

        $sql="UPDATE cuentas SET saldo=saldo$importe WHERE ref='$this->ref'";
        $result= $this->link->query($sql);
        return $result;

        mysqli_free_result($result);
        $this->CloseConnect();

    }
    
    public function getCuentaByRef(){       

        $this->OpenConnect();
        $sql="SELECT * FROM cuentas WHERE ref='$this->ref'";
        $result= $this->link->query($sql);
        
        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

            $this->nombre=$row['nombre'];
            $this->type=$row['type'];
            $this->saldo=$row['saldo'];
            
        }
        mysqli_free_result($result);
        $this->CloseConnect();
    }
}

