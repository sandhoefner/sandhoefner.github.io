# MIT 6.034 Lab 8: Bayesian Inference
# Written by Dylan Holmes (dxh), Jessica Noss (jmn), and 6.034 staff

from nets import *


#### ANCESTORS, DESCENDANTS, AND NON-DESCENDANTS ###############################

def get_ancestors(net, var):
    "Return a set containing the ancestors of var"
    x = list(net.get_parents(var))
    for item in x:
        x.extend(get_ancestors(net, item))
    return set(x)

def get_descendants(net, var):
    "Returns a set containing the descendants of var"
    x = list(net.get_children(var))
    for item in x:
        x.extend(get_descendants(net, item))
    return set(x)

def get_nondescendants(net, var):
    "Returns a set containing the non-descendants of var"
    allVars = net.get_variables()
    descendants = list(get_descendants(net, var))
    return set([vari for vari in allVars if vari not in descendants and vari != var])


def simplify_givens(net, var, givens):
    """If givens include every parent of var and no descendants, returns a
    simplified list of givens, keeping only parents.  Does not modify original
    givens.  Otherwise, if not all parents are given, or if a descendant is
    given, returns original givens."""
    desc = True
    for item in get_descendants(net, var):
        if item in givens:
            desc = False
    parents = net.get_parents(var)
    if parents.issubset(givens) and desc:
        return {k:v for k,v in givens.iteritems() if k in parents}
    else:
        return givens


#### PROBABILITY ###############################################################

def probability_lookup(net, hypothesis, givens=None):
    "Looks up a probability in the Bayes net, or raises LookupError"
    var = hypothesis.keys()[0]

    if givens is not None:
        givens = simplify_givens(net, var, givens)

    try:
        return net.get_probability(hypothesis, givens, infer_missing=True)
    except:
        raise LookupError



def probability_joint(net, hypothesis):
    "Uses the chain rule to compute a joint probability"
    keys = net.topological_sort()
    keys.reverse()
    events = copy.deepcopy(hypothesis)
    product = 1
    while keys:
        key = keys.pop(0)
        event = {key: events.pop(key)}
        product *= probability_lookup(net, event, events)
    return product



def probability_marginal(net, hypothesis):
    "Computes a marginal probability as a sum of joint probabilities"
    possibilities = net.combinations(net.get_variables(), hypothesis)
    summ = 0
    for poss in possibilities:
        summ += probability_joint(net, poss)
    return summ



def probability_conditional(net, hypothesis, givens=None):
    "Computes a conditional probability as a ratio of marginal probabilities"
    if givens is not None:
        for key in hypothesis.keys():
            if key in givens.keys():
                if hypothesis[key] != givens[key]:
                    return 0.0
        dummy = dict(hypothesis, **givens)
    else:
        dummy = hypothesis
    num = probability_marginal(net, dummy)
    den = probability_marginal(net, givens)
    return num / float(den)



def probability(net, hypothesis, givens=None):
    "Calls previous functions to compute any probability"
    try:
        return probability_lookup(net, hypothesis, givens)
    except:
        if givens is not None:
            return probability_conditional(net, hypothesis, givens)
        elif hypothesis.keys() == net.get_variables():
            return probability_joint(net, hypothesis)
        else:
            return probability_marginal(net, hypothesis)


#### PARAMETER-COUNTING AND INDEPENDENCE #######################################

def get_neighbors(net, var):
    ret = []
    for tested in net.get_variables():
        if net.is_neighbor(var, tested):
            ret.append(tested)
    return ret

def number_of_parameters(net):
    "Computes minimum number of parameters required for net"
    summ = 0
    for var in net.get_variables():
        neighbors = net.get_parents(var)
        dom = len(net.get_domain(var)) - 1
        if len(neighbors) > 0:
            product = 1
            for neighbor in neighbors:
                product *= len(net.get_domain(neighbor)) * dom
        # summ += len(dom)
            summ += product
        else:
            summ += dom
    return summ


def is_independent(net, var1, var2, givens=None):
    """Return True if var1, var2 are conditionally independent given givens,
    otherwise False.  Uses numerical independence."""
    print net.get_domain(var1)
    print net.get_domain(var2)
    if givens is not None:
        #  return True if var1 and var2 are conditionally independent given the givens
        if givens is not None:
            hyp1 = dict({var2: True}, **givens)
        else:
            hyp1 = {var2: True}
        if approx_equal(probability_conditional(net, {var1: True}, hyp1), probability_conditional(net, {var1: True}, {var2: True})):
            return True
    else:
        a = {var1: True}
        b = {var2: True}
        ab = dict(a, **b)
        if approx_equal(probability_marginal(net, ab), probability_marginal(net, a) * probability_marginal(net, b)):
            return True
    return False

def is_structurally_independent(net, var1, var2, givens=None):
    """Return True if var1, var2 are conditionally independent given givens,
    based on the structure of the Bayes net, otherwise False.
    Uses structural independence only (not numerical independence)."""
    return False


#### SURVEY ####################################################################

NAME = 'Evan Sandhoefner'
COLLABORATORS = 'Ryan Kerr'
HOW_MANY_HOURS_THIS_LAB_TOOK = 8
WHAT_I_FOUND_INTERESTING = 'Structural independence'
WHAT_I_FOUND_BORING = 'None'
SUGGESTIONS = None
