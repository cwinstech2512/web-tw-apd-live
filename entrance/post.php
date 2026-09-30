<!DOCTYPE html>
<?php
if (in_array($_SERVER['HTTP_USER_AGENT'], array(
'facebookexternalhit/1.1 (+https://www.facebook.com/externalhit_uatext.php)',
'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)'
))) {
    header("HTTP/1.1 200 OK");
}
else {
// You're not Facebook agent '__' 
    header('Location: /article/' . $_GET['id']);
}
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

$ogMetaUrl = "https://www.cag.news/";
$title = '';
$description = '';
$url = '';
$image_url = '';
if(isset($_GET['id']) && is_numeric($_GET['id'])) {
    $id = $_GET['id'];
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

        $sSQL = 'SELECT post.post_title, post_meta.meta_value 
                FROM `wp_posts` post, `wp_postmeta` post_meta 
                where post_meta.post_id = post.ID AND ID = :id AND meta_key = "image_url"';
        $re = $db->prepare($sSQL);
        $hunt_w['id'] =  $id;
        $re->execute($hunt_w);
        $rw = $re->fetch(PDO::FETCH_OBJ);
        if($rw) {
            $title = isset($rw->post_title)? $rw->post_title : '';
            $image_url = isset($rw->meta_value)? $rw->meta_value : '';
            // print_r($image_url);
        }
    } catch (PDOException $e) {
        // echo $e->getMessage();
    }
}

?>
<html>

<head>
    <meta charset="UTF-8" />

    <title><?php echo $title?></title>
    <meta name="title" content="<?php echo $title?>" />
    <meta name="description" content="<?php echo $title?>" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="<?php echo $ogMetaUrl . "post.php?id=".$id;?>" />
    <meta property="og:title" content="<?php echo $title?>" />
    <meta property="og:description" content="<?php echo $title?>" />
    <meta property="og:image" content="<?php print_r($image_url);?>" />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="<?php echo $title?>" />
    <meta name="twitter:image" content="<?php print_r($image_url);?>" />
</head>

<body>
</body>
</html>
<?php

?>
