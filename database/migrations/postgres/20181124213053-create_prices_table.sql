
-- +migrate Up
create table prices (
	id bigserial,
    product_id bigint,
	name varchar not null,
	price_1 numeric default 0,
	price_2 numeric default 0,
	price_3 numeric default 0,
	created_at timestamp default now(),
	updated_at timestamp default now(),
	deleted_at timestamp null,
	primary key (id),
	foreign key (product_id) references products (id)
);

-- +migrate Down
drop table prices;