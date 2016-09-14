# MIT 6.034 Lab 0: Getting Started

from tester import make_test, get_tests
from point_api import Point
import random
random.seed() # Change to "random.seed(n)" to make the random tests always return the same value

ANSWER_1_getargs = 'ANSWER_1'  #TEST 1
def ANSWER_1_testanswer(val, original_val = None):
    return val == 'B'
make_test(type = 'VALUE',
          getargs = ANSWER_1_getargs,
          testanswer = ANSWER_1_testanswer,
          expected_val = ('(the correct letter A, B, or C)'),
          name = ANSWER_1_getargs)

#### Warm-up: Exponentiation ###################################################

def cube_0_getargs():  #TEST 2
    return [10]
def cube_0_testanswer(val, original_val = None):
    return val == 1000
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = cube_0_getargs,
          testanswer = cube_0_testanswer,
          expected_val = "1000",
          name = 'cube')

def cube_1_getargs():  #TEST 3
    return [1]
def cube_1_testanswer(val, original_val = None):
    return val == 1
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = cube_1_getargs,
          testanswer = cube_1_testanswer,
          expected_val = "1",
          name = 'cube')

def cube_2_getargs():  #TEST 4
    return [-5]
def cube_2_testanswer(val, original_val = None):
    return val == -125
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = cube_2_getargs,
          testanswer = cube_2_testanswer,
          expected_val = "-125",
          name = 'cube')

cube_3_arg = [-1]
def cube_3_getargs():  #TEST 5
    cube_3_arg[0] = random.randint(1,1000)
    return cube_3_arg
def cube_3_testanswer(val, original_val = None):
    return val == cube_3_arg[0]**3
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = cube_3_getargs,
          testanswer = cube_3_testanswer,
          expected_val = "a number between 1 and 1000000000 (this test is randomly generated)",
          name = 'cube')

#### Recursion #################################################################

def fibonacci_0_getargs():  #TEST 6
    return [1]
def fibonacci_0_testanswer(val, original_val = None):
    return val == 1
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = fibonacci_0_getargs,
          testanswer = fibonacci_0_testanswer,
          expected_val = "1",
          name = 'fibonacci')

def fibonacci_1_getargs():  #TEST 7
    return [2]
def fibonacci_1_testanswer(val, original_val = None):
    return val == 1
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = fibonacci_1_getargs,
          testanswer = fibonacci_1_testanswer,
          expected_val = "1",
          name = 'fibonacci')

def fibonacci_2_getargs():  #TEST 8
    return [12]
def fibonacci_2_testanswer(val, original_val = None):
    return val == 144
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = fibonacci_2_getargs,
          testanswer = fibonacci_2_testanswer,
          expected_val = "144",
          name = 'fibonacci')

def fibonacci_3_getargs():  #TEST 9
    return [5]
def fibonacci_3_testanswer(val, original_val = None):
    return val == 5
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = fibonacci_3_getargs,
          testanswer = fibonacci_3_testanswer,
          expected_val = "5",
          name = 'fibonacci')


def expression_depth_0_getargs():  #TEST 10
    return ['x']
def expression_depth_0_testanswer(val, original_val = None):
    return val == 0
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = expression_depth_0_getargs,
          testanswer = expression_depth_0_testanswer,
          expected_val = "0",
          name = 'expression_depth')

def expression_depth_1_getargs():  #TEST 11
    return [['expt', 'x', 2]]
def expression_depth_1_testanswer(val, original_val = None):
    return val == 1
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = expression_depth_1_getargs,
          testanswer = expression_depth_1_testanswer,
          expected_val = "1",
          name = 'expression_depth')

def expression_depth_2_getargs():  #TEST 12
    return [['+', ['expt', 'x', 2], ['expt', 'y', 2]]]
def expression_depth_2_testanswer(val, original_val = None):
    return val == 2
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = expression_depth_2_getargs,
          testanswer = expression_depth_2_testanswer,
          expected_val = "2",
          name = 'expression_depth')

def expression_depth_3_getargs():  #TEST 13
    return [['/', ['expt', 'x', 5], ['expt', ['-', ['expt', 'x', 2], '1'], ['+', 5, 2, 3, 'w', 4]]]]
