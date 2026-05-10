# Choose Car

Local Ireland-focused car keep-vs-switch optimizer with:
- `backend/` FastAPI + SQLite services and jobs
- `frontend/` React + TypeScript UI
- `data/` local seed data and imported market data

## Run locally

Python setup for a fresh clone:

```bash
.\scripts\setup_python_env.ps1
```

That script creates repo-local `.venv` and installs the backend package plus dev tools from `requirements-backend-dev.txt`.

If you prefer to do it manually:

```bash
py -3.11 -m venv .venv
.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\python.exe -m pip install -r requirements-backend-dev.txt
```

Backend:

```bash
.\scripts\start_backend.ps1
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

### Local secrets

For backend-only local secrets such as search API credentials:

1. Copy `backend/.env.local.example` to `backend/.env.local`
2. Fill in your real values there
3. Start the backend with `.\scripts\start_backend.ps1` or the full stack with `.\start.ps1`

`backend/.env.local` is ignored by git and is loaded automatically by both startup scripts.

### Indexed search setup

The Market Explorer indexed-results layer can use either:

- a robots-aware sitemap crawler for explicitly enabled domains
- a SearXNG instance
- or Brave Search API as a fallback

#### Zero-credential option: robots-aware sitemap crawling

Add these values to `backend/.env.local`:

```dotenv
SEARCH_INDEX_PROVIDER=robots
SEARCH_INDEX_ROBOTS_SOURCES=carsireland
SEARCH_INDEX_ROBOTS_MAX_SITEMAPS=8
SEARCH_INDEX_ROBOTS_MAX_URLS=240
SEARCH_INDEX_ROBOTS_MAX_FETCHES=16
```

What each value is:

- `SEARCH_INDEX_PROVIDER=robots`: enables the built-in robots.txt plus sitemap provider
- `SEARCH_INDEX_ROBOTS_SOURCES`: comma-separated source keys to crawl. Right now `carsireland` is the intended source.
- `SEARCH_INDEX_ROBOTS_MAX_SITEMAPS`: how many sitemap files to traverse per request
- `SEARCH_INDEX_ROBOTS_MAX_URLS`: how many crawlable sitemap URLs to consider before ranking
- `SEARCH_INDEX_ROBOTS_MAX_FETCHES`: how many candidate pages to fetch and score for a query

Important:

- this mode only follows URLs exposed by `robots.txt` and sitemap discovery
- it is meant for search-engine-style public indexing, not for crawling blocked internal search pages
- if a site serves `robots.txt` but still returns `403` for sitemap or page requests, the backend will surface that as a source failure note

#### Preferred: SearXNG

Add these values to `backend/.env.local`:

```dotenv
SEARCH_INDEX_PROVIDER=searxng
SEARXNG_BASE_URL=https://your-searxng.example
SEARXNG_ENGINES=google,bing,duckduckgo
```

What each value is:

- `SEARCH_INDEX_PROVIDER`: optional explicit provider selection
- `SEARXNG_BASE_URL`: the base URL of your real SearXNG instance
- `SEARXNG_ENGINES`: optional comma-separated engine list supported by your instance

Important:

- `docs.searxng.org` is documentation only, not a search instance
- many public SearXNG instances disable `format=json`, so a private or self-hosted instance is the reliable option

#### Optional fallback: Brave Search API

```dotenv
SEARCH_INDEX_PROVIDER=brave
BRAVE_SEARCH_API_KEY=your_brave_search_api_key_here
```

What each value is:

- `BRAVE_SEARCH_API_KEY`: an API key from your Brave Search API dashboard

Recommended setup flow:

1. Choose `robots` when you want a first-party, robots-aware crawler for crawlable public pages
2. Choose `SearXNG` if you can run or control an instance and want broader indexed discovery
3. Otherwise use `Brave Search API`
4. Paste the chosen provider settings into `backend/.env.local`
5. Start the backend with `.\scripts\start_backend.ps1` or the full stack with `.\start.ps1`

Keep these credentials in backend-only env files. Do not put them in frontend code, committed JSON, or checked-in config files.

#### Local SearXNG management

The repo includes a local Docker-based SearXNG stack in `infra/searxng/`.

Useful commands:

```bash
.\scripts\start_searxng.ps1
.\scripts\stop_searxng.ps1
```

By default the local instance runs at `http://localhost:8088/search`.

