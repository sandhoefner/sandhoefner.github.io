# MIT 6.034 Lab 5: k-Nearest Neighbors and Identification Trees
# Written by Jessica Noss (jmn), Dylan Holmes (dxh), and Jake Barnwell (jb16)

from api import *
from data import *
import math
log2 = lambda x: math.log(x, 2)
INF = float('inf')

################################################################################
############################# IDENTIFICATION TREES #############################
################################################################################

def id_tree_classify_point(point, id_tree):
    """Uses the input ID tree (an IdentificationTreeNode) to classify the point.
    Returns the point's classification."""
    if id_tree.is_leaf():
        return id_tree.get_node_classification()
    else:
        return id_tree_classify_point(point, id_tree.apply_classifier(point))


def split_on_classifier(data, classifier):
    """Given a set of data (as a list of points) and a Classifier object, uses
    the classifier to partition the data.  Returns a dict mapping each feature
    values to a list of points that have that value."""
    ret = {}
    for point in data:
        classification = classifier.classify(point)
        try:
            noodles = ret[classification]
            # don't need equals here, it just goes in and does it
            ret[classification].append(point)
        except:
            ret[classification] = [point]
    return ret


#### CALCULATING DISORDER

def branch_disorder(data, target_classifier):
    """Given a list of points representing a single branch and a Classifier
    for determining the true classification of each point, computes and returns
    the disorder of the branch."""
    classes = {}
    for datum in data:
        clas = target_classifier.classify(datum)
        try:
            classes[clas] += 1
        except:
            classes[clas] = 1
    summ = 0
    for clas in classes:
        ratio = classes[clas] / float(len(data))
        summ -= ratio * log2(ratio)
    return summ


def average_test_disorder(data, test_classifier, target_classifier):
    """Given a list of points, a feature-test Classifier, and a Classifier
    for determining the true classification of each point, computes and returns
    the disorder of the feature-test stump."""
    branches = {}
    for datum in data:
        branch = test_classifier.classify(datum)
        try:
            branches[branch].append(datum)
        except:
            branches[branch] = [datum]
    summ = 0
    for key in branches:
        branch = branches[key]
        summ += branch_disorder(branch, target_classifier) * len(branch) / float(len(data))
    return summ


## To use your functions to solve part A2 of the "Identification of Trees"
## problem from 2014 Q2, uncomment the lines below and run lab5.py:
#for classifier in tree_classifiers:
#    print classifier.name, average_test_disorder(tree_data, classifier, feature_test("tree_type"))


#### CONSTRUCTING AN ID TREE

def find_best_classifier(data, possible_classifiers, target_classifier):
    """Given a list of points, a list of possible Classifiers to use as tests,
    and a Classifier for determining the true classification of each point,
    finds and returns the classifier with the lowest disorder.  Breaks ties by
    preferring classifiers that appear earlier in the list.  If the best
    classifier has only one branch, raises NoGoodClassifiersError."""
    best = INF
    best_name = None

    for option in possible_classifiers:
        this_score = average_test_disorder(data, option, target_classifier)
        if this_score < best:
            best = this_score
            best_name = option

    branches = {}
    for datum in data:
        branch = best_name.classify(datum)
        try:
            branches[branch].append(datum)
        except:
            branches[branch] = [datum]
    if len(branches) is 1:
        raise NoGoodClassifiersError
    else:
        return best_name


## To find the best classifier from 2014 Q2, Part A, uncomment:
#print find_best_classifier(tree_data, tree_classifiers, feature_test("tree_type"))

def construct_greedy_id_tree(data, possible_classifiers, target_classifier, id_tree_node=None):
    """Given a list of points, a list of possible Classifiers to use as tests,
    a Classifier for determining the true classification of each point, and
    optionally a partially completed ID tree, returns a completed ID tree by
    adding classifiers and classifications until either perfect classification
    has been achieved, or there are no good classifiers left."""

    error = False

    try:
        best_classifier = find_best_classifier(data, possible_classifiers, target_classifier)
    except NoGoodClassifiersError:
        error = True

    if id_tree_node is None:
        # TARGET NOT BEST
        id_tree_node = IdentificationTreeNode(target_classifier)

    # if is leaf
    split = split_on_classifier(data, target_classifier)
    if len(split) is 1:
        # classification, not classifier
        id_tree_node.set_node_classification(split.keys()[0])

    elif error:
        id_tree_node.set_node_classification(None)

    else:
        classes = split_on_classifier(data, best_classifier)
        id_tree_node.set_classifier_and_expand(best_classifier, classes)
        branches = id_tree_node.get_branches()

        for key in branches:
            newNode = branches[key]
            # give it only subset of data
            # classes[key] was right
            construct_greedy_id_tree(classes[key], possible_classifiers, target_classifier, newNode)

    return id_tree_node



## To construct an ID tree for 2014 Q2, Part A:
#print construct_greedy_id_tree(tree_data, tree_classifiers, feature_test("tree_type"))

## To use your ID tree to identify a mystery tree (2014 Q2, Part A4):
#tree_tree = construct_greedy_id_tree(tree_data, tree_classifiers, feature_test("tree_type"))
#print id_tree_classify_point(tree_test_point, tree_tree)

## To construct an ID tree for 2012 Q2 (Angels) or 2013 Q3 (numeric ID trees):
#print construct_greedy_id_tree(angel_data, angel_classifiers, feature_test("Classification"))
#print construct_greedy_id_tree(numeric_data, numeric_classifiers, feature_test("class"))


#### MULTIPLE CHOICE

