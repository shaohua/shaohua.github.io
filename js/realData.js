(function() {

  var itemString = [
    {"id":0,"lane":2,"start":new Date("1999-09-01T00:00:00.000Z"),"end":new Date("2003-01-18T00:00:00.000Z"),"class":"past","desc":"This is a description."},
    {"id":1,"lane":2,"start":new Date("2012-01-22T00:00:00.000Z"),"end":new Date("2012-01-23T00:00:00.000Z"),"class":"past","desc":"This is a description."},
    {"id":2,"lane":2,"start":new Date("2012-01-26T00:00:00.000Z"),"end":new Date("2012-01-28T00:00:00.000Z"),"class":"past","desc":"This is a description."},
    {"id":3,"lane":2,"start":new Date("2012-01-31T00:00:00.000Z"),"end":new Date("2012-02-06T00:00:00.000Z"),"class":"past","desc":"This is a description."},
    {"id":4,"lane":2,"start":new Date("2012-01-22T00:00:00.000Z"),"end":new Date("2012-01-23T00:00:00.000Z"),"class":"past","desc":"This is a description."},
    {"id":5,"lane":2,"start":new Date("2012-01-26T00:00:00.000Z"),"end":new Date("2012-01-28T00:00:00.000Z"),"class":"past","desc":"This is a description."},
    {"id":6,"lane":2,"start":new Date("2012-01-22T00:00:00.000Z"),"end":new Date("2012-01-23T00:00:00.000Z"),"class":"past","desc":"This is a description."},
    {"id":7,"lane":2,"start":new Date("2012-01-26T00:00:00.000Z"),"end":new Date("2012-01-28T00:00:00.000Z"),"class":"past","desc":"This is a description."},
    {"id":8,"lane":2,"start":new Date("2012-01-31T00:00:00.000Z"),"end":new Date("2012-02-06T00:00:00.000Z"),"class":"past","desc":"This is a description."}
  ];

  // var items = [
  //   {id:0,
  //     lane:0,
  //     start:new Date(),
  //     end:new Date()
  //   },
  //   {},
  //   {}
  // ];

  var items = itemString;

  var lanes = [
    {id:0, label:'Startup'},
    {id:1, label:'Working Exp'},
    {id:2, label:'Education'}
  ];

  var getRealData = function() {
    return {
      items:items,
      lanes:lanes
    };
  };

  /**
  * Allow library to be used within both the browser and node.js
  */
  var root = typeof exports !== "undefined" && exports !== null ? exports : window;
  root.realData = getRealData();

}).call(this);