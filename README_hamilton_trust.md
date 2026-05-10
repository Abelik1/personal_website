# DFT Hamilton PySCF Environment

PySCF does not support native Windows builds. This project uses Docker to run
PySCF in a Linux container.

See [INSTALLATION.md](INSTALLATION.md) for the full setup guide.

## One-Command Setup

```powershell
.\setup-pyscf-docker.ps1
```

## Quick Docker Environment

```powershell
docker compose build pyscf
```

## Verify

```powershell
docker compose run --rm pyscf
```

The verification script imports PySCF, loads basis data through
`pyscf.gto.basis`, runs an H2 RHF calculation, runs an H2 DFT calculation using
LibXC, and runs an open-shell Li UHF calculation.

## Shell

```powershell
docker compose run --rm pyscf bash
```

## Molecular Examples

Run the molecule set from the meeting notes:

```powershell
docker compose run --rm pyscf python examples/run_molecular_examples.py
```

This writes `results/molecular_examples.csv` and
`results/molecular_examples.md`.

## Meeting 2 Spin-Correlation Analysis

Compare the meeting-note correlation spin-scaling idea against LibXC/VWN:

```powershell
docker compose run --rm pyscf python examples/analyze_spin_correlation.py
```

This writes `results/spin_correlation_analysis.csv` and
`results/meeting2_spin_correlation.md`.

Check nitrogen atom ionisation predictions:

```powershell
docker compose run --rm pyscf python examples/analyze_nitrogen_atom.py
```

This writes `results/nitrogen_atom_ip.csv` and
`results/nitrogen_atom_ip.md`.

Prototype the meeting-note functional through PySCF's custom `eval_xc` hook:

```powershell
docker compose run --rm pyscf python examples/run_custom_functional_comparison.py
```

This writes `results/custom_functional_comparison.csv` and
`results/custom_functional_comparison.md`.

See [CUSTOM_FUNCTIONAL_IMPLEMENTATION.md](CUSTOM_FUNCTIONAL_IMPLEMENTATION.md)
for the implementation notes.

Run the endpoint spin-correlation prototype:

```powershell
docker compose run --rm pyscf python examples/run_endpoint_spin_correlation_comparison.py
```

This writes `results/endpoint_spin_correlation_diagnostics.*` and
`results/endpoint_spin_correlation_comparison.*`. See
[ENDPOINT_SPIN_CORRELATION_IMPLEMENTATION.md](ENDPOINT_SPIN_CORRELATION_IMPLEMENTATION.md)
for the implementation notes.

Run endpoint sensitivity checks:

```powershell
docker compose run --rm pyscf python examples/analyze_endpoint_sensitivity.py
```

This writes finite-difference step and VWN/PW92 endpoint comparisons under
`results/endpoint_*sensitivity*` and `results/endpoint_vwn_pw92_*`.

## Source Build Fallback

The default image uses the official PySCF Docker base image so it is fast to get
running. If you specifically need a fresh source build inside Linux:

```powershell
docker compose build pyscf-source
docker compose run --rm pyscf-source
```
