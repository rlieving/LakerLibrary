$(function() {

  var teamConfig = [{
    "cn": "varsity",
    "title": "Varsity"
  }, {
    "cn": "jv",
    "title": "Junior Varsity"
  }, {
    "cn": "sophomore",
    "title": "Sophomore"
  }, {
    "cn": "freshman",
    "title": "Freshman"
  }];

  function statTable(team) {

    var tbl = new Laker.html.Table({
        "class": "scoreboard",
        "id": team.name
      }),
      row = {},
      label = {
        "class": "label"
      },
      stats = {
        "class": "stats"
      };

    // create team row
    row = tbl.createRow();
    row.addTd(team.name, {
      "class": "team",
      "colspan": "5"
    });
    tbl.Rows.add(row);

    // create label row
    row = tbl.createRow(null, label);
    row.addTd("W").addTd("L").addTd("T").addTd("GF").addTd("GA");
    tbl.Rows.add(row);

    // create stats row
    row = tble.createRow(null, stats);
    row.addTd(sched.wins).addTd(sched.losses).addTd(sched.ties);
    row.addTd(sched.goalsFor).addTd(sched.goalsAgainst);
    tbl.Rows.add(row);

    return tbl.toString();

  }

  //$(".scoreboard").fadeIn(3000);
  $.getJSON(Laker.Connection(teamConfig.cn, "scores"));

});