Backend tests:

```bash
.\scripts\run_backend_tests.ps1
```

The backend seeds the SQLite database on first startup from `data/seeds/`.
The repo scripts use `.venv` as the single Python environment for the backend and tests.
Older local folders such as `.backend-venv`, `.backend-runtime-venv`, and `.backend-runtime-deps` are not required for normal repo usage.

## Scraping

There are currently 7 scrape pipelines:

- Autoevolution full catalogue
- Toyota.ie new-car OEM catalogue
- Hyundai.ie new-car OEM catalogue
- Volkswagen.ie new-car OEM catalogue
- Toyota Approved Used inventory
- Hyundai Approved Used inventory
- Volkswagen Approved Used inventory

They do not all write to the same database.

### 1. Autoevolution full catalogue

Scrapes makes, models, generations, trims, mixed fuel groups, and generation images from Autoevolution, including both production and discontinued model lines.

Main command:

```bash
.\.venv\Scripts\python.exe backend\scripts\scrape_autoevolution_catalogue.py
```

Useful filters:

```bash
# One or more brands
.\.venv\Scripts\python.exe backend\scripts\scrape_autoevolution_catalogue.py --brand toyota
.\.venv\Scripts\python.exe backend\scripts\scrape_autoevolution_catalogue.py --brand toyota,nissan
.\.venv\Scripts\python.exe backend\scripts\scrape_autoevolution_catalogue.py --brand mercedes-benz --brand bmw

# Limit the run while testing
.\.venv\Scripts\python.exe backend\scripts\scrape_autoevolution_catalogue.py --max-brands 2 --max-models-per-brand 5

# Re-scrape models already stored
.\.venv\Scripts\python.exe backend\scripts\scrape_autoevolution_catalogue.py --brand toyota --refresh-existing

# Skip downloading images
.\.venv\Scripts\python.exe backend\scripts\scrape_autoevolution_catalogue.py --skip-images

# Lower or raise page readiness wait
.\.venv\Scripts\python.exe backend\scripts\scrape_autoevolution_catalogue.py --settle-seconds 2
.\.venv\Scripts\python.exe backend\scripts\scrape_autoevolution_catalogue.py --settle-seconds 8

# Force a slower pace between page loads
.\.venv\Scripts\python.exe backend\scripts\scrape_autoevolution_catalogue.py --page-delay-seconds 3
.\.venv\Scripts\python.exe backend\scripts\scrape_autoevolution_catalogue.py --brand toyota --page-delay-seconds 5

# Hide per-brand and per-model logs
.\.venv\Scripts\python.exe backend\scripts\scrape_autoevolution_catalogue.py --quiet
```

Useful notes:

- `--brand` expects the Autoevolution slug, for example `mercedes-benz`, `alfa-romeo`, `aston-martin`
- `--settle-seconds` is a maximum wait for page readiness, not a fixed sleep
- `--page-delay-seconds` adds a real minimum pause between Selenium page navigations
- the scraper now includes both production and discontinued model lines by default
- progress logs print the current make/model so crashes are easier to trace
- headless mode exists, but non-headless is usually more reliable against Autoevolution

Storage:

- DB: `sqlite/choose_car.sqlite3`
- images: `data/raw/autoevolution/images/`
- snapshot: `data/processed/autoevolution/catalogue_tree.json`

### 2. Toyota.ie new-car OEM catalogue

Scrapes the official Toyota Ireland new-car catalogue, model pages, grade pricing, finance, and specification tabs.

Main command:

```bash
.\.venv\Scripts\python.exe backend\scripts\scrape_toyota_ie.py
```

Useful filters:

```bash
# One or more Toyota model slugs
.\.venv\Scripts\python.exe backend\scripts\scrape_toyota_ie.py --model aygo-x
.\.venv\Scripts\python.exe backend\scripts\scrape_toyota_ie.py --model aygo-x,yaris

# Limit run size
.\.venv\Scripts\python.exe backend\scripts\scrape_toyota_ie.py --max-models 3

# Start a fresh historical run
.\.venv\Scripts\python.exe backend\scripts\scrape_toyota_ie.py --force-rerun

# Reduce progress logging
.\.venv\Scripts\python.exe backend\scripts\scrape_toyota_ie.py --quiet
```

