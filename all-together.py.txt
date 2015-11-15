# all-together.py
# Connect Four MiniMax AI with AlphaBeta Pruning: INTERACTIVE GAME
# Harvard CS 51 Final Project
# Evan Sandhoefner, Ryan Kerr, Milan Ravenell, Matthew Tesfalul

"""
Not configured for web use! If you have Python on your machine, you can download this self-contained file (no
dependencies) and run it as you would any .py file. If you want to install Python, you can try these instructions:

https://wiki.python.org/moin/BeginnersGuide/Download

...but that might be an involved process if you only want Python for this program. In that case, there are quite a
few online Python interpreters you can try. We've had the most luck with:

http://www.tutorialspoint.com/execute_python_online.php

...but it's not perfect.
Good luck! Hope you enjoy!
"""

# import external modules
import time
import sys

# evaluate

# Checks to see if there are a series of pieces in a row of a given state 
# for a given length. If there are that many in a row, it checks to see if 
# the position before and after the series are empty. If the positions before 
# or after are empty, it checks if the position under those threatening spots 
# are empty, in which case the spot is no longer a threat. Returns a heuristic 
# proportional to the number of threatening spots the series has. The all have 
# the same functionality as in board_functions.py, but with the added ability 
# to check for the number of threatening locations.

# horizontal_threat takes a board array, state string, and length int
# horizontal_threat returns an int proportional to the number threatening 
# positions if there is a series of the given length of one type horizontally
# Example usage: horizontal_threat(board, "R", 4)
def horizontal_threat (board, state, length):
    value = 0
    for y in range(ROWS):
        in_row = 0
        for x in range(COLUMNS):
            if (board[x][y] == state or board[x][y] == state.lower()):
                in_row = in_row + 1
                if (in_row == length):
                    # checks if there is a threatening position
                    if x < COLUMNS - 1 and board[x+1][y] == ".":

                        # checks if position below threatening position is 
                        # empty
                        if y == 0 or board[x+1][y-1] != ".":
                            value = value - 15
                    if x >= length and board[x-length][y] == ".":
                        if y == 0 or board[x-length][y-1] != ".":
                            value = value - 15

                    return value

            else:
                in_row = 0

    return 0

# vertical_threat takes a board array, state string, and length int
# vertical_threat returns an int proportional to the number threatening 
# positions if there is a series of the given length of one type vertically
# Example usage: vertical_threat(board, "R", 4)
def vertical_threat (board, state, length):
    value = 0
    for x in range(COLUMNS):
        in_row = 0
        for y in range(ROWS):
            if y >= ROWS - 3 and in_row < 1:
                break
            if (board[x][y] == state or board[x][y] == state.lower()):
                in_row = in_row + 1
                if (in_row == length):
                    if y < ROWS - 1 and board[x][y+1] == ".":
                        value = value - 15
                    return value
            else:
                in_row = 0

    return 0

# diag_upright_threat takes a board array, state string, an x int, a y int,
# and length int
# diag_upright_threat returns an int proportional to the number threatening 
# positions if there is a series of the given length of one type starting at the
# given x and y position
# Example usage: diag_upright_threat(board, "R", 0, 0, 4)
def diag_upright_threat (board, state,x,y, length):
    value = 0
    in_row = 0
    while(y < ROWS and x < COLUMNS):
        if (board[x][y] == state or board[x][y] == state.lower()):
            in_row = in_row + 1
            if(in_row == length):
                if (x < COLUMNS - 1 and y < ROWS - 1 and 
                    board[x+1][y+1] == "." and board[x+1][y] != "."):

                    value = value - 15

                if (x >= length and y >= length and 
                    board[x-length][y-length] == "."):

                    if y == length or board[x-length][y-length-1] != ".":
                        value = value - 15
                return value
            x = x + 1
            y = y + 1

        else: 
            in_row = 0
            x = x + 1
            y = y + 1

    return 0

# diag_downright_threat takes a board array, state string, an x int, a y int,
# and length int
# diag_downright_threat returns an int proportional to the number threatening 
# positions if there is a series of the given length of one type starting at 
# the given x and y position
# Example usage: diag_downright_threat(board, "R", 0, 0, 4)
def diag_downright_threat (board, state,x,y, length):
    value = 0
    in_row = 0
    while(x < COLUMNS and y >= 0):
        if (board[x][y] == state or board[x][y] == state.lower()):
            in_row = in_row + 1
            if(in_row == length):
                if (x >= length and y < ROWS - length and 
                    board[x-length][y+length] == "." and 
                    board[x-length][y+length-1] != "."):

                    value = value - 15
                if x < COLUMNS - 1 and y > 0 and board[x+1][y-1] == ".":
                    if y == 1 or board[x+1][y-2] != ".":
                        value = value - 15
                return value
            x = x + 1
            y = y - 1

        else: 
            in_row = 0
            x = x + 1
            y = y - 1

    return 0 

