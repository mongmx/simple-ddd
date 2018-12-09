
-- +migrate Up
create table users (
	id bigserial,
	status int not null default 0,
	full_name varchar not null,
	email varchar not null,
	tel varchar not null,
	facebook_id varchar null,
	facebook_token varchar null,
	secret_key varchar not null,
	created timestamp default now(),
	updated timestamp default now(),
	deleted timestamp null,
	primary key (id)
);
create unique index on users (email);

-- +migrate Down
drop table users;