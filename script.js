// Function to create the game grid
function createGrid() {
    const grid = document.querySelector('.grid');
    const cards = [];

    // Create pairs of cards
    for (let i = 1; i <= 8; i++) {
        cards.push({ value: i, flipped: false, revealed: false });
        cards.push({ value: i, flipped: false, revealed: false });
    }

    // Shuffle the cards
    cards.sort(() => Math.random() - 0.5);

    // Create card elements
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card', 'hidden');
        cardElement.dataset.index = index;
        cardElement.textContent = '';
        grid.appendChild(cardElement);
    });

    return cards;
}

// Initialize game variables
let cards = createGrid();
let flippedCards = [];
let attempts = 0;
let matches = 0;

// Function to flip a card
function flipCard(cardElement) {
    const index = parseInt(cardElement.dataset.index);
    const card = cards[index];

    if (!card.flipped && !card.revealed) {
        cardElement.textContent = card.value;
        cardElement.classList.remove('hidden');
        cardElement.classList.add('flipped');
        card.flipped = true;

        flippedCards.push({ index, value: card.value, element: cardElement });

        if (flippedCards.length === 2) {
            attempts++;
            document.getElementById('attempts').textContent = attempts;

            // Check if cards match
            if (flippedCards[0].value === flippedCards[1].value) {
                matches++;
                document.getElementById('matches').textContent = matches;

                // Reveal matched cards
                cards[flippedCards[0].index].revealed = true;
                cards[flippedCards[1].index].revealed = true;

                flippedCards[0].element.classList.add('revealed');
                flippedCards[1].element.classList.add('revealed');
            } else {
                // Hide non-matched cards after a delay
                setTimeout(() => {
                    flippedCards[0].element.textContent = '';
                    flippedCards[0].element.classList.remove('flipped');
                    flippedCards[1].element.textContent = '';
                    flippedCards[1].element.classList.remove('flipped');

                    cards[flippedCards[0].index].flipped = false;
                    cards[flippedCards[1].index].flipped = false;
                }, 1000);
            }

            // Reset flipped cards array
            flippedCards = [];
        }
    }
}

// Add event listeners to cards
document.querySelectorAll('.card').forEach((cardElement) => {
    cardElement.addEventListener('click', () => {
        flipCard(cardElement);
    });
});
