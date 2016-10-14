# MIT 6.034 Lab 4: Constraint Satisfaction Problems
# Written by Dylan Holmes (dxh), Jessica Noss (jmn), and 6.034 staff

from constraint_api import *
import itertools
from test_problems import get_pokemon_problem

#### PART 1: WRITE A DEPTH-FIRST SEARCH CONSTRAINT SOLVER

def has_empty_domains(csp) :
    "Returns True if the problem has one or more empty domains, otherwise False"
    domains = csp.domains
    for key in domains:
        domain = domains[key]
        if not domain:
            return True
    return False


def check_all_constraints(csp) :
    """Return False if the problem's assigned values violate some constraint,
    otherwise True"""
    cons = csp.constraints
    vals = csp.assigned_values
    for con in cons:
        try:
            val1 = vals[con.var1]
            val2 = vals[con.var2]
            if not con.check(val1, val2):
                return False
        except:
            # PASS NOT BREAK
            pass
    return True

def solve_constraint_dfs(problem) :
    """Solves the problem using depth-first search.  Returns a tuple containing:
    1. the solution (a dictionary mapping variables to assigned values), and
    2. the number of extensions made (the number of problems popped off the agenda).
    If no solution was found, return None as the first element of the tuple."""

    # clear up problem representation, what am I actually working with
    agenda = [problem]
    extensions = 0
    while agenda:
        first_prob = agenda.pop()
        extensions += 1
        if has_empty_domains(first_prob) or (not check_all_constraints(first_prob)):
            continue
            # return (None, extensions)
        elif not first_prob.unassigned_vars:
            return (first_prob.assigned_values, extensions)
        else:
            first_unass = first_prob.pop_next_unassigned_var()
            new_probs = []
            # maybe try get_domain
            for value in first_prob.get_domain(first_unass):
                # create new problem with value assigned to variable
                new_prob = first_prob.copy()
                new_prob.set_assigned_value(first_unass, value)
                new_probs.insert(0, new_prob)
                # new_probs.append(new_prob)
            # for prob in new_probs:
            #     # add to agenda old to new
            #     agenda.insert(0, prob)
            agenda.extend(new_probs)
    return (None, extensions)



#### PART 2: DOMAIN REDUCTION BEFORE SEARCH

def eliminate_from_neighbors(csp, var) :
    """Eliminates incompatible values from var's neighbors' domains, modifying
    the original csp.  Returns an alphabetically sorted list of the neighboring
    variables whose domains were reduced, with each variable appearing at most
    once.  If no domains were reduced, returns empty list.
    If a domain is reduced to size 0, quits immediately and returns None."""

    """First, we will write a helper function to eliminate inconsistent values from a
    variable's neighbors' domains. In particular, for a given neighbor n of a variable v,
    if n has a value nval that violates a constraint with every value in v's domain, we
    want to remove nval from n's domain.

    This function should return an alphabetically sorted list of the neighbors whose
    domains were reduced, with each neighbor appearing at most once in the list
    (the list should contain no duplicates). If no domains are reduced, return an empty list;
    if a domain is reduced to size 0 (no values left in domain), quit and immediately return None.
    This method should modify the input csp.

    Hint: csp.constraints_between may help."""

    def has_conflict(cons,value,value2):
        for con in cons:
            if not con.check(value,value2):
                return True
        return False

    # in every case (so far) it's either removing 1 too few or removing the right amount
    neighbors = csp.get_neighbors(var)
    vars_reduced = []
    my_domain = csp.get_domain(var)
    for neighbor in neighbors:
        cons = csp.constraints_between(var, neighbor)
        # note: important python quirk
        neighbor_domain = csp.copy().get_domain(neighbor)
        for value in neighbor_domain:
            # print value
            # if value violates a constraint with every value in my_domain, remove value
            every_conflict = True
            for value2 in my_domain:
                this_conflict = has_conflict(cons,value,value2)
                # print this_conflict
                every_conflict = every_conflict and this_conflict
            if every_conflict:
                # remove value from neighbors domain
                # print csp
                csp.eliminate(neighbor, value)
                # print csp
                # append to vars_reduced
                vars_reduced.append(neighbor)
                # if neighbors domain is now 0:
                if not csp.get_domain(neighbor):
                    return None
    return sorted(list(set(vars_reduced)))





def domain_reduction(csp, queue=None) :
    """Uses constraints to reduce domains, modifying the original csp.
    If queue is None, initializes propagation queue by adding all variables in
    their default order.  Returns a list of all variables that were dequeued,
    in the order they were removed from the queue.  Variables may appear in the
    list multiple times.
    If a domain is reduced to size 0, quits immediately and returns None."""
    dqd = []
    if not queue:
        queue = csp.get_all_variables()
        print queue
    while queue:
        var = queue.pop(0)
        dqd.append(var)
        result = eliminate_from_neighbors(csp, var)
        if not result:
            return None
        else:
            for v in result:
                if v not in queue:
                    queue.append(v)
    return dqd


# QUESTION 1: How many extensions does it take to solve the Pokemon problem
#    with dfs if you DON'T use domain reduction before solving it?

# Hint: Use get_pokemon_problem() to get a new copy of the Pokemon problem
#    each time you want to solve it with a different search method.

ANSWER_1 = 20

# QUESTION 2: How many extensions does it take to solve the Pokemon problem
#    with dfs if you DO use domain reduction before solving it?

ANSWER_2 = 6


