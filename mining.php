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
        <link href="css/mining.css?v=<?php echo time()?>" rel="stylesheet" />
    </head>
    <body>
        <?php include 'ui/navbar.php';?>
        <!-- Page content-->
        <div class="container">
        	<div style="text-align: center;">
                <h1 class="w-100" style="margin-bottom: 20px;">Dweller calculator</h1>
	        	<div class="w-lg-30 w-sm-100 calculation_block m-5">
					<h2>Strategy</h2>
                    <div id="result_strategy" class="w-100"></div>
				</div>
				<div class="w-lg-60 w-sm-100 result_block">
					<h2>Calculation results</h2>
                    <div id="result_block" class="w-100"></div>
				</div>
			</div>
            <?php include 'ui/footer.php';?>
        </div>
        <!-- Bootstrap core JS-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Core theme JS-->
        <script src="js/jquery.js"></script>
        <?php include 'ui/scripts.php';?>
        <script src="js/mining.js?v=<?php echo time()?>"></script>
    </body>
</html>
