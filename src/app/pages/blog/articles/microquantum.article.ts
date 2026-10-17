import { BlogArticle } from '../blog-article.model';

export const MICROQUANTUM: BlogArticle = {
  slug: 'microquantum',
  category: 'Technology',
  title: 'MicroQuantum: Building and Executing Quantum Programs in Python',
  summary:
    'MicroQuantum is a NumPy-only Python SDK for building, executing and analysing quantum programs, published on PyPI at version 1.1.0. ' +
    'It separates circuit construction from execution, ships statevector and density-matrix simulation backends, and structures repeated runs into analysable experiments.',
  maturity: 'Developer preview · v1.1.0 published',
  maturityVariant: 'experimental',
  intro:
    'Quantum computing is usually introduced through physics — qubits, superposition and interference — and only later translated into ' +
    'software. That order works badly for programmers, because the gap between "a qubit can be in two states at once" and "here is how ' +
    'I run a circuit and read the result" is where most of the friction lives. MicroQuantum exists to close that gap in a language ' +
    'people already use, so that the interesting question becomes the algorithm rather than the plumbing.',
  sections: [
    {
      heading: 'Why quantum computing needs its own SDK',
      blocks: [
        {
          kind: 'p',
          text:
            'A quantum program is not an ordinary program with a different library attached. Its unit of work is a circuit: a sequence ' +
            'of gates applied to a register of qubits, ending in measurement. The state of those qubits during computation is a complex ' +
            'vector whose size doubles with every qubit, which means a 30-qubit register already carries just over a billion ' +
            'amplitudes. Anything that executes such a circuit must make deliberate choices about representation, and a library that ' +
            'hides those choices makes it impossible to reason about what happens when they stop being affordable.'
        },
        {
          kind: 'p',
          text:
            'MicroQuantum makes the representation visible. Quantum states, gates and circuits are first-class objects in the SDK, so ' +
            'the shape of a computation can be inspected, and the choice of simulation strategy belongs to the code rather than to a ' +
            'global setting.'
        },
        {
          kind: 'card',
          card: 'concept',
          title: 'Superposition, entanglement and measurement',
          body:
            'A qubit state is a pair of complex amplitudes, one per basis state, whose squared magnitudes sum to one. Applying a gate ' +
            'is matrix multiplication on those amplitudes; measuring collapses the state to one basis outcome with probability given by ' +
            'the corresponding squared magnitude. Entanglement is a joint state that cannot be written as a product of individual ' +
            'qubits, and it is the resource quantum algorithms actually exploit.',
          points: [
            'State: complex amplitudes, one per basis outcome',
            'Gate: a unitary matrix applied to those amplitudes',
            'Measurement: collapse to one outcome, sampled by probability',
            'Entanglement: correlation no product state can express'
          ]
        }
      ]
    },
    {
      heading: 'Circuit representation and gates',
      blocks: [
        {
          kind: 'p',
          text:
            'Circuits are built programmatically rather than read from a declarative file. A circuit is constructed for a given number ' +
            'of qubits, gates are applied by index — a Hadamard on qubit 0, a controlled-NOT from qubit 0 to qubit 1 — and the finished ' +
            'object is handed to an executor. Because gates take effect in the order they are called, a program reads in the same order ' +
            'the computation happens, which removes a whole class of ordering mistakes.'
        },
        {
          kind: 'card',
          card: 'implementation',
          title: 'The two-gateway program',
          body:
            'The canonical example is a Bell state: a Hadamard on the first qubit puts it in superposition, and a controlled-NOT keyed ' +
            'on that qubit entangles it with the second. Measuring both qubits afterwards yields "00" and "11" roughly half the time ' +
            'each and never the two mixed outcomes — entanglement made visible as an outcome distribution.',
          code: [
            'from microquantum import Executor, QuantumCircuit, StatevectorBackend',
            '',
            'qc = QuantumCircuit(2)',
            'qc.h(0)        # Hadamard on qubit 0',
            'qc.cx(0, 1)    # CNOT (control=0, target=1)',
            '',
            'result = Executor(backend=StatevectorBackend()).run(qc, shots=1024)',
            "print(result.counts)          # {'00': ~512, '11': ~512}"
          ].join('\n'),
          codeLabel: 'Python'
        }
      ]
    },
    {
      heading: 'Simulation and numerical behaviour',
      blocks: [
        {
          kind: 'p',
          text:
            'Execution in the current release is by simulation, and two families of local backend ship with the SDK. A statevector ' +
            'backend tracks the full amplitude vector and applies gates directly to it; it is exact, and its cost grows exponentially ' +
            'with qubit count. A density-matrix backend tracks the density matrix instead, which can also represent mixed states but ' +
            'costs roughly quadratically more memory for the same register.'
        },
        {
          kind: 'p',
          text:
            'Sampling adds a second layer of approximation on top of the simulator. Executing with a finite shot count draws outcomes at ' +
            'random from the theoretical distribution, so repeated runs disagree slightly — a 1024-shot Bell state gives counts near ' +
            '512/512 rather than exactly that. This is expected sampling behaviour rather than numerical drift, and it is worth ' +
            'separating from the subtler question of whether the simulator faithfully represents the circuit it was given.'
        },
        {
          kind: 'card',
          card: 'distinction',
          title: 'Simulation is not physical hardware',
          body:
            'A simulator computes the ideal behaviour of an abstract circuit. A physical device has finite gate fidelities, decoherence ' +
            'inside a fixed coherence time, calibration drift, and connectivity constraints between qubits that may differ from the ' +
            'circuit\'s own. Simulated results therefore describe the algorithm, not what a given device would return.',
          points: [
            'Simulated: ideal circuit semantics, sampled from the exact distribution',
            'Physical: imperfect gates, decoherence, calibration drift, connectivity limits',
            'No hardware backend is included in the current release'
          ]
        }
      ]
    },
    {
      heading: 'Execution architecture',
      blocks: [
        {
          kind: 'p',
          text:
            'MicroQuantum separates how a program is defined from how it runs. A circuit or algorithm is expressed with the core, ' +
            'turned into an execution plan describing how and where it should run, dispatched by a runtime against a configured ' +
            'backend, and answered with a typed result. The backend abstraction is the important seam: circuit construction never ' +
            'references a simulator directly, so adding an execution target means implementing the backend interface rather than ' +
            'restructuring the program.'
        },
        {
          kind: 'card',
          card: 'architecture',
          title: 'Layers between a circuit and its result',
          body:
            'Quantum programs and algorithms sit at the top of the stack. The execution runtime turns a program into a plan and ' +
            'coordinates the run. The backend abstraction is the boundary a new execution target must satisfy. Above them sit the ' +
            'experiment layer, which records what ran, and the analysis layer, which interprets the returned results.',
          points: [
            'Quantum layer: states, gates, circuits, measurement, tensor operations',
            'Algorithms: VQE, QAOA, Grover, phase estimation',
            'Execution: plans, runtime, backend abstraction, local execution, results',
            'Analysis: sampling, expectation, state analysis, aggregation, statistics'
          ]
        },
        {
          kind: 'card',
          card: 'requirements',
          title: 'Installing and running',
          body:
            'The package is published on PyPI and depends only on NumPy, which keeps the dependency surface small enough that ' +
            'installation problems are almost always a Python-version mismatch.',
          points: [
            'Install: pip install microquantum',
            'Python: 3.10 to 3.13',
            'Dependencies: NumPy only, installed automatically',
            'Licence: MIT'
          ]
        }
      ]
    },
    {
      heading: 'Algorithms and experiments',
      blocks: [
        {
          kind: 'p',
          text:
            'Four algorithm families ship as working implementations. The Variational Quantum Eigensolver (VQE) and the Quantum ' +
            'Approximate Optimization Algorithm (QAOA) are hybrid methods: a quantum circuit prepares a candidate state while a ' +
            'classical optimizer searches for better parameters. Grover\'s algorithm addresses unstructured search with a quadratic ' +
            'reduction in query count, and quantum phase estimation recovers eigenvalues of a unitary operator — a primitive that ' +
            'underpins many larger algorithms.'
        },
        {
          kind: 'p',
          text:
            'A single execution answers one question, which is rarely the question being asked. The experiment layer exists for the case ' +
            'where the same program must run repeatedly under different conditions: parameter sweeps execute a circuit across a grid of ' +
            'parameter values, and each run is recorded so that the sweep can be reproduced and analysed rather than re-derived from memory.'
        },
        {
          kind: 'card',
          card: 'architecture',
          title: 'From a run to a result set',
          body:
            'An execution produces a backend result. It can be captured as an execution record describing what ran and under which ' +
            'parameters, grouped into an experiment, and passed to analysis for sampling, expectation and state inspection, or ' +
            'aggregated into statistics across many runs.',
          points: [
            'Execution: one run against a backend',
            'Execution record: structured record of what ran and why',
            'Experiment: structured runs, including parameter sweeps',
            'Analysis and aggregation: statistics over the resulting samples'
          ]
        }
      ]
    },
    {
      heading: 'Maturity and limitations',
      blocks: [
        {
          kind: 'p',
          text:
            'Version 1.1.0 is a published public release on PyPI, which means the package installs and pins — a real but modest ' +
            'guarantee. The SDK is presented as a developer preview. Execution is simulation-only, no quantum hardware backend is ' +
            'included, and individual capabilities continue to evolve between releases. Simulated results should be read as statements ' +
            'about algorithms under ideal conditions, not as predictions of hardware performance.'
        },
        {
          kind: 'card',
          card: 'maturity',
          title: 'Developer preview with a published release',
          body:
            'A published version guarantees that the package exists and installs. It does not guarantee stability of individual APIs ' +
            'between releases, and it says nothing about behaviour on real quantum hardware.',
          points: [
            'Release: v1.1.0, published on PyPI',
            'Execution: local simulation backends only',
            'Not included: physical quantum hardware execution',
            'Not independently assessed: no third-party validation of results'
          ]
        }
      ]
    }
  ],
  verification: [
    { label: 'MicroQuantum project page', route: '/microquantum' }
  ],
  conclusion:
    'MicroQuantum is a usable, dependency-light way to develop quantum programs in Python: circuits are explicit objects, execution is ' +
    'separated from construction, and repeated runs are structured for analysis. Everything it reports is simulation output, so it ' +
    'answers questions about algorithms rather than about hardware, and it should be read that way.'
};
