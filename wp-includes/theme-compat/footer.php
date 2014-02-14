<?php
/**
 * @package WordPress
 * @subpackage Theme_Compat
 * @deprecated 3.0
 *
 * This file is here for Backwards compatibility with old themes and will be removed in a future version
 *
 */
_deprecated_file( sprintf( __( 'Theme without %1$s' ), basename(__FILE__) ), '3.0', null, sprintf( __('Please include a %1$s template in your theme.'), basename(__FILE__) ) );
?>
<p align="center"><a href="/about-us.html" class="mainlevel_footer" >About Caps</a><span class="mainlevel_footer" >|</span><a href="/press.html" class="mainlevel_footer" >News</a><span class="mainlevel_footer" >|</span><a href="/chapters.html" class="mainlevel_footer" >Chapters</a><span class="mainlevel_footer" >|</span><a href="/faq.html" class="mainlevel_footer" >FAQ</a><span class="mainlevel_footer" >|</span><a href="/stories.html" class="mainlevel_footer" >Hat Chat</a><span class="mainlevel_footer" >|</span><a href="/how-to-help.html" class="mainlevel_footer" >Supporters</a><span class="mainlevel_footer" >|</span><a href="/contact-us.html" class="mainlevel_footer" >Contact</a><br /> <span class="footer" style="text-transform: none;">Copyright © 2013 CAPS FOR KIDS All Rights Reserved | <a class="footer" style="text-transform: none;" href="mailto:info@capsforkids.org">info@capsforkids.org</a> | 504-891-4277</span>
<p align="center"><img src="<?php echo get_template_directory_uri(); ?>/images//images/RUSSO.CBM.TAG.png" usemap="#Map" border="0" width="416" height="61" /></p>
<map name="Map" id="Map">
<area shape="rect" coords="0,4,201,60" target="_blank" href="http://www.therussogroup.com" />
<area shape="rect" coords="207,3,412,59" target="_blank" href="http://www.cbmtech.com" /> 
</map></p>
<?php wp_footer(); ?>
</body>
</html>
