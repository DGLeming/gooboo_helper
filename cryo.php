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
        <link href="css/main.css?v=<? time()?>" rel="stylesheet" />
    </head>
    <body>
        <?php include 'ui/navbar.php';?>
        <!-- Page content-->
        <div class="container">
        	<div style="text-align: center;">
	        	<div class="w-lg-40 w-sm-100 calculation_block">
					<h1>Cryo lab calculator</h1>
                    <div class="calculation_row">
                        <h5>Insert file</h5>
                        <input class="form-control form-file" type="file" name="save"/>
                    </div>
					<button class="w-100 btn btn-lg btn-primary submit_calculation" onclick="calculateCryo()">Calculate</button>
				</div>
				<div class="w-lg-40 w-sm-100 result_block" id="result_block">
					<h1>Calculation results</h1>
				</div>
			</div>
            <?php include 'ui/footer.php';?>
        </div>
        <!-- Bootstrap core JS-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Core theme JS-->
        <script src="js/jquery.js"></script>
        <script src="js/scripts.js?v=<? time()?>"></script>
    </body>
</html>
