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
                    <button class="w-25 btn btn-lg btn-primary submit_calculation" onclick="location.href = 'overgrowth.php';">Overgrowth calculator</button>
				</div>
                <div class="w-75 index_feature_block my-2">
                    <h1>Faith</h2>
                    <h5>Calculate how long do you need till certain upgrades with your current faith cap and speed</h5>
                    <button class="w-25 btn btn-lg btn-primary submit_calculation" onclick="location.href = 'faith.php';">Faith calculator</button>
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
