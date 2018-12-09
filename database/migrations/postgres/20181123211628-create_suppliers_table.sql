
-- +migrate Up
create table suppliers (
	id bigserial,
    type varchar,
	code varchar not null, -- maybe car-plate or lock number
	created_at timestamp default now(),
	updated_at timestamp default now(),
	deleted_at timestamp null,
	primary key (id)
);

-- +migrate Down
drop table suppliers;