Storage:

- DB: `sqlite/oem_catalogue.sqlite3`
- snapshot: `data/processed/oem_catalogue/toyota_ie_catalogue.json`

### 3. Hyundai.ie new-car OEM catalogue

Scrapes the official Hyundai Ireland new-car catalogue, pricing feed, model pages, and supporting brochure/spec content.

Main command:

```bash
.\.venv\Scripts\python.exe backend\scripts\scrape_hyundai_ie.py
```

Useful filters:

```bash
# One or more Hyundai model slugs
.\.venv\Scripts\python.exe backend\scripts\scrape_hyundai_ie.py --model new-tucson
.\.venv\Scripts\python.exe backend\scripts\scrape_hyundai_ie.py --model new-tucson,ioniq5

# Limit run size
.\.venv\Scripts\python.exe backend\scripts\scrape_hyundai_ie.py --max-models 3

# Start a fresh historical run
.\.venv\Scripts\python.exe backend\scripts\scrape_hyundai_ie.py --force-rerun

# Reduce progress logging
.\.venv\Scripts\python.exe backend\scripts\scrape_hyundai_ie.py --quiet
```

Storage:

- DB: `sqlite/oem_catalogue.sqlite3`
- snapshot: `data/processed/oem_catalogue/hyundai_ie_catalogue.json`

### 4. Volkswagen.ie new-car OEM catalogue

Scrapes the official Volkswagen Ireland new-car catalogue, model pages, trims, pricing, images, and specification tabs.

Main command:

```bash
.\.venv\Scripts\python.exe backend\scripts\scrape_volkswagen_ie.py
```

Useful filters:

```bash
# One or more Volkswagen model slugs
.\.venv\Scripts\python.exe backend\scripts\scrape_volkswagen_ie.py --model the-polo
.\.venv\Scripts\python.exe backend\scripts\scrape_volkswagen_ie.py --model the-polo,the-id-4

# Limit run size
.\.venv\Scripts\python.exe backend\scripts\scrape_volkswagen_ie.py --max-models 3

# Start a fresh historical run
.\.venv\Scripts\python.exe backend\scripts\scrape_volkswagen_ie.py --force-rerun

# Reduce progress logging
.\.venv\Scripts\python.exe backend\scripts\scrape_volkswagen_ie.py --quiet
```

Storage:

- DB: `sqlite/oem_catalogue.sqlite3`
- snapshot: `data/processed/oem_catalogue/volkswagen_ie_catalogue.json`

### 5. Toyota Approved Used inventory

Scrapes approved used car search results and detail pages from Toyota Ireland used stock, including dealer details, specs, finance blocks, last-updated markers, and vehicle images.

Main command:

```bash
.\.venv\Scripts\python.exe backend\scripts\scrape_toyota_approved_used.py
```

Useful filters:

```bash
# County filter
.\.venv\Scripts\python.exe backend\scripts\scrape_toyota_approved_used.py --county Dublin

# Make and model filters
.\.venv\Scripts\python.exe backend\scripts\scrape_toyota_approved_used.py --make Toyota --model Yaris

# Fuel filters
.\.venv\Scripts\python.exe backend\scripts\scrape_toyota_approved_used.py --fuel-type Hybrid
.\.venv\Scripts\python.exe backend\scripts\scrape_toyota_approved_used.py --fuel-type Petrol,Hybrid

# Limit pages or cars while testing
.\.venv\Scripts\python.exe backend\scripts\scrape_toyota_approved_used.py --max-pages 2
.\.venv\Scripts\python.exe backend\scripts\scrape_toyota_approved_used.py --max-cars 50

# Force detail pages to be refreshed even if unchanged
.\.venv\Scripts\python.exe backend\scripts\scrape_toyota_approved_used.py --refresh-existing

# Skip image downloads
.\.venv\Scripts\python.exe backend\scripts\scrape_toyota_approved_used.py --skip-images

# Reduce progress logging
.\.venv\Scripts\python.exe backend\scripts\scrape_toyota_approved_used.py --quiet
```

You can also pass a full Toyota Approved Used search URL and reuse its filters directly:

