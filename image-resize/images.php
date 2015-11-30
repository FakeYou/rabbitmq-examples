<?php

$name = explode('.', $_GET['name'])[0];
$ext = explode('.', $_GET['name'])[1];

?>

<script>

var images = [
	"<?= $name ?>-basic.<?= $ext ?>",
	"<?= $name ?>-small.<?= $ext ?>",
	"<?= $name ?>-bw.<?= $ext ?>",
	"<?= $name ?>-invert.<?= $ext ?>",
	"<?= $name ?>-rotate.<?= $ext ?>",
	"<?= $name ?>-sepia.<?= $ext ?>",
	"<?= $name ?>-darken.<?= $ext ?>",
	"<?= $name ?>-lighten.<?= $ext ?>",
	"<?= $name ?>-dither.<?= $ext ?>",
	"<?= $name ?>-poster.<?= $ext ?>"
];

setInterval(function() {
	for(var i = 0; i < images.length; i++) {
		(function() {
			var image = images[i];

			var img = new Image();
			img.onload = function() {
				images.splice(images.indexOf(image), 1);
				document.getElementById('images').appendChild(this);
			};
		
			img.src = '/images/' + image;
		})();
	};
}, 500)
</script>

<div id="images">

</div>
