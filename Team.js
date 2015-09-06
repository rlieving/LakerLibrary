'use strict';

/*
    definition: a team is an array of players
    public methods: 
        * get(method-name) - gets dynamically appended properties
            and fails silently
*/
Laker.Team = function (data) {
    
    var team = [], player = {};
    
    $.each(data.feed.entry, function(idx, val) {
       player = new Laker.Player(val);
       team.push(player);
    });

    return team;
};