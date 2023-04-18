# api-db-jsgram


# how to create localhost database in postgres

create table usuarios (
	codigo serial primary key, 
	nome varchar(20) not null, 
	senha varchar(50) not null, 
	fotoPerfil varchar(500) null 	
);

insert into usuarios (nome, senha) 
values ('admin', 'admin')
returning codigo, nome, senha;

create table publicacoes (
	codigo serial primary key, 
	imagem varchar(500) not null, 
	descricao varchar(40) not null,
	usuario integer not null, 
	foreign key (usuario) references usuarios (codigo)
);

insert into publicacoes (imagem, descricao, usuario) 
values ('imagem', 'teste', 1)
returning codigo, imagem, descricao, usuario;

select * from usuarios
select * from publicacoes
