const generateRecentView = require('../templates/views/execution/recent');
const generateGroupFixtures = require('../templates/views/execution/groupFixtures');
const generateGroupStandings = require('../templates/views/execution/groupStandings');
const generateKnockoutFixtures = require('../templates/views/execution/knockoutFixtures');
const generateCardedPlayers = require('../templates/views/execution/cardedPlayers');
const generateMatchesByPitch = require('../templates/views/execution/matchesByPitch/index');
const generateFinalsResults = require('../templates/views/execution/finalsResults');

const { 
    getRecentMatches, 
    getGroupFixtures, 
    getGroupStandings,
    getKnockoutFixtures,
    getCardedPlayers,
    getMatchesByPitch,
    getFinalsResults
} = require('../queries/matches');

const allowedViews = {
    'view7': {
        title: 'Finals',
        generator: generateFinalsResults,
        fetch: getFinalsResults
    },
    'view2': {
        title: 'Group Games',
        generator: generateGroupFixtures,
        fetch: getGroupFixtures
    },
    'view3': {
        title: 'Group Tables',
        generator: generateGroupStandings,
        fetch: getGroupStandings
    },
    'view4': {
        title: 'Knockout Games',
        generator: generateKnockoutFixtures,
        fetch: getKnockoutFixtures
    }
};

module.exports = { allowedViews }
