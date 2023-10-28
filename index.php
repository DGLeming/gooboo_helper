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
        <link href="css/main.css?v=<?php echo time()?>" rel="stylesheet" />
    </head>
    <body>
        <?php include 'ui/navbar.php';?>
        <!-- Page content-->
        <div class="container">
        	<div style="text-align: center;">
                <div class="w-75 index_feature_block my-2" id="welcome-block">
                    <h1>Hi!</h2>
                    <h5>To use this sites features you need to upload your GooBoo save file below, since all those calculator that are awaliable here use data from it.</h5>
                    <input class="form-control form-file w-sm-70 w-md-50 w-lg-25" type="file" name="save" style="margin: auto;" />
                </div>
                <div class="w-75 index_feature_block my-2" id="indexMiningBlock" style="display: none;">
                    <h1>Mining</h2>
                    <h5>Simple dweller spreadsheet</h5>
                    <button class="w-sm-70 w-md-50 w-lg-25 btn btn-lg btn-primary submit_calculation" onclick="location.href = 'mining.php';">Dweller calculator</button>
                </div>
	        	<div class="w-75 index_feature_block my-2" id="indexFarmBlock" style="display: none;">
					<h1>Overgrowth</h2>
					<h5>Get overgrowth times for your plants (currently working kinda meh)</h5>
                    <button class="w-sm-70 w-md-50 w-lg-25 btn btn-lg btn-primary submit_calculation" onclick="location.href = 'overgrowth.php';">Overgrowth calculator</button>
				</div>
                <div class="w-75 index_feature_block my-2" id="indexVillageBlock" style="display: none;">
                    <h1>Village</h2>
                    <h5>Simple faith spreadsheet</h5>
                    <button class="w-sm-70 w-md-50 w-lg-25 btn btn-lg btn-primary submit_calculation" onclick="location.href = 'faith.php';">Faith calculator</button>
                </div>
                <div class="w-75 index_feature_block my-2" id="indexCryoBlock" style="display: none;">
                    <h1>Cryo lab</h2>
                    <h5>Calculate your optimal progress path</h5>
                    <button class="w-sm-70 w-md-50 w-lg-25 btn btn-lg btn-primary submit_calculation" onclick="location.href = 'cryo.php';">Cryo lab calculator</button>
                </div>
                
			</div>
            <?php include 'ui/footer.php';?>
        </div>
        
        <!-- Bootstrap core JS-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Core theme JS-->
        <script src="js/jquery.js"></script>

        <?php include 'ui/scripts.php';?>
        <script src="js/index.js?v=<?php echo time()?>"></script>

    </body>
</html>
