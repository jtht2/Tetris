<h1>Highscores</h1>

<div class="table">
	<div class="header">
    	<div class="cell">NAME</div>
    	<div class="cell">SCORE</div>
	</div>
	<?php
	foreach ($results as $row):
	?>
	<div class="rowGroup">
    	<div class="row">
    		<div class="cell"><?php echo $row["name"]  ?></div>
    		<div class="cell"><?php echo $row["score"] ?></div>
    	</div>
	</div>
	<?php endforeach; ?>
</div>