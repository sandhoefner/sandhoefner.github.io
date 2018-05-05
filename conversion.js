// put divs with IDs in all github pages and source in this javascript
// that way you can change design/conversion all from here
// should probably make CSS more consistent too
// save more time in long run by using a package. at least bootstrap
/*	<div id="conversion_header"></div>
	<script src="conversion.js"></script>           */

// wise man knows that this renders differently online than local
/* currently used in:
	chess.html
	slaughter.html
	beer.html
	animal_suffering_calculator.html
	climb.html
	omnivore.html

	may not be exhaustive!


*/

window.onload = function() {

	// See more on my <a href="https://sandhoefner.wordpress.com/">personal website</a> or my <a href="https://twitter.com/MonkeyMorality">Twitter</a>, or subscribe to my mailing list for rare &amp; exciting news!
	var mailchimp_html = '<!-- Begin MailChimp Signup Form -->      <link href="//cdn-images.mailchimp.com/embedcode/slim-10_7.css" rel="stylesheet" type="text/css">      <div id="mc_embed_signup">      <form action="//wordpress.us16.list-manage.com/subscribe/post?u=e9f410538adc18e14a11ea098&amp;id=b9c7d6e98b" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>      	<div id="mc_embed_signup_scroll">      	<label for="mce-EMAIL">See more on my <a href="https://sandhoefner.wordpress.com/">personal website</a> or my <a href="https://twitter.com/EvanSandhoefner">Twitter</a>, or subscribe to my mailing list for rare &amp; exciting news!</label>      	<input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="Email address" required>      	<!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->      	<div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_e9f410538adc18e14a11ea098_b9c7d6e98b" tabindex="-1" value=""></div>      	<div class="show"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>      	</div>      </form>      </div>            <!--End mc_embed_signup-->';

	var div = document.getElementById("conversion_header");

	div.innerHTML += mailchimp_html;

};