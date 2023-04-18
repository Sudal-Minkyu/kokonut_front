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
	let template = document.documentElement.innerHTML;
</script>

<div id = "template" style="background: white; border: 1px solid #ccc; border-radius: 5px; width: 600px; height: auto;">
	<div style="padding: 20px;">
		<a href="https://kokonut.me" class="logo">
			<svg xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 0 560 300" preserveAspectRatio="xMinYMin meet" width="auto">
				<rect x="0" y="0" width="560" height="50" stroke="none" fill="transparent"></rect>
				<title>logo_2_Asset 2</title>
				<g id="Layer_2" data-name="Layer 2">
					<g id="Layer_1-2" data-name="Layer 1">
						<path d="M25.7,0A25.7,25.7,0,0,0,0,25.7V249H51.39V204.45L70.68,188.3,105.39,249h59.8l-54.42-94.21,32.21-27a25.7,25.7,0,0,0-33-39.42l-58.61,49V25.7A25.7,25.7,0,0,0,25.7,0Z" style="fill: rgb(10, 10, 10);"></path>
						<path d="M166.89,153.27v13.11a82.59,82.59,0,0,0,165.17,0V153.27a82.59,82.59,0,1,0-165.17,0Zm113.78,0v13.11a31.2,31.2,0,0,1-62.39,0V153.27a31.2,31.2,0,0,1,62.39,0Z" style="fill: rgb(10, 10, 10);"></path>
						<path d="M408.75,204.44,428,188.3,462.75,249h59.8l-54.43-94.21,32.21-27a25.7,25.7,0,1,0-33-39.42l-58.59,49V25.7a25.7,25.7,0,1,0-51.4,0V249h51.4Z" style="fill: rgb(10, 10, 10);"></path>
						<path d="M606.84,249a82.66,82.66,0,0,0,82.57-82.58V153.27a82.58,82.58,0,1,0-165.16,0v13.11A82.67,82.67,0,0,0,606.84,249Zm-31.2-95.69a31.19,31.19,0,1,1,62.38,0v13.11a31.19,31.19,0,1,1-62.38,0Z" style="fill: rgb(10, 10, 10);"></path>
						<path d="M879.44,249V153.18a82.67,82.67,0,0,0-82.58-82.59A81.49,81.49,0,0,0,759.41,80,25.31,25.31,0,0,0,740,70.59a25.7,25.7,0,0,0-25.69,25.7V249h51.39V153.18a31.19,31.19,0,1,1,62.38,0V249Z" style="fill: rgb(10, 10, 10);"></path>
						<path d="M1068.37,249V96.29a25.7,25.7,0,1,0-51.39,0v70a31.2,31.2,0,1,1-62.39,0v-70a25.7,25.7,0,1,0-51.39,0v70A82.4,82.4,0,0,0,1017,242.66V249Z" style="fill: rgb(10, 10, 10);"></path>
						<path d="M1179,197.54a31.25,31.25,0,0,1-31.21-31.21V122h24.8A25.72,25.72,0,0,0,1198,93c-1.64-13-13.29-22.36-26.36-22.36H1122a25.71,25.71,0,0,0-25.71,25.71v70A82.72,82.72,0,0,0,1179,249h19.25V197.54Z" style="fill: rgb(10, 10, 10);"></path>
						<path d="M1096.32,51.42H1122a25.71,25.71,0,0,0,25.71-25.71h0A25.71,25.71,0,0,0,1122,0h0a25.71,25.71,0,0,0-25.71,25.71Z" style="fill: rgb(0, 195, 137);"></path>
					</g>
				</g>
			</svg>	
		</a>
		<h2 align="left">{title}</h2>
		<br>
	
		<div style="border: 2px solid #585858; padding: 30px 15px; border-radius: 4px;">
			<p style="margin: 0;">{content}</p>
		</div>
    </div>
    
	<footer class="footer_wrap" style="width: 100%; height: 130px; bottom: 0px; margin: 10px 0 0 0; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; background: #e2e2e2;">
		<div class="footer_inner" style="width: 100%; height: 130px; display: flex; align-items: center;">
			<div class="footer_con" style="position: absolute;">
				<div class="copyright" style="float: left; color: #686868; font-size: 0.8em; margin: 20px 0px 20px 35px; font-weight: 600;">
					<p style="margin-top: 5px; font-size: 12.8px; margin-bottom: 0; line-height: normal;">본 메일은 발신전용 입니다. 서비스 관련 문의사항이 있는 경우 <a href="https://kokonut.me">고객문의</a>를 이용해 주세요.</p>
					<p style="margin-top: 5px; font-size: 12.8px; margin-bottom: 0; line-height: normal;">Copyright ⓒ <span style="color: #06dd9c;">2021. Everyfeb.</span> All Rights Reserved. </p>
				</div>
			</div>
		</div>
	</footer>
</div>
