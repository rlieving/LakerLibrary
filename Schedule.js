'use strict';

/*
    definition: a schedule is an array of games
    public methods:
        * wins: returns int of wins
        * losses: returns int of losses
        * ties: returns int of ties
*/
Laker.Schedule = function(data) {

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

  $.each(data.feed.entry, function(idx, val) {

    sched.push(new Laker.Game(validate(val.title.$t).toDate(), val.content
      .$t));

    switch (sched[idx].result) {

      case 'W':
        sched.wins += 1;
        break;

      case 'L':
        sched.losses += 1;
        break;

      case 'T':
        sched.ties += 1;
        break;
    }

    if (sched[idx].played) {
      sched.goalsFor += sched[idx].lscore;
      sched.goalsAgainst += sched[idx].oscore;
    }

  });

  sched.sort(function(g1, g2) {
    //return g1.gamedate - g2.gamedate;
    return g2.gamedate - g1.gamedate;
  });

  return sched;
};
