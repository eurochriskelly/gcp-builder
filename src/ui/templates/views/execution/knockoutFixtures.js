const { processTeamName, formatScore } = require('../../../utils');
const { formatCategory } = require('../../../utils/categoryFormatter');

module.exports = function generateKnockoutFixtures(data) {
    let html = '<div id="knockout-fixtures">';
    let currentCategory = null;
    const headers = ['Stage', 'Team 1', 'Score', 'Team 2', 'Score'];
    
    data.forEach(row => {
        if (row.category !== currentCategory) {
            if (currentCategory !== null) html += '</table>';
            currentCategory = row.category;
            html += `
                <table class="knockout-table">
                <colgroup>
                    <col class="col-stage">
                    <col class="col-team">
                    <col class="col-score">
                    <col class="col-team">
                    <col class="col-score">
                </colgroup>
                <tr><th colspan="${headers.length}" class="category-header">${formatCategory(currentCategory)}</th></tr>
                <tr>${headers.map(h => `<th class="table-header ${h === 'Score' ? 'text-right' : 'text-left'}">${h}</th>`).join('')}</tr>
            `;
        }
        html += '<tr>';
        html += `<td>${row.stage ? formatCategory(row.stage) : 'N/A'}</td>`;
        const { teamName: team1Name, teamStyle: team1Style } = processTeamName(row.team1);
        const { teamName: team2Name, teamStyle: team2Style } = processTeamName(row.team2);
        let team1Score = formatScore(row.goals1, row.points1);
        let team2Score = formatScore(row.goals2, row.points2);
        if (row.outcome === 'not played') {
            if (row.goals1 === 0 && row.points1 === 0 && row.goals2 === 0 && row.points2 === 1) {
                team1Score = 'concede';
                team2Score = 'walked';
            } else if (row.goals2 === 0 && row.points2 === 0 && row.goals1 === 0 && row.points1 === 1) {
                team1Score = 'walked';
                team2Score = 'concede';
            } else if (row.goals1 === 0 && row.points1 === 0 && row.goals2 === 0 && row.points2 === 0) {
                team1Score = 'shared';
                team2Score = 'shared';
            }
        }
        const score1Style = team1Score === 'N/A' ? 'text-gray-400' : '';
        const score2Style = team2Score === 'N/A' ? 'text-gray-400' : '';
        const specialScores = ['shared', 'walked', 'concede'];
        const score1ExtraClass = specialScores.includes(team1Score) ? 'text-orange-600' : '';
        const score2ExtraClass = specialScores.includes(team2Score) ? 'text-orange-600' : '';
        const extractScore = score => {
            const match = score.match(/\((\d+)\)/);
            return match ? parseInt(match[1], 10) : 0;
        };
        const score1Value = extractScore(team1Score);
        const score2Value = extractScore(team2Score);
        let team1ScoreClass = '', team2ScoreClass = '';
        if (score1Value > score2Value) {
            team1ScoreClass = 'score-winner';
            team2ScoreClass = 'score-loser';
        } else if (score1Value < score2Value) {
            team1ScoreClass = 'score-loser';
            team2ScoreClass = 'score-winner';
        } else {
            team1ScoreClass = team2ScoreClass = 'score-draw';
        }
        const team1WinnerClass = score1Value > score2Value ? 'team-winner' : '';
        const team2WinnerClass = score2Value > score1Value ? 'team-winner' : '';
        html += `<td class="${team1ScoreClass} ${team1WinnerClass}" style="${team1Style}">${team1Name || 'N/A'}</td>`;
        html += `<td class="${team1ScoreClass}" style="text-align: right;">${team1Score.toUpperCase()}</td>`;
        html += `<td class="${team2ScoreClass} ${team2WinnerClass}" style="${team2Style}">${team2Name || 'N/A'}</td>`;
        html += `<td class="${team2ScoreClass}" style="text-align: right;">${team2Score.toUpperCase()}</td>`;
        html += '</tr>';
    });
    if (currentCategory !== null) html += '</table>';
    html += '</div>';
    return html;
};
