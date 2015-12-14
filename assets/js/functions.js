$( document ).ready( function() {
    workSlide();
    workLoad();
    educationStuff();
    $("header h1").fitText(1, { minFontSize: '20px', maxFontSize: '72px' });
} );

$( 'a[href^="#"]' ).on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop: $(this.hash).offset().top}, 500);
} );

function workSlide() {
    $( '.thumb-unit' ).on('click', function(e) {
        $( '.work-wrapper').css('left', '-100%');
        $( '.work-container').show();
    } );
    
    $( '.go-back' ).on('click', function(e) {
        $( '.work-wrapper').css('left', '0%');
        $( '.work-container').hide(800);
    } );
}

function workLoad() {
    $.ajaxSetup ({ cache: false });
    
    $( '.thumb-unit').on('click', function(e) {
        var $target = $(this);
        
        
        var spinner  = '<div class="loader">Loading...</div>',
            newFile  = $target.data('file'),
            newHtml  = '/work/'+ newFile +'.html',
            newTitle =  $target.find('strong').text();
            
        $( '.project-load' ).html(spinner).load(newHtml);
        $( '.project-title' ).text(newTitle);
    } );
}

function educationStuff() {
    $( '.education-unit' ).first().addClass('active-university');
    $( '.logo-unit' ).first().addClass('active-university');
    $( '.education-mobile-nav span' ).first().addClass('active-university');
    
    $( '.logo-unit, .education-mobile-nav span' ).on('click', function(e) {

        var $target   = $(this),
            $siblings = $target.parent().children(),
            position = $siblings.index($target);
        
        $( '.education-unit' ).removeClass('active-university').eq(position).addClass('active-university');
        $siblings.removeClass('active-university').eq(position).addClass('active-university');
        
    } );
    
    $( '.nav-icon-next, .nav-icon-back' ).on('click', function(e) {

        var $target          = $(this),
            activeUniversity = $( '.education-wrap' ).find('.active-university'),
            position         = $( '.education-wrap' ).children().index(activeUniversity),
            count            = $( '.education-unit' ).length;
        
        if ( $target.hasClass('nav-icon-next')) {
            if ( position < count -1) {
                $( '.active-university' ).removeClass('active-university').next().addClass('active-university');
            } else {
                $( '.education-unit' ).removeClass('active-university').first().addClass('active-university');
                $( '.logo-unit' ).removeClass('active-university').first().addClass('active-university');
            }
        } else {
            if ( position === 0 ) {
                $( '.education-unit' ).removeClass('active-university').last().addClass('active-university');
                $( '.logo-unit' ).removeClass('active-university').last().addClass('active-university');
            } else {
                $( '.active-university' ).removeClass('active-university').prev().addClass('active-university');
            }
        }
    } );
}

$( '#toggle-form').on('click', function(e) {
    e.preventDefault();
    $('form').slideToggle(500, function(){
        
    });
} );


(function( $ ){

  $.fn.fitText = function( kompressor, options ) {
    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );
