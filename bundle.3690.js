(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3690,7316],{

/***/ 53690:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(57316);
exports.scope = "sql";


/***/ }),

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjM2OTAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsZ0RBQStDO0FBQy9DLGFBQWE7Ozs7Ozs7O0FDSGI7QUFDQSxpQkFBaUIsU0FBUztBQUMxQixLQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUksUUFBUSxHQUFHLFFBQVEsR0FBRyxjQUFjLEdBQUc7QUFDM0M7QUFDQSxJQUFJLFFBQVEsWUFBWSxPQUFPLEtBQUssY0FBYyxHQUFHO0FBQ3JEO0FBQ0EsSUFBSSxRQUFRLFVBQVUsYUFBYSxHQUFHO0FBQ3RDO0FBQ0EsSUFBSSxRQUFRLFFBQVEsbUJBQW1CLEdBQUc7QUFDMUM7QUFDQSxpQkFBaUIsV0FBVyxNQUFNLFFBQVEsSUFBSSxTQUFTO0FBQ3ZEO0FBQ0Esd0JBQXdCLFFBQVEsTUFBTSxRQUFRLElBQUksU0FBUztBQUMzRDtBQUNBLHFCQUFxQixTQUFTLE9BQU8sVUFBVTtBQUMvQztBQUNBLHNCQUFzQixRQUFRLElBQUksVUFBVSxPQUFPLFVBQVU7QUFDN0Q7QUFDQSxnQkFBZ0IsU0FBUyxRQUFRLFVBQVUsR0FBRyxPQUFPO0FBQ3JEO0FBQ0Esb0JBQW9CLFFBQVEsY0FBYyxLQUFLLGdCQUFnQixLQUFLLFlBQVk7QUFDaEY7QUFDQSxrQkFBa0I7QUFDbEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9zbmlwcGV0cy9zcWwuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvc25pcHBldHMvc3FsLnNuaXBwZXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLnNuaXBwZXRUZXh0ID0gcmVxdWlyZShcIi4vc3FsLnNuaXBwZXRzXCIpO1xuZXhwb3J0cy5zY29wZSA9IFwic3FsXCI7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGBzbmlwcGV0IHRibFxuXHRjcmVhdGUgdGFibGUgXFwkezE6dGFibGV9IChcblx0XHRcXCR7Mjpjb2x1bW5zfVxuXHQpO1xuc25pcHBldCBjb2xcblx0XFwkezE6bmFtZX1cdFxcJHsyOnR5cGV9XHRcXCR7MzpkZWZhdWx0ICcnfVx0XFwkezQ6bm90IG51bGx9XG5zbmlwcGV0IGNjb2xcblx0XFwkezE6bmFtZX1cdHZhcmNoYXIyKFxcJHsyOnNpemV9KVx0XFwkezM6ZGVmYXVsdCAnJ31cdFxcJHs0Om5vdCBudWxsfVxuc25pcHBldCBuY29sXG5cdFxcJHsxOm5hbWV9XHRudW1iZXJcdFxcJHszOmRlZmF1bHQgMH1cdFxcJHs0Om5vdCBudWxsfVxuc25pcHBldCBkY29sXG5cdFxcJHsxOm5hbWV9XHRkYXRlXHRcXCR7MzpkZWZhdWx0IHN5c2RhdGV9XHRcXCR7NDpub3QgbnVsbH1cbnNuaXBwZXQgaW5kXG5cdGNyZWF0ZSBpbmRleCBcXCR7MzpcXCQxX1xcJDJ9IG9uIFxcJHsxOnRhYmxlfShcXCR7Mjpjb2x1bW59KTtcbnNuaXBwZXQgdWluZFxuXHRjcmVhdGUgdW5pcXVlIGluZGV4IFxcJHsxOm5hbWV9IG9uIFxcJHsyOnRhYmxlfShcXCR7Mzpjb2x1bW59KTtcbnNuaXBwZXQgdGJsY29tXG5cdGNvbW1lbnQgb24gdGFibGUgXFwkezE6dGFibGV9IGlzICdcXCR7Mjpjb21tZW50fSc7XG5zbmlwcGV0IGNvbGNvbVxuXHRjb21tZW50IG9uIGNvbHVtbiBcXCR7MTp0YWJsZX0uXFwkezI6Y29sdW1ufSBpcyAnXFwkezM6Y29tbWVudH0nO1xuc25pcHBldCBhZGRjb2xcblx0YWx0ZXIgdGFibGUgXFwkezE6dGFibGV9IGFkZCAoXFwkezI6Y29sdW1ufSBcXCR7Mzp0eXBlfSk7XG5zbmlwcGV0IHNlcVxuXHRjcmVhdGUgc2VxdWVuY2UgXFwkezE6bmFtZX0gc3RhcnQgd2l0aCBcXCR7MjoxfSBpbmNyZW1lbnQgYnkgXFwkezM6MX0gbWludmFsdWUgXFwkezQ6MX07XG5zbmlwcGV0IHMqXG5cdHNlbGVjdCAqIGZyb20gXFwkezE6dGFibGV9XG5gO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9