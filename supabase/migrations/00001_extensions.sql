-- =========================================================
-- Migration 00001: Extensions
-- TPDOP – Tanzania Police Digital Operations Platform
-- =========================================================

create extension if not exists "uuid-ossp";
create extension if not exists "postgis";
create extension if not exists "pg_crypto";
create extension if not exists "pg_trgm";   -- fuzzy text search (names)
