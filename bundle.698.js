(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[698],{

/***/ 10698:
/***/ ((module) => {

module.exports = `# else
snippet else
	else
		\${1:/* statements */}
# elseif
snippet elseif
	elseif \${1:/* condition */} then
		\${2:/* statements */}
# if
snippet if
	if \${1:/* condition */} then
		\${2:/* statements */}
	endif
# instrument block
snippet instr
	instr \${1:name}
		\${2:/* statements */}
	endin
# i-time while loop
snippet iwhile
	i\${1:Index} = \${2:0}
	while i\${1:Index} < \${3:/* count */} do
		\${4:/* statements */}
		i\${1:Index} += 1
	od
# k-rate while loop
snippet kwhile
	k\${1:Index} = \${2:0}
	while k\${1:Index} < \${3:/* count */} do
		\${4:/* statements */}
		k\${1:Index} += 1
	od
# opcode
snippet opcode
	opcode \${1:name}, \${2:/* output types */ 0}, \${3:/* input types */ 0}
		\${4:/* statements */}
	endop
# until loop
snippet until
	until \${1:/* condition */} do
		\${2:/* statements */}
	od
# while loop
snippet while
	while \${1:/* condition */} do
		\${2:/* statements */}
	od
`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjY5OC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsS0FBSztBQUNMO0FBQ0E7QUFDQSxPQUFPLG1CQUFtQjtBQUMxQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLLFNBQVMsS0FBSztBQUNuQixXQUFXLFNBQVMsS0FBSyxlQUFlO0FBQ3hDLEtBQUs7QUFDTCxNQUFNLFNBQVM7QUFDZjtBQUNBO0FBQ0E7QUFDQSxLQUFLLFNBQVMsS0FBSztBQUNuQixXQUFXLFNBQVMsS0FBSyxlQUFlO0FBQ3hDLEtBQUs7QUFDTCxNQUFNLFNBQVM7QUFDZjtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU8sS0FBSyx1QkFBdUIsS0FBSztBQUNuRCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBVSxtQkFBbUI7QUFDN0IsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVUsbUJBQW1CO0FBQzdCLEtBQUs7QUFDTDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvc25pcHBldHMvY3NvdW5kX29yY2hlc3RyYS5zbmlwcGV0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGAjIGVsc2VcbnNuaXBwZXQgZWxzZVxuXHRlbHNlXG5cdFx0XFwkezE6Lyogc3RhdGVtZW50cyAqL31cbiMgZWxzZWlmXG5zbmlwcGV0IGVsc2VpZlxuXHRlbHNlaWYgXFwkezE6LyogY29uZGl0aW9uICovfSB0aGVuXG5cdFx0XFwkezI6Lyogc3RhdGVtZW50cyAqL31cbiMgaWZcbnNuaXBwZXQgaWZcblx0aWYgXFwkezE6LyogY29uZGl0aW9uICovfSB0aGVuXG5cdFx0XFwkezI6Lyogc3RhdGVtZW50cyAqL31cblx0ZW5kaWZcbiMgaW5zdHJ1bWVudCBibG9ja1xuc25pcHBldCBpbnN0clxuXHRpbnN0ciBcXCR7MTpuYW1lfVxuXHRcdFxcJHsyOi8qIHN0YXRlbWVudHMgKi99XG5cdGVuZGluXG4jIGktdGltZSB3aGlsZSBsb29wXG5zbmlwcGV0IGl3aGlsZVxuXHRpXFwkezE6SW5kZXh9ID0gXFwkezI6MH1cblx0d2hpbGUgaVxcJHsxOkluZGV4fSA8IFxcJHszOi8qIGNvdW50ICovfSBkb1xuXHRcdFxcJHs0Oi8qIHN0YXRlbWVudHMgKi99XG5cdFx0aVxcJHsxOkluZGV4fSArPSAxXG5cdG9kXG4jIGstcmF0ZSB3aGlsZSBsb29wXG5zbmlwcGV0IGt3aGlsZVxuXHRrXFwkezE6SW5kZXh9ID0gXFwkezI6MH1cblx0d2hpbGUga1xcJHsxOkluZGV4fSA8IFxcJHszOi8qIGNvdW50ICovfSBkb1xuXHRcdFxcJHs0Oi8qIHN0YXRlbWVudHMgKi99XG5cdFx0a1xcJHsxOkluZGV4fSArPSAxXG5cdG9kXG4jIG9wY29kZVxuc25pcHBldCBvcGNvZGVcblx0b3Bjb2RlIFxcJHsxOm5hbWV9LCBcXCR7MjovKiBvdXRwdXQgdHlwZXMgKi8gMH0sIFxcJHszOi8qIGlucHV0IHR5cGVzICovIDB9XG5cdFx0XFwkezQ6Lyogc3RhdGVtZW50cyAqL31cblx0ZW5kb3BcbiMgdW50aWwgbG9vcFxuc25pcHBldCB1bnRpbFxuXHR1bnRpbCBcXCR7MTovKiBjb25kaXRpb24gKi99IGRvXG5cdFx0XFwkezI6Lyogc3RhdGVtZW50cyAqL31cblx0b2RcbiMgd2hpbGUgbG9vcFxuc25pcHBldCB3aGlsZVxuXHR3aGlsZSBcXCR7MTovKiBjb25kaXRpb24gKi99IGRvXG5cdFx0XFwkezI6Lyogc3RhdGVtZW50cyAqL31cblx0b2RcbmA7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=