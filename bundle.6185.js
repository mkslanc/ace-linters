(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[6185,2989],{

/***/ 76185:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(62989);
exports.scope = "perl";


/***/ }),

/***/ 62989:
/***/ ((module) => {

module.exports = `# #!/usr/bin/perl
snippet #!
	#!/usr/bin/env perl

# Hash Pointer
snippet .
	 =>
# Function
snippet sub
	sub \${1:function_name} {
		\${2:#body ...}
	}
# Conditional
snippet if
	if (\${1}) {
		\${2:# body...}
	}
# Conditional if..else
snippet ife
	if (\${1}) {
		\${2:# body...}
	}
	else {
		\${3:# else...}
	}
# Conditional if..elsif..else
snippet ifee
	if (\${1}) {
		\${2:# body...}
	}
	elsif (\${3}) {
		\${4:# elsif...}
	}
	else {
		\${5:# else...}
	}
# Conditional One-line
snippet xif
	\${1:expression} if \${2:condition};\${3}
# Unless conditional
snippet unless
	unless (\${1}) {
		\${2:# body...}
	}
# Unless conditional One-line
snippet xunless
	\${1:expression} unless \${2:condition};\${3}
# Try/Except
snippet eval
	local \$@;
	eval {
		\${1:# do something risky...}
	};
	if (my \$e = \$@) {
		\${2:# handle failure...}
	}
# While Loop
snippet wh
	while (\${1}) {
		\${2:# body...}
	}
# While Loop One-line
snippet xwh
	\${1:expression} while \${2:condition};\${3}
# C-style For Loop
snippet cfor
	for (my \$\${2:var} = 0; \$\$2 < \${1:count}; \$\$2\${3:++}) {
		\${4:# body...}
	}
# For loop one-line
snippet xfor
	\${1:expression} for @\${2:array};\${3}
# Foreach Loop
snippet for
	foreach my \$\${1:x} (@\${2:array}) {
		\${3:# body...}
	}
# Foreach Loop One-line
snippet fore
	\${1:expression} foreach @\${2:array};\${3}
# Package
snippet package
	package \${1:\`substitute(Filename('', 'Page Title'), '^.', '\\u&', '')\`};

	\${2}

	1;

	__END__
# Package syntax perl >= 5.14
snippet packagev514
	package \${1:\`substitute(Filename('', 'Page Title'), '^.', '\\u&', '')\`} \${2:0.99};

	\${3}

	1;

	__END__
#moose
snippet moose
	use Moose;
	use namespace::autoclean;
	\${1:#}BEGIN {extends '\${2:ParentClass}'};

	\${3}
# parent
snippet parent
	use parent qw(\${1:Parent Class});
# Read File
snippet slurp
	my \$\${1:var} = do { local \$/; open my \$file, '<', "\${2:file}"; <\$file> };
	\${3}
# strict warnings
snippet strwar
	use strict;
	use warnings;
# older versioning with perlcritic bypass
snippet vers
	## no critic
	our \$VERSION = '\${1:version}';
	eval \$VERSION;
	## use critic
# new 'switch' like feature
snippet switch
	use feature 'switch';

# Anonymous subroutine
snippet asub
	sub {
	 	\${1:# body }
	}



# Begin block
snippet begin
	BEGIN {
		\${1:# begin body}
	}

# call package function with some parameter
snippet pkgmv
	__PACKAGE__->\${1:package_method}(\${2:var})

# call package function without a parameter
snippet pkgm
	__PACKAGE__->\${1:package_method}()

# call package "get_" function without a parameter
snippet pkget
	__PACKAGE__->get_\${1:package_method}()

# call package function with a parameter
snippet pkgetv
	__PACKAGE__->get_\${1:package_method}(\${2:var})

# complex regex
snippet qrx
	qr/
	     \${1:regex}
	/xms

#simpler regex
snippet qr/
	qr/\${1:regex}/x

#given
snippet given
	given (\$\${1:var}) {
		\${2:# cases}
		\${3:# default}
	}

# switch-like case
snippet when
	when (\${1:case}) {
		\${2:# body}
	}

# hash slice
snippet hslice
	@{ \${1:hash}  }{ \${2:array} }


# map
snippet map
	map {  \${2: body }    }  \${1: @array } ;



# Pod stub
snippet ppod
	=head1 NAME

	\${1:ClassName} - \${2:ShortDesc}

	=head1 SYNOPSIS

	  use \$1;

	  \${3:# synopsis...}

	=head1 DESCRIPTION

	\${4:# longer description...}


	=head1 INTERFACE


	=head1 DEPENDENCIES


	=head1 SEE ALSO


# Heading for a subroutine stub
snippet psub
	=head2 \${1:MethodName}

	\${2:Summary....}

# Heading for inline subroutine pod
snippet psubi
	=head2 \${1:MethodName}

	\${2:Summary...}


	=cut
# inline documented subroutine
snippet subpod
	=head2 \$1

	Summary of \$1

	=cut

	sub \${1:subroutine_name} {
		\${2:# body...}
	}
# Subroutine signature
snippet parg
	=over 2

	=item
	Arguments


	=over 3

	=item
	C<\${1:DataStructure}>

	  \${2:Sample}


	=back


	=item
	Return

	=over 3


	=item
	C<\${3:...return data}>


	=back


	=back



# Moose has
snippet has
	has \${1:attribute} => (
		is	    => '\${2:ro|rw}',
		isa 	=> '\${3:Str|Int|HashRef|ArrayRef|etc}',
		default => sub {
			\${4:defaultvalue}
		},
		\${5:# other attributes}
	);


# override
snippet override
	override \${1:attribute} => sub {
		\${2:# my \$self = shift;};
		\${3:# my (\$self, \$args) = @_;};
	};


# use test classes
snippet tuse
	use Test::More;
	use Test::Deep; # (); # uncomment to stop prototype errors
	use Test::Exception;

# local test lib
snippet tlib
	use lib qw{ ./t/lib };

#test methods
snippet tmeths
	\$ENV{TEST_METHOD} = '\${1:regex}';

# runtestclass
snippet trunner
	use \${1:test_class};
	\$1->runtests();

# Test::Class-style test
snippet tsub
	sub t\${1:number}_\${2:test_case} :Test(\${3:num_of_tests}) {
		my \$self = shift;
		\${4:#  body}

	}

# Test::Routine-style test
snippet trsub
	test \${1:test_name} => { description => '\${2:Description of test.}'} => sub {
		my (\$self) = @_;
		\${3:# test code}
	};

#prep test method
snippet tprep
	sub prep\${1:number}_\${2:test_case} :Test(startup) {
		my \$self = shift;
		\${4:#  body}
	}

# cause failures to print stack trace
snippet debug_trace
	use Carp; # 'verbose';
	# cloak "die"
	# warn "warning"
	\$SIG{'__DIE__'} = sub {
		require Carp; Carp::confess
	};

`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0EsTUFBTSxnQkFBZ0I7O0FBRXRCLE1BQU07OztBQUdOOzs7QUFHQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBLE1BQU0saUJBQWlCOzs7QUFHdkI7OztBQUdBOzs7O0FBSUE7QUFDQTtBQUNBLFFBQVEsYUFBYTtBQUNyQixnQkFBZ0IsUUFBUTtBQUN4QixjQUFjLCtCQUErQjtBQUM3QztBQUNBLE1BQU07QUFDTixHQUFHO0FBQ0gsS0FBSztBQUNMOzs7QUFHQTtBQUNBO0FBQ0EsYUFBYSxhQUFhO0FBQzFCLEtBQUs7QUFDTCxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixNQUFNO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQSxPQUFPLGFBQWEsTUFBTSxRQUFROztBQUVsQztBQUNBO0FBQ0EsUUFBUTtBQUNSOztBQUVBO0FBQ0E7QUFDQSxTQUFTLFNBQVMsSUFBSSxhQUFhLFNBQVMsZUFBZTtBQUMzRDtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBLFNBQVMsYUFBYSxLQUFLLG1CQUFtQix1QkFBdUIsR0FBRztBQUN4RTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsWUFBWSxTQUFTLElBQUksYUFBYTtBQUN0QztBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxPQUFPLFdBQVc7QUFDbEIsZ0JBQWdCO0FBQ2hCOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvc25pcHBldHMvcGVybC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9zbmlwcGV0cy9wZXJsLnNuaXBwZXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLnNuaXBwZXRUZXh0ID0gcmVxdWlyZShcIi4vcGVybC5zbmlwcGV0c1wiKTtcbmV4cG9ydHMuc2NvcGUgPSBcInBlcmxcIjtcbiIsIm1vZHVsZS5leHBvcnRzID0gYCMgIyEvdXNyL2Jpbi9wZXJsXG5zbmlwcGV0ICMhXG5cdCMhL3Vzci9iaW4vZW52IHBlcmxcblxuIyBIYXNoIFBvaW50ZXJcbnNuaXBwZXQgLlxuXHQgPT5cbiMgRnVuY3Rpb25cbnNuaXBwZXQgc3ViXG5cdHN1YiBcXCR7MTpmdW5jdGlvbl9uYW1lfSB7XG5cdFx0XFwkezI6I2JvZHkgLi4ufVxuXHR9XG4jIENvbmRpdGlvbmFsXG5zbmlwcGV0IGlmXG5cdGlmIChcXCR7MX0pIHtcblx0XHRcXCR7MjojIGJvZHkuLi59XG5cdH1cbiMgQ29uZGl0aW9uYWwgaWYuLmVsc2VcbnNuaXBwZXQgaWZlXG5cdGlmIChcXCR7MX0pIHtcblx0XHRcXCR7MjojIGJvZHkuLi59XG5cdH1cblx0ZWxzZSB7XG5cdFx0XFwkezM6IyBlbHNlLi4ufVxuXHR9XG4jIENvbmRpdGlvbmFsIGlmLi5lbHNpZi4uZWxzZVxuc25pcHBldCBpZmVlXG5cdGlmIChcXCR7MX0pIHtcblx0XHRcXCR7MjojIGJvZHkuLi59XG5cdH1cblx0ZWxzaWYgKFxcJHszfSkge1xuXHRcdFxcJHs0OiMgZWxzaWYuLi59XG5cdH1cblx0ZWxzZSB7XG5cdFx0XFwkezU6IyBlbHNlLi4ufVxuXHR9XG4jIENvbmRpdGlvbmFsIE9uZS1saW5lXG5zbmlwcGV0IHhpZlxuXHRcXCR7MTpleHByZXNzaW9ufSBpZiBcXCR7Mjpjb25kaXRpb259O1xcJHszfVxuIyBVbmxlc3MgY29uZGl0aW9uYWxcbnNuaXBwZXQgdW5sZXNzXG5cdHVubGVzcyAoXFwkezF9KSB7XG5cdFx0XFwkezI6IyBib2R5Li4ufVxuXHR9XG4jIFVubGVzcyBjb25kaXRpb25hbCBPbmUtbGluZVxuc25pcHBldCB4dW5sZXNzXG5cdFxcJHsxOmV4cHJlc3Npb259IHVubGVzcyBcXCR7Mjpjb25kaXRpb259O1xcJHszfVxuIyBUcnkvRXhjZXB0XG5zbmlwcGV0IGV2YWxcblx0bG9jYWwgXFwkQDtcblx0ZXZhbCB7XG5cdFx0XFwkezE6IyBkbyBzb21ldGhpbmcgcmlza3kuLi59XG5cdH07XG5cdGlmIChteSBcXCRlID0gXFwkQCkge1xuXHRcdFxcJHsyOiMgaGFuZGxlIGZhaWx1cmUuLi59XG5cdH1cbiMgV2hpbGUgTG9vcFxuc25pcHBldCB3aFxuXHR3aGlsZSAoXFwkezF9KSB7XG5cdFx0XFwkezI6IyBib2R5Li4ufVxuXHR9XG4jIFdoaWxlIExvb3AgT25lLWxpbmVcbnNuaXBwZXQgeHdoXG5cdFxcJHsxOmV4cHJlc3Npb259IHdoaWxlIFxcJHsyOmNvbmRpdGlvbn07XFwkezN9XG4jIEMtc3R5bGUgRm9yIExvb3BcbnNuaXBwZXQgY2ZvclxuXHRmb3IgKG15IFxcJFxcJHsyOnZhcn0gPSAwOyBcXCRcXCQyIDwgXFwkezE6Y291bnR9OyBcXCRcXCQyXFwkezM6Kyt9KSB7XG5cdFx0XFwkezQ6IyBib2R5Li4ufVxuXHR9XG4jIEZvciBsb29wIG9uZS1saW5lXG5zbmlwcGV0IHhmb3Jcblx0XFwkezE6ZXhwcmVzc2lvbn0gZm9yIEBcXCR7MjphcnJheX07XFwkezN9XG4jIEZvcmVhY2ggTG9vcFxuc25pcHBldCBmb3Jcblx0Zm9yZWFjaCBteSBcXCRcXCR7MTp4fSAoQFxcJHsyOmFycmF5fSkge1xuXHRcdFxcJHszOiMgYm9keS4uLn1cblx0fVxuIyBGb3JlYWNoIExvb3AgT25lLWxpbmVcbnNuaXBwZXQgZm9yZVxuXHRcXCR7MTpleHByZXNzaW9ufSBmb3JlYWNoIEBcXCR7MjphcnJheX07XFwkezN9XG4jIFBhY2thZ2VcbnNuaXBwZXQgcGFja2FnZVxuXHRwYWNrYWdlIFxcJHsxOlxcYHN1YnN0aXR1dGUoRmlsZW5hbWUoJycsICdQYWdlIFRpdGxlJyksICdeLicsICdcXFxcdSYnLCAnJylcXGB9O1xuXG5cdFxcJHsyfVxuXG5cdDE7XG5cblx0X19FTkRfX1xuIyBQYWNrYWdlIHN5bnRheCBwZXJsID49IDUuMTRcbnNuaXBwZXQgcGFja2FnZXY1MTRcblx0cGFja2FnZSBcXCR7MTpcXGBzdWJzdGl0dXRlKEZpbGVuYW1lKCcnLCAnUGFnZSBUaXRsZScpLCAnXi4nLCAnXFxcXHUmJywgJycpXFxgfSBcXCR7MjowLjk5fTtcblxuXHRcXCR7M31cblxuXHQxO1xuXG5cdF9fRU5EX19cbiNtb29zZVxuc25pcHBldCBtb29zZVxuXHR1c2UgTW9vc2U7XG5cdHVzZSBuYW1lc3BhY2U6OmF1dG9jbGVhbjtcblx0XFwkezE6I31CRUdJTiB7ZXh0ZW5kcyAnXFwkezI6UGFyZW50Q2xhc3N9J307XG5cblx0XFwkezN9XG4jIHBhcmVudFxuc25pcHBldCBwYXJlbnRcblx0dXNlIHBhcmVudCBxdyhcXCR7MTpQYXJlbnQgQ2xhc3N9KTtcbiMgUmVhZCBGaWxlXG5zbmlwcGV0IHNsdXJwXG5cdG15IFxcJFxcJHsxOnZhcn0gPSBkbyB7IGxvY2FsIFxcJC87IG9wZW4gbXkgXFwkZmlsZSwgJzwnLCBcIlxcJHsyOmZpbGV9XCI7IDxcXCRmaWxlPiB9O1xuXHRcXCR7M31cbiMgc3RyaWN0IHdhcm5pbmdzXG5zbmlwcGV0IHN0cndhclxuXHR1c2Ugc3RyaWN0O1xuXHR1c2Ugd2FybmluZ3M7XG4jIG9sZGVyIHZlcnNpb25pbmcgd2l0aCBwZXJsY3JpdGljIGJ5cGFzc1xuc25pcHBldCB2ZXJzXG5cdCMjIG5vIGNyaXRpY1xuXHRvdXIgXFwkVkVSU0lPTiA9ICdcXCR7MTp2ZXJzaW9ufSc7XG5cdGV2YWwgXFwkVkVSU0lPTjtcblx0IyMgdXNlIGNyaXRpY1xuIyBuZXcgJ3N3aXRjaCcgbGlrZSBmZWF0dXJlXG5zbmlwcGV0IHN3aXRjaFxuXHR1c2UgZmVhdHVyZSAnc3dpdGNoJztcblxuIyBBbm9ueW1vdXMgc3Vicm91dGluZVxuc25pcHBldCBhc3ViXG5cdHN1YiB7XG5cdCBcdFxcJHsxOiMgYm9keSB9XG5cdH1cblxuXG5cbiMgQmVnaW4gYmxvY2tcbnNuaXBwZXQgYmVnaW5cblx0QkVHSU4ge1xuXHRcdFxcJHsxOiMgYmVnaW4gYm9keX1cblx0fVxuXG4jIGNhbGwgcGFja2FnZSBmdW5jdGlvbiB3aXRoIHNvbWUgcGFyYW1ldGVyXG5zbmlwcGV0IHBrZ212XG5cdF9fUEFDS0FHRV9fLT5cXCR7MTpwYWNrYWdlX21ldGhvZH0oXFwkezI6dmFyfSlcblxuIyBjYWxsIHBhY2thZ2UgZnVuY3Rpb24gd2l0aG91dCBhIHBhcmFtZXRlclxuc25pcHBldCBwa2dtXG5cdF9fUEFDS0FHRV9fLT5cXCR7MTpwYWNrYWdlX21ldGhvZH0oKVxuXG4jIGNhbGwgcGFja2FnZSBcImdldF9cIiBmdW5jdGlvbiB3aXRob3V0IGEgcGFyYW1ldGVyXG5zbmlwcGV0IHBrZ2V0XG5cdF9fUEFDS0FHRV9fLT5nZXRfXFwkezE6cGFja2FnZV9tZXRob2R9KClcblxuIyBjYWxsIHBhY2thZ2UgZnVuY3Rpb24gd2l0aCBhIHBhcmFtZXRlclxuc25pcHBldCBwa2dldHZcblx0X19QQUNLQUdFX18tPmdldF9cXCR7MTpwYWNrYWdlX21ldGhvZH0oXFwkezI6dmFyfSlcblxuIyBjb21wbGV4IHJlZ2V4XG5zbmlwcGV0IHFyeFxuXHRxci9cblx0ICAgICBcXCR7MTpyZWdleH1cblx0L3htc1xuXG4jc2ltcGxlciByZWdleFxuc25pcHBldCBxci9cblx0cXIvXFwkezE6cmVnZXh9L3hcblxuI2dpdmVuXG5zbmlwcGV0IGdpdmVuXG5cdGdpdmVuIChcXCRcXCR7MTp2YXJ9KSB7XG5cdFx0XFwkezI6IyBjYXNlc31cblx0XHRcXCR7MzojIGRlZmF1bHR9XG5cdH1cblxuIyBzd2l0Y2gtbGlrZSBjYXNlXG5zbmlwcGV0IHdoZW5cblx0d2hlbiAoXFwkezE6Y2FzZX0pIHtcblx0XHRcXCR7MjojIGJvZHl9XG5cdH1cblxuIyBoYXNoIHNsaWNlXG5zbmlwcGV0IGhzbGljZVxuXHRAeyBcXCR7MTpoYXNofSAgfXsgXFwkezI6YXJyYXl9IH1cblxuXG4jIG1hcFxuc25pcHBldCBtYXBcblx0bWFwIHsgIFxcJHsyOiBib2R5IH0gICAgfSAgXFwkezE6IEBhcnJheSB9IDtcblxuXG5cbiMgUG9kIHN0dWJcbnNuaXBwZXQgcHBvZFxuXHQ9aGVhZDEgTkFNRVxuXG5cdFxcJHsxOkNsYXNzTmFtZX0gLSBcXCR7MjpTaG9ydERlc2N9XG5cblx0PWhlYWQxIFNZTk9QU0lTXG5cblx0ICB1c2UgXFwkMTtcblxuXHQgIFxcJHszOiMgc3lub3BzaXMuLi59XG5cblx0PWhlYWQxIERFU0NSSVBUSU9OXG5cblx0XFwkezQ6IyBsb25nZXIgZGVzY3JpcHRpb24uLi59XG5cblxuXHQ9aGVhZDEgSU5URVJGQUNFXG5cblxuXHQ9aGVhZDEgREVQRU5ERU5DSUVTXG5cblxuXHQ9aGVhZDEgU0VFIEFMU09cblxuXG4jIEhlYWRpbmcgZm9yIGEgc3Vicm91dGluZSBzdHViXG5zbmlwcGV0IHBzdWJcblx0PWhlYWQyIFxcJHsxOk1ldGhvZE5hbWV9XG5cblx0XFwkezI6U3VtbWFyeS4uLi59XG5cbiMgSGVhZGluZyBmb3IgaW5saW5lIHN1YnJvdXRpbmUgcG9kXG5zbmlwcGV0IHBzdWJpXG5cdD1oZWFkMiBcXCR7MTpNZXRob2ROYW1lfVxuXG5cdFxcJHsyOlN1bW1hcnkuLi59XG5cblxuXHQ9Y3V0XG4jIGlubGluZSBkb2N1bWVudGVkIHN1YnJvdXRpbmVcbnNuaXBwZXQgc3VicG9kXG5cdD1oZWFkMiBcXCQxXG5cblx0U3VtbWFyeSBvZiBcXCQxXG5cblx0PWN1dFxuXG5cdHN1YiBcXCR7MTpzdWJyb3V0aW5lX25hbWV9IHtcblx0XHRcXCR7MjojIGJvZHkuLi59XG5cdH1cbiMgU3Vicm91dGluZSBzaWduYXR1cmVcbnNuaXBwZXQgcGFyZ1xuXHQ9b3ZlciAyXG5cblx0PWl0ZW1cblx0QXJndW1lbnRzXG5cblxuXHQ9b3ZlciAzXG5cblx0PWl0ZW1cblx0QzxcXCR7MTpEYXRhU3RydWN0dXJlfT5cblxuXHQgIFxcJHsyOlNhbXBsZX1cblxuXG5cdD1iYWNrXG5cblxuXHQ9aXRlbVxuXHRSZXR1cm5cblxuXHQ9b3ZlciAzXG5cblxuXHQ9aXRlbVxuXHRDPFxcJHszOi4uLnJldHVybiBkYXRhfT5cblxuXG5cdD1iYWNrXG5cblxuXHQ9YmFja1xuXG5cblxuIyBNb29zZSBoYXNcbnNuaXBwZXQgaGFzXG5cdGhhcyBcXCR7MTphdHRyaWJ1dGV9ID0+IChcblx0XHRpc1x0ICAgID0+ICdcXCR7Mjpyb3xyd30nLFxuXHRcdGlzYSBcdD0+ICdcXCR7MzpTdHJ8SW50fEhhc2hSZWZ8QXJyYXlSZWZ8ZXRjfScsXG5cdFx0ZGVmYXVsdCA9PiBzdWIge1xuXHRcdFx0XFwkezQ6ZGVmYXVsdHZhbHVlfVxuXHRcdH0sXG5cdFx0XFwkezU6IyBvdGhlciBhdHRyaWJ1dGVzfVxuXHQpO1xuXG5cbiMgb3ZlcnJpZGVcbnNuaXBwZXQgb3ZlcnJpZGVcblx0b3ZlcnJpZGUgXFwkezE6YXR0cmlidXRlfSA9PiBzdWIge1xuXHRcdFxcJHsyOiMgbXkgXFwkc2VsZiA9IHNoaWZ0O307XG5cdFx0XFwkezM6IyBteSAoXFwkc2VsZiwgXFwkYXJncykgPSBAXzt9O1xuXHR9O1xuXG5cbiMgdXNlIHRlc3QgY2xhc3Nlc1xuc25pcHBldCB0dXNlXG5cdHVzZSBUZXN0OjpNb3JlO1xuXHR1c2UgVGVzdDo6RGVlcDsgIyAoKTsgIyB1bmNvbW1lbnQgdG8gc3RvcCBwcm90b3R5cGUgZXJyb3JzXG5cdHVzZSBUZXN0OjpFeGNlcHRpb247XG5cbiMgbG9jYWwgdGVzdCBsaWJcbnNuaXBwZXQgdGxpYlxuXHR1c2UgbGliIHF3eyAuL3QvbGliIH07XG5cbiN0ZXN0IG1ldGhvZHNcbnNuaXBwZXQgdG1ldGhzXG5cdFxcJEVOVntURVNUX01FVEhPRH0gPSAnXFwkezE6cmVnZXh9JztcblxuIyBydW50ZXN0Y2xhc3NcbnNuaXBwZXQgdHJ1bm5lclxuXHR1c2UgXFwkezE6dGVzdF9jbGFzc307XG5cdFxcJDEtPnJ1bnRlc3RzKCk7XG5cbiMgVGVzdDo6Q2xhc3Mtc3R5bGUgdGVzdFxuc25pcHBldCB0c3ViXG5cdHN1YiB0XFwkezE6bnVtYmVyfV9cXCR7Mjp0ZXN0X2Nhc2V9IDpUZXN0KFxcJHszOm51bV9vZl90ZXN0c30pIHtcblx0XHRteSBcXCRzZWxmID0gc2hpZnQ7XG5cdFx0XFwkezQ6IyAgYm9keX1cblxuXHR9XG5cbiMgVGVzdDo6Um91dGluZS1zdHlsZSB0ZXN0XG5zbmlwcGV0IHRyc3ViXG5cdHRlc3QgXFwkezE6dGVzdF9uYW1lfSA9PiB7IGRlc2NyaXB0aW9uID0+ICdcXCR7MjpEZXNjcmlwdGlvbiBvZiB0ZXN0Ln0nfSA9PiBzdWIge1xuXHRcdG15IChcXCRzZWxmKSA9IEBfO1xuXHRcdFxcJHszOiMgdGVzdCBjb2RlfVxuXHR9O1xuXG4jcHJlcCB0ZXN0IG1ldGhvZFxuc25pcHBldCB0cHJlcFxuXHRzdWIgcHJlcFxcJHsxOm51bWJlcn1fXFwkezI6dGVzdF9jYXNlfSA6VGVzdChzdGFydHVwKSB7XG5cdFx0bXkgXFwkc2VsZiA9IHNoaWZ0O1xuXHRcdFxcJHs0OiMgIGJvZHl9XG5cdH1cblxuIyBjYXVzZSBmYWlsdXJlcyB0byBwcmludCBzdGFjayB0cmFjZVxuc25pcHBldCBkZWJ1Z190cmFjZVxuXHR1c2UgQ2FycDsgIyAndmVyYm9zZSc7XG5cdCMgY2xvYWsgXCJkaWVcIlxuXHQjIHdhcm4gXCJ3YXJuaW5nXCJcblx0XFwkU0lHeydfX0RJRV9fJ30gPSBzdWIge1xuXHRcdHJlcXVpcmUgQ2FycDsgQ2FycDo6Y29uZmVzc1xuXHR9O1xuXG5gO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9