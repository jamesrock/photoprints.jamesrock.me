(function() {

	var
	PhotoPrints = window.PhotoPrints = function(size) {

		this.size = size;

	},
	makeRatioComparison = function(originalRatio, cropRatio) {

		ratioComparisons.push(new RatioComparison(originalRatio, cropRatio));

	},
	ratioComparisons = [],
	ppu = 30,
	render = function() {

		var
		markup = '';

		ratioComparisons.forEach(function(comparison) {

			markup += comparison.render();

		});

		app.innerHTML = markup;

	};

	var RatioComparison = function(originalRatio, cropRatio) {

		this.originalRatio = originalRatio;
		this.cropRatio = cropRatio;

	};
	RatioComparison.prototype.render = function() {

		var
		out = '\
		<div class="comparison">\
			<h3 class="comparison-head">{name}</h3>\
			<div class="comparison-body">\
				<div class="example orig" style="{styleOne}"></div>\
				<div class="example new" style="{styleTwo}"></div>\
			</div>\
		</div>',
		nameOne = this.originalRatio.getName(),
		nameTwo = this.cropRatio.getName(),
		name = [nameOne, nameTwo].join(' > '),
		cropIsSmaller = this.originalRatio.multiplier<this.cropRatio.multiplier,
		styleOneWidth = this.originalRatio.getExampleWidth(ppu),
		styleOneHeight = this.originalRatio.getExampleHeight(ppu),
		styleTwoWidth = this.cropRatio.getLongSide(styleOneHeight),
		styleTwoHeight = styleOneHeight,
		styleOne,
		styleTwo;

		if(cropIsSmaller) {
			styleTwoWidth = styleOneWidth;
			styleTwoHeight = this.cropRatio.getShortSide(styleTwoWidth);
		};

		styleOne = `width: ${styleOneWidth}px; height: ${styleOneHeight}px`;
		styleTwo = `width: ${styleTwoWidth}px; height: ${styleTwoHeight}px`;

		out = ROCK.STRING.replacer(out, {
			styleOne: styleOne,
			styleTwo: styleTwo,
			name
		});

		return out;

	};

	// makeRatioComparison(ratios['3:2'], ratios['3:2']);
	makeRatioComparison(ratios['3:2'], ratios['7:5']);
	makeRatioComparison(ratios['3:2'], ratios['4:3']);

	makeRatioComparison(ratios['7:5'], ratios['3:2']);
	// makeRatioComparison(ratios['7:5'], ratios['7:5']);
	makeRatioComparison(ratios['7:5'], ratios['4:3']);

	makeRatioComparison(ratios['4:3'], ratios['3:2']);
	makeRatioComparison(ratios['4:3'], ratios['7:5']);
	// makeRatioComparison(ratios['4:3'], ratios['4:3']);

	render();

	console.log('ratioComparisons', ratioComparisons);

})();
