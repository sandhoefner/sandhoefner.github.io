# MIT 6.034 Lab 6: Neural Nets
# Written by Jessica Noss (jmn), Dylan Holmes (dxh), Jake Barnwell (jb16), and 6.034 staff

from nn_problems import *
from math import e
INF = float('inf')

#### NEURAL NETS ###############################################################

# Wiring a neural net

nn_half = []

nn_angle = []

nn_cross = []

nn_stripe = []

nn_hexagon = []

nn_grid = []

# Threshold functions
def stairstep(x, threshold=0):
    "Computes stairstep(x) using the given threshold (T)"
    if x >= threshold:
        return 1
    return 0

def sigmoid(x, steepness=1, midpoint=0):
    "Computes sigmoid(x) using the given steepness (S) and midpoint (M)"
    return float(1) / (1 + e ** (-steepness * (x - midpoint)))

def ReLU(x):
    "Computes the threshold of an input using a rectified linear unit."
    if x < 0:
        return 0
    return x

# Accuracy function
def accuracy(desired_output, actual_output):
    "Computes accuracy. If output is binary, accuracy ranges from -0.5 to 0."
    diff = actual_output - desired_output
    # from lecture notes (performance, not accuracy)
    return -0.5 * (diff ** 2)

# Forward propagation

def node_value(node, input_values, neuron_outputs):  # STAFF PROVIDED
    """Given a node, a dictionary mapping input names to their values, and a
    dictionary mapping neuron names to their outputs, returns the output value
    of the node."""
    if isinstance(node, basestring):
        return input_values[node] if node in input_values else neuron_outputs[node]
    return node  # constant input, such as -1

def forward_prop(net, input_values, threshold_fn=stairstep):
    """Given a neural net and dictionary of input values, performs forward
    propagation with the given threshold function to compute binary output.
    This function should not modify the input net.  Returns a tuple containing:
    (1) the final output of the neural net
    (2) a dictionary mapping neurons to their immediate outputs"""


    # for a single neuron:
    # each input into the neuron is multiplied by the weight on the wire
    # the weighted inputs are summed together
    # the sum is passed through a specified threshold function to produce the output

    intermediate_values = input_values.copy()
    # print intermediate_values
    # print net
    for neuron in net.topological_sort():
        intermediate_values[neuron] = threshold_fn(node_value(neuron, input_values, {neuron: 0}))

    return (intermediate_values[net.get_output_neuron()], intermediate_values)


# Backward propagation warm-up
def gradient_ascent_step(func, inputs, step_size):
    """Given an unknown function of three variables and a list of three values
    representing the current inputs into the function, increments each variable
    by +/- step_size or 0, with the goal of maximizing the function output.
    After trying all possible variable assignments, returns a tuple containing:
    (1) the maximum function output found, and
    (2) the list of inputs that yielded the highest function output."""

    raise NotImplementedError

def get_back_prop_dependencies(net, wire):
    """Given a wire in a neural network, returns a set of inputs, neurons, and
    Wires whose outputs/values are required to update this wire's weight."""
    raise NotImplementedError

# Backward propagation
def calculate_deltas(net, desired_output, neuron_outputs):
    """Given a neural net and a dictionary of neuron outputs from forward-
    propagation, computes the update coefficient (delta_B) for each
    neuron in the net. Uses the sigmoid function to compute neuron output.
    Returns a dictionary mapping neuron names to update coefficient (the
    delta_B values). """
    raise NotImplementedError

def update_weights(net, input_values, desired_output, neuron_outputs, r=1):
    """Performs a single step of back-propagation.  Computes delta_B values and
    weight updates for entire neural net, then updates all weights.  Uses the
    sigmoid function to compute neuron output.  Returns the modified neural net,
    with the updated weights."""
    raise NotImplementedError

def back_prop(net, input_values, desired_output, r=1, minimum_accuracy=-0.001):
    """Updates weights until accuracy surpasses minimum_accuracy.  Uses the
    sigmoid function to compute neuron output.  Returns a tuple containing:
    (1) the modified neural net, with trained weights
    (2) the number of iterations (that is, the number of weight updates)"""
    raise NotImplementedError


# Training a neural net

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


#### SURVEY ####################################################################

NAME = 'Evan Sandhoefner'
COLLABORATORS = 'Ryan Kerr'
HOW_MANY_HOURS_THIS_LAB_TOOK = 12
WHAT_I_FOUND_INTERESTING = 'Getting under the hood of a neural net'
WHAT_I_FOUND_BORING = 'writing helper functions'
SUGGESTIONS = None
