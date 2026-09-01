-- Transport / token / evidence integrity indexes.
-- These indexes mirror existing foreign-key relationships and improve joins
-- used by NAB, certification, tokenization and settlement workflows.

create index if not exists idx_fraction_objects_token_id
  on public.fraction_objects (token_id);

create index if not exists idx_market_orders_token_id
  on public.market_orders (token_id);

create index if not exists idx_market_orders_fraction_id
  on public.market_orders (fraction_id);

create index if not exists idx_trades_ask_order_id
  on public.trades (ask_order_id);

create index if not exists idx_trades_bid_order_id
  on public.trades (bid_order_id);

create index if not exists idx_omnii_token_identifiers_representation_id
  on public.omnii_token_identifiers (token_representation_id);

create index if not exists idx_omnii_token_lifecycle_events_representation_id
  on public.omnii_token_lifecycle_events (token_representation_id);

create index if not exists idx_omnii_mint_issuances_underlying_object
  on public.omnii_mint_issuances (underlying_object);
