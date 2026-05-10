# Big Brother Assistant

Big Brother Assistant is a Windows-first assistant with voice and text input, wake-word gating, LLM-first capability selection, structured tool orchestration, guarded execution, memory features, and a PyQt desktop UI made up of a live overlay plus a larger dashboard surface.

## Quick Start

### Prerequisites

- Python 3.10+
- Windows 10/11
- Ollama running locally for LLM-backed flows
- Default local Ollama model: `qwen3.5:4b`

### Setup

```powershell
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### Run

```powershell
# Full assistant
python run_assistant.py

# Headless mic mode (no overlay/dashboard)
python run_assistant.py --no-gui

# Text mode (direct local execution by default)
python run_assistant.py --text "Orion open Chrome"

# Interactive text-only session
python run_assistant.py --text-interactive

# Force direct local execution
python run_assistant.py --text "Hi Orion" --direct

# Force offline local execution
python run_assistant.py --text "Hi Orion" --offline

# Send a text request to the localhost daemon
python run_assistant.py --text "Hi Orion" --daemon

# Start the localhost daemon host service
python run_assistant.py --daemon

# Router-only validation path
python run_assistant.py --text "Orion open Chrome" --router-only --router v1
```

## Runtime Modes

- `DIRECT`: runs Orion in-process for local development and quick testing.
- `OFFLINE`: forces local direct execution with offline safety behavior enabled.
- `DAEMON`: uses the localhost host service so desktop, web, and future mobile clients can share one engine/runtime.

For now, `run_assistant.py --text "..."` stays developer-friendly and uses direct local execution unless you explicitly opt into `--daemon`.

## Local Model And Startup Notes

- Orion now defaults to `qwen3.5:4b` for both fast and smart local-model slots.
- `qwen3.5:4b` should warm up faster and fit more comfortably on smaller local GPUs than the previous 14B default.
- `--no-gui` only disables the overlay/dashboard. It does not switch Orion into text-only mode.
- If you want terminal-only interaction without STT startup, use `--text ...` or `--text-interactive`.

Mic-mode cold start can include:

- Ollama warmup for `qwen3.5:4b`
- sentence-transformer cache/download work for semantic memory
- Whisper cache/download work for STT

Once those assets are cached locally, later boots are usually much faster.

## LLM-First Direction

The intended Orion architecture is an LLM-driven decision tree, not a keyword router with a chat layer on top.

- Addressed user input should enter one orchestration loop.
- The LLM should decide whether to:
  - respond directly
  - retrieve context or memory
  - call one tool
  - call multiple tools in sequence
  - ask a clarification question
- Deterministic code should mainly live behind typed tool boundaries for execution, validation, persistence, and safety.
- Wake-word gating, stop/cancel, transport control, and hard safety rails are the main deterministic front-gate exceptions.

In practice, that means Orion should reason from the user's request into a capability tree such as memory, planner, email, notifications, or system actions, and then use the tool contracts inside that branch rather than relying on brittle phrase matching.

The current canonical runtime shape is:

`UtteranceEvent -> deterministic front gate -> orchestration loop -> domain catalog -> workspace read/deep fetch -> concrete operation -> runtime response envelope -> execution/runtime state`

Important current contracts:

- `UtteranceEvent` keeps both `raw_text` and wake-stripped `cleaned_text`, plus addressed/follow-up metadata.
- The orchestration prompt sees `cleaned_text` plus metadata, not the literal wake token as its default semantic input.
- Side effects run through one approval/policy path.
- `system.open_app`, durable memory updates, and durable memory deletes require approval.
- Explicit new durable `remember` writes remain allowed without approval, but they are still logged and traced.
- Read-only memory lookup and ambient short-term capture do not require approval.

## Canonical Docs

- [Architecture](docs/architecture.md)
- [Development](docs/development.md)
- [Testing](docs/testing.md)
- [Email Setup](docs/integrations/email-setup.md)
- [Future Plans](docs/future-plans.md)

## Planner And Email Quick Checks

- Planner and email capabilities should be reached through the LLM orchestration layer first, with deterministic services acting as tool backends once Orion has chosen a branch.
- Email is currently Gmail-first and read-only. On first successful connection, Orion should ask whether to begin email setup before scanning the last 7 days of mail or learning sender/content preferences.
- The email onboarding summary, pending questions, and processed-message state are persisted in SQLite so Orion does not repeat the initial backfill on every boot.

Useful text-mode smoke checks:

```powershell
python run_assistant.py --text "Orion, remind me to stretch in 2 minutes" --no-tts
python run_assistant.py --text "Orion, create event team sync tomorrow 930" --no-tts
python run_assistant.py --text "Orion, set a timer for 20 seconds" --no-tts
python run_assistant.py --text "Orion, begin email setup" --no-tts
python run_assistant.py --text "Orion, yes" --no-tts
```

## Current Engine Notes

- Response style and persona are now governed centrally through `assistant/prompting/` and the `prompt_policy` section in `assistant_config.json`.
- Tool choice and planning should remain separate from final response styling so persona does not leak into safety or capability selection.
- The current transition architecture still contains compatibility routing pieces, but the desired steady state is a single orchestration loop that emits `respond`, `clarify`, or structured tool calls.
- Multi-step requests should stay inside the same orchestration loop, with Orion choosing the next tool step from registered capabilities rather than falling back to hard-coded phrase paths.

## Repo Notes

- Runtime state such as logs, databases, coverage output, tokens, and local caches should not be committed.
- Legacy compatibility packages still exist under `assistant/legacy/`, but historical status docs have been consolidated into the canonical docs above.
