<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */
 
// Include local configuration
if (file_exists(dirname(__FILE__) . '/local-config.php')) {
	include(dirname(__FILE__) . '/local-config.php');
}

// Global DB config
if (!defined('DB_NAME')) {
	define('DB_NAME', 'wp_capsforkids');
}
if (!defined('DB_USER')) {
	define('DB_USER', 'root');
}
if (!defined('DB_PASSWORD')) {
	define('DB_PASSWORD', 'root');
}
if (!defined('DB_HOST')) {
	define('DB_HOST', 'localhost');
}

/** Database Charset to use in creating database tables. */
if (!defined('DB_CHARSET')) {
	define('DB_CHARSET', 'utf8');
}

/** The Database Collate type. Don't change this if in doubt. */
if (!defined('DB_COLLATE')) {
	define('DB_COLLATE', '');
}

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '59n@;yb~$$]wG!gLxh6K=L2^M16BO6=1-c7=>$$rgbu&V^}imwr[>oJ1D8q*;IKV');
define('SECURE_AUTH_KEY',  '/kRpMB9q:(4+9yMF}Bhhz#qUszxdn-r5&LI?&rev.n4aJp-<?3=|eC<pAPm{@t6u');
define('LOGGED_IN_KEY',    'gHdeCX%>Fb-r8)V$CXCM bx!K9l&+45|qVD_tewj!uUY*yRB+GH}ElopBB(2^7G?');
define('NONCE_KEY',        'KMTGJ)8jCAEADA^M>3%P@2J-fm8XCFjm-)Q15G:.,(D+8xn~Ywbqo% >eFeq[-}e');
define('AUTH_SALT',        'BMi KWt(KxY|t=ht5R=]<Z`rD&xK,ecD#{qVYA8d5BJIl*5,%sBZby.N+$P}[M9u');
define('SECURE_AUTH_SALT', '<H-1`m9*b^qavZzB.:H702p8,_|LI~g:HuB|}debgHg.@]Z-&(oDK4Q?tf@Z0)5.');
define('LOGGED_IN_SALT',   '.>{)=dIB>C0`|[A2<%&8TX#A0JE!}&FFAd!jnh*+.}?i3;Jr~zoFJ6_z4=h!BZj[');
define('NONCE_SALT',       '<+nlC#SKIi-I}`){v%$l=#bnG4~UHLNxS_TDQ0]>d-`b9VRQ}d2PouffUa0]#uD5');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');


/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
if (!defined('WP_DEBUG')) {
	define('WP_DEBUG', false);
}

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
