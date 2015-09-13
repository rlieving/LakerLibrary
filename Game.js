'use strict';

/*
    definition: a game is the lowest unit
    public methods:
        * get(method-name) - gets dynamically appended properties
            and fails silently
        * result: returns W, L or T
*/
Laker.Game = function (gDate, gString) {

    var g = {}, pname;

    g.gamedate = gDate;

    Laker.utility.applyGoogleRecord(g, gString);

    // allows the object to pass back a null string if the
    // property doesn't exist
    g.get = Laker.utility.get;
    g.lscore = 0;
    g.oscore = 0;

    g.played = function() {

      g.lscore = parseInt(g.get('lakerscore'), 10);
      g.oscore = parseInt(g.get('opponentscore'), 10);

      return !isNaN(g.lscore) && !isNaN(g.oscore);
    }();

     // private method to calculate the game result
      g.result = function getResult() {

        var val = '';

        if (g.played) {
            if (g.lscore > g.oscore) {
                val = 'W';
            } else if (g.lscore < g.oscore) {
                val = 'L';
            } else {
                val = 'T';
            }
        }
        return val;
    }();

    return g;
};
