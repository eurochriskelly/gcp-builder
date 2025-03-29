const { allowedViews } = require('../../config/allowedViews');

function generateEventManager(tournamentId, uuid, tournament, isLoggedIn = false) {
    // Use CSS classes instead of inline styles
    let html = '<div id="event-manager" class="event-manager-container">'; 
    // Restore mx-auto for centering (assuming Tailwind is active)
    html += `<div class="event-manager-header">
                <h2 class="mx-auto">${tournament.Title || tournament.title || 'Event'}</h2>
                <p class="text-3xl m-4 mb-8 mx-auto">${tournament.Date ? tournament.Date.substring(0,10) : tournament.date || ''} | ${tournament.Location || tournament.location || ''}</p>
             </div>`;
    html += '<nav class="event-manager-nav competition-nav mb-4">';
    html += '<div class="event-manager-nav-inner">';
    html += '<span class="mr-4 font-semibold">Competitions:</span>';

    // Generate links for Competitions
    console.log('Tournament data:', tournament); // Debug logging

    // Check if tournament.categories is a non-empty array
    const competitions = Array.isArray(tournament.categories) ? tournament.categories : [];
    if (competitions.length > 0) {
        competitions.forEach(compName => { // Iterate directly over the array elements (names)
            const encodedCompName = encodeURIComponent(compName); // Encode the actual name
            // Target the new select-competition endpoint to get OOB menu + default view
            html += `
                <a href="/event/${uuid}/view7?competition=${encodedCompName}" 
                   hx-get="/event/${uuid}/select-competition?competition=${encodedCompName}" 
                   hx-target="#content" 
                   hx-swap="innerHTML"
                   class="event-manager-link competition-link">
                    ${compName}
                </a>`;
        });
    } else {
        // Updated error handling for clarity
        html += '<div class="text-gray-500 p-4 bg-yellow-50 rounded">';
        html += '<p>No competitions found in tournament data.</p>';
        if (tournament.categories === undefined) {
            html += '<p class="text-sm">(Reason: tournament.categories is undefined)</p>';
        } else if (tournament.categories === null) {
            html += '<p class="text-sm">(Reason: tournament.categories is null)</p>';
        } else if (!Array.isArray(tournament.categories)) {
             html += `<p class="text-sm">(Reason: Expected tournament.categories to be an array, but got type: ${typeof tournament.categories})</p>`;
        } else { // It is an array, but empty
             html += '<p class="text-sm">(Reason: tournament.categories is an empty array)</p>';
        }
        html += '</div>';
    }

    html += '</div></nav>';

    // Add container for competition-specific content
    html += '<div id="competition-content" class="competition-content-container p-4 border-t border-gray-200">';
    html += '<p class="text-gray-600">Select a competition above to view details.</p>';
    html += '</div>';
    html += '</div>';

    if (isLoggedIn) {
        html += `<script src="/scripts/tournamentSelectionScripts.js"></script>`;
    }

    return html;
}

module.exports = { generateEventManager };
