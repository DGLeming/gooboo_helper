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
	        	<div class="w-25 calculation_block mx-3">
					<h2>Faith calculator</h2>
                    <button class="w-50 btn btn-sm btn-outline-secondary submit_calculation" onclick="switchFaithData('Manual')">Manual</button>
                    <button class="w-50 btn btn-sm btn-info submit_calculation" onclick="switchFaithData('File')">By file</button>
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
                            <input class="form-control form-faith-file" type="file" name="save"/>
                        </div>
                    </div>					
                    <div class="calculation_row">
                        <h5>Insert how much faith you want</h5>
                        <input class="form-control" type="number" id="faithNeeded" value="0">
                    </div>
					<button class="w-100 btn btn-lg btn-primary submit_calculation" onclick="calculateFaith()">Calculate</button>
				</div>
				<div class="w-50 result_block mx-3" id="result_block">
					<h3>Calculation results</h3>
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