def expression_depth_3_testanswer(val, original_val = None):
    return val == 4
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = expression_depth_3_getargs,
          testanswer = expression_depth_3_testanswer,
          expected_val = "4",
          name = 'expression_depth')

#### Built-in data types #######################################################

# "zyxw" -> (4, list("zyxw"), 4)
def compute_string_properties_0_getargs():  #TEST 14
    return ["zyxw"]
def compute_string_properties_0_testanswer(val, original_val = None):
    return val == (4, list("zyxw"), 4)
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = compute_string_properties_0_getargs,
          testanswer = compute_string_properties_0_testanswer,
          expected_val = str((4, list("zyxw"), 4)),
          name = 'compute_string_properties')

# "xxx" -> (3, list("xxx"), 1)
def compute_string_properties_1_getargs():  #TEST 15
    return ["xxx"]
def compute_string_properties_1_testanswer(val, original_val = None):
    return val == (3, list("xxx"), 1)
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = compute_string_properties_1_getargs,
          testanswer = compute_string_properties_1_testanswer,
          expected_val = str((3, list("xxx"), 1)),
          name = 'compute_string_properties')

# "artificialintelligence" -> (22, list("ttrnnllliiiiigfeeeccaa"), 10)
def compute_string_properties_2_getargs():  #TEST 16
    return ["artificialintelligence"]
def compute_string_properties_2_testanswer(val, original_val = None):
    return val == (22, list("ttrnnllliiiiigfeeeccaa"), 10)
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = compute_string_properties_2_getargs,
          testanswer = compute_string_properties_2_testanswer,
          expected_val = str((22, list("ttrnnllliiiiigfeeeccaa"), 10)),
          name = 'compute_string_properties')

# "" -> (0, [], 0)
def compute_string_properties_3_getargs():  #TEST 17
    return [""]
def compute_string_properties_3_testanswer(val, original_val = None):
    return val == (0, [], 0)
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = compute_string_properties_3_getargs,
          testanswer = compute_string_properties_3_testanswer,
          expected_val = "(0, [], 0)",
          name = 'compute_string_properties')

def tally_letters_0_getargs():  #TEST 18
    return ["hello"]
def tally_letters_0_testanswer(val, original_val = None):
    return val == {"h": 1, "e": 1, "l": 2, "o": 1}
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = tally_letters_0_getargs,
          testanswer = tally_letters_0_testanswer,
          expected_val = str({"h": 1, "e": 1, "l": 2, "o": 1}),
          name = 'tally_letters')

def tally_letters_1_getargs():  #TEST 19
    return ["artificialintelligence"]
def tally_letters_1_testanswer(val, original_val = None):
    return val == {"a": 2, "c": 2, "e": 3, "f": 1, "g": 1, "i": 5, "l": 3,
                   "n": 2, "r": 1, "t": 2}
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = tally_letters_1_getargs,
          testanswer = tally_letters_1_testanswer,
          expected_val = str({"a": 2, "c": 2, "e": 3, "f": 1, "g": 1, "i": 5, "l": 3, "n": 2, "r": 1, "t": 2}),
          name = 'tally_letters')

def tally_letters_2_getargs():  #TEST 20
    return ["zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"]
def tally_letters_2_testanswer(val, original_val = None):
    return val == {"z": 60}
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = tally_letters_2_getargs,
          testanswer = tally_letters_2_testanswer,
          expected_val = str({"z": 60}),
          name = 'tally_letters')

def tally_letters_3_getargs():  #TEST 21
    return [""]
def tally_letters_3_testanswer(val, original_val = None):
    return val == {}
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = tally_letters_3_getargs,
          testanswer = tally_letters_3_testanswer,
          expected_val = "{}",
          name = 'tally_letters')

#### Functions that return functions ###########################################

# create a function that multiplies numbers by 5
def create_multiplier_function_0_getargs():  #TEST 22
    return [5]
def create_multiplier_function_0_testanswer(val, original_val = None):
    return val(3) == 15 and val(-10) == -50
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = create_multiplier_function_0_getargs,
          testanswer = create_multiplier_function_0_testanswer,
          expected_val = "(function that multiplies numbers by 5)",
          name = 'create_multiplier_function')

