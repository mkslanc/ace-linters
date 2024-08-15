(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[914],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQSxrQkFBa0IsVUFBVSxZQUFZLElBQUksR0FBRztBQUMvQztBQUNBLGVBQWUsT0FBTyxZQUFZLElBQUksR0FBRztBQUN6QztBQUNBLGdCQUFnQixTQUFTLE1BQU0sVUFBVSxLQUFLLEdBQUc7QUFDakQ7QUFDQSxlQUFlLFNBQVMsWUFBWSxJQUFJLE1BQU0sVUFBVSxLQUFLLEdBQUcsSUFBSSxHQUFHO0FBQ3ZFO0FBQ0EsaUJBQWlCLGVBQWU7QUFDaEMsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixhQUFhLE1BQU0sY0FBYyxNQUFNO0FBQ3ZEO0FBQ0EsbUJBQW1CLGFBQWEsTUFBTTtBQUN0QztBQUNBLG1CQUFtQixhQUFhLE1BQU0sa0JBQWtCLE1BQU07QUFDOUQ7QUFDQSxtQkFBbUIsUUFBUSxNQUFNLFNBQVMsTUFBTTtBQUNoRDtBQUNBLGNBQWMsUUFBUSxNQUFNO0FBQzVCO0FBQ0Esa0JBQWtCLGNBQWM7QUFDaEMsZUFBZSxPQUFPLE1BQU07QUFDNUI7QUFDQTtBQUNBLFVBQVUsY0FBYztBQUN4QjtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxjQUFjLGtCQUFrQixNQUFNO0FBQ3RDLElBQUk7QUFDSjtBQUNBLGtCQUFrQjs7QUFFbEI7QUFDQTtBQUNBLFFBQVEsWUFBWTtBQUNwQixLQUFLO0FBQ0w7QUFDQTtBQUNBLFFBQVEsWUFBWTtBQUNwQixJQUFJO0FBQ0o7QUFDQSxhQUFhLGNBQWM7QUFDM0IsS0FBSztBQUNMO0FBQ0E7QUFDQSxhQUFhLFVBQVU7QUFDdkIsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEIsS0FBSztBQUNMO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsS0FBSztBQUNMO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9zbmlwcGV0cy9ydWJ5LnNuaXBwZXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gYCMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgUnVieSBzbmlwcGV0cyAtIGZvciBSYWlscywgc2VlIGJlbG93ICNcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuIyBlbmNvZGluZyBmb3IgUnVieSAxLjlcbnNuaXBwZXQgZW5jXG5cdCMgZW5jb2Rpbmc6IHV0Zi04XG5cbiMgIyEvdXNyL2Jpbi9lbnYgcnVieVxuc25pcHBldCAjIVxuXHQjIS91c3IvYmluL2VudiBydWJ5XG5cdCMgZW5jb2Rpbmc6IHV0Zi04XG5cbiMgTmV3IEJsb2NrXG5zbmlwcGV0ID1iXG5cdD1iZWdpbiByZG9jXG5cdFx0XFwkezF9XG5cdD1lbmRcbnNuaXBwZXQgeVxuXHQ6eWllbGRzOiBcXCR7MTphcmd1bWVudHN9XG5zbmlwcGV0IHJiXG5cdCMhL3Vzci9iaW4vZW52IHJ1YnkgLXdLVVxuc25pcHBldCBiZWdcblx0YmVnaW5cblx0XHRcXCR7M31cblx0cmVzY3VlIFxcJHsxOkV4Y2VwdGlvbn0gPT4gXFwkezI6ZX1cblx0ZW5kXG5cbnNuaXBwZXQgcmVxIHJlcXVpcmVcblx0cmVxdWlyZSBcIlxcJHsxfVwiXFwkezJ9XG5zbmlwcGV0ICNcblx0IyA9Plxuc25pcHBldCBlbmRcblx0X19FTkRfX1xuc25pcHBldCBjYXNlXG5cdGNhc2UgXFwkezE6b2JqZWN0fVxuXHR3aGVuIFxcJHsyOmNvbmRpdGlvbn1cblx0XHRcXCR7M31cblx0ZW5kXG5zbmlwcGV0IHdoZW5cblx0d2hlbiBcXCR7MTpjb25kaXRpb259XG5cdFx0XFwkezJ9XG5zbmlwcGV0IGRlZlxuXHRkZWYgXFwkezE6bWV0aG9kX25hbWV9XG5cdFx0XFwkezJ9XG5cdGVuZFxuc25pcHBldCBkZWZ0XG5cdGRlZiB0ZXN0X1xcJHsxOmNhc2VfbmFtZX1cblx0XHRcXCR7Mn1cblx0ZW5kXG5zbmlwcGV0IGlmXG5cdGlmIFxcJHsxOmNvbmRpdGlvbn1cblx0XHRcXCR7Mn1cblx0ZW5kXG5zbmlwcGV0IGlmZVxuXHRpZiBcXCR7MTpjb25kaXRpb259XG5cdFx0XFwkezJ9XG5cdGVsc2Vcblx0XHRcXCR7M31cblx0ZW5kXG5zbmlwcGV0IGVsc2lmXG5cdGVsc2lmIFxcJHsxOmNvbmRpdGlvbn1cblx0XHRcXCR7Mn1cbnNuaXBwZXQgdW5sZXNzXG5cdHVubGVzcyBcXCR7MTpjb25kaXRpb259XG5cdFx0XFwkezJ9XG5cdGVuZFxuc25pcHBldCB3aGlsZVxuXHR3aGlsZSBcXCR7MTpjb25kaXRpb259XG5cdFx0XFwkezJ9XG5cdGVuZFxuc25pcHBldCBmb3Jcblx0Zm9yIFxcJHsxOmV9IGluIFxcJHsyOmN9XG5cdFx0XFwkezN9XG5cdGVuZFxuc25pcHBldCB1bnRpbFxuXHR1bnRpbCBcXCR7MTpjb25kaXRpb259XG5cdFx0XFwkezJ9XG5cdGVuZFxuc25pcHBldCBjbGEgY2xhc3MgLi4gZW5kXG5cdGNsYXNzIFxcJHsxOlxcYHN1YnN0aXR1dGUoRmlsZW5hbWUoKSwgJ1xcXFwoX1xcXFx8XlxcXFwpXFxcXCguXFxcXCknLCAnXFxcXHVcXFxcMicsICdnJylcXGB9XG5cdFx0XFwkezJ9XG5cdGVuZFxuc25pcHBldCBjbGEgY2xhc3MgLi4gaW5pdGlhbGl6ZSAuLiBlbmRcblx0Y2xhc3MgXFwkezE6XFxgc3Vic3RpdHV0ZShGaWxlbmFtZSgpLCAnXFxcXChfXFxcXHxeXFxcXClcXFxcKC5cXFxcKScsICdcXFxcdVxcXFwyJywgJ2cnKVxcYH1cblx0XHRkZWYgaW5pdGlhbGl6ZShcXCR7MjphcmdzfSlcblx0XHRcdFxcJHszfVxuXHRcdGVuZFxuXHRlbmRcbnNuaXBwZXQgY2xhIGNsYXNzIC4uIDwgUGFyZW50Q2xhc3MgLi4gaW5pdGlhbGl6ZSAuLiBlbmRcblx0Y2xhc3MgXFwkezE6XFxgc3Vic3RpdHV0ZShGaWxlbmFtZSgpLCAnXFxcXChfXFxcXHxeXFxcXClcXFxcKC5cXFxcKScsICdcXFxcdVxcXFwyJywgJ2cnKVxcYH0gPCBcXCR7MjpQYXJlbnRDbGFzc31cblx0XHRkZWYgaW5pdGlhbGl6ZShcXCR7MzphcmdzfSlcblx0XHRcdFxcJHs0fVxuXHRcdGVuZFxuXHRlbmRcbnNuaXBwZXQgY2xhIENsYXNzTmFtZSA9IFN0cnVjdCAuLiBkbyAuLiBlbmRcblx0XFwkezE6XFxgc3Vic3RpdHV0ZShGaWxlbmFtZSgpLCAnXFxcXChfXFxcXHxeXFxcXClcXFxcKC5cXFxcKScsICdcXFxcdVxcXFwyJywgJ2cnKVxcYH0gPSBTdHJ1Y3QubmV3KDpcXCR7MjphdHRyX25hbWVzfSkgZG9cblx0XHRkZWYgXFwkezM6bWV0aG9kX25hbWV9XG5cdFx0XHRcXCR7NH1cblx0XHRlbmRcblx0ZW5kXG5zbmlwcGV0IGNsYSBjbGFzcyBCbGFua1NsYXRlIC4uIGluaXRpYWxpemUgLi4gZW5kXG5cdGNsYXNzIFxcJHsxOkJsYW5rU2xhdGV9XG5cdFx0aW5zdGFuY2VfbWV0aG9kcy5lYWNoIHsgfG1ldGh8IHVuZGVmX21ldGhvZChtZXRoKSB1bmxlc3MgbWV0aCA9fiAvXFxcXEFfXy8gfVxuXHRlbmRcbnNuaXBwZXQgY2xhIGNsYXNzIDw8IHNlbGYgLi4gZW5kXG5cdGNsYXNzIDw8IFxcJHsxOnNlbGZ9XG5cdFx0XFwkezJ9XG5cdGVuZFxuIyBjbGFzcyAuLiA8IERlbGVnYXRlQ2xhc3MgLi4gaW5pdGlhbGl6ZSAuLiBlbmRcbnNuaXBwZXQgY2xhLVxuXHRjbGFzcyBcXCR7MTpcXGBzdWJzdGl0dXRlKEZpbGVuYW1lKCksICdcXFxcKF9cXFxcfF5cXFxcKVxcXFwoLlxcXFwpJywgJ1xcXFx1XFxcXDInLCAnZycpXFxgfSA8IERlbGVnYXRlQ2xhc3MoXFwkezI6UGFyZW50Q2xhc3N9KVxuXHRcdGRlZiBpbml0aWFsaXplKFxcJHszOmFyZ3N9KVxuXHRcdFx0c3VwZXIoXFwkezQ6ZGVsX29ian0pXG5cblx0XHRcdFxcJHs1fVxuXHRcdGVuZFxuXHRlbmRcbnNuaXBwZXQgbW9kIG1vZHVsZSAuLiBlbmRcblx0bW9kdWxlIFxcJHsxOlxcYHN1YnN0aXR1dGUoRmlsZW5hbWUoKSwgJ1xcXFwoX1xcXFx8XlxcXFwpXFxcXCguXFxcXCknLCAnXFxcXHVcXFxcMicsICdnJylcXGB9XG5cdFx0XFwkezJ9XG5cdGVuZFxuc25pcHBldCBtb2QgbW9kdWxlIC4uIG1vZHVsZV9mdW5jdGlvbiAuLiBlbmRcblx0bW9kdWxlIFxcJHsxOlxcYHN1YnN0aXR1dGUoRmlsZW5hbWUoKSwgJ1xcXFwoX1xcXFx8XlxcXFwpXFxcXCguXFxcXCknLCAnXFxcXHVcXFxcMicsICdnJylcXGB9XG5cdFx0bW9kdWxlX2Z1bmN0aW9uXG5cblx0XHRcXCR7Mn1cblx0ZW5kXG5zbmlwcGV0IG1vZCBtb2R1bGUgLi4gQ2xhc3NNZXRob2RzIC4uIGVuZFxuXHRtb2R1bGUgXFwkezE6XFxgc3Vic3RpdHV0ZShGaWxlbmFtZSgpLCAnXFxcXChfXFxcXHxeXFxcXClcXFxcKC5cXFxcKScsICdcXFxcdVxcXFwyJywgJ2cnKVxcYH1cblx0XHRtb2R1bGUgQ2xhc3NNZXRob2RzXG5cdFx0XHRcXCR7Mn1cblx0XHRlbmRcblxuXHRcdG1vZHVsZSBJbnN0YW5jZU1ldGhvZHNcblxuXHRcdGVuZFxuXG5cdFx0ZGVmIHNlbGYuaW5jbHVkZWQocmVjZWl2ZXIpXG5cdFx0XHRyZWNlaXZlci5leHRlbmQgICAgICAgICBDbGFzc01ldGhvZHNcblx0XHRcdHJlY2VpdmVyLnNlbmQgOmluY2x1ZGUsIEluc3RhbmNlTWV0aG9kc1xuXHRcdGVuZFxuXHRlbmRcbiMgYXR0cl9yZWFkZXJcbnNuaXBwZXQgclxuXHRhdHRyX3JlYWRlciA6XFwkezE6YXR0cl9uYW1lc31cbiMgYXR0cl93cml0ZXJcbnNuaXBwZXQgd1xuXHRhdHRyX3dyaXRlciA6XFwkezE6YXR0cl9uYW1lc31cbiMgYXR0cl9hY2Nlc3Nvclxuc25pcHBldCByd1xuXHRhdHRyX2FjY2Vzc29yIDpcXCR7MTphdHRyX25hbWVzfVxuc25pcHBldCBhdHBcblx0YXR0cl9wcm90ZWN0ZWQgOlxcJHsxOmF0dHJfbmFtZXN9XG5zbmlwcGV0IGF0YVxuXHRhdHRyX2FjY2Vzc2libGUgOlxcJHsxOmF0dHJfbmFtZXN9XG4jIGluY2x1ZGUgRW51bWVyYWJsZVxuc25pcHBldCBFbnVtXG5cdGluY2x1ZGUgRW51bWVyYWJsZVxuXG5cdGRlZiBlYWNoKCZibG9jaylcblx0XHRcXCR7MX1cblx0ZW5kXG4jIGluY2x1ZGUgQ29tcGFyYWJsZVxuc25pcHBldCBDb21wXG5cdGluY2x1ZGUgQ29tcGFyYWJsZVxuXG5cdGRlZiA8PT4ob3RoZXIpXG5cdFx0XFwkezF9XG5cdGVuZFxuIyBleHRlbmQgRm9yd2FyZGFibGVcbnNuaXBwZXQgRm9ydy1cblx0ZXh0ZW5kIEZvcndhcmRhYmxlXG4jIGRlZiBzZWxmXG5zbmlwcGV0IGRlZnNcblx0ZGVmIHNlbGYuXFwkezE6Y2xhc3NfbWV0aG9kX25hbWV9XG5cdFx0XFwkezJ9XG5cdGVuZFxuIyBkZWYgbWV0aG9kX21pc3NpbmdcbnNuaXBwZXQgZGVmbW1cblx0ZGVmIG1ldGhvZF9taXNzaW5nKG1ldGgsICphcmdzLCAmYmxrKVxuXHRcdFxcJHsxfVxuXHRlbmRcbnNuaXBwZXQgZGVmZFxuXHRkZWZfZGVsZWdhdG9yIDpcXCR7MTpAZGVsX29ian0sIDpcXCR7MjpkZWxfbWV0aH0sIDpcXCR7MzpuZXdfbmFtZX1cbnNuaXBwZXQgZGVmZHNcblx0ZGVmX2RlbGVnYXRvcnMgOlxcJHsxOkBkZWxfb2JqfSwgOlxcJHsyOmRlbF9tZXRob2RzfVxuc25pcHBldCBhbVxuXHRhbGlhc19tZXRob2QgOlxcJHsxOm5ld19uYW1lfSwgOlxcJHsyOm9sZF9uYW1lfVxuc25pcHBldCBhcHBcblx0aWYgX19GSUxFX18gPT0gXFwkUFJPR1JBTV9OQU1FXG5cdFx0XFwkezF9XG5cdGVuZFxuIyB1c2FnZV9pZigpXG5zbmlwcGV0IHVzYWlcblx0aWYgQVJHVi5cXCR7MX1cblx0XHRhYm9ydCBcIlVzYWdlOiAje1xcJFBST0dSQU1fTkFNRX0gXFwkezI6QVJHU19HT19IRVJFfVwiXFwkezN9XG5cdGVuZFxuIyB1c2FnZV91bmxlc3MoKVxuc25pcHBldCB1c2F1XG5cdHVubGVzcyBBUkdWLlxcJHsxfVxuXHRcdGFib3J0IFwiVXNhZ2U6ICN7XFwkUFJPR1JBTV9OQU1FfSBcXCR7MjpBUkdTX0dPX0hFUkV9XCJcXCR7M31cblx0ZW5kXG5zbmlwcGV0IGFycmF5XG5cdEFycmF5Lm5ldyhcXCR7MToxMH0pIHsgfFxcJHsyOml9fCBcXCR7M30gfVxuc25pcHBldCBoYXNoXG5cdEhhc2gubmV3IHsgfFxcJHsxOmhhc2h9LCBcXCR7MjprZXl9fCBcXCQxW1xcJDJdID0gXFwkezN9IH1cbnNuaXBwZXQgZmlsZSBGaWxlLmZvcmVhY2goKSB7IHxsaW5lfCAuLiB9XG5cdEZpbGUuZm9yZWFjaChcXCR7MTpcInBhdGgvdG8vZmlsZVwifSkgeyB8XFwkezI6bGluZX18IFxcJHszfSB9XG5zbmlwcGV0IGZpbGUgRmlsZS5yZWFkKClcblx0RmlsZS5yZWFkKFxcJHsxOlwicGF0aC90by9maWxlXCJ9KVxcJHsyfVxuc25pcHBldCBEaXIgRGlyLmdsb2JhbCgpIHsgfGZpbGV8IC4uIH1cblx0RGlyLmdsb2IoXFwkezE6XCJkaXIvZ2xvYi8qXCJ9KSB7IHxcXCR7MjpmaWxlfXwgXFwkezN9IH1cbnNuaXBwZXQgRGlyIERpcltcIi4uXCJdXG5cdERpcltcXCR7MTpcImdsb2IvKiovKi5yYlwifV1cXCR7Mn1cbnNuaXBwZXQgZGlyXG5cdEZpbGVuYW1lLmRpcm5hbWUoX19GSUxFX18pXG5zbmlwcGV0IGRlbGlcblx0ZGVsZXRlX2lmIHsgfFxcJHsxOmV9fCBcXCR7Mn0gfVxuc25pcHBldCBmaWxcblx0ZmlsbChcXCR7MTpyYW5nZX0pIHsgfFxcJHsyOml9fCBcXCR7M30gfVxuIyBmbGF0dGVuX29uY2UoKVxuc25pcHBldCBmbGFvXG5cdGluamVjdChBcnJheS5uZXcpIHsgfFxcJHsxOmFycn0sIFxcJHsyOmF9fCBcXCQxLnB1c2goKlxcJDIpfVxcJHszfVxuc25pcHBldCB6aXBcblx0emlwKFxcJHsxOmVudW1zfSkgeyB8XFwkezI6cm93fXwgXFwkezN9IH1cbiMgZG93bnRvKDApIHsgfG58IC4uIH1cbnNuaXBwZXQgZG93XG5cdGRvd250byhcXCR7MTowfSkgeyB8XFwkezI6bn18IFxcJHszfSB9XG5zbmlwcGV0IHN0ZVxuXHRzdGVwKFxcJHsxOjJ9KSB7IHxcXCR7MjpufXwgXFwkezN9IH1cbnNuaXBwZXQgdGltXG5cdHRpbWVzIHsgfFxcJHsxOm59fCBcXCR7Mn0gfVxuc25pcHBldCB1cHRcblx0dXB0byhcXCR7MToxLjAvMC4wfSkgeyB8XFwkezI6bn18IFxcJHszfSB9XG5zbmlwcGV0IGxvb1xuXHRsb29wIHsgXFwkezF9IH1cbnNuaXBwZXQgZWFcblx0ZWFjaCB7IHxcXCR7MTplfXwgXFwkezJ9IH1cbnNuaXBwZXQgZWFkXG5cdGVhY2ggZG8gfFxcJHsxOmV9fFxuXHRcdFxcJHsyfVxuXHRlbmRcbnNuaXBwZXQgZWFiXG5cdGVhY2hfYnl0ZSB7IHxcXCR7MTpieXRlfXwgXFwkezJ9IH1cbnNuaXBwZXQgZWFjLSBlYWNoX2NoYXIgeyB8Y2hyfCAuLiB9XG5cdGVhY2hfY2hhciB7IHxcXCR7MTpjaHJ9fCBcXCR7Mn0gfVxuc25pcHBldCBlYWMtIGVhY2hfY29ucyguLikgeyB8Z3JvdXB8IC4uIH1cblx0ZWFjaF9jb25zKFxcJHsxOjJ9KSB7IHxcXCR7Mjpncm91cH18IFxcJHszfSB9XG5zbmlwcGV0IGVhaVxuXHRlYWNoX2luZGV4IHsgfFxcJHsxOml9fCBcXCR7Mn0gfVxuc25pcHBldCBlYWlkXG5cdGVhY2hfaW5kZXggZG8gfFxcJHsxOml9fFxuXHRcdFxcJHsyfVxuXHRlbmRcbnNuaXBwZXQgZWFrXG5cdGVhY2hfa2V5IHsgfFxcJHsxOmtleX18IFxcJHsyfSB9XG5zbmlwcGV0IGVha2Rcblx0ZWFjaF9rZXkgZG8gfFxcJHsxOmtleX18XG5cdFx0XFwkezJ9XG5cdGVuZFxuc25pcHBldCBlYWxcblx0ZWFjaF9saW5lIHsgfFxcJHsxOmxpbmV9fCBcXCR7Mn0gfVxuc25pcHBldCBlYWxkXG5cdGVhY2hfbGluZSBkbyB8XFwkezE6bGluZX18XG5cdFx0XFwkezJ9XG5cdGVuZFxuc25pcHBldCBlYXBcblx0ZWFjaF9wYWlyIHsgfFxcJHsxOm5hbWV9LCBcXCR7Mjp2YWx9fCBcXCR7M30gfVxuc25pcHBldCBlYXBkXG5cdGVhY2hfcGFpciBkbyB8XFwkezE6bmFtZX0sIFxcJHsyOnZhbH18XG5cdFx0XFwkezN9XG5cdGVuZFxuc25pcHBldCBlYXMtXG5cdGVhY2hfc2xpY2UoXFwkezE6Mn0pIHsgfFxcJHsyOmdyb3VwfXwgXFwkezN9IH1cbnNuaXBwZXQgZWFzZC1cblx0ZWFjaF9zbGljZShcXCR7MToyfSkgZG8gfFxcJHsyOmdyb3VwfXxcblx0XHRcXCR7M31cblx0ZW5kXG5zbmlwcGV0IGVhdlxuXHRlYWNoX3ZhbHVlIHsgfFxcJHsxOnZhbH18IFxcJHsyfSB9XG5zbmlwcGV0IGVhdmRcblx0ZWFjaF92YWx1ZSBkbyB8XFwkezE6dmFsfXxcblx0XHRcXCR7Mn1cblx0ZW5kXG5zbmlwcGV0IGVhd2lcblx0ZWFjaF93aXRoX2luZGV4IHsgfFxcJHsxOmV9LCBcXCR7MjppfXwgXFwkezN9IH1cbnNuaXBwZXQgZWF3aWRcblx0ZWFjaF93aXRoX2luZGV4IGRvIHxcXCR7MTplfSxcXCR7MjppfXxcblx0XHRcXCR7M31cblx0ZW5kXG5zbmlwcGV0IHJldmVcblx0cmV2ZXJzZV9lYWNoIHsgfFxcJHsxOmV9fCBcXCR7Mn0gfVxuc25pcHBldCByZXZlZFxuXHRyZXZlcnNlX2VhY2ggZG8gfFxcJHsxOmV9fFxuXHRcdFxcJHsyfVxuXHRlbmRcbnNuaXBwZXQgaW5qXG5cdGluamVjdChcXCR7MTppbml0fSkgeyB8XFwkezI6bWVtfSwgXFwkezM6dmFyfXwgXFwkezR9IH1cbnNuaXBwZXQgaW5qZFxuXHRpbmplY3QoXFwkezE6aW5pdH0pIGRvIHxcXCR7MjptZW19LCBcXCR7Mzp2YXJ9fFxuXHRcdFxcJHs0fVxuXHRlbmRcbnNuaXBwZXQgbWFwXG5cdG1hcCB7IHxcXCR7MTplfXwgXFwkezJ9IH1cbnNuaXBwZXQgbWFwZFxuXHRtYXAgZG8gfFxcJHsxOmV9fFxuXHRcdFxcJHsyfVxuXHRlbmRcbnNuaXBwZXQgbWFwd2ktXG5cdGVudW1fd2l0aF9pbmRleC5tYXAgeyB8XFwkezE6ZX0sIFxcJHsyOml9fCBcXCR7M30gfVxuc25pcHBldCBzb3Jcblx0c29ydCB7IHxhLCBifCBcXCR7MX0gfVxuc25pcHBldCBzb3JiXG5cdHNvcnRfYnkgeyB8XFwkezE6ZX18IFxcJHsyfSB9XG5zbmlwcGV0IHJhblxuXHRzb3J0X2J5IHsgcmFuZCB9XG5zbmlwcGV0IGFsbFxuXHRhbGw/IHsgfFxcJHsxOmV9fCBcXCR7Mn0gfVxuc25pcHBldCBhbnlcblx0YW55PyB7IHxcXCR7MTplfXwgXFwkezJ9IH1cbnNuaXBwZXQgY2xcblx0Y2xhc3NpZnkgeyB8XFwkezE6ZX18IFxcJHsyfSB9XG5zbmlwcGV0IGNvbFxuXHRjb2xsZWN0IHsgfFxcJHsxOmV9fCBcXCR7Mn0gfVxuc25pcHBldCBjb2xkXG5cdGNvbGxlY3QgZG8gfFxcJHsxOmV9fFxuXHRcdFxcJHsyfVxuXHRlbmRcbnNuaXBwZXQgZGV0XG5cdGRldGVjdCB7IHxcXCR7MTplfXwgXFwkezJ9IH1cbnNuaXBwZXQgZGV0ZFxuXHRkZXRlY3QgZG8gfFxcJHsxOmV9fFxuXHRcdFxcJHsyfVxuXHRlbmRcbnNuaXBwZXQgZmV0XG5cdGZldGNoKFxcJHsxOm5hbWV9KSB7IHxcXCR7MjprZXl9fCBcXCR7M30gfVxuc25pcHBldCBmaW5cblx0ZmluZCB7IHxcXCR7MTplfXwgXFwkezJ9IH1cbnNuaXBwZXQgZmluZFxuXHRmaW5kIGRvIHxcXCR7MTplfXxcblx0XHRcXCR7Mn1cblx0ZW5kXG5zbmlwcGV0IGZpbmFcblx0ZmluZF9hbGwgeyB8XFwkezE6ZX18IFxcJHsyfSB9XG5zbmlwcGV0IGZpbmFkXG5cdGZpbmRfYWxsIGRvIHxcXCR7MTplfXxcblx0XHRcXCR7Mn1cblx0ZW5kXG5zbmlwcGV0IGdyZVxuXHRncmVwKFxcJHsxOi9wYXR0ZXJuL30pIHsgfFxcJHsyOm1hdGNofXwgXFwkezN9IH1cbnNuaXBwZXQgc3ViXG5cdFxcJHsxOmd9c3ViKFxcJHsyOi9wYXR0ZXJuL30pIHsgfFxcJHszOm1hdGNofXwgXFwkezR9IH1cbnNuaXBwZXQgc2NhXG5cdHNjYW4oXFwkezE6L3BhdHRlcm4vfSkgeyB8XFwkezI6bWF0Y2h9fCBcXCR7M30gfVxuc25pcHBldCBzY2FkXG5cdHNjYW4oXFwkezE6L3BhdHRlcm4vfSkgZG8gfFxcJHsyOm1hdGNofXxcblx0XHRcXCR7M31cblx0ZW5kXG5zbmlwcGV0IG1heFxuXHRtYXggeyB8YSwgYnwgXFwkezF9IH1cbnNuaXBwZXQgbWluXG5cdG1pbiB7IHxhLCBifCBcXCR7MX0gfVxuc25pcHBldCBwYXJcblx0cGFydGl0aW9uIHsgfFxcJHsxOmV9fCBcXCR7Mn0gfVxuc25pcHBldCBwYXJkXG5cdHBhcnRpdGlvbiBkbyB8XFwkezE6ZX18XG5cdFx0XFwkezJ9XG5cdGVuZFxuc25pcHBldCByZWpcblx0cmVqZWN0IHsgfFxcJHsxOmV9fCBcXCR7Mn0gfVxuc25pcHBldCByZWpkXG5cdHJlamVjdCBkbyB8XFwkezE6ZX18XG5cdFx0XFwkezJ9XG5cdGVuZFxuc25pcHBldCBzZWxcblx0c2VsZWN0IHsgfFxcJHsxOmV9fCBcXCR7Mn0gfVxuc25pcHBldCBzZWxkXG5cdHNlbGVjdCBkbyB8XFwkezE6ZX18XG5cdFx0XFwkezJ9XG5cdGVuZFxuc25pcHBldCBsYW1cblx0bGFtYmRhIHsgfFxcJHsxOmFyZ3N9fCBcXCR7Mn0gfVxuc25pcHBldCBkb29cblx0ZG9cblx0XHRcXCR7MX1cblx0ZW5kXG5zbmlwcGV0IGRvdlxuXHRkbyB8XFwkezE6dmFyaWFibGV9fFxuXHRcdFxcJHsyfVxuXHRlbmRcbnNuaXBwZXQgOlxuXHQ6XFwkezE6a2V5fSA9PiBcXCR7MjpcInZhbHVlXCJ9XFwkezN9XG5zbmlwcGV0IG9wZVxuXHRvcGVuKFxcJHsxOlwicGF0aC9vci91cmwvb3IvcGlwZVwifSwgXCJcXCR7Mjp3fVwiKSB7IHxcXCR7Mzppb318IFxcJHs0fSB9XG4jIHBhdGhfZnJvbV9oZXJlKClcbnNuaXBwZXQgZnBhdGhcblx0RmlsZS5qb2luKEZpbGUuZGlybmFtZShfX0ZJTEVfXyksIColMltcXCR7MTpyZWwgcGF0aCBoZXJlfV0pXFwkezJ9XG4jIHVuaXhfZmlsdGVyIHt9XG5zbmlwcGV0IHVuaWZcblx0QVJHRi5lYWNoX2xpbmVcXCR7MX0gZG8gfFxcJHsyOmxpbmV9fFxuXHRcdFxcJHszfVxuXHRlbmRcbiMgb3B0aW9uX3BhcnNlIHt9XG5zbmlwcGV0IG9wdHBcblx0cmVxdWlyZSBcIm9wdHBhcnNlXCJcblxuXHRvcHRpb25zID0ge1xcJHsxOmRlZmF1bHQgPT4gXCJhcmdzXCJ9fVxuXG5cdEFSR1Yub3B0aW9ucyBkbyB8b3B0c3xcblx0XHRvcHRzLmJhbm5lciA9IFwiVXNhZ2U6ICN7RmlsZS5iYXNlbmFtZShcXCRQUk9HUkFNX05BTUUpfVxuc25pcHBldCBvcHRcblx0b3B0cy5vbiggXCItXFwkezE6b31cIiwgXCItLVxcJHsyOmxvbmctb3B0aW9uLW5hbWV9XCIsIFxcJHszOlN0cmluZ30sXG5cdCAgICAgICAgIFwiXFwkezQ6T3B0aW9uIGRlc2NyaXB0aW9uLn1cIikgZG8gfFxcJHs1Om9wdH18XG5cdFx0XFwkezZ9XG5cdGVuZFxuc25pcHBldCB0Y1xuXHRyZXF1aXJlIFwidGVzdC91bml0XCJcblxuXHRyZXF1aXJlIFwiXFwkezE6bGlicmFyeV9maWxlX25hbWV9XCJcblxuXHRjbGFzcyBUZXN0XFwkezI6XFwkMX0gPCBUZXN0OjpVbml0OjpUZXN0Q2FzZVxuXHRcdGRlZiB0ZXN0X1xcJHszOmNhc2VfbmFtZX1cblx0XHRcdFxcJHs0fVxuXHRcdGVuZFxuXHRlbmRcbnNuaXBwZXQgdHNcblx0cmVxdWlyZSBcInRlc3QvdW5pdFwiXG5cblx0cmVxdWlyZSBcInRjX1xcJHsxOnRlc3RfY2FzZV9maWxlfVwiXG5cdHJlcXVpcmUgXCJ0Y19cXCR7Mjp0ZXN0X2Nhc2VfZmlsZX1cIlxcJHszfVxuc25pcHBldCBhc1xuXHRhc3NlcnQgXFwkezE6dGVzdH0sIFwiXFwkezI6RmFpbHVyZSBtZXNzYWdlLn1cIlxcJHszfVxuc25pcHBldCBhc2Vcblx0YXNzZXJ0X2VxdWFsIFxcJHsxOmV4cGVjdGVkfSwgXFwkezI6YWN0dWFsfVxcJHszfVxuc25pcHBldCBhc25lXG5cdGFzc2VydF9ub3RfZXF1YWwgXFwkezE6dW5leHBlY3RlZH0sIFxcJHsyOmFjdHVhbH1cXCR7M31cbnNuaXBwZXQgYXNpZFxuXHRhc3NlcnRfaW5fZGVsdGEgXFwkezE6ZXhwZWN0ZWRfZmxvYXR9LCBcXCR7MjphY3R1YWxfZmxvYXR9LCBcXCR7MzoyICoqIC0yMH1cXCR7NH1cbnNuaXBwZXQgYXNpb1xuXHRhc3NlcnRfaW5zdGFuY2Vfb2YgXFwkezE6RXhwZWN0ZWRDbGFzc30sIFxcJHsyOmFjdHVhbF9pbnN0YW5jZX1cXCR7M31cbnNuaXBwZXQgYXNrb1xuXHRhc3NlcnRfa2luZF9vZiBcXCR7MTpFeHBlY3RlZEtpbmR9LCBcXCR7MjphY3R1YWxfaW5zdGFuY2V9XFwkezN9XG5zbmlwcGV0IGFzblxuXHRhc3NlcnRfbmlsIFxcJHsxOmluc3RhbmNlfVxcJHsyfVxuc25pcHBldCBhc25uXG5cdGFzc2VydF9ub3RfbmlsIFxcJHsxOmluc3RhbmNlfVxcJHsyfVxuc25pcHBldCBhc21cblx0YXNzZXJ0X21hdGNoIC9cXCR7MTpleHBlY3RlZF9wYXR0ZXJufS8sIFxcJHsyOmFjdHVhbF9zdHJpbmd9XFwkezN9XG5zbmlwcGV0IGFzbm1cblx0YXNzZXJ0X25vX21hdGNoIC9cXCR7MTp1bmV4cGVjdGVkX3BhdHRlcm59LywgXFwkezI6YWN0dWFsX3N0cmluZ31cXCR7M31cbnNuaXBwZXQgYXNvXG5cdGFzc2VydF9vcGVyYXRvciBcXCR7MTpsZWZ0fSwgOlxcJHsyOm9wZXJhdG9yfSwgXFwkezM6cmlnaHR9XFwkezR9XG5zbmlwcGV0IGFzclxuXHRhc3NlcnRfcmFpc2UgXFwkezE6RXhjZXB0aW9ufSB7IFxcJHsyfSB9XG5zbmlwcGV0IGFzcmRcblx0YXNzZXJ0X3JhaXNlIFxcJHsxOkV4Y2VwdGlvbn0gZG9cblx0XHRcXCR7Mn1cblx0ZW5kXG5zbmlwcGV0IGFzbnJcblx0YXNzZXJ0X25vdGhpbmdfcmFpc2VkIFxcJHsxOkV4Y2VwdGlvbn0geyBcXCR7Mn0gfVxuc25pcHBldCBhc25yZFxuXHRhc3NlcnRfbm90aGluZ19yYWlzZWQgXFwkezE6RXhjZXB0aW9ufSBkb1xuXHRcdFxcJHsyfVxuXHRlbmRcbnNuaXBwZXQgYXNydFxuXHRhc3NlcnRfcmVzcG9uZF90byBcXCR7MTpvYmplY3R9LCA6XFwkezI6bWV0aG9kfVxcJHszfVxuc25pcHBldCBhc3MgYXNzZXJ0X3NhbWUoLi4pXG5cdGFzc2VydF9zYW1lIFxcJHsxOmV4cGVjdGVkfSwgXFwkezI6YWN0dWFsfVxcJHszfVxuc25pcHBldCBhc3MgYXNzZXJ0X3NlbmQoLi4pXG5cdGFzc2VydF9zZW5kIFtcXCR7MTpvYmplY3R9LCA6XFwkezI6bWVzc2FnZX0sIFxcJHszOmFyZ3N9XVxcJHs0fVxuc25pcHBldCBhc25zXG5cdGFzc2VydF9ub3Rfc2FtZSBcXCR7MTp1bmV4cGVjdGVkfSwgXFwkezI6YWN0dWFsfVxcJHszfVxuc25pcHBldCBhc3Rcblx0YXNzZXJ0X3Rocm93cyA6XFwkezE6ZXhwZWN0ZWR9IHsgXFwkezJ9IH1cbnNuaXBwZXQgYXN0ZFxuXHRhc3NlcnRfdGhyb3dzIDpcXCR7MTpleHBlY3RlZH0gZG9cblx0XHRcXCR7Mn1cblx0ZW5kXG5zbmlwcGV0IGFzbnRcblx0YXNzZXJ0X25vdGhpbmdfdGhyb3duIHsgXFwkezF9IH1cbnNuaXBwZXQgYXNudGRcblx0YXNzZXJ0X25vdGhpbmdfdGhyb3duIGRvXG5cdFx0XFwkezF9XG5cdGVuZFxuc25pcHBldCBmbFxuXHRmbHVuayBcIlxcJHsxOkZhaWx1cmUgbWVzc2FnZS59XCJcXCR7Mn1cbiMgQmVuY2htYXJrLmJtYm0gZG8gLi4gZW5kXG5zbmlwcGV0IGJtLVxuXHRURVNUUyA9IFxcJHsxOjEwXzAwMH1cblx0QmVuY2htYXJrLmJtYm0gZG8gfHJlc3VsdHN8XG5cdFx0XFwkezJ9XG5cdGVuZFxuc25pcHBldCByZXBcblx0cmVzdWx0cy5yZXBvcnQoXCJcXCR7MTpuYW1lfTpcIikgeyBURVNUUy50aW1lcyB7IFxcJHsyfSB9fVxuIyBNYXJzaGFsLmR1bXAoLi4sIGZpbGUpXG5zbmlwcGV0IE1kXG5cdEZpbGUub3BlbihcXCR7MTpcInBhdGgvdG8vZmlsZS5kdW1wXCJ9LCBcIndiXCIpIHsgfFxcJHsyOmZpbGV9fCBNYXJzaGFsLmR1bXAoXFwkezM6b2JqfSwgXFwkMikgfVxcJHs0fVxuIyBNYXNoYWwubG9hZChvYmopXG5zbmlwcGV0IE1sXG5cdEZpbGUub3BlbihcXCR7MTpcInBhdGgvdG8vZmlsZS5kdW1wXCJ9LCBcInJiXCIpIHsgfFxcJHsyOmZpbGV9fCBNYXJzaGFsLmxvYWQoXFwkMikgfVxcJHszfVxuIyBkZWVwX2NvcHkoLi4pXG5zbmlwcGV0IGRlZWNcblx0TWFyc2hhbC5sb2FkKE1hcnNoYWwuZHVtcChcXCR7MTpvYmpfdG9fY29weX0pKVxcJHsyfVxuc25pcHBldCBQbi1cblx0UFN0b3JlLm5ldyhcXCR7MTpcImZpbGVfbmFtZS5wc3RvcmVcIn0pXFwkezJ9XG5zbmlwcGV0IHRyYVxuXHR0cmFuc2FjdGlvbihcXCR7MTp0cnVlfSkgeyBcXCR7Mn0gfVxuIyB4bWxyZWFkKC4uKVxuc25pcHBldCB4bWwtXG5cdFJFWE1MOjpEb2N1bWVudC5uZXcoRmlsZS5yZWFkKFxcJHsxOlwicGF0aC90by9maWxlXCJ9KSlcXCR7Mn1cbiMgeHBhdGgoLi4pIHsgLi4gfVxuc25pcHBldCB4cGFcblx0ZWxlbWVudHMuZWFjaChcXCR7MTpcIi8vWHBhdGhcIn0pIGRvIHxcXCR7Mjpub2RlfXxcblx0XHRcXCR7M31cblx0ZW5kXG4jIGNsYXNzX2Zyb21fbmFtZSgpXG5zbmlwcGV0IGNsYWZuXG5cdHNwbGl0KFwiOjpcIikuaW5qZWN0KE9iamVjdCkgeyB8cGFyLCBjb25zdHwgcGFyLmNvbnN0X2dldChjb25zdCkgfVxuIyBzaW5nbGV0b25fY2xhc3MoKVxuc25pcHBldCBzaW5jXG5cdGNsYXNzIDw8IHNlbGY7IHNlbGYgZW5kXG5zbmlwcGV0IG5hbVxuXHRuYW1lc3BhY2UgOlxcJHsxOlxcYEZpbGVuYW1lKClcXGB9IGRvXG5cdFx0XFwkezJ9XG5cdGVuZFxuc25pcHBldCB0YXNcblx0ZGVzYyBcIlxcJHsxOlRhc2sgZGVzY3JpcHRpb259XCJcblx0dGFzayA6XFwkezI6dGFza19uYW1lID0+IFs6ZGVwZW5kZW50LCA6dGFza3NdfSBkb1xuXHRcdFxcJHszfVxuXHRlbmRcbiMgYmxvY2tcbnNuaXBwZXQgYlxuXHR7IHxcXCR7MTp2YXJ9fCBcXCR7Mn0gfVxuc25pcHBldCBiZWdpblxuXHRiZWdpblxuXHRcdHJhaXNlICdBIHRlc3QgZXhjZXB0aW9uLidcblx0cmVzY3VlIEV4Y2VwdGlvbiA9PiBlXG5cdFx0cHV0cyBlLm1lc3NhZ2Vcblx0XHRwdXRzIGUuYmFja3RyYWNlLmluc3BlY3Rcblx0ZWxzZVxuXHRcdCMgb3RoZXIgZXhjZXB0aW9uXG5cdGVuc3VyZVxuXHRcdCMgYWx3YXlzIGV4ZWN1dGVkXG5cdGVuZFxuXG4jZGVidWdnaW5nXG5zbmlwcGV0IGRlYnVnXG5cdHJlcXVpcmUgJ3J1YnktZGVidWcnOyBkZWJ1Z2dlcjsgdHJ1ZTtcbnNuaXBwZXQgcHJ5XG5cdHJlcXVpcmUgJ3ByeSc7IGJpbmRpbmcucHJ5XG5cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyBSYWlscyBzbmlwcGV0cyAtIGZvciBwdXJlIFJ1YnksIHNlZSBhYm92ZSAjXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbnNuaXBwZXQgYXJ0XG5cdGFzc2VydF9yZWRpcmVjdGVkX3RvIFxcJHsxOjphY3Rpb24gPT4gXCJcXCR7MjppbmRleH1cIn1cbnNuaXBwZXQgYXJ0bnBcblx0YXNzZXJ0X3JlZGlyZWN0ZWRfdG8gXFwkezE6cGFyZW50fV9cXCR7MjpjaGlsZH1fcGF0aChcXCR7MzpAXFwkMX0sIFxcJHs0OkBcXCQyfSlcbnNuaXBwZXQgYXJ0bnBwXG5cdGFzc2VydF9yZWRpcmVjdGVkX3RvIFxcJHsxOnBhcmVudH1fXFwkezI6Y2hpbGR9X3BhdGgoXFwkezM6QFxcJDF9KVxuc25pcHBldCBhcnRwXG5cdGFzc2VydF9yZWRpcmVjdGVkX3RvIFxcJHsxOm1vZGVsfV9wYXRoKFxcJHsyOkBcXCQxfSlcbnNuaXBwZXQgYXJ0cHBcblx0YXNzZXJ0X3JlZGlyZWN0ZWRfdG8gXFwkezE6bW9kZWx9c19wYXRoXG5zbmlwcGV0IGFzZFxuXHRhc3NlcnRfZGlmZmVyZW5jZSBcIlxcJHsxOk1vZGVsfS5cXCR7Mjpjb3VudH1cIiwgXFwkMSBkb1xuXHRcdFxcJHszfVxuXHRlbmRcbnNuaXBwZXQgYXNuZFxuXHRhc3NlcnRfbm9fZGlmZmVyZW5jZSBcIlxcJHsxOk1vZGVsfS5cXCR7Mjpjb3VudH1cIiBkb1xuXHRcdFxcJHszfVxuXHRlbmRcbnNuaXBwZXQgYXNyZVxuXHRhc3NlcnRfcmVzcG9uc2UgOlxcJHsxOnN1Y2Nlc3N9LCBAcmVzcG9uc2UuYm9keVxcJHsyfVxuc25pcHBldCBhc3JqXG5cdGFzc2VydF9yanMgOlxcJHsxOnJlcGxhY2V9LCBcIlxcJHsyOmRvbSBpZH1cIlxuc25pcHBldCBhc3MgYXNzZXJ0X3NlbGVjdCguLilcblx0YXNzZXJ0X3NlbGVjdCAnXFwkezE6cGF0aH0nLCA6XFwkezI6dGV4dH0gPT4gJ1xcJHszOmlubmVyX2h0bWwnIFxcJHs0OmRvfVxuc25pcHBldCBiZlxuXHRiZWZvcmVfZmlsdGVyIDpcXCR7MTptZXRob2R9XG5zbmlwcGV0IGJ0XG5cdGJlbG9uZ3NfdG8gOlxcJHsxOmFzc29jaWF0aW9ufVxuc25pcHBldCBjcndcblx0Y2F0dHJfYWNjZXNzb3IgOlxcJHsxOmF0dHJfbmFtZXN9XG5zbmlwcGV0IGRlZmNyZWF0ZVxuXHRkZWYgY3JlYXRlXG5cdFx0QFxcJHsxOm1vZGVsX2NsYXNzX25hbWV9ID0gXFwkezI6TW9kZWxDbGFzc05hbWV9Lm5ldyhwYXJhbXNbOlxcJDFdKVxuXG5cdFx0cmVzcG9uZF90byBkbyB8d2FudHN8XG5cdFx0XHRpZiBAXFwkMS5zYXZlXG5cdFx0XHRcdGZsYXNoWzpub3RpY2VdID0gJ1xcJDIgd2FzIHN1Y2Nlc3NmdWxseSBjcmVhdGVkLidcblx0XHRcdFx0d2FudHMuaHRtbCB7IHJlZGlyZWN0X3RvKEBcXCQxKSB9XG5cdFx0XHRcdHdhbnRzLnhtbCAgeyByZW5kZXIgOnhtbCA9PiBAXFwkMSwgOnN0YXR1cyA9PiA6Y3JlYXRlZCwgOmxvY2F0aW9uID0+IEBcXCQxIH1cblx0XHRcdGVsc2Vcblx0XHRcdFx0d2FudHMuaHRtbCB7IHJlbmRlciA6YWN0aW9uID0+IFwibmV3XCIgfVxuXHRcdFx0XHR3YW50cy54bWwgIHsgcmVuZGVyIDp4bWwgPT4gQFxcJDEuZXJyb3JzLCA6c3RhdHVzID0+IDp1bnByb2Nlc3NhYmxlX2VudGl0eSB9XG5cdFx0XHRlbmRcblx0XHRlbmRcblx0ZW5kXFwkezN9XG5zbmlwcGV0IGRlZmRlc3Ryb3lcblx0ZGVmIGRlc3Ryb3lcblx0XHRAXFwkezE6bW9kZWxfY2xhc3NfbmFtZX0gPSBcXCR7MjpNb2RlbENsYXNzTmFtZX0uZmluZChwYXJhbXNbOmlkXSlcblx0XHRAXFwkMS5kZXN0cm95XG5cblx0XHRyZXNwb25kX3RvIGRvIHx3YW50c3xcblx0XHRcdHdhbnRzLmh0bWwgeyByZWRpcmVjdF90byhcXCQxc191cmwpIH1cblx0XHRcdHdhbnRzLnhtbCAgeyBoZWFkIDpvayB9XG5cdFx0ZW5kXG5cdGVuZFxcJHszfVxuc25pcHBldCBkZWZlZGl0XG5cdGRlZiBlZGl0XG5cdFx0QFxcJHsxOm1vZGVsX2NsYXNzX25hbWV9ID0gXFwkezI6TW9kZWxDbGFzc05hbWV9LmZpbmQocGFyYW1zWzppZF0pXG5cdGVuZFxuc25pcHBldCBkZWZpbmRleFxuXHRkZWYgaW5kZXhcblx0XHRAXFwkezE6bW9kZWxfY2xhc3NfbmFtZX0gPSBcXCR7MjpNb2RlbENsYXNzTmFtZX0uYWxsXG5cblx0XHRyZXNwb25kX3RvIGRvIHx3YW50c3xcblx0XHRcdHdhbnRzLmh0bWwgIyBpbmRleC5odG1sLmVyYlxuXHRcdFx0d2FudHMueG1sICB7IHJlbmRlciA6eG1sID0+IEBcXCQxcyB9XG5cdFx0ZW5kXG5cdGVuZFxcJHszfVxuc25pcHBldCBkZWZuZXdcblx0ZGVmIG5ld1xuXHRcdEBcXCR7MTptb2RlbF9jbGFzc19uYW1lfSA9IFxcJHsyOk1vZGVsQ2xhc3NOYW1lfS5uZXdcblxuXHRcdHJlc3BvbmRfdG8gZG8gfHdhbnRzfFxuXHRcdFx0d2FudHMuaHRtbCAjIG5ldy5odG1sLmVyYlxuXHRcdFx0d2FudHMueG1sICB7IHJlbmRlciA6eG1sID0+IEBcXCQxIH1cblx0XHRlbmRcblx0ZW5kXFwkezN9XG5zbmlwcGV0IGRlZnNob3dcblx0ZGVmIHNob3dcblx0XHRAXFwkezE6bW9kZWxfY2xhc3NfbmFtZX0gPSBcXCR7MjpNb2RlbENsYXNzTmFtZX0uZmluZChwYXJhbXNbOmlkXSlcblxuXHRcdHJlc3BvbmRfdG8gZG8gfHdhbnRzfFxuXHRcdFx0d2FudHMuaHRtbCAjIHNob3cuaHRtbC5lcmJcblx0XHRcdHdhbnRzLnhtbCAgeyByZW5kZXIgOnhtbCA9PiBAXFwkMSB9XG5cdFx0ZW5kXG5cdGVuZFxcJHszfVxuc25pcHBldCBkZWZ1cGRhdGVcblx0ZGVmIHVwZGF0ZVxuXHRcdEBcXCR7MTptb2RlbF9jbGFzc19uYW1lfSA9IFxcJHsyOk1vZGVsQ2xhc3NOYW1lfS5maW5kKHBhcmFtc1s6aWRdKVxuXG5cdFx0cmVzcG9uZF90byBkbyB8d2FudHN8XG5cdFx0XHRpZiBAXFwkMS51cGRhdGVfYXR0cmlidXRlcyhwYXJhbXNbOlxcJDFdKVxuXHRcdFx0XHRmbGFzaFs6bm90aWNlXSA9ICdcXCQyIHdhcyBzdWNjZXNzZnVsbHkgdXBkYXRlZC4nXG5cdFx0XHRcdHdhbnRzLmh0bWwgeyByZWRpcmVjdF90byhAXFwkMSkgfVxuXHRcdFx0XHR3YW50cy54bWwgIHsgaGVhZCA6b2sgfVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR3YW50cy5odG1sIHsgcmVuZGVyIDphY3Rpb24gPT4gXCJlZGl0XCIgfVxuXHRcdFx0XHR3YW50cy54bWwgIHsgcmVuZGVyIDp4bWwgPT4gQFxcJDEuZXJyb3JzLCA6c3RhdHVzID0+IDp1bnByb2Nlc3NhYmxlX2VudGl0eSB9XG5cdFx0XHRlbmRcblx0XHRlbmRcblx0ZW5kXFwkezN9XG5zbmlwcGV0IGZsYXNoXG5cdGZsYXNoWzpcXCR7MTpub3RpY2V9XSA9IFwiXFwkezJ9XCJcbnNuaXBwZXQgaGFidG1cblx0aGFzX2FuZF9iZWxvbmdzX3RvX21hbnkgOlxcJHsxOm9iamVjdH0sIDpqb2luX3RhYmxlID0+IFwiXFwkezI6dGFibGVfbmFtZX1cIiwgOmZvcmVpZ25fa2V5ID0+IFwiXFwkezN9X2lkXCJcXCR7NH1cbnNuaXBwZXQgaG1cblx0aGFzX21hbnkgOlxcJHsxOm9iamVjdH1cbnNuaXBwZXQgaG1kXG5cdGhhc19tYW55IDpcXCR7MTpvdGhlcn1zLCA6Y2xhc3NfbmFtZSA9PiBcIlxcJHsyOlxcJDF9XCIsIDpmb3JlaWduX2tleSA9PiBcIlxcJHszOlxcJDF9X2lkXCIsIDpkZXBlbmRlbnQgPT4gOmRlc3Ryb3lcXCR7NH1cbnNuaXBwZXQgaG10XG5cdGhhc19tYW55IDpcXCR7MTpvYmplY3R9LCA6dGhyb3VnaCA9PiA6XFwkezI6b2JqZWN0fVxuc25pcHBldCBob1xuXHRoYXNfb25lIDpcXCR7MTpvYmplY3R9XG5zbmlwcGV0IGkxOFxuXHRJMThuLnQoJ1xcJHsxOnR5cGUua2V5fScpXFwkezJ9XG5zbmlwcGV0IGlzdFxuXHQ8JT0gaW1hZ2Vfc3VibWl0X3RhZyhcIlxcJHsxOmFncmVlLnBuZ31cIiwgOmlkID0+IFwiXFwkezI6aWR9XCJcXCR7M30gJT5cbnNuaXBwZXQgbG9nXG5cdFJhaWxzLmxvZ2dlci5cXCR7MTpkZWJ1Z30gXFwkezJ9XG5zbmlwcGV0IGxvZzJcblx0UkFJTFNfREVGQVVMVF9MT0dHRVIuXFwkezE6ZGVidWd9IFxcJHsyfVxuc25pcHBldCBsb2dkXG5cdGxvZ2dlci5kZWJ1ZyB7IFwiXFwkezE6bWVzc2FnZX1cIiB9XFwkezJ9XG5zbmlwcGV0IGxvZ2Vcblx0bG9nZ2VyLmVycm9yIHsgXCJcXCR7MTptZXNzYWdlfVwiIH1cXCR7Mn1cbnNuaXBwZXQgbG9nZlxuXHRsb2dnZXIuZmF0YWwgeyBcIlxcJHsxOm1lc3NhZ2V9XCIgfVxcJHsyfVxuc25pcHBldCBsb2dpXG5cdGxvZ2dlci5pbmZvIHsgXCJcXCR7MTptZXNzYWdlfVwiIH1cXCR7Mn1cbnNuaXBwZXQgbG9nd1xuXHRsb2dnZXIud2FybiB7IFwiXFwkezE6bWVzc2FnZX1cIiB9XFwkezJ9XG5zbmlwcGV0IG1hcGNcblx0XFwkezE6bWFwfS5cXCR7Mjpjb25uZWN0fSAnXFwkezM6Y29udHJvbGxlci86YWN0aW9uLzppZH0nXG5zbmlwcGV0IG1hcGNhXG5cdFxcJHsxOm1hcH0uY2F0Y2hfYWxsIFwiKlxcJHsyOmFueXRoaW5nfVwiLCA6Y29udHJvbGxlciA9PiBcIlxcJHszOmRlZmF1bHR9XCIsIDphY3Rpb24gPT4gXCJcXCR7NDplcnJvcn1cIlxcJHs1fVxuc25pcHBldCBtYXByXG5cdFxcJHsxOm1hcH0ucmVzb3VyY2UgOlxcJHsyOnJlc291cmNlfVxuc25pcHBldCBtYXByc1xuXHRcXCR7MTptYXB9LnJlc291cmNlcyA6XFwkezI6cmVzb3VyY2V9XG5zbmlwcGV0IG1hcHdvXG5cdFxcJHsxOm1hcH0ud2l0aF9vcHRpb25zIDpcXCR7Mjpjb250cm9sbGVyfSA9PiAnXFwkezM6dGhpbmd9JyBkbyB8XFwkM3xcblx0XHRcXCR7NH1cblx0ZW5kXG5zbmlwcGV0IG1ic1xuXHRiZWZvcmVfc2F2ZSA6XFwkezE6bWV0aG9kfVxuc25pcHBldCBtY2h0XG5cdGNoYW5nZV90YWJsZSA6XFwkezE6dGFibGVfbmFtZX0gZG8gfHR8XG5cdFx0XFwkezJ9XG5cdGVuZFxuc25pcHBldCBtcFxuXHRtYXAoJjpcXCR7MTppZH0pXG5zbmlwcGV0IG1yd1xuXHRtYXR0cl9hY2Nlc3NvciA6XFwkezE6YXR0cl9uYW1lc31cbnNuaXBwZXQgb2Fcblx0b3JkZXIoXCJcXCR7MTpmaWVsZH1cIilcbnNuaXBwZXQgb2Rcblx0b3JkZXIoXCJcXCR7MTpmaWVsZH0gREVTQ1wiKVxuc25pcHBldCBwYVxuXHRwYXJhbXNbOlxcJHsxOmlkfV1cXCR7Mn1cbnNuaXBwZXQgcmFcblx0cmVuZGVyIDphY3Rpb24gPT4gXCJcXCR7MTphY3Rpb259XCJcbnNuaXBwZXQgcmFsXG5cdHJlbmRlciA6YWN0aW9uID0+IFwiXFwkezE6YWN0aW9ufVwiLCA6bGF5b3V0ID0+IFwiXFwkezI6bGF5b3V0bmFtZX1cIlxuc25pcHBldCByZXN0XG5cdHJlc3BvbmRfdG8gZG8gfHdhbnRzfFxuXHRcdHdhbnRzLlxcJHsxOmh0bWx9IHsgXFwkezJ9IH1cblx0ZW5kXG5zbmlwcGV0IHJmXG5cdHJlbmRlciA6ZmlsZSA9PiBcIlxcJHsxOmZpbGVwYXRofVwiXG5zbmlwcGV0IHJmdVxuXHRyZW5kZXIgOmZpbGUgPT4gXCJcXCR7MTpmaWxlcGF0aH1cIiwgOnVzZV9mdWxsX3BhdGggPT4gXFwkezI6ZmFsc2V9XG5zbmlwcGV0IHJpXG5cdHJlbmRlciA6aW5saW5lID0+IFwiXFwkezE6PCU9ICdoZWxsbycgJT59XCJcbnNuaXBwZXQgcmlsXG5cdHJlbmRlciA6aW5saW5lID0+IFwiXFwkezE6PCU9ICdoZWxsbycgJT59XCIsIDpsb2NhbHMgPT4geyBcXCR7Mjo6bmFtZX0gPT4gXCJcXCR7Mzp2YWx1ZX1cIlxcJHs0fSB9XG5zbmlwcGV0IHJpdFxuXHRyZW5kZXIgOmlubGluZSA9PiBcIlxcJHsxOjwlPSAnaGVsbG8nICU+fVwiLCA6dHlwZSA9PiBcXCR7Mjo6cnhtbH1cbnNuaXBwZXQgcmpzb25cblx0cmVuZGVyIDpqc29uID0+IFxcJHsxOnRleHQgdG8gcmVuZGVyfVxuc25pcHBldCBybFxuXHRyZW5kZXIgOmxheW91dCA9PiBcIlxcJHsxOmxheW91dG5hbWV9XCJcbnNuaXBwZXQgcm5cblx0cmVuZGVyIDpub3RoaW5nID0+IFxcJHsxOnRydWV9XG5zbmlwcGV0IHJuc1xuXHRyZW5kZXIgOm5vdGhpbmcgPT4gXFwkezE6dHJ1ZX0sIDpzdGF0dXMgPT4gXFwkezI6NDAxfVxuc25pcHBldCBycFxuXHRyZW5kZXIgOnBhcnRpYWwgPT4gXCJcXCR7MTppdGVtfVwiXG5zbmlwcGV0IHJwY1xuXHRyZW5kZXIgOnBhcnRpYWwgPT4gXCJcXCR7MTppdGVtfVwiLCA6Y29sbGVjdGlvbiA9PiBcXCR7MjpAXFwkMXN9XG5zbmlwcGV0IHJwbFxuXHRyZW5kZXIgOnBhcnRpYWwgPT4gXCJcXCR7MTppdGVtfVwiLCA6bG9jYWxzID0+IHsgOlxcJHsyOlxcJDF9ID0+IFxcJHszOkBcXCQxfVxuc25pcHBldCBycG9cblx0cmVuZGVyIDpwYXJ0aWFsID0+IFwiXFwkezE6aXRlbX1cIiwgOm9iamVjdCA9PiBcXCR7MjpAXFwkMX1cbnNuaXBwZXQgcnBzXG5cdHJlbmRlciA6cGFydGlhbCA9PiBcIlxcJHsxOml0ZW19XCIsIDpzdGF0dXMgPT4gXFwkezI6NTAwfVxuc25pcHBldCBydFxuXHRyZW5kZXIgOnRleHQgPT4gXCJcXCR7MTp0ZXh0IHRvIHJlbmRlcn1cIlxuc25pcHBldCBydGxcblx0cmVuZGVyIDp0ZXh0ID0+IFwiXFwkezE6dGV4dCB0byByZW5kZXJ9XCIsIDpsYXlvdXQgPT4gXCJcXCR7MjpsYXlvdXRuYW1lfVwiXG5zbmlwcGV0IHJ0bHRcblx0cmVuZGVyIDp0ZXh0ID0+IFwiXFwkezE6dGV4dCB0byByZW5kZXJ9XCIsIDpsYXlvdXQgPT4gXFwkezI6dHJ1ZX1cbnNuaXBwZXQgcnRzXG5cdHJlbmRlciA6dGV4dCA9PiBcIlxcJHsxOnRleHQgdG8gcmVuZGVyfVwiLCA6c3RhdHVzID0+IFxcJHsyOjQwMX1cbnNuaXBwZXQgcnVcblx0cmVuZGVyIDp1cGRhdGUgZG8gfFxcJHsxOnBhZ2V9fFxuXHRcdFxcJDEuXFwkezJ9XG5cdGVuZFxuc25pcHBldCByeG1sXG5cdHJlbmRlciA6eG1sID0+IFxcJHsxOnRleHQgdG8gcmVuZGVyfVxuc25pcHBldCBzY1xuXHRzY29wZSA6XFwkezE6bmFtZX0sIDp3aGVyZSg6QFxcJHsyOmZpZWxkfSA9PiBcXCR7Mzp2YWx1ZX0pXG5zbmlwcGV0IHNsXG5cdHNjb3BlIDpcXCR7MTpuYW1lfSwgbGFtYmRhIGRvIHxcXCR7Mjp2YWx1ZX18XG5cdFx0d2hlcmUoXCJcXCR7MzpmaWVsZCA9ID99XCIsIFxcJHs0OmJpbmQgdmFyfSlcblx0ZW5kXG5zbmlwcGV0IHNoYTFcblx0RGlnZXN0OjpTSEExLmhleGRpZ2VzdChcXCR7MTpzdHJpbmd9KVxuc25pcHBldCBzd2VlcGVyXG5cdGNsYXNzIFxcJHsxOk1vZGVsQ2xhc3NOYW1lfVN3ZWVwZXIgPCBBY3Rpb25Db250cm9sbGVyOjpDYWNoaW5nOjpTd2VlcGVyXG5cdFx0b2JzZXJ2ZSBcXCQxXG5cblx0XHRkZWYgYWZ0ZXJfc2F2ZShcXCR7Mjptb2RlbF9jbGFzc19uYW1lfSlcblx0XHRcdGV4cGlyZV9jYWNoZShcXCQyKVxuXHRcdGVuZFxuXG5cdFx0ZGVmIGFmdGVyX2Rlc3Ryb3koXFwkMilcblx0XHRcdGV4cGlyZV9jYWNoZShcXCQyKVxuXHRcdGVuZFxuXG5cdFx0ZGVmIGV4cGlyZV9jYWNoZShcXCQyKVxuXHRcdFx0ZXhwaXJlX3BhZ2Vcblx0XHRlbmRcblx0ZW5kXG5zbmlwcGV0IHRjYlxuXHR0LmJvb2xlYW4gOlxcJHsxOnRpdGxlfVxuXHRcXCR7Mn1cbnNuaXBwZXQgdGNiaVxuXHR0LmJpbmFyeSA6XFwkezE6dGl0bGV9LCA6bGltaXQgPT4gXFwkezI6Mn0ubWVnYWJ5dGVzXG5cdFxcJHszfVxuc25pcHBldCB0Y2Rcblx0dC5kZWNpbWFsIDpcXCR7MTp0aXRsZX0sIDpwcmVjaXNpb24gPT4gXFwkezI6MTB9LCA6c2NhbGUgPT4gXFwkezM6Mn1cblx0XFwkezR9XG5zbmlwcGV0IHRjZGFcblx0dC5kYXRlIDpcXCR7MTp0aXRsZX1cblx0XFwkezJ9XG5zbmlwcGV0IHRjZHRcblx0dC5kYXRldGltZSA6XFwkezE6dGl0bGV9XG5cdFxcJHsyfVxuc25pcHBldCB0Y2Zcblx0dC5mbG9hdCA6XFwkezE6dGl0bGV9XG5cdFxcJHsyfVxuc25pcHBldCB0Y2hcblx0dC5jaGFuZ2UgOlxcJHsxOm5hbWV9LCA6XFwkezI6c3RyaW5nfSwgOlxcJHszOmxpbWl0fSA9PiBcXCR7NDo4MH1cblx0XFwkezV9XG5zbmlwcGV0IHRjaVxuXHR0LmludGVnZXIgOlxcJHsxOnRpdGxlfVxuXHRcXCR7Mn1cbnNuaXBwZXQgdGNsXG5cdHQuaW50ZWdlciA6bG9ja192ZXJzaW9uLCA6bnVsbCA9PiBmYWxzZSwgOmRlZmF1bHQgPT4gMFxuXHRcXCR7MX1cbnNuaXBwZXQgdGNyXG5cdHQucmVmZXJlbmNlcyA6XFwkezE6dGFnZ2FibGV9LCA6cG9seW1vcnBoaWMgPT4geyA6ZGVmYXVsdCA9PiAnXFwkezI6UGhvdG99JyB9XG5cdFxcJHszfVxuc25pcHBldCB0Y3Ncblx0dC5zdHJpbmcgOlxcJHsxOnRpdGxlfVxuXHRcXCR7Mn1cbnNuaXBwZXQgdGN0XG5cdHQudGV4dCA6XFwkezE6dGl0bGV9XG5cdFxcJHsyfVxuc25pcHBldCB0Y3RpXG5cdHQudGltZSA6XFwkezE6dGl0bGV9XG5cdFxcJHsyfVxuc25pcHBldCB0Y3RzXG5cdHQudGltZXN0YW1wIDpcXCR7MTp0aXRsZX1cblx0XFwkezJ9XG5zbmlwcGV0IHRjdHNzXG5cdHQudGltZXN0YW1wc1xuXHRcXCR7MX1cbnNuaXBwZXQgdmFcblx0dmFsaWRhdGVzX2Fzc29jaWF0ZWQgOlxcJHsxOmF0dHJpYnV0ZX1cbnNuaXBwZXQgdmFvXG5cdHZhbGlkYXRlc19hY2NlcHRhbmNlX29mIDpcXCR7MTp0ZXJtc31cbnNuaXBwZXQgdmNcblx0dmFsaWRhdGVzX2NvbmZpcm1hdGlvbl9vZiA6XFwkezE6YXR0cmlidXRlfVxuc25pcHBldCB2ZVxuXHR2YWxpZGF0ZXNfZXhjbHVzaW9uX29mIDpcXCR7MTphdHRyaWJ1dGV9LCA6aW4gPT4gXFwkezI6JXcoIG1vdiBhdmkgKX1cbnNuaXBwZXQgdmZcblx0dmFsaWRhdGVzX2Zvcm1hdF9vZiA6XFwkezE6YXR0cmlidXRlfSwgOndpdGggPT4gL1xcJHsyOnJlZ2V4fS9cbnNuaXBwZXQgdmlcblx0dmFsaWRhdGVzX2luY2x1c2lvbl9vZiA6XFwkezE6YXR0cmlidXRlfSwgOmluID0+ICV3KFxcJHsyOiBtb3YgYXZpIH0pXG5zbmlwcGV0IHZsXG5cdHZhbGlkYXRlc19sZW5ndGhfb2YgOlxcJHsxOmF0dHJpYnV0ZX0sIDp3aXRoaW4gPT4gXFwkezI6M30uLlxcJHszOjIwfVxuc25pcHBldCB2blxuXHR2YWxpZGF0ZXNfbnVtZXJpY2FsaXR5X29mIDpcXCR7MTphdHRyaWJ1dGV9XG5zbmlwcGV0IHZwb1xuXHR2YWxpZGF0ZXNfcHJlc2VuY2Vfb2YgOlxcJHsxOmF0dHJpYnV0ZX1cbnNuaXBwZXQgdnVcblx0dmFsaWRhdGVzX3VuaXF1ZW5lc3Nfb2YgOlxcJHsxOmF0dHJpYnV0ZX1cbnNuaXBwZXQgd2FudHNcblx0d2FudHMuXFwkezE6anN8eG1sfGh0bWx9IHsgXFwkezJ9IH1cbnNuaXBwZXQgd2Ncblx0d2hlcmUoXFwkezE6XCJjb25kaXRpb25zXCJ9XFwkezI6LCBiaW5kX3Zhcn0pXG5zbmlwcGV0IHdoXG5cdHdoZXJlKFxcJHsxOmZpZWxkfSA9PiBcXCR7Mjp2YWx1ZX0pXG5zbmlwcGV0IHhkZWxldGVcblx0eGhyIDpkZWxldGUsIDpcXCR7MTpkZXN0cm95fSwgOmlkID0+IFxcJHsyOjF9XFwkezN9XG5zbmlwcGV0IHhnZXRcblx0eGhyIDpnZXQsIDpcXCR7MTpzaG93fSwgOmlkID0+IFxcJHsyOjF9XFwkezN9XG5zbmlwcGV0IHhwb3N0XG5cdHhociA6cG9zdCwgOlxcJHsxOmNyZWF0ZX0sIDpcXCR7MjpvYmplY3R9ID0+IHsgXFwkezN9IH1cbnNuaXBwZXQgeHB1dFxuXHR4aHIgOnB1dCwgOlxcJHsxOnVwZGF0ZX0sIDppZCA9PiBcXCR7MjoxfSwgOlxcJHszOm9iamVjdH0gPT4geyBcXCR7NH0gfVxcJHs1fVxuc25pcHBldCB0ZXN0XG5cdHRlc3QgXCJzaG91bGQgXFwkezE6ZG8gc29tZXRoaW5nfVwiIGRvXG5cdFx0XFwkezJ9XG5cdGVuZFxuI21pZ3JhdGlvbnNcbnNuaXBwZXQgbWFjXG5cdGFkZF9jb2x1bW4gOlxcJHsxOnRhYmxlX25hbWV9LCA6XFwkezI6Y29sdW1uX25hbWV9LCA6XFwkezM6ZGF0YV90eXBlfVxuc25pcHBldCBtcmNcblx0cmVtb3ZlX2NvbHVtbiA6XFwkezE6dGFibGVfbmFtZX0sIDpcXCR7Mjpjb2x1bW5fbmFtZX1cbnNuaXBwZXQgbXJuY1xuXHRyZW5hbWVfY29sdW1uIDpcXCR7MTp0YWJsZV9uYW1lfSwgOlxcJHsyOm9sZF9jb2x1bW5fbmFtZX0sIDpcXCR7MzpuZXdfY29sdW1uX25hbWV9XG5zbmlwcGV0IG1jY1xuXHRjaGFuZ2VfY29sdW1uIDpcXCR7MTp0YWJsZX0sIDpcXCR7Mjpjb2x1bW59LCA6XFwkezM6dHlwZX1cbnNuaXBwZXQgbWNjY1xuXHR0LmNvbHVtbiA6XFwkezE6dGl0bGV9LCA6XFwkezI6c3RyaW5nfVxuc25pcHBldCBtY3Rcblx0Y3JlYXRlX3RhYmxlIDpcXCR7MTp0YWJsZV9uYW1lfSBkbyB8dHxcblx0XHR0LmNvbHVtbiA6XFwkezI6bmFtZX0sIDpcXCR7Mzp0eXBlfVxuXHRlbmRcbnNuaXBwZXQgbWlncmF0aW9uXG5cdGNsYXNzIFxcJHsxOmNsYXNzX25hbWV9IDwgQWN0aXZlUmVjb3JkOjpNaWdyYXRpb25cblx0XHRkZWYgc2VsZi51cFxuXHRcdFx0XFwkezJ9XG5cdFx0ZW5kXG5cblx0XHRkZWYgc2VsZi5kb3duXG5cdFx0ZW5kXG5cdGVuZFxuXG5zbmlwcGV0IHRyY1xuXHR0LnJlbW92ZSA6XFwkezE6Y29sdW1ufVxuc25pcHBldCB0cmVcblx0dC5yZW5hbWUgOlxcJHsxOm9sZF9jb2x1bW5fbmFtZX0sIDpcXCR7MjpuZXdfY29sdW1uX25hbWV9XG5cdFxcJHszfVxuc25pcHBldCB0cmVmXG5cdHQucmVmZXJlbmNlcyA6XFwkezE6bW9kZWx9XG5cbiNyc3BlY1xuc25pcHBldCBpdFxuXHRpdCBcIlxcJHsxOnNwZWNfbmFtZX1cIiBkb1xuXHRcdFxcJHsyfVxuXHRlbmRcbnNuaXBwZXQgaXRwXG5cdGl0IFwiXFwkezE6c3BlY19uYW1lfVwiXG5cdFxcJHsyfVxuc25pcHBldCBkZXNjXG5cdGRlc2NyaWJlIFxcJHsxOmNsYXNzX25hbWV9IGRvXG5cdFx0XFwkezJ9XG5cdGVuZFxuc25pcHBldCBjb250XG5cdGNvbnRleHQgXCJcXCR7MTptZXNzYWdlfVwiIGRvXG5cdFx0XFwkezJ9XG5cdGVuZFxuc25pcHBldCBiZWZcblx0YmVmb3JlIDpcXCR7MTplYWNofSBkb1xuXHRcdFxcJHsyfVxuXHRlbmRcbnNuaXBwZXQgYWZ0XG5cdGFmdGVyIDpcXCR7MTplYWNofSBkb1xuXHRcdFxcJHsyfVxuXHRlbmRcbmA7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=