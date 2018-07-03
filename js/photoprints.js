(function() {

	var
	PhotoPrints = window.PhotoPrints = function(size) {

		this.size = size;

	},
	makeRatioComparison = function(originalRatio, cropRatio, variant) {

		ratioComparisons.push(new RatioComparison(originalRatio, cropRatio, variant));

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

	var RatioComparison = function(originalRatio, cropRatio, variant) {

		this.originalRatio = originalRatio;
		this.cropRatio = cropRatio;
		this.variant = variant;

	};
	RatioComparison.prototype.render = function() {

		var
		out = '\
		<div class="comparison">\
			<h2 class="comparison-head">{name}</h2>\
			<div class="comparison-body">\
				<div class="example orig" style="{styleOne}"></div>\
				<div class="example new" style="{styleTwo}"><span>{name}</span></div>\
			</div>\
		</div>',
		nameOne = this.originalRatio.getName(),
		nameTwo = this.cropRatio.getName(),
		name = [nameOne, nameTwo].join(' > '),
		cropIsSmaller = this.originalRatio.multiplier<this.cropRatio.multiplier,
		styleOneWidth = (this.originalRatio.getVariantWidth(this.variant)*ppu),
		styleOneHeight = (this.originalRatio.getVariantHeight(this.variant)*ppu),
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

	makeRatioComparison(ratios['7:5'], ratios['3:2'], 1);
	makeRatioComparison(ratios['4:3'], ratios['3:2'], 2);

	makeRatioComparison(ratios['3:2'], ratios['7:5'], 2);
	makeRatioComparison(ratios['4:3'], ratios['7:5'], 2);

	makeRatioComparison(ratios['3:2'], ratios['4:3'], 2);
	makeRatioComparison(ratios['7:5'], ratios['4:3'], 1);

	render();

	console.log(ratioComparisons);

})();
