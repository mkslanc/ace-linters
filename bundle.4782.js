"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4782],{

/***/ 44782:
/***/ ((__unused_webpack_module, exports) => {



exports.snippets = [
    {
        "content": "case ${1:condition}:\n\t$0\n\tbreak;\n",
        "name": "case",
        "scope": "vala",
        "tabTrigger": "case"
    },
    {
        "content": "/**\n * ${6}\n */\n${1:public} class ${2:MethodName}${3: : GLib.Object} {\n\n\t/**\n\t * ${7}\n\t */\n\tpublic ${2}(${4}) {\n\t\t${5}\n\t}\n\n\t$0\n}",
        "name": "class",
        "scope": "vala",
        "tabTrigger": "class"
    },
    {
        "content": "(${1}) => {\n\t${0}\n}\n",
        "name": "closure",
        "scope": "vala",
        "tabTrigger": "=>"
    },
    {
        "content": "/*\n * $0\n */",
        "name": "Comment (multiline)",
        "scope": "vala",
        "tabTrigger": "/*"
    },
    {
        "content": "Console.WriteLine($1);\n$0",
        "name": "Console.WriteLine (writeline)",
        "scope": "vala",
        "tabTrigger": "writeline"
    },
    {
        "content": "[DBus(name = \"$0\")]",
        "name": "DBus annotation",
        "scope": "vala",
        "tabTrigger": "[DBus"
    },
    {
        "content": "delegate ${1:void} ${2:DelegateName}($0);",
        "name": "delegate",
        "scope": "vala",
        "tabTrigger": "delegate"
    },
    {
        "content": "do {\n\t$0\n} while ($1);\n",
        "name": "do while",
        "scope": "vala",
        "tabTrigger": "dowhile"
    },
    {
        "content": "/**\n * $0\n */",
        "name": "DocBlock",
        "scope": "vala",
        "tabTrigger": "/**"
    },
    {
        "content": "else if ($1) {\n\t$0\n}\n",
        "name": "else if (elseif)",
        "scope": "vala",
        "tabTrigger": "elseif"
    },
    {
        "content": "else {\n\t$0\n}",
        "name": "else",
        "scope": "vala",
        "tabTrigger": "else"
    },
    {
        "content": "enum {$1:EnumName} {\n\t$0\n}",
        "name": "enum",
        "scope": "vala",
        "tabTrigger": "enum"
    },
    {
        "content": "public errordomain ${1:Error} {\n\t$0\n}",
        "name": "error domain",
        "scope": "vala",
        "tabTrigger": "errordomain"
    },
    {
        "content": "for ($1;$2;$3) {\n\t$0\n}",
        "name": "for",
        "scope": "vala",
        "tabTrigger": "for"
    },
    {
        "content": "foreach ($1 in $2) {\n\t$0\n}",
        "name": "foreach",
        "scope": "vala",
        "tabTrigger": "foreach"
    },
    {
        "content": "Gee.ArrayList<${1:G}>($0);",
        "name": "Gee.ArrayList",
        "scope": "vala",
        "tabTrigger": "ArrayList"
    },
    {
        "content": "Gee.HashMap<${1:K},${2:V}>($0);",
        "name": "Gee.HashMap",
        "scope": "vala",
        "tabTrigger": "HashMap"
    },
    {
        "content": "Gee.HashSet<${1:G}>($0);",
        "name": "Gee.HashSet",
        "scope": "vala",
        "tabTrigger": "HashSet"
    },
    {
        "content": "if ($1) {\n\t$0\n}",
        "name": "if",
        "scope": "vala",
        "tabTrigger": "if"
    },
    {
        "content": "interface ${1:InterfaceName}{$2: : SuperInterface} {\n\t$0\n}",
        "name": "interface",
        "scope": "vala",
        "tabTrigger": "interface"
    },
    {
        "content": "public static int main(string [] argv) {\n\t${0}\n\treturn 0;\n}",
        "name": "Main function",
        "scope": "vala",
        "tabTrigger": "main"
    },
    {
        "content": "namespace $1 {\n\t$0\n}\n",
        "name": "namespace (ns)",
        "scope": "vala",
        "tabTrigger": "ns"
    },
    {
        "content": "stdout.printf($0);",
        "name": "printf",
        "scope": "vala",
        "tabTrigger": "printf"
    },
    {
        "content": "${1:public} ${2:Type} ${3:Name} {\n\tset {\n\t\t$0\n\t}\n\tget {\n\n\t}\n}",
        "name": "property (prop)",
        "scope": "vala",
        "tabTrigger": "prop"
    },
    {
        "content": "${1:public} ${2:Type} ${3:Name} {\n\tget {\n\t\t$0\n\t}\n}",
        "name": "read-only property (roprop)",
        "scope": "vala",
        "tabTrigger": "roprop"
    },
    {
        "content": "@\"${1:\\$var}\"",
        "name": "String template (@)",
        "scope": "vala",
        "tabTrigger": "@"
    },
    {
        "content": "struct ${1:StructName} {\n\t$0\n}",
        "name": "struct",
        "scope": "vala",
        "tabTrigger": "struct"
    },
    {
        "content": "switch ($1) {\n\t$0\n}",
        "name": "switch",
        "scope": "vala",
        "tabTrigger": "switch"
    },
    {
        "content": "try {\n\t$2\n} catch (${1:Error} e) {\n\t$0\n}",
        "name": "try/catch",
        "scope": "vala",
        "tabTrigger": "try"
    },
    {
        "content": "\"\"\"$0\"\"\";",
        "name": "Verbatim string (\"\"\")",
        "scope": "vala",
        "tabTrigger": "verbatim"
    },
    {
        "content": "while ($1) {\n\t$0\n}",
        "name": "while",
        "scope": "vala",
        "tabTrigger": "while"
    }
];
exports.scope = "";


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL3NuaXBwZXRzL3ZhbGEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuc25pcHBldHMgPSBbXG4gICAge1xuICAgICAgICBcImNvbnRlbnRcIjogXCJjYXNlICR7MTpjb25kaXRpb259OlxcblxcdCQwXFxuXFx0YnJlYWs7XFxuXCIsXG4gICAgICAgIFwibmFtZVwiOiBcImNhc2VcIixcbiAgICAgICAgXCJzY29wZVwiOiBcInZhbGFcIixcbiAgICAgICAgXCJ0YWJUcmlnZ2VyXCI6IFwiY2FzZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiY29udGVudFwiOiBcIi8qKlxcbiAqICR7Nn1cXG4gKi9cXG4kezE6cHVibGljfSBjbGFzcyAkezI6TWV0aG9kTmFtZX0kezM6IDogR0xpYi5PYmplY3R9IHtcXG5cXG5cXHQvKipcXG5cXHQgKiAkezd9XFxuXFx0ICovXFxuXFx0cHVibGljICR7Mn0oJHs0fSkge1xcblxcdFxcdCR7NX1cXG5cXHR9XFxuXFxuXFx0JDBcXG59XCIsXG4gICAgICAgIFwibmFtZVwiOiBcImNsYXNzXCIsXG4gICAgICAgIFwic2NvcGVcIjogXCJ2YWxhXCIsXG4gICAgICAgIFwidGFiVHJpZ2dlclwiOiBcImNsYXNzXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJjb250ZW50XCI6IFwiKCR7MX0pID0+IHtcXG5cXHQkezB9XFxufVxcblwiLFxuICAgICAgICBcIm5hbWVcIjogXCJjbG9zdXJlXCIsXG4gICAgICAgIFwic2NvcGVcIjogXCJ2YWxhXCIsXG4gICAgICAgIFwidGFiVHJpZ2dlclwiOiBcIj0+XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJjb250ZW50XCI6IFwiLypcXG4gKiAkMFxcbiAqL1wiLFxuICAgICAgICBcIm5hbWVcIjogXCJDb21tZW50IChtdWx0aWxpbmUpXCIsXG4gICAgICAgIFwic2NvcGVcIjogXCJ2YWxhXCIsXG4gICAgICAgIFwidGFiVHJpZ2dlclwiOiBcIi8qXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJjb250ZW50XCI6IFwiQ29uc29sZS5Xcml0ZUxpbmUoJDEpO1xcbiQwXCIsXG4gICAgICAgIFwibmFtZVwiOiBcIkNvbnNvbGUuV3JpdGVMaW5lICh3cml0ZWxpbmUpXCIsXG4gICAgICAgIFwic2NvcGVcIjogXCJ2YWxhXCIsXG4gICAgICAgIFwidGFiVHJpZ2dlclwiOiBcIndyaXRlbGluZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiY29udGVudFwiOiBcIltEQnVzKG5hbWUgPSBcXFwiJDBcXFwiKV1cIixcbiAgICAgICAgXCJuYW1lXCI6IFwiREJ1cyBhbm5vdGF0aW9uXCIsXG4gICAgICAgIFwic2NvcGVcIjogXCJ2YWxhXCIsXG4gICAgICAgIFwidGFiVHJpZ2dlclwiOiBcIltEQnVzXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJjb250ZW50XCI6IFwiZGVsZWdhdGUgJHsxOnZvaWR9ICR7MjpEZWxlZ2F0ZU5hbWV9KCQwKTtcIixcbiAgICAgICAgXCJuYW1lXCI6IFwiZGVsZWdhdGVcIixcbiAgICAgICAgXCJzY29wZVwiOiBcInZhbGFcIixcbiAgICAgICAgXCJ0YWJUcmlnZ2VyXCI6IFwiZGVsZWdhdGVcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImNvbnRlbnRcIjogXCJkbyB7XFxuXFx0JDBcXG59IHdoaWxlICgkMSk7XFxuXCIsXG4gICAgICAgIFwibmFtZVwiOiBcImRvIHdoaWxlXCIsXG4gICAgICAgIFwic2NvcGVcIjogXCJ2YWxhXCIsXG4gICAgICAgIFwidGFiVHJpZ2dlclwiOiBcImRvd2hpbGVcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImNvbnRlbnRcIjogXCIvKipcXG4gKiAkMFxcbiAqL1wiLFxuICAgICAgICBcIm5hbWVcIjogXCJEb2NCbG9ja1wiLFxuICAgICAgICBcInNjb3BlXCI6IFwidmFsYVwiLFxuICAgICAgICBcInRhYlRyaWdnZXJcIjogXCIvKipcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImNvbnRlbnRcIjogXCJlbHNlIGlmICgkMSkge1xcblxcdCQwXFxufVxcblwiLFxuICAgICAgICBcIm5hbWVcIjogXCJlbHNlIGlmIChlbHNlaWYpXCIsXG4gICAgICAgIFwic2NvcGVcIjogXCJ2YWxhXCIsXG4gICAgICAgIFwidGFiVHJpZ2dlclwiOiBcImVsc2VpZlwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiY29udGVudFwiOiBcImVsc2Uge1xcblxcdCQwXFxufVwiLFxuICAgICAgICBcIm5hbWVcIjogXCJlbHNlXCIsXG4gICAgICAgIFwic2NvcGVcIjogXCJ2YWxhXCIsXG4gICAgICAgIFwidGFiVHJpZ2dlclwiOiBcImVsc2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImNvbnRlbnRcIjogXCJlbnVtIHskMTpFbnVtTmFtZX0ge1xcblxcdCQwXFxufVwiLFxuICAgICAgICBcIm5hbWVcIjogXCJlbnVtXCIsXG4gICAgICAgIFwic2NvcGVcIjogXCJ2YWxhXCIsXG4gICAgICAgIFwidGFiVHJpZ2dlclwiOiBcImVudW1cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImNvbnRlbnRcIjogXCJwdWJsaWMgZXJyb3Jkb21haW4gJHsxOkVycm9yfSB7XFxuXFx0JDBcXG59XCIsXG4gICAgICAgIFwibmFtZVwiOiBcImVycm9yIGRvbWFpblwiLFxuICAgICAgICBcInNjb3BlXCI6IFwidmFsYVwiLFxuICAgICAgICBcInRhYlRyaWdnZXJcIjogXCJlcnJvcmRvbWFpblwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiY29udGVudFwiOiBcImZvciAoJDE7JDI7JDMpIHtcXG5cXHQkMFxcbn1cIixcbiAgICAgICAgXCJuYW1lXCI6IFwiZm9yXCIsXG4gICAgICAgIFwic2NvcGVcIjogXCJ2YWxhXCIsXG4gICAgICAgIFwidGFiVHJpZ2dlclwiOiBcImZvclwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiY29udGVudFwiOiBcImZvcmVhY2ggKCQxIGluICQyKSB7XFxuXFx0JDBcXG59XCIsXG4gICAgICAgIFwibmFtZVwiOiBcImZvcmVhY2hcIixcbiAgICAgICAgXCJzY29wZVwiOiBcInZhbGFcIixcbiAgICAgICAgXCJ0YWJUcmlnZ2VyXCI6IFwiZm9yZWFjaFwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiY29udGVudFwiOiBcIkdlZS5BcnJheUxpc3Q8JHsxOkd9PigkMCk7XCIsXG4gICAgICAgIFwibmFtZVwiOiBcIkdlZS5BcnJheUxpc3RcIixcbiAgICAgICAgXCJzY29wZVwiOiBcInZhbGFcIixcbiAgICAgICAgXCJ0YWJUcmlnZ2VyXCI6IFwiQXJyYXlMaXN0XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJjb250ZW50XCI6IFwiR2VlLkhhc2hNYXA8JHsxOkt9LCR7MjpWfT4oJDApO1wiLFxuICAgICAgICBcIm5hbWVcIjogXCJHZWUuSGFzaE1hcFwiLFxuICAgICAgICBcInNjb3BlXCI6IFwidmFsYVwiLFxuICAgICAgICBcInRhYlRyaWdnZXJcIjogXCJIYXNoTWFwXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJjb250ZW50XCI6IFwiR2VlLkhhc2hTZXQ8JHsxOkd9PigkMCk7XCIsXG4gICAgICAgIFwibmFtZVwiOiBcIkdlZS5IYXNoU2V0XCIsXG4gICAgICAgIFwic2NvcGVcIjogXCJ2YWxhXCIsXG4gICAgICAgIFwidGFiVHJpZ2dlclwiOiBcIkhhc2hTZXRcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImNvbnRlbnRcIjogXCJpZiAoJDEpIHtcXG5cXHQkMFxcbn1cIixcbiAgICAgICAgXCJuYW1lXCI6IFwiaWZcIixcbiAgICAgICAgXCJzY29wZVwiOiBcInZhbGFcIixcbiAgICAgICAgXCJ0YWJUcmlnZ2VyXCI6IFwiaWZcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImNvbnRlbnRcIjogXCJpbnRlcmZhY2UgJHsxOkludGVyZmFjZU5hbWV9eyQyOiA6IFN1cGVySW50ZXJmYWNlfSB7XFxuXFx0JDBcXG59XCIsXG4gICAgICAgIFwibmFtZVwiOiBcImludGVyZmFjZVwiLFxuICAgICAgICBcInNjb3BlXCI6IFwidmFsYVwiLFxuICAgICAgICBcInRhYlRyaWdnZXJcIjogXCJpbnRlcmZhY2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImNvbnRlbnRcIjogXCJwdWJsaWMgc3RhdGljIGludCBtYWluKHN0cmluZyBbXSBhcmd2KSB7XFxuXFx0JHswfVxcblxcdHJldHVybiAwO1xcbn1cIixcbiAgICAgICAgXCJuYW1lXCI6IFwiTWFpbiBmdW5jdGlvblwiLFxuICAgICAgICBcInNjb3BlXCI6IFwidmFsYVwiLFxuICAgICAgICBcInRhYlRyaWdnZXJcIjogXCJtYWluXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJjb250ZW50XCI6IFwibmFtZXNwYWNlICQxIHtcXG5cXHQkMFxcbn1cXG5cIixcbiAgICAgICAgXCJuYW1lXCI6IFwibmFtZXNwYWNlIChucylcIixcbiAgICAgICAgXCJzY29wZVwiOiBcInZhbGFcIixcbiAgICAgICAgXCJ0YWJUcmlnZ2VyXCI6IFwibnNcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImNvbnRlbnRcIjogXCJzdGRvdXQucHJpbnRmKCQwKTtcIixcbiAgICAgICAgXCJuYW1lXCI6IFwicHJpbnRmXCIsXG4gICAgICAgIFwic2NvcGVcIjogXCJ2YWxhXCIsXG4gICAgICAgIFwidGFiVHJpZ2dlclwiOiBcInByaW50ZlwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiY29udGVudFwiOiBcIiR7MTpwdWJsaWN9ICR7MjpUeXBlfSAkezM6TmFtZX0ge1xcblxcdHNldCB7XFxuXFx0XFx0JDBcXG5cXHR9XFxuXFx0Z2V0IHtcXG5cXG5cXHR9XFxufVwiLFxuICAgICAgICBcIm5hbWVcIjogXCJwcm9wZXJ0eSAocHJvcClcIixcbiAgICAgICAgXCJzY29wZVwiOiBcInZhbGFcIixcbiAgICAgICAgXCJ0YWJUcmlnZ2VyXCI6IFwicHJvcFwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiY29udGVudFwiOiBcIiR7MTpwdWJsaWN9ICR7MjpUeXBlfSAkezM6TmFtZX0ge1xcblxcdGdldCB7XFxuXFx0XFx0JDBcXG5cXHR9XFxufVwiLFxuICAgICAgICBcIm5hbWVcIjogXCJyZWFkLW9ubHkgcHJvcGVydHkgKHJvcHJvcClcIixcbiAgICAgICAgXCJzY29wZVwiOiBcInZhbGFcIixcbiAgICAgICAgXCJ0YWJUcmlnZ2VyXCI6IFwicm9wcm9wXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJjb250ZW50XCI6IFwiQFxcXCIkezE6XFxcXCR2YXJ9XFxcIlwiLFxuICAgICAgICBcIm5hbWVcIjogXCJTdHJpbmcgdGVtcGxhdGUgKEApXCIsXG4gICAgICAgIFwic2NvcGVcIjogXCJ2YWxhXCIsXG4gICAgICAgIFwidGFiVHJpZ2dlclwiOiBcIkBcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImNvbnRlbnRcIjogXCJzdHJ1Y3QgJHsxOlN0cnVjdE5hbWV9IHtcXG5cXHQkMFxcbn1cIixcbiAgICAgICAgXCJuYW1lXCI6IFwic3RydWN0XCIsXG4gICAgICAgIFwic2NvcGVcIjogXCJ2YWxhXCIsXG4gICAgICAgIFwidGFiVHJpZ2dlclwiOiBcInN0cnVjdFwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiY29udGVudFwiOiBcInN3aXRjaCAoJDEpIHtcXG5cXHQkMFxcbn1cIixcbiAgICAgICAgXCJuYW1lXCI6IFwic3dpdGNoXCIsXG4gICAgICAgIFwic2NvcGVcIjogXCJ2YWxhXCIsXG4gICAgICAgIFwidGFiVHJpZ2dlclwiOiBcInN3aXRjaFwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiY29udGVudFwiOiBcInRyeSB7XFxuXFx0JDJcXG59IGNhdGNoICgkezE6RXJyb3J9IGUpIHtcXG5cXHQkMFxcbn1cIixcbiAgICAgICAgXCJuYW1lXCI6IFwidHJ5L2NhdGNoXCIsXG4gICAgICAgIFwic2NvcGVcIjogXCJ2YWxhXCIsXG4gICAgICAgIFwidGFiVHJpZ2dlclwiOiBcInRyeVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFwiXFxcIiQwXFxcIlxcXCJcXFwiO1wiLFxuICAgICAgICBcIm5hbWVcIjogXCJWZXJiYXRpbSBzdHJpbmcgKFxcXCJcXFwiXFxcIilcIixcbiAgICAgICAgXCJzY29wZVwiOiBcInZhbGFcIixcbiAgICAgICAgXCJ0YWJUcmlnZ2VyXCI6IFwidmVyYmF0aW1cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImNvbnRlbnRcIjogXCJ3aGlsZSAoJDEpIHtcXG5cXHQkMFxcbn1cIixcbiAgICAgICAgXCJuYW1lXCI6IFwid2hpbGVcIixcbiAgICAgICAgXCJzY29wZVwiOiBcInZhbGFcIixcbiAgICAgICAgXCJ0YWJUcmlnZ2VyXCI6IFwid2hpbGVcIlxuICAgIH1cbl07XG5leHBvcnRzLnNjb3BlID0gXCJcIjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==