<?php
//echo $_SERVER['PHP_SELF'];
function contstrcont($str1, $str2){
    if (strpos($str1, $str2) !== false) {
        return true;
    } else {
        return false;
    }
}

if (contstrcont($_SERVER['PHP_SELF'], 'mining')) { 
    $mining = 'active';
} else if (contstrcont($_SERVER['PHP_SELF'], 'overgrowth')) { 
    $overgrowth = 'active';
} else if (contstrcont($_SERVER['PHP_SELF'], 'faith')) { 
    $faith = 'active';
} else if (contstrcont($_SERVER['PHP_SELF'], 'achievements')) { 
    $achievements = 'active';
} else if (contstrcont($_SERVER['PHP_SELF'], 'cryo')) { 
    $cryo = 'active';
} else {
    $home = 'active';
}
?>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
        <a class="navbar-brand" href="index.php">GooBoo help</a>
        <!-- <a class="navbar-brand" href="changelog.php" style="font-size: 1rem;">v1 (click to see changelog)</a> -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item"><a class="nav-link <?php echo $home;?>" aria-current="page" href="index.php">Home</a></li>
                <li class="nav-item" id="navbarAchievements" style="display: none;"><a class="nav-link <?php echo $achievements;?>" href="achievements.php">Achievements</a></li>
                <li class="nav-item" id="navbarMining" style="display: none;"><a class="nav-link <?php echo $mining;?>" href="mining.php">Mining</a></li>
                <li class="nav-item" id="navbarOvergrowth" style="display: none;"><a class="nav-link <?php echo $overgrowth;?>" href="overgrowth.php">Overgrowth</a></li>
                <li class="nav-item" id="navbarVillage" style="display: none;"><a class="nav-link <?php echo $faith;?>" href="faith.php">Faith</a></li>
                <li class="nav-item" id="navbarCryo" style="display: none;"><a class="nav-link <?php echo $cryo;?>" href="cryo.php">Cryo lab</a></li>
                <!--<li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </li>-->
            </ul>
        </div>
    </div>
</nav>