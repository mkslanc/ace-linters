"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4612],{

/***/ 64612:
/***/ ((__unused_webpack_module, exports) => {



exports.snippets = [
    {
        "content": "assertEquals(${1:expected}, ${2:expr})",
        "name": "assertEquals",
        "scope": "io",
        "tabTrigger": "ae"
    },
    {
        "content": "${1:${2:newValue} := ${3:Object} }clone do(\n\t$0\n)",
        "name": "clone do",
        "scope": "io",
        "tabTrigger": "cdo"
    },
    {
        "content": "docSlot(\"${1:slotName}\", \"${2:documentation}\")",
        "name": "docSlot",
        "scope": "io",
        "tabTrigger": "ds"
    },
    {
        "content": "(${1:header,}\n\t${2:body}\n)$0",
        "keyEquivalent": "@(",
        "name": "Indented Bracketed Line",
        "scope": "io",
        "tabTrigger": "("
    },
    {
        "content": "\n\t$0\n",
        "keyEquivalent": "\r",
        "name": "Special: Return Inside Empty Parenthesis",
        "scope": "io meta.empty-parenthesis.io, io meta.comma-parenthesis.io"
    },
    {
        "content": "${1:methodName} := method(${2:args,}\n\t$0\n)",
        "name": "method",
        "scope": "io",
        "tabTrigger": "m"
    },
    {
        "content": "newSlot(\"${1:slotName}\", ${2:defaultValue}, \"${3:docString}\")$0",
        "name": "newSlot",
        "scope": "io",
        "tabTrigger": "ns"
    },
    {
        "content": "${1:name} := Object clone do(\n\t$0\n)",
        "name": "Object clone do",
        "scope": "io",
        "tabTrigger": "ocdo"
    },
    {
        "content": "test${1:SomeFeature} := method(\n\t$0\n)",
        "name": "testMethod",
        "scope": "io",
        "tabTrigger": "ts"
    },
    {
        "content": "${1:Something}Test := ${2:UnitTest} clone do(\n\t$0\n)",
        "name": "UnitTest",
        "scope": "io",
        "tabTrigger": "ut"
    }
];
exports.scope = "io";


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjQ2MTIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsZ0JBQWdCO0FBQ2hCO0FBQ0EsbUNBQW1DLFdBQVcsSUFBSSxPQUFPO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHNCQUFzQixJQUFJLFlBQVksS0FBSyxXQUFXO0FBQ3REO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGdDQUFnQyxXQUFXLFFBQVEsZ0JBQWdCO0FBQ25FO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHVCQUF1QixVQUFVLE1BQU0sT0FBTztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0Esc0JBQXNCLGNBQWMsWUFBWSxRQUFRO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGdDQUFnQyxXQUFXLE1BQU0sZUFBZSxNQUFNLFlBQVk7QUFDbEY7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0Esc0JBQXNCLFFBQVE7QUFDOUI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsMEJBQTBCLGVBQWU7QUFDekM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0Esc0JBQXNCLFlBQVksVUFBVSxZQUFZO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvc25pcHBldHMvaW8uanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuc25pcHBldHMgPSBbXG4gICAge1xuICAgICAgICBcImNvbnRlbnRcIjogXCJhc3NlcnRFcXVhbHMoJHsxOmV4cGVjdGVkfSwgJHsyOmV4cHJ9KVwiLFxuICAgICAgICBcIm5hbWVcIjogXCJhc3NlcnRFcXVhbHNcIixcbiAgICAgICAgXCJzY29wZVwiOiBcImlvXCIsXG4gICAgICAgIFwidGFiVHJpZ2dlclwiOiBcImFlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJjb250ZW50XCI6IFwiJHsxOiR7MjpuZXdWYWx1ZX0gOj0gJHszOk9iamVjdH0gfWNsb25lIGRvKFxcblxcdCQwXFxuKVwiLFxuICAgICAgICBcIm5hbWVcIjogXCJjbG9uZSBkb1wiLFxuICAgICAgICBcInNjb3BlXCI6IFwiaW9cIixcbiAgICAgICAgXCJ0YWJUcmlnZ2VyXCI6IFwiY2RvXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJjb250ZW50XCI6IFwiZG9jU2xvdChcXFwiJHsxOnNsb3ROYW1lfVxcXCIsIFxcXCIkezI6ZG9jdW1lbnRhdGlvbn1cXFwiKVwiLFxuICAgICAgICBcIm5hbWVcIjogXCJkb2NTbG90XCIsXG4gICAgICAgIFwic2NvcGVcIjogXCJpb1wiLFxuICAgICAgICBcInRhYlRyaWdnZXJcIjogXCJkc1wiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiY29udGVudFwiOiBcIigkezE6aGVhZGVyLH1cXG5cXHQkezI6Ym9keX1cXG4pJDBcIixcbiAgICAgICAgXCJrZXlFcXVpdmFsZW50XCI6IFwiQChcIixcbiAgICAgICAgXCJuYW1lXCI6IFwiSW5kZW50ZWQgQnJhY2tldGVkIExpbmVcIixcbiAgICAgICAgXCJzY29wZVwiOiBcImlvXCIsXG4gICAgICAgIFwidGFiVHJpZ2dlclwiOiBcIihcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImNvbnRlbnRcIjogXCJcXG5cXHQkMFxcblwiLFxuICAgICAgICBcImtleUVxdWl2YWxlbnRcIjogXCJcXHJcIixcbiAgICAgICAgXCJuYW1lXCI6IFwiU3BlY2lhbDogUmV0dXJuIEluc2lkZSBFbXB0eSBQYXJlbnRoZXNpc1wiLFxuICAgICAgICBcInNjb3BlXCI6IFwiaW8gbWV0YS5lbXB0eS1wYXJlbnRoZXNpcy5pbywgaW8gbWV0YS5jb21tYS1wYXJlbnRoZXNpcy5pb1wiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwiY29udGVudFwiOiBcIiR7MTptZXRob2ROYW1lfSA6PSBtZXRob2QoJHsyOmFyZ3MsfVxcblxcdCQwXFxuKVwiLFxuICAgICAgICBcIm5hbWVcIjogXCJtZXRob2RcIixcbiAgICAgICAgXCJzY29wZVwiOiBcImlvXCIsXG4gICAgICAgIFwidGFiVHJpZ2dlclwiOiBcIm1cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImNvbnRlbnRcIjogXCJuZXdTbG90KFxcXCIkezE6c2xvdE5hbWV9XFxcIiwgJHsyOmRlZmF1bHRWYWx1ZX0sIFxcXCIkezM6ZG9jU3RyaW5nfVxcXCIpJDBcIixcbiAgICAgICAgXCJuYW1lXCI6IFwibmV3U2xvdFwiLFxuICAgICAgICBcInNjb3BlXCI6IFwiaW9cIixcbiAgICAgICAgXCJ0YWJUcmlnZ2VyXCI6IFwibnNcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImNvbnRlbnRcIjogXCIkezE6bmFtZX0gOj0gT2JqZWN0IGNsb25lIGRvKFxcblxcdCQwXFxuKVwiLFxuICAgICAgICBcIm5hbWVcIjogXCJPYmplY3QgY2xvbmUgZG9cIixcbiAgICAgICAgXCJzY29wZVwiOiBcImlvXCIsXG4gICAgICAgIFwidGFiVHJpZ2dlclwiOiBcIm9jZG9cIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcImNvbnRlbnRcIjogXCJ0ZXN0JHsxOlNvbWVGZWF0dXJlfSA6PSBtZXRob2QoXFxuXFx0JDBcXG4pXCIsXG4gICAgICAgIFwibmFtZVwiOiBcInRlc3RNZXRob2RcIixcbiAgICAgICAgXCJzY29wZVwiOiBcImlvXCIsXG4gICAgICAgIFwidGFiVHJpZ2dlclwiOiBcInRzXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgXCJjb250ZW50XCI6IFwiJHsxOlNvbWV0aGluZ31UZXN0IDo9ICR7MjpVbml0VGVzdH0gY2xvbmUgZG8oXFxuXFx0JDBcXG4pXCIsXG4gICAgICAgIFwibmFtZVwiOiBcIlVuaXRUZXN0XCIsXG4gICAgICAgIFwic2NvcGVcIjogXCJpb1wiLFxuICAgICAgICBcInRhYlRyaWdnZXJcIjogXCJ1dFwiXG4gICAgfVxuXTtcbmV4cG9ydHMuc2NvcGUgPSBcImlvXCI7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=