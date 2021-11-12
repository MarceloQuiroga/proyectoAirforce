<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>Blog - BizPage Bootstrap Template</title>
  <meta content="" name="description">
  <meta content="" name="keywords">

  <!-- Favicons --> 
  <link href="../img/solo Logo.png" rel="icon">
  <link href="../img/apple-touch-icon.png" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Montserrat:300,400,500,700" rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="../vendor/animate.css/animate.min.css" rel="stylesheet">
  <link href="../vendor/aos/aos.css" rel="stylesheet">
  <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="../vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="../vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
  <link href="../vendor/swiper/swiper-bundle.min.css" rel="stylesheet">

  <!-- Template Main CSS File -->
  <link href="../css/style.css" rel="stylesheet">

  <!-- =======================================================
  * Template Name: BizPage - v5.7.0
  * Template URL: https://bootstrapmade.com/bizpage-bootstrap-business-template/
  * Author: BootstrapMade.com
  * License: https://bootstrapmade.com/license/
  ======================================================== -->
</head>

<body>

  <!-- ============== Header =============== -->
  <?php include('navbar.php');?>
  <!-- ============== Header =============== -->


  <main id="main">

    <!-- ======= Breadcrumbs ======= -->
    <section id="breadcrumbs" class="breadcrumbs2">
      <div class="">
        <h2 class="mt-4">Banca</h2>
      </div>
      <div id="CuentaBanca">
        <select name="potencial" id="potencial" class="custom-select sources" placeholder="Elige una cuenta">
          <option value="DH" selected>ES12 3443 4343 3434 5665</option>
          <option value="A">ES32 3443 4343 3434 5665</option>
          <option value="B">ES68 5672 5673 8964 9642</option>
          <option value="C">ES16 2222 3424 4566 7453</option>
        </select>
      </div>
    </section><!-- End Breadcrumbs -->


    <!-- ======= Banca Section ======= -->
    <section id="banca" class="">
      <div class="container" data-aos="fade-up">

        <header class="section-header">
          <h3 class="section-title">GESTION DE BANCA</h3>
        </header>

        <div class="row" data-aos="fade-up" data-aos-delay="100">
          <div class=" col-lg-12">
            <ul id="banca-flters">
              <li id="botonPrestamos" data-filter=".filter-prest">PRESTAMOS</li>
              <li data-filter=".filter-mov">MOVIMIENTOS</li>
              <li data-filter=".filter-trans">TRANSFERENCIAS</li>
              <li data-filter=".filter-ingr">Ingreso</li>
            </ul>
          </div>
        </div>

        

        <div class="row banca-container" data-aos="fade-up" data-aos-delay="200">

          <div class="col-lg-4 col-md-6 banca-item filter-prest">
            <div class="banca-wrap">
              
              <div class="banca-info">
                <h4><a href="portfolio-details.html">PRESTAMO</a></h4>
                <p>Prestamo</p>
              </div>

              <figure>
                <img src="../img/portfolio/app1.jpg" class="img-fluid" alt="">
                <a data-bs-toggle="modal" data-bs-target="#formPrestamo" data-lightbox="banca" data-title="App 1" class="link-preview">CALCULAR</a>
              </figure>

              
            </div>
          </div>

          <div class="col-lg-4 col-md-6 banca-item filter-prest">
            <div class="banca-wrap">
              
              <div class="banca-info">
                <h4><a href="portfolio-details.html">LEASING</a></h4>
                <p>Leasing</p>
              </div>

              <figure>
                <img src="../img/portfolio/web3.jpg" class="img-fluid" alt="">
                <a data-bs-toggle="modal" data-bs-target="#formLeasing" data-lightbox="banca" data-title="App 1" class="link-preview">CALCULAR</a>
              </figure>

              
            </div>
          </div>

          <div class="col-lg-4 col-md-6 banca-item filter-prest">
            <div class="banca-wrap">
              <div class="banca-info">
                <h4><a href="portfolio-details.html">Ejemplo</a></h4>
                <p>Ejemplo</p>
              </div>
              <figure>
                <img src="../img/portfolio/app2.jpg" class="img-fluid" alt="">
                <a href="../img/portfolio/app2.jpg" class="link-preview banca-lightbox" data-gallery="bancaGallery" title="App 2"><i class="bi bi-plus"></i></a>
                <a href="portfolio-details.html" class="link-details" title="More Details"><i class="bi bi-link"></i></a>
              </figure>
            </div>
          </div>
          <!-- --------------------Estas cards de la parte de movimientos no la necesitamos por ahora------------------
          <div class="col-lg-4 col-md-6 banca-item filter-mov">
            <div class="banca-wrap">
              <figure>
                <img src="resources/img/portfolio/card2.jpg" class="img-fluid" alt="">
                <a href="resources/img/portfolio/card2.jpg" class="link-preview banca-lightbox" data-gallery="bancaGallery" title="Card 2"><i class="bi bi-plus"></i></a>
                <a href="portfolio-details.html" class="link-details" title="More Details"><i class="bi bi-link"></i></a>
              </figure>

              <div class="banca-info">
                <h4><a href="portfolio-details.html">Card 2</a></h4>
                <p>Card</p>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 banca-item filter-mov">
            <div class="banca-wrap">
              <figure>
                <img src="resources/img/portfolio/web2.jpg" class="img-fluid" alt="">
                <a href="resources/img/portfolio/web2.jpg" class="link-preview banca-lightbox" data-gallery="bancaGallery" title="Web 2"><i class="bi bi-plus"></i></a>
                <a href="portfolio-details.html" class="link-details" title="More Details"><i class="bi bi-link"></i></a>
              </figure>

              <div class="banca-info">
                <h4><a href="portfolio-details.html">Web 2</a></h4>
                <p>Web</p>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 banca-item filter-mov">
            <div class="banca-wrap">
              <figure>
                <img src="resources/img/portfolio/app3.jpg" class="img-fluid" alt="">
                <a href="resources/img/portfolio/app3.jpg" class="link-preview banca-lightbox" data-gallery="bancaGallery" title="App 3"><i class="bi bi-plus"></i></a>
                <a href="portfolio-details.html" class="link-details" title="More Details"><i class="bi bi-link"></i></a>
              </figure>

              <div class="banca-info">
                <h4><a href="portfolio-details.html">App 3</a></h4>
                <p>App</p>
              </div>
            </div>
          </div>

          -->

          <div class="col-lg-4 col-md-6 banca-item filter-trans">
            <div class="banca-wrap">
              <figure>
                <img src="../img/portfolio/card1.jpg" class="img-fluid" alt="">
                <a href="../img/portfolio/card1.jpg" class="link-preview banca-lightbox" data-gallery="bancaGallery" title="Card 1"><i class="bi bi-plus"></i></a>
                <a href="portfolio-details.html" class="link-details" title="More Details"><i class="bi bi-link"></i></a>
              </figure>

              <div class="banca-info">
                <h4><a href="portfolio-details.html">Card 1</a></h4>
                <p>Card</p>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 banca-item filter-trans">
            <div class="banca-wrap">
              <figure>
                <img src="../img/portfolio/card3.jpg" class="img-fluid" alt="">
                <a href="../img/portfolio/card3.jpg" class="link-preview banca-lightbox" data-gallery="bancaGallery" title="Card 3"><i class="bi bi-plus"></i></a>
                <a href="portfolio-details.html" class="link-details" title="More Details"><i class="bi bi-link"></i></a>
              </figure>

              <div class="banca-info">
                <h4><a href="portfolio-details.html">Card 3</a></h4>
                <p>Card</p>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 banca-item filter-trans">
            <div class="banca-wrap">
              <figure>
                <img src="../img/portfolio/web1.jpg" class="img-fluid" alt="">
                <a href="../img/portfolio/web1.jpg" class="link-preview banca-lightbox" data-gallery="bancaGallery" title="Web 1"><i class="bi bi-plus"></i></a>
                <a href="portfolio-details.html" class="link-details" title="More Details"><i class="bi bi-link"></i></a>
              </figure>

              <div class="banca-info">
                <h4><a href="portfolio-details.html">Web 1</a></h4>
                <p>Web</p>
              </div>
            </div>
          </div>

        </div>

        

      </div>
    </section><!-- End Banca Section -->

    
    <section id="tablas">
      <div id="containerTablas" class="row container2">
        <div id="ComparacionTablas" class="banca-item filter-prest">
        </div>
        <div id="ComparacionMovimientos" class="banca-item filter-mov">
          <table style="text-align: center;" class="table">
            <thead>
              <tr>
                <th scope="col">Fecha</th>
                <th scope="col">Referencia</th>
                <th scope="col">Concepto</th>
                <th scope="col">Tipo</th>
                <th scope="col">Cantidad</th>
                <th scope="col">CC emisor</th>
                <th scope="col">CC receptor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">26-03-2021</th>
                <td>345232</td>
                <td>Pack Drones AF-59</td>
                <td>Cargo</td>
                <td>8212€</td>
                <td>ES60 0049 1500 0512 3456 7892</td>
                <td>ES71 0030 2053 0912 3456 7895</td>
              </tr>
              <tr>
                <th scope="row">26-03-2021</th>
                <td>143499</td>
                <td>Pack Drones AF-59</td>
                <td>Cargo</td>
                <td>399,99€</td>
                <td>ES60 0049 1500 0512 3456 7892</td>
                <td>ES71 0030 2053 0912 3456 7895</td>
              </tr>
              <tr>
                <th scope="row">26-03-2021</th>
                <td>388496</td>
                <td>Pack Drones AF-59</td>
                <td>Abono</td>
                <td>1250€</td>
                <td>ES60 0049 1500 0512 3456 7892</td>
                <td>ES71 0030 2053 0912 3456 7895</td>
              </tr>
              <tr>
                <th scope="row">26-03-2021</th>
                <td>109902</td>
                <td>Pack Drones AF-59</td>
                <td>Cargo</td>
                <td>732€</td>
                <td>ES60 0049 1500 0512 3456 7892</td>
                <td>ES71 0030 2053 0912 3456 7895</td>
              </tr>
              <tr>
                <th scope="row">26-03-2021</th>
                <td>330312</td>
                <td>Pack Drones AF-59</td>
                <td>Abono</td>
                <td>952,55€</td>
                <td>ES60 0049 1500 0512 3456 7892</td>
                <td>ES71 0030 2053 0912 3456 7895</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ======= Blog Section ======= -->
    
    <section id="modals">
    
      <!-- MODAL -->
      <div class="modal fade" id="login" tabindex="-1">
        <div id="modaldialog2" class="modal-dialog">
          <div id="modalcontent2"  class="modal-content">
            <!--modalHeader-->
            
            <!--modalBody-->
            <div id="modalbody2" class="modal-body">
              
              <div class="containerLog">
                <form class="signIn">
                    <h3>Welcome</br>Back !</h3>
                    <button class="fb" type="button">Log In With Facebook</button>
                    <p>- or -</p>
                    <input id="formEmail" type="text" placeholder="Insert Username" autocomplete='off' reqired />
                    <input autocomplete="one-time-code" id="formPassword" type="password" placeholder="Insert Password" reqired />
                    <button class="form-btn sx back" type="button">Registrarme</button>
                    <button class="form-btn dx" type="submit">Iniciar Sesion</button>
                </form>
                <form class="signUp">
                    <h3>Create Your Account</h3>
                    <p>Just enter your Username</br>
                        and your password for join.
                    </p>
                    <input id="formUser" class="w100 my-0" type="text" placeholder="Username" reqired autocomplete='off' />
                    <input autocomplete="one-time-code" id="formContra"  class="my-2" type="password" placeholder="Insert Password" reqired />
                    <input autocomplete="one-time-code" id="formPasswordVerify"  class="my-2" type="password" placeholder="Verify Password" reqired />
                    <div class="progress mx-4">
                      <div class="progress-bar bg-secondary progressPass" role="progressbar" style="width: 33.3%;">Password Weak</div>
                    </div>
                    <div class="list-group mx-4 mt-2">
                      <span class="validation v-pass v-pass-size list-group-item list-group-item-danger p-1">min 8 char</span>
                      <span class="validation v-pass v-pass-char list-group-item list-group-item-danger p-1">especial char</span>
                      <span class="validation v-pass v-pass-num list-group-item list-group-item-danger p-1">number</span>
                    </div>
                    <button class="form-btn sx log-in" type="button">Iniciar Sesion</button>
                    <button class="form-btn dx" type="submit">Registrarme</button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    
      <div class="modal fade" id="formPrestamo" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">GENERAR PRESTAMO</h5>
              <button type="button" class="btn-close botoncerrar" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="genPrestamo"> <!--FORMULARIO-->
            <div class="modal-body">
              
                <div class="form-outline mb-4"> 
                    <label class="form-label" for="formIBAN">Cuenta Bancaria</label>
                    <select id="formIBAN" class="form-control">
                        <option value="1">IBAN</option>
                        <option value="2">IBAN2</option>
                    </select>
                </div>
    
                <div class="form-outline mb-4"> <!--CANTIDAD-->
                    <label class="form-label" for="formCantidad">Cantidad</label>
                    <input type="number" id="formCantidad" class="form-control" />
                </div>
    
                <div class="form-outline mb-4"> <!--CUOTAS-->
                    <label class="form-label" for="formCuotas">Cuotas</label>
                    <input type="number" id="formCuotas" class="form-control" />
                </div>
    
                <div class="form-outline mb-4"> <!--INTERES-->
                    <label class="form-label" for="formInteres">Interes</label>
                    <input type="number" id="formInteres" class="form-control" />
                </div>
    
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary botoncerrar" data-bs-dismiss="modal">Close</button>
              <button id="submitPrestamo" type="submit" class="btn btn-primary" data-bs-dismiss="modal">Solicitar</button>
            </div>
            </form> <!--FORMULARIO CIERRE-->
          </div>
        </div>
      </div>
    
      <div class="modal fade" id="formLeasing" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">GENERAR LEASING</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="genLeasing"> <!--FORMULARIO-->
            <div class="modal-body">
              
                <div class="form-outline mb-4"> 
                    <label class="form-label" for="formIBAN">Cuenta Bancaria</label>
                    <select id="formIBAN" class="form-control">
                        <option value="1">IBAN</option>
                        <option value="2">IBAN2</option>
                    </select>
                </div>
    
                <div class="form-outline mb-4"> <!--CANTIDAD-->
                    <label class="form-label" for="formCantidad">Cantidad</label>
                    <input type="number" id="formCantidad" class="form-control" />
                </div>
    
                <div class="form-outline mb-4"> <!--TIEMPO-->
                    <label class="form-label" for="formTiempo">Tiempo</label>
                    <input type="number" id="formTiempo" class="form-control" />
                </div>
    
                <div class="form-outline mb-4"> <!--CUOTA-->
                  <label class="form-label" for="formCuotas">Cuota</label>
                  <input type="number" id="formCuotas" class="form-control" />
                </div>
    
                <div class="form-outline mb-4"> <!--INTERES-->
                    <label class="form-label" for="formInteres">Interes</label>
                    <input type="number" id="formInteres" class="form-control" />
                </div>
    
                <div class="form-outline mb-4"> <!--BEZ-->
                  <label class="form-label" for="formBez">Bez</label>
                  <input type="number" id="formBez" class="form-control" />
              </div>
    
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button id="submitPrestamo" type="submit" class="btn btn-primary">Solicitar</button>
            </div>
            </form> <!--FORMULARIO CIERRE-->
          </div>
        </div>
      </div>
      <!--MODAL-->
    </section><!-- End Blog Section -->

  </main><!-- End #main -->

  <!-- ============== Footer =============== -->
  <?php include('footer.php');?>
  <!-- ============== Footer =============== -->

  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
  <!-- Uncomment below i you want to use a preloader -->
  <!-- <div id="preloader"></div> -->

  <!-- Vendor JS Files -->
  <script src="../vendor/aos/aos.js"></script>
  <script src="../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="../vendor/glightbox/js/glightbox.min.js"></script>
  <script src="../vendor/isotope-layout/isotope.pkgd.min.js"></script>
  <script src="../vendor/php-email-form/validate.js"></script>
  <script src="../vendor/purecounter/purecounter.js"></script>
  <script src="../vendor/swiper/swiper-bundle.min.js"></script>
  <script src="../vendor/waypoints/noframework.waypoints.js"></script>

  <!--JAVASCRIPT links-->"
  <script src="../js/jquery-3.6.0.js"></script>
  <script src="../js/login.js"></script>
  <script src="../js/main.js"></script>
  <script src="../js/banca.js"></script>
  <!--JAVASCRIPT links-->

</body>

</html>