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
    print var
    if givens is not None:
        givens = simplify_givens(net, var, givens)

    parents = net.get_parents(var)
    parents_vals = {}
    # for parent in parents:
        # parents_vals[parent] = net.get_
    # try:
    return net.get_probability(hypothesis, givens, infer_missing=True)
    # except LookupError:
    #     return LookupError

def probability_joint(net, hypothesis):
    "Uses the chain rule to compute a joint probability"
    raise NotImplementedError

def probability_marginal(net, hypothesis):
    "Computes a marginal probability as a sum of joint probabilities"
    raise NotImplementedError

def probability_conditional(net, hypothesis, givens=None):
    "Computes a conditional probability as a ratio of marginal probabilities"
    raise NotImplementedError

def probability(net, hypothesis, givens=None):
    "Calls previous functions to compute any probability"
    raise NotImplementedError


#### PARAMETER-COUNTING AND INDEPENDENCE #######################################

def number_of_parameters(net):
    "Computes minimum number of parameters required for net"
    raise NotImplementedError


def is_independent(net, var1, var2, givens=None):
    """Return True if var1, var2 are conditionally independent given givens,
    otherwise False.  Uses numerical independence."""
    raise NotImplementedError

def is_structurally_independent(net, var1, var2, givens=None):
    """Return True if var1, var2 are conditionally independent given givens,
    based on the structure of the Bayes net, otherwise False.
    Uses structural independence only (not numerical independence)."""
    raise NotImplementedError


#### SURVEY ####################################################################

NAME = 'Evan Sandhoefner'
COLLABORATORS = 'Ryan Kerr'
HOW_MANY_HOURS_THIS_LAB_TOOK = 8
WHAT_I_FOUND_INTERESTING = 'Structural independence'
WHAT_I_FOUND_BORING = 'None'
SUGGESTIONS = None
