//credits:
//inspired by http://bl.ocks.org/bunkat/1962173

/* global realData, d3 */
/* display, moveBrush, getPaths */
//set up data
var data = realData,
   lanes = data.lanes,
   items = data.items,
     now = new Date();

//set up the size of graph
var margin = {top: 20, right: 15, bottom: 15, left: 60},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom,
  miniHeight = lanes.length * 12 + 50,
  mainHeight = height - miniHeight - 50;

//set up the scale
var x = d3.time.scale()
          .domain([
            d3.min(items, function(d) { return d.start; }),
            d3.max(items, function(d) { return d.end;   })
          ])
          .range([0, width]);
var x1 = d3.time.scale().range([0, width]);

//set up extent
var ext = d3.extent(lanes, function(d) { return d.id; });
var y1 = d3.scale.linear().domain([ext[0], ext[1] + 1]).range([0, mainHeight]);
var y2 = d3.scale.linear().domain([ext[0], ext[1] + 1]).range([0, miniHeight]);

var chart = d3.select('.d3')
  .append('svg:svg')
  .attr('width', width + margin.right + margin.left)
  .attr('height', height + margin.top + margin.bottom)
  .attr('class', 'chart');

chart.append('defs').append('clipPath')
  .attr('id', 'clip')
  .append('rect')
    .attr('width', width)
    .attr('height', mainHeight);

var main = chart.append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  .attr('width', width)
  .attr('height', mainHeight)
  .attr('class', 'main');

var mini = chart.append('g')
  .attr('transform', 'translate(' + margin.left + ',' + (mainHeight + 60) + ')')
  .attr('width', width)
  .attr('height', miniHeight)
  .attr('class', 'mini');

// draw the lanes for the main chart
main.append('g').selectAll('.laneLines')
  .data(lanes)
  .enter().append('line')
  .attr('x1', 0)
  .attr('y1', function(d) { return d3.round(y1(d.id)) + 0.5; })
  .attr('x2', width)
  .attr('y2', function(d) { return d3.round(y1(d.id)) + 0.5; })
  .attr('stroke', function(d) { return d.label === '' ? 'white' : 'lightgray'; });

main.append('g').selectAll('.laneText')
  .data(lanes)
  .enter().append('text')
  .text(function(d) { return d.label; })
  .attr('x', -10)
  .attr('y', function(d) { return y1(d.id + 0.5); })
  .attr('dy', '0.5ex')
  .attr('text-anchor', 'end')
  .attr('class', 'laneText');

// draw the lanes for the mini chart
mini.append('g').selectAll('.laneLines')
  .data(lanes)
  .enter().append('line')
  .attr('x1', 0)
  .attr('y1', function(d) { return d3.round(y2(d.id)) + 0.5; })
  .attr('x2', width)
  .attr('y2', function(d) { return d3.round(y2(d.id)) + 0.5; })
  .attr('stroke', function(d) { return d.label === '' ? 'white' : 'lightgray'; });

mini.append('g').selectAll('.laneText')
  .data(lanes)
  .enter().append('text')
  .text(function(d) { return d.label; })
  .attr('x', -10)
  .attr('y', function(d) { return y2(d.id + 0.5); })
  .attr('dy', '0.5ex')
  .attr('text-anchor', 'end')
  .attr('class', 'laneText');

// draw the x axis
var xBottomAxis = d3.svg.axis()
  .scale(x)
  .orient('bottom')
  .ticks(d3.time.years, 1)
  .tickFormat(d3.time.format('%Y'))
  .tickSize(6, 0, 0);

var xTopAxis = d3.svg.axis()
  .scale(x)
  .orient('top')
  .ticks(d3.time.months, 12)
  .tickFormat(d3.time.format('%Y'))
  .tickSize(1, 0, 0);


var xmainBottomAxis = d3.svg.axis()
  .scale(x1)
  .orient('bottom')
  .ticks(d3.time.years, 1)
  .tickFormat(d3.time.format('%Y'))
  .tickSize(6, 0, 0);


var xmainTopAxis = d3.svg.axis()
  .scale(x1)
  .orient('top')
  .ticks(d3.time.months, 1)
  .tickFormat(d3.time.format('%b'))
  .tickSize(15, 0, 0);

main.append('g')
  .attr('transform', 'translate(0,' + mainHeight + ')')
  .attr('class', 'main axis date')
  .call(xmainBottomAxis);

main.append('g')
  .attr('transform', 'translate(0,0.5)')
  .attr('class', 'main axis month')
  .call(xmainTopAxis)
  .selectAll('text')
    .attr('dx', 5)
    .attr('dy', 12);

mini.append('g')
  .attr('transform', 'translate(0,' + miniHeight + ')')
  .attr('class', 'axis date')
  .call(xBottomAxis);

mini.append('g')
  .attr('transform', 'translate(0,0.5)')
  .attr('class', 'axis month')
  .call(xTopAxis)
  .selectAll('text')
  .remove();

// draw a line representing today's date
main.append('line')
  .attr('y1', 0)
  .attr('y2', mainHeight)
  .attr('class', 'main todayLine')
  .attr('clip-path', 'url(#clip)');

mini.append('line')
  .attr('x1', x(now) + 0.5)
  .attr('y1', 0)
  .attr('x2', x(now) + 0.5)
  .attr('y2', miniHeight)
  .attr('class', 'todayLine');

// draw the items
var itemRects = main.append('g')
  .attr('clip-path', 'url(#clip)');

mini.append('g').selectAll('miniItems')
  .data(getPaths(items))
  .enter().append('path')
  .attr('class', function(d) { return 'miniItem ' + d.class; })
  .attr('d', function(d) { return d.path; });

// invisible hit area to move around the selection window
mini.append('rect')
  .attr('pointer-events', 'painted')
  .attr('width', width)
  .attr('height', miniHeight)
  .attr('visibility', 'hidden')
  .on('mouseup', moveBrush);

// draw the selection area
var brush = d3.svg.brush()
  .x(x)
  .extent([d3.time.year.offset(now, -1.5), d3.time.year.offset(now, 0.5)])
  .on("brush", display);

mini.append('g')
  .attr('class', 'x brush')
  .call(brush)
  .selectAll('rect')
    .attr('y', 1)
    .attr('height', miniHeight - 1);

mini.selectAll('rect.background').remove();

display();