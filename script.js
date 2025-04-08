const puzzleContainer = document.getElementById('puzzle');
const imageUrl = 'rocco-cover.jpg'; // Path to your image file
let pieces = [];

function createPuzzle() {
  let pieceId = 0;

  // Create 9 pieces (3x3 puzzle)
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const piece = document.createElement('div');
      piece.classList.add('piece');
      piece.style.backgroundImage = `url(${imageUrl})`;
      piece.style.backgroundPosition = `-${col * 100}px -${row * 100}px`; // Adjust size for the puzzle pieces
      piece.style.gridColumn = col + 1;
      piece.style.gridRow = row + 1;
      piece.setAttribute('data-id', pieceId);
      piece.setAttribute('draggable', true);
      piece.addEventListener('dragstart', dragStart);
      piece.addEventListener('dragover', dragOver);
      piece.addEventListener('drop', drop);
      piece.addEventListener('dragend', dragEnd);
      
      pieces.push(piece);
      pieceId++;
    }
  }

  // Append pieces to puzzle container
  pieces.forEach(piece => puzzleContainer.appendChild(piece));
}

// Shuffle puzzle pieces
document.getElementById('shuffle').addEventListener('click', shufflePuzzle);

function shufflePuzzle() {
  let shuffledPieces = [...pieces];
  shuffledPieces.sort(() => Math.random() - 0.5); // Randomly shuffle the pieces

  // Rearrange the shuffled pieces in the container
  shuffledPieces.forEach(piece => puzzleContainer.appendChild(piece));
}

// Drag and Drop functionality
let draggedPiece = null;

function dragStart(e) {
  draggedPiece = this;
  setTimeout(() => {
    this.style.visibility = 'hidden'; // Hide the dragged piece
  }, 0);
}

function dragOver(e) {
  e.preventDefault(); // Allow drop
}

function drop(e) {
  e.preventDefault();
  if (this !== draggedPiece) {
    const draggedId = draggedPiece.getAttribute('data-id');
    const targetId = this.getAttribute('data-id');
    const draggedIndex = pieces.findIndex(piece => piece.getAttribute('data-id') === draggedId);
    const targetIndex = pieces.findIndex(piece => piece.getAttribute('data-id') === targetId);

    // Swap pieces positions
    [pieces[draggedIndex], pieces[targetIndex]] = [pieces[targetIndex], pieces[draggedIndex]];
    [draggedPiece.style.gridColumn, this.style.gridColumn] = [this.style.gridColumn, draggedPiece.style.gridColumn];
    [draggedPiece.style.gridRow, this.style.gridRow] = [this.style.gridRow, draggedPiece.style.gridRow];
  }
}

function dragEnd() {
  draggedPiece.style.visibility = 'visible'; // Restore visibility
  draggedPiece = null;
}

// Initialize the puzzle
createPuzzle();
