<?php
/**
 * The Header for our theme
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */


if (have_posts()) {
  while (have_posts()) {
    the_post();
    $pagekids = get_pages("child_of=".$post->ID."&sort_column=menu_order");
    if($pagekids){
    $firstchild = $pagekids[0];
    wp_redirect(get_permalink($firstchild->ID));
    }
  }
}; 
?>
<!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 7) | !(IE 8) ]><!-->
<html <?php language_attributes(); ?>>
<!--<![endif]-->
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width">
	<title><?php wp_title( '|', true, 'right' ); ?></title>
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<!--[if lt IE 9]>
	<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js"></script>
	<![endif]-->
	<?php wp_head(); ?>
	  <!-- <link rel="stylesheet" href="/plugins/system/jceutilities/css/jceutilities-220.css" type="text/css" /> -->
  <link rel="stylesheet" href="/plugins/system/jceutilities/themes/standard/css/style.css" type="text/css" />
  <link rel="stylesheet" href="/modules/mod_cn_photos/css/cn_photos.css" type="text/css" />
  <style type="text/css">
    <!--
.cn_photos1, .slideshow1, .slideshow1 img { height: 366px !important; width:710px !important; } .slideshow1 img { display: none; } 
    -->
  </style>
  <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/main.js"></script>
  <!-- <script type="text/javascript" src="/plugins/system/jceutilities/js/jceutilities-220.js"></script>
  <script type="text/javascript" src="http://capsforkids.org/plugins/system/mediaobject/js/mediaobject-150.js"></script>
  <script type="text/javascript" src="/media/system/js/caption.js"></script> -->
  <script type="text/javascript">
	window.addEvent('domready', function(){var jcepopup=new JCEUtilities({'popup':{'legacy':0,'resize':1,'icons':1,'overlay':1,'overlayopacity':0.8,'overlaycolor':"#000000",'fadespeed':500,'scalespeed':500,'hideobjects':1,'scrollpopup':1,'theme':"standard",'themecustom':"",'themepath':"plugins/system/jceutilities/themes"},'tootlip':{'classname':"tooltip",'opacity':1,'speed':150,'position':"br",'offsets':"{'x': 16, 'y': 16}"},'imgpath':"plugins/system/jceutilities/img",'pngfix':0,'wmode':0});});
	MediaObject.init({'flash':"9,0,124,0",'windowmedia':"5,1,52,701",'quicktime':"6,0,2,0",'realmedia':"7,0,0,0",'shockwave':"8,5,1,0"});
  </script>
</head>
<body <?php body_class(); ?> style="background-image:url(<?php echo get_template_directory_uri(); ?>/images/bg.jpg); background-repeat:repeat-x; background-color:#808FC8;">
<table border="0" cellpadding="0" cellspacing="0" width="918" align="center" style="background-color:#FFFFFF;">
  <tr>
    <td bgcolor="#F9EFE0" width="918" height="5"></td>
  </tr>
  <tr>
    <td><table align="left" border="0" cellpadding="0" cellspacing="0" width="918">
        <tr>
          <td bgcolor="#F9EFE0" width="5" height="109"></td>
          <td><a href="/"><img border="0" name="index_r2_c3" src="<?php echo get_template_directory_uri(); ?>/images/index_r2_c3.png" width="569" height="109" id="index_r2_c3" alt="" /></a></td>
          <td><table align="left" border="0" cellpadding="0" cellspacing="0" width="339">
              <tr>
                <td bgcolor="#0076BF" width="339" height="61" align="right" style="padding-right:20px;"><span class="top"><a class="top" href="/register-school.html">Cap Day</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a class="top" href="/our-chapters.html">Find a Chapter</a><a class="top" href="/component/acajoom/Itemid-37.html"></a><br /> <a class="top" href="/press/12-in-the-news.html">Press</a>&nbsp; |&nbsp;&nbsp;<a class="topgreen" href="/online-donation">Donate Now</a></span></td>
              </tr>
              <tr>
                <td bgcolor="#0076BF" width="339" height="48" align="right" style="padding-right:20px;">
                <?php get_search_form(); ?></td>
              </tr>
            </table></td>
          <td bgcolor="#F9EFE0" width="5" height="109"></td>
        </tr>
      </table></td>
  </tr>
  <tr>
    <td bgcolor="#F9EFE0" width="918" height="3"></td>
  </tr>
  <tr>
    <td bgcolor="#003A6D" width="918" height="26" align="right" style="padding-right:20px;"><a href="<?php bloginfo('url') ?>/about-caps" class="mainlevel_top" >About Caps</a><span class="mainlevel_top" >|</span><a href="<?php bloginfo('url') ?>/press" class="mainlevel_top" >Press</a><span class="mainlevel_top" >|</span><a href="<?php bloginfo('url') ?>/chapters" class="mainlevel_top" >Chapters</a><span class="mainlevel_top" >|</span><a href="<?php bloginfo('url') ?>/faq" class="mainlevel_top" >FAQ</a><span class="mainlevel_top" >|</span><a href="<?php bloginfo('url') ?>/hat-chat" class="mainlevel_top" >Hat Chat</a><span class="mainlevel_top" >|</span><a href="<?php bloginfo('url') ?>/how-to-help" class="mainlevel_top" >How to Help</a><span class="mainlevel_top" >|</span><a href="<?php bloginfo('url') ?>/contact" class="mainlevel_top" >Contact</a></td>
  </tr>
  <tr>
    <td bgcolor="#7CBA41" height="4" border="0"></td>
  </tr>