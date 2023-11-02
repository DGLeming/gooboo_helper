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
                    <div class="w-100" style="margin: auto;">
                        <h5>You can fiddle with this numbers to see how your progress adjusts</h5></br>
                        <div class="w-100">
                            <!-- <div class="miningAdjustableBlock">
                                <h6>Max broken depth this run</h6>
                                <button type="button" class="btn btn-danger w-20 adjustable-input" disabled="false">-</button>
                                <input class="form-control w-50 adjustable-input" type="number" value="123" placeholder="asdfasdf" readonly="">
                                <button type="button" class="btn btn-success w-20 adjustable-input">+</button>
                            </div> -->
                            <div class="quantity_wrapper" id="quantity_wrapper_depth">
                                <h6>Max broken depth this run</h6>
                                <div class="quantity_inner">  
                                    <button class="bt_minus">
                                        <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                    </button>
                                    <input type="text" value="1" size="2" class="quantity w-sm-50 w-lg-30" id="quantityDepth" data-min-count="0"/>
                                    <button class="bt_plus">
                                        <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                    </button>
                                </div></br>
                            </div>
                            <div class="quantity_wrapper" id="quantity_wrapper_fuel" style="display: none;">
                                <h6>Drill fuel upgrade</h6>
                                <div class="quantity_inner">  
                                    <button class="bt_minus">
                                        <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                    </button>
                                    <input type="text" value="1" class="quantity w-sm-50 w-lg-30" id="quantityFuel" data-min-count="0"/>
                                    <button class="bt_plus">
                                        <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                    </button>
                                </div></br>
                            </div>
                            <div class="quantity_wrapper" id="quantity_wrapper_crystal" style="display: none;">
                                <h6>Crystal drill upgrade</h6>
                                <div class="quantity_inner">  
                                    <button class="bt_minus">
                                        <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                    </button>
                                    <input type="text" value="1" class="quantity w-sm-50 w-lg-30" id="quantityCrystal" data-min-count="0"/>
                                    <button class="bt_plus">
                                        <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                    </button>
                                </div></br>
                            </div>
                            <div class="quantity_wrapper" id="quantity_wrapper_starForge" style="display: none;">
                                <h6>Star forge upgrade</h6>
                                <div class="quantity_inner">  
                                    <button class="bt_minus">
                                        <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                    </button>
                                    <input type="text" value="1" class="quantity w-sm-50 w-lg-30" id="quantityStarForge" data-min-count="0"/>
                                    <button class="bt_plus">
                                        <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
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
