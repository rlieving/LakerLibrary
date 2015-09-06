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

    g.gamedate = gDate.trim();

    Laker.utility.applyGoogleRecord(g, gString);

    // allows the object to pass back a null string if the
    // property doesn't exist
    g.get = Laker.utility.get;
    
     // private method to calculate the game result
    function getResult() {
        var val = '', ls, os;

        ls = parseInt(g.get('lakerscore'), 10);
        os = parseInt(g.get('opponentscore'), 10);

        if (!isNaN(ls) && !isNaN(os)) {
            if (ls > os) {
                val = 'W';
            } else if (ls < os) {
                val = 'L';
            } else {
                val = 'T';
            }
        }
        return val;
    }

    g.result = getResult();

    return g;
};