# diagonal_threat takes a board array, state string, and length int
# diagonal_threat returns an int proportional to the number threatening 
# positions if there is a series of the given length of one type
# Example usage: diagonal_threat(board, "R", 4)
def diagonal_threat (board, state, length):
    value = 0
    for y in range(ROWS - 3):
        value += diag_upright_threat(board, state, 0, y, length)
    for x in range(COLUMNS - 3):
        value += diag_upright_threat(board, state, x, 0, length)
    for y in range(3, ROWS):
        value += diag_downright_threat(board, state, 0, y, length) 
    for x in range(COLUMNS - 3):
        value += diag_downright_threat(board, state, x, ROWS - 1,  length) 
    return value


# threat takes a board array, state string, and length int
# threat returns an int proportional to the number threatening 
# positions if there is a series of the given length of one type
# Example usage: threat(board, "R", 4)
def threat(board, state, length):
    return (horizontal_threat(board, state, length) + 
        vertical_threat(board, state, length) + 
        diagonal_threat(board, state, length))


# evaluate takes a board and a player's color 
# evaluate returns a  SCORE based on how good that board is for max payer.
# High score means good for max player.
def evaluate(board, state):

    # we need a way to see if cpu won, player won, or draw
    # right now is_term will return True if draw or if that player won
    
    # here "b" represents the computer/MAX player. If max player has won,
    # we return high score
    offstate = ""
    defstate =""
    if state == "R":
        offstate = state
        defstate = "Y"
    else:
        offstate = state      
        defstate = "R"

    off_threat = threat(board, offstate, 3)
    def_threat = threat(board, defstate, 3)

    if game_won(board, offstate):
        return float("inf")

    elif game_won(board, defstate):
        return float("-inf")

    # here we define heuristics for good board
    elif off_threat != 0:
        if off_threat == -30:
            return float("inf")
        else:
            return -1 * off_threat
    elif def_threat != 0:
        if def_threat == -30:
            return float("-inf")
        else: 
            return def_threat

    elif full(board):
        return 0

    else:
        return 5

# ab_pruning

# minimax_ab takes a board array, depth int, player string as arguments
# minimax_ab returns the best MOVE int
# Example usage: minimax_ab(board, 5, "R") 
def minimax_ab(board, depth, state):
  
  # get array of possible moves 
  next_moves = possible_moves(board)
  best_move = next_moves[0]
  best_score = float("-inf")

  # initial alpha & beta values for alpha-beta pruning
  alpha = float("-inf")
  beta = float("inf")

  opp_state = "Y"
  if state == "Y":
    state = "Y"
    opp_state = "R"
  
  # go through all of those boards
  for move in next_moves:
    
    # create new board from move
    new_board = go_next(board, move, state)

    # call min on that new board
    board_score = (min_ab(new_board, depth - 1, alpha, beta, state, opp_state)
                   - abs(move - 3))

    if board_score > best_score:
      best_score = board_score
      best_move = move

  return best_move


#####
# AB PRUNING MIN AND MAX PLAYER MOVES HERE
#####

# min_ab takes in a board array, depth int, alpha score, beta score, own
#   piece string and opponent piece string
# min_ab returns the minimum SCORE for that node 
# Example usage: min_ab(board, 3, -inf, inf, "R", "Y")
def min_ab(board, depth, a, b, state, opp_state):
  if is_terminal(board, state):
  
      # assigns score to board
      return evaluate(board, state)

  else:
    next_moves = possible_moves(board) 
    beta = b

    # if end of tree evaluate scores
    for move in next_moves:
      board_score = float("inf")

      # if furthest depth, return heuristic score of board
      if depth == 0:
        new_board = go_next(board, move, opp_state)
        board_score = evaluate(new_board, state)

      # else continue down tree as long as ab conditions met
      elif a < beta:
        new_board = go_next(board, move, opp_state)
        board_score = max_ab(new_board, depth - 1, a, beta, state, opp_state)

      if board_score < beta:
        beta = board_score

    return beta


