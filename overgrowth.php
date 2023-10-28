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
	        	<div id="growth" class="w-lg-40 w-sm-100 calculation_block">
					<h1>Overgrowth calculator</h1>
					<div class="calculation_row">
						<h5>Insert your overgrowt stat</h5>
						<input class="form-control" type="number" id="overgrowth_percent" value="0">
					</div>
					<div class="calculation_row">
						<h5>Insert how many grow cycles you want to calculate</h5>
						<input class="form-control" type="number" id="cycles" value="0">
					</div>
					<div class="calculation_row">
						<h5>Some other speed boosts</h5>
						<div class="form-check">
						  <input class="form-check-input" type="checkbox" value="" id="fertiliserUsed">
						  <label class="form-check-label" for="fertiliserUsed">
						    Speed-grow fertiliser
						  </label>
						</div>
						<div class="form-check">
						  <input class="form-check-input" type="checkbox" value="" id="sprinklerUsed">
						  <label class="form-check-label" for="sprinklerUsed">
						    Sprinkler
						  </label>
						</div>
					</div>  			
					<div class="calculation_row">
						<h5>Insert how long does crop take to grow</h5>
						<input class="form-control w-25 form_time_input ms-2" type="number" id="grow_hours" value="0"><h5 class="form_time_text ms-2">hours</h5>
						<input class="form-control w-25 form_time_input ms-2" type="number" id="gorw_minutes" value="0"><h5 class="form_time_text ms-2">mins</h5>
					</div>
					<button class="w-100 btn btn-lg btn-primary submit_calculation" onclick="calculateOvergrowth()">Calculate</button>
					<h5>Take a note: your overgrowth counter for achievement and generals quest is harvest# - 1, so harvest 7 gives only 6 overgrowth!</h5>
				</div>
				<div class="w-lg-40 w-sm-100 result_block">
					<h1>Calculation results</h1>
					<div id="result_block" class="w-100">
						
					</div>
				</div>
			</div>
            <?php include 'ui/footer.php';?>
        </div>
        <!-- Bootstrap core JS-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Core theme JS-->
        <script src="js/jquery.js"></script>
        <?php include 'ui/scripts.php';?>
    </body>
</html>
