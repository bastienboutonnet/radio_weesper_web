document.addEventListener('DOMContentLoaded', function () {
  var marquees = document.querySelectorAll('.live-banner-marquee');
  marquees.forEach(function (marquee) {
    var titleSpan = marquee.querySelector('.marquee-span');
    if (!titleSpan) return;

    var titleText = titleSpan.textContent;
    var space = ' \u00A0\u00A0\u00A0 ';

    // Create a temporary span to measure width
    var tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.textContent = titleText + space;
    marquee.appendChild(tempSpan);

    var marqueeWidth = marquee.offsetWidth;
    var titleWidth = tempSpan.offsetWidth;
    marquee.removeChild(tempSpan);

    // Repeat enough times to cover at least 2x the marquee width
    var repeatCount = Math.ceil((marqueeWidth * 2) / titleWidth);
    var repeated = Array(repeatCount).fill(titleText).join(space);
    titleSpan.textContent = repeated;

    // Set the span width for smooth animation
    titleSpan.style.display = 'inline-block';
    titleSpan.style.minWidth = (titleWidth * repeatCount) + 'px';

    // Animate using CSS (slower: 32s)
    titleSpan.style.animation = 'live-marquee-infinite 32s linear infinite';
  });
});
