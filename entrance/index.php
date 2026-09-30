<!DOCTYPE html>

<html lang="zh-Hant-TW">

<head>
    <?php
        $debug = false;
        function dbconfig($test_env = false)
        {
            // 伺服器端分享頁如需資料庫，必須由部署環境注入，禁止寫入原始碼。
            return [
                'in_test' => $test_env,
                'con' => getenv('WP_DB_DSN') ?: '',
                'user' => getenv('WP_DB_USER') ?: '',
                'password' => getenv('WP_DB_PASSWORD') ?: ''
            ];
        }
    ?>
    <meta charset="UTF-8" />
    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    <meta name="google-site-verification" content="qqFpdfgRJk_raXnoo_gz8zdvsM_TStTnqneqbYqo8PQ" />
    <link rel="alternate" type="application/rss+xml" title="訂閱《亞太日報社台灣》&raquo; 資訊提供" href="<%= htmlWebpackPlugin.options.rss_link %>" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.9/css/all.css" integrity="sha384-5SOiIsAziJl6AWe0HWRKTXlfcSHKmYV4RBF18PPJ173Kzn7jzMyFuTtk8JA7QQG1" crossorigin="anonymous"></link>
    <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.css">
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css">
    <script data-ad-client="ca-pub-4686413641696148" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-KGY5E0QJ1W"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-KGY5E0QJ1W');
    </script>
    <title>
        <%= htmlWebpackPlugin.options.title %>
    </title>
    <?php
    // if (in_array($_SERVER['HTTP_USER_AGENT'], array(
    // 'facebookexternalhit/1.1 (+https://www.facebook.com/externalhit_uatext.php)',
    // 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    // 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)'
    // ))) {
    preg_match('~article/(\d+)~', $_SERVER['REQUEST_URI'], $m);
    if(isset($m[1]) && is_numeric($m[1])) 
    {
        $ogMetaUrl = "https://www.apdaily.com.tw/";
        $title = '';
        $description = '';
        $url = '';
        $image_url = '';
        preg_match('~article/(\d+)~', $_SERVER['REQUEST_URI'], $m);
        if(isset($m[1]) && is_numeric($m[1])) 
        {
            $id = $m[1];
            $con = json_decode(json_encode(dbconfig($debug)))->con;
            $user = json_decode(json_encode(dbconfig($debug)))->user;
            $password = json_decode(json_encode(dbconfig($debug)))->password;
            $db = null;
            try {
                $db = new PDO($con, $user, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "set names utf8"));
                $db->query("SET NAMES utf8");
                $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, true);
                $db->setAttribute(PDO::ATTR_STRINGIFY_FETCHES, false);
                $db->setAttribute(PDO::ATTR_ORACLE_NULLS, PDO::NULL_TO_STRING);

                $sSQL = 'SELECT post.post_title, post.post_content, post_meta.meta_value
                        FROM `wp_posts` post, `wp_postmeta` post_meta 
                        where post_meta.post_id = post.ID AND ID = :id AND meta_key = "image_url"';
                $re = $db->prepare($sSQL);
                $hunt_w['id'] =  $id;
                $re->execute($hunt_w);
                $rw = $re->fetch(PDO::FETCH_OBJ);
                if($rw) {
                    $title = isset($rw->post_title)? $rw->post_title : '';
                    $image_url = isset($rw->meta_value)? $rw->meta_value : '';
                    $description = isset($rw->post_content)? preg_replace('/\s(?=)/', '', strip_tags($rw->post_content)) : '';
                    // print_r($image_url);
                }
            } catch (PDOException $e) {
                // echo $e->getMessage();
            }
    ?>
    <meta charset="UTF-8" />

    <meta name="title" content="<?php echo $title?>" />
    <meta name="description" content="<?php echo $description?>" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="<?php echo $ogMetaUrl . "post.php?id=".$id;?>" />
    <meta property="og:title" content="<?php echo $title?>" />
    <meta property="og:description" content="<?php echo $description?>" />
    <meta property="og:image" content="<?php print_r($image_url);?>" />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="<?php echo $title?>" />
    <meta name="twitter:image" content="<?php print_r($image_url);?>" />
    <?php
        }
    }
    else {
    ?>
    <meta property="og:url" content="<%= htmlWebpackPlugin.options.web_url %>" />
    <meta property="og:title" content="<%= htmlWebpackPlugin.options.title %>" />
    <meta property="og:description" content="<%= htmlWebpackPlugin.options.desc %>" />
    <meta property="og:image" content="<%= htmlWebpackPlugin.options.fbpic %>" />
    <?php
    }
    ?>
    <!-- for FB -->
    <meta property="fb:app_id" content="<%= htmlWebpackPlugin.options.fb_appid %>" />
    <meta property="og:locale" content="zh_TW" />
    <meta property="og:site_name" content="<%= htmlWebpackPlugin.options.title %>" />
    <meta property="og:type" content="website" />

    <!-- for Google -->
    <meta name="author" content="<%= htmlWebpackPlugin.options.title %>" />
    <meta name="copyright" content="<%= htmlWebpackPlugin.options.title %>" />
    <meta name="description" content="<%= htmlWebpackPlugin.options.desc %>" />
    <style>
        .wp-block-embed {
            margin: 1rem 0;
            width: 100%;
            height: auto;
        }
        
        .wp-block-image {
            margin: 1rem 0;
            width: 100%;
            height: auto;
        }
        
        .wp-block-embed-youtube {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            overflow: hidden;
        }
        
        .wp-block-embed-youtube iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        
        .wp-block-embed-instagram .instagram-media {
            max-width: unset !important;
            min-width: unset !important;
        }
        
        .wp-block-video {
            margin: 1rem 0;
            width: 100%;
            height: auto;
        }
        
        @media (min-width: 769px) {
            .carousel-control-next-icon,
            .carousel-control-prev-icon {
                width: 30px;
                height: 30px;
            }
            .carousel-control-next {
                background-image: linear-gradient(90deg, #00000000 0%, #00000080 100%);
            }
            .carousel-control-prev {
                background-image: linear-gradient(-90deg, #00000000 0%, #00000080 100%);
            }
        }
    </style>
</head>

<body>
    <div id="container"></div>
    <script async src="http://www.instagram.com/embed.js" type="text/javascript"></script>
</body>

</html>
