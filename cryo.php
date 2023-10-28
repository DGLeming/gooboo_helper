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
                <div class="w-100 result_block" class="cryoBlock" id="cryoStrategy">
                    <h1>Cryo Lab</h1>
                    <h2>Fastest path</h2>
                </div>
                <div class="w-100 result_block" class="cryoBlock" style="margin: 10px 0;">
                    <h6>Values below are per level, not total</h6>
                </div>
				<div class="w-lg-45 w-sm-100 result_block" class="cryoBlock" id="miningBlock" style="display: none;">
					<h2>Mining</h2>
				</div>
                <div class="w-lg-45 w-sm-100 result_block" class="cryoBlock" id="villageBlock" style="display: none;">
                    <h2>Village</h2>
                </div>
                <div class="w-lg-45 w-sm-100 result_block" class="cryoBlock" id="hordeBlock" style="display: none;">
                    <h2>Horde</h2>
                </div>
                <div class="w-lg-45 w-sm-100 result_block" class="cryoBlock" id="farmBlock" style="display: none;">
                    <h2>Farm</h2>
                </div>
                <div class="w-lg-45 w-sm-100 result_block" class="cryoBlock" id="galleryBlock" style="display: none;">
                    <h2>Gallery</h2>
                </div>
			</div>
            <?php include 'ui/footer.php';?>
        </div>
        <!-- Bootstrap core JS-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Core theme JS-->
        <script src="js/jquery.js"></script>
        <?php include 'ui/scripts.php';?>
        <script src="js/cryo.js"></script>
        <style type="text/css">
            .result.text{
                text-align: center;
            }
        </style>
    </body>
</html>
