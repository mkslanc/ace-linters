(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4095,6775],{

/***/ 64095:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(16775);
exports.scope = "django";


/***/ }),

/***/ 16775:
/***/ ((module) => {

module.exports = `# Model Fields

# Note: Optional arguments are using defaults that match what Django will use
# as a default, e.g. with max_length fields.  Doing this as a form of self
# documentation and to make it easy to know whether you should override the
# default or not.

# Note: Optional arguments that are booleans will use the opposite since you
# can either not specify them, or override them, e.g. auto_now_add=False.

snippet auto
	\${1:FIELDNAME} = models.AutoField(\${2})
snippet bool
	\${1:FIELDNAME} = models.BooleanField(\${2:default=True})
snippet char
	\${1:FIELDNAME} = models.CharField(max_length=\${2}\${3:, blank=True})
snippet comma
	\${1:FIELDNAME} = models.CommaSeparatedIntegerField(max_length=\${2}\${3:, blank=True})
snippet date
	\${1:FIELDNAME} = models.DateField(\${2:auto_now_add=True, auto_now=True}\${3:, blank=True, null=True})
snippet datetime
	\${1:FIELDNAME} = models.DateTimeField(\${2:auto_now_add=True, auto_now=True}\${3:, blank=True, null=True})
snippet decimal
	\${1:FIELDNAME} = models.DecimalField(max_digits=\${2}, decimal_places=\${3})
snippet email
	\${1:FIELDNAME} = models.EmailField(max_length=\${2:75}\${3:, blank=True})
snippet file
	\${1:FIELDNAME} = models.FileField(upload_to=\${2:path/for/upload}\${3:, max_length=100})
snippet filepath
	\${1:FIELDNAME} = models.FilePathField(path=\${2:"/abs/path/to/dir"}\${3:, max_length=100}\${4:, match="*.ext"}\${5:, recursive=True}\${6:, blank=True, })
snippet float
	\${1:FIELDNAME} = models.FloatField(\${2})
snippet image
	\${1:FIELDNAME} = models.ImageField(upload_to=\${2:path/for/upload}\${3:, height_field=height, width_field=width}\${4:, max_length=100})
snippet int
	\${1:FIELDNAME} = models.IntegerField(\${2})
snippet ip
	\${1:FIELDNAME} = models.IPAddressField(\${2})
snippet nullbool
	\${1:FIELDNAME} = models.NullBooleanField(\${2})
snippet posint
	\${1:FIELDNAME} = models.PositiveIntegerField(\${2})
snippet possmallint
	\${1:FIELDNAME} = models.PositiveSmallIntegerField(\${2})
snippet slug
	\${1:FIELDNAME} = models.SlugField(max_length=\${2:50}\${3:, blank=True})
snippet smallint
	\${1:FIELDNAME} = models.SmallIntegerField(\${2})
snippet text
	\${1:FIELDNAME} = models.TextField(\${2:blank=True})
snippet time
	\${1:FIELDNAME} = models.TimeField(\${2:auto_now_add=True, auto_now=True}\${3:, blank=True, null=True})
snippet url
	\${1:FIELDNAME} = models.URLField(\${2:verify_exists=False}\${3:, max_length=200}\${4:, blank=True})
snippet xml
	\${1:FIELDNAME} = models.XMLField(schema_path=\${2:None}\${3:, blank=True})
# Relational Fields
snippet fk
	\${1:FIELDNAME} = models.ForeignKey(\${2:OtherModel}\${3:, related_name=''}\${4:, limit_choices_to=}\${5:, to_field=''})
snippet m2m
	\${1:FIELDNAME} = models.ManyToManyField(\${2:OtherModel}\${3:, related_name=''}\${4:, limit_choices_to=}\${5:, symmetrical=False}\${6:, through=''}\${7:, db_table=''})
snippet o2o
	\${1:FIELDNAME} = models.OneToOneField(\${2:OtherModel}\${3:, parent_link=True}\${4:, related_name=''}\${5:, limit_choices_to=}\${6:, to_field=''})

# Code Skeletons

snippet form
	class \${1:FormName}(forms.Form):
		"""\${2:docstring}"""
		\${3}

snippet model
	class \${1:ModelName}(models.Model):
		"""\${2:docstring}"""
		\${3}
		
		class Meta:
			\${4}
		
		def __unicode__(self):
			\${5}
		
		def save(self, force_insert=False, force_update=False):
			\${6}
		
		@models.permalink
		def get_absolute_url(self):
			return ('\${7:view_or_url_name}' \${8})

snippet modeladmin
	class \${1:ModelName}Admin(admin.ModelAdmin):
		\${2}
	
	admin.site.register(\$1, \$1Admin)
	
snippet tabularinline
	class \${1:ModelName}Inline(admin.TabularInline):
		model = \$1

snippet stackedinline
	class \${1:ModelName}Inline(admin.StackedInline):
		model = \$1

snippet r2r
	return render_to_response('\${1:template.html}', {
			\${2}
		}\${3:, context_instance=RequestContext(request)}
	)
`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjQwOTUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsZ0RBQWtEO0FBQ2xELGFBQWE7Ozs7Ozs7O0FDSGI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLElBQUksYUFBYSxzQkFBc0IsRUFBRTtBQUN6QztBQUNBLElBQUksYUFBYSx5QkFBeUIsZUFBZTtBQUN6RDtBQUNBLElBQUksYUFBYSxpQ0FBaUMsRUFBRSxHQUFHLGVBQWU7QUFDdEU7QUFDQSxJQUFJLGFBQWEsa0RBQWtELEVBQUUsR0FBRyxlQUFlO0FBQ3ZGO0FBQ0EsSUFBSSxhQUFhLHNCQUFzQixtQ0FBbUMsR0FBRywwQkFBMEI7QUFDdkc7QUFDQSxJQUFJLGFBQWEsMEJBQTBCLG1DQUFtQyxHQUFHLDBCQUEwQjtBQUMzRztBQUNBLElBQUksYUFBYSxvQ0FBb0MsRUFBRSxvQkFBb0IsRUFBRTtBQUM3RTtBQUNBLElBQUksYUFBYSxrQ0FBa0MsS0FBSyxHQUFHLGVBQWU7QUFDMUU7QUFDQSxJQUFJLGFBQWEsZ0NBQWdDLGtCQUFrQixHQUFHLG1CQUFtQjtBQUN6RjtBQUNBLElBQUksYUFBYSwrQkFBK0IscUJBQXFCLEdBQUcsbUJBQW1CLEdBQUcsa0JBQWtCLEdBQUcsbUJBQW1CLEdBQUcsaUJBQWlCO0FBQzFKO0FBQ0EsSUFBSSxhQUFhLHVCQUF1QixFQUFFO0FBQzFDO0FBQ0EsSUFBSSxhQUFhLGlDQUFpQyxrQkFBa0IsR0FBRywyQ0FBMkMsR0FBRyxtQkFBbUI7QUFDeEk7QUFDQSxJQUFJLGFBQWEseUJBQXlCLEVBQUU7QUFDNUM7QUFDQSxJQUFJLGFBQWEsMkJBQTJCLEVBQUU7QUFDOUM7QUFDQSxJQUFJLGFBQWEsNkJBQTZCLEVBQUU7QUFDaEQ7QUFDQSxJQUFJLGFBQWEsaUNBQWlDLEVBQUU7QUFDcEQ7QUFDQSxJQUFJLGFBQWEsc0NBQXNDLEVBQUU7QUFDekQ7QUFDQSxJQUFJLGFBQWEsaUNBQWlDLEtBQUssR0FBRyxlQUFlO0FBQ3pFO0FBQ0EsSUFBSSxhQUFhLDhCQUE4QixFQUFFO0FBQ2pEO0FBQ0EsSUFBSSxhQUFhLHNCQUFzQixhQUFhO0FBQ3BEO0FBQ0EsSUFBSSxhQUFhLHNCQUFzQixtQ0FBbUMsR0FBRywwQkFBMEI7QUFDdkc7QUFDQSxJQUFJLGFBQWEscUJBQXFCLHNCQUFzQixHQUFHLG1CQUFtQixHQUFHLGVBQWU7QUFDcEc7QUFDQSxJQUFJLGFBQWEsaUNBQWlDLE9BQU8sR0FBRyxlQUFlO0FBQzNFO0FBQ0E7QUFDQSxJQUFJLGFBQWEsdUJBQXVCLGFBQWEsR0FBRyxvQkFBb0IsR0FBRyxzQkFBc0IsR0FBRyxnQkFBZ0I7QUFDeEg7QUFDQSxJQUFJLGFBQWEsNEJBQTRCLGFBQWEsR0FBRyxvQkFBb0IsR0FBRyxzQkFBc0IsR0FBRyxzQkFBc0IsR0FBRyxlQUFlLEdBQUcsZ0JBQWdCO0FBQ3hLO0FBQ0EsSUFBSSxhQUFhLDBCQUEwQixhQUFhLEdBQUcscUJBQXFCLEdBQUcsb0JBQW9CLEdBQUcsc0JBQXNCLEdBQUcsZ0JBQWdCOztBQUVuSjs7QUFFQTtBQUNBLFVBQVUsV0FBVztBQUNyQixRQUFRLFlBQVk7QUFDcEIsS0FBSzs7QUFFTDtBQUNBLFVBQVUsWUFBWTtBQUN0QixRQUFRLFlBQVk7QUFDcEIsS0FBSztBQUNMO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLGVBQWUsbUJBQW1CLEtBQUssRUFBRTs7QUFFekM7QUFDQSxVQUFVLFlBQVk7QUFDdEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxZQUFZO0FBQ3RCOztBQUVBO0FBQ0EsVUFBVSxZQUFZO0FBQ3RCOztBQUVBO0FBQ0EsK0JBQStCLGdCQUFnQjtBQUMvQyxNQUFNO0FBQ04sR0FBRyxHQUFHO0FBQ047QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL3NuaXBwZXRzL2RqYW5nby5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9zbmlwcGV0cy9kamFuZ28uc25pcHBldHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuc25pcHBldFRleHQgPSByZXF1aXJlKFwiLi9kamFuZ28uc25pcHBldHNcIik7XG5leHBvcnRzLnNjb3BlID0gXCJkamFuZ29cIjtcbiIsIm1vZHVsZS5leHBvcnRzID0gYCMgTW9kZWwgRmllbGRzXG5cbiMgTm90ZTogT3B0aW9uYWwgYXJndW1lbnRzIGFyZSB1c2luZyBkZWZhdWx0cyB0aGF0IG1hdGNoIHdoYXQgRGphbmdvIHdpbGwgdXNlXG4jIGFzIGEgZGVmYXVsdCwgZS5nLiB3aXRoIG1heF9sZW5ndGggZmllbGRzLiAgRG9pbmcgdGhpcyBhcyBhIGZvcm0gb2Ygc2VsZlxuIyBkb2N1bWVudGF0aW9uIGFuZCB0byBtYWtlIGl0IGVhc3kgdG8ga25vdyB3aGV0aGVyIHlvdSBzaG91bGQgb3ZlcnJpZGUgdGhlXG4jIGRlZmF1bHQgb3Igbm90LlxuXG4jIE5vdGU6IE9wdGlvbmFsIGFyZ3VtZW50cyB0aGF0IGFyZSBib29sZWFucyB3aWxsIHVzZSB0aGUgb3Bwb3NpdGUgc2luY2UgeW91XG4jIGNhbiBlaXRoZXIgbm90IHNwZWNpZnkgdGhlbSwgb3Igb3ZlcnJpZGUgdGhlbSwgZS5nLiBhdXRvX25vd19hZGQ9RmFsc2UuXG5cbnNuaXBwZXQgYXV0b1xuXHRcXCR7MTpGSUVMRE5BTUV9ID0gbW9kZWxzLkF1dG9GaWVsZChcXCR7Mn0pXG5zbmlwcGV0IGJvb2xcblx0XFwkezE6RklFTEROQU1FfSA9IG1vZGVscy5Cb29sZWFuRmllbGQoXFwkezI6ZGVmYXVsdD1UcnVlfSlcbnNuaXBwZXQgY2hhclxuXHRcXCR7MTpGSUVMRE5BTUV9ID0gbW9kZWxzLkNoYXJGaWVsZChtYXhfbGVuZ3RoPVxcJHsyfVxcJHszOiwgYmxhbms9VHJ1ZX0pXG5zbmlwcGV0IGNvbW1hXG5cdFxcJHsxOkZJRUxETkFNRX0gPSBtb2RlbHMuQ29tbWFTZXBhcmF0ZWRJbnRlZ2VyRmllbGQobWF4X2xlbmd0aD1cXCR7Mn1cXCR7MzosIGJsYW5rPVRydWV9KVxuc25pcHBldCBkYXRlXG5cdFxcJHsxOkZJRUxETkFNRX0gPSBtb2RlbHMuRGF0ZUZpZWxkKFxcJHsyOmF1dG9fbm93X2FkZD1UcnVlLCBhdXRvX25vdz1UcnVlfVxcJHszOiwgYmxhbms9VHJ1ZSwgbnVsbD1UcnVlfSlcbnNuaXBwZXQgZGF0ZXRpbWVcblx0XFwkezE6RklFTEROQU1FfSA9IG1vZGVscy5EYXRlVGltZUZpZWxkKFxcJHsyOmF1dG9fbm93X2FkZD1UcnVlLCBhdXRvX25vdz1UcnVlfVxcJHszOiwgYmxhbms9VHJ1ZSwgbnVsbD1UcnVlfSlcbnNuaXBwZXQgZGVjaW1hbFxuXHRcXCR7MTpGSUVMRE5BTUV9ID0gbW9kZWxzLkRlY2ltYWxGaWVsZChtYXhfZGlnaXRzPVxcJHsyfSwgZGVjaW1hbF9wbGFjZXM9XFwkezN9KVxuc25pcHBldCBlbWFpbFxuXHRcXCR7MTpGSUVMRE5BTUV9ID0gbW9kZWxzLkVtYWlsRmllbGQobWF4X2xlbmd0aD1cXCR7Mjo3NX1cXCR7MzosIGJsYW5rPVRydWV9KVxuc25pcHBldCBmaWxlXG5cdFxcJHsxOkZJRUxETkFNRX0gPSBtb2RlbHMuRmlsZUZpZWxkKHVwbG9hZF90bz1cXCR7MjpwYXRoL2Zvci91cGxvYWR9XFwkezM6LCBtYXhfbGVuZ3RoPTEwMH0pXG5zbmlwcGV0IGZpbGVwYXRoXG5cdFxcJHsxOkZJRUxETkFNRX0gPSBtb2RlbHMuRmlsZVBhdGhGaWVsZChwYXRoPVxcJHsyOlwiL2Ficy9wYXRoL3RvL2RpclwifVxcJHszOiwgbWF4X2xlbmd0aD0xMDB9XFwkezQ6LCBtYXRjaD1cIiouZXh0XCJ9XFwkezU6LCByZWN1cnNpdmU9VHJ1ZX1cXCR7NjosIGJsYW5rPVRydWUsIH0pXG5zbmlwcGV0IGZsb2F0XG5cdFxcJHsxOkZJRUxETkFNRX0gPSBtb2RlbHMuRmxvYXRGaWVsZChcXCR7Mn0pXG5zbmlwcGV0IGltYWdlXG5cdFxcJHsxOkZJRUxETkFNRX0gPSBtb2RlbHMuSW1hZ2VGaWVsZCh1cGxvYWRfdG89XFwkezI6cGF0aC9mb3IvdXBsb2FkfVxcJHszOiwgaGVpZ2h0X2ZpZWxkPWhlaWdodCwgd2lkdGhfZmllbGQ9d2lkdGh9XFwkezQ6LCBtYXhfbGVuZ3RoPTEwMH0pXG5zbmlwcGV0IGludFxuXHRcXCR7MTpGSUVMRE5BTUV9ID0gbW9kZWxzLkludGVnZXJGaWVsZChcXCR7Mn0pXG5zbmlwcGV0IGlwXG5cdFxcJHsxOkZJRUxETkFNRX0gPSBtb2RlbHMuSVBBZGRyZXNzRmllbGQoXFwkezJ9KVxuc25pcHBldCBudWxsYm9vbFxuXHRcXCR7MTpGSUVMRE5BTUV9ID0gbW9kZWxzLk51bGxCb29sZWFuRmllbGQoXFwkezJ9KVxuc25pcHBldCBwb3NpbnRcblx0XFwkezE6RklFTEROQU1FfSA9IG1vZGVscy5Qb3NpdGl2ZUludGVnZXJGaWVsZChcXCR7Mn0pXG5zbmlwcGV0IHBvc3NtYWxsaW50XG5cdFxcJHsxOkZJRUxETkFNRX0gPSBtb2RlbHMuUG9zaXRpdmVTbWFsbEludGVnZXJGaWVsZChcXCR7Mn0pXG5zbmlwcGV0IHNsdWdcblx0XFwkezE6RklFTEROQU1FfSA9IG1vZGVscy5TbHVnRmllbGQobWF4X2xlbmd0aD1cXCR7Mjo1MH1cXCR7MzosIGJsYW5rPVRydWV9KVxuc25pcHBldCBzbWFsbGludFxuXHRcXCR7MTpGSUVMRE5BTUV9ID0gbW9kZWxzLlNtYWxsSW50ZWdlckZpZWxkKFxcJHsyfSlcbnNuaXBwZXQgdGV4dFxuXHRcXCR7MTpGSUVMRE5BTUV9ID0gbW9kZWxzLlRleHRGaWVsZChcXCR7MjpibGFuaz1UcnVlfSlcbnNuaXBwZXQgdGltZVxuXHRcXCR7MTpGSUVMRE5BTUV9ID0gbW9kZWxzLlRpbWVGaWVsZChcXCR7MjphdXRvX25vd19hZGQ9VHJ1ZSwgYXV0b19ub3c9VHJ1ZX1cXCR7MzosIGJsYW5rPVRydWUsIG51bGw9VHJ1ZX0pXG5zbmlwcGV0IHVybFxuXHRcXCR7MTpGSUVMRE5BTUV9ID0gbW9kZWxzLlVSTEZpZWxkKFxcJHsyOnZlcmlmeV9leGlzdHM9RmFsc2V9XFwkezM6LCBtYXhfbGVuZ3RoPTIwMH1cXCR7NDosIGJsYW5rPVRydWV9KVxuc25pcHBldCB4bWxcblx0XFwkezE6RklFTEROQU1FfSA9IG1vZGVscy5YTUxGaWVsZChzY2hlbWFfcGF0aD1cXCR7MjpOb25lfVxcJHszOiwgYmxhbms9VHJ1ZX0pXG4jIFJlbGF0aW9uYWwgRmllbGRzXG5zbmlwcGV0IGZrXG5cdFxcJHsxOkZJRUxETkFNRX0gPSBtb2RlbHMuRm9yZWlnbktleShcXCR7MjpPdGhlck1vZGVsfVxcJHszOiwgcmVsYXRlZF9uYW1lPScnfVxcJHs0OiwgbGltaXRfY2hvaWNlc190bz19XFwkezU6LCB0b19maWVsZD0nJ30pXG5zbmlwcGV0IG0ybVxuXHRcXCR7MTpGSUVMRE5BTUV9ID0gbW9kZWxzLk1hbnlUb01hbnlGaWVsZChcXCR7MjpPdGhlck1vZGVsfVxcJHszOiwgcmVsYXRlZF9uYW1lPScnfVxcJHs0OiwgbGltaXRfY2hvaWNlc190bz19XFwkezU6LCBzeW1tZXRyaWNhbD1GYWxzZX1cXCR7NjosIHRocm91Z2g9Jyd9XFwkezc6LCBkYl90YWJsZT0nJ30pXG5zbmlwcGV0IG8yb1xuXHRcXCR7MTpGSUVMRE5BTUV9ID0gbW9kZWxzLk9uZVRvT25lRmllbGQoXFwkezI6T3RoZXJNb2RlbH1cXCR7MzosIHBhcmVudF9saW5rPVRydWV9XFwkezQ6LCByZWxhdGVkX25hbWU9Jyd9XFwkezU6LCBsaW1pdF9jaG9pY2VzX3RvPX1cXCR7NjosIHRvX2ZpZWxkPScnfSlcblxuIyBDb2RlIFNrZWxldG9uc1xuXG5zbmlwcGV0IGZvcm1cblx0Y2xhc3MgXFwkezE6Rm9ybU5hbWV9KGZvcm1zLkZvcm0pOlxuXHRcdFwiXCJcIlxcJHsyOmRvY3N0cmluZ31cIlwiXCJcblx0XHRcXCR7M31cblxuc25pcHBldCBtb2RlbFxuXHRjbGFzcyBcXCR7MTpNb2RlbE5hbWV9KG1vZGVscy5Nb2RlbCk6XG5cdFx0XCJcIlwiXFwkezI6ZG9jc3RyaW5nfVwiXCJcIlxuXHRcdFxcJHszfVxuXHRcdFxuXHRcdGNsYXNzIE1ldGE6XG5cdFx0XHRcXCR7NH1cblx0XHRcblx0XHRkZWYgX191bmljb2RlX18oc2VsZik6XG5cdFx0XHRcXCR7NX1cblx0XHRcblx0XHRkZWYgc2F2ZShzZWxmLCBmb3JjZV9pbnNlcnQ9RmFsc2UsIGZvcmNlX3VwZGF0ZT1GYWxzZSk6XG5cdFx0XHRcXCR7Nn1cblx0XHRcblx0XHRAbW9kZWxzLnBlcm1hbGlua1xuXHRcdGRlZiBnZXRfYWJzb2x1dGVfdXJsKHNlbGYpOlxuXHRcdFx0cmV0dXJuICgnXFwkezc6dmlld19vcl91cmxfbmFtZX0nIFxcJHs4fSlcblxuc25pcHBldCBtb2RlbGFkbWluXG5cdGNsYXNzIFxcJHsxOk1vZGVsTmFtZX1BZG1pbihhZG1pbi5Nb2RlbEFkbWluKTpcblx0XHRcXCR7Mn1cblx0XG5cdGFkbWluLnNpdGUucmVnaXN0ZXIoXFwkMSwgXFwkMUFkbWluKVxuXHRcbnNuaXBwZXQgdGFidWxhcmlubGluZVxuXHRjbGFzcyBcXCR7MTpNb2RlbE5hbWV9SW5saW5lKGFkbWluLlRhYnVsYXJJbmxpbmUpOlxuXHRcdG1vZGVsID0gXFwkMVxuXG5zbmlwcGV0IHN0YWNrZWRpbmxpbmVcblx0Y2xhc3MgXFwkezE6TW9kZWxOYW1lfUlubGluZShhZG1pbi5TdGFja2VkSW5saW5lKTpcblx0XHRtb2RlbCA9IFxcJDFcblxuc25pcHBldCByMnJcblx0cmV0dXJuIHJlbmRlcl90b19yZXNwb25zZSgnXFwkezE6dGVtcGxhdGUuaHRtbH0nLCB7XG5cdFx0XHRcXCR7Mn1cblx0XHR9XFwkezM6LCBjb250ZXh0X2luc3RhbmNlPVJlcXVlc3RDb250ZXh0KHJlcXVlc3QpfVxuXHQpXG5gO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9