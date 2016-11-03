# MIT 6.034 Lab 7: Support Vector Machines
# Written by Jessica Noss (jmn) and 6.034 staff

from svm_data import *

# Vector math
def dot_product(u, v):
    """Computes dot product of two vectors u and v, each represented as a tuple
    or list of coordinates.  Assume the two vectors are the same length."""
    ret = 0.0
    for i in range(len(u)):
        ret += float(float(u[i]) * float(v[i]))
    return ret


def norm(v):
    "Computes length of a vector v, represented as a tuple or list of coords."
    summ = 0.0
    for i in range(len(v)):
        summ += float(float(v[i]) ** 2)
    return float(float(summ) ** 0.5)


# Equation 1
def positiveness(svm, point):
    "Computes the expression (w dot x + b) for the given point"
    return dot_product(svm.w, point) + svm.b


def classify(svm, point):
    """Uses given SVM to classify a Point.  Assumes that point's true
    classification is unknown.  Returns +1 or -1, or 0 if point is on boundary"""
    try:
        return int(positiveness(svm, point) / abs(positiveness(svm, point)))
    except ZeroDivisionError:
        return 0


# Equation 2
def margin_width(svm):
    "Calculate margin width based on current boundary."
    return 2 / norm(svm.w)


# Equation 3
def check_gutter_constraint(svm):
    """Returns the set of training points that violate one or both conditions:
        * gutter constraint (positiveness == classification for support vectors)
        * training points must not be between the gutters
    Assumes that the SVM has support vectors assigned."""

    return {point for point in svm.training_points
            if (point in svm.support_vectors
                and positiveness(svm, point) != point.classification)
            or abs(positiveness(svm, point)) < 1}


# Equations 4, 5
def check_alpha_signs(svm):
    """Returns the set of training points that violate either condition:
        * all non-support-vector training points have alpha = 0
        * all support vectors have alpha > 0
    Assumes that the SVM has support vectors assigned, and that all training
    points have alpha values assigned."""
    wrong = []
    for point in svm.training_points:
        if ((point in svm.support_vectors and point.alpha <= 0) or
        (point not in svm.support_vectors and point.alpha is not 0)):
            wrong.append(point)
    return set(wrong)



def check_alpha_equations(svm):
    """Returns True if both Lagrange-multiplier equations are satisfied,
    otherwise False.  Assumes that the SVM has support vectors assigned, and
    that all training points have alpha values assigned."""
    fourSum = 0
    fiveSum = [0,0]
    for point in svm.training_points:
        fourSum += point.classification * point.alpha
        fiveSum = vector_add(fiveSum, scalar_mult(point.classification * point.alpha, point))
    return fourSum is 0 and fiveSum[0] == svm.w[0] and fiveSum[1] == svm.w[1]


# Classification accuracy
def misclassified_training_points(svm):
    """Returns the set of training points that are classified incorrectly
    using the current decision boundary."""
    wrong = []
    for point in svm.training_points:
        if point.classification is not classify(svm, point):
            wrong.append(point)
    return set(wrong)

# Training
def update_svm_from_alphas(svm):
    """Given an SVM with training data and alpha values, use alpha values to
    update the SVM's support vectors, w, and b.  Return the updated SVM."""

    # take the alpha values determined by SMO and use them to determine
    # the support vectors, the normal vector w, and the offset b

    # If the input SVM already has w, b, and/or support_vectors defined, ignore them and overwrite them
    svm.w = [0,0]
    svm.b = 0
    svm.support_vectors = []

    # Any training point with alpha > 0 is a support vector
    for training_point in svm.training_points:
        if training_point.alpha > 0:
            svm.support_vectors.append(training_point)
    # w can be calculated using Equation 5
    fiveSum = [0,0]
    for point in svm.training_points:
        fiveSum = vector_add(fiveSum, scalar_mult(point.classification * point.alpha, point))
    svm.w = fiveSum
    # If training is complete, b can be calculated using the gutter constraint (Equation 3)
    svm.b = svm.training_points[0].classification - dot_product(svm.w, svm.training_points[0])
    """However, during training, the gutter constraint will produce different values of b
    depending on which support vector is used!
    To resolve this ambiguity, we will take the average of two values:
    the minimum value of b produced by a negative support vector,
    and the maximum value of b produced by a positive support vector"""

    return svm

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

NAME = 'Evan Sandhoefner'
COLLABORATORS = 'Ryan Kerr'
HOW_MANY_HOURS_THIS_LAB_TOOK = 6
WHAT_I_FOUND_INTERESTING = 'Checking if classifications are correct'
WHAT_I_FOUND_BORING = 'Nothing'
SUGGESTIONS = None
