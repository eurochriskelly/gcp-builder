function processTeamName(teamName) {
    let teamStyle = '';
    if (teamName.startsWith('~match:')) {
        const match = teamName.match(/~match:(\d+)\/p:(\d+)/);
        if (match) {
            const fullMatchId = match[1];
            const participant = match[2];
            const NNN = fullMatchId.slice(-3);
            let role = participant === '1' ? 'WINNER' : 'LOSER';
            teamName = `${role} of ${NNN}`;
            teamStyle = 'color:grey;';
        } else {
            teamName = 'TBD';
            teamStyle = 'color:grey;';
        }
    }
    return { teamName, teamStyle };
}

function formatScore(goals, points) {
    if (goals === null || points === null) {
        return 'N/A';
    }
    const paddedPoints = points.toString().padStart(2, '0');
    const calculatedScore = (goals * 3 + points).toString().padStart(2, '0');
    return `${goals}-${paddedPoints} (${calculatedScore})`;
}

module.exports = { processTeamName, formatScore };
