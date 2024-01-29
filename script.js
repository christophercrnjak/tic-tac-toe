let fields = [
    null, // 0
    'circle', // 1
    null, // 2
    null, // 3
    'cross', // 4
    null, // 5
    null, // 6
    null, // 7
    null  // 8
];

function init() {
    render();
}

function render() {
    const contentDiv = document.getElementById('content');

    // Generate table HTML
    let tableHTML = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHTML += `<tr>`;
        for (j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'circle') {
                symbol = generateAnimatedCircleSVG();
            } else if (fields[index] === 'cross') {
                symbol = generateAnimatedCrossSVG();
            }
            tableHTML += `<td>${symbol}</td>`;
        }
        tableHTML += `<tr>`;
    }
    tableHTML += `</table>`;

    // Set table HTML to contentDiv
    contentDiv.innerHTML = tableHTML;
}

function generateAnimatedCircleSVG() {
    // Variablen für Höhe, Breite und Farbe
    const width = 70;
    const height = 70;
    const color = "#00B0EF";
    const animationDuration = 125;

    const radius = width / 2 - 5;
    const circumference = 2 * Math.PI * radius;

    const svgCode = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="${width / 2}" cy="${height / 2}" r="${radius}" fill="transparent" stroke="${color}" stroke-width="5"
                stroke-dasharray="${circumference}" stroke-dashoffset="${circumference}">
                <animate attributeName="stroke-dashoffset" values="${circumference};0" dur="${animationDuration}ms" keyTimes="0;1" begin="0s" repeatCount="1" fill="freeze" />
            </circle>
        </svg>
    `;

    return svgCode;
}

function generateAnimatedCrossSVG() {
    // Variablen für Breite, Höhe und Farbe
    const width = 70;
    const height = 70;
    const color = "#FFC000";
    const animationDuration = 200; // Animation dauert 200ms

    const svgCode = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <!-- Vertikale Linie des Kreuzes -->
            <line x1="${width / 2}" y1="0" x2="${width / 2}" y2="${height}" stroke="${color}" stroke-width="5">
                <animate attributeName="y2" values="0;${height}" dur="${animationDuration}ms" keyTimes="0;1" begin="0s" repeatCount="1" fill="freeze" />
            </line>

            <!-- Horizontale Linie des Kreuzes -->
            <line x1="0" y1="${height / 2}" x2="${width}" y2="${height / 2}" stroke="${color}" stroke-width="5">
                <animate attributeName="x2" values="0;${width}" dur="${animationDuration}ms" keyTimes="0;1" begin="0s" repeatCount="1" fill="freeze" />
            </line>
        </svg>
    `;

    return svgCode;
}