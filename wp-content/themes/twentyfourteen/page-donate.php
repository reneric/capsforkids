<?php
/**
 * Template Name: Donate Page */

get_header(); ?>
<?php while ( have_posts() ) : the_post(); ?>
 <tr>
    <td><table align="left" border="0" cellpadding="0" cellspacing="0" width="918">
        <tr>
          <td width="4" height="498" rowspan="2" bgcolor="#F9EFE0"></td>
          <td valign="top" bgcolor="#D30E45" width="196" height="390">  <table cellpadding="0" width="100%" cellspacing="0" class="moduletable">
      <tr>
      <th valign="top">
        <span class="th"><?php echo get_the_title($post->post_parent); ?></span>      </th>
    </tr>
        <tr>
        <td height="8" bgcolor="#7cba41"></td>
        </tr>
      <tr>
      <td align="left">
        <!-- <ul class="menu_left"><li class="active item15"><a href="/about-us.html"><span>Our Mission</span></a></li><li class="item16"><a href="/our-story.html"><span>Our Story</span></a></li><li class="item17"><a href="/our-founder.html"><span>Our Founder</span></a></li><li class="item18"><a href="/our-board.html"><span>Our Board</span></a></li></ul>     </td> -->
        <?php echo subnav(); ?>
    </tr>
    </table>
  </td>
          <td width="4" height="498" rowspan="2" bgcolor="#F9EFE0"></td>
          <td rowspan="2" width="515" height="498" valign="top"><table width="100%" class="contentpaneopen">
<tr>
    <td class="contentheading" width="100%">
                  <span class="contentheading"><?php echo get_the_title($post->post_parent); ?>: </span><span class="boldred"><?php echo get_the_title(); ?></span>
                     
  </td>
        
    
          </tr>
</table>
<hr style="border:none; color:#7cba41; background-color:#7cba41; height:5px;" width="95%" />

<table width="100%" class="contentpaneopen2">
<tr>
  <td>
            <span>
                      </span>
      </td>
</tr>



<tr>
<td valign="top">
<div class="entry-content">

<p style="font-weight:bold;">Use this form to make an online donation. If this is for something specific, please note that in the comment box</p>
<br/>

<p style="font-weight:bold;">If you wish to mail your donations, here is our mailing address:</p>
<p style="font-weight:bold;">Caps for Kids</p>
<p style="font-weight:bold;">National Office:</p>
<p style="font-weight:bold;">200 Henry Clay Avenue</p>
<p style="font-weight:bold;">New Orleans, LA 70118</p>
	<?php the_content(); ?>
</div><!-- entry-content -->
</td>
</tr>

</table>
<span class="article_separator">&nbsp;</span>
</td>
          <td width="3" height="498" rowspan="2" bgcolor="#F9EFE0"></td>
          <td valign="top" bgcolor="#D30E45"><table align="left" border="0" cellpadding="0" cellspacing="0" width="191">
              <tr>
                <td width="191" height="182"><a href="/register-school.html"><img alt="capday" src="<?php echo get_template_directory_uri(); ?>/images/capday.png" height="182" width="191" /></a></td>
              </tr>
              <tr>
                <td width="191" height="94"><a href="/our-chapters.html"><img alt="index_r9_c6" src="<?php echo get_template_directory_uri(); ?>/images/index_r9_c6.png" height="94" width="191" /></a></td>
              </tr>
              <tr>
                <td width="191" height="96"><a href="/register-school.html"><img alt="capday_banner2" src="<?php echo get_template_directory_uri(); ?>/images/capday_banner2.png" height="96" width="191" /></a></td>
              </tr>
              <tr>
                <td width="191" height="60"><p style="text-align: center;"><img alt="NElogo" src="<?php echo get_template_directory_uri(); ?>/images/NElogo.jpg" height="56" width="91" /><br /><a href="http://rodehardriders.com/Kajun_Iron_Horse_Run.html"></a></p>
<p>&nbsp;   <br />&nbsp;             
<map name="Map">
<area shape="rect" coords="2,1,95,60" href="http://www.neweracap.com/" target="_blank" />
<area shape="rect" coords="94,3,190,59" href="http://www.lids.com/" target="_blank" /> 
</map>
</p></td>
              </tr>
            </table></td>
          <td width="5" height="498" rowspan="2" bgcolor="#F9EFE0"></td>
        </tr>
        <tr valign="bottom">
          <td bgcolor="#D30E45" width="196" height="108" style="padding-bottom:10px;"><div align="center"><img alt="hat" src="<?php echo get_template_directory_uri(); ?>/images/hat.png" height="56" width="102" /></div>
<br /> 
<table style="padding-left: 5px;" align="center" border="0" width="180">
<tbody>
<tr>
<td><a target="_blank" href="http://www.facebook.com/capsforkids1?ref=ts&amp;v=wall"><img alt="facebook2" src="<?php echo get_template_directory_uri(); ?>/images/facebook.png" height="36" width="36" /></a></td>
<td><a target="_blank" href="http://twitter.com/capsforkids"><img alt="twitter2" src="<?php echo get_template_directory_uri(); ?>/images/twitter.png" height="36" width="36" /></a></td>
<td><img alt="linkedin2" src="<?php echo get_template_directory_uri(); ?>/images/linkedin.png" height="36" width="36" /></td>
<td><img alt="youtube2" src="<?php echo get_template_directory_uri(); ?>/images/youtube.png" height="36" width="36" /></td>
</tr>
</tbody>
</table>
<div align="center"><script src="//platform.linkedin.com/in.js" type="text/javascript"></script>
<script type="IN/FollowCompany" data-id="2571693" data-counter="none"></script></td>
          <td bgcolor="#D30E45" width="191" height="66" align="center"><a class="addthis_button" href="http://www.addthis.com/bookmark.php?v=250&amp;username=xa-4c1a49887785e01d"><img src="http://s7.addthis.com/static/btn/v2/lg-share-en.gif" alt="Bookmark and Share" style="padding-bottom: 10px;" border="0" height="16" width="125" /></a>
<script src="http://s7.addthis.com/js/250/addthis_widget.js#username=xa-4c1a49887785e01d" type="text/javascript"></script></td>
        </tr>
      </table></td>
  </tr>
<?php
endwhile;
//get_sidebar();
get_footer();
