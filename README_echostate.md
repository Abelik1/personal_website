# 🧠 EchoState & Heisenberg Chain

A PyTorch-based toolkit for physics-informed Echo State Networks (ESNs), featuring a built-in quantum simulator for spin chain dynamics using the Heisenberg model.

[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.2+-ee4c2c.svg)](https://pytorch.org/)

---

## 📋 Table of Contents

* [🎯 Overview](#-overview)
* [📦 Installation](#-installation)
* [♻️ What are Echo State Networks?](#-what-are-echo-state-networks)
* [📚 Module: `echostate`](#-module-echostate)
  * [Core Components](#core-components)
  * [Basic Usage](#basic-usage)
  * [Advanced Features](#advanced-features)
  * [Learning Algorithms](#learning-algorithms)
  * [Hyperparameter Tuning](#hyperparameter-tuning)
  * [Logging & Diagnostics](#logging--diagnostics)
* [🧪 Physics Module: `Heisenberg_Chain`](#-physics-module-heisenberg_chain)
  * [Theoretical Background](#theoretical-background)
  * [HeisenbergChain Class](#heisenbergchain-class)
  * [ESN Training Pipeline](#esn-training-pipeline)
  * [Physics Validation](#physics-validation)
* [🔧 Command-Line Interface](#-command-line-interface)
* [📊 Hyperparameter Guide](#-hyperparameter-guide)
* [🔬 Project Structure](#-project-structure)
* [📖 Citation](#-citation)

---

## 🎯 Overview

This repository contains **two independent but complementary tools**:

### 1. **`echostate`** — General-Purpose ESN Library 🚀

A production-ready, standalone PyTorch implementation of Echo State Networks that can be used for **any time series prediction task**. While this library was originally developed to model quantum spin dynamics, it is **fully general-purpose** and can be applied to:

- Financial time series forecasting
- Weather and climate prediction
- Chaotic dynamical systems (Lorenz, Rössler, etc.)
- Signal processing and filtering
- Any sequential prediction problem

**Key Features:**
- 9 different ridge regression solvers (inv, cholesky, solve, eigh, cg, svd, tsvd, qr, pinv)
- Automatic mixed-precision training
- Integrated Optuna hyperparameter tuning
- Comprehensive logging and diagnostics
- Efficient streaming covariance accumulation
- Flexible architecture with configurable feedback, washout, and more

**You can use `echostate` completely independently** — just install the package and use it with your own data. No physics knowledge required!

### 2. **`Heisenberg_Chain`** — Quantum Simulation Example 🧪

A physics simulation module demonstrating how to use ESNs for learning quantum dynamics:

- Pure-state Heisenberg spin chain evolution
- Multiple observable measurements (σx, σy, σz)
- Periodic and non-periodic boundary conditions
- Conservation law validation
- Complete training pipeline for quantum forecasting

**This is an application example** — it shows how to use the `echostate` library to learn complex physical dynamics, but you can easily adapt this workflow to your own domain.

---

### 🎓 In Short:

- **Want a flexible ESN library?** → Use `echostate` with your own data
- **Interested in quantum ML?** → Explore the `Heisenberg_Chain` example
- **Both?** → Learn from the physics example, then apply ESNs to your problem!

---

## 📦 Installation

### Option 1: Install the `echostate` package

```bash
# Clone the repository
git clone https://github.com/yourusername/physics_echostate.git
cd physics_echostate

# Create and activate virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r echostate/requirements.txt

# Install the package in development mode
pip install -e echostate/
```

### Option 2: Use directly without installation

```bash
# Install dependencies only
pip install torch numpy matplotlib scipy qutip optuna pandas pytest safetensors
```

### Dependencies

**Core:**
- `torch >= 2.2`
- `numpy >= 1.23`
- `scipy >= 1.10`

**Physics Simulation:**
- `qutip >= 5.0` (quantum toolkit)

**Optimization & Analysis:**
- `optuna >= 4.0` (hyperparameter tuning)
- `pandas >= 2.0` (data management)
- `matplotlib >= 3.7` (visualization)

**Development:**
- `pytest >= 8.0` (testing)
- `safetensors >= 0.6` (safe model serialization)

---

## ♻️ What are Echo State Networks?

**Echo State Networks (ESNs)** are a class of recurrent neural networks designed for efficient temporal sequence learning. Unlike traditional RNNs:

✅ **Only the output layer is trained** (linear regression)  
✅ **Reservoir is fixed** and randomly initialized  
✅ **Training is fast** (no backpropagation through time)  
✅ **Memory efficient** (streaming covariance computation)

### Key Properties

* **Sparse connectivity**: Controlled via `sparsity` parameter
* **Spectral radius control**: Ensures echo-state property and memory depth
* **Efficient training**: Linear regression with ridge regularization
* **Feedback capability**: Can incorporate past predictions

ESNs excel at:
- Chaotic dynamical systems
- Nonlinear time series prediction
- Physics simulations (quantum systems, fluid dynamics, etc.)
- Online learning scenarios

---

## 📚 Module: `echostate`

### Core Components

```python
from echostate import ESN, Reservoir, Trainer
from echostate.utils import mean_absolute_error, mean_squared_error
from echostate.tuning import run_optuna_tuning, DefaultSpace
from echostate.esn_logging import setup_logging
```

| Component | Description |
|-----------|-------------|
| `ESN` | Main Echo State Network model with training and inference |
| `Reservoir` | Dynamical reservoir layer with sparse random connectivity |
| `Trainer` | Ridge regression trainer with 9 solver options |
| `utils` | Error metrics and helper functions |
| `tuning` | Optuna-based hyperparameter optimization |
| `esn_logging` | Structured logging system (JSON-L, plain text) |

### Basic Usage

```python
import torch
from echostate import ESN

# Generate example data
inputs = [torch.randn(100, 1) for _ in range(5)]  # 5 sequences, 100 steps each
targets = [torch.sin(torch.linspace(0, 10, 100)).unsqueeze(1) for _ in range(5)]

# Initialize ESN
model = ESN(
    base_input_dim=1,
    output_dim=1,
    reservoir_size=500,
    spectral_radius=0.9,
    sparsity=0.1,
    leak_rate=0.3,
    ridge_param=1e-6,
    washout=50,
    feedback=0,
    learning_algo="pinv",  # Stable pseudoinverse solver
    device=torch.device("cuda" if torch.cuda.is_available() else "cpu")
)

# Train (teacher-forced)
model.fit(inputs, targets)

# Predict (closed-loop after washout)
predictions, metrics = model.predict(inputs, targets)
print(f"MAE: {metrics['mae']:.4f}, MSE: {metrics['mse']:.6f}")

# Inference on new data
test_input = torch.randn(100, 1)
prediction = model.infer(test_input)  # Returns predictions after washout
```

### Advanced Features

#### 1. Output Feedback

```python
# Include previous outputs in the input stream
model = ESN(
    base_input_dim=1,
    output_dim=1,
    feedback=3,  # Use last 3 outputs as additional inputs
    reservoir_size=500
)
```

#### 2. Washout Period

```python
# Discard initial transient states during training
model = ESN(
    base_input_dim=1,
    output_dim=1,
    washout=100,  # Ignore first 100 timesteps
    reservoir_size=500
)
```

#### 3. Custom Device & Precision

```python
# GPU acceleration with automatic mixed precision
model = ESN(
    base_input_dim=1,
    output_dim=1,
    device=torch.device("cuda:0"),
    use_amp=True,  # Automatic mixed precision
    reservoir_size=500
)
```

#### 4. Performance Profiling

```python
import os
os.environ["ESN_PROFILE"] = "1"  # Enable CUDA timing

model = ESN(
    base_input_dim=1,
    output_dim=1,
    profile=True,  # Print timing information
    reservoir_size=500
)
```

### Learning Algorithms

The `Trainer` class supports 9 different ridge regression solvers:

| Algorithm | Description | When to Use |
|-----------|-------------|-------------|
| `inv` | Matrix inversion `(XᵀX + λI)⁻¹` | Fast, but less stable |
| `cholesky` | Cholesky decomposition | Fastest for well-conditioned SPD matrices |
| `solve` | Direct linear solver | Good default choice |
| `eigh` | Eigenvalue decomposition | Very stable; easy to diagnose conditioning |
| `cg` | Conjugate gradient (iterative) | Large reservoirs; early stopping for regularization |
| `svd` | Singular value decomposition | Gold standard for stability |
| `tsvd` | Truncated SVD | Low-rank regularization for collinear features |
| `qr` | QR decomposition | Solid for least squares |
| `pinv` | Pseudoinverse with Tikhonov | Simple and robust (recommended) |

**Recommendation:** Start with `"pinv"` for stability, then try `"cholesky"` for speed once you've validated your setup.

```python
# Example: Using different solvers
model = ESN(
    base_input_dim=1,
    output_dim=1,
    learning_algo="pinv",  # Change to any solver above
    ridge_param=1e-6,
    reservoir_size=500
)
```

### Hyperparameter Tuning

Integrated Optuna-based hyperparameter search:

```python
from echostate import ESN
from echostate.tuning import run_optuna_tuning, DefaultSpace

# Define search space
space = DefaultSpace(
    reservoir_size=(100, 1000),
    spectral_radius=(0.5, 1.5),
    sparsity=(0.01, 0.3),
    leak_rate=(0.1, 1.0),
    input_scaling=(0.1, 1.0),
    bias_scaling=(0.0, 0.5),
    ridge_param=(1e-12, 1e-3),  # Log scale
    feedback=(0, 3)
)

# Factory function
def build_model(cfg: dict) -> ESN:
    return ESN(**cfg)

# Run optimization
study, best_config = run_optuna_tuning(
    build_model=build_model,
    inputs=train_inputs,
    targets=train_targets,
    space=space,
    n_trials=100,
    direction="minimize",
    study_name="my_esn_study",
    storage="sqlite:///optuna_study.db",
    device=torch.device("cuda"),
    washout=50,
    algo="pinv",
    seed=42
)

print("Best parameters:", best_config)
print("Best MSE:", study.best_value)
```

### Logging & Diagnostics

Structured logging system with JSON-L and plain text output:

```python
from echostate.esn_logging import setup_logging

# Setup logging
paths = setup_logging(
    log_dir="./logs",
    run_name="experiment_1",
    console_level="INFO",    # Console verbosity
    file_level="DEBUG",      # File detail level
    jsonl_file=True,         # Enable JSON-L output
    plain_file=True          # Enable plain text output
)

# Logs are automatically saved to:
# - logs/experiment_1_YYYYMMDD_HHMMSS.log
# - logs/experiment_1_YYYYMMDD_HHMMSS.jsonl
```

**Diagnostic Tools:**

```python
# Check covariance matrix conditioning
model.trainer.debug_covariance()
# Output: xTx shape=(501, 501), rank=501, cond=1.23e+04

# Get detailed statistics
stats = model.trainer.covariance_stats()
print(stats)
# {'shape': (501, 501), 'rank': 501, 'cond': 12345.67, 
#  'sigma_max': 1234.5, 'sigma_min': 0.1}
```

---

## 🧪 Physics Module: `Heisenberg_Chain`

### Theoretical Background

The **Heisenberg model** describes interacting quantum spins on a lattice. The Hamiltonian for an N-qubit chain is:

$$
H = -\frac{J}{2} \sum_{j=1}^{N} \left( \sigma_j^x \sigma_{j+1}^x + \sigma_j^y \sigma_{j+1}^y + \sigma_j^z \sigma_{j+1}^z \right)
$$

**Where:**
- $J$ is the coupling constant (positive for ferromagnetic interaction)
- $\sigma_j^{x,y,z}$ are Pauli matrices acting on qubit $j$
- Periodic boundary conditions: $\sigma_{N+1} = \sigma_1$ (optional)

**Time Evolution:**

$$
|\psi(t + \Delta t)\rangle = U |\psi(t)\rangle, \quad U = e^{-i H \Delta t}
$$

**Conserved Quantities:**
- Total energy $\langle H \rangle$
- Total magnetization $M_z = \sum_j \langle \sigma_j^z \rangle$
- State norm $\langle\psi|\psi\rangle = 1$

### HeisenbergChain Class

```python
from Heisenberg_Chain.Heisenberg_sim import HeisenbergChain

# Initialize chain
chain = HeisenbergChain(
    periodic=False,      # Periodic boundary conditions
    num_qubits=5,       # Number of spins
    target_qubit=0,     # Which qubit to measure
    J=1.0,              # Coupling constant
    dt=0.01,            # Time step
    measure='sz'        # Observable: 'sx', 'sy', 'sz', or 'rho'
)

# Evolve system
chain.evolve(steps=1000)

# Get measurement history
observable = chain.get_observable()  # Returns numpy array

# Check conservation laws
print("Norm range:", min(chain.norm_history), max(chain.norm_history))
print("Energy range:", min(chain.energy_history), max(chain.energy_history))
```

**Supported Observables:**

| Observable | Description | Output |
|------------|-------------|--------|
| `'sx'` | $\langle \sigma_x \rangle$ for target qubit | Float array |
| `'sy'` | $\langle \sigma_y \rangle$ for target qubit | Float array |
| `'sz'` | $\langle \sigma_z \rangle$ for target qubit | Float array |
| `'rho'` | Reduced density matrix $\rho_k$ | 2×2 complex array |

### ESN Training Pipeline

The `run_esn_sim.py` script provides a complete pipeline for training ESNs on quantum dynamics:

```python
from Heisenberg_Chain.run_esn_sim import ESNPredictor

# Initialize predictor
predictor = ESNPredictor(
    periodic=False,
    steps=500,
    dt=0.2,
    N=5,                 # Number of qubits
    qubit=0,            # Target qubit
    washout=100,
    batch_size=50,       # Number of training sequences
    train_batch_size=50,
    history_seed=3141,
    reservoir_seed=314,
    train_op='sz',       # Training observable
    pred_op='sz',        # Prediction observable
    learning_algo='pinv',
    device=torch.device('cpu')
)

# Build ESN with tuned hyperparameters
esn = predictor.make_esn(
    reservoir_size=800,
    spectral_radius=0.99,
    input_scaling=0.15,
    ridge_param=1e-9,
    leak_rate=0.3,
    sparsity=0.05,
    feedback=0
)

# Train on quantum dynamics
predictor.train_esn(esn)

# Predict on test sequence
z_test = chain.get_observable()
predictions, true_values = predictor.predict_sequence(esn, z_test)

# Evaluate
mae = mean_absolute_error(torch.tensor(predictions), torch.tensor(true_values))
print(f"Prediction MAE: {mae:.6f}")
```

### Physics Validation

Built-in diagnostic tools for validating simulation accuracy:

```python
from Heisenberg_Chain.heisen_utils import (
    summarize, check_bounds, autocorr_lag1,
    drift_stats, compare_series
)

# Statistical summary
stats = summarize(observable)
# {'mean': 0.123, 'std': 0.456, 'min': -0.999, 'max': 0.987}

# Check physical bounds (|⟨σ⟩| ≤ 1)
bounds = check_bounds(predictions)
# {'num_violations': 0, 'violation_indices_sample': [], 'max_excess_over_1': 0.0}

# Temporal autocorrelation
acf = autocorr_lag1(observable)

# Conservation law drift
energy_drift = drift_stats(chain.energy_history)
# {'mean_abs_step': 1.23e-12, 'linear_slope': -5.67e-15}

# Compare prediction vs truth
error = compare_series(predictions, true_values)
# {'mae': 0.0234, 'rmse': 0.0456}
```

---

## 🔧 Command-Line Interface

The `run_esn_sim.py` script supports multiple operational modes:

### 1. Hyperparameter Tuning

```python
# In run_esn_sim.py, set:
do_tune = True
do_predictions = False
official_run = False

# Configure tuning parameters
n_trials = 100
N_list = [5]
qubit_list = [0, 1, 2, 3]
train_batch_size = 50
```

### 2. Model Training & Evaluation

```python
# In run_esn_sim.py, set:
do_tune = False
do_predictions = False
official_run = True

# Train ensemble of ESNs
test_esns = 20
train_batch_size = 100
```

### 3. Prediction Mode

```python
# In run_esn_sim.py, set:
do_tune = False
do_predictions = True
official_run = False

# Load trained models and evaluate
num_pred = 50  # Number of test sequences
```

### Configuration Options

Key parameters in `run_esn_sim.py`:

```python
# Simulation
T = 100.0                    # Total time
dt = 0.2                     # Coarse time step
acc_dt = 0.05                # High-resolution reference time step
N_list = [5]                 # System sizes to test
qubit_list = [0, 1, 2, 3]   # Qubits to analyze

# Training
train_batch_size = 100       # Sequences per ESN
test_esns = 20              # Ensemble size
washout = 120               # Transient steps to discard

# Physics
periodic = False            # Boundary conditions
train_op = 'sz'            # Training operator
predict_op = 'sz'          # Prediction operator

# Algorithm
learning_algo = 'pinv'     # Ridge solver

# Filtering
PLOT_MAE_TOL = 0.03        # Plot only ESNs with MAE ≤ threshold
USE_TOL_FOR_STATS = False  # Whether to filter statistics
```

---

## 📊 Hyperparameter Guide

### ESN Parameters

| Hyperparameter | Definition | Low Value | High Value | Interactions |
|----------------|------------|-----------|------------|--------------|
| `reservoir_size` | Number of reservoir neurons | Fast training, low capacity | Rich dynamics, overfitting risk | Pair with high `ridge_param` |
| `spectral_radius` | Eigenvalue scaling (memory) | Short memory, reactive | Long memory, potential instability | High value + high `leak_rate` = slow decay |
| `feedback` | Past outputs as input | No autoregression | Improved multi-step prediction | Requires `base_input_dim == output_dim` |
| `input_scaling` | Input weight magnitude | Weak input drive | Strong drive, less memory | Low + high spectral radius = memory bank |
| `bias_scaling` | Bias term range | Symmetric activations | Breaks symmetry, diversity | Affects tanh operating point |
| `ridge_param` | L2 regularization (λ) | Fits noise, unstable | Stable, may underfit | Larger for bigger datasets |
| `leak_rate` | State update speed | Slow, smooth, long memory | Fast, responsive, short memory | Low + high spectral = very slow reservoir |
| `sparsity` | Fraction of nonzero weights | Dense, complex dynamics | Sparse, simpler, faster | Very sparse reduces expressivity |
| `washout` | Transient steps discarded | More training data | Safer training | Increase with high spectral radius |

### Tuning Tips

1. **Start Simple**: Begin with `reservoir_size=200-500`, `spectral_radius=0.9`, `sparsity=0.1`
2. **Scale Gradually**: Double `reservoir_size` if underfitting; adjust `ridge_param` accordingly
3. **Stability First**: Use `learning_algo="pinv"` until you understand your problem
4. **Monitor Conditioning**: Call `model.trainer.debug_covariance()` after training
5. **Washout Check**: Ensure washout is sufficient for your spectral radius and leak rate

### Algorithm Selection Guide

| Solver | Speed | Stability | Best For |
|--------|-------|-----------|----------|
| `cholesky` | ⚡⚡⚡ | ⭐⭐ | Well-conditioned, production speed |
| `pinv` | ⚡⚡ | ⭐⭐⭐ | Default choice, robust |
| `eigh` | ⚡⚡ | ⭐⭐⭐ | Debugging conditioning issues |
| `svd` | ⚡ | ⭐⭐⭐ | Gold standard, small reservoirs |
| `cg` | ⚡⚡ | ⭐⭐ | Large reservoirs (>5000) |
| `inv` | ⚡⚡ | ⭐ | Quick prototyping only |

---

## 🔬 Project Structure

```
physics_echostate/
├── echostate/                  # Core ESN package
│   ├── __init__.py
│   ├── core/
│   │   ├── esn.py             # Main ESN class
│   │   ├── reservoir.py       # Reservoir layer
│   │   └── trainer.py         # Ridge regression solvers
│   ├── tuning/
│   │   ├── optuna_tuner.py    # Hyperparameter optimization
│   │   └── search_spaces.py   # Default search spaces
│   ├── esn_logging/
│   │   ├── config.py          # Logging configuration
│   │   └── utils.py           # Logging utilities
│   ├── data/
│   │   └── windows.py         # Time series windowing
│   ├── utils.py               # Error metrics
│   ├── setup.py
│   ├── requirements.txt
│   └── tests/                 # Unit tests
├── Heisenberg_Chain/          # Quantum simulation
│   ├── Heisenberg_sim.py      # Spin chain simulator
│   ├── run_esn_sim.py         # Main training pipeline
│   ├── heisen_utils.py        # Physics diagnostics
│   ├── fourier_analysis.py    # Spectral analysis tools
│   ├── plot_pickle_qubit_hist.py
│   ├── cache/                 # Cached simulation data
│   ├── saved/                 # Trained models & results
│   └── trained_esns/          # Model checkpoints
├── logs/                      # Training logs
├── pyproject.toml            # Modern Python packaging
└── README.md                 # This file
```

---

## 📖 Citation

If you use this code in your research, please cite:

```bibtex
@software{echostate_heisenberg,
  author = {Alexander Belik},
  title = {EchoState \& Heisenberg Chain: Physics-Informed Reservoir Computing},
  year = {2025},
  url = {https://github.com/yourusername/physics_echostate}
}
```

### Related Work

This implementation builds upon:
- **Echo State Networks**: Jaeger, H. (2001). "The echo state approach to analysing and training recurrent neural networks."
- **Reservoir Computing**: Lukoševičius, M., & Jaeger, H. (2009). "Reservoir computing approaches to recurrent neural network training."
- **Heisenberg Model**: Heisenberg, W. (1928). "Zur Theorie des Ferromagnetismus."

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Run tests before submitting:
```bash
pytest echostate/tests/
```

---

## 📝 License

This project is provided as-is for research and educational purposes.

---

## 🔗 Links

- **QuTiP Documentation**: https://qutip.org/
- **Optuna**: https://optuna.org/
- **PyTorch**: https://pytorch.org/

---

**Made with ❤️ by Alexander Belik**
