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
	        	<div class="w-lg-40 w-sm-100 calculation_block">
					<h1>Faith calculator</h1>
                    <button class="w-50 btn btn-sm btn-outline-secondary submit_calculation" onclick="switchFaithData('Manual')" id="manual-data-button">Manual</button>
                    <button class="w-50 btn btn-sm btn-info submit_calculation" onclick="switchFaithData('File')" id="file-data-button">By file</button>
                    <div id="manual-data">
                        <div class="calculation_row">
                            <h5>Insert your faith gain</h5>
                            <input class="form-control" type="number" id="faithGain" value="0">
                        </div>
                        <div class="calculation_row">
                            <h5>Insert your faith cap</h5>
                            <input class="form-control" type="number" id="faithCap" value="0">
                        </div>
                        <div class="calculation_row">
                            <h5>Insert your current faith ammount</h5>
                            <input class="form-control" type="number" id="faithNow" value="0">
                        </div>
                    </div>
                    <div id="file-data" style="display: none;">
                        <div class="calculation_row">
                            <h5>Insert file</h5>
                            <input class="form-control form-file" type="file" name="save"/>
                        </div>
                    </div>					
                    <div class="calculation_row">
                        <h5>Insert how much faith you want</h5>
                        <input class="form-control" type="number" id="faithNeeded" value="0">
                    </div>
                    <div class="calculation_row">
                        <h5>Or for how long you want to calculate</h5>
                        <input class="form-control w-25 form_time_input ms-2" type="number" id="faith_hours" value="0"><h5 class="form_time_text ms-2">hours</h5>
                        <input class="form-control w-25 form_time_input ms-2" type="number" id="faith_mins" value="0"><h5 class="form_time_text ms-2">mins</h5>
                    </div>
					<button class="w-100 btn btn-lg btn-primary submit_calculation" onclick="calculateFaith()">Calculate</button>
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
        <script src="js/scripts.js"></script>
    </body>
</html>
