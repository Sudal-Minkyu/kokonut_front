

// 관리적 보호조치
<script>
	sa = $('#a').position().top;
	sb = $("#b").position().top;
	sc = $('#c').position().top;
	sd = $('#e').position().top;

	$(window).scroll(function() {
		var scroll = $(window).scrollTop();

		if (scroll < sa) 
		{
			$("#sure .sstic").removeClass("active01");
		} 
		if (sa <= scroll && scroll< sb) 
		{
			$("#sure .sstic").removeClass("active01");
			$("#sure .sstic").removeClass("active02");
		} 
		else if (sb <= scroll && scroll < sc) 
		{
			$("#sure .sstic").addClass("active01");
			$("#sure .sstic").removeClass("active02");
		}
		else if (sc <= scroll && scroll < sd )
		{
		  $("#sure .sstic").addClass("active02");
		  $("#sure .sstic").removeClass("active01");
		  $("#sure .sstic").removeClass("active03");
		}
		else if (sd <= scroll)
		{
		  $("#sure .sstic").addClass("active03");
		}
	});	
</script>