<?php 

  $url = basename($_SERVER['REQUEST_URI']);

  switch ($url) {
    case "proyectoAirforce":
      $index = "href=''";
      $logo = "src='resources/";
      $banca = "href='resources/pages/banca.php'";
    break;
    
    case "banca.php":
      $index = "href='../../'";
      $logo = "src='../";
      $banca = "href='#'";
    break;
  }

?>

<header id="header" class="fixed-top d-flex align-items-center header-transparent">     
  <div class="container-fluid">
    <div class="row justify-content-center align-items-center">
      <div class="col-xl-11 d-flex align-items-center justify-content-between">
        <a <?php echo $index; ?>><img class="logoimg" <?php echo ($logo."img/LOGO AirForce.png'"); ?> alt=""></a>
        <!-- Uncomment below if you prefer to use an image logo -->
        <!-- <a href="index.html" class="logo"><img src="resources/img/logo.png" alt="" class="img-fluid"></a>-->

        <nav id="navbar" class="navbar">
          <ul>
            <li><a class="nav-link scrollto active" href="#hero">Inicio</a></li>
            <li><a class="nav-link scrollto" href="#about">About</a></li>
            <li><a class="nav-link scrollto" href="#services">Servicios</a></li>
            <li><a class="nav-link scrollto " href="#portfolio">Productos</a></li>
            <li><a class="nav-link scrollto" href="#team">Equipo</a></li>

            <!--IF LOGEADO Y USUARIO=ADMIN-->
            <li><a id="botonBanca" class="nav-link d-none" data-target="banca" <?php echo $banca; ?>>Banca</a></li>
            <li><a class="nav-link scrollto" href="#contact">Contact</a></li>


            <li id="dropdownLogin" class="dropdown"><a href="#" data-bs-toggle="modal" data-bs-target="#login"><span>Login</span></a>
              <ul class="d-none">
                <li><a href="#" name="perfil">Perfil</a></li>
                <li><a href="#" name="logout">Logout</a></li>
              </ul>
            </li> 

          </ul>
          <i class="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </div>
  </div>
</header>