```bash
.\.venv\Scripts\python.exe backend\scripts\scrape_toyota_approved_used.py --search-url "https://approvedused.toyota.ie/search-results-page?make=&model=&fuelType=Petrol&fuelType=Diesel&fuelType=Hybrid&fuelType=Electric&fuelType=PHEV&county=Dublin&sort=price&sortDirection=ASC"
```

Useful notes:

- leave `--county` blank to scrape all Ireland
- unchanged listings are skipped automatically using Toyota listing IDs plus Toyota last-modified data
- `--refresh-existing` is useful if you want to force a full detail refresh

Storage:

- DB: `sqlite/oem_used_inventory.sqlite3`
- images: `data/raw/oem_used_inventory/images/`
- snapshot directory: `data/processed/oem_used_inventory/`

### 6. Hyundai Approved Used inventory

Scrapes Hyundai Ireland approved-used listings, result pages, detail payloads, and primary listing images into the separate OEM used-inventory database.

Main command:

```bash
.\.venv\Scripts\python.exe backend\scripts\scrape_hyundai_approved_used.py
```

Useful filters:

```bash
# Model, transmission, and fuel filters
.\.venv\Scripts\python.exe backend\scripts\scrape_hyundai_approved_used.py --model i10,Tucson
.\.venv\Scripts\python.exe backend\scripts\scrape_hyundai_approved_used.py --transmission Manual,Automatic
.\.venv\Scripts\python.exe backend\scripts\scrape_hyundai_approved_used.py --fuel-type Petrol,Hybrid

# Year and monthly payment windows
.\.venv\Scripts\python.exe backend\scripts\scrape_hyundai_approved_used.py --year-min 2022 --year-max 2026
.\.venv\Scripts\python.exe backend\scripts\scrape_hyundai_approved_used.py --monthly-min 150 --monthly-max 650

# Limit pages or cars while testing
.\.venv\Scripts\python.exe backend\scripts\scrape_hyundai_approved_used.py --max-pages 2
.\.venv\Scripts\python.exe backend\scripts\scrape_hyundai_approved_used.py --max-cars 50

# Force a fresh run or refresh stored detail payloads
.\.venv\Scripts\python.exe backend\scripts\scrape_hyundai_approved_used.py --force-rerun
.\.venv\Scripts\python.exe backend\scripts\scrape_hyundai_approved_used.py --refresh-existing

# Skip image downloads
.\.venv\Scripts\python.exe backend\scripts\scrape_hyundai_approved_used.py --skip-images

# Reduce progress logging
.\.venv\Scripts\python.exe backend\scripts\scrape_hyundai_approved_used.py --quiet
```

Storage:

- DB: `sqlite/oem_used_inventory.sqlite3`
- snapshot: `data/processed/oem_used_inventory/hyundai_approved_used.json`

### 7. Volkswagen Approved Used inventory

Scrapes Volkswagen Ireland approved used search results and listing detail payloads, including dealer details, overview/equipment tabs, WLTP data where present, and the primary listing image.

Main command:

```bash
.\.venv\Scripts\python.exe backend\scripts\scrape_volkswagen_approved_used.py
```

Useful filters:

```bash
# Limit pages or cars while testing
.\.venv\Scripts\python.exe backend\scripts\scrape_volkswagen_approved_used.py --max-pages 2
.\.venv\Scripts\python.exe backend\scripts\scrape_volkswagen_approved_used.py --max-cars 50

# Force detail pages to be refreshed even if unchanged
.\.venv\Scripts\python.exe backend\scripts\scrape_volkswagen_approved_used.py --refresh-existing

# Skip image downloads
.\.venv\Scripts\python.exe backend\scripts\scrape_volkswagen_approved_used.py --skip-images

# Reduce progress logging
.\.venv\Scripts\python.exe backend\scripts\scrape_volkswagen_approved_used.py --quiet
```

Useful notes:

- the importer uses Volkswagen listing fingerprints to skip unchanged detail pages on reruns
- detail tabs and raw payloads are stored so the admin browser can inspect overview, vehicle data, standard equipment, and optional equipment

Storage:

- DB: `sqlite/oem_used_inventory.sqlite3`
- snapshot: `data/processed/oem_used_inventory/volkswagen_approved_used.json`

## Normalization

Normalization is a separate step from scraping. Raw scrape runs stay append-only in their raw databases, and the normalizers write companion normalized databases that can be rerun safely for one raw run at a time.

The current normalized databases are:

