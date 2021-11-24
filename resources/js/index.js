async function indexSection() {
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