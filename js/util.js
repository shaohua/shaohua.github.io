var display = function () {

  var rects, labels,
    minExtent = d3.time.day(brush.extent()[0]),
    maxExtent = d3.time.day(brush.extent()[1]),
    visItems  = items.filter(function (d) {
     return d.start < maxExtent && d.end > minExtent;
    });

  mini.select('.brush').call(brush.extent([minExtent, maxExtent]));

  x1.domain([minExtent, maxExtent]);

  var ONEMONTH = 30*24*3600*1000;
  var ONEYEAR = 365*24*3600*1000;
  var THREEYEAR = 3*ONEYEAR;

  if ((maxExtent - minExtent) > THREEYEAR) {
    xmainTopAxis.ticks(d3.time.years, 3).tickFormat(d3.time.format('%Y'));
    xmainBottomAxis.ticks(d3.time.years, 1).tickFormat(d3.time.format('%Y'));
  } else if ((maxExtent - minExtent) > ONEYEAR) {
    xmainTopAxis.ticks(d3.time.years, 1).tickFormat(d3.time.format('%Y'));
    xmainBottomAxis.ticks(d3.time.months, 3).tickFormat(d3.time.format('%b'));
  } else if ((maxExtent - minExtent) > ONEMONTH) {
    xmainTopAxis.ticks(d3.time.months, 1).tickFormat(d3.time.format('%b'));
    xmainBottomAxis.ticks(d3.time.weeks, 4).tickFormat(d3.time.format('w%W'));
  } else {
    xmainTopAxis.ticks(d3.time.weeks, 1).tickFormat(d3.time.format('w%W'));
    xmainBottomAxis.ticks(d3.time.days, 7).tickFormat(d3.time.format('d%e'));
  }


  //x1Offset.range([0, x1(d3.time.day.ceil(now) - x1(d3.time.day.floor(now)))]);

  // shift the today line
  main.select('.main.todayLine')
    .attr('x1', x1(now) + 0.5)
    .attr('x2', x1(now) + 0.5);

  // update the axis
  main.select('.main.axis.date').call(xmainBottomAxis);
  main.select('.main.axis.month').call(xmainTopAxis)
    .selectAll('text')
      .attr('dx', 5)
      .attr('dy', 12);

  // upate the item rects
  rects = itemRects.selectAll('rect')
    .data(visItems, function (d) { return d.id; })
    .attr('x', function(d) { return x1(d.start); })
    .attr('width', function(d) { return x1(d.end) - x1(d.start); });

  rects.enter().append('rect')
    .attr('x', function(d) { return x1(d.start); })
    .attr('y', function(d) { return y1(d.lane) + 0.1 * y1(1) + 0.5; })
    .attr('width', function(d) { return x1(d.end) - x1(d.start); })
    .attr('height', function(d) { return 0.8 * y1(1); })
    .attr('class', function(d) { return 'mainItem ' + d.class; });

  rects.exit().remove();

  // update the item labels
  labels = itemRects.selectAll('text')
    .data(visItems, function (d) { return d.id; })
    .attr('x', function(d) { return x1(Math.max(d.start, minExtent)) + 2; });

  labels.enter().append('text')
    .text(function (d) { return 'Item\n\n\n\n Id: ' + d.id; })
    .attr('x', function(d) { return x1(Math.max(d.start, minExtent)) + 2; })
    .attr('y', function(d) { return y1(d.lane) + 0.4 * y1(1) + 0.5; })
    .attr('text-anchor', 'start')
    .attr('class', 'itemLabel');

  labels.exit().remove();
};


var moveBrush = function  () {
  var origin = d3.mouse(this),
    point = x.invert(origin[0]),
    halfExtent = (brush.extent()[1].getTime() - brush.extent()[0].getTime()) / 2,
    start = new Date(point.getTime() - halfExtent),
    end = new Date(point.getTime() + halfExtent);

  brush.extent([start,end]);
  display();
};


// generates a single path for each item class in the mini display
// ugly - but draws mini 2x faster than append lines or line generator
// is there a better way to do a bunch of lines as a single path with d3?
var getPaths = function (items) {
  var paths = {}, d, offset = .5 * y2(1) + 0.5, result = [];
  for (var i = 0; i < items.length; i++) {
    d = items[i];
    if (!paths[d.class]) paths[d.class] = '';
    paths[d.class] += ['M',x(d.start),(y2(d.lane) + offset),'H',x(d.end)].join(' ');
  }

  for (var className in paths) {
    result.push({class: className, path: paths[className]});
  }

  return result;
};