# MIT 6.034 Lab 9: Boosting (Adaboost)
# Written by Jessica Noss (jmn), Dylan Holmes (dxh), and 6.034 staff

from math import log as ln
from utils import *


#### BOOSTING (ADABOOST) #######################################################

def initialize_weights(training_points):
    """Assigns every training point a weight equal to 1/N, where N is the number
    of training points.  Returns a dictionary mapping points to weights."""
    return {point: make_fraction(1, len(training_points)) for point in training_points}


def calculate_error_rates(point_to_weight, classifier_to_misclassified):
    """Given a dictionary mapping training points to their weights, and another
    dictionary mapping classifiers to the training points they misclassify,
    returns a dictionary mapping classifiers to their error rates."""
    ret = {}
    for classifier in classifier_to_misclassified:
        misclassified = classifier_to_misclassified[classifier]
        summ = 0
        for point in misclassified:
            summ += point_to_weight[point]
        ret[classifier] = summ
    return ret

# from lab 5 api
# class NoGoodClassifiersError(ValueError):
#     def __init__(self, value=""):
#         self.value = value
#     def __str__(self):
#         return repr(self.value)

def pick_best_classifier(classifier_to_error_rate, use_smallest_error=True):
    """Given a dictionary mapping classifiers to their error rates, returns the
    best* classifier, or raises NoGoodClassifiersError if best* classifier has
    error rate 1/2.  best* means 'smallest error rate' if use_smallest_error
    is True, otherwise 'error rate furthest from 1/2'."""
    fish = sorted(classifier_to_error_rate.iteritems())
    if use_smallest_error:
        best_classifier = None
        best_score = 1000000
        for k,v in fish:
            if v < best_score:
                best_score = v
                best_classifier = k
        if best_score == make_fraction(1, 2):
            raise NoGoodClassifiersError("fish")
        else:
            return best_classifier
    else:
        best_classifier = None
        best_dist = 0
        for k,v in fish:
            if abs(make_fraction(1, 2) - v) > best_dist:
                best_score = abs(make_fraction(1, 2) - v)
                best_classifier = k
        if best_score == make_fraction(1, 2):
            raise NoGoodClassifiersError("fish")
        else:
            return best_classifier


def calculate_voting_power(error_rate):
    """Given a classifier's error rate (a number), returns the voting power
    (aka alpha, or coefficient) for that classifier."""
    if error_rate is 1:
        return -INF
    elif error_rate is 0:
        return INF
    else:
        return make_fraction(1, 2) * ln(make_fraction(1 - error_rate, error_rate))


def get_overall_misclassifications(H, training_points, classifier_to_misclassified):
    """Given an overall classifier H, a list of all training points, and a
    dictionary mapping classifiers to the training points they misclassify,
    returns a set containing the training points that H misclassifies.
    H is represented as a list of (classifier, voting_power) tuples."""
    misclassified = set()

    for p in sorted(training_points):
        score = 0
        for voting_power in sorted(H):
            if p not in classifier_to_misclassified[voting_power[0]]:
                score += voting_power[1]
            else:
                score -= voting_power[1]

    if score <= 0:
        misclassified.add(p)

    return misclassified


def is_good_enough(H, training_points, classifier_to_misclassified, mistake_tolerance=0):
    """Given an overall classifier H, a list of all training points, a
    dictionary mapping classifiers to the training points they misclassify, and
    a mistake tolerance (the maximum number of allowed misclassifications),
    returns False if H misclassifies more points than the tolerance allows,
    otherwise True.  H is represented as a list of (classifier, voting_power)
    tuples."""
    return False
    # return len(get_overall_misclassifications(H, training_points, classifier_to_misclassified)) <= mistake_tolerance


def update_weights(point_to_weight, misclassified_points, error_rate):
    """Given a dictionary mapping training points to their old weights, a list
    of training points misclassified by the current weak classifier, and the
    error rate of the current weak classifier, returns a dictionary mapping
    training points to their new weights.  This function is allowed (but not
    required) to modify the input dictionary point_to_weight."""
    for p in point_to_weight:
        if p not in misclassified_points:
            point_to_weight[p] = make_fraction(1, 2) * make_fraction(1, 1 - error_rate) * point_to_weight[p]
        else:
            point_to_weight[p] = make_fraction(1, 2) * make_fraction(1, error_rate) * point_to_weight[p]
    return point_to_weight


def adaboost(training_points, classifier_to_misclassified,
             use_smallest_error=True, mistake_tolerance=0, max_rounds=INF):
    """Performs the Adaboost algorithm for up to max_rounds rounds.
    Returns the resulting overall classifier H, represented as a list of
    (classifier, voting_power) tuples."""
    if max_rounds == INF:
        max_rounds = 10

    p2w = {}
    for p in training_points:
        p2w[p] = make_fraction(1, len(training_points))

    H, c = [], 0

    while c < max_rounds:
        c2err = calculate_error_rates(p2w, classifier_to_misclassified)
        try:
            best = pick_best_classifier(c2err, use_smallest_error)
        except:
            best = c2err.keys()[0]
        best_v = calculate_voting_power(c2err[best])
        c += 1
        if is_good_enough(H, training_points, classifier_to_misclassified, mistake_tolerance) or c2err[best] == make_fraction(1, 2):
            break
        H.append((best, best_v))
        p2w = update_weights(p2w, classifier_to_misclassified[best], c2err[best])

    return H


#### SURVEY ####################################################################

NAME = 'Evan Sandhoefner'
COLLABORATORS = 'Ryan Kerr'
HOW_MANY_HOURS_THIS_LAB_TOOK = 8
WHAT_I_FOUND_INTERESTING = 'Everything'
WHAT_I_FOUND_BORING = 'Nothing'
SUGGESTIONS = None
