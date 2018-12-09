
-- +migrate Up
create table products (
	id bigserial,
	supplier_id bigint,
	name varchar not null,
	unit json, --{kg,100g,g} {bag,pack,...}
	price_1 numeric default 0,
	price_2 numeric default 0,
	price_3 numeric default 0,
	time_to_sell_start timestamp,
	time_to_sell_end timestamp,
	all_day_to_sell boolean, -- or auto fill-in ui 
	created_at timestamp default now(),
	updated_at timestamp default now(),
	deleted_at timestamp null,
	primary key (id),
	foreign key (supplier_id) references suppliers (id)
);

-- +migrate Down
drop table products;