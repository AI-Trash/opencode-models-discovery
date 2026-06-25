# Issue 19: Fetch Timeout Fallback

## Context

Some OpenAI-compatible HTTP gateways can respond successfully to `curl` and Node's low-level `http` module while Node's built-in `fetch()` times out. This has been observed with plain HTTP local gateways such as OmniRoute on `http://127.0.0.1:20128`.

Node's global `fetch()` is implemented by undici. It is the preferred high-level request API for now, but it can behave differently from Node's lower-level `http` and `https` modules against non-standard or minimal HTTP servers.

## Current Strategy

OpenAI-compatible model discovery now uses Node's low-level `http` / `https` modules directly instead of Node's global `fetch()`.

These cases preserve the previous observable behavior:

- non-2xx HTTP responses
- successful responses with an empty model list
- successful responses with invalid or empty JSON bodies

The low-level request helper should preserve consistent behavior across discovery requests:

- use the same timeout value
- pass the same headers, including `Authorization`
- only treat 2xx status codes as successful
- catch JSON parse errors
- destroy the request on timeout
- settle the Promise only once

## Refactor Status

The original fallback was a patch-level compatibility fix. The follow-up refactor has been completed for OpenAI-compatible discovery requests by replacing the `fetch()` primary path and fallback branch with a single low-level request helper.

This applies to:

- `/v1/models` discovery
- custom model discovery endpoints
- `/v1/model/info` discovery
- direct model list fetching

The helper covers:

- `http:` and `https:` URLs
- status code validation
- JSON parsing and parse failure handling
- timeout and request cleanup
- response stream errors
- shared headers and auth handling
- consistent return semantics for model discovery and model info discovery
- tests for success, empty model lists, non-2xx responses, invalid JSON, timeout, transport errors, auth headers, and custom endpoints
