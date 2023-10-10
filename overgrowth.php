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
        <?php include '/ui/navbar.php';?> 
        <!-- Page content-->
        <div class="container">
        	<div style="text-align: center;">
	        	<div id="growth" class="w-25 calculation_block mx-3">
					<h2>Overgrowth calculator</h2>
					<div class="calculation_row">
						<h5>Insert your overgrowt stat</h5>
						<input class="form-control" type="number" id="overgrowth_percent" value="0">
					</div>
					<div class="calculation_row">
						<h5>Insert how many grow cycles you want to calculate</h5>
						<input class="form-control" type="number" id="cycles" value="0">
					</div>			
					<div class="calculation_row">
						<h5>Insert how long does crop take to grow</h5>
						<input class="form-control w-25 form_time_input ms-2" type="number" id="grow_hours" value="0"><h5 class="form_time_text ms-2">hours</h5>
						<input class="form-control w-25 form_time_input ms-2" type="number" id="gorw_minutes" value="0"><h5 class="form_time_text ms-2">mins</h5>
					</div>
					<button class="w-100 btn btn-lg btn-primary submit_calculation" onclick="calculateOvergrowth()">Calculate</button>
					<h5>Take a note: your overgrowth counter for achievement and generals quest is harvest# - 1, so harvest 7 gives only 6 overgrowth!</h5>
				</div>
				<div class="w-50 result_block mx-3" id="result_block">
					<h3>Calculation results</h3>
				</div>
			</div>
        </div>
        <!-- Bootstrap core JS-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Core theme JS-->
        <script src="js/scripts.js"></script>
    </body>
</html>
