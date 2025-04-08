// Image pieces for the puzzle
const imageUrl = 'rocco-cover.jpg'; // Your image file

// Create puzzle pieces and shuffle them
const puzzleContainer = document.getElementById('puzzle');
let pieces = [];

function createPuzzle() {
  let pieceId = 1;

  // Loop to create 9 puzzle pieces (3x3)
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const piece = document.createElement('div');
      piece.classList.add('piece');
      piece.style.backgroundImage = `url(${imageUrl})`;
      piece.style.backgroundPosition = `-${col * 200}px -${row * 200}px`;
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
  
  // Add pieces to puzzle container
  pieces.forEach(piece => puzzleContainer.appendChild(piece));
}

// Shuffle the pieces
document.getElementById('shuffle').addEventListener('click', shufflePuzzle);

function shufflePuzzle() {
  let shuffledPieces = [...pieces];
  
  shuffledPieces.sort(() => Math.random() - 0.5); // Shuffle the pieces randomly

  // Reorder pieces in the puzzle container
  shuffledPieces.forEach(piece => puzzleContainer.appendChild(piece));
}

// Drag and Drop functionality
let draggedPiece = null;

function dragStart(e) {
  draggedPiece = this;
  setTimeout(() => {
    this.style.visibility = 'hidden';
  }, 0);
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  if (this !== draggedPiece) {
    const draggedId = draggedPiece.getAttribute('data-id');
    const targetId = this.getAttribute('data-id');
    const draggedIndex = pieces.findIndex(piece => piece.getAttribute('data-id') === draggedId);
    const targetIndex = pieces.findIndex(piece => piece.getAttribute('data-id') === targetId);

    // Swap positions
    [pieces[draggedIndex], pieces[targetIndex]] = [pieces[targetIndex], pieces[draggedIndex]];
    [draggedPiece.style.gridColumn, this.style.gridColumn] = [this.style.gridColumn, draggedPiece.style.gridColumn];
    [draggedPiece.style.gridRow, this.style.gridRow] = [this.style.gridRow, draggedPiece.style.gridRow];
  }
}

function dragEnd() {
  draggedPiece.style.visibility = 'visible';
  draggedPiece = null;
}

// Initialize the puzzle
createPuzzle();