# create a function that multiplies numbers by 0
def create_multiplier_function_1_getargs():  #TEST 23
    return [0]
def create_multiplier_function_1_testanswer(val, original_val = None):
    return val(random.randint(2,10000)) == 0
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = create_multiplier_function_1_getargs,
          testanswer = create_multiplier_function_1_testanswer,
          expected_val = "(function that multiplies numbers by 0)",
          name = 'create_multiplier_function')

# create a function that multiplies numbers by 73
def create_multiplier_function_2_getargs():  #TEST 24
    return [73]
def create_multiplier_function_2_testanswer(val, original_val = None):
    rand_nums = [random.randint(-100,-2), random.randint(2,100), 0, 1]
    return all(map(lambda n: val(n) == n*73, rand_nums))
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = create_multiplier_function_2_getargs,
          testanswer = create_multiplier_function_2_testanswer,
          expected_val = "(function that multiplies numbers by 73)",
          name = 'create_multiplier_function')

#### Objects and APIs: Copying and modifing objects ##########################

point_A = Point(4,9)
point_B = Point(-2,0)
point_C = Point(5,5)
point_D = Point(-1,-100)

get_neighbors_0_input = point_A.copy()
def get_neighbors_0_getargs():  #TEST 25
    return [get_neighbors_0_input]
get_neighbors_0_expected = [[p.copy().setX(p.getX()+x).setY(p.getY()+y)
                             for (x,y) in [(-1,0),(1,0),(0,-1),(0,1)]]
                            for p in [point_A]][0]
def get_neighbors_0_testanswer(val, original_val = None):
    return (len(val) == 4 and all([p in get_neighbors_0_expected for p in val])
            and get_neighbors_0_input == point_A)
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = get_neighbors_0_getargs,
          testanswer = get_neighbors_0_testanswer,
          expected_val = str(get_neighbors_0_expected),
          name = 'get_neighbors')

get_neighbors_1_input = point_B.copy()
def get_neighbors_1_getargs():  #TEST 26
    return [get_neighbors_1_input]
get_neighbors_1_expected = [[p.copy().setX(p.getX()+x).setY(p.getY()+y)
                             for (x,y) in [(-1,0),(1,0),(0,-1),(0,1)]]
                            for p in [point_B]][0]
def get_neighbors_1_testanswer(val, original_val = None):
    return (len(val) == 4 and all([p in get_neighbors_1_expected for p in val])
            and get_neighbors_1_input == point_B)
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = get_neighbors_1_getargs,
          testanswer = get_neighbors_1_testanswer,
          expected_val = str(get_neighbors_1_expected),
          name = 'get_neighbors')

get_neighbors_2_input = point_C.copy()
def get_neighbors_2_getargs():  #TEST 27
    return [get_neighbors_2_input]
get_neighbors_2_expected = [[p.copy().setX(p.getX()+x).setY(p.getY()+y)
                             for (x,y) in [(-1,0),(1,0),(0,-1),(0,1)]]
                            for p in [point_C]][0]
def get_neighbors_2_testanswer(val, original_val = None):
    return (len(val) == 4 and all([p in get_neighbors_2_expected for p in val])
            and get_neighbors_2_input == point_C)
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = get_neighbors_2_getargs,
          testanswer = get_neighbors_2_testanswer,
          expected_val = str(get_neighbors_2_expected),
          name = 'get_neighbors')

#### Using the "key" argument ##################################################

sort_points_by_Y_0_input = map(lambda p:p.copy(), [point_C, point_A])
def sort_points_by_Y_0_getargs():  #TEST 28
    return [sort_points_by_Y_0_input]
def sort_points_by_Y_0_testanswer(val, original_val = None):
    return (val == [point_C, point_A]
            and sort_points_by_Y_0_input == [point_C, point_A])
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = sort_points_by_Y_0_getargs,
          testanswer = sort_points_by_Y_0_testanswer,
          expected_val = str([point_C, point_A]),
          name = 'sort_points_by_Y')

sort_points_by_Y_1_input = map(lambda p:p.copy(), [point_A, point_B, point_C, point_D])
def sort_points_by_Y_1_getargs():  #TEST 29
    return [sort_points_by_Y_1_input]
