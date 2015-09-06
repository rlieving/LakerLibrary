'use strict';

/*
    definition: connection URL to team data
    public methods: 
        (none)
    returns: url connection to JSON team data
*/
Laker.Connection = function dataURL(team, type) {

    var key = {
            varsity: '1qNuIpmdnSH0ecn70ubB6RdVZnhft-05uSg5F-U-ufBg',
            "junior-varsity": '1Oa-YOdpg7jZJy0LWHE57jNsiyTP9QYjXXv4riAK_xLk',
            sophomore: '13DrM1fjPJz-mjsUIbc3DIszJhj2bUpYeRWaMK2afnnc',
            freshman: '1XWmWiI1GAlO1K18K8qZjERrjTT2ZJNQX_IS7hrxLWB4'
        },
        sNum = {
            scores: '1',
            roster: '2'
        },

        url = 'https://spreadsheets.google.com/feeds/list/'
                + 'teamKey/sNumType/public/basic?alt=json';

    return url.replace('teamKey', key[team]).replace('sNumType', sNum[type]);
};