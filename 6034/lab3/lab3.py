# MIT 6.034 Lab 3: Games
# Written by Dylan Holmes (dxh), Jessica Noss (jmn), and 6.034 staff

from game_api import *
from boards import *
INF = float('inf')

def is_game_over_connectfour(board) :
    "Returns True if game is over, otherwise False."
    if board.count_pieces() is board.num_rows * board.num_cols:
        return True
    for chain in board.get_all_chains():
        if len(chain) >= 4:
            return True
    else:
        return False

def next_boards_connectfour(board) :
    """Returns a list of ConnectFourBoard objects that could result from the
    next move, or an empty list if no moves can be made."""
    if is_game_over_connectfour(board):
        return []
    else:
        ret = []
        for col in range(board.num_cols):
            if not board.is_column_full(col):
                ret.append(board.add_piece(col))
        return ret


def endgame_score_connectfour(board, is_current_player_maximizer) :
    """Given an endgame board, returns 1000 if the maximizer has won,
    -1000 if the minimizer has won, or 0 in case of a tie."""
    if board.count_pieces() is board.num_rows * board.num_cols:
        return 0
    for chain in board.get_all_chains(current_player=is_current_player_maximizer):
        if len(chain) >= 4:
            return 1000
    else:
        return -1000


def endgame_score_connectfour_faster(board, is_current_player_maximizer) :
    """Given an endgame board, returns an endgame score with abs(score) >= 1000,
    returning larger absolute scores for winning sooner."""
    base = endgame_score_connectfour(board, is_current_player_maximizer)
    return base * (board.num_rows * board.num_cols - board.count_pieces())

def heuristic_connectfour(board, is_current_player_maximizer) :
    """Given a non-endgame board, returns a heuristic score with
    abs(score) < 1000, where higher numbers indicate that the board is better
    for the maximizer."""
    max_util = 0
    min_util = 0
    for chain in board.get_all_chains(current_player=is_current_player_maximizer):
        # there's probably a more reasonable way of assigning utilities
        max_util += len(chain) ** 3
    for chain in board.get_all_chains(current_player=not is_current_player_maximizer):
        min_util += len(chain) ** 3
    return max_util - min_util

# Now we can create AbstractGameState objects for Connect Four, using some of
# the functions you implemented above.  You can use the following examples to
# test your dfs and minimax implementations in Part 2.

# This AbstractGameState represents a new ConnectFourBoard, before the game has started:
state_starting_connectfour = AbstractGameState(snapshot = ConnectFourBoard(),
                                 is_game_over_fn = is_game_over_connectfour,
                                 generate_next_states_fn = next_boards_connectfour,
                                 endgame_score_fn = endgame_score_connectfour_faster)

# This AbstractGameState represents the ConnectFourBoard "NEARLY_OVER" from boards.py:
state_NEARLY_OVER = AbstractGameState(snapshot = NEARLY_OVER,
                                 is_game_over_fn = is_game_over_connectfour,
                                 generate_next_states_fn = next_boards_connectfour,
                                 endgame_score_fn = endgame_score_connectfour_faster)

# This AbstractGameState represents the ConnectFourBoard "BOARD_UHOH" from boards.py:
state_UHOH = AbstractGameState(snapshot = BOARD_UHOH,
                                 is_game_over_fn = is_game_over_connectfour,
                                 generate_next_states_fn = next_boards_connectfour,
                                 endgame_score_fn = endgame_score_connectfour_faster)


#### PART 2 ###########################################
# Note: Functions in Part 2 use the AbstractGameState API, not ConnectFourBoard.

# a static evaluation can happen by calculating an endgame score or a heuristic score,
# but not by recursing on a node's children

# with help from https://www.python.org/doc/essays/graphs/
def find_all_paths(start, path=[]):
    path = path + [start]
    if start.is_game_over():
        return [path]
    paths = []
    for node in start.generate_next_states():
        if node not in path:
            newpaths = find_all_paths(node, path)
            for newpath in newpaths:
                paths.append(newpath)
    return paths


def best_path(pathlist):
    best_score = -INF
    best_path = []
    for path in pathlist:
        endnode = path[-1]
        score = endnode.get_endgame_score()
        if score > best_score:
            best_score = score
            best_path = path
    return (best_path, best_score, len(pathlist))


def dfs_maximizing(state) :
    """Performs depth-first search to find path with highest endgame score.
    Returns a tuple containing:
     0. the best path (a list of AbstractGameState objects),
     1. the score of the leaf node (a number), and
     2. the number of static evaluations performed (a number)"""
    return best_path(find_all_paths(state, []))

