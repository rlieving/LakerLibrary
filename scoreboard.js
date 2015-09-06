"use strict";

$(function () {

    function getURL() {
      
      var url = "https://spreadsheets.google.com/feeds/list/" 
          + "{0}/1/public/basic?alt=json",
        
        key = {
          varsity: "1qNuIpmdnSH0ecn70ubB6RdVZnhft-05uSg5F-U-ufBg",
          jv: "1Oa-YOdpg7jZJy0LWHE57jNsiyTP9QYjXXv4riAK_xLk",
          sophomore: "13DrM1fjPJz-mjsUIbc3DIszJhj2bUpYeRWaMK2afnnc",
          freshman: "1XWmWiI1GAlO1K18K8qZjERrjTT2ZJNQX_IS7hrxLWB4"
        },
        current;
        
        current = document.URL.toLowerCase();
        
        if (current.indexOf("freshman") > 0) {
          url = url.replace("{0}", key.freshman);
            
        } else if (current.indexOf("junior-varsity.") > 0) {
          url = url.replace("{0}", key.jv);
          
        } else if (current.indexOf("sophomore") > 0) {
          url = url.replace("{0}", key.sophomore);
          
        } else {
            url = url.replace("{0}", key.varsity);
        }
        return url;
    }

    function Game(gDate, gString){
        var o = {}, s, p, pname, pval;
        
        o.gamedate = gDate.trim();
        
        s = gString.split(",");
        for (p = 0; p < s.length; p += 1) {
          
          pname = s[p].split(":")[0].trim();
          pval = s[p].split(":")[1].trim();
                    
          o[pname] = pval;
          
        }
        
        o.get = function(propName) {
          var val = "";
          if (o.hasOwnProperty(propName)) {
            val = o[propName];
          }
          return val;
        };
        
        o.result = function() {
          var val = "", ls, os;
          
          ls = parseInt(o.get("lakerscore"), 10);
          os = parseInt(o.get("opponentscore"), 10);
          
          if (!isNaN(ls) && !isNaN(os)) {
            if(ls > os) {
              val = "W";
            } else if (ls < os){
              val = "L";
            } else {
              val = "T";
            }
          }
          return val;
        };
        
        return o;
    }
    
    function displayPropertyNames(obj) {
        var names = "", name;
        for(name in obj) {names += name + "\n";}
    }
  
    function parseSched(data){
        
      var x, e, sched = [];
      e = data.feed.entry;
      for (x = 0; x < e.length; x += 1) {
        sched[x] = new Game(e[x].title.$t, e[x].content.$t);
      }
      return sched;
    }
    
    function td(val){
        return "<td class='laker_data'>" + val + "</td>";
    }
    
    function th(val) {
        return "<th class='laker_head'>" + val + "</th>";
    }
    
    function tableRow(score, rowNum){
      
      var altClass, winClass, altWinClass, gameResult, tr, s;
      
      altClass = rowNum % 2 === 0 ? "even_row" : "odd_row";
      gameResult = score.result();
      s="";
      if (gameResult.length > 0) {
        winClass = gameResult === "W" ? "win" : "loss";
        s = gameResult + "&nbsp;" + score.get("lakerscore") + "-" 
          + score.get("opponentscore");
      }
      altWinClass = altClass + " " + winClass;
      tr = "<tr class= '" + altWinClass.trim() + "'>"
        + td(score.gamedate) + td(score.get("opponent")) 
        + td(score.get("gamelocation")) 
        + td(s) + "</tr>";
        
      return tr;
    }
  
    $.getJSON(getURL(), 
    
        function (data) {
          var lakerResults = {
            "border-collapse": "collapse",
            "margin-top": "10px",
            width: "100%"
            },
        
        lakerHeader = {
            "background-color":  "#7D7D7D",
            color: "#FFFFFF",
            "font-weight": "normal",
            padding: "5px",
            border: "solid #A9A9A9 1px",
            margin: "0",
            "text-align": "left"
        },
        
        lakerData = {
           "font-size": "90%",
           padding: "5px",
           margin: "0",
           border: "solid #A9A9A9 1px"
        },
        
        winRowStyle = {
          "font-weight": "bold",
          color: "#7E4E99"
        },
        
        eRowStyle = {  
            "background-color": "#D5D5D5",
            color: "#4A4949"
        },
        
        s, // scores data 
        t,   // div that table will be written to 
        tr,  // table row
        x;   // iterator
          
        s = parseSched(data);
          
          $("#scores").append("<table class='laker_results'></table>");
          t = $("#scores").children();
          tr = "<tr class='laker_head'>" + th('DATE') + th('OPPONENT') +
            th('LOCATION') + th('RESULT') + "</tr>";
          t.append(tr);  
          for(x = 0; x < s.length; x +=1) {
            t.append(tableRow(s[x], x));
            }
          $(".laker_results").css(lakerResults);
          $(".laker_head").css(lakerHeader);
          $(".laker_data").css(lakerData);
          $(".even_row").css(eRowStyle);
          $(".win").css(winRowStyle);
          
    });
});