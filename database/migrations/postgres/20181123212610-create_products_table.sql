
-- +migrate Up
create table products (
	id bigserial,
	supplier_id bigint,
	name varchar not null,
	price numeric default 0, 
	created_at timestamp default now(),
	updated_at timestamp default now(),
	deleted_at timestamp null,
	primary key (id),
	foreign key (supplier_id) references suppliers (id)
);

-- +migrate Down
drop table products;