global minimax_endgame_evals
minimax_endgame_evals = 0

# returns final minimax score of state's children
def minimax_score(state, maximize):
    if state.is_game_over():
        return state.get_endgame_score(maximize)
    else:
        options = state.generate_next_states()
        if maximize:
            return max([minimax_score(newstate, False) for newstate in options])
        else:
            return min([minimax_score(newstate, True) for newstate in options])


def grow_path(path, maximize, evals):
    state = path[-1]
    if state.is_game_over():
        return (path, evals)
    else:
        if maximize:
            best_score = -INF
        else:
            best_score = INF
        best_state = None
        options = [(minimax_score(option, not maximize), option) for option in state.generate_next_states()]
        if maximize:
            for option in options:
                if option[0] > best_score:
                    best_score = option[0]
                    best_state = option[1]
        else:
            for option in options:
                if option[0] < best_score:
                    best_score = option[0]
                    best_state = option[1]
        path.append(best_state)
        evals += len(options) * 2
        return grow_path(path, not maximize, evals)


def minimax_endgame_search(state, maximize=True) :
    """Performs minimax search, searching all leaf nodes and statically
    evaluating all endgame scores.  Same return type as dfs_maximizing."""
    # print "answer to 24:"
    # print move_sequence(GAME1, [1,0])
    # print "4"
    # print "16"
    ret = grow_path([state], maximize, 0)
    path = ret[0]
    evals = ret[1]
    if len(path) % 2 is not 0:
        maximize = not maximize
    # for board in path:
        # print board.get_snapshot()
    # print (path[-1].get_endgame_score(maximize), path[-1].get_endgame_score(not maximize))
    return (path, path[-1].get_endgame_score(not maximize), evals)




# Uncomment the line below to try your minimax_endgame_search on an
# AbstractGameState representing the ConnectFourBoard "NEARLY_OVER" from boards.py:

#pretty_print_dfs_type(minimax_endgame_search(state_NEARLY_OVER))


def minimax_search(state, heuristic_fn=always_zero, depth_limit=INF, maximize=True) :
    "Performs standard minimax search.  Same return type as dfs_maximizing."
    raise NotImplementedError

# Uncomment the line below to try minimax_search with "BOARD_UHOH" and
# depth_limit=1.  Try increasing the value of depth_limit to see what happens:

#pretty_print_dfs_type(minimax_search(state_UHOH, heuristic_fn=heuristic_connectfour, depth_limit=1))


def minimax_search_alphabeta(state, alpha=-INF, beta=INF, heuristic_fn=always_zero,
                             depth_limit=INF, maximize=True) :
    "Performs minimax with alpha-beta pruning.  Same return type as dfs_maximizing."
    raise NotImplementedError

# Uncomment the line below to try minimax_search_alphabeta with "BOARD_UHOH" and
# depth_limit=4.  Compare with the number of evaluations from minimax_search for
# different values of depth_limit.

#pretty_print_dfs_type(minimax_search_alphabeta(state_UHOH, heuristic_fn=heuristic_connectfour, depth_limit=4))


def progressive_deepening(state, heuristic_fn=always_zero, depth_limit=INF,
                          maximize=True) :
    """Runs minimax with alpha-beta pruning. At each level, updates anytime_value
    with the tuple returned from minimax_search_alphabeta. Returns anytime_value."""
    anytime_value = AnytimeValue()   # TA Note: Use this to store values.
    raise NotImplementedError
    return anytime_value

# Uncomment the line below to try progressive_deepening with "BOARD_UHOH" and
# depth_limit=4.  Compare the total number of evaluations with the number of
# evaluations from minimax_search or minimax_search_alphabeta.

#print progressive_deepening(state_UHOH, heuristic_fn=heuristic_connectfour, depth_limit=4)


##### PART 3: Multiple Choice ##################################################

# note all
ANSWER_1 = '4'

ANSWER_2 = '1'

ANSWER_3 = '4'

ANSWER_4 = '5'


#### SURVEY ###################################################

NAME = "Evan Sandhoefner"
COLLABORATORS = "Ryan Kerr"
HOW_MANY_HOURS_THIS_LAB_TOOK = "8"
WHAT_I_FOUND_INTERESTING = "The Abstract API for reusing minimax code for many games - powerful"
WHAT_I_FOUND_BORING = "Cooperative search because it didn't seem useful"
SUGGESTIONS = None
