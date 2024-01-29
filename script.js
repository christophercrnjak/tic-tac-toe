let fields = [
    null, // 0
    null, // 1
    null, // 2
    null, // 3
    null, // 4
    null, // 5
    null, // 6
    null, // 7
    null // 8
];

let currentPlayer = 'circle'; // Start with 'circle'

function init() {
    render();
}

function render() {
    const contentDiv = document.getElementById('content');

    // Generate table HTML
    let tableHTML = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHTML += `<tr>`;
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'circle' || fields[index] === 'cross') {
                symbol = generateSymbolSVG(fields[index]);
            }
            tableHTML += `<td onclick="handleClick(${index})">${symbol}</td>`;
        }
        tableHTML += `</tr>`;
    }
    tableHTML += `</table>`;

    // Set table HTML to contentDiv
    contentDiv.innerHTML = tableHTML;
}

// Function to handle the click event
function handleClick(index) {
    // Check if the field is already occupied
    if (fields[index] === null) {
        // Set the field with the current player's symbol
        fields[index] = currentPlayer;

        // Update the content of the clicked element
        const clickedElement = document.querySelector(`#content table tr:nth-child(${Math.floor(index / 3) + 1}) td:nth-child(${index % 3 + 1})`);
        clickedElement.innerHTML = generateSymbolSVG(currentPlayer);

        // Remove the onclick function of the clicked element
        clickedElement.removeAttribute('onclick');

        // Switch to the next player
        currentPlayer = (currentPlayer === 'circle') ? 'cross' : 'circle';
    }
}

function generateSymbolSVG(symbol) {
    // Generate SVG code based on the given symbol ('circle' or 'cross')
    return (symbol === 'circle') ? generateCircleSVG() : generateCrossSVG();
}

function generateCircleSVG() {
    // Variablen für Höhe, Breite und Farbe und Animationsdauer
    const width = 80;
    const height = 80;
    const color = "#00B0EF";
    const animationDuration = 125;

    const radius = width / 2 - 5;
    const circumference = 2 * Math.PI * radius;

    const svgCode = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" style="display: block; margin: auto;">
            <circle cx="${width / 2}" cy="${height / 2}" r="${radius}" fill="transparent" stroke="${color}" stroke-width="5"
                stroke-dasharray="${circumference}" stroke-dashoffset="${circumference}">
                <animate attributeName="stroke-dashoffset" values="${circumference};0" dur="${animationDuration}ms" keyTimes="0;1" begin="0s" repeatCount="1" fill="freeze" />
            </circle>
        </svg>
    `;

    return svgCode;
}

function generateCrossSVG() {
    // Variablen für Breite, Höhe und Farbe und Animationsdauer
    const width = 70;
    const height = 70;
    const color = "#FFC000";
    const animationDuration = 125; // Animation dauert 125ms

    const svgCode = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" style="display: block; margin: auto;">
            <!-- Diagonale Linie des Kreuzes (von links oben nach rechts unten) -->
            <line x1="0" y1="0" x2="${width}" y2="${height}" stroke="${color}" stroke-width="5">
                <animate attributeName="x2" values="0;${width}" dur="${animationDuration}ms" keyTimes="0;1" begin="0s" repeatCount="1" fill="freeze" />
                <animate attributeName="y2" values="0;${height}" dur="${animationDuration}ms" keyTimes="0;1" begin="0s" repeatCount="1" fill="freeze" />
            </line>

            <!-- Diagonale Linie des Kreuzes (von links unten nach rechts oben) -->
            <line x1="0" y1="${height}" x2="${width}" y2="0" stroke="${color}" stroke-width="5">
                <animate attributeName="x2" values="0;${width}" dur="${animationDuration}ms" keyTimes="0;1" begin="0s" repeatCount="1" fill="freeze" />
                <animate attributeName="y2" values="${height};0" dur="${animationDuration}ms" keyTimes="0;1" begin="0s" repeatCount="1" fill="freeze" />
            </line>
        </svg>
    `;

    return svgCode;
}