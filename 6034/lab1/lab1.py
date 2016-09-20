# MIT 6.034 Lab 1: Rule-Based Systems
# Written by 6.034 staff

from production import IF, AND, OR, NOT, THEN, DELETE, forward_chain
from data import *

#### Part 1: Multiple Choice #########################################

ANSWER_1 = '2'

# note
ANSWER_2 = '4'

ANSWER_3 = '2'

ANSWER_4 = '0'

ANSWER_5 = '3'

ANSWER_6 = '1'

# note
ANSWER_7 = '0'

#### Part 2: Transitive Rule #########################################

transitive_rule = IF( AND( '(?x) beats (?y)',
                     '(?y) beats (?z)' ), THEN( '(?x) beats (?z)' ))

# You can test your rule by uncommenting these print statements:
# print forward_chain([transitive_rule], abc_data, verbose=1)
# print forward_chain([transitive_rule], poker_data, verbose=1)
# print forward_chain([transitive_rule], minecraft_data)


#### Part 3: Family Relations #########################################

# Define your rules here:



# Add your rules to this list:
# syntax (I hope):
# rule = IF ( ('') , THEN ('') )
# do I need to check personhood / how much?
self_rule = IF ( ('person (?x)') , THEN ('isself (?x) (?x)') )
# not_isself has to be first or I get isself maggie lisa etc... why?
# NOT is incapable of establishing variables so can't go very first
sibling_rule = IF(
                    AND(
                        'person (?x)',
                        'person (?y)',
                        NOT('isself (?x) (?y)'),
                        'person (?z)',
                        'parent (?z) (?x)',
                        'parent (?z) (?y)'),

                    THEN( 'sibling (?x) (?y)' ))

siblings_rule = IF(('sibling (?x) (?y)'), THEN ('sibling (?y) (?x)'))

child_rule = IF(AND('person (?x)','person (?y)',
                    'parent (?x) (?y)'),
                     THEN ('child (?y) (?x)'))

grandparent_rule = IF(AND('parent (?x) (?y)', 'parent (?y) (?z)'),
                    THEN('grandparent (?x) (?z)'))

grandchild_rule = IF(('grandparent (?x) (?y)'),
                    THEN ('grandchild (?y) (?x)'))

cousin_rule = IF( (AND('parent (?w) (?x)',
                        'parent (?z) (?y)',
                        'sibling (?w) (?z)',
                        NOT('sibling (?x) (?y)') # spec seems to rule out incest
             )), THEN ('cousin (?x) (?y)'))

cousins_rule = IF(('cousin (?x) (?y)'), THEN ('cousin (?y) (?x)'))

# put self rule in first if you can get it to work
family_rules = [ self_rule,sibling_rule, siblings_rule, child_rule,
         grandparent_rule,grandchild_rule,cousin_rule,cousins_rule]

# Uncomment this to test your data on the Simpsons family:
# print forward_chain(family_rules, simpsons_data, verbose=False)

# These smaller datasets might be helpful for debugging:
#print forward_chain(family_rules, sibling_test_data, verbose=True)
#print forward_chain(family_rules, grandparent_test_data, verbose=True)

# The following should generate 14 cousin relationships, representing 7 pairs
# of people who are cousins:
black_family_cousins = [
    relation for relation in
    forward_chain(family_rules, black_data, verbose=False)
    if "cousin" in relation ]

# To see if you found them all, uncomment this line:
#print black_family_cousins


#### Part 4: Backward Chaining #########################################

# Import additional methods for backchaining
from production import PASS, FAIL, match, populate, simplify, variables

def backchain_to_goal_tree(rules, hypothesis):
    """
    Takes a hypothesis (string) and a list of rules (list
    of IF objects), returning an AND/OR tree representing the
    backchain of possible statements we may need to test
    to determine if this hypothesis is reachable or not.

    This method should return an AND/OR tree, that is, an
    AND or OR object, whose constituents are the subgoals that
    need to be tested. The leaves of this tree should be strings
    (possibly with unbound variables), *not* AND or OR objects.
    Make sure to use simplify(...) to flatten trees where appropriate.
    """
    raise NotImplementedError

# Uncomment this to run your backward chainer:
#print backchain_to_goal_tree(zookeeper_rules, 'opus is a penguin')


#### Survey #########################################

NAME = None
COLLABORATORS = None
HOW_MANY_HOURS_THIS_LAB_TOOK = None
WHAT_I_FOUND_INTERESTING = None
WHAT_I_FOUND_BORING = None
SUGGESTIONS = None


###########################################################
### Ignore everything below this line; for testing only ###
###########################################################

# The following lines are used in the tester. DO NOT CHANGE!
transitive_rule_poker = forward_chain([transitive_rule], poker_data)
transitive_rule_abc = forward_chain([transitive_rule], abc_data)
transitive_rule_minecraft = forward_chain([transitive_rule], minecraft_data)
family_rules_simpsons = forward_chain(family_rules, simpsons_data)
family_rules_black = forward_chain(family_rules, black_data)
family_rules_sibling = forward_chain(family_rules, sibling_test_data)
family_rules_grandparent = forward_chain(family_rules, grandparent_test_data)
family_rules_anonymous_family = forward_chain(family_rules, anonymous_family_test_data)
