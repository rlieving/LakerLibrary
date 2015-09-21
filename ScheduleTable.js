"use strict";

$(function() {

  var config = [{
    "cn": "varsity",
    "divSched": "#varsity-scores",
    "divRoster": "#varsity-roster",
    "titleSched": "2015 Varsity Schedule",
    "titleRoster": "2015 Varisty Roster"
  }, {
    "cn": "jv",
    "divSched": "#jv-scores",
    "divRoster": "#jv-roster",
    "titleSched": "2015 Junior Varsity Schedule",
    "titleRoster": "2015 Junior Varisty Roster",
  }, {
    "cn": "sophomore",
    "divSched": "#sophomore-scores",
    "divRoster": "#sophomore-roster",
    "titleSched": "2015 Sophomore Schedule",
    "titleRoster": "2015 Sophomore Roster"
  }, {
    "cn": "freshman",
    "divSched": "#freshman-scores",
    "divRoster": "#freshman-roster",
    "titleSched": "2015 Freshman Schedule",
    "titleRoster": "2015 Freshman Roster"
  }];

  // return the row class based on even/odd row and highlight
  function rowClass(rowNum, highlight) {

    var c = (rowNum % 2 === 0) ? "even_row" : "odd_row";
    c += highlight ? " highlight" : "";

    return {
      "class": c
    };
  }

  function applyCss() {
    // shortcut to laker styles
    var st = Laker.style,
      center = {
        "text-align": "center"
      },
      hdrCtr = $.extend({}, st.lakerHeader, center),
      datCtr = $.extend({}, st.lakerData, center);

    // apply css styles to the table
    $(".laker_title").css(st.lakerTitle);
    $(".laker_table").css(st.lakerTable);
    $(".laker_head").css(st.lakerHeader);
    $(".laker_head_ctr").css(hdrCtr);
    $(".laker_data").css(st.lakerData);
    $(".laker_data_ctr").css(datCtr);
    $(".even_row").css(st.evenRow);
    $(".highlight").css(st.highlightRow);
  }

  function writeSchedule(teamConfig) {

    $.getJSON(Laker.Connection(teamConfig.cn, "scores"),

      function(data) {

        // return the string that publishes the game result
        var gameResult = function(game) {
            var r = "";
            if (game.result.length > 0) {
              r += game.result === "W" ? "" : "&nbsp;";
              r += game.result + "&nbsp;" + game.get("lakerscore");
              r += "-" + game.get("opponentscore");
            }
            return r;
          },

          // create a new schedule from the json data
          sched = new Laker.Schedule(data),

          title = teamConfig.titleSched + "&nbsp;({0} - {1} - {2})",

          // new table object
          tbl = new Laker.html.Table({
            "class": "laker_table"
          }),
          // new table header object
          header = tbl.createHeader({}, {
            "class": "laker_head"
          }),
          // row object
          row = {};

        title = title.replace("{0}", sched.wins).replace("{1}", sched.losses);
        title = title.replace("{2}", sched.ties);
        //title = title.replace("{3}", sched.goalsFor).replace("{4}", sched
        //  .goalsAgainst);

        tbl.createTitle(title, {
          "class": "laker_title"
        });

        // add header columns
        header.addTd("DATE").addTd("OPPONENT");
        header.addTd("LOCATION").addTd("RESULT");

        // iterate through each game on the schedule
        $.each(sched, function(num, game) {

          // create a table row with row and td classes
          row = tbl.createRow(rowClass(num, (game.result === "W")), {
            "class": "laker_data"
          });

          // add table data to the row
          row.addTd(moment(game.gamedate).format('MM/DD/YYYY'));
          row.addTd(game.get("opponent")).addTd(game.get(
            "gamelocation"));
          row.addTd(gameResult(game));

          // add the row to the table
          tbl.Rows.add(row);
        });

        // write the scores to the page
        $(teamConfig.divSched).append(tbl.toString());

        applyCss();
      });

  }

  function writeRoster(teamConfig) {

    $.getJSON(Laker.Connection(teamConfig.cn, "roster"),

      function(data) {

        var team = new Laker.Team(data),
          tbl = new Laker.html.Table({
            "class": "laker_table"
          }),
          // new table header object
          header = tbl.createHeader({}, {
            "class": "laker_head"
          }),
          headctr = {
            "class": "laker_head_ctr"
          },
          datactr = {
            "class": "laker_data_ctr"
          },
          // row object
          row = {};

        tbl.createTitle(teamConfig.titleRoster, {
          "class": "laker_title"
        });

        header.addTd("NAME").addTd("JERSEY", headctr);
        header.addTd("GRADE", headctr).addTd("POSITION", headctr);

        $.each(team, function(num, player) {
          row = tbl.createRow(rowClass(num, player.isCaptain), {
            "class": "laker_data"
          });

          row.addTd(player.fullName).addTd(player.get("number"),
            datactr);
          row.addTd(player.get("grade"), datactr);
          row.addTd(player.get("position"), datactr);

          tbl.Rows.add(row);
        });

        $(teamConfig.divRoster).append(tbl.toString());

        applyCss();

      });
  }

  $.each(config, function(idx, team) {

    if ($(team.divSched).length) {
      writeSchedule(team);
    }

    if ($(team.divRoster).length) {
      writeRoster(team);
    }
  });

});
