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
    sched.goalsFor = 0;
    sched.goalsAgainst = 0;

    function validate(dtString) {

        var d = moment(dtString, "M/D/YYYY");

        return d.isValid() ? d : moment(Laker.utility.defaultDate);
    }

    function gameSort(g1, g2) {

      return g1.gamedate - g2.gamedate;
    }

    $.each(data.feed.entry, function (idx, val) {

        sched.push(new Laker.Game(validate(val.title.$t).toDate(), val.content.$t));

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

        if (sched[idx].played) {
          sched[idx].goalsFor += sched[idx].lscore;
          sched[idx].goalsAgainst += sched[idx].oscore;
        }

    });

    sched.sort(gameSort);

    return sched;
};
