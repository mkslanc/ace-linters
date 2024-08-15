(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[8780,914],{

/***/ 98780:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(90914);
exports.scope = "ruby";


/***/ }),

/***/ 90914:
/***/ ((module) => {

module.exports = `########################################
# Ruby snippets - for Rails, see below #
########################################

# encoding for Ruby 1.9
snippet enc
	# encoding: utf-8

# #!/usr/bin/env ruby
snippet #!
	#!/usr/bin/env ruby
	# encoding: utf-8

# New Block
snippet =b
	=begin rdoc
		\${1}
	=end
snippet y
	:yields: \${1:arguments}
snippet rb
	#!/usr/bin/env ruby -wKU
snippet beg
	begin
		\${3}
	rescue \${1:Exception} => \${2:e}
	end

snippet req require
	require "\${1}"\${2}
snippet #
	# =>
snippet end
	__END__
snippet case
	case \${1:object}
	when \${2:condition}
		\${3}
	end
snippet when
	when \${1:condition}
		\${2}
snippet def
	def \${1:method_name}
		\${2}
	end
snippet deft
	def test_\${1:case_name}
		\${2}
	end
snippet if
	if \${1:condition}
		\${2}
	end
snippet ife
	if \${1:condition}
		\${2}
	else
		\${3}
	end
snippet elsif
	elsif \${1:condition}
		\${2}
snippet unless
	unless \${1:condition}
		\${2}
	end
snippet while
	while \${1:condition}
		\${2}
	end
snippet for
	for \${1:e} in \${2:c}
		\${3}
	end
snippet until
	until \${1:condition}
		\${2}
	end
snippet cla class .. end
	class \${1:\`substitute(Filename(), '\\(_\\|^\\)\\(.\\)', '\\u\\2', 'g')\`}
		\${2}
	end
snippet cla class .. initialize .. end
	class \${1:\`substitute(Filename(), '\\(_\\|^\\)\\(.\\)', '\\u\\2', 'g')\`}
		def initialize(\${2:args})
			\${3}
		end
	end
snippet cla class .. < ParentClass .. initialize .. end
	class \${1:\`substitute(Filename(), '\\(_\\|^\\)\\(.\\)', '\\u\\2', 'g')\`} < \${2:ParentClass}
		def initialize(\${3:args})
			\${4}
		end
	end
snippet cla ClassName = Struct .. do .. end
	\${1:\`substitute(Filename(), '\\(_\\|^\\)\\(.\\)', '\\u\\2', 'g')\`} = Struct.new(:\${2:attr_names}) do
		def \${3:method_name}
			\${4}
		end
	end
snippet cla class BlankSlate .. initialize .. end
	class \${1:BlankSlate}
		instance_methods.each { |meth| undef_method(meth) unless meth =~ /\\A__/ }
	end
snippet cla class << self .. end
	class << \${1:self}
		\${2}
	end
# class .. < DelegateClass .. initialize .. end
snippet cla-
	class \${1:\`substitute(Filename(), '\\(_\\|^\\)\\(.\\)', '\\u\\2', 'g')\`} < DelegateClass(\${2:ParentClass})
		def initialize(\${3:args})
			super(\${4:del_obj})

			\${5}
		end
	end
snippet mod module .. end
	module \${1:\`substitute(Filename(), '\\(_\\|^\\)\\(.\\)', '\\u\\2', 'g')\`}
		\${2}
	end
snippet mod module .. module_function .. end
	module \${1:\`substitute(Filename(), '\\(_\\|^\\)\\(.\\)', '\\u\\2', 'g')\`}
		module_function

		\${2}
	end
snippet mod module .. ClassMethods .. end
	module \${1:\`substitute(Filename(), '\\(_\\|^\\)\\(.\\)', '\\u\\2', 'g')\`}
		module ClassMethods
			\${2}
		end

		module InstanceMethods

		end

		def self.included(receiver)
			receiver.extend         ClassMethods
			receiver.send :include, InstanceMethods
		end
	end
# attr_reader
snippet r
	attr_reader :\${1:attr_names}
# attr_writer
snippet w
	attr_writer :\${1:attr_names}
# attr_accessor
snippet rw
	attr_accessor :\${1:attr_names}
snippet atp
	attr_protected :\${1:attr_names}
snippet ata
	attr_accessible :\${1:attr_names}
# include Enumerable
snippet Enum
	include Enumerable

	def each(&block)
		\${1}
	end
# include Comparable
snippet Comp
	include Comparable

	def <=>(other)
		\${1}
	end
# extend Forwardable
snippet Forw-
	extend Forwardable
# def self
snippet defs
	def self.\${1:class_method_name}
		\${2}
	end
# def method_missing
snippet defmm
	def method_missing(meth, *args, &blk)
		\${1}
	end
snippet defd
	def_delegator :\${1:@del_obj}, :\${2:del_meth}, :\${3:new_name}
snippet defds
	def_delegators :\${1:@del_obj}, :\${2:del_methods}
snippet am
	alias_method :\${1:new_name}, :\${2:old_name}
snippet app
	if __FILE__ == \$PROGRAM_NAME
		\${1}
	end
# usage_if()
snippet usai
	if ARGV.\${1}
		abort "Usage: #{\$PROGRAM_NAME} \${2:ARGS_GO_HERE}"\${3}
	end
# usage_unless()
snippet usau
	unless ARGV.\${1}
		abort "Usage: #{\$PROGRAM_NAME} \${2:ARGS_GO_HERE}"\${3}
	end
snippet array
	Array.new(\${1:10}) { |\${2:i}| \${3} }
snippet hash
	Hash.new { |\${1:hash}, \${2:key}| \$1[\$2] = \${3} }
snippet file File.foreach() { |line| .. }
	File.foreach(\${1:"path/to/file"}) { |\${2:line}| \${3} }
snippet file File.read()
	File.read(\${1:"path/to/file"})\${2}
snippet Dir Dir.global() { |file| .. }
	Dir.glob(\${1:"dir/glob/*"}) { |\${2:file}| \${3} }
snippet Dir Dir[".."]
	Dir[\${1:"glob/**/*.rb"}]\${2}
snippet dir
	Filename.dirname(__FILE__)
snippet deli
	delete_if { |\${1:e}| \${2} }
snippet fil
	fill(\${1:range}) { |\${2:i}| \${3} }
# flatten_once()
snippet flao
	inject(Array.new) { |\${1:arr}, \${2:a}| \$1.push(*\$2)}\${3}
snippet zip
	zip(\${1:enums}) { |\${2:row}| \${3} }
# downto(0) { |n| .. }
snippet dow
	downto(\${1:0}) { |\${2:n}| \${3} }
snippet ste
	step(\${1:2}) { |\${2:n}| \${3} }
snippet tim
	times { |\${1:n}| \${2} }
snippet upt
	upto(\${1:1.0/0.0}) { |\${2:n}| \${3} }
snippet loo
	loop { \${1} }
snippet ea
	each { |\${1:e}| \${2} }
snippet ead
	each do |\${1:e}|
		\${2}
	end
snippet eab
	each_byte { |\${1:byte}| \${2} }
snippet eac- each_char { |chr| .. }
	each_char { |\${1:chr}| \${2} }
snippet eac- each_cons(..) { |group| .. }
	each_cons(\${1:2}) { |\${2:group}| \${3} }
snippet eai
	each_index { |\${1:i}| \${2} }
snippet eaid
	each_index do |\${1:i}|
		\${2}
	end
snippet eak
	each_key { |\${1:key}| \${2} }
snippet eakd
	each_key do |\${1:key}|
		\${2}
	end
snippet eal
	each_line { |\${1:line}| \${2} }
snippet eald
	each_line do |\${1:line}|
		\${2}
	end
snippet eap
	each_pair { |\${1:name}, \${2:val}| \${3} }
snippet eapd
	each_pair do |\${1:name}, \${2:val}|
		\${3}
	end
snippet eas-
	each_slice(\${1:2}) { |\${2:group}| \${3} }
snippet easd-
	each_slice(\${1:2}) do |\${2:group}|
		\${3}
	end
snippet eav
	each_value { |\${1:val}| \${2} }
snippet eavd
	each_value do |\${1:val}|
		\${2}
	end
snippet eawi
	each_with_index { |\${1:e}, \${2:i}| \${3} }
snippet eawid
	each_with_index do |\${1:e},\${2:i}|
		\${3}
	end
snippet reve
	reverse_each { |\${1:e}| \${2} }
snippet reved
	reverse_each do |\${1:e}|
		\${2}
	end
snippet inj
	inject(\${1:init}) { |\${2:mem}, \${3:var}| \${4} }
snippet injd
	inject(\${1:init}) do |\${2:mem}, \${3:var}|
		\${4}
	end
snippet map
	map { |\${1:e}| \${2} }
snippet mapd
	map do |\${1:e}|
		\${2}
	end
snippet mapwi-
	enum_with_index.map { |\${1:e}, \${2:i}| \${3} }
snippet sor
	sort { |a, b| \${1} }
snippet sorb
	sort_by { |\${1:e}| \${2} }
snippet ran
	sort_by { rand }
snippet all
	all? { |\${1:e}| \${2} }
snippet any
	any? { |\${1:e}| \${2} }
snippet cl
	classify { |\${1:e}| \${2} }
snippet col
	collect { |\${1:e}| \${2} }
snippet cold
	collect do |\${1:e}|
		\${2}
	end
snippet det
	detect { |\${1:e}| \${2} }
snippet detd
	detect do |\${1:e}|
		\${2}
	end
snippet fet
	fetch(\${1:name}) { |\${2:key}| \${3} }
snippet fin
	find { |\${1:e}| \${2} }
snippet find
	find do |\${1:e}|
		\${2}
	end
snippet fina
	find_all { |\${1:e}| \${2} }
snippet finad
	find_all do |\${1:e}|
		\${2}
	end
snippet gre
	grep(\${1:/pattern/}) { |\${2:match}| \${3} }
snippet sub
	\${1:g}sub(\${2:/pattern/}) { |\${3:match}| \${4} }
snippet sca
	scan(\${1:/pattern/}) { |\${2:match}| \${3} }
snippet scad
	scan(\${1:/pattern/}) do |\${2:match}|
		\${3}
	end
snippet max
	max { |a, b| \${1} }
snippet min
	min { |a, b| \${1} }
snippet par
	partition { |\${1:e}| \${2} }
snippet pard
	partition do |\${1:e}|
		\${2}
	end
snippet rej
	reject { |\${1:e}| \${2} }
snippet rejd
	reject do |\${1:e}|
		\${2}
	end
snippet sel
	select { |\${1:e}| \${2} }
snippet seld
	select do |\${1:e}|
		\${2}
	end
snippet lam
	lambda { |\${1:args}| \${2} }
snippet doo
	do
		\${1}
	end
snippet dov
	do |\${1:variable}|
		\${2}
	end
snippet :
	:\${1:key} => \${2:"value"}\${3}
snippet ope
	open(\${1:"path/or/url/or/pipe"}, "\${2:w}") { |\${3:io}| \${4} }
# path_from_here()
snippet fpath
	File.join(File.dirname(__FILE__), *%2[\${1:rel path here}])\${2}
# unix_filter {}
snippet unif
	ARGF.each_line\${1} do |\${2:line}|
		\${3}
	end
# option_parse {}
snippet optp
	require "optparse"

	options = {\${1:default => "args"}}

	ARGV.options do |opts|
		opts.banner = "Usage: #{File.basename(\$PROGRAM_NAME)}
snippet opt
	opts.on( "-\${1:o}", "--\${2:long-option-name}", \${3:String},
	         "\${4:Option description.}") do |\${5:opt}|
		\${6}
	end
snippet tc
	require "test/unit"

	require "\${1:library_file_name}"

	class Test\${2:\$1} < Test::Unit::TestCase
		def test_\${3:case_name}
			\${4}
		end
	end
snippet ts
	require "test/unit"

	require "tc_\${1:test_case_file}"
	require "tc_\${2:test_case_file}"\${3}
snippet as
	assert \${1:test}, "\${2:Failure message.}"\${3}
snippet ase
	assert_equal \${1:expected}, \${2:actual}\${3}
snippet asne
	assert_not_equal \${1:unexpected}, \${2:actual}\${3}
snippet asid
	assert_in_delta \${1:expected_float}, \${2:actual_float}, \${3:2 ** -20}\${4}
snippet asio
	assert_instance_of \${1:ExpectedClass}, \${2:actual_instance}\${3}
snippet asko
	assert_kind_of \${1:ExpectedKind}, \${2:actual_instance}\${3}
snippet asn
	assert_nil \${1:instance}\${2}
snippet asnn
	assert_not_nil \${1:instance}\${2}
snippet asm
	assert_match /\${1:expected_pattern}/, \${2:actual_string}\${3}
snippet asnm
	assert_no_match /\${1:unexpected_pattern}/, \${2:actual_string}\${3}
snippet aso
	assert_operator \${1:left}, :\${2:operator}, \${3:right}\${4}
snippet asr
	assert_raise \${1:Exception} { \${2} }
snippet asrd
	assert_raise \${1:Exception} do
		\${2}
	end
snippet asnr
	assert_nothing_raised \${1:Exception} { \${2} }
snippet asnrd
	assert_nothing_raised \${1:Exception} do
		\${2}
	end
snippet asrt
	assert_respond_to \${1:object}, :\${2:method}\${3}
snippet ass assert_same(..)
	assert_same \${1:expected}, \${2:actual}\${3}
snippet ass assert_send(..)
	assert_send [\${1:object}, :\${2:message}, \${3:args}]\${4}
snippet asns
	assert_not_same \${1:unexpected}, \${2:actual}\${3}
snippet ast
	assert_throws :\${1:expected} { \${2} }
snippet astd
	assert_throws :\${1:expected} do
		\${2}
	end
snippet asnt
	assert_nothing_thrown { \${1} }
snippet asntd
	assert_nothing_thrown do
		\${1}
	end
snippet fl
	flunk "\${1:Failure message.}"\${2}
# Benchmark.bmbm do .. end
snippet bm-
	TESTS = \${1:10_000}
	Benchmark.bmbm do |results|
		\${2}
	end
snippet rep
	results.report("\${1:name}:") { TESTS.times { \${2} }}
# Marshal.dump(.., file)
snippet Md
	File.open(\${1:"path/to/file.dump"}, "wb") { |\${2:file}| Marshal.dump(\${3:obj}, \$2) }\${4}
# Mashal.load(obj)
snippet Ml
	File.open(\${1:"path/to/file.dump"}, "rb") { |\${2:file}| Marshal.load(\$2) }\${3}
# deep_copy(..)
snippet deec
	Marshal.load(Marshal.dump(\${1:obj_to_copy}))\${2}
snippet Pn-
	PStore.new(\${1:"file_name.pstore"})\${2}
snippet tra
	transaction(\${1:true}) { \${2} }
# xmlread(..)
snippet xml-
	REXML::Document.new(File.read(\${1:"path/to/file"}))\${2}
# xpath(..) { .. }
snippet xpa
	elements.each(\${1:"//Xpath"}) do |\${2:node}|
		\${3}
	end
# class_from_name()
snippet clafn
	split("::").inject(Object) { |par, const| par.const_get(const) }
# singleton_class()
snippet sinc
	class << self; self end
snippet nam
	namespace :\${1:\`Filename()\`} do
		\${2}
	end
snippet tas
	desc "\${1:Task description}"
	task :\${2:task_name => [:dependent, :tasks]} do
		\${3}
	end
# block
snippet b
	{ |\${1:var}| \${2} }
snippet begin
	begin
		raise 'A test exception.'
	rescue Exception => e
		puts e.message
		puts e.backtrace.inspect
	else
		# other exception
	ensure
		# always executed
	end

#debugging
snippet debug
	require 'ruby-debug'; debugger; true;
snippet pry
	require 'pry'; binding.pry

#############################################
# Rails snippets - for pure Ruby, see above #
#############################################
snippet art
	assert_redirected_to \${1::action => "\${2:index}"}
snippet artnp
	assert_redirected_to \${1:parent}_\${2:child}_path(\${3:@\$1}, \${4:@\$2})
snippet artnpp
	assert_redirected_to \${1:parent}_\${2:child}_path(\${3:@\$1})
snippet artp
	assert_redirected_to \${1:model}_path(\${2:@\$1})
snippet artpp
	assert_redirected_to \${1:model}s_path
snippet asd
	assert_difference "\${1:Model}.\${2:count}", \$1 do
		\${3}
	end
snippet asnd
	assert_no_difference "\${1:Model}.\${2:count}" do
		\${3}
	end
snippet asre
	assert_response :\${1:success}, @response.body\${2}
snippet asrj
	assert_rjs :\${1:replace}, "\${2:dom id}"
snippet ass assert_select(..)
	assert_select '\${1:path}', :\${2:text} => '\${3:inner_html' \${4:do}
snippet bf
	before_filter :\${1:method}
snippet bt
	belongs_to :\${1:association}
snippet crw
	cattr_accessor :\${1:attr_names}
snippet defcreate
	def create
		@\${1:model_class_name} = \${2:ModelClassName}.new(params[:\$1])

		respond_to do |wants|
			if @\$1.save
				flash[:notice] = '\$2 was successfully created.'
				wants.html { redirect_to(@\$1) }
				wants.xml  { render :xml => @\$1, :status => :created, :location => @\$1 }
			else
				wants.html { render :action => "new" }
				wants.xml  { render :xml => @\$1.errors, :status => :unprocessable_entity }
			end
		end
	end\${3}
snippet defdestroy
	def destroy
		@\${1:model_class_name} = \${2:ModelClassName}.find(params[:id])
		@\$1.destroy

		respond_to do |wants|
			wants.html { redirect_to(\$1s_url) }
			wants.xml  { head :ok }
		end
	end\${3}
snippet defedit
	def edit
		@\${1:model_class_name} = \${2:ModelClassName}.find(params[:id])
	end
snippet defindex
	def index
		@\${1:model_class_name} = \${2:ModelClassName}.all

		respond_to do |wants|
			wants.html # index.html.erb
			wants.xml  { render :xml => @\$1s }
		end
	end\${3}
snippet defnew
	def new
		@\${1:model_class_name} = \${2:ModelClassName}.new

		respond_to do |wants|
			wants.html # new.html.erb
			wants.xml  { render :xml => @\$1 }
		end
	end\${3}
snippet defshow
	def show
		@\${1:model_class_name} = \${2:ModelClassName}.find(params[:id])

		respond_to do |wants|
			wants.html # show.html.erb
			wants.xml  { render :xml => @\$1 }
		end
	end\${3}
snippet defupdate
	def update
		@\${1:model_class_name} = \${2:ModelClassName}.find(params[:id])

		respond_to do |wants|
			if @\$1.update_attributes(params[:\$1])
				flash[:notice] = '\$2 was successfully updated.'
				wants.html { redirect_to(@\$1) }
				wants.xml  { head :ok }
			else
				wants.html { render :action => "edit" }
				wants.xml  { render :xml => @\$1.errors, :status => :unprocessable_entity }
			end
		end
	end\${3}
snippet flash
	flash[:\${1:notice}] = "\${2}"
snippet habtm
	has_and_belongs_to_many :\${1:object}, :join_table => "\${2:table_name}", :foreign_key => "\${3}_id"\${4}
snippet hm
	has_many :\${1:object}
snippet hmd
	has_many :\${1:other}s, :class_name => "\${2:\$1}", :foreign_key => "\${3:\$1}_id", :dependent => :destroy\${4}
snippet hmt
	has_many :\${1:object}, :through => :\${2:object}
snippet ho
	has_one :\${1:object}
snippet i18
	I18n.t('\${1:type.key}')\${2}
snippet ist
	<%= image_submit_tag("\${1:agree.png}", :id => "\${2:id}"\${3} %>
snippet log
	Rails.logger.\${1:debug} \${2}
snippet log2
	RAILS_DEFAULT_LOGGER.\${1:debug} \${2}
snippet logd
	logger.debug { "\${1:message}" }\${2}
snippet loge
	logger.error { "\${1:message}" }\${2}
snippet logf
	logger.fatal { "\${1:message}" }\${2}
snippet logi
	logger.info { "\${1:message}" }\${2}
snippet logw
	logger.warn { "\${1:message}" }\${2}
snippet mapc
	\${1:map}.\${2:connect} '\${3:controller/:action/:id}'
snippet mapca
	\${1:map}.catch_all "*\${2:anything}", :controller => "\${3:default}", :action => "\${4:error}"\${5}
snippet mapr
	\${1:map}.resource :\${2:resource}
snippet maprs
	\${1:map}.resources :\${2:resource}
snippet mapwo
	\${1:map}.with_options :\${2:controller} => '\${3:thing}' do |\$3|
		\${4}
	end
snippet mbs
	before_save :\${1:method}
snippet mcht
	change_table :\${1:table_name} do |t|
		\${2}
	end
snippet mp
	map(&:\${1:id})
snippet mrw
	mattr_accessor :\${1:attr_names}
snippet oa
	order("\${1:field}")
snippet od
	order("\${1:field} DESC")
snippet pa
	params[:\${1:id}]\${2}
snippet ra
	render :action => "\${1:action}"
snippet ral
	render :action => "\${1:action}", :layout => "\${2:layoutname}"
snippet rest
	respond_to do |wants|
		wants.\${1:html} { \${2} }
	end
snippet rf
	render :file => "\${1:filepath}"
snippet rfu
	render :file => "\${1:filepath}", :use_full_path => \${2:false}
snippet ri
	render :inline => "\${1:<%= 'hello' %>}"
snippet ril
	render :inline => "\${1:<%= 'hello' %>}", :locals => { \${2::name} => "\${3:value}"\${4} }
snippet rit
	render :inline => "\${1:<%= 'hello' %>}", :type => \${2::rxml}
snippet rjson
	render :json => \${1:text to render}
snippet rl
	render :layout => "\${1:layoutname}"
snippet rn
	render :nothing => \${1:true}
snippet rns
	render :nothing => \${1:true}, :status => \${2:401}
snippet rp
	render :partial => "\${1:item}"
snippet rpc
	render :partial => "\${1:item}", :collection => \${2:@\$1s}
snippet rpl
	render :partial => "\${1:item}", :locals => { :\${2:\$1} => \${3:@\$1}
snippet rpo
	render :partial => "\${1:item}", :object => \${2:@\$1}
snippet rps
	render :partial => "\${1:item}", :status => \${2:500}
snippet rt
	render :text => "\${1:text to render}"
snippet rtl
	render :text => "\${1:text to render}", :layout => "\${2:layoutname}"
snippet rtlt
	render :text => "\${1:text to render}", :layout => \${2:true}
snippet rts
	render :text => "\${1:text to render}", :status => \${2:401}
snippet ru
	render :update do |\${1:page}|
		\$1.\${2}
	end
snippet rxml
	render :xml => \${1:text to render}
snippet sc
	scope :\${1:name}, :where(:@\${2:field} => \${3:value})
snippet sl
	scope :\${1:name}, lambda do |\${2:value}|
		where("\${3:field = ?}", \${4:bind var})
	end
snippet sha1
	Digest::SHA1.hexdigest(\${1:string})
snippet sweeper
	class \${1:ModelClassName}Sweeper < ActionController::Caching::Sweeper
		observe \$1

		def after_save(\${2:model_class_name})
			expire_cache(\$2)
		end

		def after_destroy(\$2)
			expire_cache(\$2)
		end

		def expire_cache(\$2)
			expire_page
		end
	end
snippet tcb
	t.boolean :\${1:title}
	\${2}
snippet tcbi
	t.binary :\${1:title}, :limit => \${2:2}.megabytes
	\${3}
snippet tcd
	t.decimal :\${1:title}, :precision => \${2:10}, :scale => \${3:2}
	\${4}
snippet tcda
	t.date :\${1:title}
	\${2}
snippet tcdt
	t.datetime :\${1:title}
	\${2}
snippet tcf
	t.float :\${1:title}
	\${2}
snippet tch
	t.change :\${1:name}, :\${2:string}, :\${3:limit} => \${4:80}
	\${5}
snippet tci
	t.integer :\${1:title}
	\${2}
snippet tcl
	t.integer :lock_version, :null => false, :default => 0
	\${1}
snippet tcr
	t.references :\${1:taggable}, :polymorphic => { :default => '\${2:Photo}' }
	\${3}
snippet tcs
	t.string :\${1:title}
	\${2}
snippet tct
	t.text :\${1:title}
	\${2}
snippet tcti
	t.time :\${1:title}
	\${2}
snippet tcts
	t.timestamp :\${1:title}
	\${2}
snippet tctss
	t.timestamps
	\${1}
snippet va
	validates_associated :\${1:attribute}
snippet vao
	validates_acceptance_of :\${1:terms}
snippet vc
	validates_confirmation_of :\${1:attribute}
snippet ve
	validates_exclusion_of :\${1:attribute}, :in => \${2:%w( mov avi )}
snippet vf
	validates_format_of :\${1:attribute}, :with => /\${2:regex}/
snippet vi
	validates_inclusion_of :\${1:attribute}, :in => %w(\${2: mov avi })
snippet vl
	validates_length_of :\${1:attribute}, :within => \${2:3}..\${3:20}
snippet vn
	validates_numericality_of :\${1:attribute}
snippet vpo
	validates_presence_of :\${1:attribute}
snippet vu
	validates_uniqueness_of :\${1:attribute}
snippet wants
	wants.\${1:js|xml|html} { \${2} }
snippet wc
	where(\${1:"conditions"}\${2:, bind_var})
snippet wh
	where(\${1:field} => \${2:value})
snippet xdelete
	xhr :delete, :\${1:destroy}, :id => \${2:1}\${3}
snippet xget
	xhr :get, :\${1:show}, :id => \${2:1}\${3}
snippet xpost
	xhr :post, :\${1:create}, :\${2:object} => { \${3} }
snippet xput
	xhr :put, :\${1:update}, :id => \${2:1}, :\${3:object} => { \${4} }\${5}
snippet test
	test "should \${1:do something}" do
		\${2}
	end
#migrations
snippet mac
	add_column :\${1:table_name}, :\${2:column_name}, :\${3:data_type}
snippet mrc
	remove_column :\${1:table_name}, :\${2:column_name}
snippet mrnc
	rename_column :\${1:table_name}, :\${2:old_column_name}, :\${3:new_column_name}
snippet mcc
	change_column :\${1:table}, :\${2:column}, :\${3:type}
snippet mccc
	t.column :\${1:title}, :\${2:string}
snippet mct
	create_table :\${1:table_name} do |t|
		t.column :\${2:name}, :\${3:type}
	end
snippet migration
	class \${1:class_name} < ActiveRecord::Migration
		def self.up
			\${2}
		end

		def self.down
		end
	end

snippet trc
	t.remove :\${1:column}
snippet tre
	t.rename :\${1:old_column_name}, :\${2:new_column_name}
	\${3}
snippet tref
	t.references :\${1:model}

#rspec
snippet it
	it "\${1:spec_name}" do
		\${2}
	end
snippet itp
	it "\${1:spec_name}"
	\${2}
snippet desc
	describe \${1:class_name} do
		\${2}
	end
snippet cont
	context "\${1:message}" do
		\${2}
	end
snippet bef
	before :\${1:each} do
		\${2}
	end
snippet aft
	after :\${1:each} do
		\${2}
	end
`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ3pDO0FBQ0EsVUFBVSxTQUFTLE1BQU0sUUFBUTtBQUNqQztBQUNBLGtCQUFrQixVQUFVLFlBQVksSUFBSSxHQUFHO0FBQy9DO0FBQ0EsZUFBZSxPQUFPLFlBQVksSUFBSSxHQUFHO0FBQ3pDO0FBQ0EsZ0JBQWdCLFNBQVMsTUFBTSxVQUFVLEtBQUssR0FBRztBQUNqRDtBQUNBLGVBQWUsU0FBUyxZQUFZLElBQUksTUFBTSxVQUFVLEtBQUssR0FBRyxJQUFJLEdBQUc7QUFDdkU7QUFDQSxpQkFBaUIsZUFBZTtBQUNoQyxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGFBQWEsTUFBTSxjQUFjLE1BQU07QUFDdkQ7QUFDQSxtQkFBbUIsYUFBYSxNQUFNO0FBQ3RDO0FBQ0EsbUJBQW1CLGFBQWEsTUFBTSxrQkFBa0IsTUFBTTtBQUM5RDtBQUNBLG1CQUFtQixRQUFRLE1BQU0sU0FBUyxNQUFNO0FBQ2hEO0FBQ0EsY0FBYyxRQUFRLE1BQU07QUFDNUI7QUFDQSxrQkFBa0IsY0FBYztBQUNoQyxlQUFlLE9BQU8sTUFBTTtBQUM1QjtBQUNBO0FBQ0EsVUFBVSxjQUFjO0FBQ3hCO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWM7QUFDZDtBQUNBLGNBQWMsa0JBQWtCLE1BQU07QUFDdEMsSUFBSTtBQUNKO0FBQ0Esa0JBQWtCOztBQUVsQjtBQUNBO0FBQ0EsUUFBUSxZQUFZO0FBQ3BCLEtBQUs7QUFDTDtBQUNBO0FBQ0EsUUFBUSxZQUFZO0FBQ3BCLElBQUk7QUFDSjtBQUNBLGFBQWEsY0FBYztBQUMzQixLQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQWEsVUFBVTtBQUN2QixLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQixLQUFLO0FBQ0w7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixLQUFLO0FBQ0w7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL3NuaXBwZXRzL3J1YnkuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvc25pcHBldHMvcnVieS5zbmlwcGV0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5zbmlwcGV0VGV4dCA9IHJlcXVpcmUoXCIuL3J1Ynkuc25pcHBldHNcIik7XG5leHBvcnRzLnNjb3BlID0gXCJydWJ5XCI7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4jIFJ1Ynkgc25pcHBldHMgLSBmb3IgUmFpbHMsIHNlZSBiZWxvdyAjXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbiMgZW5jb2RpbmcgZm9yIFJ1YnkgMS45XG5zbmlwcGV0IGVuY1xuXHQjIGVuY29kaW5nOiB1dGYtOFxuXG4jICMhL3Vzci9iaW4vZW52IHJ1YnlcbnNuaXBwZXQgIyFcblx0IyEvdXNyL2Jpbi9lbnYgcnVieVxuXHQjIGVuY29kaW5nOiB1dGYtOFxuXG4jIE5ldyBCbG9ja1xuc25pcHBldCA9YlxuXHQ9YmVnaW4gcmRvY1xuXHRcdFxcJHsxfVxuXHQ9ZW5kXG5zbmlwcGV0IHlcblx0OnlpZWxkczogXFwkezE6YXJndW1lbnRzfVxuc25pcHBldCByYlxuXHQjIS91c3IvYmluL2VudiBydWJ5IC13S1VcbnNuaXBwZXQgYmVnXG5cdGJlZ2luXG5cdFx0XFwkezN9XG5cdHJlc2N1ZSBcXCR7MTpFeGNlcHRpb259ID0+IFxcJHsyOmV9XG5cdGVuZFxuXG5zbmlwcGV0IHJlcSByZXF1aXJlXG5cdHJlcXVpcmUgXCJcXCR7MX1cIlxcJHsyfVxuc25pcHBldCAjXG5cdCMgPT5cbnNuaXBwZXQgZW5kXG5cdF9fRU5EX19cbnNuaXBwZXQgY2FzZVxuXHRjYXNlIFxcJHsxOm9iamVjdH1cblx0d2hlbiBcXCR7Mjpjb25kaXRpb259XG5cdFx0XFwkezN9XG5cdGVuZFxuc25pcHBldCB3aGVuXG5cdHdoZW4gXFwkezE6Y29uZGl0aW9ufVxuXHRcdFxcJHsyfVxuc25pcHBldCBkZWZcblx0ZGVmIFxcJHsxOm1ldGhvZF9uYW1lfVxuXHRcdFxcJHsyfVxuXHRlbmRcbnNuaXBwZXQgZGVmdFxuXHRkZWYgdGVzdF9cXCR7MTpjYXNlX25hbWV9XG5cdFx0XFwkezJ9XG5cdGVuZFxuc25pcHBldCBpZlxuXHRpZiBcXCR7MTpjb25kaXRpb259XG5cdFx0XFwkezJ9XG5cdGVuZFxuc25pcHBldCBpZmVcblx0aWYgXFwkezE6Y29uZGl0aW9ufVxuXHRcdFxcJHsyfVxuXHRlbHNlXG5cdFx0XFwkezN9XG5cdGVuZFxuc25pcHBldCBlbHNpZlxuXHRlbHNpZiBcXCR7MTpjb25kaXRpb259XG5cdFx0XFwkezJ9XG5zbmlwcGV0IHVubGVzc1xuXHR1bmxlc3MgXFwkezE6Y29uZGl0aW9ufVxuXHRcdFxcJHsyfVxuXHRlbmRcbnNuaXBwZXQgd2hpbGVcblx0d2hpbGUgXFwkezE6Y29uZGl0aW9ufVxuXHRcdFxcJHsyfVxuXHRlbmRcbnNuaXBwZXQgZm9yXG5cdGZvciBcXCR7MTplfSBpbiBcXCR7MjpjfVxuXHRcdFxcJHszfVxuXHRlbmRcbnNuaXBwZXQgdW50aWxcblx0dW50aWwgXFwkezE6Y29uZGl0aW9ufVxuXHRcdFxcJHsyfVxuXHRlbmRcbnNuaXBwZXQgY2xhIGNsYXNzIC4uIGVuZFxuXHRjbGFzcyBcXCR7MTpcXGBzdWJzdGl0dXRlKEZpbGVuYW1lKCksICdcXFxcKF9cXFxcfF5cXFxcKVxcXFwoLlxcXFwpJywgJ1xcXFx1XFxcXDInLCAnZycpXFxgfVxuXHRcdFxcJHsyfVxuXHRlbmRcbnNuaXBwZXQgY2xhIGNsYXNzIC4uIGluaXRpYWxpemUgLi4gZW5kXG5cdGNsYXNzIFxcJHsxOlxcYHN1YnN0aXR1dGUoRmlsZW5hbWUoKSwgJ1xcXFwoX1xcXFx8XlxcXFwpXFxcXCguXFxcXCknLCAnXFxcXHVcXFxcMicsICdnJylcXGB9XG5cdFx0ZGVmIGluaXRpYWxpemUoXFwkezI6YXJnc30pXG5cdFx0XHRcXCR7M31cblx0XHRlbmRcblx0ZW5kXG5zbmlwcGV0IGNsYSBjbGFzcyAuLiA8IFBhcmVudENsYXNzIC4uIGluaXRpYWxpemUgLi4gZW5kXG5cdGNsYXNzIFxcJHsxOlxcYHN1YnN0aXR1dGUoRmlsZW5hbWUoKSwgJ1xcXFwoX1xcXFx8XlxcXFwpXFxcXCguXFxcXCknLCAnXFxcXHVcXFxcMicsICdnJylcXGB9IDwgXFwkezI6UGFyZW50Q2xhc3N9XG5cdFx0ZGVmIGluaXRpYWxpemUoXFwkezM6YXJnc30pXG5cdFx0XHRcXCR7NH1cblx0XHRlbmRcblx0ZW5kXG5zbmlwcGV0IGNsYSBDbGFzc05hbWUgPSBTdHJ1Y3QgLi4gZG8gLi4gZW5kXG5cdFxcJHsxOlxcYHN1YnN0aXR1dGUoRmlsZW5hbWUoKSwgJ1xcXFwoX1xcXFx8XlxcXFwpXFxcXCguXFxcXCknLCAnXFxcXHVcXFxcMicsICdnJylcXGB9ID0gU3RydWN0Lm5ldyg6XFwkezI6YXR0cl9uYW1lc30pIGRvXG5cdFx0ZGVmIFxcJHszOm1ldGhvZF9uYW1lfVxuXHRcdFx0XFwkezR9XG5cdFx0ZW5kXG5cdGVuZFxuc25pcHBldCBjbGEgY2xhc3MgQmxhbmtTbGF0ZSAuLiBpbml0aWFsaXplIC4uIGVuZFxuXHRjbGFzcyBcXCR7MTpCbGFua1NsYXRlfVxuXHRcdGluc3RhbmNlX21ldGhvZHMuZWFjaCB7IHxtZXRofCB1bmRlZl9tZXRob2QobWV0aCkgdW5sZXNzIG1ldGggPX4gL1xcXFxBX18vIH1cblx0ZW5kXG5zbmlwcGV0IGNsYSBjbGFzcyA8PCBzZWxmIC4uIGVuZFxuXHRjbGFzcyA8PCBcXCR7MTpzZWxmfVxuXHRcdFxcJHsyfVxuXHRlbmRcbiMgY2xhc3MgLi4gPCBEZWxlZ2F0ZUNsYXNzIC4uIGluaXRpYWxpemUgLi4gZW5kXG5zbmlwcGV0IGNsYS1cblx0Y2xhc3MgXFwkezE6XFxgc3Vic3RpdHV0ZShGaWxlbmFtZSgpLCAnXFxcXChfXFxcXHxeXFxcXClcXFxcKC5cXFxcKScsICdcXFxcdVxcXFwyJywgJ2cnKVxcYH0gPCBEZWxlZ2F0ZUNsYXNzKFxcJHsyOlBhcmVudENsYXNzfSlcblx0XHRkZWYgaW5pdGlhbGl6ZShcXCR7MzphcmdzfSlcblx0XHRcdHN1cGVyKFxcJHs0OmRlbF9vYmp9KVxuXG5cdFx0XHRcXCR7NX1cblx0XHRlbmRcblx0ZW5kXG5zbmlwcGV0IG1vZCBtb2R1bGUgLi4gZW5kXG5cdG1vZHVsZSBcXCR7MTpcXGBzdWJzdGl0dXRlKEZpbGVuYW1lKCksICdcXFxcKF9cXFxcfF5cXFxcKVxcXFwoLlxcXFwpJywgJ1xcXFx1XFxcXDInLCAnZycpXFxgfVxuXHRcdFxcJHsyfVxuXHRlbmRcbnNuaXBwZXQgbW9kIG1vZHVsZSAuLiBtb2R1bGVfZnVuY3Rpb24gLi4gZW5kXG5cdG1vZHVsZSBcXCR7MTpcXGBzdWJzdGl0dXRlKEZpbGVuYW1lKCksICdcXFxcKF9cXFxcfF5cXFxcKVxcXFwoLlxcXFwpJywgJ1xcXFx1XFxcXDInLCAnZycpXFxgfVxuXHRcdG1vZHVsZV9mdW5jdGlvblxuXG5cdFx0XFwkezJ9XG5cdGVuZFxuc25pcHBldCBtb2QgbW9kdWxlIC4uIENsYXNzTWV0aG9kcyAuLiBlbmRcblx0bW9kdWxlIFxcJHsxOlxcYHN1YnN0aXR1dGUoRmlsZW5hbWUoKSwgJ1xcXFwoX1xcXFx8XlxcXFwpXFxcXCguXFxcXCknLCAnXFxcXHVcXFxcMicsICdnJylcXGB9XG5cdFx0bW9kdWxlIENsYXNzTWV0aG9kc1xuXHRcdFx0XFwkezJ9XG5cdFx0ZW5kXG5cblx0XHRtb2R1bGUgSW5zdGFuY2VNZXRob2RzXG5cblx0XHRlbmRcblxuXHRcdGRlZiBzZWxmLmluY2x1ZGVkKHJlY2VpdmVyKVxuXHRcdFx0cmVjZWl2ZXIuZXh0ZW5kICAgICAgICAgQ2xhc3NNZXRob2RzXG5cdFx0XHRyZWNlaXZlci5zZW5kIDppbmNsdWRlLCBJbnN0YW5jZU1ldGhvZHNcblx0XHRlbmRcblx0ZW5kXG4jIGF0dHJfcmVhZGVyXG5zbmlwcGV0IHJcblx0YXR0cl9yZWFkZXIgOlxcJHsxOmF0dHJfbmFtZXN9XG4jIGF0dHJfd3JpdGVyXG5zbmlwcGV0IHdcblx0YXR0cl93cml0ZXIgOlxcJHsxOmF0dHJfbmFtZXN9XG4jIGF0dHJfYWNjZXNzb3JcbnNuaXBwZXQgcndcblx0YXR0cl9hY2Nlc3NvciA6XFwkezE6YXR0cl9uYW1lc31cbnNuaXBwZXQgYXRwXG5cdGF0dHJfcHJvdGVjdGVkIDpcXCR7MTphdHRyX25hbWVzfVxuc25pcHBldCBhdGFcblx0YXR0cl9hY2Nlc3NpYmxlIDpcXCR7MTphdHRyX25hbWVzfVxuIyBpbmNsdWRlIEVudW1lcmFibGVcbnNuaXBwZXQgRW51bVxuXHRpbmNsdWRlIEVudW1lcmFibGVcblxuXHRkZWYgZWFjaCgmYmxvY2spXG5cdFx0XFwkezF9XG5cdGVuZFxuIyBpbmNsdWRlIENvbXBhcmFibGVcbnNuaXBwZXQgQ29tcFxuXHRpbmNsdWRlIENvbXBhcmFibGVcblxuXHRkZWYgPD0+KG90aGVyKVxuXHRcdFxcJHsxfVxuXHRlbmRcbiMgZXh0ZW5kIEZvcndhcmRhYmxlXG5zbmlwcGV0IEZvcnctXG5cdGV4dGVuZCBGb3J3YXJkYWJsZVxuIyBkZWYgc2VsZlxuc25pcHBldCBkZWZzXG5cdGRlZiBzZWxmLlxcJHsxOmNsYXNzX21ldGhvZF9uYW1lfVxuXHRcdFxcJHsyfVxuXHRlbmRcbiMgZGVmIG1ldGhvZF9taXNzaW5nXG5zbmlwcGV0IGRlZm1tXG5cdGRlZiBtZXRob2RfbWlzc2luZyhtZXRoLCAqYXJncywgJmJsaylcblx0XHRcXCR7MX1cblx0ZW5kXG5zbmlwcGV0IGRlZmRcblx0ZGVmX2RlbGVnYXRvciA6XFwkezE6QGRlbF9vYmp9LCA6XFwkezI6ZGVsX21ldGh9LCA6XFwkezM6bmV3X25hbWV9XG5zbmlwcGV0IGRlZmRzXG5cdGRlZl9kZWxlZ2F0b3JzIDpcXCR7MTpAZGVsX29ian0sIDpcXCR7MjpkZWxfbWV0aG9kc31cbnNuaXBwZXQgYW1cblx0YWxpYXNfbWV0aG9kIDpcXCR7MTpuZXdfbmFtZX0sIDpcXCR7MjpvbGRfbmFtZX1cbnNuaXBwZXQgYXBwXG5cdGlmIF9fRklMRV9fID09IFxcJFBST0dSQU1fTkFNRVxuXHRcdFxcJHsxfVxuXHRlbmRcbiMgdXNhZ2VfaWYoKVxuc25pcHBldCB1c2FpXG5cdGlmIEFSR1YuXFwkezF9XG5cdFx0YWJvcnQgXCJVc2FnZTogI3tcXCRQUk9HUkFNX05BTUV9IFxcJHsyOkFSR1NfR09fSEVSRX1cIlxcJHszfVxuXHRlbmRcbiMgdXNhZ2VfdW5sZXNzKClcbnNuaXBwZXQgdXNhdVxuXHR1bmxlc3MgQVJHVi5cXCR7MX1cblx0XHRhYm9ydCBcIlVzYWdlOiAje1xcJFBST0dSQU1fTkFNRX0gXFwkezI6QVJHU19HT19IRVJFfVwiXFwkezN9XG5cdGVuZFxuc25pcHBldCBhcnJheVxuXHRBcnJheS5uZXcoXFwkezE6MTB9KSB7IHxcXCR7MjppfXwgXFwkezN9IH1cbnNuaXBwZXQgaGFzaFxuXHRIYXNoLm5ldyB7IHxcXCR7MTpoYXNofSwgXFwkezI6a2V5fXwgXFwkMVtcXCQyXSA9IFxcJHszfSB9XG5zbmlwcGV0IGZpbGUgRmlsZS5mb3JlYWNoKCkgeyB8bGluZXwgLi4gfVxuXHRGaWxlLmZvcmVhY2goXFwkezE6XCJwYXRoL3RvL2ZpbGVcIn0pIHsgfFxcJHsyOmxpbmV9fCBcXCR7M30gfVxuc25pcHBldCBmaWxlIEZpbGUucmVhZCgpXG5cdEZpbGUucmVhZChcXCR7MTpcInBhdGgvdG8vZmlsZVwifSlcXCR7Mn1cbnNuaXBwZXQgRGlyIERpci5nbG9iYWwoKSB7IHxmaWxlfCAuLiB9XG5cdERpci5nbG9iKFxcJHsxOlwiZGlyL2dsb2IvKlwifSkgeyB8XFwkezI6ZmlsZX18IFxcJHszfSB9XG5zbmlwcGV0IERpciBEaXJbXCIuLlwiXVxuXHREaXJbXFwkezE6XCJnbG9iLyoqLyoucmJcIn1dXFwkezJ9XG5zbmlwcGV0IGRpclxuXHRGaWxlbmFtZS5kaXJuYW1lKF9fRklMRV9fKVxuc25pcHBldCBkZWxpXG5cdGRlbGV0ZV9pZiB7IHxcXCR7MTplfXwgXFwkezJ9IH1cbnNuaXBwZXQgZmlsXG5cdGZpbGwoXFwkezE6cmFuZ2V9KSB7IHxcXCR7MjppfXwgXFwkezN9IH1cbiMgZmxhdHRlbl9vbmNlKClcbnNuaXBwZXQgZmxhb1xuXHRpbmplY3QoQXJyYXkubmV3KSB7IHxcXCR7MTphcnJ9LCBcXCR7MjphfXwgXFwkMS5wdXNoKCpcXCQyKX1cXCR7M31cbnNuaXBwZXQgemlwXG5cdHppcChcXCR7MTplbnVtc30pIHsgfFxcJHsyOnJvd318IFxcJHszfSB9XG4jIGRvd250bygwKSB7IHxufCAuLiB9XG5zbmlwcGV0IGRvd1xuXHRkb3dudG8oXFwkezE6MH0pIHsgfFxcJHsyOm59fCBcXCR7M30gfVxuc25pcHBldCBzdGVcblx0c3RlcChcXCR7MToyfSkgeyB8XFwkezI6bn18IFxcJHszfSB9XG5zbmlwcGV0IHRpbVxuXHR0aW1lcyB7IHxcXCR7MTpufXwgXFwkezJ9IH1cbnNuaXBwZXQgdXB0XG5cdHVwdG8oXFwkezE6MS4wLzAuMH0pIHsgfFxcJHsyOm59fCBcXCR7M30gfVxuc25pcHBldCBsb29cblx0bG9vcCB7IFxcJHsxfSB9XG5zbmlwcGV0IGVhXG5cdGVhY2ggeyB8XFwkezE6ZX18IFxcJHsyfSB9XG5zbmlwcGV0IGVhZFxuXHRlYWNoIGRvIHxcXCR7MTplfXxcblx0XHRcXCR7Mn1cblx0ZW5kXG5zbmlwcGV0IGVhYlxuXHRlYWNoX2J5dGUgeyB8XFwkezE6Ynl0ZX18IFxcJHsyfSB9XG5zbmlwcGV0IGVhYy0gZWFjaF9jaGFyIHsgfGNocnwgLi4gfVxuXHRlYWNoX2NoYXIgeyB8XFwkezE6Y2hyfXwgXFwkezJ9IH1cbnNuaXBwZXQgZWFjLSBlYWNoX2NvbnMoLi4pIHsgfGdyb3VwfCAuLiB9XG5cdGVhY2hfY29ucyhcXCR7MToyfSkgeyB8XFwkezI6Z3JvdXB9fCBcXCR7M30gfVxuc25pcHBldCBlYWlcblx0ZWFjaF9pbmRleCB7IHxcXCR7MTppfXwgXFwkezJ9IH1cbnNuaXBwZXQgZWFpZFxuXHRlYWNoX2luZGV4IGRvIHxcXCR7MTppfXxcblx0XHRcXCR7Mn1cblx0ZW5kXG5zbmlwcGV0IGVha1xuXHRlYWNoX2tleSB7IHxcXCR7MTprZXl9fCBcXCR7Mn0gfVxuc25pcHBldCBlYWtkXG5cdGVhY2hfa2V5IGRvIHxcXCR7MTprZXl9fFxuXHRcdFxcJHsyfVxuXHRlbmRcbnNuaXBwZXQgZWFsXG5cdGVhY2hfbGluZSB7IHxcXCR7MTpsaW5lfXwgXFwkezJ9IH1cbnNuaXBwZXQgZWFsZFxuXHRlYWNoX2xpbmUgZG8gfFxcJHsxOmxpbmV9fFxuXHRcdFxcJHsyfVxuXHRlbmRcbnNuaXBwZXQgZWFwXG5cdGVhY2hfcGFpciB7IHxcXCR7MTpuYW1lfSwgXFwkezI6dmFsfXwgXFwkezN9IH1cbnNuaXBwZXQgZWFwZFxuXHRlYWNoX3BhaXIgZG8gfFxcJHsxOm5hbWV9LCBcXCR7Mjp2YWx9fFxuXHRcdFxcJHszfVxuXHRlbmRcbnNuaXBwZXQgZWFzLVxuXHRlYWNoX3NsaWNlKFxcJHsxOjJ9KSB7IHxcXCR7Mjpncm91cH18IFxcJHszfSB9XG5zbmlwcGV0IGVhc2QtXG5cdGVhY2hfc2xpY2UoXFwkezE6Mn0pIGRvIHxcXCR7Mjpncm91cH18XG5cdFx0XFwkezN9XG5cdGVuZFxuc25pcHBldCBlYXZcblx0ZWFjaF92YWx1ZSB7IHxcXCR7MTp2YWx9fCBcXCR7Mn0gfVxuc25pcHBldCBlYXZkXG5cdGVhY2hfdmFsdWUgZG8gfFxcJHsxOnZhbH18XG5cdFx0XFwkezJ9XG5cdGVuZFxuc25pcHBldCBlYXdpXG5cdGVhY2hfd2l0aF9pbmRleCB7IHxcXCR7MTplfSwgXFwkezI6aX18IFxcJHszfSB9XG5zbmlwcGV0IGVhd2lkXG5cdGVhY2hfd2l0aF9pbmRleCBkbyB8XFwkezE6ZX0sXFwkezI6aX18XG5cdFx0XFwkezN9XG5cdGVuZFxuc25pcHBldCByZXZlXG5cdHJldmVyc2VfZWFjaCB7IHxcXCR7MTplfXwgXFwkezJ9IH1cbnNuaXBwZXQgcmV2ZWRcblx0cmV2ZXJzZV9lYWNoIGRvIHxcXCR7MTplfXxcblx0XHRcXCR7Mn1cblx0ZW5kXG5zbmlwcGV0IGlualxuXHRpbmplY3QoXFwkezE6aW5pdH0pIHsgfFxcJHsyOm1lbX0sIFxcJHszOnZhcn18IFxcJHs0fSB9XG5zbmlwcGV0IGluamRcblx0aW5qZWN0KFxcJHsxOmluaXR9KSBkbyB8XFwkezI6bWVtfSwgXFwkezM6dmFyfXxcblx0XHRcXCR7NH1cblx0ZW5kXG5zbmlwcGV0IG1hcFxuXHRtYXAgeyB8XFwkezE6ZX18IFxcJHsyfSB9XG5zbmlwcGV0IG1hcGRcblx0bWFwIGRvIHxcXCR7MTplfXxcblx0XHRcXCR7Mn1cblx0ZW5kXG5zbmlwcGV0IG1hcHdpLVxuXHRlbnVtX3dpdGhfaW5kZXgubWFwIHsgfFxcJHsxOmV9LCBcXCR7MjppfXwgXFwkezN9IH1cbnNuaXBwZXQgc29yXG5cdHNvcnQgeyB8YSwgYnwgXFwkezF9IH1cbnNuaXBwZXQgc29yYlxuXHRzb3J0X2J5IHsgfFxcJHsxOmV9fCBcXCR7Mn0gfVxuc25pcHBldCByYW5cblx0c29ydF9ieSB7IHJhbmQgfVxuc25pcHBldCBhbGxcblx0YWxsPyB7IHxcXCR7MTplfXwgXFwkezJ9IH1cbnNuaXBwZXQgYW55XG5cdGFueT8geyB8XFwkezE6ZX18IFxcJHsyfSB9XG5zbmlwcGV0IGNsXG5cdGNsYXNzaWZ5IHsgfFxcJHsxOmV9fCBcXCR7Mn0gfVxuc25pcHBldCBjb2xcblx0Y29sbGVjdCB7IHxcXCR7MTplfXwgXFwkezJ9IH1cbnNuaXBwZXQgY29sZFxuXHRjb2xsZWN0IGRvIHxcXCR7MTplfXxcblx0XHRcXCR7Mn1cblx0ZW5kXG5zbmlwcGV0IGRldFxuXHRkZXRlY3QgeyB8XFwkezE6ZX18IFxcJHsyfSB9XG5zbmlwcGV0IGRldGRcblx0ZGV0ZWN0IGRvIHxcXCR7MTplfXxcblx0XHRcXCR7Mn1cblx0ZW5kXG5zbmlwcGV0IGZldFxuXHRmZXRjaChcXCR7MTpuYW1lfSkgeyB8XFwkezI6a2V5fXwgXFwkezN9IH1cbnNuaXBwZXQgZmluXG5cdGZpbmQgeyB8XFwkezE6ZX18IFxcJHsyfSB9XG5zbmlwcGV0IGZpbmRcblx0ZmluZCBkbyB8XFwkezE6ZX18XG5cdFx0XFwkezJ9XG5cdGVuZFxuc25pcHBldCBmaW5hXG5cdGZpbmRfYWxsIHsgfFxcJHsxOmV9fCBcXCR7Mn0gfVxuc25pcHBldCBmaW5hZFxuXHRmaW5kX2FsbCBkbyB8XFwkezE6ZX18XG5cdFx0XFwkezJ9XG5cdGVuZFxuc25pcHBldCBncmVcblx0Z3JlcChcXCR7MTovcGF0dGVybi99KSB7IHxcXCR7MjptYXRjaH18IFxcJHszfSB9XG5zbmlwcGV0IHN1YlxuXHRcXCR7MTpnfXN1YihcXCR7MjovcGF0dGVybi99KSB7IHxcXCR7MzptYXRjaH18IFxcJHs0fSB9XG5zbmlwcGV0IHNjYVxuXHRzY2FuKFxcJHsxOi9wYXR0ZXJuL30pIHsgfFxcJHsyOm1hdGNofXwgXFwkezN9IH1cbnNuaXBwZXQgc2NhZFxuXHRzY2FuKFxcJHsxOi9wYXR0ZXJuL30pIGRvIHxcXCR7MjptYXRjaH18XG5cdFx0XFwkezN9XG5cdGVuZFxuc25pcHBldCBtYXhcblx0bWF4IHsgfGEsIGJ8IFxcJHsxfSB9XG5zbmlwcGV0IG1pblxuXHRtaW4geyB8YSwgYnwgXFwkezF9IH1cbnNuaXBwZXQgcGFyXG5cdHBhcnRpdGlvbiB7IHxcXCR7MTplfXwgXFwkezJ9IH1cbnNuaXBwZXQgcGFyZFxuXHRwYXJ0aXRpb24gZG8gfFxcJHsxOmV9fFxuXHRcdFxcJHsyfVxuXHRlbmRcbnNuaXBwZXQgcmVqXG5cdHJlamVjdCB7IHxcXCR7MTplfXwgXFwkezJ9IH1cbnNuaXBwZXQgcmVqZFxuXHRyZWplY3QgZG8gfFxcJHsxOmV9fFxuXHRcdFxcJHsyfVxuXHRlbmRcbnNuaXBwZXQgc2VsXG5cdHNlbGVjdCB7IHxcXCR7MTplfXwgXFwkezJ9IH1cbnNuaXBwZXQgc2VsZFxuXHRzZWxlY3QgZG8gfFxcJHsxOmV9fFxuXHRcdFxcJHsyfVxuXHRlbmRcbnNuaXBwZXQgbGFtXG5cdGxhbWJkYSB7IHxcXCR7MTphcmdzfXwgXFwkezJ9IH1cbnNuaXBwZXQgZG9vXG5cdGRvXG5cdFx0XFwkezF9XG5cdGVuZFxuc25pcHBldCBkb3Zcblx0ZG8gfFxcJHsxOnZhcmlhYmxlfXxcblx0XHRcXCR7Mn1cblx0ZW5kXG5zbmlwcGV0IDpcblx0OlxcJHsxOmtleX0gPT4gXFwkezI6XCJ2YWx1ZVwifVxcJHszfVxuc25pcHBldCBvcGVcblx0b3BlbihcXCR7MTpcInBhdGgvb3IvdXJsL29yL3BpcGVcIn0sIFwiXFwkezI6d31cIikgeyB8XFwkezM6aW99fCBcXCR7NH0gfVxuIyBwYXRoX2Zyb21faGVyZSgpXG5zbmlwcGV0IGZwYXRoXG5cdEZpbGUuam9pbihGaWxlLmRpcm5hbWUoX19GSUxFX18pLCAqJTJbXFwkezE6cmVsIHBhdGggaGVyZX1dKVxcJHsyfVxuIyB1bml4X2ZpbHRlciB7fVxuc25pcHBldCB1bmlmXG5cdEFSR0YuZWFjaF9saW5lXFwkezF9IGRvIHxcXCR7MjpsaW5lfXxcblx0XHRcXCR7M31cblx0ZW5kXG4jIG9wdGlvbl9wYXJzZSB7fVxuc25pcHBldCBvcHRwXG5cdHJlcXVpcmUgXCJvcHRwYXJzZVwiXG5cblx0b3B0aW9ucyA9IHtcXCR7MTpkZWZhdWx0ID0+IFwiYXJnc1wifX1cblxuXHRBUkdWLm9wdGlvbnMgZG8gfG9wdHN8XG5cdFx0b3B0cy5iYW5uZXIgPSBcIlVzYWdlOiAje0ZpbGUuYmFzZW5hbWUoXFwkUFJPR1JBTV9OQU1FKX1cbnNuaXBwZXQgb3B0XG5cdG9wdHMub24oIFwiLVxcJHsxOm99XCIsIFwiLS1cXCR7Mjpsb25nLW9wdGlvbi1uYW1lfVwiLCBcXCR7MzpTdHJpbmd9LFxuXHQgICAgICAgICBcIlxcJHs0Ok9wdGlvbiBkZXNjcmlwdGlvbi59XCIpIGRvIHxcXCR7NTpvcHR9fFxuXHRcdFxcJHs2fVxuXHRlbmRcbnNuaXBwZXQgdGNcblx0cmVxdWlyZSBcInRlc3QvdW5pdFwiXG5cblx0cmVxdWlyZSBcIlxcJHsxOmxpYnJhcnlfZmlsZV9uYW1lfVwiXG5cblx0Y2xhc3MgVGVzdFxcJHsyOlxcJDF9IDwgVGVzdDo6VW5pdDo6VGVzdENhc2Vcblx0XHRkZWYgdGVzdF9cXCR7MzpjYXNlX25hbWV9XG5cdFx0XHRcXCR7NH1cblx0XHRlbmRcblx0ZW5kXG5zbmlwcGV0IHRzXG5cdHJlcXVpcmUgXCJ0ZXN0L3VuaXRcIlxuXG5cdHJlcXVpcmUgXCJ0Y19cXCR7MTp0ZXN0X2Nhc2VfZmlsZX1cIlxuXHRyZXF1aXJlIFwidGNfXFwkezI6dGVzdF9jYXNlX2ZpbGV9XCJcXCR7M31cbnNuaXBwZXQgYXNcblx0YXNzZXJ0IFxcJHsxOnRlc3R9LCBcIlxcJHsyOkZhaWx1cmUgbWVzc2FnZS59XCJcXCR7M31cbnNuaXBwZXQgYXNlXG5cdGFzc2VydF9lcXVhbCBcXCR7MTpleHBlY3RlZH0sIFxcJHsyOmFjdHVhbH1cXCR7M31cbnNuaXBwZXQgYXNuZVxuXHRhc3NlcnRfbm90X2VxdWFsIFxcJHsxOnVuZXhwZWN0ZWR9LCBcXCR7MjphY3R1YWx9XFwkezN9XG5zbmlwcGV0IGFzaWRcblx0YXNzZXJ0X2luX2RlbHRhIFxcJHsxOmV4cGVjdGVkX2Zsb2F0fSwgXFwkezI6YWN0dWFsX2Zsb2F0fSwgXFwkezM6MiAqKiAtMjB9XFwkezR9XG5zbmlwcGV0IGFzaW9cblx0YXNzZXJ0X2luc3RhbmNlX29mIFxcJHsxOkV4cGVjdGVkQ2xhc3N9LCBcXCR7MjphY3R1YWxfaW5zdGFuY2V9XFwkezN9XG5zbmlwcGV0IGFza29cblx0YXNzZXJ0X2tpbmRfb2YgXFwkezE6RXhwZWN0ZWRLaW5kfSwgXFwkezI6YWN0dWFsX2luc3RhbmNlfVxcJHszfVxuc25pcHBldCBhc25cblx0YXNzZXJ0X25pbCBcXCR7MTppbnN0YW5jZX1cXCR7Mn1cbnNuaXBwZXQgYXNublxuXHRhc3NlcnRfbm90X25pbCBcXCR7MTppbnN0YW5jZX1cXCR7Mn1cbnNuaXBwZXQgYXNtXG5cdGFzc2VydF9tYXRjaCAvXFwkezE6ZXhwZWN0ZWRfcGF0dGVybn0vLCBcXCR7MjphY3R1YWxfc3RyaW5nfVxcJHszfVxuc25pcHBldCBhc25tXG5cdGFzc2VydF9ub19tYXRjaCAvXFwkezE6dW5leHBlY3RlZF9wYXR0ZXJufS8sIFxcJHsyOmFjdHVhbF9zdHJpbmd9XFwkezN9XG5zbmlwcGV0IGFzb1xuXHRhc3NlcnRfb3BlcmF0b3IgXFwkezE6bGVmdH0sIDpcXCR7MjpvcGVyYXRvcn0sIFxcJHszOnJpZ2h0fVxcJHs0fVxuc25pcHBldCBhc3Jcblx0YXNzZXJ0X3JhaXNlIFxcJHsxOkV4Y2VwdGlvbn0geyBcXCR7Mn0gfVxuc25pcHBldCBhc3JkXG5cdGFzc2VydF9yYWlzZSBcXCR7MTpFeGNlcHRpb259IGRvXG5cdFx0XFwkezJ9XG5cdGVuZFxuc25pcHBldCBhc25yXG5cdGFzc2VydF9ub3RoaW5nX3JhaXNlZCBcXCR7MTpFeGNlcHRpb259IHsgXFwkezJ9IH1cbnNuaXBwZXQgYXNucmRcblx0YXNzZXJ0X25vdGhpbmdfcmFpc2VkIFxcJHsxOkV4Y2VwdGlvbn0gZG9cblx0XHRcXCR7Mn1cblx0ZW5kXG5zbmlwcGV0IGFzcnRcblx0YXNzZXJ0X3Jlc3BvbmRfdG8gXFwkezE6b2JqZWN0fSwgOlxcJHsyOm1ldGhvZH1cXCR7M31cbnNuaXBwZXQgYXNzIGFzc2VydF9zYW1lKC4uKVxuXHRhc3NlcnRfc2FtZSBcXCR7MTpleHBlY3RlZH0sIFxcJHsyOmFjdHVhbH1cXCR7M31cbnNuaXBwZXQgYXNzIGFzc2VydF9zZW5kKC4uKVxuXHRhc3NlcnRfc2VuZCBbXFwkezE6b2JqZWN0fSwgOlxcJHsyOm1lc3NhZ2V9LCBcXCR7MzphcmdzfV1cXCR7NH1cbnNuaXBwZXQgYXNuc1xuXHRhc3NlcnRfbm90X3NhbWUgXFwkezE6dW5leHBlY3RlZH0sIFxcJHsyOmFjdHVhbH1cXCR7M31cbnNuaXBwZXQgYXN0XG5cdGFzc2VydF90aHJvd3MgOlxcJHsxOmV4cGVjdGVkfSB7IFxcJHsyfSB9XG5zbmlwcGV0IGFzdGRcblx0YXNzZXJ0X3Rocm93cyA6XFwkezE6ZXhwZWN0ZWR9IGRvXG5cdFx0XFwkezJ9XG5cdGVuZFxuc25pcHBldCBhc250XG5cdGFzc2VydF9ub3RoaW5nX3Rocm93biB7IFxcJHsxfSB9XG5zbmlwcGV0IGFzbnRkXG5cdGFzc2VydF9ub3RoaW5nX3Rocm93biBkb1xuXHRcdFxcJHsxfVxuXHRlbmRcbnNuaXBwZXQgZmxcblx0Zmx1bmsgXCJcXCR7MTpGYWlsdXJlIG1lc3NhZ2UufVwiXFwkezJ9XG4jIEJlbmNobWFyay5ibWJtIGRvIC4uIGVuZFxuc25pcHBldCBibS1cblx0VEVTVFMgPSBcXCR7MToxMF8wMDB9XG5cdEJlbmNobWFyay5ibWJtIGRvIHxyZXN1bHRzfFxuXHRcdFxcJHsyfVxuXHRlbmRcbnNuaXBwZXQgcmVwXG5cdHJlc3VsdHMucmVwb3J0KFwiXFwkezE6bmFtZX06XCIpIHsgVEVTVFMudGltZXMgeyBcXCR7Mn0gfX1cbiMgTWFyc2hhbC5kdW1wKC4uLCBmaWxlKVxuc25pcHBldCBNZFxuXHRGaWxlLm9wZW4oXFwkezE6XCJwYXRoL3RvL2ZpbGUuZHVtcFwifSwgXCJ3YlwiKSB7IHxcXCR7MjpmaWxlfXwgTWFyc2hhbC5kdW1wKFxcJHszOm9ian0sIFxcJDIpIH1cXCR7NH1cbiMgTWFzaGFsLmxvYWQob2JqKVxuc25pcHBldCBNbFxuXHRGaWxlLm9wZW4oXFwkezE6XCJwYXRoL3RvL2ZpbGUuZHVtcFwifSwgXCJyYlwiKSB7IHxcXCR7MjpmaWxlfXwgTWFyc2hhbC5sb2FkKFxcJDIpIH1cXCR7M31cbiMgZGVlcF9jb3B5KC4uKVxuc25pcHBldCBkZWVjXG5cdE1hcnNoYWwubG9hZChNYXJzaGFsLmR1bXAoXFwkezE6b2JqX3RvX2NvcHl9KSlcXCR7Mn1cbnNuaXBwZXQgUG4tXG5cdFBTdG9yZS5uZXcoXFwkezE6XCJmaWxlX25hbWUucHN0b3JlXCJ9KVxcJHsyfVxuc25pcHBldCB0cmFcblx0dHJhbnNhY3Rpb24oXFwkezE6dHJ1ZX0pIHsgXFwkezJ9IH1cbiMgeG1scmVhZCguLilcbnNuaXBwZXQgeG1sLVxuXHRSRVhNTDo6RG9jdW1lbnQubmV3KEZpbGUucmVhZChcXCR7MTpcInBhdGgvdG8vZmlsZVwifSkpXFwkezJ9XG4jIHhwYXRoKC4uKSB7IC4uIH1cbnNuaXBwZXQgeHBhXG5cdGVsZW1lbnRzLmVhY2goXFwkezE6XCIvL1hwYXRoXCJ9KSBkbyB8XFwkezI6bm9kZX18XG5cdFx0XFwkezN9XG5cdGVuZFxuIyBjbGFzc19mcm9tX25hbWUoKVxuc25pcHBldCBjbGFmblxuXHRzcGxpdChcIjo6XCIpLmluamVjdChPYmplY3QpIHsgfHBhciwgY29uc3R8IHBhci5jb25zdF9nZXQoY29uc3QpIH1cbiMgc2luZ2xldG9uX2NsYXNzKClcbnNuaXBwZXQgc2luY1xuXHRjbGFzcyA8PCBzZWxmOyBzZWxmIGVuZFxuc25pcHBldCBuYW1cblx0bmFtZXNwYWNlIDpcXCR7MTpcXGBGaWxlbmFtZSgpXFxgfSBkb1xuXHRcdFxcJHsyfVxuXHRlbmRcbnNuaXBwZXQgdGFzXG5cdGRlc2MgXCJcXCR7MTpUYXNrIGRlc2NyaXB0aW9ufVwiXG5cdHRhc2sgOlxcJHsyOnRhc2tfbmFtZSA9PiBbOmRlcGVuZGVudCwgOnRhc2tzXX0gZG9cblx0XHRcXCR7M31cblx0ZW5kXG4jIGJsb2NrXG5zbmlwcGV0IGJcblx0eyB8XFwkezE6dmFyfXwgXFwkezJ9IH1cbnNuaXBwZXQgYmVnaW5cblx0YmVnaW5cblx0XHRyYWlzZSAnQSB0ZXN0IGV4Y2VwdGlvbi4nXG5cdHJlc2N1ZSBFeGNlcHRpb24gPT4gZVxuXHRcdHB1dHMgZS5tZXNzYWdlXG5cdFx0cHV0cyBlLmJhY2t0cmFjZS5pbnNwZWN0XG5cdGVsc2Vcblx0XHQjIG90aGVyIGV4Y2VwdGlvblxuXHRlbnN1cmVcblx0XHQjIGFsd2F5cyBleGVjdXRlZFxuXHRlbmRcblxuI2RlYnVnZ2luZ1xuc25pcHBldCBkZWJ1Z1xuXHRyZXF1aXJlICdydWJ5LWRlYnVnJzsgZGVidWdnZXI7IHRydWU7XG5zbmlwcGV0IHByeVxuXHRyZXF1aXJlICdwcnknOyBiaW5kaW5nLnByeVxuXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgUmFpbHMgc25pcHBldHMgLSBmb3IgcHVyZSBSdWJ5LCBzZWUgYWJvdmUgI1xuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5zbmlwcGV0IGFydFxuXHRhc3NlcnRfcmVkaXJlY3RlZF90byBcXCR7MTo6YWN0aW9uID0+IFwiXFwkezI6aW5kZXh9XCJ9XG5zbmlwcGV0IGFydG5wXG5cdGFzc2VydF9yZWRpcmVjdGVkX3RvIFxcJHsxOnBhcmVudH1fXFwkezI6Y2hpbGR9X3BhdGgoXFwkezM6QFxcJDF9LCBcXCR7NDpAXFwkMn0pXG5zbmlwcGV0IGFydG5wcFxuXHRhc3NlcnRfcmVkaXJlY3RlZF90byBcXCR7MTpwYXJlbnR9X1xcJHsyOmNoaWxkfV9wYXRoKFxcJHszOkBcXCQxfSlcbnNuaXBwZXQgYXJ0cFxuXHRhc3NlcnRfcmVkaXJlY3RlZF90byBcXCR7MTptb2RlbH1fcGF0aChcXCR7MjpAXFwkMX0pXG5zbmlwcGV0IGFydHBwXG5cdGFzc2VydF9yZWRpcmVjdGVkX3RvIFxcJHsxOm1vZGVsfXNfcGF0aFxuc25pcHBldCBhc2Rcblx0YXNzZXJ0X2RpZmZlcmVuY2UgXCJcXCR7MTpNb2RlbH0uXFwkezI6Y291bnR9XCIsIFxcJDEgZG9cblx0XHRcXCR7M31cblx0ZW5kXG5zbmlwcGV0IGFzbmRcblx0YXNzZXJ0X25vX2RpZmZlcmVuY2UgXCJcXCR7MTpNb2RlbH0uXFwkezI6Y291bnR9XCIgZG9cblx0XHRcXCR7M31cblx0ZW5kXG5zbmlwcGV0IGFzcmVcblx0YXNzZXJ0X3Jlc3BvbnNlIDpcXCR7MTpzdWNjZXNzfSwgQHJlc3BvbnNlLmJvZHlcXCR7Mn1cbnNuaXBwZXQgYXNyalxuXHRhc3NlcnRfcmpzIDpcXCR7MTpyZXBsYWNlfSwgXCJcXCR7Mjpkb20gaWR9XCJcbnNuaXBwZXQgYXNzIGFzc2VydF9zZWxlY3QoLi4pXG5cdGFzc2VydF9zZWxlY3QgJ1xcJHsxOnBhdGh9JywgOlxcJHsyOnRleHR9ID0+ICdcXCR7Mzppbm5lcl9odG1sJyBcXCR7NDpkb31cbnNuaXBwZXQgYmZcblx0YmVmb3JlX2ZpbHRlciA6XFwkezE6bWV0aG9kfVxuc25pcHBldCBidFxuXHRiZWxvbmdzX3RvIDpcXCR7MTphc3NvY2lhdGlvbn1cbnNuaXBwZXQgY3J3XG5cdGNhdHRyX2FjY2Vzc29yIDpcXCR7MTphdHRyX25hbWVzfVxuc25pcHBldCBkZWZjcmVhdGVcblx0ZGVmIGNyZWF0ZVxuXHRcdEBcXCR7MTptb2RlbF9jbGFzc19uYW1lfSA9IFxcJHsyOk1vZGVsQ2xhc3NOYW1lfS5uZXcocGFyYW1zWzpcXCQxXSlcblxuXHRcdHJlc3BvbmRfdG8gZG8gfHdhbnRzfFxuXHRcdFx0aWYgQFxcJDEuc2F2ZVxuXHRcdFx0XHRmbGFzaFs6bm90aWNlXSA9ICdcXCQyIHdhcyBzdWNjZXNzZnVsbHkgY3JlYXRlZC4nXG5cdFx0XHRcdHdhbnRzLmh0bWwgeyByZWRpcmVjdF90byhAXFwkMSkgfVxuXHRcdFx0XHR3YW50cy54bWwgIHsgcmVuZGVyIDp4bWwgPT4gQFxcJDEsIDpzdGF0dXMgPT4gOmNyZWF0ZWQsIDpsb2NhdGlvbiA9PiBAXFwkMSB9XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHdhbnRzLmh0bWwgeyByZW5kZXIgOmFjdGlvbiA9PiBcIm5ld1wiIH1cblx0XHRcdFx0d2FudHMueG1sICB7IHJlbmRlciA6eG1sID0+IEBcXCQxLmVycm9ycywgOnN0YXR1cyA9PiA6dW5wcm9jZXNzYWJsZV9lbnRpdHkgfVxuXHRcdFx0ZW5kXG5cdFx0ZW5kXG5cdGVuZFxcJHszfVxuc25pcHBldCBkZWZkZXN0cm95XG5cdGRlZiBkZXN0cm95XG5cdFx0QFxcJHsxOm1vZGVsX2NsYXNzX25hbWV9ID0gXFwkezI6TW9kZWxDbGFzc05hbWV9LmZpbmQocGFyYW1zWzppZF0pXG5cdFx0QFxcJDEuZGVzdHJveVxuXG5cdFx0cmVzcG9uZF90byBkbyB8d2FudHN8XG5cdFx0XHR3YW50cy5odG1sIHsgcmVkaXJlY3RfdG8oXFwkMXNfdXJsKSB9XG5cdFx0XHR3YW50cy54bWwgIHsgaGVhZCA6b2sgfVxuXHRcdGVuZFxuXHRlbmRcXCR7M31cbnNuaXBwZXQgZGVmZWRpdFxuXHRkZWYgZWRpdFxuXHRcdEBcXCR7MTptb2RlbF9jbGFzc19uYW1lfSA9IFxcJHsyOk1vZGVsQ2xhc3NOYW1lfS5maW5kKHBhcmFtc1s6aWRdKVxuXHRlbmRcbnNuaXBwZXQgZGVmaW5kZXhcblx0ZGVmIGluZGV4XG5cdFx0QFxcJHsxOm1vZGVsX2NsYXNzX25hbWV9ID0gXFwkezI6TW9kZWxDbGFzc05hbWV9LmFsbFxuXG5cdFx0cmVzcG9uZF90byBkbyB8d2FudHN8XG5cdFx0XHR3YW50cy5odG1sICMgaW5kZXguaHRtbC5lcmJcblx0XHRcdHdhbnRzLnhtbCAgeyByZW5kZXIgOnhtbCA9PiBAXFwkMXMgfVxuXHRcdGVuZFxuXHRlbmRcXCR7M31cbnNuaXBwZXQgZGVmbmV3XG5cdGRlZiBuZXdcblx0XHRAXFwkezE6bW9kZWxfY2xhc3NfbmFtZX0gPSBcXCR7MjpNb2RlbENsYXNzTmFtZX0ubmV3XG5cblx0XHRyZXNwb25kX3RvIGRvIHx3YW50c3xcblx0XHRcdHdhbnRzLmh0bWwgIyBuZXcuaHRtbC5lcmJcblx0XHRcdHdhbnRzLnhtbCAgeyByZW5kZXIgOnhtbCA9PiBAXFwkMSB9XG5cdFx0ZW5kXG5cdGVuZFxcJHszfVxuc25pcHBldCBkZWZzaG93XG5cdGRlZiBzaG93XG5cdFx0QFxcJHsxOm1vZGVsX2NsYXNzX25hbWV9ID0gXFwkezI6TW9kZWxDbGFzc05hbWV9LmZpbmQocGFyYW1zWzppZF0pXG5cblx0XHRyZXNwb25kX3RvIGRvIHx3YW50c3xcblx0XHRcdHdhbnRzLmh0bWwgIyBzaG93Lmh0bWwuZXJiXG5cdFx0XHR3YW50cy54bWwgIHsgcmVuZGVyIDp4bWwgPT4gQFxcJDEgfVxuXHRcdGVuZFxuXHRlbmRcXCR7M31cbnNuaXBwZXQgZGVmdXBkYXRlXG5cdGRlZiB1cGRhdGVcblx0XHRAXFwkezE6bW9kZWxfY2xhc3NfbmFtZX0gPSBcXCR7MjpNb2RlbENsYXNzTmFtZX0uZmluZChwYXJhbXNbOmlkXSlcblxuXHRcdHJlc3BvbmRfdG8gZG8gfHdhbnRzfFxuXHRcdFx0aWYgQFxcJDEudXBkYXRlX2F0dHJpYnV0ZXMocGFyYW1zWzpcXCQxXSlcblx0XHRcdFx0Zmxhc2hbOm5vdGljZV0gPSAnXFwkMiB3YXMgc3VjY2Vzc2Z1bGx5IHVwZGF0ZWQuJ1xuXHRcdFx0XHR3YW50cy5odG1sIHsgcmVkaXJlY3RfdG8oQFxcJDEpIH1cblx0XHRcdFx0d2FudHMueG1sICB7IGhlYWQgOm9rIH1cblx0XHRcdGVsc2Vcblx0XHRcdFx0d2FudHMuaHRtbCB7IHJlbmRlciA6YWN0aW9uID0+IFwiZWRpdFwiIH1cblx0XHRcdFx0d2FudHMueG1sICB7IHJlbmRlciA6eG1sID0+IEBcXCQxLmVycm9ycywgOnN0YXR1cyA9PiA6dW5wcm9jZXNzYWJsZV9lbnRpdHkgfVxuXHRcdFx0ZW5kXG5cdFx0ZW5kXG5cdGVuZFxcJHszfVxuc25pcHBldCBmbGFzaFxuXHRmbGFzaFs6XFwkezE6bm90aWNlfV0gPSBcIlxcJHsyfVwiXG5zbmlwcGV0IGhhYnRtXG5cdGhhc19hbmRfYmVsb25nc190b19tYW55IDpcXCR7MTpvYmplY3R9LCA6am9pbl90YWJsZSA9PiBcIlxcJHsyOnRhYmxlX25hbWV9XCIsIDpmb3JlaWduX2tleSA9PiBcIlxcJHszfV9pZFwiXFwkezR9XG5zbmlwcGV0IGhtXG5cdGhhc19tYW55IDpcXCR7MTpvYmplY3R9XG5zbmlwcGV0IGhtZFxuXHRoYXNfbWFueSA6XFwkezE6b3RoZXJ9cywgOmNsYXNzX25hbWUgPT4gXCJcXCR7MjpcXCQxfVwiLCA6Zm9yZWlnbl9rZXkgPT4gXCJcXCR7MzpcXCQxfV9pZFwiLCA6ZGVwZW5kZW50ID0+IDpkZXN0cm95XFwkezR9XG5zbmlwcGV0IGhtdFxuXHRoYXNfbWFueSA6XFwkezE6b2JqZWN0fSwgOnRocm91Z2ggPT4gOlxcJHsyOm9iamVjdH1cbnNuaXBwZXQgaG9cblx0aGFzX29uZSA6XFwkezE6b2JqZWN0fVxuc25pcHBldCBpMThcblx0STE4bi50KCdcXCR7MTp0eXBlLmtleX0nKVxcJHsyfVxuc25pcHBldCBpc3Rcblx0PCU9IGltYWdlX3N1Ym1pdF90YWcoXCJcXCR7MTphZ3JlZS5wbmd9XCIsIDppZCA9PiBcIlxcJHsyOmlkfVwiXFwkezN9ICU+XG5zbmlwcGV0IGxvZ1xuXHRSYWlscy5sb2dnZXIuXFwkezE6ZGVidWd9IFxcJHsyfVxuc25pcHBldCBsb2cyXG5cdFJBSUxTX0RFRkFVTFRfTE9HR0VSLlxcJHsxOmRlYnVnfSBcXCR7Mn1cbnNuaXBwZXQgbG9nZFxuXHRsb2dnZXIuZGVidWcgeyBcIlxcJHsxOm1lc3NhZ2V9XCIgfVxcJHsyfVxuc25pcHBldCBsb2dlXG5cdGxvZ2dlci5lcnJvciB7IFwiXFwkezE6bWVzc2FnZX1cIiB9XFwkezJ9XG5zbmlwcGV0IGxvZ2Zcblx0bG9nZ2VyLmZhdGFsIHsgXCJcXCR7MTptZXNzYWdlfVwiIH1cXCR7Mn1cbnNuaXBwZXQgbG9naVxuXHRsb2dnZXIuaW5mbyB7IFwiXFwkezE6bWVzc2FnZX1cIiB9XFwkezJ9XG5zbmlwcGV0IGxvZ3dcblx0bG9nZ2VyLndhcm4geyBcIlxcJHsxOm1lc3NhZ2V9XCIgfVxcJHsyfVxuc25pcHBldCBtYXBjXG5cdFxcJHsxOm1hcH0uXFwkezI6Y29ubmVjdH0gJ1xcJHszOmNvbnRyb2xsZXIvOmFjdGlvbi86aWR9J1xuc25pcHBldCBtYXBjYVxuXHRcXCR7MTptYXB9LmNhdGNoX2FsbCBcIipcXCR7Mjphbnl0aGluZ31cIiwgOmNvbnRyb2xsZXIgPT4gXCJcXCR7MzpkZWZhdWx0fVwiLCA6YWN0aW9uID0+IFwiXFwkezQ6ZXJyb3J9XCJcXCR7NX1cbnNuaXBwZXQgbWFwclxuXHRcXCR7MTptYXB9LnJlc291cmNlIDpcXCR7MjpyZXNvdXJjZX1cbnNuaXBwZXQgbWFwcnNcblx0XFwkezE6bWFwfS5yZXNvdXJjZXMgOlxcJHsyOnJlc291cmNlfVxuc25pcHBldCBtYXB3b1xuXHRcXCR7MTptYXB9LndpdGhfb3B0aW9ucyA6XFwkezI6Y29udHJvbGxlcn0gPT4gJ1xcJHszOnRoaW5nfScgZG8gfFxcJDN8XG5cdFx0XFwkezR9XG5cdGVuZFxuc25pcHBldCBtYnNcblx0YmVmb3JlX3NhdmUgOlxcJHsxOm1ldGhvZH1cbnNuaXBwZXQgbWNodFxuXHRjaGFuZ2VfdGFibGUgOlxcJHsxOnRhYmxlX25hbWV9IGRvIHx0fFxuXHRcdFxcJHsyfVxuXHRlbmRcbnNuaXBwZXQgbXBcblx0bWFwKCY6XFwkezE6aWR9KVxuc25pcHBldCBtcndcblx0bWF0dHJfYWNjZXNzb3IgOlxcJHsxOmF0dHJfbmFtZXN9XG5zbmlwcGV0IG9hXG5cdG9yZGVyKFwiXFwkezE6ZmllbGR9XCIpXG5zbmlwcGV0IG9kXG5cdG9yZGVyKFwiXFwkezE6ZmllbGR9IERFU0NcIilcbnNuaXBwZXQgcGFcblx0cGFyYW1zWzpcXCR7MTppZH1dXFwkezJ9XG5zbmlwcGV0IHJhXG5cdHJlbmRlciA6YWN0aW9uID0+IFwiXFwkezE6YWN0aW9ufVwiXG5zbmlwcGV0IHJhbFxuXHRyZW5kZXIgOmFjdGlvbiA9PiBcIlxcJHsxOmFjdGlvbn1cIiwgOmxheW91dCA9PiBcIlxcJHsyOmxheW91dG5hbWV9XCJcbnNuaXBwZXQgcmVzdFxuXHRyZXNwb25kX3RvIGRvIHx3YW50c3xcblx0XHR3YW50cy5cXCR7MTpodG1sfSB7IFxcJHsyfSB9XG5cdGVuZFxuc25pcHBldCByZlxuXHRyZW5kZXIgOmZpbGUgPT4gXCJcXCR7MTpmaWxlcGF0aH1cIlxuc25pcHBldCByZnVcblx0cmVuZGVyIDpmaWxlID0+IFwiXFwkezE6ZmlsZXBhdGh9XCIsIDp1c2VfZnVsbF9wYXRoID0+IFxcJHsyOmZhbHNlfVxuc25pcHBldCByaVxuXHRyZW5kZXIgOmlubGluZSA9PiBcIlxcJHsxOjwlPSAnaGVsbG8nICU+fVwiXG5zbmlwcGV0IHJpbFxuXHRyZW5kZXIgOmlubGluZSA9PiBcIlxcJHsxOjwlPSAnaGVsbG8nICU+fVwiLCA6bG9jYWxzID0+IHsgXFwkezI6Om5hbWV9ID0+IFwiXFwkezM6dmFsdWV9XCJcXCR7NH0gfVxuc25pcHBldCByaXRcblx0cmVuZGVyIDppbmxpbmUgPT4gXCJcXCR7MTo8JT0gJ2hlbGxvJyAlPn1cIiwgOnR5cGUgPT4gXFwkezI6OnJ4bWx9XG5zbmlwcGV0IHJqc29uXG5cdHJlbmRlciA6anNvbiA9PiBcXCR7MTp0ZXh0IHRvIHJlbmRlcn1cbnNuaXBwZXQgcmxcblx0cmVuZGVyIDpsYXlvdXQgPT4gXCJcXCR7MTpsYXlvdXRuYW1lfVwiXG5zbmlwcGV0IHJuXG5cdHJlbmRlciA6bm90aGluZyA9PiBcXCR7MTp0cnVlfVxuc25pcHBldCBybnNcblx0cmVuZGVyIDpub3RoaW5nID0+IFxcJHsxOnRydWV9LCA6c3RhdHVzID0+IFxcJHsyOjQwMX1cbnNuaXBwZXQgcnBcblx0cmVuZGVyIDpwYXJ0aWFsID0+IFwiXFwkezE6aXRlbX1cIlxuc25pcHBldCBycGNcblx0cmVuZGVyIDpwYXJ0aWFsID0+IFwiXFwkezE6aXRlbX1cIiwgOmNvbGxlY3Rpb24gPT4gXFwkezI6QFxcJDFzfVxuc25pcHBldCBycGxcblx0cmVuZGVyIDpwYXJ0aWFsID0+IFwiXFwkezE6aXRlbX1cIiwgOmxvY2FscyA9PiB7IDpcXCR7MjpcXCQxfSA9PiBcXCR7MzpAXFwkMX1cbnNuaXBwZXQgcnBvXG5cdHJlbmRlciA6cGFydGlhbCA9PiBcIlxcJHsxOml0ZW19XCIsIDpvYmplY3QgPT4gXFwkezI6QFxcJDF9XG5zbmlwcGV0IHJwc1xuXHRyZW5kZXIgOnBhcnRpYWwgPT4gXCJcXCR7MTppdGVtfVwiLCA6c3RhdHVzID0+IFxcJHsyOjUwMH1cbnNuaXBwZXQgcnRcblx0cmVuZGVyIDp0ZXh0ID0+IFwiXFwkezE6dGV4dCB0byByZW5kZXJ9XCJcbnNuaXBwZXQgcnRsXG5cdHJlbmRlciA6dGV4dCA9PiBcIlxcJHsxOnRleHQgdG8gcmVuZGVyfVwiLCA6bGF5b3V0ID0+IFwiXFwkezI6bGF5b3V0bmFtZX1cIlxuc25pcHBldCBydGx0XG5cdHJlbmRlciA6dGV4dCA9PiBcIlxcJHsxOnRleHQgdG8gcmVuZGVyfVwiLCA6bGF5b3V0ID0+IFxcJHsyOnRydWV9XG5zbmlwcGV0IHJ0c1xuXHRyZW5kZXIgOnRleHQgPT4gXCJcXCR7MTp0ZXh0IHRvIHJlbmRlcn1cIiwgOnN0YXR1cyA9PiBcXCR7Mjo0MDF9XG5zbmlwcGV0IHJ1XG5cdHJlbmRlciA6dXBkYXRlIGRvIHxcXCR7MTpwYWdlfXxcblx0XHRcXCQxLlxcJHsyfVxuXHRlbmRcbnNuaXBwZXQgcnhtbFxuXHRyZW5kZXIgOnhtbCA9PiBcXCR7MTp0ZXh0IHRvIHJlbmRlcn1cbnNuaXBwZXQgc2Ncblx0c2NvcGUgOlxcJHsxOm5hbWV9LCA6d2hlcmUoOkBcXCR7MjpmaWVsZH0gPT4gXFwkezM6dmFsdWV9KVxuc25pcHBldCBzbFxuXHRzY29wZSA6XFwkezE6bmFtZX0sIGxhbWJkYSBkbyB8XFwkezI6dmFsdWV9fFxuXHRcdHdoZXJlKFwiXFwkezM6ZmllbGQgPSA/fVwiLCBcXCR7NDpiaW5kIHZhcn0pXG5cdGVuZFxuc25pcHBldCBzaGExXG5cdERpZ2VzdDo6U0hBMS5oZXhkaWdlc3QoXFwkezE6c3RyaW5nfSlcbnNuaXBwZXQgc3dlZXBlclxuXHRjbGFzcyBcXCR7MTpNb2RlbENsYXNzTmFtZX1Td2VlcGVyIDwgQWN0aW9uQ29udHJvbGxlcjo6Q2FjaGluZzo6U3dlZXBlclxuXHRcdG9ic2VydmUgXFwkMVxuXG5cdFx0ZGVmIGFmdGVyX3NhdmUoXFwkezI6bW9kZWxfY2xhc3NfbmFtZX0pXG5cdFx0XHRleHBpcmVfY2FjaGUoXFwkMilcblx0XHRlbmRcblxuXHRcdGRlZiBhZnRlcl9kZXN0cm95KFxcJDIpXG5cdFx0XHRleHBpcmVfY2FjaGUoXFwkMilcblx0XHRlbmRcblxuXHRcdGRlZiBleHBpcmVfY2FjaGUoXFwkMilcblx0XHRcdGV4cGlyZV9wYWdlXG5cdFx0ZW5kXG5cdGVuZFxuc25pcHBldCB0Y2Jcblx0dC5ib29sZWFuIDpcXCR7MTp0aXRsZX1cblx0XFwkezJ9XG5zbmlwcGV0IHRjYmlcblx0dC5iaW5hcnkgOlxcJHsxOnRpdGxlfSwgOmxpbWl0ID0+IFxcJHsyOjJ9Lm1lZ2FieXRlc1xuXHRcXCR7M31cbnNuaXBwZXQgdGNkXG5cdHQuZGVjaW1hbCA6XFwkezE6dGl0bGV9LCA6cHJlY2lzaW9uID0+IFxcJHsyOjEwfSwgOnNjYWxlID0+IFxcJHszOjJ9XG5cdFxcJHs0fVxuc25pcHBldCB0Y2RhXG5cdHQuZGF0ZSA6XFwkezE6dGl0bGV9XG5cdFxcJHsyfVxuc25pcHBldCB0Y2R0XG5cdHQuZGF0ZXRpbWUgOlxcJHsxOnRpdGxlfVxuXHRcXCR7Mn1cbnNuaXBwZXQgdGNmXG5cdHQuZmxvYXQgOlxcJHsxOnRpdGxlfVxuXHRcXCR7Mn1cbnNuaXBwZXQgdGNoXG5cdHQuY2hhbmdlIDpcXCR7MTpuYW1lfSwgOlxcJHsyOnN0cmluZ30sIDpcXCR7MzpsaW1pdH0gPT4gXFwkezQ6ODB9XG5cdFxcJHs1fVxuc25pcHBldCB0Y2lcblx0dC5pbnRlZ2VyIDpcXCR7MTp0aXRsZX1cblx0XFwkezJ9XG5zbmlwcGV0IHRjbFxuXHR0LmludGVnZXIgOmxvY2tfdmVyc2lvbiwgOm51bGwgPT4gZmFsc2UsIDpkZWZhdWx0ID0+IDBcblx0XFwkezF9XG5zbmlwcGV0IHRjclxuXHR0LnJlZmVyZW5jZXMgOlxcJHsxOnRhZ2dhYmxlfSwgOnBvbHltb3JwaGljID0+IHsgOmRlZmF1bHQgPT4gJ1xcJHsyOlBob3RvfScgfVxuXHRcXCR7M31cbnNuaXBwZXQgdGNzXG5cdHQuc3RyaW5nIDpcXCR7MTp0aXRsZX1cblx0XFwkezJ9XG5zbmlwcGV0IHRjdFxuXHR0LnRleHQgOlxcJHsxOnRpdGxlfVxuXHRcXCR7Mn1cbnNuaXBwZXQgdGN0aVxuXHR0LnRpbWUgOlxcJHsxOnRpdGxlfVxuXHRcXCR7Mn1cbnNuaXBwZXQgdGN0c1xuXHR0LnRpbWVzdGFtcCA6XFwkezE6dGl0bGV9XG5cdFxcJHsyfVxuc25pcHBldCB0Y3Rzc1xuXHR0LnRpbWVzdGFtcHNcblx0XFwkezF9XG5zbmlwcGV0IHZhXG5cdHZhbGlkYXRlc19hc3NvY2lhdGVkIDpcXCR7MTphdHRyaWJ1dGV9XG5zbmlwcGV0IHZhb1xuXHR2YWxpZGF0ZXNfYWNjZXB0YW5jZV9vZiA6XFwkezE6dGVybXN9XG5zbmlwcGV0IHZjXG5cdHZhbGlkYXRlc19jb25maXJtYXRpb25fb2YgOlxcJHsxOmF0dHJpYnV0ZX1cbnNuaXBwZXQgdmVcblx0dmFsaWRhdGVzX2V4Y2x1c2lvbl9vZiA6XFwkezE6YXR0cmlidXRlfSwgOmluID0+IFxcJHsyOiV3KCBtb3YgYXZpICl9XG5zbmlwcGV0IHZmXG5cdHZhbGlkYXRlc19mb3JtYXRfb2YgOlxcJHsxOmF0dHJpYnV0ZX0sIDp3aXRoID0+IC9cXCR7MjpyZWdleH0vXG5zbmlwcGV0IHZpXG5cdHZhbGlkYXRlc19pbmNsdXNpb25fb2YgOlxcJHsxOmF0dHJpYnV0ZX0sIDppbiA9PiAldyhcXCR7MjogbW92IGF2aSB9KVxuc25pcHBldCB2bFxuXHR2YWxpZGF0ZXNfbGVuZ3RoX29mIDpcXCR7MTphdHRyaWJ1dGV9LCA6d2l0aGluID0+IFxcJHsyOjN9Li5cXCR7MzoyMH1cbnNuaXBwZXQgdm5cblx0dmFsaWRhdGVzX251bWVyaWNhbGl0eV9vZiA6XFwkezE6YXR0cmlidXRlfVxuc25pcHBldCB2cG9cblx0dmFsaWRhdGVzX3ByZXNlbmNlX29mIDpcXCR7MTphdHRyaWJ1dGV9XG5zbmlwcGV0IHZ1XG5cdHZhbGlkYXRlc191bmlxdWVuZXNzX29mIDpcXCR7MTphdHRyaWJ1dGV9XG5zbmlwcGV0IHdhbnRzXG5cdHdhbnRzLlxcJHsxOmpzfHhtbHxodG1sfSB7IFxcJHsyfSB9XG5zbmlwcGV0IHdjXG5cdHdoZXJlKFxcJHsxOlwiY29uZGl0aW9uc1wifVxcJHsyOiwgYmluZF92YXJ9KVxuc25pcHBldCB3aFxuXHR3aGVyZShcXCR7MTpmaWVsZH0gPT4gXFwkezI6dmFsdWV9KVxuc25pcHBldCB4ZGVsZXRlXG5cdHhociA6ZGVsZXRlLCA6XFwkezE6ZGVzdHJveX0sIDppZCA9PiBcXCR7MjoxfVxcJHszfVxuc25pcHBldCB4Z2V0XG5cdHhociA6Z2V0LCA6XFwkezE6c2hvd30sIDppZCA9PiBcXCR7MjoxfVxcJHszfVxuc25pcHBldCB4cG9zdFxuXHR4aHIgOnBvc3QsIDpcXCR7MTpjcmVhdGV9LCA6XFwkezI6b2JqZWN0fSA9PiB7IFxcJHszfSB9XG5zbmlwcGV0IHhwdXRcblx0eGhyIDpwdXQsIDpcXCR7MTp1cGRhdGV9LCA6aWQgPT4gXFwkezI6MX0sIDpcXCR7MzpvYmplY3R9ID0+IHsgXFwkezR9IH1cXCR7NX1cbnNuaXBwZXQgdGVzdFxuXHR0ZXN0IFwic2hvdWxkIFxcJHsxOmRvIHNvbWV0aGluZ31cIiBkb1xuXHRcdFxcJHsyfVxuXHRlbmRcbiNtaWdyYXRpb25zXG5zbmlwcGV0IG1hY1xuXHRhZGRfY29sdW1uIDpcXCR7MTp0YWJsZV9uYW1lfSwgOlxcJHsyOmNvbHVtbl9uYW1lfSwgOlxcJHszOmRhdGFfdHlwZX1cbnNuaXBwZXQgbXJjXG5cdHJlbW92ZV9jb2x1bW4gOlxcJHsxOnRhYmxlX25hbWV9LCA6XFwkezI6Y29sdW1uX25hbWV9XG5zbmlwcGV0IG1ybmNcblx0cmVuYW1lX2NvbHVtbiA6XFwkezE6dGFibGVfbmFtZX0sIDpcXCR7MjpvbGRfY29sdW1uX25hbWV9LCA6XFwkezM6bmV3X2NvbHVtbl9uYW1lfVxuc25pcHBldCBtY2Ncblx0Y2hhbmdlX2NvbHVtbiA6XFwkezE6dGFibGV9LCA6XFwkezI6Y29sdW1ufSwgOlxcJHszOnR5cGV9XG5zbmlwcGV0IG1jY2Ncblx0dC5jb2x1bW4gOlxcJHsxOnRpdGxlfSwgOlxcJHsyOnN0cmluZ31cbnNuaXBwZXQgbWN0XG5cdGNyZWF0ZV90YWJsZSA6XFwkezE6dGFibGVfbmFtZX0gZG8gfHR8XG5cdFx0dC5jb2x1bW4gOlxcJHsyOm5hbWV9LCA6XFwkezM6dHlwZX1cblx0ZW5kXG5zbmlwcGV0IG1pZ3JhdGlvblxuXHRjbGFzcyBcXCR7MTpjbGFzc19uYW1lfSA8IEFjdGl2ZVJlY29yZDo6TWlncmF0aW9uXG5cdFx0ZGVmIHNlbGYudXBcblx0XHRcdFxcJHsyfVxuXHRcdGVuZFxuXG5cdFx0ZGVmIHNlbGYuZG93blxuXHRcdGVuZFxuXHRlbmRcblxuc25pcHBldCB0cmNcblx0dC5yZW1vdmUgOlxcJHsxOmNvbHVtbn1cbnNuaXBwZXQgdHJlXG5cdHQucmVuYW1lIDpcXCR7MTpvbGRfY29sdW1uX25hbWV9LCA6XFwkezI6bmV3X2NvbHVtbl9uYW1lfVxuXHRcXCR7M31cbnNuaXBwZXQgdHJlZlxuXHR0LnJlZmVyZW5jZXMgOlxcJHsxOm1vZGVsfVxuXG4jcnNwZWNcbnNuaXBwZXQgaXRcblx0aXQgXCJcXCR7MTpzcGVjX25hbWV9XCIgZG9cblx0XHRcXCR7Mn1cblx0ZW5kXG5zbmlwcGV0IGl0cFxuXHRpdCBcIlxcJHsxOnNwZWNfbmFtZX1cIlxuXHRcXCR7Mn1cbnNuaXBwZXQgZGVzY1xuXHRkZXNjcmliZSBcXCR7MTpjbGFzc19uYW1lfSBkb1xuXHRcdFxcJHsyfVxuXHRlbmRcbnNuaXBwZXQgY29udFxuXHRjb250ZXh0IFwiXFwkezE6bWVzc2FnZX1cIiBkb1xuXHRcdFxcJHsyfVxuXHRlbmRcbnNuaXBwZXQgYmVmXG5cdGJlZm9yZSA6XFwkezE6ZWFjaH0gZG9cblx0XHRcXCR7Mn1cblx0ZW5kXG5zbmlwcGV0IGFmdFxuXHRhZnRlciA6XFwkezE6ZWFjaH0gZG9cblx0XHRcXCR7Mn1cblx0ZW5kXG5gO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9