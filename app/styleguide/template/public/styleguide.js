$(function(){
	hljs.initHighlightingOnLoad();

	var ref = $('.styleguide-menu').find('.styleguide-menu-list').data('kss-ref');
	$('.styleguide-menu').find('a').eq(ref).addClass('selected');
	$('.styleguide-menu_wrapper').on({
		'mouseenter': function(){
			$('.styleguide-menu').stop(true).animate({
				left: '-4px'
				}, 200
			);
		},
		'mouseleave': function(){
			$('.styleguide-menu').animate({
				left: '-208px'
				}, 200
			);
		}
	});
});