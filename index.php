<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>GooBoo helper by DGLeming</title>
        <!-- Favicon-->
        <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
        <!-- Core theme CSS (includes Bootstrap)-->
        <link href="css/styles.css" rel="stylesheet" />
        <link href="css/main.css" rel="stylesheet" />
    </head>
    <body>
        <?php include 'ui/navbar.php';?>
        <!-- Page content-->
        <div class="container">
        	<div style="text-align: center;">
	        	<div class="w-75 index_feature_block my-2">
					<h1>Overgrowth</h2>
					<h5>With this calculator you can check how long do you need to complete certain achievements, quest, or just see if you can overnight crop efficiently!</h5>
                    <button class="w-sm-70 w-md-50 w-lg-25 btn btn-lg btn-primary submit_calculation" onclick="location.href = 'overgrowth.php';">Overgrowth calculator</button>
				</div>
                <div class="w-75 index_feature_block my-2">
                    <h1>Faith</h2>
                    <h5>Calculate how long do you need till certain upgrades with your current faith cap and speed</h5>
                    <button class="w-sm-70 w-md-50 w-lg-25 btn btn-lg btn-primary submit_calculation" onclick="location.href = 'faith.php';">Faith calculator</button>
                </div>
                
                <?php
                if($_COOKIE["globalLevel"] >= 290)
                    echo '<div class="w-75 index_feature_block my-2">
                    <h1>Cryo lab</h2>
                    <h5>Calculate your optimal progress path</h5>
                    <button class="w-sm-70 w-md-50 w-lg-25 btn btn-lg btn-primary submit_calculation" onclick="location.href = \'cryo.php\';">Cryo lab calculator</button>
                </div>';
                ?>
                <div class="w-75 index_feature_block my-2">
                    <h1>Something else?</h2>
                    <h5>Its not all the features that this site can offer, but to see other ones you need to upload your save file to make sure you unlocked them ingame</h5>
                    <input class="form-control form-file w-sm-70 w-md-50 w-lg-25" type="file" name="save" style="margin: auto;" />
                    <?php 
                    $breakpoints = array(290);
                    if(!isset($_COOKIE["globalLevel"])) {
                      echo "<h5>You never uploaded your save file here. Try it and it may unlock new features</h5>";
                    } else {
                      echo "<h5>Your last uploaded save file had ".$_COOKIE["globalLevel"]." global level</h5>";
                    }
                    for($i=0; $i<count($breakpoints); $i++){
                        if($_COOKIE["globalLevel"] < $breakpoints[$i]){
                            echo "<h5>Next feature is at ".$breakpoints[$i]." global level</h5>";
                            break;
                        }
                        if($i+1 == count($breakpoints))
                            echo "<h5>You unlocked all awaliable features here</h5>";
                    }
                    ?>
                </div>
			</div>
            <?php include 'ui/footer.php';?>
        </div>
        
        <!-- Bootstrap core JS-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Core theme JS-->
        <script src="js/jquery.js"></script>
        <script src="js/scripts.js"></script>

    </body>
</html>