ANSWER_1 = "bark_texture"
ANSWER_2 = "leaf_shape"
ANSWER_3 = "orange_foliage"

ANSWER_4 = [2,3]
ANSWER_5 = [3]
ANSWER_6 = [2]
ANSWER_7 = 2

ANSWER_8 = "no"
ANSWER_9 = "no"


################################################################################
############################# k-NEAREST NEIGHBORS ##############################
################################################################################

#### MULTIPLE CHOICE: DRAWING BOUNDARIES

BOUNDARY_ANS_1 = 3
BOUNDARY_ANS_2 = 4

BOUNDARY_ANS_3 = 1
BOUNDARY_ANS_4 = 2

BOUNDARY_ANS_5 = 2
BOUNDARY_ANS_6 = 4
BOUNDARY_ANS_7 = 1
BOUNDARY_ANS_8 = 4
BOUNDARY_ANS_9 = 4

BOUNDARY_ANS_10 = 4
BOUNDARY_ANS_11 = 2
BOUNDARY_ANS_12 = 1
BOUNDARY_ANS_13 = 4
BOUNDARY_ANS_14 = 4


#### WARM-UP: DISTANCE METRICS

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


def euclidean_distance(point1, point2):
    "Given two Points, computes and returns the Euclidean distance between them."
    summ = 0
    a = point1.coords
    b = point2.coords
    for i in range(len(a)):
        summ += float(float(a[i] - b[i]) ** 2)
    return float(float(summ) ** 0.5)


def manhattan_distance(point1, point2):
    "Given two Points, computes and returns the Manhattan distance between them."
    summ = 0
    a = point1.coords
    b = point2.coords
    for i in range(len(a)):
        summ += abs(a[i] - b[i])
    return summ


def hamming_distance(point1, point2):
    "Given two Points, computes and returns the Hamming distance between them."
    summ = 0
    a = point1.coords
    b = point2.coords
    for i in range(len(a)):
        if a[i] is not b[i]:
            summ += 1
    return summ


def cosine_distance(point1, point2):
    """Given two Points, computes and returns the cosine distance between them,
    where cosine distance is defined as 1-cos(angle_between(point1, point2))."""
    a = point1.coords
    b = point2.coords
    # if this is it
    return 1 - dot_product(a, b) / float(float(norm(a)) * float(norm(b)))


#### CLASSIFYING POINTS

def get_k_closest_points(point, data, k, distance_metric):
    """Given a test point, a list of points (the data), an int 0 < k <= len(data),
    and a distance metric (a function), returns a list containing the k points
    from the data that are closest to the test point, according to the distance
    metric.  Breaks ties lexicographically by coordinates."""
    # beautiful
    data = sorted(data, key=lambda datum: datum.coords)
    data = sorted(data, key=lambda datum: distance_metric(point, datum))
    return data[:k]


def knn_classify_point(point, data, k, distance_metric):
    """Given a test point, a list of points (the data), an int 0 < k <= len(data),
    and a distance metric (a function), returns the classification of the test
    point based on its k nearest neighbors, as determined by the distance metric.
    Assumes there are no ties."""
    nn = get_k_closest_points(point, data, k, distance_metric)
    classes = [n.classification for n in nn]
    mode = max(set(classes), key=lambda c: classes.count(c))
    return mode

## To run your classify function on the k-nearest neighbors problem from 2014 Q2
## part B2, uncomment the line below and try different values of k:
#print knn_classify_point(knn_tree_test_point, knn_tree_data, 5, euclidean_distance)


#### CHOOSING k

def cross_validate(data, k, distance_metric):
    """Given a list of points (the data), an int 0 < k <= len(data), and a
    distance metric (a function), performs leave-one-out cross-validation.
    Return the fraction of points classified correctly, as a float."""
    right = 0
    wrong = 0
    # XRANGE???
    for i in xrange(len(data)):
        # print i
        # training = data[:]
        test = data[i]
        training = data[:i] + data[i+1:]
        trueClass = test.classification
        # del training[i]
        # this line seemed to do it.... was it IS vs == or order matters?
        if knn_classify_point(test, training, k, distance_metric) == trueClass:
            right += 1
        else:
            wrong += 1
    return right / float(right + wrong)



def find_best_k_and_metric(data):
    """Given a list of points (the data), uses leave-one-out cross-validation to
    determine the best value of k and distance_metric, choosing from among the
    four distance metrics defined above.  Returns a tuple (k, distance_metric),
    where k is an int and distance_metric is a function."""
    best_score = -1
    best_tup = None
    for k in range(1, len(data) + 1):
        for f in [euclidean_distance, hamming_distance, manhattan_distance, cosine_distance]:
            this_score = cross_validate(data, k, f)
            if this_score > best_score:
                best_score = this_score
                best_tup = (k, f)
    return best_tup


## To find the best k and distance metric for 2014 Q2, part B, uncomment:
#print find_best_k_and_metric(knn_tree_data)


#### MORE MULTIPLE CHOICE

kNN_ANSWER_1 = "overfitting"
kNN_ANSWER_2 = "underfitting"
kNN_ANSWER_3 = 4

kNN_ANSWER_4 = 4
kNN_ANSWER_5 = 1
kNN_ANSWER_6 = 3
kNN_ANSWER_7 = 3

#### SURVEY ###################################################

NAME = "Evan Sandhoefner"
COLLABORATORS = "Ryan Kerr"
HOW_MANY_HOURS_THIS_LAB_TOOK = 8
WHAT_I_FOUND_INTERESTING = "Different distance metrics"
WHAT_I_FOUND_BORING = "MCQ"
SUGGESTIONS = None
