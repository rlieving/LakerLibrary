'use strict';

/*
    definition: a schedule is an array of games
    public methods: 
        * wins: returns int of wins
        * losses: returns int of losses 
        * ties: returns int of ties
*/
Laker.Schedule = function (data) {

    var sched = [];

    sched.wins = 0;
    sched.losses = 0;
    sched.ties = 0;

    $.each(data.feed.entry, function (idx, val) {

        sched.push(new Laker.Game(val.title.$t, val.content.$t));

        switch (sched[idx].result) {

        case 'W':
            sched.wins += 1;
            break;

        case 'L':
            sched.losses += 1;
            break;

        default:
            sched.ties += 1;
            break;
        }
    });

    return sched;
};