- `sqlite/oem_catalogue_normalized.sqlite3` for official new-car catalogue outputs
- `sqlite/oem_used_inventory_normalized.sqlite3` for approved-used outputs
- `sqlite/choose_car_normalized.sqlite3` for general used-market outputs

The detailed normalization philosophy and field-handling rules live in [backend/scripts/NORMALIZATION.md](backend/scripts/NORMALIZATION.md).

Set `PYTHONPATH` first from the repo root:

```bash
$env:PYTHONPATH = "$PWD\backend"
```

### 1. Normalize OEM catalogue data

Normalizes the latest raw OEM catalogue run for each source, or one source / one raw run if you filter it.

```bash
.\.venv\Scripts\python.exe backend\scripts\normalize_oem_catalogue.py
```

Useful filters:

```bash
# One OEM source
.\.venv\Scripts\python.exe backend\scripts\normalize_oem_catalogue.py --source toyota.ie

# One exact raw scrape run for a source
.\.venv\Scripts\python.exe backend\scripts\normalize_oem_catalogue.py --source toyota.ie --raw-run-id <raw_run_id>
```

### 2. Normalize approved-used OEM inventory

Normalizes the latest raw approved-used run for each source, or one source / one raw run if you filter it.

```bash
.\.venv\Scripts\python.exe backend\scripts\normalize_oem_used_inventory.py
```

Useful filters:

```bash
# One approved-used source
.\.venv\Scripts\python.exe backend\scripts\normalize_oem_used_inventory.py --source approvedused.toyota.ie

# One exact raw scrape run for a source
.\.venv\Scripts\python.exe backend\scripts\normalize_oem_used_inventory.py --source approvedused.toyota.ie --raw-run-id <raw_run_id>
```

### 3. Normalize general market captures

This keeps the existing market pipeline working while the newer OEM-first catalogue and approved-used layers become the main source of truth.

```bash
.\.venv\Scripts\python.exe backend\scripts\normalize_market_data.py
```

### Recommended order

```bash
# 1. Autoevolution generation backbone
.\.venv\Scripts\python.exe backend\scripts\scrape_autoevolution_catalogue.py

# 2. Official OEM catalogue runs
.\.venv\Scripts\python.exe backend\scripts\scrape_toyota_ie.py
.\.venv\Scripts\python.exe backend\scripts\scrape_hyundai_ie.py
.\.venv\Scripts\python.exe backend\scripts\scrape_volkswagen_ie.py

# 3. Normalize OEM catalogue
.\.venv\Scripts\python.exe backend\scripts\normalize_oem_catalogue.py

# 4. Approved-used runs
.\.venv\Scripts\python.exe backend\scripts\scrape_toyota_approved_used.py
.\.venv\Scripts\python.exe backend\scripts\scrape_hyundai_approved_used.py
.\.venv\Scripts\python.exe backend\scripts\scrape_volkswagen_approved_used.py

# 5. Normalize approved-used inventory
.\.venv\Scripts\python.exe backend\scripts\normalize_oem_used_inventory.py
```

### Check the result in Admin

The `Normalization Review` tab in Admin reads the latest completed normalized run by default and helps you inspect:

- raw row counts vs normalized row counts
- unique raw values and normalized values
- anomaly groups and suspicious strings
- weak generation or variant matches that still need human review

If Admin says there are no normalized runs yet, it usually means the normalization scripts have not been run for the raw data currently in `sqlite/oem_catalogue.sqlite3` or `sqlite/oem_used_inventory.sqlite3`.

## Admin data browsers

The Admin page reads from multiple backends:

- main backend on port `8000`
- OEM backend on port `8001`

Start them like this:

```bash
# main backend
$env:PYTHONPATH = "$PWD\backend"
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

```bash
# OEM backend for Toyota, Hyundai, and Volkswagen OEM/used browsers
$env:PYTHONPATH = "$PWD\backend"
.\.venv\Scripts\python.exe -m uvicorn app.oem_main:app --reload --host 0.0.0.0 --port 8001
```

```bash
# frontend
cd frontend
npm run dev -- --host 0.0.0.0 --port 5173
```

Admin tabs currently include:

- `Operations`
- `Scraped Catalogue`
- `OEM Catalogue`
- `Used Inventory`
- `Normalization Review`
