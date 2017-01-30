var swoopjs = function(swoopjs){

	swoopjs.Feature = function(name, json){

		var jsonName;
		jsonName = json[name];		

		// set feature attributes
		if(jsonName){
			this.name = name;
			this.title = jsonName.title;
			this.description = jsonName.description;
			this.categories = jsonName.categories;
			this.stats = jsonName.stats;
		} else {
			// error feature is not in data
			console.log("Error: "+ name + " is not a valid feature");
		};
	};

	swoopjs.Bar = function(feature, browsers, colors, radius){

		if (colors == null) colors = [];
		if (radius == null) radius = 10;

		// var bar = new createjs.Graphics();
		var bar = new zim.Shape();
		var rect, c;
		bar.feature = feature;
		bar.rad = 9;
		bar.SetBounds = (0,0, 2*bar.rad, (15/2)*bar.rad);

		for (var b = 0; b < browsers.length; b++){
			var browser = browsers[b];
			var versions = feature.stats[browser];
			var supportedVersions = [];
			(colors[b]) ? c = colors[b] : c = "#fff";

			for (v in versions){
				if (versions[v] == "y" && !isNaN(v)) supportedVersions.push(v);
			};

			var maxVersion = (Math.max(...supportedVersions) != -Infinity); //if array if supported versions is empty, max will return -Infinity

			// if browser in list, draw shape
			if (maxVersion){
				bar.graphics.beginFill(c).drawCircle(0,radius + 3*bar.rad*b,bar.rad);
			} else {
				bar.graphics.beginFill("rgba(255,255,255,0.1)").drawCircle(0,radius + 3*bar.rad*b,bar.rad);
			}

		};

		bar.grow = function(){
			bar.animate({
				obj: {scale: 1.3},
				time: 500,
				// ease: "elasticOut"
				// rewind: true
			});
		};

		bar.shrink = function(){
			setTimeout(function(){
				bar.animate({
				obj: {scale: 1},
				time: 1200,
				ease: "elasticOut"
				// rewind: true
			})
			}, 200);
		};
		
		return bar;

	};

	swoopjs.Legend = function( nameList, imgList, space ){

		legend = new zim.Container();
		var img, name, y , x ;

		if (space == null) space = 10;

		for (var i = 0; i < (Math.min(nameList.length, imgList.length)); i++){
			img = imgList[i];
			y = i*(img.height + space);
			x = img.width/2 + space;
			name = new zim.Label({
				text: nameList[i].toUpperCase(),
				color: "#fff",
				size: 20,
				valign: "center",
				font: "Pangolin"
			});

			legend.addChild(img);
			legend.addChild(name);
			zim.centerReg(img);

			img.y = name.y = y;
			name.x = x;

		};

		return legend;
		
	};

	return swoopjs;

}(swoopjs || {});

