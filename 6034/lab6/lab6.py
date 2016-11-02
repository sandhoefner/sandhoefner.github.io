# MIT 6.034 Lab 6: Neural Nets
# Written by Jessica Noss (jmn), Dylan Holmes (dxh), Jake Barnwell (jb16), and 6.034 staff

from nn_problems import *
from math import e
INF = float('inf')

#### NEURAL NETS ###############################################################

# Wiring a neural net

nn_half = [1]

nn_angle = [2, 1]

nn_cross = [2, 2, 1]

nn_stripe = [3, 1]

nn_hexagon = [6, 1]

nn_grid = [4, 2, 1]


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
    sorted_net = net.topological_sort()
    ret = {}

    while sorted_net:
        node = sorted_net[0]
        del sorted_net[0]
        neighbors = net.get_incoming_neighbors(node)
        total = 0

        for neighbor in neighbors:
            wire = net.get_wires(neighbor, node)

            if neighbor in ret:
                total += ret[neighbor] * wire[0].get_weight()
            elif isinstance(neighbor, int):
                total += neighbor * wire[0].get_weight()
            else:
                total += input_values[neighbor] * wire[0].get_weight()
        ret[node] = threshold_fn(total)
    return (ret[net.get_output_neuron()], ret)


# Backward propagation warm-up
def gradient_ascent_step(func, inputs, step_size):
    """Given an unknown function of three variables and a list of three values
    representing the current inputs into the function, increments each variable
    by +/- step_size or 0, with the goal of maximizing the function output.
    After trying all possible variable assignments, returns a tuple containing:
    (1) the maximum function output found, and
    (2) the list of inputs that yielded the highest function output."""
    ret = inputs[:]
    maxi = -INF
    options = [-step_size, 0, step_size]

    for a in options:
        for b in options:
            for c in options:
                if maxi < func(inputs[0] + a, inputs[1] + b, inputs[2] + c):
                    ret = [inputs[0] + a, inputs[1] + b, inputs[2] + c]
                    maxi = func(inputs[0] + a, inputs[1] + b, inputs[2] + c)
    return (maxi, ret)


def get_back_prop_dependencies(net, wire):
    """Given a wire in a neural network, returns a set of inputs, neurons, and
    Wires whose outputs/values are required to update this wire's weight."""
    nodes = []
    ret = [wire, wire.endNode]
    wires = [wire]

    while wires:
        w = wires[0]
        del wires[0]
        b = w.endNode
        a = w.startNode
        ret = ret + [a]
        ret = ret + [b]

        if b != net.get_output_neuron() and b not in nodes:
            wires.extend(net.get_wires(b, None))
            ret = ret + net.get_wires(b, None)

        nodes = nodes + [a]
        nodes = nodes + [b]
    return set(ret)


# Backward propagation
def calculate_deltas(net, desired_output, neuron_outputs):
    """Given a neural net and a dictionary of neuron outputs from forward-
    propagation,
    computes the update coefficient (delta_B) for each
    neuron in the net.
    Uses the sigmoid function to compute neuron output.
    Returns a dictionary mapping neuron names to update coefficient (the
    delta_B values). """
    ret = {}
    sorted_net = net.topological_sort()

    for node in sorted_net[::-1]:
        if node == net.get_output_neuron():
            ret[node] = ((1 - neuron_outputs[node]) * neuron_outputs[node]
                         * (desired_output - neuron_outputs[node]))
        else:
            total = 0

            for neighbor in net.get_outgoing_neighbors(node):
                wire = net.get_wires(node, neighbor)
                total = total + wire[0].get_weight() * ret[neighbor]

            ret[node] = (1 - neuron_outputs[node]) * neuron_outputs[node] * total

    return ret


def update_weights(net, input_values, desired_output, neuron_outputs, r=1):
    """Performs a single step of back-propagation.  Computes delta_B values and
    weight updates for entire neural net, then updates all weights.  Uses the
    sigmoid function to compute neuron output.  Returns the modified neural net,
    with the updated weights."""
    deltas = calculate_deltas(net, desired_output, neuron_outputs)

    for wire in net.get_wires(None, None):
        b = wire.endNode
        w = wire.get_weight()
        a = wire.startNode

        if a in input_values:
            wire.set_weight(w + r * input_values[a] * deltas[b])
        elif isinstance(a, int):
            wire.set_weight(w + r * a * deltas[b])
        else:
            wire.set_weight(w + r * neuron_outputs[a] * deltas[b])

    return net

def back_prop(net, input_values, desired_output, r=1, minimum_accuracy=-0.001):
    """Updates weights until accuracy surpasses minimum_accuracy.  Uses the
    sigmoid function to compute neuron output.  Returns a tuple containing:
    (1) the modified neural net, with trained weights
    (2) the number of iterations (that is, the number of weight updates)"""
    fwd = forward_prop(net, input_values, sigmoid)
    counter = 0
    currentAccuracy = accuracy(desired_output, fwd[0])

    while currentAccuracy < minimum_accuracy:
        counter += 1
        net = update_weights(net, input_values, desired_output, fwd[1], r)
        fwd = forward_prop(net, input_values, sigmoid)
        currentAccuracy = max(currentAccuracy, accuracy(desired_output, fwd[0]))

    return (net, counter)


# Training a neural net

ANSWER_1 = 35
ANSWER_2 = 35
ANSWER_3 = 6
ANSWER_4 = 250
ANSWER_5 = 40

ANSWER_6 = 1
ANSWER_7 = 'checkerboard'
ANSWER_8 = ['small', 'medium', 'large']
ANSWER_9 = 'b'

ANSWER_10 = 'd'
ANSWER_11 = ['a','c']
ANSWER_12 = ['a','e']


#### SURVEY ####################################################################

NAME = 'Evan Sandhoefner'
COLLABORATORS = 'Ryan Kerr'
HOW_MANY_HOURS_THIS_LAB_TOOK = 12
WHAT_I_FOUND_INTERESTING = 'Getting under the hood of a neural net'
WHAT_I_FOUND_BORING = 'writing helper functions'
SUGGESTIONS = None
