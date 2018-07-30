(function() {

	var
	ppu = 30,
	ratioComparisons = window.ratioComparisons = {
		makeRatioComparison: function(originalRatio, cropRatio, variant) {

			this.comparisons.push(new RatioComparison(originalRatio, cropRatio, variant));

		},
		render: function() {

			var
			markup = '';

			this.comparisons.forEach(function(comparison) {

				markup += comparison.render();

			});

			app.innerHTML = markup;

		},
		comparisons: []
	};

	var PhotoPrints = window.PhotoPrints = function(size) {

		this.size = size;

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
			<div class="example orig" style="{styleOne}"></div>\
			<div class="example new" style="{styleTwo}"><span>{name}</span></div>\
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

	ratioComparisons.makeRatioComparison(ratios['7:5'], ratios['3:2'], 1);
	ratioComparisons.makeRatioComparison(ratios['4:3'], ratios['3:2'], 2);

	ratioComparisons.makeRatioComparison(ratios['3:2'], ratios['7:5'], 2);
	ratioComparisons.makeRatioComparison(ratios['4:3'], ratios['7:5'], 2);

	ratioComparisons.makeRatioComparison(ratios['3:2'], ratios['4:3'], 2);
	ratioComparisons.makeRatioComparison(ratios['7:5'], ratios['4:3'], 1);

	ratioComparisons.makeRatioComparison(ratios['1.85:1'], ratios['16:9'], 0);

})();