# max_ab takes in a board array, depth int, alpha score, own
#   piece string and opponent piece string
# max_ab returns the maximum SCORE for that node
# Example usage:  max_ab(board, 3, -inf, inf)
def max_ab(board, depth, a, b, state, opp_state):
  # check to see if game over
  if is_terminal(board, opp_state):

    # assigns score to board
    return evaluate(board, state)

  else:
    next_moves = possible_moves(board) 
    alpha = a

    # if end of tree, evaluate scores
    for move in next_moves:
      board_score = float("-inf")

      # if furthest depth, return heuristic score of board
      if depth == 0:
        new_board = go_next(board, move, state)
        board_score = evaluate(new_board, state)
      
      # else continue down tree as long as ab conditions met
      elif alpha < b:
        new_board = go_next(board, move, state)
        board_score = min_ab(new_board, depth - 1, alpha, b, state, opp_state)

      if board_score > alpha:
        alpha = board_score

    return alpha

# board_functions

# globals
COLUMNS = 7
ROWS = 6

# copy_board takes in a board array
# copy_board returns a copied board without changing original
# Exmaple usage: copy_board(board)
def copy_board(board):
  copy = [["." for y in range(ROWS)] for x in range(COLUMNS)]
  for x in range(COLUMNS):
      for y in range(ROWS):
          copy[x][y] = board[x][y]
  return copy

# horizontal takes a board array, state string, and length int
# horizontal returns true if there is a series of the given length of one type
# horizontally
# Example usage: horizontal(board, "R", 4)
def horizontal (board, state, length):
  for y in range(ROWS):
      in_row = 0
      for x in range(COLUMNS):
          if (board[x][y] == state or board[x][y] == state.lower()):
              in_row = in_row + 1
              if (in_row == length):
                  return True
          else:
              in_row = 0
  return False

# vertical takes a board array, state string, and length int
# vertical returns true if there is a series of the given length of one type
# vertically 
# Example usage: vertical(board, "R", 4)
def vertical(board, state, length):
  for x in range(COLUMNS):
      in_row = 0
      for y in range(ROWS):
          if (board[x][y] == state or board[x][y] == state.lower()):
              in_row = in_row + 1
              if (in_row == length):
                  return True
          elif (board[x][y] == "."):
              in_row = 0
              break
          else:
              in_row = 0
  return False

# diag_upright takes a board array, state string, an x int, a y int, 
# and length int
# diag_upright returns true if there is a series of the given length of one type
# starting at the x and y position
# Example usage: diag_upright(board, "R", 0, 0, 4)
def diag_upright(board, state,x,y, length):
  in_row = 0
  while(y < ROWS and x < COLUMNS):
    if (board[x][y] == state or board[x][y] == state.lower()):
      in_row = in_row + 1
      if(in_row == length):
        return True
      x = x + 1
      y = y + 1
    else: 
      in_row = 0
      x = x + 1
      y = y + 1
  return False

# diag_downright takes a board array, state string, an x int, a y int, 
# and length int
# diag_downright returns true if there is a series of the given length of one type
# starting at the x and y position
# Example usage: diag_downright(board, "R", 0, 0, 4)
def diag_downright (board, state,x,y, length):
  in_row = 0
  while(x < COLUMNS and y >= 0):
    if (board[x][y] == state or board[x][y] == state.lower()):
      in_row = in_row + 1
      if(in_row == length):
        return True
      x = x + 1
      y = y - 1
    else: 
      in_row = 0
      x = x + 1
      y = y - 1
  return False 

# diagonal takes a board array, state string, and length int
# diagonal returns true if there is a series of the given length of one type
# diagonally
# Example usage: diag_upright(board, "R", 0, 0, 4)

def diagonal (board, state, length):
  for y in range(ROWS - 3):
    if diag_upright(board, state, 0, y, length) :
      return True
  for x in range(COLUMNS - 3):
    if diag_upright(board, state, x, 0, length) :
      return True
  for y in range(3, ROWS):
    if diag_downright(board, state, 0, y, length) :
      return True
  for x in range(COLUMNS - 3):
     if diag_downright(board, state, x, ROWS - 1,  length) :
      return True
  return False

# full takes a board array
# full returns true if the board is full
# Example usage: full(board)

def full (board):
  for y in range(ROWS):
    for x in range(COLUMNS):
      if (board[x][y] == "."):
        return False
  return True

# is_terminal takes a board array, and a state string
# is_terminal returns true if there is 4 in a row of one player or the board is 
# full
# Example usage: is_terminal(board, "R")
def is_terminal (board, turn):
  return (horizontal(board, turn, 4) or vertical(board, turn, 4) or 
    diagonal(board, turn, 4) or full(board))

