(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[7316],{

/***/ 57316:
/***/ ((module) => {

module.exports = `snippet tbl
	create table \${1:table} (
		\${2:columns}
	);
snippet col
	\${1:name}	\${2:type}	\${3:default ''}	\${4:not null}
snippet ccol
	\${1:name}	varchar2(\${2:size})	\${3:default ''}	\${4:not null}
snippet ncol
	\${1:name}	number	\${3:default 0}	\${4:not null}
snippet dcol
	\${1:name}	date	\${3:default sysdate}	\${4:not null}
snippet ind
	create index \${3:\$1_\$2} on \${1:table}(\${2:column});
snippet uind
	create unique index \${1:name} on \${2:table}(\${3:column});
snippet tblcom
	comment on table \${1:table} is '\${2:comment}';
snippet colcom
	comment on column \${1:table}.\${2:column} is '\${3:comment}';
snippet addcol
	alter table \${1:table} add (\${2:column} \${3:type});
snippet seq
	create sequence \${1:name} start with \${2:1} increment by \${3:1} minvalue \${4:1};
snippet s*
	select * from \${1:table}
`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjczMTYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCLEtBQUs7QUFDTDtBQUNBO0FBQ0EsSUFBSSxRQUFRLEdBQUcsUUFBUSxHQUFHLGNBQWMsR0FBRztBQUMzQztBQUNBLElBQUksUUFBUSxZQUFZLE9BQU8sS0FBSyxjQUFjLEdBQUc7QUFDckQ7QUFDQSxJQUFJLFFBQVEsVUFBVSxhQUFhLEdBQUc7QUFDdEM7QUFDQSxJQUFJLFFBQVEsUUFBUSxtQkFBbUIsR0FBRztBQUMxQztBQUNBLGlCQUFpQixXQUFXLE1BQU0sUUFBUSxJQUFJLFNBQVM7QUFDdkQ7QUFDQSx3QkFBd0IsUUFBUSxNQUFNLFFBQVEsSUFBSSxTQUFTO0FBQzNEO0FBQ0EscUJBQXFCLFNBQVMsT0FBTyxVQUFVO0FBQy9DO0FBQ0Esc0JBQXNCLFFBQVEsSUFBSSxVQUFVLE9BQU8sVUFBVTtBQUM3RDtBQUNBLGdCQUFnQixTQUFTLFFBQVEsVUFBVSxHQUFHLE9BQU87QUFDckQ7QUFDQSxvQkFBb0IsUUFBUSxjQUFjLEtBQUssZ0JBQWdCLEtBQUssWUFBWTtBQUNoRjtBQUNBLGtCQUFrQjtBQUNsQiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL3NuaXBwZXRzL3NxbC5zbmlwcGV0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGBzbmlwcGV0IHRibFxuXHRjcmVhdGUgdGFibGUgXFwkezE6dGFibGV9IChcblx0XHRcXCR7Mjpjb2x1bW5zfVxuXHQpO1xuc25pcHBldCBjb2xcblx0XFwkezE6bmFtZX1cdFxcJHsyOnR5cGV9XHRcXCR7MzpkZWZhdWx0ICcnfVx0XFwkezQ6bm90IG51bGx9XG5zbmlwcGV0IGNjb2xcblx0XFwkezE6bmFtZX1cdHZhcmNoYXIyKFxcJHsyOnNpemV9KVx0XFwkezM6ZGVmYXVsdCAnJ31cdFxcJHs0Om5vdCBudWxsfVxuc25pcHBldCBuY29sXG5cdFxcJHsxOm5hbWV9XHRudW1iZXJcdFxcJHszOmRlZmF1bHQgMH1cdFxcJHs0Om5vdCBudWxsfVxuc25pcHBldCBkY29sXG5cdFxcJHsxOm5hbWV9XHRkYXRlXHRcXCR7MzpkZWZhdWx0IHN5c2RhdGV9XHRcXCR7NDpub3QgbnVsbH1cbnNuaXBwZXQgaW5kXG5cdGNyZWF0ZSBpbmRleCBcXCR7MzpcXCQxX1xcJDJ9IG9uIFxcJHsxOnRhYmxlfShcXCR7Mjpjb2x1bW59KTtcbnNuaXBwZXQgdWluZFxuXHRjcmVhdGUgdW5pcXVlIGluZGV4IFxcJHsxOm5hbWV9IG9uIFxcJHsyOnRhYmxlfShcXCR7Mzpjb2x1bW59KTtcbnNuaXBwZXQgdGJsY29tXG5cdGNvbW1lbnQgb24gdGFibGUgXFwkezE6dGFibGV9IGlzICdcXCR7Mjpjb21tZW50fSc7XG5zbmlwcGV0IGNvbGNvbVxuXHRjb21tZW50IG9uIGNvbHVtbiBcXCR7MTp0YWJsZX0uXFwkezI6Y29sdW1ufSBpcyAnXFwkezM6Y29tbWVudH0nO1xuc25pcHBldCBhZGRjb2xcblx0YWx0ZXIgdGFibGUgXFwkezE6dGFibGV9IGFkZCAoXFwkezI6Y29sdW1ufSBcXCR7Mzp0eXBlfSk7XG5zbmlwcGV0IHNlcVxuXHRjcmVhdGUgc2VxdWVuY2UgXFwkezE6bmFtZX0gc3RhcnQgd2l0aCBcXCR7MjoxfSBpbmNyZW1lbnQgYnkgXFwkezM6MX0gbWludmFsdWUgXFwkezQ6MX07XG5zbmlwcGV0IHMqXG5cdHNlbGVjdCAqIGZyb20gXFwkezE6dGFibGV9XG5gO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9