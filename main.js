var canvas = document.getElementById('myCanvas');
var view = paper.setup(canvas);

/////////////////////////////////////////
//////// FOR DRAWING THE CORNER /////////
/////////////////////////////////////////

function drawSpace(){
	function leftLight(){
		var canvasWidth = $(window).width();
		var canvasHeight = $(window).height();
		var oneFifthofHeight = canvasHeight/5;
		var oneFifthofWidth = canvasWidth/5;

		var distance = Math.floor(Math.random() * ((oneFifthofWidth * 3) - oneFifthofWidth + 1)) + oneFifthofWidth;
		var height = Math.floor(Math.random() * ((oneFifthofHeight * 3) - (oneFifthofHeight * 2) + 1)) + (oneFifthofHeight * 2);
		var width = canvasWidth;
		var maxHeight1 = Math.floor(Math.random() * ((oneFifthofHeight * 3 + height) - (height + 100) + 1)) + (height + 50);
		var maxHeight2 = Math.floor(Math.random() * ((oneFifthofHeight * 3 + height) - (height + 100) + 1)) + (height + 50);

		var points = [
		new paper.Point(distance, 0), new paper.Point(distance, height),
		new paper.Point(0, maxHeight1), new paper.Point(width, maxHeight2), 
		new paper.Point(0, 0), new paper.Point(width, 0),
		new paper.Point(width, canvasHeight), new paper.Point(0, canvasHeight)
		]

		var leftWall
		var rightWall
		var floor
		function drawCorner(points){
			leftWall = new paper.Path();
			//leftWall.strokeColor = 'black';
			//leftWall.strokeWidth = 3;
			leftWall.add(points[0]);
			leftWall.add(points[1]);
			leftWall.add(points[2]);
			leftWall.add(points[4]);
		    leftWall.closed = true
		    leftWall.fillColor = 'black'
			
			rightWall = new paper.Path();
			//rightWall.strokeColor = 'black';
			//rightWall.strokeWidth = 3;
			rightWall.add(points[1]);
			rightWall.add(points[3]);
			rightWall.add(points[5]);
			rightWall.add(points[0]);
			rightWall.closed = true
			rightWall.fillColor = '#e5e5e5'


			floor = new paper.Path();
			//floor.strokeColor = 'black';
			//floor.strokeWidth = 3;
			floor.add(points[2]);
			floor.add(points[1]);
			floor.add(points[3]);
			floor.add(points[6]);
			floor.add(points[7]);
			floor.closed = true
			floor.fillColor = '#666666'
		}


		/*Right Light*/

		function drawWindowRight(points, height, distance, rightWall, leftWall){
	        var windowPath = new paper.Path()
	       // windowPath.strokeColor = 'white';
	        rightWall.fillColor = '#000000'
	        leftWall.fillColor = '#e5e5e5'
	        windowPath.add(points[1]);
			windowPath.add(points[3]);
			windowPath.scale(0.4)
			var distance = Math.floor(Math.random() * ((distance/1.5) - (distance/3) + 1)) + (distance/3);

			var height = Math.floor(Math.random() * ((height - 30) - (height/3) + 1)) + (height/3);

			var height2 = Math.floor(Math.random() * ((height/3) - (-100) + 1)) + (-100);
			
			windowPath.position = new paper.Point(((width/2) + distance), height);
			var windowTop = windowPath.clone()
			windowTop.position = new paper.Point(((width/2) + distance), height2);
			windowTop.strokeColor = 'white'
			var windowLeft = new paper.Path()
			windowLeft.strokeColor = 'white'
			var windowRight = new paper.Path()
			windowRight.strokeColor = 'white'
			windowRight.add(windowPath.segments[0].point)
			windowRight.add(windowTop.segments[0].point)
			windowLeft.add(windowPath.segments[1].point)
			windowLeft.add(windowTop.segments[1].point)
			var windowBottom = windowPath.clone()
			windowPath.join(windowLeft)
			windowPath.join(windowTop)
			windowPath.join(windowRight)
			windowPath.fillColor = 'white'

			var middlePathVertical = new paper.Path()
			middlePathVertical.strokeColor = 'black'
			middlePathVertical.strokeWidth = 2
			middlePathVertical.add(windowTop.getLocationAt(windowTop.length/2))
			middlePathVertical.add(windowBottom.getLocationAt(windowTop.length/2))

			var middlePathHorizontal = new paper.Path()
			middlePathHorizontal.strokeColor = 'black'
			middlePathHorizontal.strokeWidth = 2
			middlePathHorizontal.add(windowLeft.getLocationAt(windowLeft.length/2))
			middlePathHorizontal.add(windowRight.getLocationAt(windowRight.length/2))


			/* window shadow */
			var floorPath = new paper.Path()
	        floorPath.add(points[1]);
			floorPath.add(points[3]);

			var floorPathRight = new paper.Path()
	        floorPathRight.add(points[1]);
			floorPathRight.add(points[2]);

			var floorPathRightClone1 = floorPathRight.clone()
			var floorPathRightClone2 = floorPathRight.clone()

			var firstShadow = new paper.Path()

			 
			firstShadow.add(windowBottom.segments[0].point)
			firstShadow.add(windowBottom.segments[0].point.x, $(window).height())



			var firstShadowRight = new paper.Path()

			firstShadowRight.add(windowTop.segments[1].point)
			firstShadowRight.add(-1 * windowBottom.segments[1].point.x, $(window).height() * 2)


			firstShadowRight.add(new paper.Point(floorPathRight.segments[1].point.x - (windowBottom.length*5), floorPathRight.segments[1].point.y + (windowBottom.length*5)))
			firstShadow.join(windowBottom)
			windowBottom.join(windowLeft)
			
			firstShadow.join(firstShadowRight)
			firstShadow.fillColor = 'white'
			firstShadow.opacity = 0.7
			firstShadow.blendMode = 'soft-light'

		}
		/* Left */
		function drawWindowLeft(points, height, distance){
	        var windowPath = new paper.Path()
	       // windowPath.strokeColor = 'white';
	        windowPath.add(points[1]);
			windowPath.add(points[2]);
			windowPath.scale(0.5)
			var distance = Math.floor(Math.random() * ((distance/1.5) - (distance/3) + 1)) + (distance/3);

			var height = Math.floor(Math.random() * ((height - 30) - (height/3) + 1)) + (height/3);

			var height2 = Math.floor(Math.random() * ((height/3) - (-100) + 1)) + (-100);
			
			windowPath.position = new paper.Point(distance, height);
			var windowTop = windowPath.clone()
			windowTop.position = new paper.Point(distance, height2);
			windowTop.strokeColor = 'white'
			var windowLeft = new paper.Path()
			windowLeft.strokeColor = 'white'
			var windowRight = new paper.Path()
			windowRight.strokeColor = 'white'
			windowRight.add(windowPath.segments[0].point)
			windowRight.add(windowTop.segments[0].point)
			windowLeft.add(windowPath.segments[1].point)
			windowLeft.add(windowTop.segments[1].point)
			var windowBottom = windowPath.clone()
			windowPath.join(windowLeft)
			windowPath.join(windowTop)
			windowPath.join(windowRight)
			windowPath.fillColor = 'white'

			var middlePathVertical = new paper.Path()
			middlePathVertical.strokeColor = 'black'
			middlePathVertical.strokeWidth = 2
			middlePathVertical.add(windowTop.getLocationAt(windowTop.length/2))
			middlePathVertical.add(windowBottom.getLocationAt(windowTop.length/2))

			var middlePathHorizontal = new paper.Path()
			middlePathHorizontal.strokeColor = 'black'
			middlePathHorizontal.strokeWidth = 2
			middlePathHorizontal.add(windowLeft.getLocationAt(windowLeft.length/2))
			middlePathHorizontal.add(windowRight.getLocationAt(windowRight.length/2))


			/* window shadow */
			var floorPath = new paper.Path()
	        floorPath.add(points[1]);
			floorPath.add(points[2]);

			var floorPathRight = new paper.Path()
	        floorPathRight.add(points[1]);
			floorPathRight.add(points[3]);

			var floorPathRightClone1 = floorPathRight.clone()
			var floorPathRightClone2 = floorPathRight.clone()

			var firstShadow = new paper.Path()

			 
			firstShadow.add(windowTop.segments[1].point)
			firstShadow.add(windowBottom.segments[0].point.x, $(window).height())
			var intersections = firstShadow.getIntersections(floorPath)
			firstShadow.removeSegments(1, 2);
			console.log(intersections[0])
			//firstShadow.add(new paper.Point(intersections[0].point.x + 300, intersections[0].point.y))
			firstShadow.add(new paper.Point(floorPathRight.segments[1].point.x * 2, floorPathRight.segments[1].point.y))


			var firstShadowRight = new paper.Path()
			// firstShadow.add(windowBottom.segments[1].point)
			firstShadowRight.add(windowBottom.segments[1].point)
			firstShadowRight.add(windowBottom.segments[1].point.x, $(window).height() * 2)
			var intersections2 = firstShadowRight.getIntersections(floorPath)
			firstShadowRight.removeSegments(1, 2);
			console.log(intersections2[0])
			// firstShadowRight.add(new paper.Point(intersections2[0].point.x + 250, intersections2[0].point.y))
			firstShadowRight.add(new paper.Point(floorPathRight.segments[1].point.x - (windowBottom.length*2), floorPathRight.segments[1].point.y + (windowBottom.length*5)))
			windowBottom.join(windowRight)
			firstShadow.join(windowBottom)
			firstShadow.join(firstShadowRight)
			firstShadow.fillColor = 'white'
			firstShadow.opacity = 0.7
			firstShadow.blendMode = 'soft-light'
			// firstShadow.add(floorPath.getLocationAt(windowBottom.segments[1].point.x + 100))
		}
		
		drawCorner(points)
		if(!!Math.floor(Math.random() * 2)){
			drawWindowLeft(points, height, distance)
		}else{
			drawWindowRight(points, height, distance, rightWall, leftWall)
		}
		
		
	}

	leftLight()
}



























 drawSpace()
paper.view.draw()