"use strict";

$(function () {
  
    var teamCn = function () {
        var current = document.URL.toLowerCase(),
            page = ["freshman", "sophomore", "junior-varsity", "varsity"],
            teamName;
        
        $.each(page, function(idx, team) {
          teamName = team;
          if (current.indexOf(teamName) > 0) { return false; }
        });
        
        return teamName;
    }(),
    
    tblTitle = function() {
        
        var v = {
            "freshman": "Freshman",
            "sophomore": "Sophomore",
            "junior-varsity": "Junior Varsity",
            "varsity": "Varsity"
        };
        
        return v[teamCn];
    }();
    
    // return the row class based on even/odd row and highlight
    function rowClass (rowNum, highlight) {
            
            var c = (rowNum % 2 === 0) ? "even_row" : "odd_row";
            c += highlight ? " highlight" : "";
            
            return { "class" : c };
    }
    
    function ApplyCss() {
        // shortcut to laker styles
        var st = Laker.style,
            center = { "text-align" : "center"},
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
  
    $.getJSON(Laker.Connection(teamCn, "scores"), 

        function (data) {
          
          // return the string that publishes the game result
          var gameResult = function (game) {
            var r = "";
            if (game.result.length > 0) {
               r = game.result + "&nbsp;" + game.get("lakerscore") + "-" 
                + game.get("opponentscore");
            }
            return r;
          },
          
          // create a new schedule from the json data
          sched = new Laker.Schedule(data),
          // new table object
          tbl = new Laker.html.Table({"class": "laker_table"}),
          // new table header object
          header = tbl.createHeader({}, {"class": "laker_head"}),
          // row object
          row = {};
          
          tbl.createTitle("2015 " + tblTitle + " Schedule", 
            {"class": "laker_title"});
          
          // add header columns
          header.addTd("DATE").addTd("OPPONENT");
          header.addTd("LOCATION").addTd("RESULT");
          
          // iterate through each game on the schedule
          $.each(sched, function(num, game) {
            
            // create a table row with row and td classes
            row = tbl.createRow(rowClass(num, (game.result === "W")), 
              {"class": "laker_data"});
            
            // add table data to the row
            row.addTd(game.gamedate).addTd(game.get("opponent"));
            row.addTd(game.get("gamelocation")).addTd(gameResult(game));
            
            // add the row to the table
            tbl.Rows.add(row);
          });
          
          // write the scores to the page
          $("#scores").append(tbl.toString());
          
          ApplyCss();
    });
    
    $.getJSON(Laker.Connection(teamCn, "roster"),
    
        function (data) {
           
           var team = new Laker.Team(data),
               tbl = new Laker.html.Table({ "class" : "laker_table"}),
          // new table header object
          header = tbl.createHeader({}, { "class" : "laker_head"}),
          headctr = { "class" : "laker_head_ctr" },
          datactr = { "class" : "laker_data_ctr" },
          // row object
          row = {};
          
          tbl.createTitle(tblTitle + " Roster", {"class": "laker_title"});
          
          header.addTd("NAME").addTd("JERSEY", headctr);
          header.addTd("GRADE", headctr).addTd("POSITION", headctr);
          
          $.each(team, function(num, player) {
              row = tbl.createRow(rowClass(num, player.isCaptain), 
              {"class" : "laker_data"});
              
              row.addTd(player.fullName).addTd(player.get("number"), datactr);
              row.addTd(player.get("grade"),datactr);
              row.addTd(player.get("position"), datactr);
              
              tbl.Rows.add(row);
          });
          
          $("#roster").append(tbl.toString());
          
          ApplyCss();
          
        });
});