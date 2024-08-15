(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4879,5511],{

/***/ 14879:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(45511);
exports.scope = "erlang";


/***/ }),

/***/ 45511:
/***/ ((module) => {

module.exports = `# module and export all
snippet mod
	-module(\${1:\`Filename('', 'my')\`}).
	
	-compile([export_all]).
	
	start() ->
	    \${2}
	
	stop() ->
	    ok.
# define directive
snippet def
	-define(\${1:macro}, \${2:body}).\${3}
# export directive
snippet exp
	-export([\${1:function}/\${2:arity}]).
# include directive
snippet inc
	-include("\${1:file}").\${2}
# behavior directive
snippet beh
	-behaviour(\${1:behaviour}).\${2}
# if expression
snippet if
	if
	    \${1:guard} ->
	        \${2:body}
	end
# case expression
snippet case
	case \${1:expression} of
	    \${2:pattern} ->
	        \${3:body};
	end
# anonymous function
snippet fun
	fun (\${1:Parameters}) -> \${2:body} end\${3}
# try...catch
snippet try
	try
	    \${1}
	catch
	    \${2:_:_} -> \${3:got_some_exception}
	end
# record directive
snippet rec
	-record(\${1:record}, {
	    \${2:field}=\${3:value}}).\${4}
# todo comment
snippet todo
	%% TODO: \${1}
## Snippets below (starting with '%') are in EDoc format.
## See http://www.erlang.org/doc/apps/edoc/chapter.html#id56887 for more details
# doc comment
snippet %d
	%% @doc \${1}
# end of doc comment
snippet %e
	%% @end
# specification comment
snippet %s
	%% @spec \${1}
# private function marker
snippet %p
	%% @private
# OTP application
snippet application
	-module(\${1:\`Filename('', 'my')\`}).

	-behaviour(application).

	-export([start/2, stop/1]).

	start(_Type, _StartArgs) ->
	    case \${2:root_supervisor}:start_link() of
	        {ok, Pid} ->
	            {ok, Pid};
	        Other ->
		          {error, Other}
	    end.

	stop(_State) ->
	    ok.	
# OTP supervisor
snippet supervisor
	-module(\${1:\`Filename('', 'my')\`}).

	-behaviour(supervisor).

	%% API
	-export([start_link/0]).

	%% Supervisor callbacks
	-export([init/1]).

	-define(SERVER, ?MODULE).

	start_link() ->
	    supervisor:start_link({local, ?SERVER}, ?MODULE, []).

	init([]) ->
	    Server = {\${2:my_server}, {\$2, start_link, []},
	      permanent, 2000, worker, [\$2]},
	    Children = [Server],
	    RestartStrategy = {one_for_one, 0, 1},
	    {ok, {RestartStrategy, Children}}.
# OTP gen_server
snippet gen_server
	-module(\${1:\`Filename('', 'my')\`}).

	-behaviour(gen_server).

	%% API
	-export([
	         start_link/0
	        ]).

	%% gen_server callbacks
	-export([init/1, handle_call/3, handle_cast/2, handle_info/2,
	         terminate/2, code_change/3]).

	-define(SERVER, ?MODULE).

	-record(state, {}).

	%%%===================================================================
	%%% API
	%%%===================================================================

	start_link() ->
	    gen_server:start_link({local, ?SERVER}, ?MODULE, [], []).

	%%%===================================================================
	%%% gen_server callbacks
	%%%===================================================================

	init([]) ->
	    {ok, #state{}}.

	handle_call(_Request, _From, State) ->
	    Reply = ok,
	    {reply, Reply, State}.

	handle_cast(_Msg, State) ->
	    {noreply, State}.

	handle_info(_Info, State) ->
	    {noreply, State}.

	terminate(_Reason, _State) ->
	    ok.

	code_change(_OldVsn, State, _Extra) ->
	    {ok, State}.

	%%%===================================================================
	%%% Internal functions
	%%%===================================================================

`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjQ4NzkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsZ0RBQWtEO0FBQ2xELGFBQWE7Ozs7Ozs7O0FDSGI7QUFDQTtBQUNBLFlBQVkseUJBQXlCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVEsS0FBSyxPQUFPLEtBQUs7QUFDckM7QUFDQTtBQUNBLGFBQWEsV0FBVyxJQUFJLFFBQVE7QUFDcEM7QUFDQTtBQUNBLGNBQWMsT0FBTyxNQUFNO0FBQzNCO0FBQ0E7QUFDQSxlQUFlLFlBQVksS0FBSztBQUNoQztBQUNBO0FBQ0E7QUFDQSxRQUFRLFNBQVM7QUFDakIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLFNBQVMsY0FBYztBQUN2QixRQUFRLFdBQVc7QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLFNBQVMsYUFBYSxRQUFRLFFBQVEsTUFBTTtBQUM1QztBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRLE9BQU8sTUFBTTtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxZQUFZLFNBQVM7QUFDckIsUUFBUSxRQUFRLElBQUksU0FBUyxLQUFLO0FBQ2xDO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSx5QkFBeUI7O0FBRXJDOztBQUVBOztBQUVBO0FBQ0EsYUFBYSxrQkFBa0I7QUFDL0IsVUFBVSxTQUFTO0FBQ25CLGNBQWM7QUFDZDtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVkseUJBQXlCOztBQUVyQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSw0QkFBNEIsZUFBZTs7QUFFM0M7QUFDQSxlQUFlLEdBQUcsWUFBWSxHQUFHLG9CQUFvQjtBQUNyRCxzQ0FBc0M7QUFDdEM7QUFDQSx3QkFBd0Isa0JBQWtCO0FBQzFDLE1BQU0sS0FBSywyQkFBMkI7QUFDdEM7QUFDQTtBQUNBLFlBQVkseUJBQXlCOztBQUVyQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsa0JBQWtCOztBQUVsQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0QkFBNEIsZUFBZTs7QUFFM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTSxhQUFhOztBQUVuQjtBQUNBO0FBQ0EsTUFBTSxvQkFBb0I7O0FBRTFCO0FBQ0EsTUFBTSxlQUFlOztBQUVyQjtBQUNBLE1BQU0sZUFBZTs7QUFFckI7QUFDQTs7QUFFQTtBQUNBLE1BQU0sVUFBVTs7QUFFaEI7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvc25pcHBldHMvZXJsYW5nLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL3NuaXBwZXRzL2VybGFuZy5zbmlwcGV0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5zbmlwcGV0VGV4dCA9IHJlcXVpcmUoXCIuL2VybGFuZy5zbmlwcGV0c1wiKTtcbmV4cG9ydHMuc2NvcGUgPSBcImVybGFuZ1wiO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBgIyBtb2R1bGUgYW5kIGV4cG9ydCBhbGxcbnNuaXBwZXQgbW9kXG5cdC1tb2R1bGUoXFwkezE6XFxgRmlsZW5hbWUoJycsICdteScpXFxgfSkuXG5cdFxuXHQtY29tcGlsZShbZXhwb3J0X2FsbF0pLlxuXHRcblx0c3RhcnQoKSAtPlxuXHQgICAgXFwkezJ9XG5cdFxuXHRzdG9wKCkgLT5cblx0ICAgIG9rLlxuIyBkZWZpbmUgZGlyZWN0aXZlXG5zbmlwcGV0IGRlZlxuXHQtZGVmaW5lKFxcJHsxOm1hY3JvfSwgXFwkezI6Ym9keX0pLlxcJHszfVxuIyBleHBvcnQgZGlyZWN0aXZlXG5zbmlwcGV0IGV4cFxuXHQtZXhwb3J0KFtcXCR7MTpmdW5jdGlvbn0vXFwkezI6YXJpdHl9XSkuXG4jIGluY2x1ZGUgZGlyZWN0aXZlXG5zbmlwcGV0IGluY1xuXHQtaW5jbHVkZShcIlxcJHsxOmZpbGV9XCIpLlxcJHsyfVxuIyBiZWhhdmlvciBkaXJlY3RpdmVcbnNuaXBwZXQgYmVoXG5cdC1iZWhhdmlvdXIoXFwkezE6YmVoYXZpb3VyfSkuXFwkezJ9XG4jIGlmIGV4cHJlc3Npb25cbnNuaXBwZXQgaWZcblx0aWZcblx0ICAgIFxcJHsxOmd1YXJkfSAtPlxuXHQgICAgICAgIFxcJHsyOmJvZHl9XG5cdGVuZFxuIyBjYXNlIGV4cHJlc3Npb25cbnNuaXBwZXQgY2FzZVxuXHRjYXNlIFxcJHsxOmV4cHJlc3Npb259IG9mXG5cdCAgICBcXCR7MjpwYXR0ZXJufSAtPlxuXHQgICAgICAgIFxcJHszOmJvZHl9O1xuXHRlbmRcbiMgYW5vbnltb3VzIGZ1bmN0aW9uXG5zbmlwcGV0IGZ1blxuXHRmdW4gKFxcJHsxOlBhcmFtZXRlcnN9KSAtPiBcXCR7Mjpib2R5fSBlbmRcXCR7M31cbiMgdHJ5Li4uY2F0Y2hcbnNuaXBwZXQgdHJ5XG5cdHRyeVxuXHQgICAgXFwkezF9XG5cdGNhdGNoXG5cdCAgICBcXCR7MjpfOl99IC0+IFxcJHszOmdvdF9zb21lX2V4Y2VwdGlvbn1cblx0ZW5kXG4jIHJlY29yZCBkaXJlY3RpdmVcbnNuaXBwZXQgcmVjXG5cdC1yZWNvcmQoXFwkezE6cmVjb3JkfSwge1xuXHQgICAgXFwkezI6ZmllbGR9PVxcJHszOnZhbHVlfX0pLlxcJHs0fVxuIyB0b2RvIGNvbW1lbnRcbnNuaXBwZXQgdG9kb1xuXHQlJSBUT0RPOiBcXCR7MX1cbiMjIFNuaXBwZXRzIGJlbG93IChzdGFydGluZyB3aXRoICclJykgYXJlIGluIEVEb2MgZm9ybWF0LlxuIyMgU2VlIGh0dHA6Ly93d3cuZXJsYW5nLm9yZy9kb2MvYXBwcy9lZG9jL2NoYXB0ZXIuaHRtbCNpZDU2ODg3IGZvciBtb3JlIGRldGFpbHNcbiMgZG9jIGNvbW1lbnRcbnNuaXBwZXQgJWRcblx0JSUgQGRvYyBcXCR7MX1cbiMgZW5kIG9mIGRvYyBjb21tZW50XG5zbmlwcGV0ICVlXG5cdCUlIEBlbmRcbiMgc3BlY2lmaWNhdGlvbiBjb21tZW50XG5zbmlwcGV0ICVzXG5cdCUlIEBzcGVjIFxcJHsxfVxuIyBwcml2YXRlIGZ1bmN0aW9uIG1hcmtlclxuc25pcHBldCAlcFxuXHQlJSBAcHJpdmF0ZVxuIyBPVFAgYXBwbGljYXRpb25cbnNuaXBwZXQgYXBwbGljYXRpb25cblx0LW1vZHVsZShcXCR7MTpcXGBGaWxlbmFtZSgnJywgJ215JylcXGB9KS5cblxuXHQtYmVoYXZpb3VyKGFwcGxpY2F0aW9uKS5cblxuXHQtZXhwb3J0KFtzdGFydC8yLCBzdG9wLzFdKS5cblxuXHRzdGFydChfVHlwZSwgX1N0YXJ0QXJncykgLT5cblx0ICAgIGNhc2UgXFwkezI6cm9vdF9zdXBlcnZpc29yfTpzdGFydF9saW5rKCkgb2Zcblx0ICAgICAgICB7b2ssIFBpZH0gLT5cblx0ICAgICAgICAgICAge29rLCBQaWR9O1xuXHQgICAgICAgIE90aGVyIC0+XG5cdFx0ICAgICAgICAgIHtlcnJvciwgT3RoZXJ9XG5cdCAgICBlbmQuXG5cblx0c3RvcChfU3RhdGUpIC0+XG5cdCAgICBvay5cdFxuIyBPVFAgc3VwZXJ2aXNvclxuc25pcHBldCBzdXBlcnZpc29yXG5cdC1tb2R1bGUoXFwkezE6XFxgRmlsZW5hbWUoJycsICdteScpXFxgfSkuXG5cblx0LWJlaGF2aW91cihzdXBlcnZpc29yKS5cblxuXHQlJSBBUElcblx0LWV4cG9ydChbc3RhcnRfbGluay8wXSkuXG5cblx0JSUgU3VwZXJ2aXNvciBjYWxsYmFja3Ncblx0LWV4cG9ydChbaW5pdC8xXSkuXG5cblx0LWRlZmluZShTRVJWRVIsID9NT0RVTEUpLlxuXG5cdHN0YXJ0X2xpbmsoKSAtPlxuXHQgICAgc3VwZXJ2aXNvcjpzdGFydF9saW5rKHtsb2NhbCwgP1NFUlZFUn0sID9NT0RVTEUsIFtdKS5cblxuXHRpbml0KFtdKSAtPlxuXHQgICAgU2VydmVyID0ge1xcJHsyOm15X3NlcnZlcn0sIHtcXCQyLCBzdGFydF9saW5rLCBbXX0sXG5cdCAgICAgIHBlcm1hbmVudCwgMjAwMCwgd29ya2VyLCBbXFwkMl19LFxuXHQgICAgQ2hpbGRyZW4gPSBbU2VydmVyXSxcblx0ICAgIFJlc3RhcnRTdHJhdGVneSA9IHtvbmVfZm9yX29uZSwgMCwgMX0sXG5cdCAgICB7b2ssIHtSZXN0YXJ0U3RyYXRlZ3ksIENoaWxkcmVufX0uXG4jIE9UUCBnZW5fc2VydmVyXG5zbmlwcGV0IGdlbl9zZXJ2ZXJcblx0LW1vZHVsZShcXCR7MTpcXGBGaWxlbmFtZSgnJywgJ215JylcXGB9KS5cblxuXHQtYmVoYXZpb3VyKGdlbl9zZXJ2ZXIpLlxuXG5cdCUlIEFQSVxuXHQtZXhwb3J0KFtcblx0ICAgICAgICAgc3RhcnRfbGluay8wXG5cdCAgICAgICAgXSkuXG5cblx0JSUgZ2VuX3NlcnZlciBjYWxsYmFja3Ncblx0LWV4cG9ydChbaW5pdC8xLCBoYW5kbGVfY2FsbC8zLCBoYW5kbGVfY2FzdC8yLCBoYW5kbGVfaW5mby8yLFxuXHQgICAgICAgICB0ZXJtaW5hdGUvMiwgY29kZV9jaGFuZ2UvM10pLlxuXG5cdC1kZWZpbmUoU0VSVkVSLCA/TU9EVUxFKS5cblxuXHQtcmVjb3JkKHN0YXRlLCB7fSkuXG5cblx0JSUlPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQlJSUgQVBJXG5cdCUlJT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHRzdGFydF9saW5rKCkgLT5cblx0ICAgIGdlbl9zZXJ2ZXI6c3RhcnRfbGluayh7bG9jYWwsID9TRVJWRVJ9LCA/TU9EVUxFLCBbXSwgW10pLlxuXG5cdCUlJT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0JSUlIGdlbl9zZXJ2ZXIgY2FsbGJhY2tzXG5cdCUlJT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHRpbml0KFtdKSAtPlxuXHQgICAge29rLCAjc3RhdGV7fX0uXG5cblx0aGFuZGxlX2NhbGwoX1JlcXVlc3QsIF9Gcm9tLCBTdGF0ZSkgLT5cblx0ICAgIFJlcGx5ID0gb2ssXG5cdCAgICB7cmVwbHksIFJlcGx5LCBTdGF0ZX0uXG5cblx0aGFuZGxlX2Nhc3QoX01zZywgU3RhdGUpIC0+XG5cdCAgICB7bm9yZXBseSwgU3RhdGV9LlxuXG5cdGhhbmRsZV9pbmZvKF9JbmZvLCBTdGF0ZSkgLT5cblx0ICAgIHtub3JlcGx5LCBTdGF0ZX0uXG5cblx0dGVybWluYXRlKF9SZWFzb24sIF9TdGF0ZSkgLT5cblx0ICAgIG9rLlxuXG5cdGNvZGVfY2hhbmdlKF9PbGRWc24sIFN0YXRlLCBfRXh0cmEpIC0+XG5cdCAgICB7b2ssIFN0YXRlfS5cblxuXHQlJSU9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdCUlJSBJbnRlcm5hbCBmdW5jdGlvbnNcblx0JSUlPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5gO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9