def sort_points_by_Y_1_testanswer(val, original_val = None):
    return (val == [point_D, point_B, point_C, point_A]
            and sort_points_by_Y_1_input == [point_A, point_B, point_C, point_D])
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = sort_points_by_Y_1_getargs,
          testanswer = sort_points_by_Y_1_testanswer,
          expected_val = str([point_D, point_B, point_C, point_A]),
          name = 'sort_points_by_Y')


furthest_right_point_0_input = map(lambda p:p.copy(), [point_A, point_B, point_C, point_D])
def furthest_right_point_0_getargs():  #TEST 30
    return [furthest_right_point_0_input]
def furthest_right_point_0_testanswer(val, original_val = None):
    return (val == point_C
            and furthest_right_point_0_input == [point_A, point_B, point_C, point_D])
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = furthest_right_point_0_getargs,
          testanswer = furthest_right_point_0_testanswer,
          expected_val = str(point_C),
          name = 'furthest_right_point')

furthest_right_point_1_input = map(lambda p:p.copy(), [point_B, point_D])
def furthest_right_point_1_getargs():  #TEST 31
    return [furthest_right_point_1_input]
def furthest_right_point_1_testanswer(val, original_val = None):
    return (val == point_D
            and furthest_right_point_1_input == [point_B, point_D])
make_test(type = 'FUNCTION_ENCODED_ARGS',
          getargs = furthest_right_point_1_getargs,
          testanswer = furthest_right_point_1_testanswer,
          expected_val = str(point_D),
          name = 'furthest_right_point')

#### SURVEY ####################################################################

PYTHON_EXPERIENCE_getargs = 'PYTHON_EXPERIENCE'  #TEST 32
def PYTHON_EXPERIENCE_testanswer(val, original_val = None):
    return val in list("ABCDE")
make_test(type = 'VALUE',
          getargs = PYTHON_EXPERIENCE_getargs,
          testanswer = PYTHON_EXPERIENCE_testanswer,
          expected_val = '(a capital letter A, B, C, D, or E, as a string)',
          name = PYTHON_EXPERIENCE_getargs)

PROGRAMMING_EXPERIENCE_getargs = 'PROGRAMMING_EXPERIENCE'  #TEST 33
def PROGRAMMING_EXPERIENCE_testanswer(val, original_val = None):
    return val in list("ABCDE")
make_test(type = 'VALUE',
          getargs = PROGRAMMING_EXPERIENCE_getargs,
          testanswer = PROGRAMMING_EXPERIENCE_testanswer,
          expected_val = '(a capital letter A, B, C, D, or E, as a string)',
          name = PROGRAMMING_EXPERIENCE_getargs)

NAME_getargs = 'NAME'  #TEST 34
def NAME_testanswer(val, original_val = None):
    return ( isinstance(val, str) and val != '')
make_test(type = 'VALUE',
          getargs = NAME_getargs,
          testanswer = NAME_testanswer,
          expected_val = '(your name, as a string)',
          name = NAME_getargs)

COLLABORATORS_getargs = 'COLLABORATORS'  #TEST 35
def COLLABORATORS_testanswer(val, original_val = None):
    return isinstance(val, str)
make_test(type = 'VALUE',
          getargs = COLLABORATORS_getargs,
          testanswer = COLLABORATORS_testanswer,
          expected_val = ("(names of people you worked with, as a string, or "
                          + "empty string if you worked alone)"),
          name = COLLABORATORS_getargs)

HOW_MANY_HOURS_THIS_LAB_TOOK_getargs = 'HOW_MANY_HOURS_THIS_LAB_TOOK'  #TEST 36
def HOW_MANY_HOURS_THIS_LAB_TOOK_testanswer(val, original_val = None):
    return isinstance(val, (int, float, str)) and val != ''
make_test(type = 'VALUE',
          getargs = HOW_MANY_HOURS_THIS_LAB_TOOK_getargs,
          testanswer = HOW_MANY_HOURS_THIS_LAB_TOOK_testanswer,
          expected_val = ('(number of hours you spent on this lab, as a number '
                          +'or string)'),
          name = HOW_MANY_HOURS_THIS_LAB_TOOK_getargs)

