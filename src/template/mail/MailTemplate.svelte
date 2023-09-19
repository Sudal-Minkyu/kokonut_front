<script>
	//const urlParams = window.location.href;
	import { querystring } from "svelte-spa-router";
	
	function getParams(queryString){
		let splitedParams = decodeURI(queryString).split(/[=?&]/);
		let params = {};
		for(let i=0; i<splitedParams.length; i++){
			params[splitedParams[i]] = splitedParams[++i];
		}
		return params
  	}
    
	const title = getParams($querystring).title;
	const content = getParams($querystring).content;
</script>

<div style="display:inline-block;overflow:hidden;width:600px;height:auto;position:relative;">
	<div style="width:100%;position:relative;margin-top:80px;background: #00CA94; height: 60px; padding: 0;"></div>
	<div style="display: block; margin-top: 40px;">
		<strong style="display:block;text-align:left;margin-bottom:24px;color: #222;font-family: Pretendard, sans-serif;font-size: 30px;font-style: normal;font-weight: 700;line-height: 40px;">{title}</strong>
		<dl style="display:block;text-align:left;color: #666;font-family: Pretendard, sans-serif;font-size: 18px;font-style: normal;font-weight: 500;line-height: 28px;">
			{content}
		</dl>
	</div>
	<div style="width:100%;position:relative;margin-top:80px;padding:20px 24px;background: #F7F8F9;">
		<div style="word-break: break-word;color: #666;font-family: Pretendard, sans-serif;font-size: 14px;font-style: normal;font-weight: 400;line-height: 24px;">
			본 메일은 발신전용 입니다.
		</div>
	</div>
</div>