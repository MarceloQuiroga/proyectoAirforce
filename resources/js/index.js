function indexSection() {
  $('nav a.scrollto').on('click', scrolltoAdjustment);
  $('nav a.scrollto').on('click', greenActive); 
  
}

function scrolltoAdjustment() {
  var target = this.href.split('/').pop();
  var section = $(target);
  section.css('padding-top','120px');
}

function greenActive() {
  Array.from($('nav a.scrollto')).forEach(element => {
    if (element.classList.contains('active')) {
      element.classList.remove('active');
    }
  });
  this.classList.add('active');

}


//TODO *Es una chorrada por que voy a quitar algun archivo de la platilla por que no se usa y no sirven para nada*
$('#contact-message').submit(()=>{
  $('.error-message').html('Your message has been sent, we will reply as soon as possible.');
  $('.error-message').css('text-align', 'center');
  $('.error-message').addClass('d-block');
  $('.error-message').css('background-color', '#18d36e');
  return false;
})