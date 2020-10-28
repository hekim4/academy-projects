$(document).ready(function(){

	(function($) {

		$('#header__icon').click(function(e){
			e.preventDefault();
			$('body').toggleClass('with--sidebar');
		});
    
    $('#site-cache').click(function(e){
      $('body').removeClass('with--sidebar');
    });

	})(jQuery);

});

const toggleBtn = document.querySelector('.navbar_toogle');
const menu2 = document.querySelector('.navbar_menu');

toggleBtn.addEventListener('click', ()=> {
    menu2.classList.toggle('active');
});
