create table alert(
    id bigserial primary key,
    threshold double precision,
    email_address text,
    trigger_up boolean,
    trigger_down boolean
);
create index threshold_idx on alert(threshold);
