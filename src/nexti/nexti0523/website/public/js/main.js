// +++++++ MainV Scroll START ~ +++++++
	$(window).scroll(function() {
		var scroll = $(window).scrollTop();
		if (scroll >= 100) {
			$(".main_Num").removeClass("here");
			$(".main_Num.two").addClass("here");
			$(".text1").addClass("hidn");
			
			$(".text2").addClass("show");
			
			$(".blackBox01").addClass("down");
			$(".blackBox02").removeClass("down");
			
		} else {
			$(".text1").removeClass("hidn");
			$(".text2").removeClass("show");
			
			$(".main_Num").removeClass("here");
			$(".main_Num.one").addClass("here");
			
			$(".blackBox01").removeClass("down");
			$(".blackBox02").addClass("down");
		}
	});
// +++++++ ~ MainV Scroll END +++++++

// +++++++ 코코넛은 가능합니다 START ~  +++++++
	$(window).scroll(function() {
		var $window = $(window),
		  $koko_s = $('.koko_change'),
		  $add_panel = $('.add');
	 
		var scroll = $window.scrollTop() + ($window.height() / 1);
	 
		$add_panel.each(function () {
			var $this = $(this);
			if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {
				$koko_s.removeClass(function (index, css) {
					return (css.match (/(^|\s)secen-\S+/g) || []).join(' ');
				});
				$koko_s.addClass('secen-' + $(this).data('add'));
			}
		});    
	}).scroll();
// +++++++ ~ 코코넛은 가능합니다 END +++++++

// +++++++ 관리적 보호 조치 START ~ +++++++
	$(window).scroll(function() {
		var $window = $(window),
		
		$tech = $('#managerial'),
		$techCont = $('#managerial .section');
		  
		var windowTop = $(window).scrollTop();
		var scroll = $window.scrollTop() + ($window.height() / 2);
		var area = $(window).scrollTop();
	
		$techCont.each(function () {
			var $this = $(this);
			if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {
				$tech.addClass("titleUp");
				$tech.addClass('showArea-' + $(this).data('show'));
				<!-- $tech.removeClass(function (index, css) { -->
					<!-- return (html) -->
				<!-- }); -->
			}
		});    
	}).scroll();
	
	// 제공 관리
	$(window).scroll(function() {
		var $window = $(window),
		  $koko_s = $('.ko_test .koko_change'),
		  $add_panel = $('.ko_test .add');
	 
		var scroll = $window.scrollTop() + ($window.height() / 0.8);
	 
		$add_panel.each(function () {
			var $this = $(this);
			if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {
				$koko_s.removeClass(function (index, css) {
					return (css.match (/(^|\s)secen-\S+/g) || []).join(' ');
				});
				$koko_s.addClass('secen-' + $(this).data('add'));
				$koko_s.addClass('stop');
			}
		});    
	}).scroll();
// +++++++ ~ 관리적 보호 조치 END +++++++

// +++++++ 기술적 보호 조치 START +++++++
	$(window).scroll(function() {
		var $window = $(window),
		$tech = $('#technical'),
		$techCont = $('#technical .section');
		
		var windowTop = $(window).scrollTop();
		var scroll = $window.scrollTop() + ($window.height() / 2);
		var area = $(window).scrollTop();
			
		$techCont.each(function () {
			var $this = $(this);
			if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {
				$tech.addClass("titleUp");
				$tech.addClass('showArea-' + $(this).data('show'));
				// $("p.ac").shuffleLetters();
			}
		});    
	}).scroll();
// ~ +++++++ 기술적 보호 조치  END +++++++

// +++++++ 편의성 START ~  +++++++
	$(window).scroll(function() {
		var $window = $(window),
		$tech = $('#funjs'),
		$techCont = $('#funjs .section');
		
		var windowTop = $(window).scrollTop();
		var scroll = $window.scrollTop() + ($window.height() / 2);
		var area = $(window).scrollTop();
			
		$techCont.each(function () {
			var $this = $(this);
			if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {
				$tech.addClass("titleUp");
				$tech.addClass('showArea-' + $(this).data('show'));
			}
		});    
	}).scroll();
// +++++++ ~ 편의성 END +++++++
