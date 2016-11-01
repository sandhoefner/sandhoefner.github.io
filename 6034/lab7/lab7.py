# MIT 6.034 Lab 7: Support Vector Machines
# Written by Jessica Noss (jmn) and 6.034 staff

from svm_data import *

# Vector math
def dot_product(u, v):
    """Computes dot product of two vectors u and v, each represented as a tuple
    or list of coordinates.  Assume the two vectors are the same length."""
    raise NotImplementedError

def norm(v):
    "Computes length of a vector v, represented as a tuple or list of coords."
    raise NotImplementedError

# Equation 1
def positiveness(svm, point):
    "Computes the expression (w dot x + b) for the given point"
    raise NotImplementedError

def classify(svm, point):
    """Uses given SVM to classify a Point.  Assumes that point's true
    classification is unknown.  Returns +1 or -1, or 0 if point is on boundary"""
    raise NotImplementedError

# Equation 2
def margin_width(svm):
    "Calculate margin width based on current boundary."
    raise NotImplementedError

# Equation 3
def check_gutter_constraint(svm):
    """Returns the set of training points that violate one or both conditions:
        * gutter constraint (positiveness == classification for support vectors)
        * training points must not be between the gutters
    Assumes that the SVM has support vectors assigned."""
    raise NotImplementedError

# Equations 4, 5
def check_alpha_signs(svm):
    """Returns the set of training points that violate either condition:
        * all non-support-vector training points have alpha = 0
        * all support vectors have alpha > 0
    Assumes that the SVM has support vectors assigned, and that all training
    points have alpha values assigned."""
    raise NotImplementedError

def check_alpha_equations(svm):
    """Returns True if both Lagrange-multiplier equations are satisfied,
    otherwise False.  Assumes that the SVM has support vectors assigned, and
    that all training points have alpha values assigned."""
    raise NotImplementedError

# Classification accuracy
def misclassified_training_points(svm):
    """Returns the set of training points that are classified incorrectly
    using the current decision boundary."""
    raise NotImplementedError

# Training
def update_svm_from_alphas(svm):
    """Given an SVM with training data and alpha values, use alpha values to
    update the SVM's support vectors, w, and b.  Return the updated SVM."""
    raise NotImplementedError

# Multiple choice
ANSWER_1 = None
ANSWER_2 = None
ANSWER_3 = None
ANSWER_4 = None

ANSWER_5 = None
ANSWER_6 = None
ANSWER_7 = None
ANSWER_8 = None
ANSWER_9 = None
ANSWER_10 = None

ANSWER_11 = None
ANSWER_12 = None
ANSWER_13 = None
ANSWER_14 = None
ANSWER_15 = None
ANSWER_16 = None

ANSWER_17 = None
ANSWER_18 = None
ANSWER_19 = None

ANSWER_20 = None


#### SURVEY ####################################################################

NAME = None
COLLABORATORS = None
HOW_MANY_HOURS_THIS_LAB_TOOK = None
WHAT_I_FOUND_INTERESTING = None
WHAT_I_FOUND_BORING = None
SUGGESTIONS = None
