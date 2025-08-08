// Initializes a local two-player chess game using chess.js and chessboard.js.
document.addEventListener('DOMContentLoaded', function () {
    const boardElement = document.getElementById('board');
    if (!boardElement) return;

    const game = new Chess();
    const statusEl = document.getElementById('status');

    function updateStatus() {
        let status = '';
        const moveColor = game.turn() === 'w' ? 'White' : 'Black';

        if (game.in_checkmate()) {
            status = 'Game over, ' + moveColor + ' is in checkmate.';
        } else if (game.in_draw()) {
            status = 'Game over, drawn position.';
        } else {
            status = moveColor + ' to move';
            if (game.in_check()) {
                status += ', ' + moveColor + ' is in check.';
            }
        }
        statusEl.textContent = status;
    }

    const board = Chessboard('board', {
        draggable: true,
        position: 'start',
        onDragStart: function (source, piece) {
            if (game.game_over()) return false;
            if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
                (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
                return false;
            }
        },
        onDrop: function (source, target) {
            const move = game.move({ from: source, to: target, promotion: 'q' });
            if (move === null) return 'snapback';
            updateStatus();
        },
        onSnapEnd: function () {
            board.position(game.fen());
        }
    });

    document.getElementById('resetBoard').addEventListener('click', function () {
        game.reset();
        board.start();
        updateStatus();
    });

    updateStatus();
});
