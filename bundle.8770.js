(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[8770,4257],{

/***/ 46389:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(64257);
exports.scope = "actionscript";


/***/ }),

/***/ 64257:
/***/ ((module) => {

module.exports = `snippet main
	package {
		import flash.display.*;
		import flash.Events.*;
	
		public class Main extends Sprite {
			public function Main (	) {
				trace("start");
				stage.scaleMode = StageScaleMode.NO_SCALE;
				stage.addEventListener(Event.RESIZE, resizeListener);
			}
	
			private function resizeListener (e:Event):void {
				trace("The application window changed size!");
				trace("New width:  " + stage.stageWidth);
				trace("New height: " + stage.stageHeight);
			}
	
		}
	
	}
snippet class
	\${1:public|internal} class \${2:name} \${3:extends } {
		public function \$2 (	) {
			("start");
		}
	}
snippet all
	package name {

		\${1:public|internal|final} class \${2:name} \${3:extends } {
			private|public| static const FOO = "abc";
			private|public| static var BAR = "abc";

			// class initializer - no JIT !! one time setup
			if Cababilities.os == "Linux|MacOS" {
				FOO = "other";
			}

			// constructor:
			public function \$2 (	){
				super2();
				trace("start");
			}
			public function name (a, b...){
				super.name(..);
				lable:break
			}
		}
	}

	function A(){
		// A can only be accessed within this file
	}
snippet switch
	switch(\${1}){
		case \${2}:
			\${3}
		break;
		default:
	}
snippet case
		case \${1}:
			\${2}
		break;
snippet package
	package \${1:package}{
		\${2}
	}
snippet wh
	while \${1:cond}{
		\${2}
	}
snippet do
	do {
		\${2}
	} while (\${1:cond})
snippet while
	while \${1:cond}{
		\${2}
	}
snippet for enumerate names
	for (\${1:var} in \${2:object}){
		\${3}
	}
snippet for enumerate values
	for each (\${1:var} in \${2:object}){
		\${3}
	}
snippet get_set
	function get \${1:name} {
		return \${2}
	}
	function set \$1 (newValue) {
		\${3}
	}
snippet interface
	interface name {
		function method(\${1}):\${2:returntype};
	}
snippet try
	try {
		\${1}
	} catch (error:ErrorType) {
		\${2}
	} finally {
		\${3}
	}
# For Loop (same as c.snippet)
snippet for for (..) {..}
	for (\${2:i} = 0; \$2 < \${1:count}; \$2\${3:++}) {
		\${4:/* code */}
	}
# Custom For Loop
snippet forr
	for (\${1:i} = \${2:0}; \${3:\$1 < 10}; \$1\${4:++}) {
		\${5:/* code */}
	}
# If Condition
snippet if
	if (\${1:/* condition */}) {
		\${2:/* code */}
	}
snippet el
	else {
		\${1}
	}
# Ternary conditional
snippet t
	\${1:/* condition */} ? \${2:a} : \${3:b}
snippet fun
	function \${1:function_name}(\${2})\${3}
	{
		\${4:/* code */}
	}
# FlxSprite (usefull when using the flixel library)
snippet FlxSprite
	package
	{
		import org.flixel.*

		public class \${1:ClassName} extends \${2:FlxSprite}
		{
			public function \$1(\${3: X:Number, Y:Number}):void
			{
				super(X,Y);
				\${4: //code...}
			}

			override public function update():void
			{
				super.update();
				\${5: //code...}
			}
		}
	}

`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjg3NzAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsZ0RBQXdEO0FBQ3hELGFBQWE7Ozs7Ozs7O0FDSGI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLG1CQUFtQixTQUFTLFFBQVEsR0FBRztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSyx5QkFBeUIsU0FBUyxRQUFRLEdBQUc7QUFDbEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxFQUFFO0FBQ2IsVUFBVSxFQUFFO0FBQ1osTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxFQUFFO0FBQ1osTUFBTTtBQUNOO0FBQ0E7QUFDQSxZQUFZO0FBQ1osS0FBSztBQUNMO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHLFVBQVUsT0FBTztBQUNwQjtBQUNBLFVBQVU7QUFDVixLQUFLO0FBQ0w7QUFDQTtBQUNBLFNBQVMsT0FBTyxNQUFNLFNBQVM7QUFDL0IsS0FBSztBQUNMO0FBQ0E7QUFDQSxjQUFjLE9BQU8sTUFBTSxTQUFTO0FBQ3BDLEtBQUs7QUFDTDtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLFlBQVk7QUFDWjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixFQUFFLEtBQUs7QUFDNUI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSCxLQUFLO0FBQ0wsR0FBRztBQUNILEtBQUs7QUFDTDtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCLFNBQVMsS0FBSyxLQUFLLFNBQVMsVUFBVSxNQUFNLEtBQUs7QUFDakQsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVMsS0FBSyxLQUFLLE1BQU0sR0FBRyxhQUFhLE1BQU0sS0FBSztBQUNwRCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsUUFBUSxrQkFBa0I7QUFDMUIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxJQUFJLG1CQUFtQixLQUFLLEtBQUssS0FBSztBQUN0QztBQUNBLGFBQWEsZ0JBQWdCLElBQUksRUFBRSxJQUFJO0FBQ3ZDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsYUFBYSxXQUFXO0FBQzFDO0FBQ0EsMEJBQTBCLHNCQUFzQjtBQUNoRDtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9zbmlwcGV0cy9hY3Rpb25zY3JpcHQuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvc25pcHBldHMvYWN0aW9uc2NyaXB0LnNuaXBwZXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLnNuaXBwZXRUZXh0ID0gcmVxdWlyZShcIi4vYWN0aW9uc2NyaXB0LnNuaXBwZXRzXCIpO1xuZXhwb3J0cy5zY29wZSA9IFwiYWN0aW9uc2NyaXB0XCI7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGBzbmlwcGV0IG1haW5cblx0cGFja2FnZSB7XG5cdFx0aW1wb3J0IGZsYXNoLmRpc3BsYXkuKjtcblx0XHRpbXBvcnQgZmxhc2guRXZlbnRzLio7XG5cdFxuXHRcdHB1YmxpYyBjbGFzcyBNYWluIGV4dGVuZHMgU3ByaXRlIHtcblx0XHRcdHB1YmxpYyBmdW5jdGlvbiBNYWluIChcdCkge1xuXHRcdFx0XHR0cmFjZShcInN0YXJ0XCIpO1xuXHRcdFx0XHRzdGFnZS5zY2FsZU1vZGUgPSBTdGFnZVNjYWxlTW9kZS5OT19TQ0FMRTtcblx0XHRcdFx0c3RhZ2UuYWRkRXZlbnRMaXN0ZW5lcihFdmVudC5SRVNJWkUsIHJlc2l6ZUxpc3RlbmVyKTtcblx0XHRcdH1cblx0XG5cdFx0XHRwcml2YXRlIGZ1bmN0aW9uIHJlc2l6ZUxpc3RlbmVyIChlOkV2ZW50KTp2b2lkIHtcblx0XHRcdFx0dHJhY2UoXCJUaGUgYXBwbGljYXRpb24gd2luZG93IGNoYW5nZWQgc2l6ZSFcIik7XG5cdFx0XHRcdHRyYWNlKFwiTmV3IHdpZHRoOiAgXCIgKyBzdGFnZS5zdGFnZVdpZHRoKTtcblx0XHRcdFx0dHJhY2UoXCJOZXcgaGVpZ2h0OiBcIiArIHN0YWdlLnN0YWdlSGVpZ2h0KTtcblx0XHRcdH1cblx0XG5cdFx0fVxuXHRcblx0fVxuc25pcHBldCBjbGFzc1xuXHRcXCR7MTpwdWJsaWN8aW50ZXJuYWx9IGNsYXNzIFxcJHsyOm5hbWV9IFxcJHszOmV4dGVuZHMgfSB7XG5cdFx0cHVibGljIGZ1bmN0aW9uIFxcJDIgKFx0KSB7XG5cdFx0XHQoXCJzdGFydFwiKTtcblx0XHR9XG5cdH1cbnNuaXBwZXQgYWxsXG5cdHBhY2thZ2UgbmFtZSB7XG5cblx0XHRcXCR7MTpwdWJsaWN8aW50ZXJuYWx8ZmluYWx9IGNsYXNzIFxcJHsyOm5hbWV9IFxcJHszOmV4dGVuZHMgfSB7XG5cdFx0XHRwcml2YXRlfHB1YmxpY3wgc3RhdGljIGNvbnN0IEZPTyA9IFwiYWJjXCI7XG5cdFx0XHRwcml2YXRlfHB1YmxpY3wgc3RhdGljIHZhciBCQVIgPSBcImFiY1wiO1xuXG5cdFx0XHQvLyBjbGFzcyBpbml0aWFsaXplciAtIG5vIEpJVCAhISBvbmUgdGltZSBzZXR1cFxuXHRcdFx0aWYgQ2FiYWJpbGl0aWVzLm9zID09IFwiTGludXh8TWFjT1NcIiB7XG5cdFx0XHRcdEZPTyA9IFwib3RoZXJcIjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gY29uc3RydWN0b3I6XG5cdFx0XHRwdWJsaWMgZnVuY3Rpb24gXFwkMiAoXHQpe1xuXHRcdFx0XHRzdXBlcjIoKTtcblx0XHRcdFx0dHJhY2UoXCJzdGFydFwiKTtcblx0XHRcdH1cblx0XHRcdHB1YmxpYyBmdW5jdGlvbiBuYW1lIChhLCBiLi4uKXtcblx0XHRcdFx0c3VwZXIubmFtZSguLik7XG5cdFx0XHRcdGxhYmxlOmJyZWFrXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gQSgpe1xuXHRcdC8vIEEgY2FuIG9ubHkgYmUgYWNjZXNzZWQgd2l0aGluIHRoaXMgZmlsZVxuXHR9XG5zbmlwcGV0IHN3aXRjaFxuXHRzd2l0Y2goXFwkezF9KXtcblx0XHRjYXNlIFxcJHsyfTpcblx0XHRcdFxcJHszfVxuXHRcdGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdH1cbnNuaXBwZXQgY2FzZVxuXHRcdGNhc2UgXFwkezF9OlxuXHRcdFx0XFwkezJ9XG5cdFx0YnJlYWs7XG5zbmlwcGV0IHBhY2thZ2Vcblx0cGFja2FnZSBcXCR7MTpwYWNrYWdlfXtcblx0XHRcXCR7Mn1cblx0fVxuc25pcHBldCB3aFxuXHR3aGlsZSBcXCR7MTpjb25kfXtcblx0XHRcXCR7Mn1cblx0fVxuc25pcHBldCBkb1xuXHRkbyB7XG5cdFx0XFwkezJ9XG5cdH0gd2hpbGUgKFxcJHsxOmNvbmR9KVxuc25pcHBldCB3aGlsZVxuXHR3aGlsZSBcXCR7MTpjb25kfXtcblx0XHRcXCR7Mn1cblx0fVxuc25pcHBldCBmb3IgZW51bWVyYXRlIG5hbWVzXG5cdGZvciAoXFwkezE6dmFyfSBpbiBcXCR7MjpvYmplY3R9KXtcblx0XHRcXCR7M31cblx0fVxuc25pcHBldCBmb3IgZW51bWVyYXRlIHZhbHVlc1xuXHRmb3IgZWFjaCAoXFwkezE6dmFyfSBpbiBcXCR7MjpvYmplY3R9KXtcblx0XHRcXCR7M31cblx0fVxuc25pcHBldCBnZXRfc2V0XG5cdGZ1bmN0aW9uIGdldCBcXCR7MTpuYW1lfSB7XG5cdFx0cmV0dXJuIFxcJHsyfVxuXHR9XG5cdGZ1bmN0aW9uIHNldCBcXCQxIChuZXdWYWx1ZSkge1xuXHRcdFxcJHszfVxuXHR9XG5zbmlwcGV0IGludGVyZmFjZVxuXHRpbnRlcmZhY2UgbmFtZSB7XG5cdFx0ZnVuY3Rpb24gbWV0aG9kKFxcJHsxfSk6XFwkezI6cmV0dXJudHlwZX07XG5cdH1cbnNuaXBwZXQgdHJ5XG5cdHRyeSB7XG5cdFx0XFwkezF9XG5cdH0gY2F0Y2ggKGVycm9yOkVycm9yVHlwZSkge1xuXHRcdFxcJHsyfVxuXHR9IGZpbmFsbHkge1xuXHRcdFxcJHszfVxuXHR9XG4jIEZvciBMb29wIChzYW1lIGFzIGMuc25pcHBldClcbnNuaXBwZXQgZm9yIGZvciAoLi4pIHsuLn1cblx0Zm9yIChcXCR7MjppfSA9IDA7IFxcJDIgPCBcXCR7MTpjb3VudH07IFxcJDJcXCR7MzorK30pIHtcblx0XHRcXCR7NDovKiBjb2RlICovfVxuXHR9XG4jIEN1c3RvbSBGb3IgTG9vcFxuc25pcHBldCBmb3JyXG5cdGZvciAoXFwkezE6aX0gPSBcXCR7MjowfTsgXFwkezM6XFwkMSA8IDEwfTsgXFwkMVxcJHs0OisrfSkge1xuXHRcdFxcJHs1Oi8qIGNvZGUgKi99XG5cdH1cbiMgSWYgQ29uZGl0aW9uXG5zbmlwcGV0IGlmXG5cdGlmIChcXCR7MTovKiBjb25kaXRpb24gKi99KSB7XG5cdFx0XFwkezI6LyogY29kZSAqL31cblx0fVxuc25pcHBldCBlbFxuXHRlbHNlIHtcblx0XHRcXCR7MX1cblx0fVxuIyBUZXJuYXJ5IGNvbmRpdGlvbmFsXG5zbmlwcGV0IHRcblx0XFwkezE6LyogY29uZGl0aW9uICovfSA/IFxcJHsyOmF9IDogXFwkezM6Yn1cbnNuaXBwZXQgZnVuXG5cdGZ1bmN0aW9uIFxcJHsxOmZ1bmN0aW9uX25hbWV9KFxcJHsyfSlcXCR7M31cblx0e1xuXHRcdFxcJHs0Oi8qIGNvZGUgKi99XG5cdH1cbiMgRmx4U3ByaXRlICh1c2VmdWxsIHdoZW4gdXNpbmcgdGhlIGZsaXhlbCBsaWJyYXJ5KVxuc25pcHBldCBGbHhTcHJpdGVcblx0cGFja2FnZVxuXHR7XG5cdFx0aW1wb3J0IG9yZy5mbGl4ZWwuKlxuXG5cdFx0cHVibGljIGNsYXNzIFxcJHsxOkNsYXNzTmFtZX0gZXh0ZW5kcyBcXCR7MjpGbHhTcHJpdGV9XG5cdFx0e1xuXHRcdFx0cHVibGljIGZ1bmN0aW9uIFxcJDEoXFwkezM6IFg6TnVtYmVyLCBZOk51bWJlcn0pOnZvaWRcblx0XHRcdHtcblx0XHRcdFx0c3VwZXIoWCxZKTtcblx0XHRcdFx0XFwkezQ6IC8vY29kZS4uLn1cblx0XHRcdH1cblxuXHRcdFx0b3ZlcnJpZGUgcHVibGljIGZ1bmN0aW9uIHVwZGF0ZSgpOnZvaWRcblx0XHRcdHtcblx0XHRcdFx0c3VwZXIudXBkYXRlKCk7XG5cdFx0XHRcdFxcJHs1OiAvL2NvZGUuLi59XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cbmA7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=