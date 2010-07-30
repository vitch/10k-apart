// boingPic.js - a javascript experiment by Kelvin Luck - http://www.kelvinluck.com/

$(function()
	{

		var gridSize = 400;
		var squaresPerAxis = 10;
		var padding = 10;

		var divs;

		var $picHolder = $('#picHolder');

		function initGrid(w, h)
		{
			$picHolder.empty();
			$picHolder.css(
				{
					'width' : w,
					'height' : h
				}
			);
			w /= squaresPerAxis;
			h /= squaresPerAxis;
			divs = [];
			for (var i=0; i<squaresPerAxis; i++) {
				var t = i * h;
				var l = 0;
				for (var j=0; j<squaresPerAxis; j++)
				{
					var a = (Math.round(gridSize / squaresPerAxis) - padding) + 'px';
					var css = {top:t, left:l, width: a, height: a};
					var d = $('<div class="block" />').css(css);
					d.data('t', t);
					d.data('l', l);
					divs.push(d);
					$picHolder.append(d);
					l+=w;
				}
			}
		}

		initGrid(gridSize, gridSize);

		var mouseX = 1000;
		var mouseY = 1000;

		$(document).bind(
			'mousemove',
			function(e)
			{
				var po = $picHolder.offset();
				mouseX = e.pageX - po.left;
				mouseY = e.pageY - po.top;
			}
		);

		var force = 1500;

		setInterval(
			function()
			{
				var po = $picHolder.offset();
				for (var i=0; i<divs.length; i++) {
					var $d = divs[i];
					var o = $d.offset();
					var x = o.left - po.left;
					var y = o.top - po.top;
					var xDif = mouseX - x;
					var yDif = mouseY - y;
					var distance = Math.sqrt(xDif*xDif+yDif*yDif);
					var tempX = x - (force/distance)*(xDif/distance);
					var tempY = y - (force/distance)*(yDif/distance);
					$d.css('left', ($d.data('l') - x)/2+tempX);
					$d.css('top', ($d.data('t') - y)/2+tempY);
				}
			},
			100
		);

	}
);