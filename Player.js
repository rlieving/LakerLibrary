'use strict';

/*
    definition: a player
    public methods: 
        * get(method-name) - gets dynamically appended properties
            and fails silently
*/
Laker.Player = function (gData) {
    
    var p = {}, isCaptain = "";
    
    p.firstname = gData.title.$t;
    
    p.get = Laker.utility.get;
    Laker.utility.applyGoogleRecord(p, gData.content.$t);
    
    p.isCaptain = p.get("captain").length > 0;
    
    p.fullName = p.firstname + " " + p.get("lastname");
    
    return p;
    
};