#### PART 3: PROPAGATION THROUGH REDUCED DOMAINS

def solve_constraint_propagate_reduced_domains(problem) :
    """Solves the problem using depth-first search with forward checking and
    propagation through all reduced domains.  Same return type as
    solve_constraint_dfs."""
    raise NotImplementedError

# QUESTION 3: How many extensions does it take to solve the Pokemon problem
#    with propagation through reduced domains? (Don't use domain reduction
#    before solving it.)

ANSWER_3 = None


#### PART 4: PROPAGATION THROUGH SINGLETON DOMAINS

def domain_reduction_singleton_domains(csp, queue=None) :
    """Uses constraints to reduce domains, modifying the original csp.
    Only propagates through singleton domains.
    Same return type as domain_reduction."""
    raise NotImplementedError

def solve_constraint_propagate_singleton_domains(problem) :
    """Solves the problem using depth-first search with forward checking and
    propagation through singleton domains.  Same return type as
    solve_constraint_dfs."""
    raise NotImplementedError

# QUESTION 4: How many extensions does it take to solve the Pokemon problem
#    with propagation through singleton domains? (Don't use domain reduction
#    before solving it.)

ANSWER_4 = None


#### PART 5: FORWARD CHECKING

def propagate(enqueue_condition_fn, csp, queue=None) :
    """Uses constraints to reduce domains, modifying the original csp.
    Uses enqueue_condition_fn to determine whether to enqueue a variable whose
    domain has been reduced.  Same return type as domain_reduction."""
    raise NotImplementedError

def condition_domain_reduction(csp, var) :
    """Returns True if var should be enqueued under the all-reduced-domains
    condition, otherwise False"""
    raise NotImplementedError

def condition_singleton(csp, var) :
    """Returns True if var should be enqueued under the singleton-domains
    condition, otherwise False"""
    raise NotImplementedError

def condition_forward_checking(csp, var) :
    """Returns True if var should be enqueued under the forward-checking
    condition, otherwise False"""
    raise NotImplementedError


#### PART 6: GENERIC CSP SOLVER

def solve_constraint_generic(problem, enqueue_condition=None) :
    """Solves the problem, calling propagate with the specified enqueue
    condition (a function).  If enqueue_condition is None, uses DFS only.
    Same return type as solve_constraint_dfs."""
    raise NotImplementedError

# QUESTION 5: How many extensions does it take to solve the Pokemon problem
#    with DFS and forward checking, but no propagation? (Don't use domain
#    reduction before solving it.)

ANSWER_5 = None


#### PART 7: DEFINING CUSTOM CONSTRAINTS

def constraint_adjacent(m, n) :
    """Returns True if m and n are adjacent, otherwise False.
    Assume m and n are ints."""
    difference = m - n
    if difference is 1 or difference is -1:
        return True
    return False

def constraint_not_adjacent(m, n) :
    """Returns True if m and n are NOT adjacent, otherwise False.
    Assume m and n are ints."""
    return not constraint_adjacent(m, n)

def all_different(variables) :
    """Returns a list of constraints, with one difference constraint between
    each pair of variables."""
    if len(variables) < 2:
        return []
    pairs = []
    for comb in itertools.combinations(variables, 2):
        pairs.append(comb)
    # pairs is a list of tuples
    constraints = []
    for pair in pairs:
        constraint = Constraint(pair[0], pair[1], constraint_different)
        constraints.append(constraint)
    return constraints



#### PART 8: MOOSE PROBLEM (OPTIONAL)

moose_problem = ConstraintSatisfactionProblem(["You", "Moose", "McCain",
                                               "Palin", "Obama", "Biden"])

# Add domains and constraints to your moose_problem here:


# To test your moose_problem AFTER implementing all the solve_constraint
# methods above, change TEST_MOOSE_PROBLEM to True:
TEST_MOOSE_PROBLEM = False


#### SURVEY ###################################################

NAME = "Evan Sandhoefner"
COLLABORATORS = "Ryan Kerr"
HOW_MANY_HOURS_THIS_LAB_TOOK = 12
WHAT_I_FOUND_INTERESTING = "Comparing efficiency of methods"
WHAT_I_FOUND_BORING = "Writing helper functions"
SUGGESTIONS = None


###########################################################
### Ignore everything below this line; for testing only ###
###########################################################

if TEST_MOOSE_PROBLEM:
    # These lines are used in the local tester iff TEST_MOOSE_PROBLEM is True
    moose_answer_dfs = solve_constraint_dfs(moose_problem.copy())
    moose_answer_propany = solve_constraint_propagate_reduced_domains(moose_problem.copy())
    moose_answer_prop1 = solve_constraint_propagate_singleton_domains(moose_problem.copy())
    moose_answer_generic_dfs = solve_constraint_generic(moose_problem.copy(), None)
    moose_answer_generic_propany = solve_constraint_generic(moose_problem.copy(), condition_domain_reduction)
    moose_answer_generic_prop1 = solve_constraint_generic(moose_problem.copy(), condition_singleton)
    moose_answer_generic_fc = solve_constraint_generic(moose_problem.copy(), condition_forward_checking)
    moose_instance_for_domain_reduction = moose_problem.copy()
    moose_answer_domain_reduction = domain_reduction(moose_instance_for_domain_reduction)
    moose_instance_for_domain_reduction_singleton = moose_problem.copy()
    moose_answer_domain_reduction_singleton = domain_reduction_singleton_domains(moose_instance_for_domain_reduction_singleton)
