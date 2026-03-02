export const domController = (() => {
    
    const drawBoard = (containerId, player, isClickable, game) => {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} not found`);
            return;
        }
        
        container.innerHTML = '';
        const fragment = document.createDocumentFragment();
        
        player.board.grid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('cell');
                
                
                if (cell && cell !== 'hit' && cell !== 'miss' && player.constructor.name !== 'Computer') {
                    cellDiv.classList.add('ship');
                }
                
                
                if (cell === 'hit') {
                    cellDiv.classList.add('hit');
                    cellDiv.textContent = '💥';
                } else if (cell === 'miss') {
                    cellDiv.classList.add('miss');
                    cellDiv.textContent = 'miss';
                }
                
                
                if (isClickable && cell !== 'hit' && cell !== 'miss') {
                    cellDiv.addEventListener('click', () => {
                        const result = game.handleHumanAttack(rowIndex, colIndex);
                        
                        
                        drawBoard('computer-board', game.computer, true, game);
                        
                        
                        if (!game.gameOver) {
                            setTimeout(() => {
                                game.handleComputerAttack();
                                drawBoard('human-board', game.human, false, game);
                            }, 500);
                        }
                    });
                }
                
                fragment.appendChild(cellDiv);
            });
        });
        
        container.appendChild(fragment);
    };
    
    return {
        drawBoard
    };
})();