# game_won takes a board array, and a state string
# game_won returns true if there is 4 in a row of one player 
# Example usage: game_won(board, "R")
def game_won (board, turn):
    return ((horizontal(board, turn, 4) or vertical(board, turn, 4) or 
            diagonal(board, turn, 4)))

       

# in_row takes a board array, state string, and a length int
# in_row returns true if there is 4a series of the given length of one
# player
# Example usage: in_row(board, "R", 3)
def in_row (board, turn, length):
  return ((horizontal(board, turn, length) or vertical(board, turn, length) 
          or diagonal(board, turn, length)))


# possible_moves takes a board array
# possible_moves returns an int list of the possible columns where a piece could
# be placed
# Example usage: possible_moves(board, "R")
def possible_moves (board):
  moves = []
  for x in range(COLUMNS):
    if (board[x][ROWS - 1] == "."):
      moves.append(x) 
  return moves

# go_next takes a board array, a move int, and a state string
# go_next returns an updated board with a piece in the lowest possible
# spot in the column of the given int
# Example usage: go_next(board, 4, "R")
def go_next (board, move, state):
  board1 = copy_board(board) 
  for y in range(ROWS):
    if(board1[move][y] == "."):
      board1[move][y] = state
      return board1

# declare global variables
global playersTurn
global board
global difficulty

# instantiate empty board
board = [["." for row in range(ROWS)] for column in range(COLUMNS)]

# take input originating from user, exit program if input is "q"
def exit_if(user_input):
  if user_input == "q":
    sys.exit()

# print intro text, ask for first player and difficulty, print starting board,
# call move()
def init():
  global playersTurn
  global difficulty

  print "\nHello! My name is Rondo. Let's play Connect Four!"

  first = raw_input("You'll be yellow (Y). You can enter 'q' at any prompt "
                    "to quit.\nWould you like to go first? (y/n):\n").lower()
  while (first != "y") & (first != "n") & (first != "q"):
    first = raw_input("\nSorry, I don't understand! "
                      "Please type 'y' or 'n':\n").lower()

  exit_if(first)

  if first == "n":
    playersTurn = False
  else:
    playersTurn = True

  difficulty = raw_input("\nI'm pretty good at this, so you might want me to "
                         "go easy.\nPlease choose a difficulty from 1 "
                         "(easiest) to 5 (hardest).\nFair warning: when I play"
                         " hard, my turns take a while.\n").lower()
  while difficulty not in ["1","2","3","4","5","q"]:
    difficulty = raw_input("\nSorry, I don't understand! Please"
                           " type '1', '2', '3', '4', or '5'.\n").lower()

  exit_if(difficulty)

  difficulty = int(difficulty)

  print "\nStarting board:"
  printBoard()

  move()


# check for game over, make last move lowercase, reassign playersTurn,
# call moveAI or movePlayer
def move():
  global playersTurn
  global board

  if game_won(board, "R"):
    print "\nGame over! I win!"
    sys.exit()
  elif game_won(board, "Y"):
    print "\nGame over! You win!"
    sys.exit()
  elif full(board):
    print "\nGame over! It's a tie!"
    sys.exit()

  for row in range(ROWS):
    for column in range(COLUMNS):
      if board[column][row] == "R":
        board[column][row] = "r"
      if board[column][row] == "Y":
        board[column][row] = "y"

  if playersTurn:
    playersTurn = False
    movePlayer()
  else:
    playersTurn = True
    moveAI()


# sleep if Rondo too fast, compute Rondo's optimal move, print board,
# call move()
def moveAI():
  global board

  print "\nRondo is thinking...."

  if difficulty < 4:
    time.sleep(1)

  board = go_next(board, minimax_ab(board, difficulty, "R"), "R")

  print "Rondo's move:"
  printBoard()

  move()
  

# take user column input, alter board in memory, print board, call move()
def movePlayer():
  column = raw_input("\nYour turn! Please choose a column (1-7):\n").lower()
  while column not in ["q","1","2","3","4","5","6","7"]:
    column = raw_input("\nSorry, I don't understand! Please type '1', '2',"
                       " '3', '4', '5', '6', or '7'.\n")

  exit_if(column)

  column = int(column) - 1

  for row in range(ROWS):
    if board[column][row] == ".":
      board[column][row] = "Y"
      print "\nYour move:"
      printBoard()
      move()
      break
  else:
    movePlayer()


# print ASCII board to terminal window
def printBoard():
  for column in range(COLUMNS):
    print str(1 + column),
  print ""

  for row in range(ROWS):
    for column in range(COLUMNS):
      print board[column][ROWS - row - 1],
    print 

init()