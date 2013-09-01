(function() {

  var items = [
    {"id":0,"lane":4,"start":new Date("1999-09-01T00:00:00.000Z"),"end":new Date("2003-07-01T00:00:00.000Z"),"class":"past","desc":"B.S., Peking University"},
    {"id":1,"lane":4,"start":new Date("2004-09-01T00:00:00.000Z"),"end":new Date("2011-05-01T00:00:00.000Z"),"class":"past","desc":"Ph.D., UC Irvine"},
    {"id":3,"lane":3,"start":new Date("2003-10-01T00:00:00.000Z"),"end":new Date("2004-07-01T00:00:00.000Z"),"class":"past","desc":"Associate Consultant, N-Dynamics"},
    {"id":4,"lane":3,"start":new Date("2011-05-01T00:00:00.000Z"),"end":new Date("2013-05-01T00:00:00.000Z"),"class":"past","desc":"Senior Consultant, Gallup"},
    {"id":5,"lane":2,"start":new Date("2006-08-01T00:00:00.000Z"),"end":new Date("2012-05-01T00:00:00.000Z"),"class":"past","desc":"Co-founder, DealsVista.com"},
    {"id":6,"lane":1,"start":new Date("2011-01-01T00:00:00.000Z"),"end":new Date("2012-05-01T00:00:00.000Z"),"class":"past","desc":"Co-founder, AskBot.com"},
    {"id":7,"lane":0,"start":new Date("2013-06-17T00:00:00.000Z"),"end":new Date("2013-09-14T00:00:00.000Z"),"class":"past","desc":"Software Engineer, HackReactor"}
  ];

  var lanes = [
    {id:0, label:'Startup'},
    {id:1, label:'Startup'},
    {id:2, label:'Startup'},
    {id:3, label:'Work'},
    {id:4, label:'Edu'}
  ];

  var getRealData = function() {
    return {
      items:items,
      lanes:lanes
    };
  };

  window.realData = getRealData();

}).call(this);