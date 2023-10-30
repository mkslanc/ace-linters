"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[163],{

/***/ 70163:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var lang = __webpack_require__(20124);
var oop = __webpack_require__(89359);

var CsoundPreprocessorHighlightRules = (__webpack_require__(32060)/* .CsoundPreprocessorHighlightRules */ .H);
var CsoundScoreHighlightRules = (__webpack_require__(53112)/* .CsoundScoreHighlightRules */ .U);
var LuaHighlightRules = (__webpack_require__(98092)/* .LuaHighlightRules */ .Q);
var PythonHighlightRules = (__webpack_require__(71924)/* .PythonHighlightRules */ .H);

var CsoundOrchestraHighlightRules = function(embeddedRulePrefix) {

    CsoundPreprocessorHighlightRules.call(this, embeddedRulePrefix);

    // To update the opcodes and deprecatedOpcodes arrays, run
    /*
      curl --remote-name --show-error --silent https://raw.githubusercontent.com/pygments/pygments/master/pygments/lexers/_csound_builtins.py
      python -c "import json; from _csound_builtins import OPCODES, DEPRECATED_OPCODES, REMOVED_OPCODES; print('var opcodes = {};'.format(json.dumps(sorted(list(OPCODES)), indent=4))); print('var deprecatedOpcodes = {};'.format(json.dumps(sorted(list(DEPRECATED_OPCODES.union(REMOVED_OPCODES))), indent=4)))"
    */
    // and then paste the output.
    var opcodes = [
        "ATSadd",
        "ATSaddnz",
        "ATSbufread",
        "ATScross",
        "ATSinfo",
        "ATSinterpread",
        "ATSpartialtap",
        "ATSread",
        "ATSreadnz",
        "ATSsinnoi",
        "FLbox",
        "FLbutBank",
        "FLbutton",
        "FLcloseButton",
        "FLcolor",
        "FLcolor2",
        "FLcount",
        "FLexecButton",
        "FLgetsnap",
        "FLgroup",
        "FLgroupEnd",
        "FLgroup_end",
        "FLhide",
        "FLhvsBox",
        "FLhvsBoxSetValue",
        "FLjoy",
        "FLkeyIn",
        "FLknob",
        "FLlabel",
        "FLloadsnap",
        "FLmouse",
        "FLpack",
        "FLpackEnd",
        "FLpack_end",
        "FLpanel",
        "FLpanelEnd",
        "FLpanel_end",
        "FLprintk",
        "FLprintk2",
        "FLroller",
        "FLrun",
        "FLsavesnap",
        "FLscroll",
        "FLscrollEnd",
        "FLscroll_end",
        "FLsetAlign",
        "FLsetBox",
        "FLsetColor",
        "FLsetColor2",
        "FLsetFont",
        "FLsetPosition",
        "FLsetSize",
        "FLsetSnapGroup",
        "FLsetText",
        "FLsetTextColor",
        "FLsetTextSize",
        "FLsetTextType",
        "FLsetVal",
        "FLsetVal_i",
        "FLsetVali",
        "FLsetsnap",
        "FLshow",
        "FLslidBnk",
        "FLslidBnk2",
        "FLslidBnk2Set",
        "FLslidBnk2Setk",
        "FLslidBnkGetHandle",
        "FLslidBnkSet",
        "FLslidBnkSetk",
        "FLslider",
        "FLtabs",
        "FLtabsEnd",
        "FLtabs_end",
        "FLtext",
        "FLupdate",
        "FLvalue",
        "FLvkeybd",
        "FLvslidBnk",
        "FLvslidBnk2",
        "FLxyin",
        "JackoAudioIn",
        "JackoAudioInConnect",
        "JackoAudioOut",
        "JackoAudioOutConnect",
        "JackoFreewheel",
        "JackoInfo",
        "JackoInit",
        "JackoMidiInConnect",
        "JackoMidiOut",
        "JackoMidiOutConnect",
        "JackoNoteOut",
        "JackoOn",
        "JackoTransport",
        "K35_hpf",
        "K35_lpf",
        "MixerClear",
        "MixerGetLevel",
        "MixerReceive",
        "MixerSend",
        "MixerSetLevel",
        "MixerSetLevel_i",
        "OSCbundle",
        "OSCcount",
        "OSCinit",
        "OSCinitM",
        "OSClisten",
        "OSCraw",
        "OSCsend",
        "OSCsend_lo",
        "S",
        "STKBandedWG",
        "STKBeeThree",
        "STKBlowBotl",
        "STKBlowHole",
        "STKBowed",
        "STKBrass",
        "STKClarinet",
        "STKDrummer",
        "STKFMVoices",
        "STKFlute",
        "STKHevyMetl",
        "STKMandolin",
        "STKModalBar",
        "STKMoog",
        "STKPercFlut",
        "STKPlucked",
        "STKResonate",
        "STKRhodey",
        "STKSaxofony",
        "STKShakers",
        "STKSimple",
        "STKSitar",
        "STKStifKarp",
        "STKTubeBell",
        "STKVoicForm",
        "STKWhistle",
        "STKWurley",
        "a",
        "abs",
        "active",
        "adsr",
        "adsyn",
        "adsynt",
        "adsynt2",
        "aftouch",
        "allpole",
        "alpass",
        "alwayson",
        "ampdb",
        "ampdbfs",
        "ampmidi",
        "ampmidicurve",
        "ampmidid",
        "apoleparams",
        "arduinoRead",
        "arduinoReadF",
        "arduinoStart",
        "arduinoStop",
        "areson",
        "aresonk",
        "atone",
        "atonek",
        "atonex",
        "autocorr",
        "babo",
        "balance",
        "balance2",
        "bamboo",
        "barmodel",
        "bbcutm",
        "bbcuts",
        "betarand",
        "bexprnd",
        "bformdec1",
        "bformdec2",
        "bformenc1",
        "binit",
        "biquad",
        "biquada",
        "birnd",
        "bob",
        "bpf",
        "bpfcos",
        "bqrez",
        "butbp",
        "butbr",
        "buthp",
        "butlp",
        "butterbp",
        "butterbr",
        "butterhp",
        "butterlp",
        "button",
        "buzz",
        "c2r",
        "cabasa",
        "cauchy",
        "cauchyi",
        "cbrt",
        "ceil",
        "cell",
        "cent",
        "centroid",
        "ceps",
        "cepsinv",
        "chanctrl",
        "changed",
        "changed2",
        "chani",
        "chano",
        "chebyshevpoly",
        "checkbox",
        "chn_S",
        "chn_a",
        "chn_k",
        "chnclear",
        "chnexport",
        "chnget",
        "chngeta",
        "chngeti",
        "chngetk",
        "chngetks",
        "chngets",
        "chnmix",
        "chnparams",
        "chnset",
        "chnseta",
        "chnseti",
        "chnsetk",
        "chnsetks",
        "chnsets",
        "chuap",
        "clear",
        "clfilt",
        "clip",
        "clockoff",
        "clockon",
        "cmp",
        "cmplxprod",
        "cntCreate",
        "cntCycles",
        "cntDelete",
        "cntDelete_i",
        "cntRead",
        "cntReset",
        "cntState",
        "comb",
        "combinv",
        "compilecsd",
        "compileorc",
        "compilestr",
        "compress",
        "compress2",
        "connect",
        "control",
        "convle",
        "convolve",
        "copya2ftab",
        "copyf2array",
        "cos",
        "cosh",
        "cosinv",
        "cosseg",
        "cossegb",
        "cossegr",
        "count",
        "count_i",
        "cps2pch",
        "cpsmidi",
        "cpsmidib",
        "cpsmidinn",
        "cpsoct",
        "cpspch",
        "cpstmid",
        "cpstun",
        "cpstuni",
        "cpsxpch",
        "cpumeter",
        "cpuprc",
        "cross2",
        "crossfm",
        "crossfmi",
        "crossfmpm",
        "crossfmpmi",
        "crosspm",
        "crosspmi",
        "crunch",
        "ctlchn",
        "ctrl14",
        "ctrl21",
        "ctrl7",
        "ctrlinit",
        "ctrlpreset",
        "ctrlprint",
        "ctrlprintpresets",
        "ctrlsave",
        "ctrlselect",
        "cuserrnd",
        "dam",
        "date",
        "dates",
        "db",
        "dbamp",
        "dbfsamp",
        "dcblock",
        "dcblock2",
        "dconv",
        "dct",
        "dctinv",
        "deinterleave",
        "delay",
        "delay1",
        "delayk",
        "delayr",
        "delayw",
        "deltap",
        "deltap3",
        "deltapi",
        "deltapn",
        "deltapx",
        "deltapxw",
        "denorm",
        "diff",
        "diode_ladder",
        "directory",
        "diskgrain",
        "diskin",
        "diskin2",
        "dispfft",
        "display",
        "distort",
        "distort1",
        "divz",
        "doppler",
        "dot",
        "downsamp",
        "dripwater",
        "dssiactivate",
        "dssiaudio",
        "dssictls",
        "dssiinit",
        "dssilist",
        "dumpk",
        "dumpk2",
        "dumpk3",
        "dumpk4",
        "duserrnd",
        "dust",
        "dust2",
        "elapsedcycles",
        "elapsedtime",
        "envlpx",
        "envlpxr",
        "ephasor",
        "eqfil",
        "evalstr",
        "event",
        "event_i",
        "eventcycles",
        "eventtime",
        "exciter",
        "exitnow",
        "exp",
        "expcurve",
        "expon",
        "exprand",
        "exprandi",
        "expseg",
        "expsega",
        "expsegb",
        "expsegba",
        "expsegr",
        "fareylen",
        "fareyleni",
        "faustaudio",
        "faustcompile",
        "faustctl",
        "faustdsp",
        "faustgen",
        "faustplay",
        "fft",
        "fftinv",
        "ficlose",
        "filebit",
        "filelen",
        "filenchnls",
        "filepeak",
        "filescal",
        "filesr",
        "filevalid",
        "fillarray",
        "filter2",
        "fin",
        "fini",
        "fink",
        "fiopen",
        "flanger",
        "flashtxt",
        "flooper",
        "flooper2",
        "floor",
        "fluidAllOut",
        "fluidCCi",
        "fluidCCk",
        "fluidControl",
        "fluidEngine",
        "fluidInfo",
        "fluidLoad",
        "fluidNote",
        "fluidOut",
        "fluidProgramSelect",
        "fluidSetInterpMethod",
        "fmanal",
        "fmax",
        "fmb3",
        "fmbell",
        "fmin",
        "fmmetal",
        "fmod",
        "fmpercfl",
        "fmrhode",
        "fmvoice",
        "fmwurlie",
        "fof",
        "fof2",
        "fofilter",
        "fog",
        "fold",
        "follow",
        "follow2",
        "foscil",
        "foscili",
        "fout",
        "fouti",
        "foutir",
        "foutk",
        "fprintks",
        "fprints",
        "frac",
        "fractalnoise",
        "framebuffer",
        "freeverb",
        "ftaudio",
        "ftchnls",
        "ftconv",
        "ftcps",
        "ftexists",
        "ftfree",
        "ftgen",
        "ftgenonce",
        "ftgentmp",
        "ftlen",
        "ftload",
        "ftloadk",
        "ftlptim",
        "ftmorf",
        "ftom",
        "ftprint",
        "ftresize",
        "ftresizei",
        "ftsamplebank",
        "ftsave",
        "ftsavek",
        "ftset",
        "ftslice",
        "ftslicei",
        "ftsr",
        "gain",
        "gainslider",
        "gauss",
        "gaussi",
        "gausstrig",
        "gbuzz",
        "genarray",
        "genarray_i",
        "gendy",
        "gendyc",
        "gendyx",
        "getcfg",
        "getcol",
        "getftargs",
        "getrow",
        "getseed",
        "gogobel",
        "grain",
        "grain2",
        "grain3",
        "granule",
        "gtadsr",
        "gtf",
        "guiro",
        "harmon",
        "harmon2",
        "harmon3",
        "harmon4",
        "hdf5read",
        "hdf5write",
        "hilbert",
        "hilbert2",
        "hrtfearly",
        "hrtfmove",
        "hrtfmove2",
        "hrtfreverb",
        "hrtfstat",
        "hsboscil",
        "hvs1",
        "hvs2",
        "hvs3",
        "hypot",
        "i",
        "ihold",
        "imagecreate",
        "imagefree",
        "imagegetpixel",
        "imageload",
        "imagesave",
        "imagesetpixel",
        "imagesize",
        "in",
        "in32",
        "inch",
        "inh",
        "init",
        "initc14",
        "initc21",
        "initc7",
        "inleta",
        "inletf",
        "inletk",
        "inletkid",
        "inletv",
        "ino",
        "inq",
        "inrg",
        "ins",
        "insglobal",
        "insremot",
        "int",
        "integ",
        "interleave",
        "interp",
        "invalue",
        "inx",
        "inz",
        "jacktransport",
        "jitter",
        "jitter2",
        "joystick",
        "jspline",
        "k",
        "la_i_add_mc",
        "la_i_add_mr",
        "la_i_add_vc",
        "la_i_add_vr",
        "la_i_assign_mc",
        "la_i_assign_mr",
        "la_i_assign_t",
        "la_i_assign_vc",
        "la_i_assign_vr",
        "la_i_conjugate_mc",
        "la_i_conjugate_mr",
        "la_i_conjugate_vc",
        "la_i_conjugate_vr",
        "la_i_distance_vc",
        "la_i_distance_vr",
        "la_i_divide_mc",
        "la_i_divide_mr",
        "la_i_divide_vc",
        "la_i_divide_vr",
        "la_i_dot_mc",
        "la_i_dot_mc_vc",
        "la_i_dot_mr",
        "la_i_dot_mr_vr",
        "la_i_dot_vc",
        "la_i_dot_vr",
        "la_i_get_mc",
        "la_i_get_mr",
        "la_i_get_vc",
        "la_i_get_vr",
        "la_i_invert_mc",
        "la_i_invert_mr",
        "la_i_lower_solve_mc",
        "la_i_lower_solve_mr",
        "la_i_lu_det_mc",
        "la_i_lu_det_mr",
        "la_i_lu_factor_mc",
        "la_i_lu_factor_mr",
        "la_i_lu_solve_mc",
        "la_i_lu_solve_mr",
        "la_i_mc_create",
        "la_i_mc_set",
        "la_i_mr_create",
        "la_i_mr_set",
        "la_i_multiply_mc",
        "la_i_multiply_mr",
        "la_i_multiply_vc",
        "la_i_multiply_vr",
        "la_i_norm1_mc",
        "la_i_norm1_mr",
        "la_i_norm1_vc",
        "la_i_norm1_vr",
        "la_i_norm_euclid_mc",
        "la_i_norm_euclid_mr",
        "la_i_norm_euclid_vc",
        "la_i_norm_euclid_vr",
        "la_i_norm_inf_mc",
        "la_i_norm_inf_mr",
        "la_i_norm_inf_vc",
        "la_i_norm_inf_vr",
        "la_i_norm_max_mc",
        "la_i_norm_max_mr",
        "la_i_print_mc",
        "la_i_print_mr",
        "la_i_print_vc",
        "la_i_print_vr",
        "la_i_qr_eigen_mc",
        "la_i_qr_eigen_mr",
        "la_i_qr_factor_mc",
        "la_i_qr_factor_mr",
        "la_i_qr_sym_eigen_mc",
        "la_i_qr_sym_eigen_mr",
        "la_i_random_mc",
        "la_i_random_mr",
        "la_i_random_vc",
        "la_i_random_vr",
        "la_i_size_mc",
        "la_i_size_mr",
        "la_i_size_vc",
        "la_i_size_vr",
        "la_i_subtract_mc",
        "la_i_subtract_mr",
        "la_i_subtract_vc",
        "la_i_subtract_vr",
        "la_i_t_assign",
        "la_i_trace_mc",
        "la_i_trace_mr",
        "la_i_transpose_mc",
        "la_i_transpose_mr",
        "la_i_upper_solve_mc",
        "la_i_upper_solve_mr",
        "la_i_vc_create",
        "la_i_vc_set",
        "la_i_vr_create",
        "la_i_vr_set",
        "la_k_a_assign",
        "la_k_add_mc",
        "la_k_add_mr",
        "la_k_add_vc",
        "la_k_add_vr",
        "la_k_assign_a",
        "la_k_assign_f",
        "la_k_assign_mc",
        "la_k_assign_mr",
        "la_k_assign_t",
        "la_k_assign_vc",
        "la_k_assign_vr",
        "la_k_conjugate_mc",
        "la_k_conjugate_mr",
        "la_k_conjugate_vc",
        "la_k_conjugate_vr",
        "la_k_current_f",
        "la_k_current_vr",
        "la_k_distance_vc",
        "la_k_distance_vr",
        "la_k_divide_mc",
        "la_k_divide_mr",
        "la_k_divide_vc",
        "la_k_divide_vr",
        "la_k_dot_mc",
        "la_k_dot_mc_vc",
        "la_k_dot_mr",
        "la_k_dot_mr_vr",
        "la_k_dot_vc",
        "la_k_dot_vr",
        "la_k_f_assign",
        "la_k_get_mc",
        "la_k_get_mr",
        "la_k_get_vc",
        "la_k_get_vr",
        "la_k_invert_mc",
        "la_k_invert_mr",
        "la_k_lower_solve_mc",
        "la_k_lower_solve_mr",
        "la_k_lu_det_mc",
        "la_k_lu_det_mr",
        "la_k_lu_factor_mc",
        "la_k_lu_factor_mr",
        "la_k_lu_solve_mc",
        "la_k_lu_solve_mr",
        "la_k_mc_set",
        "la_k_mr_set",
        "la_k_multiply_mc",
        "la_k_multiply_mr",
        "la_k_multiply_vc",
        "la_k_multiply_vr",
        "la_k_norm1_mc",
        "la_k_norm1_mr",
        "la_k_norm1_vc",
        "la_k_norm1_vr",
        "la_k_norm_euclid_mc",
        "la_k_norm_euclid_mr",
        "la_k_norm_euclid_vc",
        "la_k_norm_euclid_vr",
        "la_k_norm_inf_mc",
        "la_k_norm_inf_mr",
        "la_k_norm_inf_vc",
        "la_k_norm_inf_vr",
        "la_k_norm_max_mc",
        "la_k_norm_max_mr",
        "la_k_qr_eigen_mc",
        "la_k_qr_eigen_mr",
        "la_k_qr_factor_mc",
        "la_k_qr_factor_mr",
        "la_k_qr_sym_eigen_mc",
        "la_k_qr_sym_eigen_mr",
        "la_k_random_mc",
        "la_k_random_mr",
        "la_k_random_vc",
        "la_k_random_vr",
        "la_k_subtract_mc",
        "la_k_subtract_mr",
        "la_k_subtract_vc",
        "la_k_subtract_vr",
        "la_k_t_assign",
        "la_k_trace_mc",
        "la_k_trace_mr",
        "la_k_upper_solve_mc",
        "la_k_upper_solve_mr",
        "la_k_vc_set",
        "la_k_vr_set",
        "lag",
        "lagud",
        "lastcycle",
        "lenarray",
        "lfo",
        "lfsr",
        "limit",
        "limit1",
        "lincos",
        "line",
        "linen",
        "linenr",
        "lineto",
        "link_beat_force",
        "link_beat_get",
        "link_beat_request",
        "link_create",
        "link_enable",
        "link_is_enabled",
        "link_metro",
        "link_peers",
        "link_tempo_get",
        "link_tempo_set",
        "linlin",
        "linrand",
        "linseg",
        "linsegb",
        "linsegr",
        "liveconv",
        "locsend",
        "locsig",
        "log",
        "log10",
        "log2",
        "logbtwo",
        "logcurve",
        "loopseg",
        "loopsegp",
        "looptseg",
        "loopxseg",
        "lorenz",
        "loscil",
        "loscil3",
        "loscil3phs",
        "loscilphs",
        "loscilx",
        "lowpass2",
        "lowres",
        "lowresx",
        "lpcanal",
        "lpcfilter",
        "lpf18",
        "lpform",
        "lpfreson",
        "lphasor",
        "lpinterp",
        "lposcil",
        "lposcil3",
        "lposcila",
        "lposcilsa",
        "lposcilsa2",
        "lpread",
        "lpreson",
        "lpshold",
        "lpsholdp",
        "lpslot",
        "lufs",
        "mac",
        "maca",
        "madsr",
        "mags",
        "mandel",
        "mandol",
        "maparray",
        "maparray_i",
        "marimba",
        "massign",
        "max",
        "max_k",
        "maxabs",
        "maxabsaccum",
        "maxaccum",
        "maxalloc",
        "maxarray",
        "mclock",
        "mdelay",
        "median",
        "mediank",
        "metro",
        "metro2",
        "metrobpm",
        "mfb",
        "midglobal",
        "midiarp",
        "midic14",
        "midic21",
        "midic7",
        "midichannelaftertouch",
        "midichn",
        "midicontrolchange",
        "midictrl",
        "mididefault",
        "midifilestatus",
        "midiin",
        "midinoteoff",
        "midinoteoncps",
        "midinoteonkey",
        "midinoteonoct",
        "midinoteonpch",
        "midion",
        "midion2",
        "midiout",
        "midiout_i",
        "midipgm",
        "midipitchbend",
        "midipolyaftertouch",
        "midiprogramchange",
        "miditempo",
        "midremot",
        "min",
        "minabs",
        "minabsaccum",
        "minaccum",
        "minarray",
        "mincer",
        "mirror",
        "mode",
        "modmatrix",
        "monitor",
        "moog",
        "moogladder",
        "moogladder2",
        "moogvcf",
        "moogvcf2",
        "moscil",
        "mp3bitrate",
        "mp3in",
        "mp3len",
        "mp3nchnls",
        "mp3out",
        "mp3scal",
        "mp3sr",
        "mpulse",
        "mrtmsg",
        "ms2st",
        "mtof",
        "mton",
        "multitap",
        "mute",
        "mvchpf",
        "mvclpf1",
        "mvclpf2",
        "mvclpf3",
        "mvclpf4",
        "mvmfilter",
        "mxadsr",
        "nchnls_hw",
        "nestedap",
        "nlalp",
        "nlfilt",
        "nlfilt2",
        "noise",
        "noteoff",
        "noteon",
        "noteondur",
        "noteondur2",
        "notnum",
        "nreverb",
        "nrpn",
        "nsamp",
        "nstance",
        "nstrnum",
        "nstrstr",
        "ntof",
        "ntom",
        "ntrpol",
        "nxtpow2",
        "octave",
        "octcps",
        "octmidi",
        "octmidib",
        "octmidinn",
        "octpch",
        "olabuffer",
        "oscbnk",
        "oscil",
        "oscil1",
        "oscil1i",
        "oscil3",
        "oscili",
        "oscilikt",
        "osciliktp",
        "oscilikts",
        "osciln",
        "oscils",
        "oscilx",
        "out",
        "out32",
        "outall",
        "outc",
        "outch",
        "outh",
        "outiat",
        "outic",
        "outic14",
        "outipat",
        "outipb",
        "outipc",
        "outkat",
        "outkc",
        "outkc14",
        "outkpat",
        "outkpb",
        "outkpc",
        "outleta",
        "outletf",
        "outletk",
        "outletkid",
        "outletv",
        "outo",
        "outq",
        "outq1",
        "outq2",
        "outq3",
        "outq4",
        "outrg",
        "outs",
        "outs1",
        "outs2",
        "outvalue",
        "outx",
        "outz",
        "p",
        "p5gconnect",
        "p5gdata",
        "pan",
        "pan2",
        "pareq",
        "part2txt",
        "partials",
        "partikkel",
        "partikkelget",
        "partikkelset",
        "partikkelsync",
        "passign",
        "paulstretch",
        "pcauchy",
        "pchbend",
        "pchmidi",
        "pchmidib",
        "pchmidinn",
        "pchoct",
        "pchtom",
        "pconvolve",
        "pcount",
        "pdclip",
        "pdhalf",
        "pdhalfy",
        "peak",
        "pgmassign",
        "pgmchn",
        "phaser1",
        "phaser2",
        "phasor",
        "phasorbnk",
        "phs",
        "pindex",
        "pinker",
        "pinkish",
        "pitch",
        "pitchac",
        "pitchamdf",
        "planet",
        "platerev",
        "plltrack",
        "pluck",
        "poisson",
        "pol2rect",
        "polyaft",
        "polynomial",
        "port",
        "portk",
        "poscil",
        "poscil3",
        "pow",
        "powershape",
        "powoftwo",
        "pows",
        "prealloc",
        "prepiano",
        "print",
        "print_type",
        "printarray",
        "printf",
        "printf_i",
        "printk",
        "printk2",
        "printks",
        "printks2",
        "println",
        "prints",
        "printsk",
        "product",
        "pset",
        "ptablew",
        "ptrack",
        "puts",
        "pvadd",
        "pvbufread",
        "pvcross",
        "pvinterp",
        "pvoc",
        "pvread",
        "pvs2array",
        "pvs2tab",
        "pvsadsyn",
        "pvsanal",
        "pvsarp",
        "pvsbandp",
        "pvsbandr",
        "pvsbandwidth",
        "pvsbin",
        "pvsblur",
        "pvsbuffer",
        "pvsbufread",
        "pvsbufread2",
        "pvscale",
        "pvscent",
        "pvsceps",
        "pvscfs",
        "pvscross",
        "pvsdemix",
        "pvsdiskin",
        "pvsdisp",
        "pvsenvftw",
        "pvsfilter",
        "pvsfread",
        "pvsfreeze",
        "pvsfromarray",
        "pvsftr",
        "pvsftw",
        "pvsfwrite",
        "pvsgain",
        "pvsgendy",
        "pvshift",
        "pvsifd",
        "pvsin",
        "pvsinfo",
        "pvsinit",
        "pvslock",
        "pvslpc",
        "pvsmaska",
        "pvsmix",
        "pvsmooth",
        "pvsmorph",
        "pvsosc",
        "pvsout",
        "pvspitch",
        "pvstanal",
        "pvstencil",
        "pvstrace",
        "pvsvoc",
        "pvswarp",
        "pvsynth",
        "pwd",
        "pyassign",
        "pyassigni",
        "pyassignt",
        "pycall",
        "pycall1",
        "pycall1i",
        "pycall1t",
        "pycall2",
        "pycall2i",
        "pycall2t",
        "pycall3",
        "pycall3i",
        "pycall3t",
        "pycall4",
        "pycall4i",
        "pycall4t",
        "pycall5",
        "pycall5i",
        "pycall5t",
        "pycall6",
        "pycall6i",
        "pycall6t",
        "pycall7",
        "pycall7i",
        "pycall7t",
        "pycall8",
        "pycall8i",
        "pycall8t",
        "pycalli",
        "pycalln",
        "pycallni",
        "pycallt",
        "pyeval",
        "pyevali",
        "pyevalt",
        "pyexec",
        "pyexeci",
        "pyexect",
        "pyinit",
        "pylassign",
        "pylassigni",
        "pylassignt",
        "pylcall",
        "pylcall1",
        "pylcall1i",
        "pylcall1t",
        "pylcall2",
        "pylcall2i",
        "pylcall2t",
        "pylcall3",
        "pylcall3i",
        "pylcall3t",
        "pylcall4",
        "pylcall4i",
        "pylcall4t",
        "pylcall5",
        "pylcall5i",
        "pylcall5t",
        "pylcall6",
        "pylcall6i",
        "pylcall6t",
        "pylcall7",
        "pylcall7i",
        "pylcall7t",
        "pylcall8",
        "pylcall8i",
        "pylcall8t",
        "pylcalli",
        "pylcalln",
        "pylcallni",
        "pylcallt",
        "pyleval",
        "pylevali",
        "pylevalt",
        "pylexec",
        "pylexeci",
        "pylexect",
        "pylrun",
        "pylruni",
        "pylrunt",
        "pyrun",
        "pyruni",
        "pyrunt",
        "qinf",
        "qnan",
        "r2c",
        "rand",
        "randc",
        "randh",
        "randi",
        "random",
        "randomh",
        "randomi",
        "rbjeq",
        "readclock",
        "readf",
        "readfi",
        "readk",
        "readk2",
        "readk3",
        "readk4",
        "readks",
        "readscore",
        "readscratch",
        "rect2pol",
        "release",
        "remoteport",
        "remove",
        "repluck",
        "reshapearray",
        "reson",
        "resonbnk",
        "resonk",
        "resonr",
        "resonx",
        "resonxk",
        "resony",
        "resonz",
        "resyn",
        "reverb",
        "reverb2",
        "reverbsc",
        "rewindscore",
        "rezzy",
        "rfft",
        "rifft",
        "rms",
        "rnd",
        "rnd31",
        "rndseed",
        "round",
        "rspline",
        "rtclock",
        "s16b14",
        "s32b14",
        "samphold",
        "sandpaper",
        "sc_lag",
        "sc_lagud",
        "sc_phasor",
        "sc_trig",
        "scale",
        "scale2",
        "scalearray",
        "scanhammer",
        "scanmap",
        "scans",
        "scansmap",
        "scantable",
        "scanu",
        "scanu2",
        "schedkwhen",
        "schedkwhennamed",
        "schedule",
        "schedulek",
        "schedwhen",
        "scoreline",
        "scoreline_i",
        "seed",
        "sekere",
        "select",
        "semitone",
        "sense",
        "sensekey",
        "seqtime",
        "seqtime2",
        "sequ",
        "sequstate",
        "serialBegin",
        "serialEnd",
        "serialFlush",
        "serialPrint",
        "serialRead",
        "serialWrite",
        "serialWrite_i",
        "setcol",
        "setctrl",
        "setksmps",
        "setrow",
        "setscorepos",
        "sfilist",
        "sfinstr",
        "sfinstr3",
        "sfinstr3m",
        "sfinstrm",
        "sfload",
        "sflooper",
        "sfpassign",
        "sfplay",
        "sfplay3",
        "sfplay3m",
        "sfplaym",
        "sfplist",
        "sfpreset",
        "shaker",
        "shiftin",
        "shiftout",
        "signum",
        "sin",
        "sinh",
        "sininv",
        "sinsyn",
        "skf",
        "sleighbells",
        "slicearray",
        "slicearray_i",
        "slider16",
        "slider16f",
        "slider16table",
        "slider16tablef",
        "slider32",
        "slider32f",
        "slider32table",
        "slider32tablef",
        "slider64",
        "slider64f",
        "slider64table",
        "slider64tablef",
        "slider8",
        "slider8f",
        "slider8table",
        "slider8tablef",
        "sliderKawai",
        "sndloop",
        "sndwarp",
        "sndwarpst",
        "sockrecv",
        "sockrecvs",
        "socksend",
        "socksends",
        "sorta",
        "sortd",
        "soundin",
        "space",
        "spat3d",
        "spat3di",
        "spat3dt",
        "spdist",
        "spf",
        "splitrig",
        "sprintf",
        "sprintfk",
        "spsend",
        "sqrt",
        "squinewave",
        "st2ms",
        "statevar",
        "sterrain",
        "stix",
        "strcat",
        "strcatk",
        "strchar",
        "strchark",
        "strcmp",
        "strcmpk",
        "strcpy",
        "strcpyk",
        "strecv",
        "streson",
        "strfromurl",
        "strget",
        "strindex",
        "strindexk",
        "string2array",
        "strlen",
        "strlenk",
        "strlower",
        "strlowerk",
        "strrindex",
        "strrindexk",
        "strset",
        "strstrip",
        "strsub",
        "strsubk",
        "strtod",
        "strtodk",
        "strtol",
        "strtolk",
        "strupper",
        "strupperk",
        "stsend",
        "subinstr",
        "subinstrinit",
        "sum",
        "sumarray",
        "svfilter",
        "svn",
        "syncgrain",
        "syncloop",
        "syncphasor",
        "system",
        "system_i",
        "tab",
        "tab2array",
        "tab2pvs",
        "tab_i",
        "tabifd",
        "table",
        "table3",
        "table3kt",
        "tablecopy",
        "tablefilter",
        "tablefilteri",
        "tablegpw",
        "tablei",
        "tableicopy",
        "tableigpw",
        "tableikt",
        "tableimix",
        "tablekt",
        "tablemix",
        "tableng",
        "tablera",
        "tableseg",
        "tableshuffle",
        "tableshufflei",
        "tablew",
        "tablewa",
        "tablewkt",
        "tablexkt",
        "tablexseg",
        "tabmorph",
        "tabmorpha",
        "tabmorphak",
        "tabmorphi",
        "tabplay",
        "tabrec",
        "tabsum",
        "tabw",
        "tabw_i",
        "tambourine",
        "tan",
        "tanh",
        "taninv",
        "taninv2",
        "tbvcf",
        "tempest",
        "tempo",
        "temposcal",
        "tempoval",
        "timedseq",
        "timeinstk",
        "timeinsts",
        "timek",
        "times",
        "tival",
        "tlineto",
        "tone",
        "tonek",
        "tonex",
        "tradsyn",
        "trandom",
        "transeg",
        "transegb",
        "transegr",
        "trcross",
        "trfilter",
        "trhighest",
        "trigExpseg",
        "trigLinseg",
        "trigexpseg",
        "trigger",
        "trighold",
        "triglinseg",
        "trigphasor",
        "trigseq",
        "trim",
        "trim_i",
        "trirand",
        "trlowest",
        "trmix",
        "trscale",
        "trshift",
        "trsplit",
        "turnoff",
        "turnoff2",
        "turnoff2_i",
        "turnoff3",
        "turnon",
        "tvconv",
        "unirand",
        "unwrap",
        "upsamp",
        "urandom",
        "urd",
        "vactrol",
        "vadd",
        "vadd_i",
        "vaddv",
        "vaddv_i",
        "vaget",
        "valpass",
        "vaset",
        "vbap",
        "vbapg",
        "vbapgmove",
        "vbaplsinit",
        "vbapmove",
        "vbapz",
        "vbapzmove",
        "vcella",
        "vclpf",
        "vco",
        "vco2",
        "vco2ft",
        "vco2ift",
        "vco2init",
        "vcomb",
        "vcopy",
        "vcopy_i",
        "vdel_k",
        "vdelay",
        "vdelay3",
        "vdelayk",
        "vdelayx",
        "vdelayxq",
        "vdelayxs",
        "vdelayxw",
        "vdelayxwq",
        "vdelayxws",
        "vdivv",
        "vdivv_i",
        "vecdelay",
        "veloc",
        "vexp",
        "vexp_i",
        "vexpseg",
        "vexpv",
        "vexpv_i",
        "vibes",
        "vibr",
        "vibrato",
        "vincr",
        "vlimit",
        "vlinseg",
        "vlowres",
        "vmap",
        "vmirror",
        "vmult",
        "vmult_i",
        "vmultv",
        "vmultv_i",
        "voice",
        "vosim",
        "vphaseseg",
        "vport",
        "vpow",
        "vpow_i",
        "vpowv",
        "vpowv_i",
        "vps",
        "vpvoc",
        "vrandh",
        "vrandi",
        "vsubv",
        "vsubv_i",
        "vtaba",
        "vtabi",
        "vtabk",
        "vtable1k",
        "vtablea",
        "vtablei",
        "vtablek",
        "vtablewa",
        "vtablewi",
        "vtablewk",
        "vtabwa",
        "vtabwi",
        "vtabwk",
        "vwrap",
        "waveset",
        "websocket",
        "weibull",
        "wgbow",
        "wgbowedbar",
        "wgbrass",
        "wgclar",
        "wgflute",
        "wgpluck",
        "wgpluck2",
        "wguide1",
        "wguide2",
        "wiiconnect",
        "wiidata",
        "wiirange",
        "wiisend",
        "window",
        "wrap",
        "writescratch",
        "wterrain",
        "wterrain2",
        "xadsr",
        "xin",
        "xout",
        "xtratim",
        "xyscale",
        "zacl",
        "zakinit",
        "zamod",
        "zar",
        "zarg",
        "zaw",
        "zawm",
        "zdf_1pole",
        "zdf_1pole_mode",
        "zdf_2pole",
        "zdf_2pole_mode",
        "zdf_ladder",
        "zfilter2",
        "zir",
        "ziw",
        "ziwm",
        "zkcl",
        "zkmod",
        "zkr",
        "zkw",
        "zkwm"
    ];
    var deprecatedOpcodes = [
        "OSCsendA",
        "array",
        "beadsynt",
        "beosc",
        "bformdec",
        "bformenc",
        "buchla",
        "copy2ftab",
        "copy2ttab",
        "getrowlin",
        "hrtfer",
        "ktableseg",
        "lentab",
        "lua_exec",
        "lua_iaopcall",
        "lua_iaopcall_off",
        "lua_ikopcall",
        "lua_ikopcall_off",
        "lua_iopcall",
        "lua_iopcall_off",
        "lua_opdef",
        "maxtab",
        "mintab",
        "mp3scal_check",
        "mp3scal_load",
        "mp3scal_load2",
        "mp3scal_play",
        "mp3scal_play2",
        "pop",
        "pop_f",
        "ptable",
        "ptable3",
        "ptablei",
        "ptableiw",
        "push",
        "push_f",
        "pvsgendy",
        "scalet",
        "signalflowgraph",
        "sndload",
        "socksend_k",
        "soundout",
        "soundouts",
        "specaddm",
        "specdiff",
        "specdisp",
        "specfilt",
        "spechist",
        "specptrk",
        "specscal",
        "specsum",
        "spectrum",
        "stack",
        "sumTableFilter",
        "sumtab",
        "systime",
        "tabgen",
        "tableiw",
        "tabmap",
        "tabmap_i",
        "tabrowlin",
        "tabslice",
        "tb0",
        "tb0_init",
        "tb1",
        "tb10",
        "tb10_init",
        "tb11",
        "tb11_init",
        "tb12",
        "tb12_init",
        "tb13",
        "tb13_init",
        "tb14",
        "tb14_init",
        "tb15",
        "tb15_init",
        "tb1_init",
        "tb2",
        "tb2_init",
        "tb3",
        "tb3_init",
        "tb4",
        "tb4_init",
        "tb5",
        "tb5_init",
        "tb6",
        "tb6_init",
        "tb7",
        "tb7_init",
        "tb8",
        "tb8_init",
        "tb9",
        "tb9_init",
        "vbap16",
        "vbap1move",
        "vbap4",
        "vbap4move",
        "vbap8",
        "vbap8move",
        "xscanmap",
        "xscans",
        "xscansmap",
        "xscanu",
        "xyin"
    ];

    opcodes = lang.arrayToMap(opcodes);
    deprecatedOpcodes = lang.arrayToMap(deprecatedOpcodes);

    this.lineContinuations = [
        {
            token : "constant.character.escape.line-continuation.csound",
            regex : /\\$/
        }, this.pushRule({
            token : "constant.character.escape.line-continuation.csound",
            regex : /\\/,
            next  : "line continuation"
        })
    ];

    this.comments.push(this.lineContinuations);

    this.quotedStringContents.push(
        this.lineContinuations,
        {
            token : "invalid.illegal",
            regex : /[^"\\]*$/
        }
    );

    var start = this.$rules.start;
    start.splice(1, 0, {
        token : ["text.csound", "entity.name.label.csound", "entity.punctuation.label.csound", "text.csound"],
        regex : /^([ \t]*)(\w+)(:)([ \t]+|$)/
    });
    start.push(
        this.pushRule({
            token : "keyword.function.csound",
            regex : /\binstr\b/,
            next  : "instrument numbers and identifiers"
        }), this.pushRule({
            token : "keyword.function.csound",
            regex : /\bopcode\b/,
            next  : "after opcode keyword"
        }), {
            token : "keyword.other.csound",
            regex : /\bend(?:in|op)\b/
        },

        {
            token : "variable.language.csound",
            regex : /\b(?:0dbfs|A4|k(?:r|smps)|nchnls(?:_i)?|sr)\b/
        },

        this.numbers,

        {
            token : "keyword.operator.csound",
            regex : "\\+=|-=|\\*=|/=|<<|>>|<=|>=|==|!=|&&|\\|\\||[~¬]|[=!+\\-*/^%&|<>#?:]"
        },

        this.pushRule({
            token : "punctuation.definition.string.begin.csound",
            regex : /"/,
            next  : "quoted string"
        }), this.pushRule({
            token : "punctuation.definition.string.begin.csound",
            regex : /{{/,
            next  : "braced string"
        }),

        {
            token : "keyword.control.csound",
            regex : /\b(?:do|else(?:if)?|end(?:if|until)|fi|i(?:f|then)|kthen|od|r(?:ir)?eturn|then|until|while)\b/
        },

        this.pushRule({
            token : "keyword.control.csound",
            regex : /\b[ik]?goto\b/,
            next  : "goto before label"
        }), this.pushRule({
            token : "keyword.control.csound",
            regex : /\b(?:r(?:einit|igoto)|tigoto)\b/,
            next  : "goto before label"
        }), this.pushRule({
            token : "keyword.control.csound",
            regex : /\bc(?:g|in?|k|nk?)goto\b/,
            next  : ["goto before label", "goto before argument"]
        }), this.pushRule({
            token : "keyword.control.csound",
            regex : /\btimout\b/,
            next  : ["goto before label", "goto before argument", "goto before argument"]
        }), this.pushRule({
            token : "keyword.control.csound",
            regex : /\bloop_[gl][et]\b/,
            next  : ["goto before label", "goto before argument", "goto before argument", "goto before argument"]
        }),

        this.pushRule({
            token : "support.function.csound",
            regex : /\b(?:readscore|scoreline(?:_i)?)\b/,
            next  : "Csound score opcode"
        }), this.pushRule({
            token : "support.function.csound",
            regex : /\bpyl?run[it]?\b(?!$)/,
            next  : "Python opcode"
        }), this.pushRule({
            token : "support.function.csound",
            regex : /\blua_(?:exec|opdef)\b(?!$)/,
            next  : "Lua opcode"
        }),

        {
            token : "support.variable.csound",
            regex : /\bp\d+\b/
        }, {
            regex : /\b([A-Z_a-z]\w*)(?:(:)([A-Za-z]))?\b/, onMatch: function(value, currentState, stack, line) {
                var tokens = value.split(this.splitRegex);
                var name = tokens[1];
                var type;
                if (opcodes.hasOwnProperty(name))
                    type = "support.function.csound";
                else if (deprecatedOpcodes.hasOwnProperty(name))
                    type = "invalid.deprecated.csound";
                if (type) {
                    if (tokens[2]) {
                        return [
                            {type: type, value: name},
                            {type: "punctuation.type-annotation.csound", value: tokens[2]},
                            {type: "type-annotation.storage.type.csound", value: tokens[3]}
                        ];
                    }
                    return type;
                }
                return "text.csound";
            }
        }
    );

    this.$rules["macro parameter value list"].splice(2, 0, {
        token : "punctuation.definition.string.begin.csound",
        regex : /{{/,
        next  : "macro parameter value braced string"
    });

    var scoreHighlightRules = new CsoundScoreHighlightRules("csound-score-");

    this.addRules({
        "macro parameter value braced string": [
            {
                token : "constant.character.escape.csound",
                regex : /\\[#'()]/
            }, {
                token : "invalid.illegal.csound.csound",
                regex : /[#'()]/
            }, {
                token : "punctuation.definition.string.end.csound",
                regex : /}}/,
                next  : "macro parameter value list"
            }, {
                defaultToken: "string.braced.csound"
            }
        ],

        "instrument numbers and identifiers": [
            this.comments,
            {
                token : "entity.name.function.csound",
                regex : /\d+|[A-Z_a-z]\w*/
            }, this.popRule({
                token : "empty",
                regex : /$/
            })
        ],

        "after opcode keyword": [
            this.comments,
            this.popRule({
                token : "empty",
                regex : /$/
            }), this.popRule({
                token : "entity.name.function.opcode.csound",
                regex : /[A-Z_a-z]\w*/,
                next  : "opcode type signatures"
            })
        ],
        "opcode type signatures": [
            this.comments,
            this.popRule({
                token : "empty",
                regex : /$/
            }), {
                token : "storage.type.csound",
                // https://github.com/csound/csound/search?q=XIDENT+path%3AEngine+filename%3Acsound_orc.lex
                regex : /\b(?:0|[afijkKoOpPStV\[\]]+)/
            }
        ],

        "quoted string": [
            this.popRule({
                token : "punctuation.definition.string.end.csound",
                regex : /"/
            }),
            this.quotedStringContents,
            {
                defaultToken: "string.quoted.csound"
            }
        ],
        "braced string": [
            this.popRule({
                token : "punctuation.definition.string.end.csound",
                regex : /}}/
            }),
            this.bracedStringContents,
            {
                defaultToken: "string.braced.csound"
            }
        ],

        "goto before argument": [
            this.popRule({
                token : "text.csound",
                regex : /,/
            }),
            start
        ],
        "goto before label": [
            {
                token : "text.csound",
                regex : /\s+/
            },
            this.comments,
            this.popRule({
                token : "entity.name.label.csound",
                regex : /\w+/
            }), this.popRule({
                token : "empty",
                regex : /(?!\w)/
            })
        ],

        "Csound score opcode": [
            this.comments,
            {
                token : "punctuation.definition.string.begin.csound",
                regex : /{{/,
                next  : scoreHighlightRules.embeddedRulePrefix + "start"
            }, this.popRule({
                token : "empty",
                regex : /$/
            })
        ],

        "Python opcode": [
            this.comments,
            {
                token : "punctuation.definition.string.begin.csound",
                regex : /{{/,
                next  : "python-start"
            }, this.popRule({
                token : "empty",
                regex : /$/
            })
        ],

        "Lua opcode": [
            this.comments,
            {
                token : "punctuation.definition.string.begin.csound",
                regex : /{{/,
                next  : "lua-start"
            }, this.popRule({
                token : "empty",
                regex : /$/
            })
        ],

        "line continuation": [
            this.popRule({
                token : "empty",
                regex : /$/
            }),
            this.semicolonComments,
            {
                token : "invalid.illegal.csound",
                regex : /\S.*/
            }
        ]
    });

    var rules = [
        this.popRule({
            token : "punctuation.definition.string.end.csound",
            regex : /}}/
        })
    ];
    this.embedRules(scoreHighlightRules.getRules(), scoreHighlightRules.embeddedRulePrefix, rules);
    this.embedRules(PythonHighlightRules, "python-", rules);
    this.embedRules(LuaHighlightRules, "lua-", rules);

    this.normalizeRules();
};

oop.inherits(CsoundOrchestraHighlightRules, CsoundPreprocessorHighlightRules);

exports.e = CsoundOrchestraHighlightRules;


/***/ }),

/***/ 32060:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);

var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

var CsoundPreprocessorHighlightRules = function(embeddedRulePrefix) {

    this.embeddedRulePrefix = embeddedRulePrefix === undefined ? "" : embeddedRulePrefix;

    this.semicolonComments = {
        token : "comment.line.semicolon.csound",
        regex : ";.*$"
    };

    this.comments = [
        {
            token : "punctuation.definition.comment.begin.csound",
            regex : "/\\*",
            push  : [
                {
                    token : "punctuation.definition.comment.end.csound",
                    regex : "\\*/",
                    next  : "pop"
                }, {
                    defaultToken: "comment.block.csound"
                }
            ]
        }, {
            token : "comment.line.double-slash.csound",
            regex : "//.*$"
        },
        this.semicolonComments
    ];

    this.macroUses = [
        {
            token : ["entity.name.function.preprocessor.csound", "punctuation.definition.macro-parameter-value-list.begin.csound"],
            regex : /(\$[A-Z_a-z]\w*\.?)(\()/,
            next  : "macro parameter value list"
        }, {
            token : "entity.name.function.preprocessor.csound",
            regex : /\$[A-Z_a-z]\w*(?:\.|\b)/
        }
    ];

    this.numbers = [
        {
            token : "constant.numeric.float.csound",
            regex : /(?:\d+[Ee][+-]?\d+)|(?:\d+\.\d*|\d*\.\d+)(?:[Ee][+-]?\d+)?/
        }, {
            token : ["storage.type.number.csound", "constant.numeric.integer.hexadecimal.csound"],
            regex : /(0[Xx])([0-9A-Fa-f]+)/
        }, {
            token : "constant.numeric.integer.decimal.csound",
            regex : /\d+/
        }
    ];

    this.bracedStringContents = [
        {
            token : "constant.character.escape.csound",
            // https://github.com/csound/csound/search?q=unquote_string+path%3AEngine+filename%3Acsound_orc_compile.c
            regex : /\\(?:[\\abnrt"]|[0-7]{1,3})/
        },
        // Format specifiers are included in quoted and braced strings. This
        // means that format specifiers are highlighted in all strings, even
        // though only
        //   fprintks        https://csound.com/docs/manual/fprintks.html
        //   fprints         https://csound.com/docs/manual/fprints.html
        //   printf/printf_i https://csound.com/docs/manual/printf.html
        //   printks         https://csound.com/docs/manual/printks.html
        //   prints          https://csound.com/docs/manual/prints.html
        //   sprintf         https://csound.com/docs/manual/sprintf.html
        //   sprintfk        https://csound.com/docs/manual/sprintfk.html
        // work with strings that contain format specifiers. In addition, these
        // opcodes’ handling of format specifiers is inconsistent:
        //   - fprintks, fprints, printks, and prints do accept %a and %A
        //     specifiers, but can’t accept %s specifiers.
        //   - printf, printf_i, sprintf, and sprintfk don’t accept %a and %A
        //     specifiers, but do accept %s specifiers.
        // See https://github.com/csound/csound/issues/747 for more information.
        {
            token : "constant.character.placeholder.csound",
            regex : /%[#0\- +]*\d*(?:\.\d+)?[diuoxXfFeEgGaAcs]/
        }, {
            token : "constant.character.escape.csound",
            regex : /%%/
        }
    ];

    this.quotedStringContents = [
        this.macroUses,
        this.bracedStringContents
    ];

    var start = [
        this.comments,

        {
            token : "keyword.preprocessor.csound",
            regex : /#(?:e(?:nd(?:if)?|lse)\b|##)|@@?[ \t]*\d+/
        }, {
            token : "keyword.preprocessor.csound",
            regex : /#include/,
            push  : [
                this.comments,
                {
                    token : "string.csound",
                    regex : /([^ \t])(?:.*?\1)/,
                    next  : "pop"
                }
            ]
        }, {
            token : "keyword.preprocessor.csound",
            regex : /#includestr/,
            push  : [
                this.comments,
                {
                    token : "string.csound",
                    regex : /([^ \t])(?:.*?\1)/,
                    next  : "pop"
                }
            ]
        }, {
            token : "keyword.preprocessor.csound",
            regex : /#[ \t]*define/,
            next  : "define directive"
        }, {
            token : "keyword.preprocessor.csound",
            regex : /#(?:ifn?def|undef)\b/,
            next  : "macro directive"
        },

        this.macroUses
    ];

    this.$rules = {
        "start": start,

        "define directive": [
            this.comments,
            {
                token : "entity.name.function.preprocessor.csound",
                regex : /[A-Z_a-z]\w*/
            }, {
                token : "punctuation.definition.macro-parameter-name-list.begin.csound",
                regex : /\(/,
                next  : "macro parameter name list"
            }, {
                token : "punctuation.definition.macro.begin.csound",
                regex : /#/,
                next  : "macro body"
            }
        ],
        "macro parameter name list": [
            {
                token : "variable.parameter.preprocessor.csound",
                regex : /[A-Z_a-z]\w*/
            }, {
                token : "punctuation.definition.macro-parameter-name-list.end.csound",
                regex : /\)/,
                next  : "define directive"
            }
        ],
        "macro body": [
            {
                token : "constant.character.escape.csound",
                regex : /\\#/
            }, {
                token : "punctuation.definition.macro.end.csound",
                regex : /#/,
                next  : "start"
            },
            start
        ],

        "macro directive": [
            this.comments,
            {
                token : "entity.name.function.preprocessor.csound",
                regex : /[A-Z_a-z]\w*/,
                next  : "start"
            }
        ],

        "macro parameter value list": [
            {
                token : "punctuation.definition.macro-parameter-value-list.end.csound",
                regex : /\)/,
                next  : "start"
            }, {
                token : "punctuation.definition.string.begin.csound",
                regex : /"/,
                next  : "macro parameter value quoted string"
            }, this.pushRule({
                token : "punctuation.macro-parameter-value-parenthetical.begin.csound",
                regex : /\(/,
                next  : "macro parameter value parenthetical"
            }), {
                token : "punctuation.macro-parameter-value-separator.csound",
                regex : "[#']"
            }
        ],
        "macro parameter value quoted string": [
            {
                token : "constant.character.escape.csound",
                regex : /\\[#'()]/
            }, {
                token : "invalid.illegal.csound",
                regex : /[#'()]/
            }, {
                token : "punctuation.definition.string.end.csound",
                regex : /"/,
                next  : "macro parameter value list"
            },
            this.quotedStringContents,
            {
                defaultToken: "string.quoted.csound"
            }
        ],
        "macro parameter value parenthetical": [
            {
                token : "constant.character.escape.csound",
                regex : /\\\)/
            }, this.popRule({
                token : "punctuation.macro-parameter-value-parenthetical.end.csound",
                regex : /\)/
            }), this.pushRule({
                token : "punctuation.macro-parameter-value-parenthetical.begin.csound",
                regex : /\(/,
                next  : "macro parameter value parenthetical"
            }),
            start
        ]
    };
};

oop.inherits(CsoundPreprocessorHighlightRules, TextHighlightRules);

(function() {

    this.pushRule = function(params) {
        if (Array.isArray(params.next)) {
            for (var i = 0; i < params.next.length; i++) {
                params.next[i] = this.embeddedRulePrefix + params.next[i];
            }
        }

        return {
            regex : params.regex, onMatch: function(value, currentState, stack, line) {
                if (stack.length === 0)
                    stack.push(currentState);
                if (Array.isArray(params.next)) {
                    for (var i = 0; i < params.next.length; i++) {
                        stack.push(params.next[i]);
                    }
                } else {
                    stack.push(params.next);
                }
                this.next = stack[stack.length - 1];
                return params.token;
            },

            get next() { return Array.isArray(params.next) ? params.next[params.next.length - 1] : params.next; },
            set next(next) {
                if (!Array.isArray(params.next)) {
                    params.next = next;
                }
            },

            get token() { return params.token; }
        };
    };

    this.popRule = function(params) {
        if (params.next) {
            params.next = this.embeddedRulePrefix + params.next;
        }

        return {
            regex : params.regex, onMatch: function(value, currentState, stack, line) {
                stack.pop();
                if (params.next) {
                    stack.push(params.next);
                    this.next = stack[stack.length - 1];
                } else {
                    this.next = stack.length > 1 ? stack[stack.length - 1] : stack.pop();
                }
                return params.token;
            }
        };
    };

}).call(CsoundPreprocessorHighlightRules.prototype);

exports.H = CsoundPreprocessorHighlightRules;


/***/ }),

/***/ 53112:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);

var CsoundPreprocessorHighlightRules = (__webpack_require__(32060)/* .CsoundPreprocessorHighlightRules */ .H);

var CsoundScoreHighlightRules = function(embeddedRulePrefix) {

    CsoundPreprocessorHighlightRules.call(this, embeddedRulePrefix);

    this.quotedStringContents.push({
        token : "invalid.illegal.csound-score",
        regex : /[^"]*$/
    });

    var start = this.$rules.start;
    start.push(
        {
            token : "keyword.control.csound-score",
            regex : /[aBbCdefiqstvxy]/
        }, {
            // w statements are generated internally and should not be used; see
            // https://github.com/csound/csound/issues/750.
            token : "invalid.illegal.csound-score",
            regex : /w/
        }, {
            // z is not a statement, but rather a constant equal to
            // 800,000,000,000. 800 billion seconds is about 25,367.8 years. See
            // also https://csound.github.io/docs/manual/ScoreTop.html and
            // https://github.com/csound/csound/search?q=stof+path%3AEngine+filename%3Asread.c.
            token : "constant.numeric.language.csound-score",
            regex : /z/
        }, {
            token : ["keyword.control.csound-score", "constant.numeric.integer.decimal.csound-score"],
            regex : /([nNpP][pP])(\d+)/
        }, {
            token : "keyword.other.csound-score",
            regex : /[mn]/,
            push  : [
                {
                    token : "empty",
                    regex : /$/,
                    next  : "pop"
                },
                this.comments,
                {
                    token : "entity.name.label.csound-score",
                    regex : /[A-Z_a-z]\w*/
                }
            ]
        }, {
            token : "keyword.preprocessor.csound-score",
            regex : /r\b/,
            next  : "repeat section"
        },

        this.numbers,

        {
            token : "keyword.operator.csound-score",
            regex : "[!+\\-*/^%&|<>#~.]"
        },

        this.pushRule({
            token : "punctuation.definition.string.begin.csound-score",
            regex : /"/,
            next  : "quoted string"
        }),

        this.pushRule({
            token : "punctuation.braced-loop.begin.csound-score",
            regex : /{/,
            next  : "loop after left brace"
        })
    );

    this.addRules({
        "repeat section": [
            {
                token : "empty",
                regex : /$/,
                next  : "start"
            },
            this.comments,
            {
                token : "constant.numeric.integer.decimal.csound-score",
                regex : /\d+/,
                next  : "repeat section before label"
            }
        ],
        "repeat section before label": [
            {
                token : "empty",
                regex : /$/,
                next  : "start"
            },
            this.comments,
            {
                token : "entity.name.label.csound-score",
                regex : /[A-Z_a-z]\w*/,
                next  : "start"
            }
        ],

        "quoted string": [
            this.popRule({
                token : "punctuation.definition.string.end.csound-score",
                regex : /"/
            }),
            this.quotedStringContents,
            {
                defaultToken: "string.quoted.csound-score"
            }
        ],

        "loop after left brace": [
            this.popRule({
                token : "constant.numeric.integer.decimal.csound-score",
                regex : /\d+/,
                next  : "loop after repeat count"
            }),
            this.comments,
            {
                token : "invalid.illegal.csound",
                regex : /\S.*/
            }
        ],
        "loop after repeat count": [
            this.popRule({
                token : "entity.name.function.preprocessor.csound-score",
                regex : /[A-Z_a-z]\w*\b/,
                next  : "loop after macro name"
            }),
            this.comments,
            {
                token : "invalid.illegal.csound",
                regex : /\S.*/
            }
        ],
        "loop after macro name": [
            start,
            this.popRule({
                token : "punctuation.braced-loop.end.csound-score",
                regex : /}/
            })
        ]
    });

    this.normalizeRules();
};

oop.inherits(CsoundScoreHighlightRules, CsoundPreprocessorHighlightRules);

exports.U = CsoundScoreHighlightRules;


/***/ }),

/***/ 98092:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

var LuaHighlightRules = function() {

    var keywords = (
        "break|do|else|elseif|end|for|function|if|in|local|repeat|"+
         "return|then|until|while|or|and|not"
    );

    var builtinConstants = ("true|false|nil|_G|_VERSION");

    var functions = (
      // builtinFunctions
        "string|xpcall|package|tostring|print|os|unpack|require|"+
        "getfenv|setmetatable|next|assert|tonumber|io|rawequal|"+
        "collectgarbage|getmetatable|module|rawset|math|debug|"+
        "pcall|table|newproxy|type|coroutine|_G|select|gcinfo|"+
        "pairs|rawget|loadstring|ipairs|_VERSION|dofile|setfenv|"+
        "load|error|loadfile|"+

        "sub|upper|len|gfind|rep|find|match|char|dump|gmatch|"+
        "reverse|byte|format|gsub|lower|preload|loadlib|loaded|"+
        "loaders|cpath|config|path|seeall|exit|setlocale|date|"+
        "getenv|difftime|remove|time|clock|tmpname|rename|execute|"+
        "lines|write|close|flush|open|output|type|read|stderr|"+
        "stdin|input|stdout|popen|tmpfile|log|max|acos|huge|"+
        "ldexp|pi|cos|tanh|pow|deg|tan|cosh|sinh|random|randomseed|"+
        "frexp|ceil|floor|rad|abs|sqrt|modf|asin|min|mod|fmod|log10|"+
        "atan2|exp|sin|atan|getupvalue|debug|sethook|getmetatable|"+
        "gethook|setmetatable|setlocal|traceback|setfenv|getinfo|"+
        "setupvalue|getlocal|getregistry|getfenv|setn|insert|getn|"+
        "foreachi|maxn|foreach|concat|sort|remove|resume|yield|"+
        "status|wrap|create|running|"+
      // metatableMethods
        "__add|__sub|__mod|__unm|__concat|__lt|__index|__call|__gc|__metatable|"+
         "__mul|__div|__pow|__len|__eq|__le|__newindex|__tostring|__mode|__tonumber"
    );

    var stdLibaries = ("string|package|os|io|math|debug|table|coroutine");

    var deprecatedIn5152 = ("setn|foreach|foreachi|gcinfo|log10|maxn");

    var keywordMapper = this.createKeywordMapper({
        "keyword": keywords,
        "support.function": functions,
        "keyword.deprecated": deprecatedIn5152,
        "constant.library": stdLibaries,
        "constant.language": builtinConstants,
        "variable.language": "self"
    }, "identifier");

    var decimalInteger = "(?:(?:[1-9]\\d*)|(?:0))";
    var hexInteger = "(?:0[xX][\\dA-Fa-f]+)";
    var integer = "(?:" + decimalInteger + "|" + hexInteger + ")";

    var fraction = "(?:\\.\\d+)";
    var intPart = "(?:\\d+)";
    var pointFloat = "(?:(?:" + intPart + "?" + fraction + ")|(?:" + intPart + "\\.))";
    var floatNumber = "(?:" + pointFloat + ")";

    this.$rules = {
        "start" : [{
            stateName: "bracketedComment",
            onMatch : function(value, currentState, stack){
                stack.unshift(this.next, value.length - 2, currentState);
                return "comment";
            },
            regex : /\-\-\[=*\[/,
            next  : [
                {
                    onMatch : function(value, currentState, stack) {
                        if (value.length == stack[1]) {
                            stack.shift();
                            stack.shift();
                            this.next = stack.shift();
                        } else {
                            this.next = "";
                        }
                        return "comment";
                    },
                    regex : /\]=*\]/,
                    next  : "start"
                }, {
                    defaultToken : "comment"
                }
            ]
        },

        {
            token : "comment",
            regex : "\\-\\-.*$"
        },
        {
            stateName: "bracketedString",
            onMatch : function(value, currentState, stack){
                stack.unshift(this.next, value.length, currentState);
                return "string.start";
            },
            regex : /\[=*\[/,
            next  : [
                {
                    onMatch : function(value, currentState, stack) {
                        if (value.length == stack[1]) {
                            stack.shift();
                            stack.shift();
                            this.next = stack.shift();
                        } else {
                            this.next = "";
                        }
                        return "string.end";
                    },
                    
                    regex : /\]=*\]/,
                    next  : "start"
                }, {
                    defaultToken : "string"
                }
            ]
        },
        {
            token : "string",           // " string
            regex : '"(?:[^\\\\]|\\\\.)*?"'
        }, {
            token : "string",           // ' string
            regex : "'(?:[^\\\\]|\\\\.)*?'"
        }, {
            token : "constant.numeric", // float
            regex : floatNumber
        }, {
            token : "constant.numeric", // integer
            regex : integer + "\\b"
        }, {
            token : keywordMapper,
            regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        }, {
            token : "keyword.operator",
            regex : "\\+|\\-|\\*|\\/|%|\\#|\\^|~|<|>|<=|=>|==|~=|=|\\:|\\.\\.\\.|\\.\\."
        }, {
            token : "paren.lparen",
            regex : "[\\[\\(\\{]"
        }, {
            token : "paren.rparen",
            regex : "[\\]\\)\\}]"
        }, {
            token : "text",
            regex : "\\s+|\\w+"
        } ]
    };
    
    this.normalizeRules();
};

oop.inherits(LuaHighlightRules, TextHighlightRules);

exports.Q = LuaHighlightRules;


/***/ }),

/***/ 71924:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
 * TODO: python delimiters
 */



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

var PythonHighlightRules = function() {

    var keywords = (
        "and|as|assert|break|class|continue|def|del|elif|else|except|exec|" +
        "finally|for|from|global|if|import|in|is|lambda|not|or|pass|print|" +
        "raise|return|try|while|with|yield|async|await|nonlocal"
    );

    var builtinConstants = (
        "True|False|None|NotImplemented|Ellipsis|__debug__"
    );

    var builtinFunctions = (
        "abs|divmod|input|open|staticmethod|all|enumerate|int|ord|str|any|" +
        "eval|isinstance|pow|sum|basestring|execfile|issubclass|print|super|" +
        "binfile|bin|iter|property|tuple|bool|filter|len|range|type|bytearray|" +
        "float|list|raw_input|unichr|callable|format|locals|reduce|unicode|" +
        "chr|frozenset|long|reload|vars|classmethod|getattr|map|repr|xrange|" +
        "cmp|globals|max|reversed|zip|compile|hasattr|memoryview|round|" +
        "__import__|complex|hash|min|apply|delattr|help|next|setattr|set|" +
        "buffer|dict|hex|object|slice|coerce|dir|id|oct|sorted|intern|" +
        "ascii|breakpoint|bytes"
    );

    //var futureReserved = "";
    var keywordMapper = this.createKeywordMapper({
        "invalid.deprecated": "debugger",
        "support.function": builtinFunctions,
        "variable.language": "self|cls",
        "constant.language": builtinConstants,
        "keyword": keywords
    }, "identifier");

    var strPre = "[uU]?";
    var strRawPre = "[rR]";
    var strFormatPre = "[fF]";
    var strRawFormatPre = "(?:[rR][fF]|[fF][rR])";
    var decimalInteger = "(?:(?:[1-9]\\d*)|(?:0))";
    var octInteger = "(?:0[oO]?[0-7]+)";
    var hexInteger = "(?:0[xX][\\dA-Fa-f]+)";
    var binInteger = "(?:0[bB][01]+)";
    var integer = "(?:" + decimalInteger + "|" + octInteger + "|" + hexInteger + "|" + binInteger + ")";

    var exponent = "(?:[eE][+-]?\\d+)";
    var fraction = "(?:\\.\\d+)";
    var intPart = "(?:\\d+)";
    var pointFloat = "(?:(?:" + intPart + "?" + fraction + ")|(?:" + intPart + "\\.))";
    var exponentFloat = "(?:(?:" + pointFloat + "|" + intPart + ")" + exponent + ")";
    var floatNumber = "(?:" + exponentFloat + "|" + pointFloat + ")";

    var stringEscape = "\\\\(x[0-9A-Fa-f]{2}|[0-7]{3}|[\\\\abfnrtv'\"]|U[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})";

    this.$rules = {
        "start" : [ {
            token : "comment",
            regex : "#.*$"
        }, {
            token : "string",           // multi line """ string start
            regex : strPre + '"{3}',
            next : "qqstring3"
        }, {
            token : "string",           // " string
            regex : strPre + '"(?=.)',
            next : "qqstring"
        }, {
            token : "string",           // multi line ''' string start
            regex : strPre + "'{3}",
            next : "qstring3"
        }, {
            token : "string",           // ' string
            regex : strPre + "'(?=.)",
            next : "qstring"
        }, {
            token: "string",
            regex: strRawPre + '"{3}',
            next: "rawqqstring3"
        }, {
            token: "string", 
            regex: strRawPre + '"(?=.)',
            next: "rawqqstring"
        }, {
            token: "string",
            regex: strRawPre + "'{3}",
            next: "rawqstring3"
        }, {
            token: "string",
            regex: strRawPre + "'(?=.)",
            next: "rawqstring"
        }, {
            token: "string",
            regex: strFormatPre + '"{3}',
            next: "fqqstring3"
        }, {
            token: "string",
            regex: strFormatPre + '"(?=.)',
            next: "fqqstring"
        }, {
            token: "string",
            regex: strFormatPre + "'{3}",
            next: "fqstring3"
        }, {
            token: "string",
            regex: strFormatPre + "'(?=.)",
            next: "fqstring"
        },{
            token: "string",
            regex: strRawFormatPre + '"{3}',
            next: "rfqqstring3"
        }, {
            token: "string",
            regex: strRawFormatPre + '"(?=.)',
            next: "rfqqstring"
        }, {
            token: "string",
            regex: strRawFormatPre + "'{3}",
            next: "rfqstring3"
        }, {
            token: "string",
            regex: strRawFormatPre + "'(?=.)",
            next: "rfqstring"
        }, {
            token: "keyword.operator",
            regex: "\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|@|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|="
        }, {
            token: "punctuation",
            regex: ",|:|;|\\->|\\+=|\\-=|\\*=|\\/=|\\/\\/=|%=|@=|&=|\\|=|^=|>>=|<<=|\\*\\*="
        }, {
            token: "paren.lparen",
            regex: "[\\[\\(\\{]"
        }, {
            token: "paren.rparen",
            regex: "[\\]\\)\\}]"
        }, {
            token: ["keyword", "text", "entity.name.function"],
            regex: "(def|class)(\\s+)([\\u00BF-\\u1FFF\\u2C00-\\uD7FF\\w]+)"
         }, {
            token: "text",
            regex: "\\s+"
        }, {
            include: "constants"
        }],
        "qqstring3": [{
            token: "constant.language.escape",
            regex: stringEscape
        }, {
            token: "string", // multi line """ string end
            regex: '"{3}',
            next: "start"
        }, {
            defaultToken: "string"
        }],
        "qstring3": [{
            token: "constant.language.escape",
            regex: stringEscape
        }, {
            token: "string",  // multi line ''' string end
            regex: "'{3}",
            next: "start"
        }, {
            defaultToken: "string"
        }],
        "qqstring": [{
            token: "constant.language.escape",
            regex: stringEscape
        }, {
            token: "string",
            regex: "\\\\$",
            next: "qqstring"
        }, {
            token: "string",
            regex: '"|$',
            next: "start"
        }, {
            defaultToken: "string"
        }],
        "qstring": [{
            token: "constant.language.escape",
            regex: stringEscape
        }, {
            token: "string",
            regex: "\\\\$",
            next: "qstring"
        }, {
            token: "string",
            regex: "'|$",
            next: "start"
        }, {
            defaultToken: "string"
        }],
        "rawqqstring3": [{
            token: "string", // multi line """ string end
            regex: '"{3}',
            next: "start"
        }, {
            defaultToken: "string"
        }],
        "rawqstring3": [{
            token: "string",  // multi line ''' string end
            regex: "'{3}",
            next: "start"
        }, {
            defaultToken: "string"
        }],
        "rawqqstring": [{
            token: "string",
            regex: "\\\\$",
            next: "rawqqstring"
        }, {
            token: "string",
            regex: '"|$',
            next: "start"
        }, {
            defaultToken: "string"
        }],
        "rawqstring": [{
            token: "string",
            regex: "\\\\$",
            next: "rawqstring"
        }, {
            token: "string",
            regex: "'|$",
            next: "start"
        }, {
            defaultToken: "string"
        }],
        "fqqstring3": [{
            token: "constant.language.escape",
            regex: stringEscape
        }, {
            token: "string", // multi line """ string end
            regex: '"{3}',
            next: "start"
        }, {
            token: "paren.lparen",
            regex: "{",
            push: "fqstringParRules"
        }, {
            defaultToken: "string"
        }],
        "fqstring3": [{
            token: "constant.language.escape",
            regex: stringEscape
        }, {
            token: "string",  // multi line ''' string end
            regex: "'{3}",
            next: "start"
        }, {
            token: "paren.lparen",
            regex: "{",
            push: "fqstringParRules"
        }, {
            defaultToken: "string"
        }],
        "fqqstring": [{
            token: "constant.language.escape",
            regex: stringEscape
        }, {
            token: "string",
            regex: "\\\\$",
            next: "fqqstring"
        }, {
            token: "string",
            regex: '"|$',
            next: "start"
        }, {
            token: "paren.lparen",
            regex: "{",
            push: "fqstringParRules"
        }, {
            defaultToken: "string"
        }],
        "fqstring": [{
            token: "constant.language.escape",
            regex: stringEscape
        }, {
            token: "string",
            regex: "'|$",
            next: "start"
        }, {
            token: "paren.lparen",
            regex: "{",
            push: "fqstringParRules"
        }, {
            defaultToken: "string"
        }],
        "rfqqstring3": [{
            token: "string", // multi line """ string end
            regex: '"{3}',
            next: "start"
        }, {
            token: "paren.lparen",
            regex: "{",
            push: "fqstringParRules"
        }, {
            defaultToken: "string"
        }],
        "rfqstring3": [{
            token: "string",  // multi line ''' string end
            regex: "'{3}",
            next: "start"
        }, {
            token: "paren.lparen",
            regex: "{",
            push: "fqstringParRules"
        }, {
            defaultToken: "string"
        }],
        "rfqqstring": [{
            token: "string",
            regex: "\\\\$",
            next: "rfqqstring"
        }, {
            token: "string",
            regex: '"|$',
            next: "start"
        }, {
            token: "paren.lparen",
            regex: "{",
            push: "fqstringParRules"
        }, {
            defaultToken: "string"
        }],
        "rfqstring": [{
            token: "string",
            regex: "'|$",
            next: "start"
        }, {
            token: "paren.lparen",
            regex: "{",
            push: "fqstringParRules"
        }, {
            defaultToken: "string"
        }],
        "fqstringParRules": [{//TODO: nested {}
            token: "paren.lparen",
            regex: "[\\[\\(]"
        }, {
            token: "paren.rparen",
            regex: "[\\]\\)]"
        }, {
            token: "string",
            regex: "\\s+"
        }, {
            token: "string",
            regex: "'[^']*'"
        }, {
            token: "string",
            regex: '"[^"]*"'
        }, {
            token: "function.support",
            regex: "(!s|!r|!a)"
        }, {
            include: "constants"
        },{
            token: 'paren.rparen',
            regex: "}",
            next: 'pop'
        },{
            token: 'paren.lparen',
            regex: "{",
            push: "fqstringParRules"
        }],
        "constants": [{
            token: "constant.numeric", // imaginary
            regex: "(?:" + floatNumber + "|\\d+)[jJ]\\b"
        }, {
            token: "constant.numeric", // float
            regex: floatNumber
        }, {
            token: "constant.numeric", // long integer
            regex: integer + "[lL]\\b"
        }, {
            token: "constant.numeric", // integer
            regex: integer + "\\b"
        }, {
            token: ["punctuation", "function.support"],// method
            regex: "(\\.)([a-zA-Z_]+)\\b"
        }, {
            token: keywordMapper,
            regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        }]
    };
    this.normalizeRules();
};

oop.inherits(PythonHighlightRules, TextHighlightRules);

exports.H = PythonHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjE2My5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBYTs7QUFFYixXQUFXLG1CQUFPLENBQUMsS0FBYTtBQUNoQyxVQUFVLG1CQUFPLENBQUMsS0FBWTs7QUFFOUIsdUNBQXVDLHNFQUFpRjtBQUN4SCxnQ0FBZ0MsK0RBQW1FO0FBQ25HLHdCQUF3Qix1REFBa0Q7QUFDMUUsMkJBQTJCLDBEQUF3RDs7QUFFbkY7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDJFQUEyRSx3QkFBd0Isd0RBQXdELGtDQUFrQztBQUMzTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qix3QkFBd0I7QUFDckQsNkJBQTZCLDZEQUE2RDtBQUMxRiw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLFNBQXFDOzs7Ozs7OztBQ3ovRHhCOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxLQUFZOztBQUU5Qix5QkFBeUIsd0RBQW9EOztBQUU3RTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxJQUFJO0FBQy9DLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSw0QkFBNEIsd0JBQXdCO0FBQ3BEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLHdCQUF3QjtBQUM1RDtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYix5QkFBeUIsd0ZBQXdGO0FBQ2pIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYiwwQkFBMEI7QUFDMUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7O0FBRUQsU0FBd0M7Ozs7Ozs7O0FDeFMzQjs7QUFFYixVQUFVLG1CQUFPLENBQUMsS0FBWTs7QUFFOUIsdUNBQXVDLHNFQUFpRjs7QUFFeEg7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDZFQUE2RTtBQUM3RTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCLGFBQWE7QUFDYjtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTs7QUFFQSxTQUFpQzs7Ozs7Ozs7QUN6SnBCOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxLQUFZO0FBQzlCLHlCQUF5Qix3REFBb0Q7O0FBRTdFOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsK0JBQStCO0FBQy9CLFNBQVM7QUFDVDtBQUNBLCtCQUErQjtBQUMvQixTQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUF5Qjs7Ozs7Ozs7QUM3SnpCO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsS0FBWTtBQUM5Qix5QkFBeUIsd0RBQW9EOztBQUU3RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBDQUEwQyxFQUFFLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxjQUFjLEVBQUU7O0FBRXRHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsZ0NBQWdDLEVBQUU7QUFDbEM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsZ0NBQWdDLEVBQUU7QUFDbEM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0Esa0NBQWtDLEVBQUU7QUFDcEM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0Esa0NBQWtDLEVBQUU7QUFDcEM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EscUNBQXFDLEVBQUU7QUFDdkM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EscUNBQXFDLEVBQUU7QUFDdkM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0Esd0NBQXdDLEVBQUU7QUFDMUM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0Esd0NBQXdDLEVBQUU7QUFDMUM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx5QkFBeUI7QUFDekIsU0FBUztBQUNUO0FBQ0EsOEJBQThCO0FBQzlCLFNBQVM7QUFDVDtBQUNBLDhCQUE4QjtBQUM5QixTQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHNCQUFzQixFQUFFO0FBQ3hCO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHNCQUFzQixFQUFFO0FBQ3hCO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxzQkFBc0IsRUFBRTtBQUN4QjtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0Esc0JBQXNCLEVBQUU7QUFDeEI7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxzQkFBc0IsRUFBRTtBQUN4QjtBQUNBLFNBQVM7QUFDVDtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxzQkFBc0IsRUFBRTtBQUN4QjtBQUNBLFNBQVM7QUFDVDtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxzQkFBc0IsRUFBRTtBQUN4QjtBQUNBLFNBQVM7QUFDVDtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0Esc0JBQXNCLEVBQUU7QUFDeEI7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNULDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLFNBQVM7QUFDVDtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUE0QiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvY3NvdW5kX29yY2hlc3RyYV9oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9jc291bmRfcHJlcHJvY2Vzc29yX2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2Nzb3VuZF9zY29yZV9oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9sdWFfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvcHl0aG9uX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIGxhbmcgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG5cbnZhciBDc291bmRQcmVwcm9jZXNzb3JIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2Nzb3VuZF9wcmVwcm9jZXNzb3JfaGlnaGxpZ2h0X3J1bGVzXCIpLkNzb3VuZFByZXByb2Nlc3NvckhpZ2hsaWdodFJ1bGVzO1xudmFyIENzb3VuZFNjb3JlSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9jc291bmRfc2NvcmVfaGlnaGxpZ2h0X3J1bGVzXCIpLkNzb3VuZFNjb3JlSGlnaGxpZ2h0UnVsZXM7XG52YXIgTHVhSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9sdWFfaGlnaGxpZ2h0X3J1bGVzXCIpLkx1YUhpZ2hsaWdodFJ1bGVzO1xudmFyIFB5dGhvbkhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vcHl0aG9uX2hpZ2hsaWdodF9ydWxlc1wiKS5QeXRob25IaWdobGlnaHRSdWxlcztcblxudmFyIENzb3VuZE9yY2hlc3RyYUhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oZW1iZWRkZWRSdWxlUHJlZml4KSB7XG5cbiAgICBDc291bmRQcmVwcm9jZXNzb3JIaWdobGlnaHRSdWxlcy5jYWxsKHRoaXMsIGVtYmVkZGVkUnVsZVByZWZpeCk7XG5cbiAgICAvLyBUbyB1cGRhdGUgdGhlIG9wY29kZXMgYW5kIGRlcHJlY2F0ZWRPcGNvZGVzIGFycmF5cywgcnVuXG4gICAgLypcbiAgICAgIGN1cmwgLS1yZW1vdGUtbmFtZSAtLXNob3ctZXJyb3IgLS1zaWxlbnQgaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3B5Z21lbnRzL3B5Z21lbnRzL21hc3Rlci9weWdtZW50cy9sZXhlcnMvX2Nzb3VuZF9idWlsdGlucy5weVxuICAgICAgcHl0aG9uIC1jIFwiaW1wb3J0IGpzb247IGZyb20gX2Nzb3VuZF9idWlsdGlucyBpbXBvcnQgT1BDT0RFUywgREVQUkVDQVRFRF9PUENPREVTLCBSRU1PVkVEX09QQ09ERVM7IHByaW50KCd2YXIgb3Bjb2RlcyA9IHt9OycuZm9ybWF0KGpzb24uZHVtcHMoc29ydGVkKGxpc3QoT1BDT0RFUykpLCBpbmRlbnQ9NCkpKTsgcHJpbnQoJ3ZhciBkZXByZWNhdGVkT3Bjb2RlcyA9IHt9OycuZm9ybWF0KGpzb24uZHVtcHMoc29ydGVkKGxpc3QoREVQUkVDQVRFRF9PUENPREVTLnVuaW9uKFJFTU9WRURfT1BDT0RFUykpKSwgaW5kZW50PTQpKSlcIlxuICAgICovXG4gICAgLy8gYW5kIHRoZW4gcGFzdGUgdGhlIG91dHB1dC5cbiAgICB2YXIgb3Bjb2RlcyA9IFtcbiAgICAgICAgXCJBVFNhZGRcIixcbiAgICAgICAgXCJBVFNhZGRuelwiLFxuICAgICAgICBcIkFUU2J1ZnJlYWRcIixcbiAgICAgICAgXCJBVFNjcm9zc1wiLFxuICAgICAgICBcIkFUU2luZm9cIixcbiAgICAgICAgXCJBVFNpbnRlcnByZWFkXCIsXG4gICAgICAgIFwiQVRTcGFydGlhbHRhcFwiLFxuICAgICAgICBcIkFUU3JlYWRcIixcbiAgICAgICAgXCJBVFNyZWFkbnpcIixcbiAgICAgICAgXCJBVFNzaW5ub2lcIixcbiAgICAgICAgXCJGTGJveFwiLFxuICAgICAgICBcIkZMYnV0QmFua1wiLFxuICAgICAgICBcIkZMYnV0dG9uXCIsXG4gICAgICAgIFwiRkxjbG9zZUJ1dHRvblwiLFxuICAgICAgICBcIkZMY29sb3JcIixcbiAgICAgICAgXCJGTGNvbG9yMlwiLFxuICAgICAgICBcIkZMY291bnRcIixcbiAgICAgICAgXCJGTGV4ZWNCdXR0b25cIixcbiAgICAgICAgXCJGTGdldHNuYXBcIixcbiAgICAgICAgXCJGTGdyb3VwXCIsXG4gICAgICAgIFwiRkxncm91cEVuZFwiLFxuICAgICAgICBcIkZMZ3JvdXBfZW5kXCIsXG4gICAgICAgIFwiRkxoaWRlXCIsXG4gICAgICAgIFwiRkxodnNCb3hcIixcbiAgICAgICAgXCJGTGh2c0JveFNldFZhbHVlXCIsXG4gICAgICAgIFwiRkxqb3lcIixcbiAgICAgICAgXCJGTGtleUluXCIsXG4gICAgICAgIFwiRkxrbm9iXCIsXG4gICAgICAgIFwiRkxsYWJlbFwiLFxuICAgICAgICBcIkZMbG9hZHNuYXBcIixcbiAgICAgICAgXCJGTG1vdXNlXCIsXG4gICAgICAgIFwiRkxwYWNrXCIsXG4gICAgICAgIFwiRkxwYWNrRW5kXCIsXG4gICAgICAgIFwiRkxwYWNrX2VuZFwiLFxuICAgICAgICBcIkZMcGFuZWxcIixcbiAgICAgICAgXCJGTHBhbmVsRW5kXCIsXG4gICAgICAgIFwiRkxwYW5lbF9lbmRcIixcbiAgICAgICAgXCJGTHByaW50a1wiLFxuICAgICAgICBcIkZMcHJpbnRrMlwiLFxuICAgICAgICBcIkZMcm9sbGVyXCIsXG4gICAgICAgIFwiRkxydW5cIixcbiAgICAgICAgXCJGTHNhdmVzbmFwXCIsXG4gICAgICAgIFwiRkxzY3JvbGxcIixcbiAgICAgICAgXCJGTHNjcm9sbEVuZFwiLFxuICAgICAgICBcIkZMc2Nyb2xsX2VuZFwiLFxuICAgICAgICBcIkZMc2V0QWxpZ25cIixcbiAgICAgICAgXCJGTHNldEJveFwiLFxuICAgICAgICBcIkZMc2V0Q29sb3JcIixcbiAgICAgICAgXCJGTHNldENvbG9yMlwiLFxuICAgICAgICBcIkZMc2V0Rm9udFwiLFxuICAgICAgICBcIkZMc2V0UG9zaXRpb25cIixcbiAgICAgICAgXCJGTHNldFNpemVcIixcbiAgICAgICAgXCJGTHNldFNuYXBHcm91cFwiLFxuICAgICAgICBcIkZMc2V0VGV4dFwiLFxuICAgICAgICBcIkZMc2V0VGV4dENvbG9yXCIsXG4gICAgICAgIFwiRkxzZXRUZXh0U2l6ZVwiLFxuICAgICAgICBcIkZMc2V0VGV4dFR5cGVcIixcbiAgICAgICAgXCJGTHNldFZhbFwiLFxuICAgICAgICBcIkZMc2V0VmFsX2lcIixcbiAgICAgICAgXCJGTHNldFZhbGlcIixcbiAgICAgICAgXCJGTHNldHNuYXBcIixcbiAgICAgICAgXCJGTHNob3dcIixcbiAgICAgICAgXCJGTHNsaWRCbmtcIixcbiAgICAgICAgXCJGTHNsaWRCbmsyXCIsXG4gICAgICAgIFwiRkxzbGlkQm5rMlNldFwiLFxuICAgICAgICBcIkZMc2xpZEJuazJTZXRrXCIsXG4gICAgICAgIFwiRkxzbGlkQm5rR2V0SGFuZGxlXCIsXG4gICAgICAgIFwiRkxzbGlkQm5rU2V0XCIsXG4gICAgICAgIFwiRkxzbGlkQm5rU2V0a1wiLFxuICAgICAgICBcIkZMc2xpZGVyXCIsXG4gICAgICAgIFwiRkx0YWJzXCIsXG4gICAgICAgIFwiRkx0YWJzRW5kXCIsXG4gICAgICAgIFwiRkx0YWJzX2VuZFwiLFxuICAgICAgICBcIkZMdGV4dFwiLFxuICAgICAgICBcIkZMdXBkYXRlXCIsXG4gICAgICAgIFwiRkx2YWx1ZVwiLFxuICAgICAgICBcIkZMdmtleWJkXCIsXG4gICAgICAgIFwiRkx2c2xpZEJua1wiLFxuICAgICAgICBcIkZMdnNsaWRCbmsyXCIsXG4gICAgICAgIFwiRkx4eWluXCIsXG4gICAgICAgIFwiSmFja29BdWRpb0luXCIsXG4gICAgICAgIFwiSmFja29BdWRpb0luQ29ubmVjdFwiLFxuICAgICAgICBcIkphY2tvQXVkaW9PdXRcIixcbiAgICAgICAgXCJKYWNrb0F1ZGlvT3V0Q29ubmVjdFwiLFxuICAgICAgICBcIkphY2tvRnJlZXdoZWVsXCIsXG4gICAgICAgIFwiSmFja29JbmZvXCIsXG4gICAgICAgIFwiSmFja29Jbml0XCIsXG4gICAgICAgIFwiSmFja29NaWRpSW5Db25uZWN0XCIsXG4gICAgICAgIFwiSmFja29NaWRpT3V0XCIsXG4gICAgICAgIFwiSmFja29NaWRpT3V0Q29ubmVjdFwiLFxuICAgICAgICBcIkphY2tvTm90ZU91dFwiLFxuICAgICAgICBcIkphY2tvT25cIixcbiAgICAgICAgXCJKYWNrb1RyYW5zcG9ydFwiLFxuICAgICAgICBcIkszNV9ocGZcIixcbiAgICAgICAgXCJLMzVfbHBmXCIsXG4gICAgICAgIFwiTWl4ZXJDbGVhclwiLFxuICAgICAgICBcIk1peGVyR2V0TGV2ZWxcIixcbiAgICAgICAgXCJNaXhlclJlY2VpdmVcIixcbiAgICAgICAgXCJNaXhlclNlbmRcIixcbiAgICAgICAgXCJNaXhlclNldExldmVsXCIsXG4gICAgICAgIFwiTWl4ZXJTZXRMZXZlbF9pXCIsXG4gICAgICAgIFwiT1NDYnVuZGxlXCIsXG4gICAgICAgIFwiT1NDY291bnRcIixcbiAgICAgICAgXCJPU0Npbml0XCIsXG4gICAgICAgIFwiT1NDaW5pdE1cIixcbiAgICAgICAgXCJPU0NsaXN0ZW5cIixcbiAgICAgICAgXCJPU0NyYXdcIixcbiAgICAgICAgXCJPU0NzZW5kXCIsXG4gICAgICAgIFwiT1NDc2VuZF9sb1wiLFxuICAgICAgICBcIlNcIixcbiAgICAgICAgXCJTVEtCYW5kZWRXR1wiLFxuICAgICAgICBcIlNUS0JlZVRocmVlXCIsXG4gICAgICAgIFwiU1RLQmxvd0JvdGxcIixcbiAgICAgICAgXCJTVEtCbG93SG9sZVwiLFxuICAgICAgICBcIlNUS0Jvd2VkXCIsXG4gICAgICAgIFwiU1RLQnJhc3NcIixcbiAgICAgICAgXCJTVEtDbGFyaW5ldFwiLFxuICAgICAgICBcIlNUS0RydW1tZXJcIixcbiAgICAgICAgXCJTVEtGTVZvaWNlc1wiLFxuICAgICAgICBcIlNUS0ZsdXRlXCIsXG4gICAgICAgIFwiU1RLSGV2eU1ldGxcIixcbiAgICAgICAgXCJTVEtNYW5kb2xpblwiLFxuICAgICAgICBcIlNUS01vZGFsQmFyXCIsXG4gICAgICAgIFwiU1RLTW9vZ1wiLFxuICAgICAgICBcIlNUS1BlcmNGbHV0XCIsXG4gICAgICAgIFwiU1RLUGx1Y2tlZFwiLFxuICAgICAgICBcIlNUS1Jlc29uYXRlXCIsXG4gICAgICAgIFwiU1RLUmhvZGV5XCIsXG4gICAgICAgIFwiU1RLU2F4b2ZvbnlcIixcbiAgICAgICAgXCJTVEtTaGFrZXJzXCIsXG4gICAgICAgIFwiU1RLU2ltcGxlXCIsXG4gICAgICAgIFwiU1RLU2l0YXJcIixcbiAgICAgICAgXCJTVEtTdGlmS2FycFwiLFxuICAgICAgICBcIlNUS1R1YmVCZWxsXCIsXG4gICAgICAgIFwiU1RLVm9pY0Zvcm1cIixcbiAgICAgICAgXCJTVEtXaGlzdGxlXCIsXG4gICAgICAgIFwiU1RLV3VybGV5XCIsXG4gICAgICAgIFwiYVwiLFxuICAgICAgICBcImFic1wiLFxuICAgICAgICBcImFjdGl2ZVwiLFxuICAgICAgICBcImFkc3JcIixcbiAgICAgICAgXCJhZHN5blwiLFxuICAgICAgICBcImFkc3ludFwiLFxuICAgICAgICBcImFkc3ludDJcIixcbiAgICAgICAgXCJhZnRvdWNoXCIsXG4gICAgICAgIFwiYWxscG9sZVwiLFxuICAgICAgICBcImFscGFzc1wiLFxuICAgICAgICBcImFsd2F5c29uXCIsXG4gICAgICAgIFwiYW1wZGJcIixcbiAgICAgICAgXCJhbXBkYmZzXCIsXG4gICAgICAgIFwiYW1wbWlkaVwiLFxuICAgICAgICBcImFtcG1pZGljdXJ2ZVwiLFxuICAgICAgICBcImFtcG1pZGlkXCIsXG4gICAgICAgIFwiYXBvbGVwYXJhbXNcIixcbiAgICAgICAgXCJhcmR1aW5vUmVhZFwiLFxuICAgICAgICBcImFyZHVpbm9SZWFkRlwiLFxuICAgICAgICBcImFyZHVpbm9TdGFydFwiLFxuICAgICAgICBcImFyZHVpbm9TdG9wXCIsXG4gICAgICAgIFwiYXJlc29uXCIsXG4gICAgICAgIFwiYXJlc29ua1wiLFxuICAgICAgICBcImF0b25lXCIsXG4gICAgICAgIFwiYXRvbmVrXCIsXG4gICAgICAgIFwiYXRvbmV4XCIsXG4gICAgICAgIFwiYXV0b2NvcnJcIixcbiAgICAgICAgXCJiYWJvXCIsXG4gICAgICAgIFwiYmFsYW5jZVwiLFxuICAgICAgICBcImJhbGFuY2UyXCIsXG4gICAgICAgIFwiYmFtYm9vXCIsXG4gICAgICAgIFwiYmFybW9kZWxcIixcbiAgICAgICAgXCJiYmN1dG1cIixcbiAgICAgICAgXCJiYmN1dHNcIixcbiAgICAgICAgXCJiZXRhcmFuZFwiLFxuICAgICAgICBcImJleHBybmRcIixcbiAgICAgICAgXCJiZm9ybWRlYzFcIixcbiAgICAgICAgXCJiZm9ybWRlYzJcIixcbiAgICAgICAgXCJiZm9ybWVuYzFcIixcbiAgICAgICAgXCJiaW5pdFwiLFxuICAgICAgICBcImJpcXVhZFwiLFxuICAgICAgICBcImJpcXVhZGFcIixcbiAgICAgICAgXCJiaXJuZFwiLFxuICAgICAgICBcImJvYlwiLFxuICAgICAgICBcImJwZlwiLFxuICAgICAgICBcImJwZmNvc1wiLFxuICAgICAgICBcImJxcmV6XCIsXG4gICAgICAgIFwiYnV0YnBcIixcbiAgICAgICAgXCJidXRiclwiLFxuICAgICAgICBcImJ1dGhwXCIsXG4gICAgICAgIFwiYnV0bHBcIixcbiAgICAgICAgXCJidXR0ZXJicFwiLFxuICAgICAgICBcImJ1dHRlcmJyXCIsXG4gICAgICAgIFwiYnV0dGVyaHBcIixcbiAgICAgICAgXCJidXR0ZXJscFwiLFxuICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICBcImJ1enpcIixcbiAgICAgICAgXCJjMnJcIixcbiAgICAgICAgXCJjYWJhc2FcIixcbiAgICAgICAgXCJjYXVjaHlcIixcbiAgICAgICAgXCJjYXVjaHlpXCIsXG4gICAgICAgIFwiY2JydFwiLFxuICAgICAgICBcImNlaWxcIixcbiAgICAgICAgXCJjZWxsXCIsXG4gICAgICAgIFwiY2VudFwiLFxuICAgICAgICBcImNlbnRyb2lkXCIsXG4gICAgICAgIFwiY2Vwc1wiLFxuICAgICAgICBcImNlcHNpbnZcIixcbiAgICAgICAgXCJjaGFuY3RybFwiLFxuICAgICAgICBcImNoYW5nZWRcIixcbiAgICAgICAgXCJjaGFuZ2VkMlwiLFxuICAgICAgICBcImNoYW5pXCIsXG4gICAgICAgIFwiY2hhbm9cIixcbiAgICAgICAgXCJjaGVieXNoZXZwb2x5XCIsXG4gICAgICAgIFwiY2hlY2tib3hcIixcbiAgICAgICAgXCJjaG5fU1wiLFxuICAgICAgICBcImNobl9hXCIsXG4gICAgICAgIFwiY2huX2tcIixcbiAgICAgICAgXCJjaG5jbGVhclwiLFxuICAgICAgICBcImNobmV4cG9ydFwiLFxuICAgICAgICBcImNobmdldFwiLFxuICAgICAgICBcImNobmdldGFcIixcbiAgICAgICAgXCJjaG5nZXRpXCIsXG4gICAgICAgIFwiY2huZ2V0a1wiLFxuICAgICAgICBcImNobmdldGtzXCIsXG4gICAgICAgIFwiY2huZ2V0c1wiLFxuICAgICAgICBcImNobm1peFwiLFxuICAgICAgICBcImNobnBhcmFtc1wiLFxuICAgICAgICBcImNobnNldFwiLFxuICAgICAgICBcImNobnNldGFcIixcbiAgICAgICAgXCJjaG5zZXRpXCIsXG4gICAgICAgIFwiY2huc2V0a1wiLFxuICAgICAgICBcImNobnNldGtzXCIsXG4gICAgICAgIFwiY2huc2V0c1wiLFxuICAgICAgICBcImNodWFwXCIsXG4gICAgICAgIFwiY2xlYXJcIixcbiAgICAgICAgXCJjbGZpbHRcIixcbiAgICAgICAgXCJjbGlwXCIsXG4gICAgICAgIFwiY2xvY2tvZmZcIixcbiAgICAgICAgXCJjbG9ja29uXCIsXG4gICAgICAgIFwiY21wXCIsXG4gICAgICAgIFwiY21wbHhwcm9kXCIsXG4gICAgICAgIFwiY250Q3JlYXRlXCIsXG4gICAgICAgIFwiY250Q3ljbGVzXCIsXG4gICAgICAgIFwiY250RGVsZXRlXCIsXG4gICAgICAgIFwiY250RGVsZXRlX2lcIixcbiAgICAgICAgXCJjbnRSZWFkXCIsXG4gICAgICAgIFwiY250UmVzZXRcIixcbiAgICAgICAgXCJjbnRTdGF0ZVwiLFxuICAgICAgICBcImNvbWJcIixcbiAgICAgICAgXCJjb21iaW52XCIsXG4gICAgICAgIFwiY29tcGlsZWNzZFwiLFxuICAgICAgICBcImNvbXBpbGVvcmNcIixcbiAgICAgICAgXCJjb21waWxlc3RyXCIsXG4gICAgICAgIFwiY29tcHJlc3NcIixcbiAgICAgICAgXCJjb21wcmVzczJcIixcbiAgICAgICAgXCJjb25uZWN0XCIsXG4gICAgICAgIFwiY29udHJvbFwiLFxuICAgICAgICBcImNvbnZsZVwiLFxuICAgICAgICBcImNvbnZvbHZlXCIsXG4gICAgICAgIFwiY29weWEyZnRhYlwiLFxuICAgICAgICBcImNvcHlmMmFycmF5XCIsXG4gICAgICAgIFwiY29zXCIsXG4gICAgICAgIFwiY29zaFwiLFxuICAgICAgICBcImNvc2ludlwiLFxuICAgICAgICBcImNvc3NlZ1wiLFxuICAgICAgICBcImNvc3NlZ2JcIixcbiAgICAgICAgXCJjb3NzZWdyXCIsXG4gICAgICAgIFwiY291bnRcIixcbiAgICAgICAgXCJjb3VudF9pXCIsXG4gICAgICAgIFwiY3BzMnBjaFwiLFxuICAgICAgICBcImNwc21pZGlcIixcbiAgICAgICAgXCJjcHNtaWRpYlwiLFxuICAgICAgICBcImNwc21pZGlublwiLFxuICAgICAgICBcImNwc29jdFwiLFxuICAgICAgICBcImNwc3BjaFwiLFxuICAgICAgICBcImNwc3RtaWRcIixcbiAgICAgICAgXCJjcHN0dW5cIixcbiAgICAgICAgXCJjcHN0dW5pXCIsXG4gICAgICAgIFwiY3BzeHBjaFwiLFxuICAgICAgICBcImNwdW1ldGVyXCIsXG4gICAgICAgIFwiY3B1cHJjXCIsXG4gICAgICAgIFwiY3Jvc3MyXCIsXG4gICAgICAgIFwiY3Jvc3NmbVwiLFxuICAgICAgICBcImNyb3NzZm1pXCIsXG4gICAgICAgIFwiY3Jvc3NmbXBtXCIsXG4gICAgICAgIFwiY3Jvc3NmbXBtaVwiLFxuICAgICAgICBcImNyb3NzcG1cIixcbiAgICAgICAgXCJjcm9zc3BtaVwiLFxuICAgICAgICBcImNydW5jaFwiLFxuICAgICAgICBcImN0bGNoblwiLFxuICAgICAgICBcImN0cmwxNFwiLFxuICAgICAgICBcImN0cmwyMVwiLFxuICAgICAgICBcImN0cmw3XCIsXG4gICAgICAgIFwiY3RybGluaXRcIixcbiAgICAgICAgXCJjdHJscHJlc2V0XCIsXG4gICAgICAgIFwiY3RybHByaW50XCIsXG4gICAgICAgIFwiY3RybHByaW50cHJlc2V0c1wiLFxuICAgICAgICBcImN0cmxzYXZlXCIsXG4gICAgICAgIFwiY3RybHNlbGVjdFwiLFxuICAgICAgICBcImN1c2Vycm5kXCIsXG4gICAgICAgIFwiZGFtXCIsXG4gICAgICAgIFwiZGF0ZVwiLFxuICAgICAgICBcImRhdGVzXCIsXG4gICAgICAgIFwiZGJcIixcbiAgICAgICAgXCJkYmFtcFwiLFxuICAgICAgICBcImRiZnNhbXBcIixcbiAgICAgICAgXCJkY2Jsb2NrXCIsXG4gICAgICAgIFwiZGNibG9jazJcIixcbiAgICAgICAgXCJkY29udlwiLFxuICAgICAgICBcImRjdFwiLFxuICAgICAgICBcImRjdGludlwiLFxuICAgICAgICBcImRlaW50ZXJsZWF2ZVwiLFxuICAgICAgICBcImRlbGF5XCIsXG4gICAgICAgIFwiZGVsYXkxXCIsXG4gICAgICAgIFwiZGVsYXlrXCIsXG4gICAgICAgIFwiZGVsYXlyXCIsXG4gICAgICAgIFwiZGVsYXl3XCIsXG4gICAgICAgIFwiZGVsdGFwXCIsXG4gICAgICAgIFwiZGVsdGFwM1wiLFxuICAgICAgICBcImRlbHRhcGlcIixcbiAgICAgICAgXCJkZWx0YXBuXCIsXG4gICAgICAgIFwiZGVsdGFweFwiLFxuICAgICAgICBcImRlbHRhcHh3XCIsXG4gICAgICAgIFwiZGVub3JtXCIsXG4gICAgICAgIFwiZGlmZlwiLFxuICAgICAgICBcImRpb2RlX2xhZGRlclwiLFxuICAgICAgICBcImRpcmVjdG9yeVwiLFxuICAgICAgICBcImRpc2tncmFpblwiLFxuICAgICAgICBcImRpc2tpblwiLFxuICAgICAgICBcImRpc2tpbjJcIixcbiAgICAgICAgXCJkaXNwZmZ0XCIsXG4gICAgICAgIFwiZGlzcGxheVwiLFxuICAgICAgICBcImRpc3RvcnRcIixcbiAgICAgICAgXCJkaXN0b3J0MVwiLFxuICAgICAgICBcImRpdnpcIixcbiAgICAgICAgXCJkb3BwbGVyXCIsXG4gICAgICAgIFwiZG90XCIsXG4gICAgICAgIFwiZG93bnNhbXBcIixcbiAgICAgICAgXCJkcmlwd2F0ZXJcIixcbiAgICAgICAgXCJkc3NpYWN0aXZhdGVcIixcbiAgICAgICAgXCJkc3NpYXVkaW9cIixcbiAgICAgICAgXCJkc3NpY3Rsc1wiLFxuICAgICAgICBcImRzc2lpbml0XCIsXG4gICAgICAgIFwiZHNzaWxpc3RcIixcbiAgICAgICAgXCJkdW1wa1wiLFxuICAgICAgICBcImR1bXBrMlwiLFxuICAgICAgICBcImR1bXBrM1wiLFxuICAgICAgICBcImR1bXBrNFwiLFxuICAgICAgICBcImR1c2Vycm5kXCIsXG4gICAgICAgIFwiZHVzdFwiLFxuICAgICAgICBcImR1c3QyXCIsXG4gICAgICAgIFwiZWxhcHNlZGN5Y2xlc1wiLFxuICAgICAgICBcImVsYXBzZWR0aW1lXCIsXG4gICAgICAgIFwiZW52bHB4XCIsXG4gICAgICAgIFwiZW52bHB4clwiLFxuICAgICAgICBcImVwaGFzb3JcIixcbiAgICAgICAgXCJlcWZpbFwiLFxuICAgICAgICBcImV2YWxzdHJcIixcbiAgICAgICAgXCJldmVudFwiLFxuICAgICAgICBcImV2ZW50X2lcIixcbiAgICAgICAgXCJldmVudGN5Y2xlc1wiLFxuICAgICAgICBcImV2ZW50dGltZVwiLFxuICAgICAgICBcImV4Y2l0ZXJcIixcbiAgICAgICAgXCJleGl0bm93XCIsXG4gICAgICAgIFwiZXhwXCIsXG4gICAgICAgIFwiZXhwY3VydmVcIixcbiAgICAgICAgXCJleHBvblwiLFxuICAgICAgICBcImV4cHJhbmRcIixcbiAgICAgICAgXCJleHByYW5kaVwiLFxuICAgICAgICBcImV4cHNlZ1wiLFxuICAgICAgICBcImV4cHNlZ2FcIixcbiAgICAgICAgXCJleHBzZWdiXCIsXG4gICAgICAgIFwiZXhwc2VnYmFcIixcbiAgICAgICAgXCJleHBzZWdyXCIsXG4gICAgICAgIFwiZmFyZXlsZW5cIixcbiAgICAgICAgXCJmYXJleWxlbmlcIixcbiAgICAgICAgXCJmYXVzdGF1ZGlvXCIsXG4gICAgICAgIFwiZmF1c3Rjb21waWxlXCIsXG4gICAgICAgIFwiZmF1c3RjdGxcIixcbiAgICAgICAgXCJmYXVzdGRzcFwiLFxuICAgICAgICBcImZhdXN0Z2VuXCIsXG4gICAgICAgIFwiZmF1c3RwbGF5XCIsXG4gICAgICAgIFwiZmZ0XCIsXG4gICAgICAgIFwiZmZ0aW52XCIsXG4gICAgICAgIFwiZmljbG9zZVwiLFxuICAgICAgICBcImZpbGViaXRcIixcbiAgICAgICAgXCJmaWxlbGVuXCIsXG4gICAgICAgIFwiZmlsZW5jaG5sc1wiLFxuICAgICAgICBcImZpbGVwZWFrXCIsXG4gICAgICAgIFwiZmlsZXNjYWxcIixcbiAgICAgICAgXCJmaWxlc3JcIixcbiAgICAgICAgXCJmaWxldmFsaWRcIixcbiAgICAgICAgXCJmaWxsYXJyYXlcIixcbiAgICAgICAgXCJmaWx0ZXIyXCIsXG4gICAgICAgIFwiZmluXCIsXG4gICAgICAgIFwiZmluaVwiLFxuICAgICAgICBcImZpbmtcIixcbiAgICAgICAgXCJmaW9wZW5cIixcbiAgICAgICAgXCJmbGFuZ2VyXCIsXG4gICAgICAgIFwiZmxhc2h0eHRcIixcbiAgICAgICAgXCJmbG9vcGVyXCIsXG4gICAgICAgIFwiZmxvb3BlcjJcIixcbiAgICAgICAgXCJmbG9vclwiLFxuICAgICAgICBcImZsdWlkQWxsT3V0XCIsXG4gICAgICAgIFwiZmx1aWRDQ2lcIixcbiAgICAgICAgXCJmbHVpZENDa1wiLFxuICAgICAgICBcImZsdWlkQ29udHJvbFwiLFxuICAgICAgICBcImZsdWlkRW5naW5lXCIsXG4gICAgICAgIFwiZmx1aWRJbmZvXCIsXG4gICAgICAgIFwiZmx1aWRMb2FkXCIsXG4gICAgICAgIFwiZmx1aWROb3RlXCIsXG4gICAgICAgIFwiZmx1aWRPdXRcIixcbiAgICAgICAgXCJmbHVpZFByb2dyYW1TZWxlY3RcIixcbiAgICAgICAgXCJmbHVpZFNldEludGVycE1ldGhvZFwiLFxuICAgICAgICBcImZtYW5hbFwiLFxuICAgICAgICBcImZtYXhcIixcbiAgICAgICAgXCJmbWIzXCIsXG4gICAgICAgIFwiZm1iZWxsXCIsXG4gICAgICAgIFwiZm1pblwiLFxuICAgICAgICBcImZtbWV0YWxcIixcbiAgICAgICAgXCJmbW9kXCIsXG4gICAgICAgIFwiZm1wZXJjZmxcIixcbiAgICAgICAgXCJmbXJob2RlXCIsXG4gICAgICAgIFwiZm12b2ljZVwiLFxuICAgICAgICBcImZtd3VybGllXCIsXG4gICAgICAgIFwiZm9mXCIsXG4gICAgICAgIFwiZm9mMlwiLFxuICAgICAgICBcImZvZmlsdGVyXCIsXG4gICAgICAgIFwiZm9nXCIsXG4gICAgICAgIFwiZm9sZFwiLFxuICAgICAgICBcImZvbGxvd1wiLFxuICAgICAgICBcImZvbGxvdzJcIixcbiAgICAgICAgXCJmb3NjaWxcIixcbiAgICAgICAgXCJmb3NjaWxpXCIsXG4gICAgICAgIFwiZm91dFwiLFxuICAgICAgICBcImZvdXRpXCIsXG4gICAgICAgIFwiZm91dGlyXCIsXG4gICAgICAgIFwiZm91dGtcIixcbiAgICAgICAgXCJmcHJpbnRrc1wiLFxuICAgICAgICBcImZwcmludHNcIixcbiAgICAgICAgXCJmcmFjXCIsXG4gICAgICAgIFwiZnJhY3RhbG5vaXNlXCIsXG4gICAgICAgIFwiZnJhbWVidWZmZXJcIixcbiAgICAgICAgXCJmcmVldmVyYlwiLFxuICAgICAgICBcImZ0YXVkaW9cIixcbiAgICAgICAgXCJmdGNobmxzXCIsXG4gICAgICAgIFwiZnRjb252XCIsXG4gICAgICAgIFwiZnRjcHNcIixcbiAgICAgICAgXCJmdGV4aXN0c1wiLFxuICAgICAgICBcImZ0ZnJlZVwiLFxuICAgICAgICBcImZ0Z2VuXCIsXG4gICAgICAgIFwiZnRnZW5vbmNlXCIsXG4gICAgICAgIFwiZnRnZW50bXBcIixcbiAgICAgICAgXCJmdGxlblwiLFxuICAgICAgICBcImZ0bG9hZFwiLFxuICAgICAgICBcImZ0bG9hZGtcIixcbiAgICAgICAgXCJmdGxwdGltXCIsXG4gICAgICAgIFwiZnRtb3JmXCIsXG4gICAgICAgIFwiZnRvbVwiLFxuICAgICAgICBcImZ0cHJpbnRcIixcbiAgICAgICAgXCJmdHJlc2l6ZVwiLFxuICAgICAgICBcImZ0cmVzaXplaVwiLFxuICAgICAgICBcImZ0c2FtcGxlYmFua1wiLFxuICAgICAgICBcImZ0c2F2ZVwiLFxuICAgICAgICBcImZ0c2F2ZWtcIixcbiAgICAgICAgXCJmdHNldFwiLFxuICAgICAgICBcImZ0c2xpY2VcIixcbiAgICAgICAgXCJmdHNsaWNlaVwiLFxuICAgICAgICBcImZ0c3JcIixcbiAgICAgICAgXCJnYWluXCIsXG4gICAgICAgIFwiZ2FpbnNsaWRlclwiLFxuICAgICAgICBcImdhdXNzXCIsXG4gICAgICAgIFwiZ2F1c3NpXCIsXG4gICAgICAgIFwiZ2F1c3N0cmlnXCIsXG4gICAgICAgIFwiZ2J1enpcIixcbiAgICAgICAgXCJnZW5hcnJheVwiLFxuICAgICAgICBcImdlbmFycmF5X2lcIixcbiAgICAgICAgXCJnZW5keVwiLFxuICAgICAgICBcImdlbmR5Y1wiLFxuICAgICAgICBcImdlbmR5eFwiLFxuICAgICAgICBcImdldGNmZ1wiLFxuICAgICAgICBcImdldGNvbFwiLFxuICAgICAgICBcImdldGZ0YXJnc1wiLFxuICAgICAgICBcImdldHJvd1wiLFxuICAgICAgICBcImdldHNlZWRcIixcbiAgICAgICAgXCJnb2dvYmVsXCIsXG4gICAgICAgIFwiZ3JhaW5cIixcbiAgICAgICAgXCJncmFpbjJcIixcbiAgICAgICAgXCJncmFpbjNcIixcbiAgICAgICAgXCJncmFudWxlXCIsXG4gICAgICAgIFwiZ3RhZHNyXCIsXG4gICAgICAgIFwiZ3RmXCIsXG4gICAgICAgIFwiZ3Vpcm9cIixcbiAgICAgICAgXCJoYXJtb25cIixcbiAgICAgICAgXCJoYXJtb24yXCIsXG4gICAgICAgIFwiaGFybW9uM1wiLFxuICAgICAgICBcImhhcm1vbjRcIixcbiAgICAgICAgXCJoZGY1cmVhZFwiLFxuICAgICAgICBcImhkZjV3cml0ZVwiLFxuICAgICAgICBcImhpbGJlcnRcIixcbiAgICAgICAgXCJoaWxiZXJ0MlwiLFxuICAgICAgICBcImhydGZlYXJseVwiLFxuICAgICAgICBcImhydGZtb3ZlXCIsXG4gICAgICAgIFwiaHJ0Zm1vdmUyXCIsXG4gICAgICAgIFwiaHJ0ZnJldmVyYlwiLFxuICAgICAgICBcImhydGZzdGF0XCIsXG4gICAgICAgIFwiaHNib3NjaWxcIixcbiAgICAgICAgXCJodnMxXCIsXG4gICAgICAgIFwiaHZzMlwiLFxuICAgICAgICBcImh2czNcIixcbiAgICAgICAgXCJoeXBvdFwiLFxuICAgICAgICBcImlcIixcbiAgICAgICAgXCJpaG9sZFwiLFxuICAgICAgICBcImltYWdlY3JlYXRlXCIsXG4gICAgICAgIFwiaW1hZ2VmcmVlXCIsXG4gICAgICAgIFwiaW1hZ2VnZXRwaXhlbFwiLFxuICAgICAgICBcImltYWdlbG9hZFwiLFxuICAgICAgICBcImltYWdlc2F2ZVwiLFxuICAgICAgICBcImltYWdlc2V0cGl4ZWxcIixcbiAgICAgICAgXCJpbWFnZXNpemVcIixcbiAgICAgICAgXCJpblwiLFxuICAgICAgICBcImluMzJcIixcbiAgICAgICAgXCJpbmNoXCIsXG4gICAgICAgIFwiaW5oXCIsXG4gICAgICAgIFwiaW5pdFwiLFxuICAgICAgICBcImluaXRjMTRcIixcbiAgICAgICAgXCJpbml0YzIxXCIsXG4gICAgICAgIFwiaW5pdGM3XCIsXG4gICAgICAgIFwiaW5sZXRhXCIsXG4gICAgICAgIFwiaW5sZXRmXCIsXG4gICAgICAgIFwiaW5sZXRrXCIsXG4gICAgICAgIFwiaW5sZXRraWRcIixcbiAgICAgICAgXCJpbmxldHZcIixcbiAgICAgICAgXCJpbm9cIixcbiAgICAgICAgXCJpbnFcIixcbiAgICAgICAgXCJpbnJnXCIsXG4gICAgICAgIFwiaW5zXCIsXG4gICAgICAgIFwiaW5zZ2xvYmFsXCIsXG4gICAgICAgIFwiaW5zcmVtb3RcIixcbiAgICAgICAgXCJpbnRcIixcbiAgICAgICAgXCJpbnRlZ1wiLFxuICAgICAgICBcImludGVybGVhdmVcIixcbiAgICAgICAgXCJpbnRlcnBcIixcbiAgICAgICAgXCJpbnZhbHVlXCIsXG4gICAgICAgIFwiaW54XCIsXG4gICAgICAgIFwiaW56XCIsXG4gICAgICAgIFwiamFja3RyYW5zcG9ydFwiLFxuICAgICAgICBcImppdHRlclwiLFxuICAgICAgICBcImppdHRlcjJcIixcbiAgICAgICAgXCJqb3lzdGlja1wiLFxuICAgICAgICBcImpzcGxpbmVcIixcbiAgICAgICAgXCJrXCIsXG4gICAgICAgIFwibGFfaV9hZGRfbWNcIixcbiAgICAgICAgXCJsYV9pX2FkZF9tclwiLFxuICAgICAgICBcImxhX2lfYWRkX3ZjXCIsXG4gICAgICAgIFwibGFfaV9hZGRfdnJcIixcbiAgICAgICAgXCJsYV9pX2Fzc2lnbl9tY1wiLFxuICAgICAgICBcImxhX2lfYXNzaWduX21yXCIsXG4gICAgICAgIFwibGFfaV9hc3NpZ25fdFwiLFxuICAgICAgICBcImxhX2lfYXNzaWduX3ZjXCIsXG4gICAgICAgIFwibGFfaV9hc3NpZ25fdnJcIixcbiAgICAgICAgXCJsYV9pX2Nvbmp1Z2F0ZV9tY1wiLFxuICAgICAgICBcImxhX2lfY29uanVnYXRlX21yXCIsXG4gICAgICAgIFwibGFfaV9jb25qdWdhdGVfdmNcIixcbiAgICAgICAgXCJsYV9pX2Nvbmp1Z2F0ZV92clwiLFxuICAgICAgICBcImxhX2lfZGlzdGFuY2VfdmNcIixcbiAgICAgICAgXCJsYV9pX2Rpc3RhbmNlX3ZyXCIsXG4gICAgICAgIFwibGFfaV9kaXZpZGVfbWNcIixcbiAgICAgICAgXCJsYV9pX2RpdmlkZV9tclwiLFxuICAgICAgICBcImxhX2lfZGl2aWRlX3ZjXCIsXG4gICAgICAgIFwibGFfaV9kaXZpZGVfdnJcIixcbiAgICAgICAgXCJsYV9pX2RvdF9tY1wiLFxuICAgICAgICBcImxhX2lfZG90X21jX3ZjXCIsXG4gICAgICAgIFwibGFfaV9kb3RfbXJcIixcbiAgICAgICAgXCJsYV9pX2RvdF9tcl92clwiLFxuICAgICAgICBcImxhX2lfZG90X3ZjXCIsXG4gICAgICAgIFwibGFfaV9kb3RfdnJcIixcbiAgICAgICAgXCJsYV9pX2dldF9tY1wiLFxuICAgICAgICBcImxhX2lfZ2V0X21yXCIsXG4gICAgICAgIFwibGFfaV9nZXRfdmNcIixcbiAgICAgICAgXCJsYV9pX2dldF92clwiLFxuICAgICAgICBcImxhX2lfaW52ZXJ0X21jXCIsXG4gICAgICAgIFwibGFfaV9pbnZlcnRfbXJcIixcbiAgICAgICAgXCJsYV9pX2xvd2VyX3NvbHZlX21jXCIsXG4gICAgICAgIFwibGFfaV9sb3dlcl9zb2x2ZV9tclwiLFxuICAgICAgICBcImxhX2lfbHVfZGV0X21jXCIsXG4gICAgICAgIFwibGFfaV9sdV9kZXRfbXJcIixcbiAgICAgICAgXCJsYV9pX2x1X2ZhY3Rvcl9tY1wiLFxuICAgICAgICBcImxhX2lfbHVfZmFjdG9yX21yXCIsXG4gICAgICAgIFwibGFfaV9sdV9zb2x2ZV9tY1wiLFxuICAgICAgICBcImxhX2lfbHVfc29sdmVfbXJcIixcbiAgICAgICAgXCJsYV9pX21jX2NyZWF0ZVwiLFxuICAgICAgICBcImxhX2lfbWNfc2V0XCIsXG4gICAgICAgIFwibGFfaV9tcl9jcmVhdGVcIixcbiAgICAgICAgXCJsYV9pX21yX3NldFwiLFxuICAgICAgICBcImxhX2lfbXVsdGlwbHlfbWNcIixcbiAgICAgICAgXCJsYV9pX211bHRpcGx5X21yXCIsXG4gICAgICAgIFwibGFfaV9tdWx0aXBseV92Y1wiLFxuICAgICAgICBcImxhX2lfbXVsdGlwbHlfdnJcIixcbiAgICAgICAgXCJsYV9pX25vcm0xX21jXCIsXG4gICAgICAgIFwibGFfaV9ub3JtMV9tclwiLFxuICAgICAgICBcImxhX2lfbm9ybTFfdmNcIixcbiAgICAgICAgXCJsYV9pX25vcm0xX3ZyXCIsXG4gICAgICAgIFwibGFfaV9ub3JtX2V1Y2xpZF9tY1wiLFxuICAgICAgICBcImxhX2lfbm9ybV9ldWNsaWRfbXJcIixcbiAgICAgICAgXCJsYV9pX25vcm1fZXVjbGlkX3ZjXCIsXG4gICAgICAgIFwibGFfaV9ub3JtX2V1Y2xpZF92clwiLFxuICAgICAgICBcImxhX2lfbm9ybV9pbmZfbWNcIixcbiAgICAgICAgXCJsYV9pX25vcm1faW5mX21yXCIsXG4gICAgICAgIFwibGFfaV9ub3JtX2luZl92Y1wiLFxuICAgICAgICBcImxhX2lfbm9ybV9pbmZfdnJcIixcbiAgICAgICAgXCJsYV9pX25vcm1fbWF4X21jXCIsXG4gICAgICAgIFwibGFfaV9ub3JtX21heF9tclwiLFxuICAgICAgICBcImxhX2lfcHJpbnRfbWNcIixcbiAgICAgICAgXCJsYV9pX3ByaW50X21yXCIsXG4gICAgICAgIFwibGFfaV9wcmludF92Y1wiLFxuICAgICAgICBcImxhX2lfcHJpbnRfdnJcIixcbiAgICAgICAgXCJsYV9pX3FyX2VpZ2VuX21jXCIsXG4gICAgICAgIFwibGFfaV9xcl9laWdlbl9tclwiLFxuICAgICAgICBcImxhX2lfcXJfZmFjdG9yX21jXCIsXG4gICAgICAgIFwibGFfaV9xcl9mYWN0b3JfbXJcIixcbiAgICAgICAgXCJsYV9pX3FyX3N5bV9laWdlbl9tY1wiLFxuICAgICAgICBcImxhX2lfcXJfc3ltX2VpZ2VuX21yXCIsXG4gICAgICAgIFwibGFfaV9yYW5kb21fbWNcIixcbiAgICAgICAgXCJsYV9pX3JhbmRvbV9tclwiLFxuICAgICAgICBcImxhX2lfcmFuZG9tX3ZjXCIsXG4gICAgICAgIFwibGFfaV9yYW5kb21fdnJcIixcbiAgICAgICAgXCJsYV9pX3NpemVfbWNcIixcbiAgICAgICAgXCJsYV9pX3NpemVfbXJcIixcbiAgICAgICAgXCJsYV9pX3NpemVfdmNcIixcbiAgICAgICAgXCJsYV9pX3NpemVfdnJcIixcbiAgICAgICAgXCJsYV9pX3N1YnRyYWN0X21jXCIsXG4gICAgICAgIFwibGFfaV9zdWJ0cmFjdF9tclwiLFxuICAgICAgICBcImxhX2lfc3VidHJhY3RfdmNcIixcbiAgICAgICAgXCJsYV9pX3N1YnRyYWN0X3ZyXCIsXG4gICAgICAgIFwibGFfaV90X2Fzc2lnblwiLFxuICAgICAgICBcImxhX2lfdHJhY2VfbWNcIixcbiAgICAgICAgXCJsYV9pX3RyYWNlX21yXCIsXG4gICAgICAgIFwibGFfaV90cmFuc3Bvc2VfbWNcIixcbiAgICAgICAgXCJsYV9pX3RyYW5zcG9zZV9tclwiLFxuICAgICAgICBcImxhX2lfdXBwZXJfc29sdmVfbWNcIixcbiAgICAgICAgXCJsYV9pX3VwcGVyX3NvbHZlX21yXCIsXG4gICAgICAgIFwibGFfaV92Y19jcmVhdGVcIixcbiAgICAgICAgXCJsYV9pX3ZjX3NldFwiLFxuICAgICAgICBcImxhX2lfdnJfY3JlYXRlXCIsXG4gICAgICAgIFwibGFfaV92cl9zZXRcIixcbiAgICAgICAgXCJsYV9rX2FfYXNzaWduXCIsXG4gICAgICAgIFwibGFfa19hZGRfbWNcIixcbiAgICAgICAgXCJsYV9rX2FkZF9tclwiLFxuICAgICAgICBcImxhX2tfYWRkX3ZjXCIsXG4gICAgICAgIFwibGFfa19hZGRfdnJcIixcbiAgICAgICAgXCJsYV9rX2Fzc2lnbl9hXCIsXG4gICAgICAgIFwibGFfa19hc3NpZ25fZlwiLFxuICAgICAgICBcImxhX2tfYXNzaWduX21jXCIsXG4gICAgICAgIFwibGFfa19hc3NpZ25fbXJcIixcbiAgICAgICAgXCJsYV9rX2Fzc2lnbl90XCIsXG4gICAgICAgIFwibGFfa19hc3NpZ25fdmNcIixcbiAgICAgICAgXCJsYV9rX2Fzc2lnbl92clwiLFxuICAgICAgICBcImxhX2tfY29uanVnYXRlX21jXCIsXG4gICAgICAgIFwibGFfa19jb25qdWdhdGVfbXJcIixcbiAgICAgICAgXCJsYV9rX2Nvbmp1Z2F0ZV92Y1wiLFxuICAgICAgICBcImxhX2tfY29uanVnYXRlX3ZyXCIsXG4gICAgICAgIFwibGFfa19jdXJyZW50X2ZcIixcbiAgICAgICAgXCJsYV9rX2N1cnJlbnRfdnJcIixcbiAgICAgICAgXCJsYV9rX2Rpc3RhbmNlX3ZjXCIsXG4gICAgICAgIFwibGFfa19kaXN0YW5jZV92clwiLFxuICAgICAgICBcImxhX2tfZGl2aWRlX21jXCIsXG4gICAgICAgIFwibGFfa19kaXZpZGVfbXJcIixcbiAgICAgICAgXCJsYV9rX2RpdmlkZV92Y1wiLFxuICAgICAgICBcImxhX2tfZGl2aWRlX3ZyXCIsXG4gICAgICAgIFwibGFfa19kb3RfbWNcIixcbiAgICAgICAgXCJsYV9rX2RvdF9tY192Y1wiLFxuICAgICAgICBcImxhX2tfZG90X21yXCIsXG4gICAgICAgIFwibGFfa19kb3RfbXJfdnJcIixcbiAgICAgICAgXCJsYV9rX2RvdF92Y1wiLFxuICAgICAgICBcImxhX2tfZG90X3ZyXCIsXG4gICAgICAgIFwibGFfa19mX2Fzc2lnblwiLFxuICAgICAgICBcImxhX2tfZ2V0X21jXCIsXG4gICAgICAgIFwibGFfa19nZXRfbXJcIixcbiAgICAgICAgXCJsYV9rX2dldF92Y1wiLFxuICAgICAgICBcImxhX2tfZ2V0X3ZyXCIsXG4gICAgICAgIFwibGFfa19pbnZlcnRfbWNcIixcbiAgICAgICAgXCJsYV9rX2ludmVydF9tclwiLFxuICAgICAgICBcImxhX2tfbG93ZXJfc29sdmVfbWNcIixcbiAgICAgICAgXCJsYV9rX2xvd2VyX3NvbHZlX21yXCIsXG4gICAgICAgIFwibGFfa19sdV9kZXRfbWNcIixcbiAgICAgICAgXCJsYV9rX2x1X2RldF9tclwiLFxuICAgICAgICBcImxhX2tfbHVfZmFjdG9yX21jXCIsXG4gICAgICAgIFwibGFfa19sdV9mYWN0b3JfbXJcIixcbiAgICAgICAgXCJsYV9rX2x1X3NvbHZlX21jXCIsXG4gICAgICAgIFwibGFfa19sdV9zb2x2ZV9tclwiLFxuICAgICAgICBcImxhX2tfbWNfc2V0XCIsXG4gICAgICAgIFwibGFfa19tcl9zZXRcIixcbiAgICAgICAgXCJsYV9rX211bHRpcGx5X21jXCIsXG4gICAgICAgIFwibGFfa19tdWx0aXBseV9tclwiLFxuICAgICAgICBcImxhX2tfbXVsdGlwbHlfdmNcIixcbiAgICAgICAgXCJsYV9rX211bHRpcGx5X3ZyXCIsXG4gICAgICAgIFwibGFfa19ub3JtMV9tY1wiLFxuICAgICAgICBcImxhX2tfbm9ybTFfbXJcIixcbiAgICAgICAgXCJsYV9rX25vcm0xX3ZjXCIsXG4gICAgICAgIFwibGFfa19ub3JtMV92clwiLFxuICAgICAgICBcImxhX2tfbm9ybV9ldWNsaWRfbWNcIixcbiAgICAgICAgXCJsYV9rX25vcm1fZXVjbGlkX21yXCIsXG4gICAgICAgIFwibGFfa19ub3JtX2V1Y2xpZF92Y1wiLFxuICAgICAgICBcImxhX2tfbm9ybV9ldWNsaWRfdnJcIixcbiAgICAgICAgXCJsYV9rX25vcm1faW5mX21jXCIsXG4gICAgICAgIFwibGFfa19ub3JtX2luZl9tclwiLFxuICAgICAgICBcImxhX2tfbm9ybV9pbmZfdmNcIixcbiAgICAgICAgXCJsYV9rX25vcm1faW5mX3ZyXCIsXG4gICAgICAgIFwibGFfa19ub3JtX21heF9tY1wiLFxuICAgICAgICBcImxhX2tfbm9ybV9tYXhfbXJcIixcbiAgICAgICAgXCJsYV9rX3FyX2VpZ2VuX21jXCIsXG4gICAgICAgIFwibGFfa19xcl9laWdlbl9tclwiLFxuICAgICAgICBcImxhX2tfcXJfZmFjdG9yX21jXCIsXG4gICAgICAgIFwibGFfa19xcl9mYWN0b3JfbXJcIixcbiAgICAgICAgXCJsYV9rX3FyX3N5bV9laWdlbl9tY1wiLFxuICAgICAgICBcImxhX2tfcXJfc3ltX2VpZ2VuX21yXCIsXG4gICAgICAgIFwibGFfa19yYW5kb21fbWNcIixcbiAgICAgICAgXCJsYV9rX3JhbmRvbV9tclwiLFxuICAgICAgICBcImxhX2tfcmFuZG9tX3ZjXCIsXG4gICAgICAgIFwibGFfa19yYW5kb21fdnJcIixcbiAgICAgICAgXCJsYV9rX3N1YnRyYWN0X21jXCIsXG4gICAgICAgIFwibGFfa19zdWJ0cmFjdF9tclwiLFxuICAgICAgICBcImxhX2tfc3VidHJhY3RfdmNcIixcbiAgICAgICAgXCJsYV9rX3N1YnRyYWN0X3ZyXCIsXG4gICAgICAgIFwibGFfa190X2Fzc2lnblwiLFxuICAgICAgICBcImxhX2tfdHJhY2VfbWNcIixcbiAgICAgICAgXCJsYV9rX3RyYWNlX21yXCIsXG4gICAgICAgIFwibGFfa191cHBlcl9zb2x2ZV9tY1wiLFxuICAgICAgICBcImxhX2tfdXBwZXJfc29sdmVfbXJcIixcbiAgICAgICAgXCJsYV9rX3ZjX3NldFwiLFxuICAgICAgICBcImxhX2tfdnJfc2V0XCIsXG4gICAgICAgIFwibGFnXCIsXG4gICAgICAgIFwibGFndWRcIixcbiAgICAgICAgXCJsYXN0Y3ljbGVcIixcbiAgICAgICAgXCJsZW5hcnJheVwiLFxuICAgICAgICBcImxmb1wiLFxuICAgICAgICBcImxmc3JcIixcbiAgICAgICAgXCJsaW1pdFwiLFxuICAgICAgICBcImxpbWl0MVwiLFxuICAgICAgICBcImxpbmNvc1wiLFxuICAgICAgICBcImxpbmVcIixcbiAgICAgICAgXCJsaW5lblwiLFxuICAgICAgICBcImxpbmVuclwiLFxuICAgICAgICBcImxpbmV0b1wiLFxuICAgICAgICBcImxpbmtfYmVhdF9mb3JjZVwiLFxuICAgICAgICBcImxpbmtfYmVhdF9nZXRcIixcbiAgICAgICAgXCJsaW5rX2JlYXRfcmVxdWVzdFwiLFxuICAgICAgICBcImxpbmtfY3JlYXRlXCIsXG4gICAgICAgIFwibGlua19lbmFibGVcIixcbiAgICAgICAgXCJsaW5rX2lzX2VuYWJsZWRcIixcbiAgICAgICAgXCJsaW5rX21ldHJvXCIsXG4gICAgICAgIFwibGlua19wZWVyc1wiLFxuICAgICAgICBcImxpbmtfdGVtcG9fZ2V0XCIsXG4gICAgICAgIFwibGlua190ZW1wb19zZXRcIixcbiAgICAgICAgXCJsaW5saW5cIixcbiAgICAgICAgXCJsaW5yYW5kXCIsXG4gICAgICAgIFwibGluc2VnXCIsXG4gICAgICAgIFwibGluc2VnYlwiLFxuICAgICAgICBcImxpbnNlZ3JcIixcbiAgICAgICAgXCJsaXZlY29udlwiLFxuICAgICAgICBcImxvY3NlbmRcIixcbiAgICAgICAgXCJsb2NzaWdcIixcbiAgICAgICAgXCJsb2dcIixcbiAgICAgICAgXCJsb2cxMFwiLFxuICAgICAgICBcImxvZzJcIixcbiAgICAgICAgXCJsb2didHdvXCIsXG4gICAgICAgIFwibG9nY3VydmVcIixcbiAgICAgICAgXCJsb29wc2VnXCIsXG4gICAgICAgIFwibG9vcHNlZ3BcIixcbiAgICAgICAgXCJsb29wdHNlZ1wiLFxuICAgICAgICBcImxvb3B4c2VnXCIsXG4gICAgICAgIFwibG9yZW56XCIsXG4gICAgICAgIFwibG9zY2lsXCIsXG4gICAgICAgIFwibG9zY2lsM1wiLFxuICAgICAgICBcImxvc2NpbDNwaHNcIixcbiAgICAgICAgXCJsb3NjaWxwaHNcIixcbiAgICAgICAgXCJsb3NjaWx4XCIsXG4gICAgICAgIFwibG93cGFzczJcIixcbiAgICAgICAgXCJsb3dyZXNcIixcbiAgICAgICAgXCJsb3dyZXN4XCIsXG4gICAgICAgIFwibHBjYW5hbFwiLFxuICAgICAgICBcImxwY2ZpbHRlclwiLFxuICAgICAgICBcImxwZjE4XCIsXG4gICAgICAgIFwibHBmb3JtXCIsXG4gICAgICAgIFwibHBmcmVzb25cIixcbiAgICAgICAgXCJscGhhc29yXCIsXG4gICAgICAgIFwibHBpbnRlcnBcIixcbiAgICAgICAgXCJscG9zY2lsXCIsXG4gICAgICAgIFwibHBvc2NpbDNcIixcbiAgICAgICAgXCJscG9zY2lsYVwiLFxuICAgICAgICBcImxwb3NjaWxzYVwiLFxuICAgICAgICBcImxwb3NjaWxzYTJcIixcbiAgICAgICAgXCJscHJlYWRcIixcbiAgICAgICAgXCJscHJlc29uXCIsXG4gICAgICAgIFwibHBzaG9sZFwiLFxuICAgICAgICBcImxwc2hvbGRwXCIsXG4gICAgICAgIFwibHBzbG90XCIsXG4gICAgICAgIFwibHVmc1wiLFxuICAgICAgICBcIm1hY1wiLFxuICAgICAgICBcIm1hY2FcIixcbiAgICAgICAgXCJtYWRzclwiLFxuICAgICAgICBcIm1hZ3NcIixcbiAgICAgICAgXCJtYW5kZWxcIixcbiAgICAgICAgXCJtYW5kb2xcIixcbiAgICAgICAgXCJtYXBhcnJheVwiLFxuICAgICAgICBcIm1hcGFycmF5X2lcIixcbiAgICAgICAgXCJtYXJpbWJhXCIsXG4gICAgICAgIFwibWFzc2lnblwiLFxuICAgICAgICBcIm1heFwiLFxuICAgICAgICBcIm1heF9rXCIsXG4gICAgICAgIFwibWF4YWJzXCIsXG4gICAgICAgIFwibWF4YWJzYWNjdW1cIixcbiAgICAgICAgXCJtYXhhY2N1bVwiLFxuICAgICAgICBcIm1heGFsbG9jXCIsXG4gICAgICAgIFwibWF4YXJyYXlcIixcbiAgICAgICAgXCJtY2xvY2tcIixcbiAgICAgICAgXCJtZGVsYXlcIixcbiAgICAgICAgXCJtZWRpYW5cIixcbiAgICAgICAgXCJtZWRpYW5rXCIsXG4gICAgICAgIFwibWV0cm9cIixcbiAgICAgICAgXCJtZXRybzJcIixcbiAgICAgICAgXCJtZXRyb2JwbVwiLFxuICAgICAgICBcIm1mYlwiLFxuICAgICAgICBcIm1pZGdsb2JhbFwiLFxuICAgICAgICBcIm1pZGlhcnBcIixcbiAgICAgICAgXCJtaWRpYzE0XCIsXG4gICAgICAgIFwibWlkaWMyMVwiLFxuICAgICAgICBcIm1pZGljN1wiLFxuICAgICAgICBcIm1pZGljaGFubmVsYWZ0ZXJ0b3VjaFwiLFxuICAgICAgICBcIm1pZGljaG5cIixcbiAgICAgICAgXCJtaWRpY29udHJvbGNoYW5nZVwiLFxuICAgICAgICBcIm1pZGljdHJsXCIsXG4gICAgICAgIFwibWlkaWRlZmF1bHRcIixcbiAgICAgICAgXCJtaWRpZmlsZXN0YXR1c1wiLFxuICAgICAgICBcIm1pZGlpblwiLFxuICAgICAgICBcIm1pZGlub3Rlb2ZmXCIsXG4gICAgICAgIFwibWlkaW5vdGVvbmNwc1wiLFxuICAgICAgICBcIm1pZGlub3Rlb25rZXlcIixcbiAgICAgICAgXCJtaWRpbm90ZW9ub2N0XCIsXG4gICAgICAgIFwibWlkaW5vdGVvbnBjaFwiLFxuICAgICAgICBcIm1pZGlvblwiLFxuICAgICAgICBcIm1pZGlvbjJcIixcbiAgICAgICAgXCJtaWRpb3V0XCIsXG4gICAgICAgIFwibWlkaW91dF9pXCIsXG4gICAgICAgIFwibWlkaXBnbVwiLFxuICAgICAgICBcIm1pZGlwaXRjaGJlbmRcIixcbiAgICAgICAgXCJtaWRpcG9seWFmdGVydG91Y2hcIixcbiAgICAgICAgXCJtaWRpcHJvZ3JhbWNoYW5nZVwiLFxuICAgICAgICBcIm1pZGl0ZW1wb1wiLFxuICAgICAgICBcIm1pZHJlbW90XCIsXG4gICAgICAgIFwibWluXCIsXG4gICAgICAgIFwibWluYWJzXCIsXG4gICAgICAgIFwibWluYWJzYWNjdW1cIixcbiAgICAgICAgXCJtaW5hY2N1bVwiLFxuICAgICAgICBcIm1pbmFycmF5XCIsXG4gICAgICAgIFwibWluY2VyXCIsXG4gICAgICAgIFwibWlycm9yXCIsXG4gICAgICAgIFwibW9kZVwiLFxuICAgICAgICBcIm1vZG1hdHJpeFwiLFxuICAgICAgICBcIm1vbml0b3JcIixcbiAgICAgICAgXCJtb29nXCIsXG4gICAgICAgIFwibW9vZ2xhZGRlclwiLFxuICAgICAgICBcIm1vb2dsYWRkZXIyXCIsXG4gICAgICAgIFwibW9vZ3ZjZlwiLFxuICAgICAgICBcIm1vb2d2Y2YyXCIsXG4gICAgICAgIFwibW9zY2lsXCIsXG4gICAgICAgIFwibXAzYml0cmF0ZVwiLFxuICAgICAgICBcIm1wM2luXCIsXG4gICAgICAgIFwibXAzbGVuXCIsXG4gICAgICAgIFwibXAzbmNobmxzXCIsXG4gICAgICAgIFwibXAzb3V0XCIsXG4gICAgICAgIFwibXAzc2NhbFwiLFxuICAgICAgICBcIm1wM3NyXCIsXG4gICAgICAgIFwibXB1bHNlXCIsXG4gICAgICAgIFwibXJ0bXNnXCIsXG4gICAgICAgIFwibXMyc3RcIixcbiAgICAgICAgXCJtdG9mXCIsXG4gICAgICAgIFwibXRvblwiLFxuICAgICAgICBcIm11bHRpdGFwXCIsXG4gICAgICAgIFwibXV0ZVwiLFxuICAgICAgICBcIm12Y2hwZlwiLFxuICAgICAgICBcIm12Y2xwZjFcIixcbiAgICAgICAgXCJtdmNscGYyXCIsXG4gICAgICAgIFwibXZjbHBmM1wiLFxuICAgICAgICBcIm12Y2xwZjRcIixcbiAgICAgICAgXCJtdm1maWx0ZXJcIixcbiAgICAgICAgXCJteGFkc3JcIixcbiAgICAgICAgXCJuY2hubHNfaHdcIixcbiAgICAgICAgXCJuZXN0ZWRhcFwiLFxuICAgICAgICBcIm5sYWxwXCIsXG4gICAgICAgIFwibmxmaWx0XCIsXG4gICAgICAgIFwibmxmaWx0MlwiLFxuICAgICAgICBcIm5vaXNlXCIsXG4gICAgICAgIFwibm90ZW9mZlwiLFxuICAgICAgICBcIm5vdGVvblwiLFxuICAgICAgICBcIm5vdGVvbmR1clwiLFxuICAgICAgICBcIm5vdGVvbmR1cjJcIixcbiAgICAgICAgXCJub3RudW1cIixcbiAgICAgICAgXCJucmV2ZXJiXCIsXG4gICAgICAgIFwibnJwblwiLFxuICAgICAgICBcIm5zYW1wXCIsXG4gICAgICAgIFwibnN0YW5jZVwiLFxuICAgICAgICBcIm5zdHJudW1cIixcbiAgICAgICAgXCJuc3Ryc3RyXCIsXG4gICAgICAgIFwibnRvZlwiLFxuICAgICAgICBcIm50b21cIixcbiAgICAgICAgXCJudHJwb2xcIixcbiAgICAgICAgXCJueHRwb3cyXCIsXG4gICAgICAgIFwib2N0YXZlXCIsXG4gICAgICAgIFwib2N0Y3BzXCIsXG4gICAgICAgIFwib2N0bWlkaVwiLFxuICAgICAgICBcIm9jdG1pZGliXCIsXG4gICAgICAgIFwib2N0bWlkaW5uXCIsXG4gICAgICAgIFwib2N0cGNoXCIsXG4gICAgICAgIFwib2xhYnVmZmVyXCIsXG4gICAgICAgIFwib3NjYm5rXCIsXG4gICAgICAgIFwib3NjaWxcIixcbiAgICAgICAgXCJvc2NpbDFcIixcbiAgICAgICAgXCJvc2NpbDFpXCIsXG4gICAgICAgIFwib3NjaWwzXCIsXG4gICAgICAgIFwib3NjaWxpXCIsXG4gICAgICAgIFwib3NjaWxpa3RcIixcbiAgICAgICAgXCJvc2NpbGlrdHBcIixcbiAgICAgICAgXCJvc2NpbGlrdHNcIixcbiAgICAgICAgXCJvc2NpbG5cIixcbiAgICAgICAgXCJvc2NpbHNcIixcbiAgICAgICAgXCJvc2NpbHhcIixcbiAgICAgICAgXCJvdXRcIixcbiAgICAgICAgXCJvdXQzMlwiLFxuICAgICAgICBcIm91dGFsbFwiLFxuICAgICAgICBcIm91dGNcIixcbiAgICAgICAgXCJvdXRjaFwiLFxuICAgICAgICBcIm91dGhcIixcbiAgICAgICAgXCJvdXRpYXRcIixcbiAgICAgICAgXCJvdXRpY1wiLFxuICAgICAgICBcIm91dGljMTRcIixcbiAgICAgICAgXCJvdXRpcGF0XCIsXG4gICAgICAgIFwib3V0aXBiXCIsXG4gICAgICAgIFwib3V0aXBjXCIsXG4gICAgICAgIFwib3V0a2F0XCIsXG4gICAgICAgIFwib3V0a2NcIixcbiAgICAgICAgXCJvdXRrYzE0XCIsXG4gICAgICAgIFwib3V0a3BhdFwiLFxuICAgICAgICBcIm91dGtwYlwiLFxuICAgICAgICBcIm91dGtwY1wiLFxuICAgICAgICBcIm91dGxldGFcIixcbiAgICAgICAgXCJvdXRsZXRmXCIsXG4gICAgICAgIFwib3V0bGV0a1wiLFxuICAgICAgICBcIm91dGxldGtpZFwiLFxuICAgICAgICBcIm91dGxldHZcIixcbiAgICAgICAgXCJvdXRvXCIsXG4gICAgICAgIFwib3V0cVwiLFxuICAgICAgICBcIm91dHExXCIsXG4gICAgICAgIFwib3V0cTJcIixcbiAgICAgICAgXCJvdXRxM1wiLFxuICAgICAgICBcIm91dHE0XCIsXG4gICAgICAgIFwib3V0cmdcIixcbiAgICAgICAgXCJvdXRzXCIsXG4gICAgICAgIFwib3V0czFcIixcbiAgICAgICAgXCJvdXRzMlwiLFxuICAgICAgICBcIm91dHZhbHVlXCIsXG4gICAgICAgIFwib3V0eFwiLFxuICAgICAgICBcIm91dHpcIixcbiAgICAgICAgXCJwXCIsXG4gICAgICAgIFwicDVnY29ubmVjdFwiLFxuICAgICAgICBcInA1Z2RhdGFcIixcbiAgICAgICAgXCJwYW5cIixcbiAgICAgICAgXCJwYW4yXCIsXG4gICAgICAgIFwicGFyZXFcIixcbiAgICAgICAgXCJwYXJ0MnR4dFwiLFxuICAgICAgICBcInBhcnRpYWxzXCIsXG4gICAgICAgIFwicGFydGlra2VsXCIsXG4gICAgICAgIFwicGFydGlra2VsZ2V0XCIsXG4gICAgICAgIFwicGFydGlra2Vsc2V0XCIsXG4gICAgICAgIFwicGFydGlra2Vsc3luY1wiLFxuICAgICAgICBcInBhc3NpZ25cIixcbiAgICAgICAgXCJwYXVsc3RyZXRjaFwiLFxuICAgICAgICBcInBjYXVjaHlcIixcbiAgICAgICAgXCJwY2hiZW5kXCIsXG4gICAgICAgIFwicGNobWlkaVwiLFxuICAgICAgICBcInBjaG1pZGliXCIsXG4gICAgICAgIFwicGNobWlkaW5uXCIsXG4gICAgICAgIFwicGNob2N0XCIsXG4gICAgICAgIFwicGNodG9tXCIsXG4gICAgICAgIFwicGNvbnZvbHZlXCIsXG4gICAgICAgIFwicGNvdW50XCIsXG4gICAgICAgIFwicGRjbGlwXCIsXG4gICAgICAgIFwicGRoYWxmXCIsXG4gICAgICAgIFwicGRoYWxmeVwiLFxuICAgICAgICBcInBlYWtcIixcbiAgICAgICAgXCJwZ21hc3NpZ25cIixcbiAgICAgICAgXCJwZ21jaG5cIixcbiAgICAgICAgXCJwaGFzZXIxXCIsXG4gICAgICAgIFwicGhhc2VyMlwiLFxuICAgICAgICBcInBoYXNvclwiLFxuICAgICAgICBcInBoYXNvcmJua1wiLFxuICAgICAgICBcInBoc1wiLFxuICAgICAgICBcInBpbmRleFwiLFxuICAgICAgICBcInBpbmtlclwiLFxuICAgICAgICBcInBpbmtpc2hcIixcbiAgICAgICAgXCJwaXRjaFwiLFxuICAgICAgICBcInBpdGNoYWNcIixcbiAgICAgICAgXCJwaXRjaGFtZGZcIixcbiAgICAgICAgXCJwbGFuZXRcIixcbiAgICAgICAgXCJwbGF0ZXJldlwiLFxuICAgICAgICBcInBsbHRyYWNrXCIsXG4gICAgICAgIFwicGx1Y2tcIixcbiAgICAgICAgXCJwb2lzc29uXCIsXG4gICAgICAgIFwicG9sMnJlY3RcIixcbiAgICAgICAgXCJwb2x5YWZ0XCIsXG4gICAgICAgIFwicG9seW5vbWlhbFwiLFxuICAgICAgICBcInBvcnRcIixcbiAgICAgICAgXCJwb3J0a1wiLFxuICAgICAgICBcInBvc2NpbFwiLFxuICAgICAgICBcInBvc2NpbDNcIixcbiAgICAgICAgXCJwb3dcIixcbiAgICAgICAgXCJwb3dlcnNoYXBlXCIsXG4gICAgICAgIFwicG93b2Z0d29cIixcbiAgICAgICAgXCJwb3dzXCIsXG4gICAgICAgIFwicHJlYWxsb2NcIixcbiAgICAgICAgXCJwcmVwaWFub1wiLFxuICAgICAgICBcInByaW50XCIsXG4gICAgICAgIFwicHJpbnRfdHlwZVwiLFxuICAgICAgICBcInByaW50YXJyYXlcIixcbiAgICAgICAgXCJwcmludGZcIixcbiAgICAgICAgXCJwcmludGZfaVwiLFxuICAgICAgICBcInByaW50a1wiLFxuICAgICAgICBcInByaW50azJcIixcbiAgICAgICAgXCJwcmludGtzXCIsXG4gICAgICAgIFwicHJpbnRrczJcIixcbiAgICAgICAgXCJwcmludGxuXCIsXG4gICAgICAgIFwicHJpbnRzXCIsXG4gICAgICAgIFwicHJpbnRza1wiLFxuICAgICAgICBcInByb2R1Y3RcIixcbiAgICAgICAgXCJwc2V0XCIsXG4gICAgICAgIFwicHRhYmxld1wiLFxuICAgICAgICBcInB0cmFja1wiLFxuICAgICAgICBcInB1dHNcIixcbiAgICAgICAgXCJwdmFkZFwiLFxuICAgICAgICBcInB2YnVmcmVhZFwiLFxuICAgICAgICBcInB2Y3Jvc3NcIixcbiAgICAgICAgXCJwdmludGVycFwiLFxuICAgICAgICBcInB2b2NcIixcbiAgICAgICAgXCJwdnJlYWRcIixcbiAgICAgICAgXCJwdnMyYXJyYXlcIixcbiAgICAgICAgXCJwdnMydGFiXCIsXG4gICAgICAgIFwicHZzYWRzeW5cIixcbiAgICAgICAgXCJwdnNhbmFsXCIsXG4gICAgICAgIFwicHZzYXJwXCIsXG4gICAgICAgIFwicHZzYmFuZHBcIixcbiAgICAgICAgXCJwdnNiYW5kclwiLFxuICAgICAgICBcInB2c2JhbmR3aWR0aFwiLFxuICAgICAgICBcInB2c2JpblwiLFxuICAgICAgICBcInB2c2JsdXJcIixcbiAgICAgICAgXCJwdnNidWZmZXJcIixcbiAgICAgICAgXCJwdnNidWZyZWFkXCIsXG4gICAgICAgIFwicHZzYnVmcmVhZDJcIixcbiAgICAgICAgXCJwdnNjYWxlXCIsXG4gICAgICAgIFwicHZzY2VudFwiLFxuICAgICAgICBcInB2c2NlcHNcIixcbiAgICAgICAgXCJwdnNjZnNcIixcbiAgICAgICAgXCJwdnNjcm9zc1wiLFxuICAgICAgICBcInB2c2RlbWl4XCIsXG4gICAgICAgIFwicHZzZGlza2luXCIsXG4gICAgICAgIFwicHZzZGlzcFwiLFxuICAgICAgICBcInB2c2VudmZ0d1wiLFxuICAgICAgICBcInB2c2ZpbHRlclwiLFxuICAgICAgICBcInB2c2ZyZWFkXCIsXG4gICAgICAgIFwicHZzZnJlZXplXCIsXG4gICAgICAgIFwicHZzZnJvbWFycmF5XCIsXG4gICAgICAgIFwicHZzZnRyXCIsXG4gICAgICAgIFwicHZzZnR3XCIsXG4gICAgICAgIFwicHZzZndyaXRlXCIsXG4gICAgICAgIFwicHZzZ2FpblwiLFxuICAgICAgICBcInB2c2dlbmR5XCIsXG4gICAgICAgIFwicHZzaGlmdFwiLFxuICAgICAgICBcInB2c2lmZFwiLFxuICAgICAgICBcInB2c2luXCIsXG4gICAgICAgIFwicHZzaW5mb1wiLFxuICAgICAgICBcInB2c2luaXRcIixcbiAgICAgICAgXCJwdnNsb2NrXCIsXG4gICAgICAgIFwicHZzbHBjXCIsXG4gICAgICAgIFwicHZzbWFza2FcIixcbiAgICAgICAgXCJwdnNtaXhcIixcbiAgICAgICAgXCJwdnNtb290aFwiLFxuICAgICAgICBcInB2c21vcnBoXCIsXG4gICAgICAgIFwicHZzb3NjXCIsXG4gICAgICAgIFwicHZzb3V0XCIsXG4gICAgICAgIFwicHZzcGl0Y2hcIixcbiAgICAgICAgXCJwdnN0YW5hbFwiLFxuICAgICAgICBcInB2c3RlbmNpbFwiLFxuICAgICAgICBcInB2c3RyYWNlXCIsXG4gICAgICAgIFwicHZzdm9jXCIsXG4gICAgICAgIFwicHZzd2FycFwiLFxuICAgICAgICBcInB2c3ludGhcIixcbiAgICAgICAgXCJwd2RcIixcbiAgICAgICAgXCJweWFzc2lnblwiLFxuICAgICAgICBcInB5YXNzaWduaVwiLFxuICAgICAgICBcInB5YXNzaWdudFwiLFxuICAgICAgICBcInB5Y2FsbFwiLFxuICAgICAgICBcInB5Y2FsbDFcIixcbiAgICAgICAgXCJweWNhbGwxaVwiLFxuICAgICAgICBcInB5Y2FsbDF0XCIsXG4gICAgICAgIFwicHljYWxsMlwiLFxuICAgICAgICBcInB5Y2FsbDJpXCIsXG4gICAgICAgIFwicHljYWxsMnRcIixcbiAgICAgICAgXCJweWNhbGwzXCIsXG4gICAgICAgIFwicHljYWxsM2lcIixcbiAgICAgICAgXCJweWNhbGwzdFwiLFxuICAgICAgICBcInB5Y2FsbDRcIixcbiAgICAgICAgXCJweWNhbGw0aVwiLFxuICAgICAgICBcInB5Y2FsbDR0XCIsXG4gICAgICAgIFwicHljYWxsNVwiLFxuICAgICAgICBcInB5Y2FsbDVpXCIsXG4gICAgICAgIFwicHljYWxsNXRcIixcbiAgICAgICAgXCJweWNhbGw2XCIsXG4gICAgICAgIFwicHljYWxsNmlcIixcbiAgICAgICAgXCJweWNhbGw2dFwiLFxuICAgICAgICBcInB5Y2FsbDdcIixcbiAgICAgICAgXCJweWNhbGw3aVwiLFxuICAgICAgICBcInB5Y2FsbDd0XCIsXG4gICAgICAgIFwicHljYWxsOFwiLFxuICAgICAgICBcInB5Y2FsbDhpXCIsXG4gICAgICAgIFwicHljYWxsOHRcIixcbiAgICAgICAgXCJweWNhbGxpXCIsXG4gICAgICAgIFwicHljYWxsblwiLFxuICAgICAgICBcInB5Y2FsbG5pXCIsXG4gICAgICAgIFwicHljYWxsdFwiLFxuICAgICAgICBcInB5ZXZhbFwiLFxuICAgICAgICBcInB5ZXZhbGlcIixcbiAgICAgICAgXCJweWV2YWx0XCIsXG4gICAgICAgIFwicHlleGVjXCIsXG4gICAgICAgIFwicHlleGVjaVwiLFxuICAgICAgICBcInB5ZXhlY3RcIixcbiAgICAgICAgXCJweWluaXRcIixcbiAgICAgICAgXCJweWxhc3NpZ25cIixcbiAgICAgICAgXCJweWxhc3NpZ25pXCIsXG4gICAgICAgIFwicHlsYXNzaWdudFwiLFxuICAgICAgICBcInB5bGNhbGxcIixcbiAgICAgICAgXCJweWxjYWxsMVwiLFxuICAgICAgICBcInB5bGNhbGwxaVwiLFxuICAgICAgICBcInB5bGNhbGwxdFwiLFxuICAgICAgICBcInB5bGNhbGwyXCIsXG4gICAgICAgIFwicHlsY2FsbDJpXCIsXG4gICAgICAgIFwicHlsY2FsbDJ0XCIsXG4gICAgICAgIFwicHlsY2FsbDNcIixcbiAgICAgICAgXCJweWxjYWxsM2lcIixcbiAgICAgICAgXCJweWxjYWxsM3RcIixcbiAgICAgICAgXCJweWxjYWxsNFwiLFxuICAgICAgICBcInB5bGNhbGw0aVwiLFxuICAgICAgICBcInB5bGNhbGw0dFwiLFxuICAgICAgICBcInB5bGNhbGw1XCIsXG4gICAgICAgIFwicHlsY2FsbDVpXCIsXG4gICAgICAgIFwicHlsY2FsbDV0XCIsXG4gICAgICAgIFwicHlsY2FsbDZcIixcbiAgICAgICAgXCJweWxjYWxsNmlcIixcbiAgICAgICAgXCJweWxjYWxsNnRcIixcbiAgICAgICAgXCJweWxjYWxsN1wiLFxuICAgICAgICBcInB5bGNhbGw3aVwiLFxuICAgICAgICBcInB5bGNhbGw3dFwiLFxuICAgICAgICBcInB5bGNhbGw4XCIsXG4gICAgICAgIFwicHlsY2FsbDhpXCIsXG4gICAgICAgIFwicHlsY2FsbDh0XCIsXG4gICAgICAgIFwicHlsY2FsbGlcIixcbiAgICAgICAgXCJweWxjYWxsblwiLFxuICAgICAgICBcInB5bGNhbGxuaVwiLFxuICAgICAgICBcInB5bGNhbGx0XCIsXG4gICAgICAgIFwicHlsZXZhbFwiLFxuICAgICAgICBcInB5bGV2YWxpXCIsXG4gICAgICAgIFwicHlsZXZhbHRcIixcbiAgICAgICAgXCJweWxleGVjXCIsXG4gICAgICAgIFwicHlsZXhlY2lcIixcbiAgICAgICAgXCJweWxleGVjdFwiLFxuICAgICAgICBcInB5bHJ1blwiLFxuICAgICAgICBcInB5bHJ1bmlcIixcbiAgICAgICAgXCJweWxydW50XCIsXG4gICAgICAgIFwicHlydW5cIixcbiAgICAgICAgXCJweXJ1bmlcIixcbiAgICAgICAgXCJweXJ1bnRcIixcbiAgICAgICAgXCJxaW5mXCIsXG4gICAgICAgIFwicW5hblwiLFxuICAgICAgICBcInIyY1wiLFxuICAgICAgICBcInJhbmRcIixcbiAgICAgICAgXCJyYW5kY1wiLFxuICAgICAgICBcInJhbmRoXCIsXG4gICAgICAgIFwicmFuZGlcIixcbiAgICAgICAgXCJyYW5kb21cIixcbiAgICAgICAgXCJyYW5kb21oXCIsXG4gICAgICAgIFwicmFuZG9taVwiLFxuICAgICAgICBcInJiamVxXCIsXG4gICAgICAgIFwicmVhZGNsb2NrXCIsXG4gICAgICAgIFwicmVhZGZcIixcbiAgICAgICAgXCJyZWFkZmlcIixcbiAgICAgICAgXCJyZWFka1wiLFxuICAgICAgICBcInJlYWRrMlwiLFxuICAgICAgICBcInJlYWRrM1wiLFxuICAgICAgICBcInJlYWRrNFwiLFxuICAgICAgICBcInJlYWRrc1wiLFxuICAgICAgICBcInJlYWRzY29yZVwiLFxuICAgICAgICBcInJlYWRzY3JhdGNoXCIsXG4gICAgICAgIFwicmVjdDJwb2xcIixcbiAgICAgICAgXCJyZWxlYXNlXCIsXG4gICAgICAgIFwicmVtb3RlcG9ydFwiLFxuICAgICAgICBcInJlbW92ZVwiLFxuICAgICAgICBcInJlcGx1Y2tcIixcbiAgICAgICAgXCJyZXNoYXBlYXJyYXlcIixcbiAgICAgICAgXCJyZXNvblwiLFxuICAgICAgICBcInJlc29uYm5rXCIsXG4gICAgICAgIFwicmVzb25rXCIsXG4gICAgICAgIFwicmVzb25yXCIsXG4gICAgICAgIFwicmVzb254XCIsXG4gICAgICAgIFwicmVzb254a1wiLFxuICAgICAgICBcInJlc29ueVwiLFxuICAgICAgICBcInJlc29uelwiLFxuICAgICAgICBcInJlc3luXCIsXG4gICAgICAgIFwicmV2ZXJiXCIsXG4gICAgICAgIFwicmV2ZXJiMlwiLFxuICAgICAgICBcInJldmVyYnNjXCIsXG4gICAgICAgIFwicmV3aW5kc2NvcmVcIixcbiAgICAgICAgXCJyZXp6eVwiLFxuICAgICAgICBcInJmZnRcIixcbiAgICAgICAgXCJyaWZmdFwiLFxuICAgICAgICBcInJtc1wiLFxuICAgICAgICBcInJuZFwiLFxuICAgICAgICBcInJuZDMxXCIsXG4gICAgICAgIFwicm5kc2VlZFwiLFxuICAgICAgICBcInJvdW5kXCIsXG4gICAgICAgIFwicnNwbGluZVwiLFxuICAgICAgICBcInJ0Y2xvY2tcIixcbiAgICAgICAgXCJzMTZiMTRcIixcbiAgICAgICAgXCJzMzJiMTRcIixcbiAgICAgICAgXCJzYW1waG9sZFwiLFxuICAgICAgICBcInNhbmRwYXBlclwiLFxuICAgICAgICBcInNjX2xhZ1wiLFxuICAgICAgICBcInNjX2xhZ3VkXCIsXG4gICAgICAgIFwic2NfcGhhc29yXCIsXG4gICAgICAgIFwic2NfdHJpZ1wiLFxuICAgICAgICBcInNjYWxlXCIsXG4gICAgICAgIFwic2NhbGUyXCIsXG4gICAgICAgIFwic2NhbGVhcnJheVwiLFxuICAgICAgICBcInNjYW5oYW1tZXJcIixcbiAgICAgICAgXCJzY2FubWFwXCIsXG4gICAgICAgIFwic2NhbnNcIixcbiAgICAgICAgXCJzY2Fuc21hcFwiLFxuICAgICAgICBcInNjYW50YWJsZVwiLFxuICAgICAgICBcInNjYW51XCIsXG4gICAgICAgIFwic2NhbnUyXCIsXG4gICAgICAgIFwic2NoZWRrd2hlblwiLFxuICAgICAgICBcInNjaGVka3doZW5uYW1lZFwiLFxuICAgICAgICBcInNjaGVkdWxlXCIsXG4gICAgICAgIFwic2NoZWR1bGVrXCIsXG4gICAgICAgIFwic2NoZWR3aGVuXCIsXG4gICAgICAgIFwic2NvcmVsaW5lXCIsXG4gICAgICAgIFwic2NvcmVsaW5lX2lcIixcbiAgICAgICAgXCJzZWVkXCIsXG4gICAgICAgIFwic2VrZXJlXCIsXG4gICAgICAgIFwic2VsZWN0XCIsXG4gICAgICAgIFwic2VtaXRvbmVcIixcbiAgICAgICAgXCJzZW5zZVwiLFxuICAgICAgICBcInNlbnNla2V5XCIsXG4gICAgICAgIFwic2VxdGltZVwiLFxuICAgICAgICBcInNlcXRpbWUyXCIsXG4gICAgICAgIFwic2VxdVwiLFxuICAgICAgICBcInNlcXVzdGF0ZVwiLFxuICAgICAgICBcInNlcmlhbEJlZ2luXCIsXG4gICAgICAgIFwic2VyaWFsRW5kXCIsXG4gICAgICAgIFwic2VyaWFsRmx1c2hcIixcbiAgICAgICAgXCJzZXJpYWxQcmludFwiLFxuICAgICAgICBcInNlcmlhbFJlYWRcIixcbiAgICAgICAgXCJzZXJpYWxXcml0ZVwiLFxuICAgICAgICBcInNlcmlhbFdyaXRlX2lcIixcbiAgICAgICAgXCJzZXRjb2xcIixcbiAgICAgICAgXCJzZXRjdHJsXCIsXG4gICAgICAgIFwic2V0a3NtcHNcIixcbiAgICAgICAgXCJzZXRyb3dcIixcbiAgICAgICAgXCJzZXRzY29yZXBvc1wiLFxuICAgICAgICBcInNmaWxpc3RcIixcbiAgICAgICAgXCJzZmluc3RyXCIsXG4gICAgICAgIFwic2ZpbnN0cjNcIixcbiAgICAgICAgXCJzZmluc3RyM21cIixcbiAgICAgICAgXCJzZmluc3RybVwiLFxuICAgICAgICBcInNmbG9hZFwiLFxuICAgICAgICBcInNmbG9vcGVyXCIsXG4gICAgICAgIFwic2ZwYXNzaWduXCIsXG4gICAgICAgIFwic2ZwbGF5XCIsXG4gICAgICAgIFwic2ZwbGF5M1wiLFxuICAgICAgICBcInNmcGxheTNtXCIsXG4gICAgICAgIFwic2ZwbGF5bVwiLFxuICAgICAgICBcInNmcGxpc3RcIixcbiAgICAgICAgXCJzZnByZXNldFwiLFxuICAgICAgICBcInNoYWtlclwiLFxuICAgICAgICBcInNoaWZ0aW5cIixcbiAgICAgICAgXCJzaGlmdG91dFwiLFxuICAgICAgICBcInNpZ251bVwiLFxuICAgICAgICBcInNpblwiLFxuICAgICAgICBcInNpbmhcIixcbiAgICAgICAgXCJzaW5pbnZcIixcbiAgICAgICAgXCJzaW5zeW5cIixcbiAgICAgICAgXCJza2ZcIixcbiAgICAgICAgXCJzbGVpZ2hiZWxsc1wiLFxuICAgICAgICBcInNsaWNlYXJyYXlcIixcbiAgICAgICAgXCJzbGljZWFycmF5X2lcIixcbiAgICAgICAgXCJzbGlkZXIxNlwiLFxuICAgICAgICBcInNsaWRlcjE2ZlwiLFxuICAgICAgICBcInNsaWRlcjE2dGFibGVcIixcbiAgICAgICAgXCJzbGlkZXIxNnRhYmxlZlwiLFxuICAgICAgICBcInNsaWRlcjMyXCIsXG4gICAgICAgIFwic2xpZGVyMzJmXCIsXG4gICAgICAgIFwic2xpZGVyMzJ0YWJsZVwiLFxuICAgICAgICBcInNsaWRlcjMydGFibGVmXCIsXG4gICAgICAgIFwic2xpZGVyNjRcIixcbiAgICAgICAgXCJzbGlkZXI2NGZcIixcbiAgICAgICAgXCJzbGlkZXI2NHRhYmxlXCIsXG4gICAgICAgIFwic2xpZGVyNjR0YWJsZWZcIixcbiAgICAgICAgXCJzbGlkZXI4XCIsXG4gICAgICAgIFwic2xpZGVyOGZcIixcbiAgICAgICAgXCJzbGlkZXI4dGFibGVcIixcbiAgICAgICAgXCJzbGlkZXI4dGFibGVmXCIsXG4gICAgICAgIFwic2xpZGVyS2F3YWlcIixcbiAgICAgICAgXCJzbmRsb29wXCIsXG4gICAgICAgIFwic25kd2FycFwiLFxuICAgICAgICBcInNuZHdhcnBzdFwiLFxuICAgICAgICBcInNvY2tyZWN2XCIsXG4gICAgICAgIFwic29ja3JlY3ZzXCIsXG4gICAgICAgIFwic29ja3NlbmRcIixcbiAgICAgICAgXCJzb2Nrc2VuZHNcIixcbiAgICAgICAgXCJzb3J0YVwiLFxuICAgICAgICBcInNvcnRkXCIsXG4gICAgICAgIFwic291bmRpblwiLFxuICAgICAgICBcInNwYWNlXCIsXG4gICAgICAgIFwic3BhdDNkXCIsXG4gICAgICAgIFwic3BhdDNkaVwiLFxuICAgICAgICBcInNwYXQzZHRcIixcbiAgICAgICAgXCJzcGRpc3RcIixcbiAgICAgICAgXCJzcGZcIixcbiAgICAgICAgXCJzcGxpdHJpZ1wiLFxuICAgICAgICBcInNwcmludGZcIixcbiAgICAgICAgXCJzcHJpbnRma1wiLFxuICAgICAgICBcInNwc2VuZFwiLFxuICAgICAgICBcInNxcnRcIixcbiAgICAgICAgXCJzcXVpbmV3YXZlXCIsXG4gICAgICAgIFwic3QybXNcIixcbiAgICAgICAgXCJzdGF0ZXZhclwiLFxuICAgICAgICBcInN0ZXJyYWluXCIsXG4gICAgICAgIFwic3RpeFwiLFxuICAgICAgICBcInN0cmNhdFwiLFxuICAgICAgICBcInN0cmNhdGtcIixcbiAgICAgICAgXCJzdHJjaGFyXCIsXG4gICAgICAgIFwic3RyY2hhcmtcIixcbiAgICAgICAgXCJzdHJjbXBcIixcbiAgICAgICAgXCJzdHJjbXBrXCIsXG4gICAgICAgIFwic3RyY3B5XCIsXG4gICAgICAgIFwic3RyY3B5a1wiLFxuICAgICAgICBcInN0cmVjdlwiLFxuICAgICAgICBcInN0cmVzb25cIixcbiAgICAgICAgXCJzdHJmcm9tdXJsXCIsXG4gICAgICAgIFwic3RyZ2V0XCIsXG4gICAgICAgIFwic3RyaW5kZXhcIixcbiAgICAgICAgXCJzdHJpbmRleGtcIixcbiAgICAgICAgXCJzdHJpbmcyYXJyYXlcIixcbiAgICAgICAgXCJzdHJsZW5cIixcbiAgICAgICAgXCJzdHJsZW5rXCIsXG4gICAgICAgIFwic3RybG93ZXJcIixcbiAgICAgICAgXCJzdHJsb3dlcmtcIixcbiAgICAgICAgXCJzdHJyaW5kZXhcIixcbiAgICAgICAgXCJzdHJyaW5kZXhrXCIsXG4gICAgICAgIFwic3Ryc2V0XCIsXG4gICAgICAgIFwic3Ryc3RyaXBcIixcbiAgICAgICAgXCJzdHJzdWJcIixcbiAgICAgICAgXCJzdHJzdWJrXCIsXG4gICAgICAgIFwic3RydG9kXCIsXG4gICAgICAgIFwic3RydG9ka1wiLFxuICAgICAgICBcInN0cnRvbFwiLFxuICAgICAgICBcInN0cnRvbGtcIixcbiAgICAgICAgXCJzdHJ1cHBlclwiLFxuICAgICAgICBcInN0cnVwcGVya1wiLFxuICAgICAgICBcInN0c2VuZFwiLFxuICAgICAgICBcInN1Ymluc3RyXCIsXG4gICAgICAgIFwic3ViaW5zdHJpbml0XCIsXG4gICAgICAgIFwic3VtXCIsXG4gICAgICAgIFwic3VtYXJyYXlcIixcbiAgICAgICAgXCJzdmZpbHRlclwiLFxuICAgICAgICBcInN2blwiLFxuICAgICAgICBcInN5bmNncmFpblwiLFxuICAgICAgICBcInN5bmNsb29wXCIsXG4gICAgICAgIFwic3luY3BoYXNvclwiLFxuICAgICAgICBcInN5c3RlbVwiLFxuICAgICAgICBcInN5c3RlbV9pXCIsXG4gICAgICAgIFwidGFiXCIsXG4gICAgICAgIFwidGFiMmFycmF5XCIsXG4gICAgICAgIFwidGFiMnB2c1wiLFxuICAgICAgICBcInRhYl9pXCIsXG4gICAgICAgIFwidGFiaWZkXCIsXG4gICAgICAgIFwidGFibGVcIixcbiAgICAgICAgXCJ0YWJsZTNcIixcbiAgICAgICAgXCJ0YWJsZTNrdFwiLFxuICAgICAgICBcInRhYmxlY29weVwiLFxuICAgICAgICBcInRhYmxlZmlsdGVyXCIsXG4gICAgICAgIFwidGFibGVmaWx0ZXJpXCIsXG4gICAgICAgIFwidGFibGVncHdcIixcbiAgICAgICAgXCJ0YWJsZWlcIixcbiAgICAgICAgXCJ0YWJsZWljb3B5XCIsXG4gICAgICAgIFwidGFibGVpZ3B3XCIsXG4gICAgICAgIFwidGFibGVpa3RcIixcbiAgICAgICAgXCJ0YWJsZWltaXhcIixcbiAgICAgICAgXCJ0YWJsZWt0XCIsXG4gICAgICAgIFwidGFibGVtaXhcIixcbiAgICAgICAgXCJ0YWJsZW5nXCIsXG4gICAgICAgIFwidGFibGVyYVwiLFxuICAgICAgICBcInRhYmxlc2VnXCIsXG4gICAgICAgIFwidGFibGVzaHVmZmxlXCIsXG4gICAgICAgIFwidGFibGVzaHVmZmxlaVwiLFxuICAgICAgICBcInRhYmxld1wiLFxuICAgICAgICBcInRhYmxld2FcIixcbiAgICAgICAgXCJ0YWJsZXdrdFwiLFxuICAgICAgICBcInRhYmxleGt0XCIsXG4gICAgICAgIFwidGFibGV4c2VnXCIsXG4gICAgICAgIFwidGFibW9ycGhcIixcbiAgICAgICAgXCJ0YWJtb3JwaGFcIixcbiAgICAgICAgXCJ0YWJtb3JwaGFrXCIsXG4gICAgICAgIFwidGFibW9ycGhpXCIsXG4gICAgICAgIFwidGFicGxheVwiLFxuICAgICAgICBcInRhYnJlY1wiLFxuICAgICAgICBcInRhYnN1bVwiLFxuICAgICAgICBcInRhYndcIixcbiAgICAgICAgXCJ0YWJ3X2lcIixcbiAgICAgICAgXCJ0YW1ib3VyaW5lXCIsXG4gICAgICAgIFwidGFuXCIsXG4gICAgICAgIFwidGFuaFwiLFxuICAgICAgICBcInRhbmludlwiLFxuICAgICAgICBcInRhbmludjJcIixcbiAgICAgICAgXCJ0YnZjZlwiLFxuICAgICAgICBcInRlbXBlc3RcIixcbiAgICAgICAgXCJ0ZW1wb1wiLFxuICAgICAgICBcInRlbXBvc2NhbFwiLFxuICAgICAgICBcInRlbXBvdmFsXCIsXG4gICAgICAgIFwidGltZWRzZXFcIixcbiAgICAgICAgXCJ0aW1laW5zdGtcIixcbiAgICAgICAgXCJ0aW1laW5zdHNcIixcbiAgICAgICAgXCJ0aW1la1wiLFxuICAgICAgICBcInRpbWVzXCIsXG4gICAgICAgIFwidGl2YWxcIixcbiAgICAgICAgXCJ0bGluZXRvXCIsXG4gICAgICAgIFwidG9uZVwiLFxuICAgICAgICBcInRvbmVrXCIsXG4gICAgICAgIFwidG9uZXhcIixcbiAgICAgICAgXCJ0cmFkc3luXCIsXG4gICAgICAgIFwidHJhbmRvbVwiLFxuICAgICAgICBcInRyYW5zZWdcIixcbiAgICAgICAgXCJ0cmFuc2VnYlwiLFxuICAgICAgICBcInRyYW5zZWdyXCIsXG4gICAgICAgIFwidHJjcm9zc1wiLFxuICAgICAgICBcInRyZmlsdGVyXCIsXG4gICAgICAgIFwidHJoaWdoZXN0XCIsXG4gICAgICAgIFwidHJpZ0V4cHNlZ1wiLFxuICAgICAgICBcInRyaWdMaW5zZWdcIixcbiAgICAgICAgXCJ0cmlnZXhwc2VnXCIsXG4gICAgICAgIFwidHJpZ2dlclwiLFxuICAgICAgICBcInRyaWdob2xkXCIsXG4gICAgICAgIFwidHJpZ2xpbnNlZ1wiLFxuICAgICAgICBcInRyaWdwaGFzb3JcIixcbiAgICAgICAgXCJ0cmlnc2VxXCIsXG4gICAgICAgIFwidHJpbVwiLFxuICAgICAgICBcInRyaW1faVwiLFxuICAgICAgICBcInRyaXJhbmRcIixcbiAgICAgICAgXCJ0cmxvd2VzdFwiLFxuICAgICAgICBcInRybWl4XCIsXG4gICAgICAgIFwidHJzY2FsZVwiLFxuICAgICAgICBcInRyc2hpZnRcIixcbiAgICAgICAgXCJ0cnNwbGl0XCIsXG4gICAgICAgIFwidHVybm9mZlwiLFxuICAgICAgICBcInR1cm5vZmYyXCIsXG4gICAgICAgIFwidHVybm9mZjJfaVwiLFxuICAgICAgICBcInR1cm5vZmYzXCIsXG4gICAgICAgIFwidHVybm9uXCIsXG4gICAgICAgIFwidHZjb252XCIsXG4gICAgICAgIFwidW5pcmFuZFwiLFxuICAgICAgICBcInVud3JhcFwiLFxuICAgICAgICBcInVwc2FtcFwiLFxuICAgICAgICBcInVyYW5kb21cIixcbiAgICAgICAgXCJ1cmRcIixcbiAgICAgICAgXCJ2YWN0cm9sXCIsXG4gICAgICAgIFwidmFkZFwiLFxuICAgICAgICBcInZhZGRfaVwiLFxuICAgICAgICBcInZhZGR2XCIsXG4gICAgICAgIFwidmFkZHZfaVwiLFxuICAgICAgICBcInZhZ2V0XCIsXG4gICAgICAgIFwidmFscGFzc1wiLFxuICAgICAgICBcInZhc2V0XCIsXG4gICAgICAgIFwidmJhcFwiLFxuICAgICAgICBcInZiYXBnXCIsXG4gICAgICAgIFwidmJhcGdtb3ZlXCIsXG4gICAgICAgIFwidmJhcGxzaW5pdFwiLFxuICAgICAgICBcInZiYXBtb3ZlXCIsXG4gICAgICAgIFwidmJhcHpcIixcbiAgICAgICAgXCJ2YmFwem1vdmVcIixcbiAgICAgICAgXCJ2Y2VsbGFcIixcbiAgICAgICAgXCJ2Y2xwZlwiLFxuICAgICAgICBcInZjb1wiLFxuICAgICAgICBcInZjbzJcIixcbiAgICAgICAgXCJ2Y28yZnRcIixcbiAgICAgICAgXCJ2Y28yaWZ0XCIsXG4gICAgICAgIFwidmNvMmluaXRcIixcbiAgICAgICAgXCJ2Y29tYlwiLFxuICAgICAgICBcInZjb3B5XCIsXG4gICAgICAgIFwidmNvcHlfaVwiLFxuICAgICAgICBcInZkZWxfa1wiLFxuICAgICAgICBcInZkZWxheVwiLFxuICAgICAgICBcInZkZWxheTNcIixcbiAgICAgICAgXCJ2ZGVsYXlrXCIsXG4gICAgICAgIFwidmRlbGF5eFwiLFxuICAgICAgICBcInZkZWxheXhxXCIsXG4gICAgICAgIFwidmRlbGF5eHNcIixcbiAgICAgICAgXCJ2ZGVsYXl4d1wiLFxuICAgICAgICBcInZkZWxheXh3cVwiLFxuICAgICAgICBcInZkZWxheXh3c1wiLFxuICAgICAgICBcInZkaXZ2XCIsXG4gICAgICAgIFwidmRpdnZfaVwiLFxuICAgICAgICBcInZlY2RlbGF5XCIsXG4gICAgICAgIFwidmVsb2NcIixcbiAgICAgICAgXCJ2ZXhwXCIsXG4gICAgICAgIFwidmV4cF9pXCIsXG4gICAgICAgIFwidmV4cHNlZ1wiLFxuICAgICAgICBcInZleHB2XCIsXG4gICAgICAgIFwidmV4cHZfaVwiLFxuICAgICAgICBcInZpYmVzXCIsXG4gICAgICAgIFwidmliclwiLFxuICAgICAgICBcInZpYnJhdG9cIixcbiAgICAgICAgXCJ2aW5jclwiLFxuICAgICAgICBcInZsaW1pdFwiLFxuICAgICAgICBcInZsaW5zZWdcIixcbiAgICAgICAgXCJ2bG93cmVzXCIsXG4gICAgICAgIFwidm1hcFwiLFxuICAgICAgICBcInZtaXJyb3JcIixcbiAgICAgICAgXCJ2bXVsdFwiLFxuICAgICAgICBcInZtdWx0X2lcIixcbiAgICAgICAgXCJ2bXVsdHZcIixcbiAgICAgICAgXCJ2bXVsdHZfaVwiLFxuICAgICAgICBcInZvaWNlXCIsXG4gICAgICAgIFwidm9zaW1cIixcbiAgICAgICAgXCJ2cGhhc2VzZWdcIixcbiAgICAgICAgXCJ2cG9ydFwiLFxuICAgICAgICBcInZwb3dcIixcbiAgICAgICAgXCJ2cG93X2lcIixcbiAgICAgICAgXCJ2cG93dlwiLFxuICAgICAgICBcInZwb3d2X2lcIixcbiAgICAgICAgXCJ2cHNcIixcbiAgICAgICAgXCJ2cHZvY1wiLFxuICAgICAgICBcInZyYW5kaFwiLFxuICAgICAgICBcInZyYW5kaVwiLFxuICAgICAgICBcInZzdWJ2XCIsXG4gICAgICAgIFwidnN1YnZfaVwiLFxuICAgICAgICBcInZ0YWJhXCIsXG4gICAgICAgIFwidnRhYmlcIixcbiAgICAgICAgXCJ2dGFia1wiLFxuICAgICAgICBcInZ0YWJsZTFrXCIsXG4gICAgICAgIFwidnRhYmxlYVwiLFxuICAgICAgICBcInZ0YWJsZWlcIixcbiAgICAgICAgXCJ2dGFibGVrXCIsXG4gICAgICAgIFwidnRhYmxld2FcIixcbiAgICAgICAgXCJ2dGFibGV3aVwiLFxuICAgICAgICBcInZ0YWJsZXdrXCIsXG4gICAgICAgIFwidnRhYndhXCIsXG4gICAgICAgIFwidnRhYndpXCIsXG4gICAgICAgIFwidnRhYndrXCIsXG4gICAgICAgIFwidndyYXBcIixcbiAgICAgICAgXCJ3YXZlc2V0XCIsXG4gICAgICAgIFwid2Vic29ja2V0XCIsXG4gICAgICAgIFwid2VpYnVsbFwiLFxuICAgICAgICBcIndnYm93XCIsXG4gICAgICAgIFwid2dib3dlZGJhclwiLFxuICAgICAgICBcIndnYnJhc3NcIixcbiAgICAgICAgXCJ3Z2NsYXJcIixcbiAgICAgICAgXCJ3Z2ZsdXRlXCIsXG4gICAgICAgIFwid2dwbHVja1wiLFxuICAgICAgICBcIndncGx1Y2syXCIsXG4gICAgICAgIFwid2d1aWRlMVwiLFxuICAgICAgICBcIndndWlkZTJcIixcbiAgICAgICAgXCJ3aWljb25uZWN0XCIsXG4gICAgICAgIFwid2lpZGF0YVwiLFxuICAgICAgICBcIndpaXJhbmdlXCIsXG4gICAgICAgIFwid2lpc2VuZFwiLFxuICAgICAgICBcIndpbmRvd1wiLFxuICAgICAgICBcIndyYXBcIixcbiAgICAgICAgXCJ3cml0ZXNjcmF0Y2hcIixcbiAgICAgICAgXCJ3dGVycmFpblwiLFxuICAgICAgICBcInd0ZXJyYWluMlwiLFxuICAgICAgICBcInhhZHNyXCIsXG4gICAgICAgIFwieGluXCIsXG4gICAgICAgIFwieG91dFwiLFxuICAgICAgICBcInh0cmF0aW1cIixcbiAgICAgICAgXCJ4eXNjYWxlXCIsXG4gICAgICAgIFwiemFjbFwiLFxuICAgICAgICBcInpha2luaXRcIixcbiAgICAgICAgXCJ6YW1vZFwiLFxuICAgICAgICBcInphclwiLFxuICAgICAgICBcInphcmdcIixcbiAgICAgICAgXCJ6YXdcIixcbiAgICAgICAgXCJ6YXdtXCIsXG4gICAgICAgIFwiemRmXzFwb2xlXCIsXG4gICAgICAgIFwiemRmXzFwb2xlX21vZGVcIixcbiAgICAgICAgXCJ6ZGZfMnBvbGVcIixcbiAgICAgICAgXCJ6ZGZfMnBvbGVfbW9kZVwiLFxuICAgICAgICBcInpkZl9sYWRkZXJcIixcbiAgICAgICAgXCJ6ZmlsdGVyMlwiLFxuICAgICAgICBcInppclwiLFxuICAgICAgICBcInppd1wiLFxuICAgICAgICBcInppd21cIixcbiAgICAgICAgXCJ6a2NsXCIsXG4gICAgICAgIFwiemttb2RcIixcbiAgICAgICAgXCJ6a3JcIixcbiAgICAgICAgXCJ6a3dcIixcbiAgICAgICAgXCJ6a3dtXCJcbiAgICBdO1xuICAgIHZhciBkZXByZWNhdGVkT3Bjb2RlcyA9IFtcbiAgICAgICAgXCJPU0NzZW5kQVwiLFxuICAgICAgICBcImFycmF5XCIsXG4gICAgICAgIFwiYmVhZHN5bnRcIixcbiAgICAgICAgXCJiZW9zY1wiLFxuICAgICAgICBcImJmb3JtZGVjXCIsXG4gICAgICAgIFwiYmZvcm1lbmNcIixcbiAgICAgICAgXCJidWNobGFcIixcbiAgICAgICAgXCJjb3B5MmZ0YWJcIixcbiAgICAgICAgXCJjb3B5MnR0YWJcIixcbiAgICAgICAgXCJnZXRyb3dsaW5cIixcbiAgICAgICAgXCJocnRmZXJcIixcbiAgICAgICAgXCJrdGFibGVzZWdcIixcbiAgICAgICAgXCJsZW50YWJcIixcbiAgICAgICAgXCJsdWFfZXhlY1wiLFxuICAgICAgICBcImx1YV9pYW9wY2FsbFwiLFxuICAgICAgICBcImx1YV9pYW9wY2FsbF9vZmZcIixcbiAgICAgICAgXCJsdWFfaWtvcGNhbGxcIixcbiAgICAgICAgXCJsdWFfaWtvcGNhbGxfb2ZmXCIsXG4gICAgICAgIFwibHVhX2lvcGNhbGxcIixcbiAgICAgICAgXCJsdWFfaW9wY2FsbF9vZmZcIixcbiAgICAgICAgXCJsdWFfb3BkZWZcIixcbiAgICAgICAgXCJtYXh0YWJcIixcbiAgICAgICAgXCJtaW50YWJcIixcbiAgICAgICAgXCJtcDNzY2FsX2NoZWNrXCIsXG4gICAgICAgIFwibXAzc2NhbF9sb2FkXCIsXG4gICAgICAgIFwibXAzc2NhbF9sb2FkMlwiLFxuICAgICAgICBcIm1wM3NjYWxfcGxheVwiLFxuICAgICAgICBcIm1wM3NjYWxfcGxheTJcIixcbiAgICAgICAgXCJwb3BcIixcbiAgICAgICAgXCJwb3BfZlwiLFxuICAgICAgICBcInB0YWJsZVwiLFxuICAgICAgICBcInB0YWJsZTNcIixcbiAgICAgICAgXCJwdGFibGVpXCIsXG4gICAgICAgIFwicHRhYmxlaXdcIixcbiAgICAgICAgXCJwdXNoXCIsXG4gICAgICAgIFwicHVzaF9mXCIsXG4gICAgICAgIFwicHZzZ2VuZHlcIixcbiAgICAgICAgXCJzY2FsZXRcIixcbiAgICAgICAgXCJzaWduYWxmbG93Z3JhcGhcIixcbiAgICAgICAgXCJzbmRsb2FkXCIsXG4gICAgICAgIFwic29ja3NlbmRfa1wiLFxuICAgICAgICBcInNvdW5kb3V0XCIsXG4gICAgICAgIFwic291bmRvdXRzXCIsXG4gICAgICAgIFwic3BlY2FkZG1cIixcbiAgICAgICAgXCJzcGVjZGlmZlwiLFxuICAgICAgICBcInNwZWNkaXNwXCIsXG4gICAgICAgIFwic3BlY2ZpbHRcIixcbiAgICAgICAgXCJzcGVjaGlzdFwiLFxuICAgICAgICBcInNwZWNwdHJrXCIsXG4gICAgICAgIFwic3BlY3NjYWxcIixcbiAgICAgICAgXCJzcGVjc3VtXCIsXG4gICAgICAgIFwic3BlY3RydW1cIixcbiAgICAgICAgXCJzdGFja1wiLFxuICAgICAgICBcInN1bVRhYmxlRmlsdGVyXCIsXG4gICAgICAgIFwic3VtdGFiXCIsXG4gICAgICAgIFwic3lzdGltZVwiLFxuICAgICAgICBcInRhYmdlblwiLFxuICAgICAgICBcInRhYmxlaXdcIixcbiAgICAgICAgXCJ0YWJtYXBcIixcbiAgICAgICAgXCJ0YWJtYXBfaVwiLFxuICAgICAgICBcInRhYnJvd2xpblwiLFxuICAgICAgICBcInRhYnNsaWNlXCIsXG4gICAgICAgIFwidGIwXCIsXG4gICAgICAgIFwidGIwX2luaXRcIixcbiAgICAgICAgXCJ0YjFcIixcbiAgICAgICAgXCJ0YjEwXCIsXG4gICAgICAgIFwidGIxMF9pbml0XCIsXG4gICAgICAgIFwidGIxMVwiLFxuICAgICAgICBcInRiMTFfaW5pdFwiLFxuICAgICAgICBcInRiMTJcIixcbiAgICAgICAgXCJ0YjEyX2luaXRcIixcbiAgICAgICAgXCJ0YjEzXCIsXG4gICAgICAgIFwidGIxM19pbml0XCIsXG4gICAgICAgIFwidGIxNFwiLFxuICAgICAgICBcInRiMTRfaW5pdFwiLFxuICAgICAgICBcInRiMTVcIixcbiAgICAgICAgXCJ0YjE1X2luaXRcIixcbiAgICAgICAgXCJ0YjFfaW5pdFwiLFxuICAgICAgICBcInRiMlwiLFxuICAgICAgICBcInRiMl9pbml0XCIsXG4gICAgICAgIFwidGIzXCIsXG4gICAgICAgIFwidGIzX2luaXRcIixcbiAgICAgICAgXCJ0YjRcIixcbiAgICAgICAgXCJ0YjRfaW5pdFwiLFxuICAgICAgICBcInRiNVwiLFxuICAgICAgICBcInRiNV9pbml0XCIsXG4gICAgICAgIFwidGI2XCIsXG4gICAgICAgIFwidGI2X2luaXRcIixcbiAgICAgICAgXCJ0YjdcIixcbiAgICAgICAgXCJ0YjdfaW5pdFwiLFxuICAgICAgICBcInRiOFwiLFxuICAgICAgICBcInRiOF9pbml0XCIsXG4gICAgICAgIFwidGI5XCIsXG4gICAgICAgIFwidGI5X2luaXRcIixcbiAgICAgICAgXCJ2YmFwMTZcIixcbiAgICAgICAgXCJ2YmFwMW1vdmVcIixcbiAgICAgICAgXCJ2YmFwNFwiLFxuICAgICAgICBcInZiYXA0bW92ZVwiLFxuICAgICAgICBcInZiYXA4XCIsXG4gICAgICAgIFwidmJhcDhtb3ZlXCIsXG4gICAgICAgIFwieHNjYW5tYXBcIixcbiAgICAgICAgXCJ4c2NhbnNcIixcbiAgICAgICAgXCJ4c2NhbnNtYXBcIixcbiAgICAgICAgXCJ4c2NhbnVcIixcbiAgICAgICAgXCJ4eWluXCJcbiAgICBdO1xuXG4gICAgb3Bjb2RlcyA9IGxhbmcuYXJyYXlUb01hcChvcGNvZGVzKTtcbiAgICBkZXByZWNhdGVkT3Bjb2RlcyA9IGxhbmcuYXJyYXlUb01hcChkZXByZWNhdGVkT3Bjb2Rlcyk7XG5cbiAgICB0aGlzLmxpbmVDb250aW51YXRpb25zID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQuY2hhcmFjdGVyLmVzY2FwZS5saW5lLWNvbnRpbnVhdGlvbi5jc291bmRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogL1xcXFwkL1xuICAgICAgICB9LCB0aGlzLnB1c2hSdWxlKHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5jaGFyYWN0ZXIuZXNjYXBlLmxpbmUtY29udGludWF0aW9uLmNzb3VuZFwiLFxuICAgICAgICAgICAgcmVnZXggOiAvXFxcXC8sXG4gICAgICAgICAgICBuZXh0ICA6IFwibGluZSBjb250aW51YXRpb25cIlxuICAgICAgICB9KVxuICAgIF07XG5cbiAgICB0aGlzLmNvbW1lbnRzLnB1c2godGhpcy5saW5lQ29udGludWF0aW9ucyk7XG5cbiAgICB0aGlzLnF1b3RlZFN0cmluZ0NvbnRlbnRzLnB1c2goXG4gICAgICAgIHRoaXMubGluZUNvbnRpbnVhdGlvbnMsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJpbnZhbGlkLmlsbGVnYWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogL1teXCJcXFxcXSokL1xuICAgICAgICB9XG4gICAgKTtcblxuICAgIHZhciBzdGFydCA9IHRoaXMuJHJ1bGVzLnN0YXJ0O1xuICAgIHN0YXJ0LnNwbGljZSgxLCAwLCB7XG4gICAgICAgIHRva2VuIDogW1widGV4dC5jc291bmRcIiwgXCJlbnRpdHkubmFtZS5sYWJlbC5jc291bmRcIiwgXCJlbnRpdHkucHVuY3R1YXRpb24ubGFiZWwuY3NvdW5kXCIsIFwidGV4dC5jc291bmRcIl0sXG4gICAgICAgIHJlZ2V4IDogL14oWyBcXHRdKikoXFx3KykoOikoWyBcXHRdK3wkKS9cbiAgICB9KTtcbiAgICBzdGFydC5wdXNoKFxuICAgICAgICB0aGlzLnB1c2hSdWxlKHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLmZ1bmN0aW9uLmNzb3VuZFwiLFxuICAgICAgICAgICAgcmVnZXggOiAvXFxiaW5zdHJcXGIvLFxuICAgICAgICAgICAgbmV4dCAgOiBcImluc3RydW1lbnQgbnVtYmVycyBhbmQgaWRlbnRpZmllcnNcIlxuICAgICAgICB9KSwgdGhpcy5wdXNoUnVsZSh7XG4gICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5mdW5jdGlvbi5jc291bmRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogL1xcYm9wY29kZVxcYi8sXG4gICAgICAgICAgICBuZXh0ICA6IFwiYWZ0ZXIgb3Bjb2RlIGtleXdvcmRcIlxuICAgICAgICB9KSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3RoZXIuY3NvdW5kXCIsXG4gICAgICAgICAgICByZWdleCA6IC9cXGJlbmQoPzppbnxvcClcXGIvXG4gICAgICAgIH0sXG5cbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW4gOiBcInZhcmlhYmxlLmxhbmd1YWdlLmNzb3VuZFwiLFxuICAgICAgICAgICAgcmVnZXggOiAvXFxiKD86MGRiZnN8QTR8ayg/OnJ8c21wcyl8bmNobmxzKD86X2kpP3xzcilcXGIvXG4gICAgICAgIH0sXG5cbiAgICAgICAgdGhpcy5udW1iZXJzLFxuXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yLmNzb3VuZFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwrPXwtPXxcXFxcKj18Lz18PDx8Pj58PD18Pj18PT18IT18JiZ8XFxcXHxcXFxcfHxbfsKsXXxbPSErXFxcXC0qL14lJnw8PiM/Ol1cIlxuICAgICAgICB9LFxuXG4gICAgICAgIHRoaXMucHVzaFJ1bGUoe1xuICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RyaW5nLmJlZ2luLmNzb3VuZFwiLFxuICAgICAgICAgICAgcmVnZXggOiAvXCIvLFxuICAgICAgICAgICAgbmV4dCAgOiBcInF1b3RlZCBzdHJpbmdcIlxuICAgICAgICB9KSwgdGhpcy5wdXNoUnVsZSh7XG4gICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5zdHJpbmcuYmVnaW4uY3NvdW5kXCIsXG4gICAgICAgICAgICByZWdleCA6IC97ey8sXG4gICAgICAgICAgICBuZXh0ICA6IFwiYnJhY2VkIHN0cmluZ1wiXG4gICAgICAgIH0pLFxuXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLmNvbnRyb2wuY3NvdW5kXCIsXG4gICAgICAgICAgICByZWdleCA6IC9cXGIoPzpkb3xlbHNlKD86aWYpP3xlbmQoPzppZnx1bnRpbCl8Zml8aSg/OmZ8dGhlbil8a3RoZW58b2R8cig/OmlyKT9ldHVybnx0aGVufHVudGlsfHdoaWxlKVxcYi9cbiAgICAgICAgfSxcblxuICAgICAgICB0aGlzLnB1c2hSdWxlKHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLmNvbnRyb2wuY3NvdW5kXCIsXG4gICAgICAgICAgICByZWdleCA6IC9cXGJbaWtdP2dvdG9cXGIvLFxuICAgICAgICAgICAgbmV4dCAgOiBcImdvdG8gYmVmb3JlIGxhYmVsXCJcbiAgICAgICAgfSksIHRoaXMucHVzaFJ1bGUoe1xuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQuY29udHJvbC5jc291bmRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogL1xcYig/OnIoPzplaW5pdHxpZ290byl8dGlnb3RvKVxcYi8sXG4gICAgICAgICAgICBuZXh0ICA6IFwiZ290byBiZWZvcmUgbGFiZWxcIlxuICAgICAgICB9KSwgdGhpcy5wdXNoUnVsZSh7XG4gICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5jb250cm9sLmNzb3VuZFwiLFxuICAgICAgICAgICAgcmVnZXggOiAvXFxiYyg/Omd8aW4/fGt8bms/KWdvdG9cXGIvLFxuICAgICAgICAgICAgbmV4dCAgOiBbXCJnb3RvIGJlZm9yZSBsYWJlbFwiLCBcImdvdG8gYmVmb3JlIGFyZ3VtZW50XCJdXG4gICAgICAgIH0pLCB0aGlzLnB1c2hSdWxlKHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLmNvbnRyb2wuY3NvdW5kXCIsXG4gICAgICAgICAgICByZWdleCA6IC9cXGJ0aW1vdXRcXGIvLFxuICAgICAgICAgICAgbmV4dCAgOiBbXCJnb3RvIGJlZm9yZSBsYWJlbFwiLCBcImdvdG8gYmVmb3JlIGFyZ3VtZW50XCIsIFwiZ290byBiZWZvcmUgYXJndW1lbnRcIl1cbiAgICAgICAgfSksIHRoaXMucHVzaFJ1bGUoe1xuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQuY29udHJvbC5jc291bmRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogL1xcYmxvb3BfW2dsXVtldF1cXGIvLFxuICAgICAgICAgICAgbmV4dCAgOiBbXCJnb3RvIGJlZm9yZSBsYWJlbFwiLCBcImdvdG8gYmVmb3JlIGFyZ3VtZW50XCIsIFwiZ290byBiZWZvcmUgYXJndW1lbnRcIiwgXCJnb3RvIGJlZm9yZSBhcmd1bWVudFwiXVxuICAgICAgICB9KSxcblxuICAgICAgICB0aGlzLnB1c2hSdWxlKHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uLmNzb3VuZFwiLFxuICAgICAgICAgICAgcmVnZXggOiAvXFxiKD86cmVhZHNjb3JlfHNjb3JlbGluZSg/Ol9pKT8pXFxiLyxcbiAgICAgICAgICAgIG5leHQgIDogXCJDc291bmQgc2NvcmUgb3Bjb2RlXCJcbiAgICAgICAgfSksIHRoaXMucHVzaFJ1bGUoe1xuICAgICAgICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb24uY3NvdW5kXCIsXG4gICAgICAgICAgICByZWdleCA6IC9cXGJweWw/cnVuW2l0XT9cXGIoPyEkKS8sXG4gICAgICAgICAgICBuZXh0ICA6IFwiUHl0aG9uIG9wY29kZVwiXG4gICAgICAgIH0pLCB0aGlzLnB1c2hSdWxlKHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uLmNzb3VuZFwiLFxuICAgICAgICAgICAgcmVnZXggOiAvXFxibHVhXyg/OmV4ZWN8b3BkZWYpXFxiKD8hJCkvLFxuICAgICAgICAgICAgbmV4dCAgOiBcIkx1YSBvcGNvZGVcIlxuICAgICAgICB9KSxcblxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3VwcG9ydC52YXJpYWJsZS5jc291bmRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogL1xcYnBcXGQrXFxiL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICByZWdleCA6IC9cXGIoW0EtWl9hLXpdXFx3KikoPzooOikoW0EtWmEtel0pKT9cXGIvLCBvbk1hdGNoOiBmdW5jdGlvbih2YWx1ZSwgY3VycmVudFN0YXRlLCBzdGFjaywgbGluZSkge1xuICAgICAgICAgICAgICAgIHZhciB0b2tlbnMgPSB2YWx1ZS5zcGxpdCh0aGlzLnNwbGl0UmVnZXgpO1xuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gdG9rZW5zWzFdO1xuICAgICAgICAgICAgICAgIHZhciB0eXBlO1xuICAgICAgICAgICAgICAgIGlmIChvcGNvZGVzLmhhc093blByb3BlcnR5KG5hbWUpKVxuICAgICAgICAgICAgICAgICAgICB0eXBlID0gXCJzdXBwb3J0LmZ1bmN0aW9uLmNzb3VuZFwiO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRlcHJlY2F0ZWRPcGNvZGVzLmhhc093blByb3BlcnR5KG5hbWUpKVxuICAgICAgICAgICAgICAgICAgICB0eXBlID0gXCJpbnZhbGlkLmRlcHJlY2F0ZWQuY3NvdW5kXCI7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRva2Vuc1syXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dHlwZTogdHlwZSwgdmFsdWU6IG5hbWV9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0eXBlOiBcInB1bmN0dWF0aW9uLnR5cGUtYW5ub3RhdGlvbi5jc291bmRcIiwgdmFsdWU6IHRva2Vuc1syXX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3R5cGU6IFwidHlwZS1hbm5vdGF0aW9uLnN0b3JhZ2UudHlwZS5jc291bmRcIiwgdmFsdWU6IHRva2Vuc1szXX1cbiAgICAgICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBcInRleHQuY3NvdW5kXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgdGhpcy4kcnVsZXNbXCJtYWNybyBwYXJhbWV0ZXIgdmFsdWUgbGlzdFwiXS5zcGxpY2UoMiwgMCwge1xuICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5zdHJpbmcuYmVnaW4uY3NvdW5kXCIsXG4gICAgICAgIHJlZ2V4IDogL3t7LyxcbiAgICAgICAgbmV4dCAgOiBcIm1hY3JvIHBhcmFtZXRlciB2YWx1ZSBicmFjZWQgc3RyaW5nXCJcbiAgICB9KTtcblxuICAgIHZhciBzY29yZUhpZ2hsaWdodFJ1bGVzID0gbmV3IENzb3VuZFNjb3JlSGlnaGxpZ2h0UnVsZXMoXCJjc291bmQtc2NvcmUtXCIpO1xuXG4gICAgdGhpcy5hZGRSdWxlcyh7XG4gICAgICAgIFwibWFjcm8gcGFyYW1ldGVyIHZhbHVlIGJyYWNlZCBzdHJpbmdcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5jaGFyYWN0ZXIuZXNjYXBlLmNzb3VuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcXFxbIycoKV0vXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImludmFsaWQuaWxsZWdhbC5jc291bmQuY3NvdW5kXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvWyMnKCldL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cmluZy5lbmQuY3NvdW5kXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvfX0vLFxuICAgICAgICAgICAgICAgIG5leHQgIDogXCJtYWNybyBwYXJhbWV0ZXIgdmFsdWUgbGlzdFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZy5icmFjZWQuY3NvdW5kXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcblxuICAgICAgICBcImluc3RydW1lbnQgbnVtYmVycyBhbmQgaWRlbnRpZmllcnNcIjogW1xuICAgICAgICAgICAgdGhpcy5jb21tZW50cyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiZW50aXR5Lm5hbWUuZnVuY3Rpb24uY3NvdW5kXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFxkK3xbQS1aX2Etel1cXHcqL1xuICAgICAgICAgICAgfSwgdGhpcy5wb3BSdWxlKHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiZW1wdHlcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC8kL1xuICAgICAgICAgICAgfSlcbiAgICAgICAgXSxcblxuICAgICAgICBcImFmdGVyIG9wY29kZSBrZXl3b3JkXCI6IFtcbiAgICAgICAgICAgIHRoaXMuY29tbWVudHMsXG4gICAgICAgICAgICB0aGlzLnBvcFJ1bGUoe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJlbXB0eVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLyQvXG4gICAgICAgICAgICB9KSwgdGhpcy5wb3BSdWxlKHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiZW50aXR5Lm5hbWUuZnVuY3Rpb24ub3Bjb2RlLmNzb3VuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1tBLVpfYS16XVxcdyovLFxuICAgICAgICAgICAgICAgIG5leHQgIDogXCJvcGNvZGUgdHlwZSBzaWduYXR1cmVzXCJcbiAgICAgICAgICAgIH0pXG4gICAgICAgIF0sXG4gICAgICAgIFwib3Bjb2RlIHR5cGUgc2lnbmF0dXJlc1wiOiBbXG4gICAgICAgICAgICB0aGlzLmNvbW1lbnRzLFxuICAgICAgICAgICAgdGhpcy5wb3BSdWxlKHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiZW1wdHlcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC8kL1xuICAgICAgICAgICAgfSksIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RvcmFnZS50eXBlLmNzb3VuZFwiLFxuICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9jc291bmQvY3NvdW5kL3NlYXJjaD9xPVhJREVOVCtwYXRoJTNBRW5naW5lK2ZpbGVuYW1lJTNBY3NvdW5kX29yYy5sZXhcbiAgICAgICAgICAgICAgICByZWdleCA6IC9cXGIoPzowfFthZmlqa0tvT3BQU3RWXFxbXFxdXSspL1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuXG4gICAgICAgIFwicXVvdGVkIHN0cmluZ1wiOiBbXG4gICAgICAgICAgICB0aGlzLnBvcFJ1bGUoe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cmluZy5lbmQuY3NvdW5kXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXCIvXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHRoaXMucXVvdGVkU3RyaW5nQ29udGVudHMsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZy5xdW90ZWQuY3NvdW5kXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJicmFjZWQgc3RyaW5nXCI6IFtcbiAgICAgICAgICAgIHRoaXMucG9wUnVsZSh7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RyaW5nLmVuZC5jc291bmRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC99fS9cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdGhpcy5icmFjZWRTdHJpbmdDb250ZW50cyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nLmJyYWNlZC5jc291bmRcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuXG4gICAgICAgIFwiZ290byBiZWZvcmUgYXJndW1lbnRcIjogW1xuICAgICAgICAgICAgdGhpcy5wb3BSdWxlKHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwidGV4dC5jc291bmRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC8sL1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBzdGFydFxuICAgICAgICBdLFxuICAgICAgICBcImdvdG8gYmVmb3JlIGxhYmVsXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwidGV4dC5jc291bmRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9cXHMrL1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoaXMuY29tbWVudHMsXG4gICAgICAgICAgICB0aGlzLnBvcFJ1bGUoe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJlbnRpdHkubmFtZS5sYWJlbC5jc291bmRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9cXHcrL1xuICAgICAgICAgICAgfSksIHRoaXMucG9wUnVsZSh7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImVtcHR5XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvKD8hXFx3KS9cbiAgICAgICAgICAgIH0pXG4gICAgICAgIF0sXG5cbiAgICAgICAgXCJDc291bmQgc2NvcmUgb3Bjb2RlXCI6IFtcbiAgICAgICAgICAgIHRoaXMuY29tbWVudHMsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RyaW5nLmJlZ2luLmNzb3VuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL3t7LyxcbiAgICAgICAgICAgICAgICBuZXh0ICA6IHNjb3JlSGlnaGxpZ2h0UnVsZXMuZW1iZWRkZWRSdWxlUHJlZml4ICsgXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB0aGlzLnBvcFJ1bGUoe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJlbXB0eVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLyQvXG4gICAgICAgICAgICB9KVxuICAgICAgICBdLFxuXG4gICAgICAgIFwiUHl0aG9uIG9wY29kZVwiOiBbXG4gICAgICAgICAgICB0aGlzLmNvbW1lbnRzLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cmluZy5iZWdpbi5jc291bmRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC97ey8sXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcInB5dGhvbi1zdGFydFwiXG4gICAgICAgICAgICB9LCB0aGlzLnBvcFJ1bGUoe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJlbXB0eVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLyQvXG4gICAgICAgICAgICB9KVxuICAgICAgICBdLFxuXG4gICAgICAgIFwiTHVhIG9wY29kZVwiOiBbXG4gICAgICAgICAgICB0aGlzLmNvbW1lbnRzLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cmluZy5iZWdpbi5jc291bmRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC97ey8sXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcImx1YS1zdGFydFwiXG4gICAgICAgICAgICB9LCB0aGlzLnBvcFJ1bGUoe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJlbXB0eVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLyQvXG4gICAgICAgICAgICB9KVxuICAgICAgICBdLFxuXG4gICAgICAgIFwibGluZSBjb250aW51YXRpb25cIjogW1xuICAgICAgICAgICAgdGhpcy5wb3BSdWxlKHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiZW1wdHlcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC8kL1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB0aGlzLnNlbWljb2xvbkNvbW1lbnRzLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJpbnZhbGlkLmlsbGVnYWwuY3NvdW5kXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFxTLiovXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9KTtcblxuICAgIHZhciBydWxlcyA9IFtcbiAgICAgICAgdGhpcy5wb3BSdWxlKHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cmluZy5lbmQuY3NvdW5kXCIsXG4gICAgICAgICAgICByZWdleCA6IC99fS9cbiAgICAgICAgfSlcbiAgICBdO1xuICAgIHRoaXMuZW1iZWRSdWxlcyhzY29yZUhpZ2hsaWdodFJ1bGVzLmdldFJ1bGVzKCksIHNjb3JlSGlnaGxpZ2h0UnVsZXMuZW1iZWRkZWRSdWxlUHJlZml4LCBydWxlcyk7XG4gICAgdGhpcy5lbWJlZFJ1bGVzKFB5dGhvbkhpZ2hsaWdodFJ1bGVzLCBcInB5dGhvbi1cIiwgcnVsZXMpO1xuICAgIHRoaXMuZW1iZWRSdWxlcyhMdWFIaWdobGlnaHRSdWxlcywgXCJsdWEtXCIsIHJ1bGVzKTtcblxuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbm9vcC5pbmhlcml0cyhDc291bmRPcmNoZXN0cmFIaWdobGlnaHRSdWxlcywgQ3NvdW5kUHJlcHJvY2Vzc29ySGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLkNzb3VuZE9yY2hlc3RyYUhpZ2hsaWdodFJ1bGVzID0gQ3NvdW5kT3JjaGVzdHJhSGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xuXG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgQ3NvdW5kUHJlcHJvY2Vzc29ySGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbihlbWJlZGRlZFJ1bGVQcmVmaXgpIHtcblxuICAgIHRoaXMuZW1iZWRkZWRSdWxlUHJlZml4ID0gZW1iZWRkZWRSdWxlUHJlZml4ID09PSB1bmRlZmluZWQgPyBcIlwiIDogZW1iZWRkZWRSdWxlUHJlZml4O1xuXG4gICAgdGhpcy5zZW1pY29sb25Db21tZW50cyA9IHtcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQubGluZS5zZW1pY29sb24uY3NvdW5kXCIsXG4gICAgICAgIHJlZ2V4IDogXCI7LiokXCJcbiAgICB9O1xuXG4gICAgdGhpcy5jb21tZW50cyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uY29tbWVudC5iZWdpbi5jc291bmRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIvXFxcXCpcIixcbiAgICAgICAgICAgIHB1c2ggIDogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uY29tbWVudC5lbmQuY3NvdW5kXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcKi9cIixcbiAgICAgICAgICAgICAgICAgICAgbmV4dCAgOiBcInBvcFwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwiY29tbWVudC5ibG9jay5jc291bmRcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQubGluZS5kb3VibGUtc2xhc2guY3NvdW5kXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiLy8uKiRcIlxuICAgICAgICB9LFxuICAgICAgICB0aGlzLnNlbWljb2xvbkNvbW1lbnRzXG4gICAgXTtcblxuICAgIHRoaXMubWFjcm9Vc2VzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFtcImVudGl0eS5uYW1lLmZ1bmN0aW9uLnByZXByb2Nlc3Nvci5jc291bmRcIiwgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLm1hY3JvLXBhcmFtZXRlci12YWx1ZS1saXN0LmJlZ2luLmNzb3VuZFwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogLyhcXCRbQS1aX2Etel1cXHcqXFwuPykoXFwoKS8sXG4gICAgICAgICAgICBuZXh0ICA6IFwibWFjcm8gcGFyYW1ldGVyIHZhbHVlIGxpc3RcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiZW50aXR5Lm5hbWUuZnVuY3Rpb24ucHJlcHJvY2Vzc29yLmNzb3VuZFwiLFxuICAgICAgICAgICAgcmVnZXggOiAvXFwkW0EtWl9hLXpdXFx3Kig/OlxcLnxcXGIpL1xuICAgICAgICB9XG4gICAgXTtcblxuICAgIHRoaXMubnVtYmVycyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWMuZmxvYXQuY3NvdW5kXCIsXG4gICAgICAgICAgICByZWdleCA6IC8oPzpcXGQrW0VlXVsrLV0/XFxkKyl8KD86XFxkK1xcLlxcZCp8XFxkKlxcLlxcZCspKD86W0VlXVsrLV0/XFxkKyk/L1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFtcInN0b3JhZ2UudHlwZS5udW1iZXIuY3NvdW5kXCIsIFwiY29uc3RhbnQubnVtZXJpYy5pbnRlZ2VyLmhleGFkZWNpbWFsLmNzb3VuZFwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogLygwW1h4XSkoWzAtOUEtRmEtZl0rKS9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWMuaW50ZWdlci5kZWNpbWFsLmNzb3VuZFwiLFxuICAgICAgICAgICAgcmVnZXggOiAvXFxkKy9cbiAgICAgICAgfVxuICAgIF07XG5cbiAgICB0aGlzLmJyYWNlZFN0cmluZ0NvbnRlbnRzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQuY2hhcmFjdGVyLmVzY2FwZS5jc291bmRcIixcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9jc291bmQvY3NvdW5kL3NlYXJjaD9xPXVucXVvdGVfc3RyaW5nK3BhdGglM0FFbmdpbmUrZmlsZW5hbWUlM0Fjc291bmRfb3JjX2NvbXBpbGUuY1xuICAgICAgICAgICAgcmVnZXggOiAvXFxcXCg/OltcXFxcYWJucnRcIl18WzAtN117MSwzfSkvXG4gICAgICAgIH0sXG4gICAgICAgIC8vIEZvcm1hdCBzcGVjaWZpZXJzIGFyZSBpbmNsdWRlZCBpbiBxdW90ZWQgYW5kIGJyYWNlZCBzdHJpbmdzLiBUaGlzXG4gICAgICAgIC8vIG1lYW5zIHRoYXQgZm9ybWF0IHNwZWNpZmllcnMgYXJlIGhpZ2hsaWdodGVkIGluIGFsbCBzdHJpbmdzLCBldmVuXG4gICAgICAgIC8vIHRob3VnaCBvbmx5XG4gICAgICAgIC8vICAgZnByaW50a3MgICAgICAgIGh0dHBzOi8vY3NvdW5kLmNvbS9kb2NzL21hbnVhbC9mcHJpbnRrcy5odG1sXG4gICAgICAgIC8vICAgZnByaW50cyAgICAgICAgIGh0dHBzOi8vY3NvdW5kLmNvbS9kb2NzL21hbnVhbC9mcHJpbnRzLmh0bWxcbiAgICAgICAgLy8gICBwcmludGYvcHJpbnRmX2kgaHR0cHM6Ly9jc291bmQuY29tL2RvY3MvbWFudWFsL3ByaW50Zi5odG1sXG4gICAgICAgIC8vICAgcHJpbnRrcyAgICAgICAgIGh0dHBzOi8vY3NvdW5kLmNvbS9kb2NzL21hbnVhbC9wcmludGtzLmh0bWxcbiAgICAgICAgLy8gICBwcmludHMgICAgICAgICAgaHR0cHM6Ly9jc291bmQuY29tL2RvY3MvbWFudWFsL3ByaW50cy5odG1sXG4gICAgICAgIC8vICAgc3ByaW50ZiAgICAgICAgIGh0dHBzOi8vY3NvdW5kLmNvbS9kb2NzL21hbnVhbC9zcHJpbnRmLmh0bWxcbiAgICAgICAgLy8gICBzcHJpbnRmayAgICAgICAgaHR0cHM6Ly9jc291bmQuY29tL2RvY3MvbWFudWFsL3NwcmludGZrLmh0bWxcbiAgICAgICAgLy8gd29yayB3aXRoIHN0cmluZ3MgdGhhdCBjb250YWluIGZvcm1hdCBzcGVjaWZpZXJzLiBJbiBhZGRpdGlvbiwgdGhlc2VcbiAgICAgICAgLy8gb3Bjb2Rlc+KAmSBoYW5kbGluZyBvZiBmb3JtYXQgc3BlY2lmaWVycyBpcyBpbmNvbnNpc3RlbnQ6XG4gICAgICAgIC8vICAgLSBmcHJpbnRrcywgZnByaW50cywgcHJpbnRrcywgYW5kIHByaW50cyBkbyBhY2NlcHQgJWEgYW5kICVBXG4gICAgICAgIC8vICAgICBzcGVjaWZpZXJzLCBidXQgY2Fu4oCZdCBhY2NlcHQgJXMgc3BlY2lmaWVycy5cbiAgICAgICAgLy8gICAtIHByaW50ZiwgcHJpbnRmX2ksIHNwcmludGYsIGFuZCBzcHJpbnRmayBkb27igJl0IGFjY2VwdCAlYSBhbmQgJUFcbiAgICAgICAgLy8gICAgIHNwZWNpZmllcnMsIGJ1dCBkbyBhY2NlcHQgJXMgc3BlY2lmaWVycy5cbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jc291bmQvY3NvdW5kL2lzc3Vlcy83NDcgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5jaGFyYWN0ZXIucGxhY2Vob2xkZXIuY3NvdW5kXCIsXG4gICAgICAgICAgICByZWdleCA6IC8lWyMwXFwtICtdKlxcZCooPzpcXC5cXGQrKT9bZGl1b3hYZkZlRWdHYUFjc10vXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5jaGFyYWN0ZXIuZXNjYXBlLmNzb3VuZFwiLFxuICAgICAgICAgICAgcmVnZXggOiAvJSUvXG4gICAgICAgIH1cbiAgICBdO1xuXG4gICAgdGhpcy5xdW90ZWRTdHJpbmdDb250ZW50cyA9IFtcbiAgICAgICAgdGhpcy5tYWNyb1VzZXMsXG4gICAgICAgIHRoaXMuYnJhY2VkU3RyaW5nQ29udGVudHNcbiAgICBdO1xuXG4gICAgdmFyIHN0YXJ0ID0gW1xuICAgICAgICB0aGlzLmNvbW1lbnRzLFxuXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLnByZXByb2Nlc3Nvci5jc291bmRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogLyMoPzplKD86bmQoPzppZik/fGxzZSlcXGJ8IyMpfEBAP1sgXFx0XSpcXGQrL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5wcmVwcm9jZXNzb3IuY3NvdW5kXCIsXG4gICAgICAgICAgICByZWdleCA6IC8jaW5jbHVkZS8sXG4gICAgICAgICAgICBwdXNoICA6IFtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1lbnRzLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5jc291bmRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiAvKFteIFxcdF0pKD86Lio/XFwxKS8sXG4gICAgICAgICAgICAgICAgICAgIG5leHQgIDogXCJwb3BcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQucHJlcHJvY2Vzc29yLmNzb3VuZFwiLFxuICAgICAgICAgICAgcmVnZXggOiAvI2luY2x1ZGVzdHIvLFxuICAgICAgICAgICAgcHVzaCAgOiBbXG4gICAgICAgICAgICAgICAgdGhpcy5jb21tZW50cyxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuY3NvdW5kXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogLyhbXiBcXHRdKSg/Oi4qP1xcMSkvLFxuICAgICAgICAgICAgICAgICAgICBuZXh0ICA6IFwicG9wXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLnByZXByb2Nlc3Nvci5jc291bmRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogLyNbIFxcdF0qZGVmaW5lLyxcbiAgICAgICAgICAgIG5leHQgIDogXCJkZWZpbmUgZGlyZWN0aXZlXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQucHJlcHJvY2Vzc29yLmNzb3VuZFwiLFxuICAgICAgICAgICAgcmVnZXggOiAvIyg/Omlmbj9kZWZ8dW5kZWYpXFxiLyxcbiAgICAgICAgICAgIG5leHQgIDogXCJtYWNybyBkaXJlY3RpdmVcIlxuICAgICAgICB9LFxuXG4gICAgICAgIHRoaXMubWFjcm9Vc2VzXG4gICAgXTtcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCI6IHN0YXJ0LFxuXG4gICAgICAgIFwiZGVmaW5lIGRpcmVjdGl2ZVwiOiBbXG4gICAgICAgICAgICB0aGlzLmNvbW1lbnRzLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJlbnRpdHkubmFtZS5mdW5jdGlvbi5wcmVwcm9jZXNzb3IuY3NvdW5kXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvW0EtWl9hLXpdXFx3Ki9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5tYWNyby1wYXJhbWV0ZXItbmFtZS1saXN0LmJlZ2luLmNzb3VuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcKC8sXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcIm1hY3JvIHBhcmFtZXRlciBuYW1lIGxpc3RcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLm1hY3JvLmJlZ2luLmNzb3VuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLyMvLFxuICAgICAgICAgICAgICAgIG5leHQgIDogXCJtYWNybyBib2R5XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJtYWNybyBwYXJhbWV0ZXIgbmFtZSBsaXN0XCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwidmFyaWFibGUucGFyYW1ldGVyLnByZXByb2Nlc3Nvci5jc291bmRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9bQS1aX2Etel1cXHcqL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLm1hY3JvLXBhcmFtZXRlci1uYW1lLWxpc3QuZW5kLmNzb3VuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcKS8sXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcImRlZmluZSBkaXJlY3RpdmVcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcIm1hY3JvIGJvZHlcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5jaGFyYWN0ZXIuZXNjYXBlLmNzb3VuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcXFwjL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLm1hY3JvLmVuZC5jc291bmRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC8jLyxcbiAgICAgICAgICAgICAgICBuZXh0ICA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0YXJ0XG4gICAgICAgIF0sXG5cbiAgICAgICAgXCJtYWNybyBkaXJlY3RpdmVcIjogW1xuICAgICAgICAgICAgdGhpcy5jb21tZW50cyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiZW50aXR5Lm5hbWUuZnVuY3Rpb24ucHJlcHJvY2Vzc29yLmNzb3VuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1tBLVpfYS16XVxcdyovLFxuICAgICAgICAgICAgICAgIG5leHQgIDogXCJzdGFydFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG5cbiAgICAgICAgXCJtYWNybyBwYXJhbWV0ZXIgdmFsdWUgbGlzdFwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24ubWFjcm8tcGFyYW1ldGVyLXZhbHVlLWxpc3QuZW5kLmNzb3VuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcKS8sXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5zdHJpbmcuYmVnaW4uY3NvdW5kXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXCIvLFxuICAgICAgICAgICAgICAgIG5leHQgIDogXCJtYWNybyBwYXJhbWV0ZXIgdmFsdWUgcXVvdGVkIHN0cmluZ1wiXG4gICAgICAgICAgICB9LCB0aGlzLnB1c2hSdWxlKHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24ubWFjcm8tcGFyYW1ldGVyLXZhbHVlLXBhcmVudGhldGljYWwuYmVnaW4uY3NvdW5kXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFwoLyxcbiAgICAgICAgICAgICAgICBuZXh0ICA6IFwibWFjcm8gcGFyYW1ldGVyIHZhbHVlIHBhcmVudGhldGljYWxcIlxuICAgICAgICAgICAgfSksIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24ubWFjcm8tcGFyYW1ldGVyLXZhbHVlLXNlcGFyYXRvci5jc291bmRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiWyMnXVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwibWFjcm8gcGFyYW1ldGVyIHZhbHVlIHF1b3RlZCBzdHJpbmdcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5jaGFyYWN0ZXIuZXNjYXBlLmNzb3VuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcXFxbIycoKV0vXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImludmFsaWQuaWxsZWdhbC5jc291bmRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9bIycoKV0vXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RyaW5nLmVuZC5jc291bmRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9cIi8sXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcIm1hY3JvIHBhcmFtZXRlciB2YWx1ZSBsaXN0XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aGlzLnF1b3RlZFN0cmluZ0NvbnRlbnRzLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmcucXVvdGVkLmNzb3VuZFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwibWFjcm8gcGFyYW1ldGVyIHZhbHVlIHBhcmVudGhldGljYWxcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5jaGFyYWN0ZXIuZXNjYXBlLmNzb3VuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcXFxcXCkvXG4gICAgICAgICAgICB9LCB0aGlzLnBvcFJ1bGUoe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5tYWNyby1wYXJhbWV0ZXItdmFsdWUtcGFyZW50aGV0aWNhbC5lbmQuY3NvdW5kXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFwpL1xuICAgICAgICAgICAgfSksIHRoaXMucHVzaFJ1bGUoe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5tYWNyby1wYXJhbWV0ZXItdmFsdWUtcGFyZW50aGV0aWNhbC5iZWdpbi5jc291bmRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9cXCgvLFxuICAgICAgICAgICAgICAgIG5leHQgIDogXCJtYWNybyBwYXJhbWV0ZXIgdmFsdWUgcGFyZW50aGV0aWNhbFwiXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHN0YXJ0XG4gICAgICAgIF1cbiAgICB9O1xufTtcblxub29wLmluaGVyaXRzKENzb3VuZFByZXByb2Nlc3NvckhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLnB1c2hSdWxlID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBhcmFtcy5uZXh0KSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJhbXMubmV4dC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHBhcmFtcy5uZXh0W2ldID0gdGhpcy5lbWJlZGRlZFJ1bGVQcmVmaXggKyBwYXJhbXMubmV4dFtpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZWdleCA6IHBhcmFtcy5yZWdleCwgb25NYXRjaDogZnVuY3Rpb24odmFsdWUsIGN1cnJlbnRTdGF0ZSwgc3RhY2ssIGxpbmUpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhY2subGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgICAgICAgICBzdGFjay5wdXNoKGN1cnJlbnRTdGF0ZSk7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGFyYW1zLm5leHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFyYW1zLm5leHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnB1c2gocGFyYW1zLm5leHRbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhY2sucHVzaChwYXJhbXMubmV4dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbXMudG9rZW47XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnZXQgbmV4dCgpIHsgcmV0dXJuIEFycmF5LmlzQXJyYXkocGFyYW1zLm5leHQpID8gcGFyYW1zLm5leHRbcGFyYW1zLm5leHQubGVuZ3RoIC0gMV0gOiBwYXJhbXMubmV4dDsgfSxcbiAgICAgICAgICAgIHNldCBuZXh0KG5leHQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocGFyYW1zLm5leHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy5uZXh0ID0gbmV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnZXQgdG9rZW4oKSB7IHJldHVybiBwYXJhbXMudG9rZW47IH1cbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgdGhpcy5wb3BSdWxlID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgICAgIGlmIChwYXJhbXMubmV4dCkge1xuICAgICAgICAgICAgcGFyYW1zLm5leHQgPSB0aGlzLmVtYmVkZGVkUnVsZVByZWZpeCArIHBhcmFtcy5uZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlZ2V4IDogcGFyYW1zLnJlZ2V4LCBvbk1hdGNoOiBmdW5jdGlvbih2YWx1ZSwgY3VycmVudFN0YXRlLCBzdGFjaywgbGluZSkge1xuICAgICAgICAgICAgICAgIHN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICBzdGFjay5wdXNoKHBhcmFtcy5uZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gc3RhY2subGVuZ3RoID4gMSA/IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdIDogc3RhY2sucG9wKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbXMudG9rZW47XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcblxufSkuY2FsbChDc291bmRQcmVwcm9jZXNzb3JIaWdobGlnaHRSdWxlcy5wcm90b3R5cGUpO1xuXG5leHBvcnRzLkNzb3VuZFByZXByb2Nlc3NvckhpZ2hsaWdodFJ1bGVzID0gQ3NvdW5kUHJlcHJvY2Vzc29ySGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xuXG52YXIgQ3NvdW5kUHJlcHJvY2Vzc29ySGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9jc291bmRfcHJlcHJvY2Vzc29yX2hpZ2hsaWdodF9ydWxlc1wiKS5Dc291bmRQcmVwcm9jZXNzb3JIaWdobGlnaHRSdWxlcztcblxudmFyIENzb3VuZFNjb3JlSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbihlbWJlZGRlZFJ1bGVQcmVmaXgpIHtcblxuICAgIENzb3VuZFByZXByb2Nlc3NvckhpZ2hsaWdodFJ1bGVzLmNhbGwodGhpcywgZW1iZWRkZWRSdWxlUHJlZml4KTtcblxuICAgIHRoaXMucXVvdGVkU3RyaW5nQ29udGVudHMucHVzaCh7XG4gICAgICAgIHRva2VuIDogXCJpbnZhbGlkLmlsbGVnYWwuY3NvdW5kLXNjb3JlXCIsXG4gICAgICAgIHJlZ2V4IDogL1teXCJdKiQvXG4gICAgfSk7XG5cbiAgICB2YXIgc3RhcnQgPSB0aGlzLiRydWxlcy5zdGFydDtcbiAgICBzdGFydC5wdXNoKFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5jb250cm9sLmNzb3VuZC1zY29yZVwiLFxuICAgICAgICAgICAgcmVnZXggOiAvW2FCYkNkZWZpcXN0dnh5XS9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgLy8gdyBzdGF0ZW1lbnRzIGFyZSBnZW5lcmF0ZWQgaW50ZXJuYWxseSBhbmQgc2hvdWxkIG5vdCBiZSB1c2VkOyBzZWVcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9jc291bmQvY3NvdW5kL2lzc3Vlcy83NTAuXG4gICAgICAgICAgICB0b2tlbiA6IFwiaW52YWxpZC5pbGxlZ2FsLmNzb3VuZC1zY29yZVwiLFxuICAgICAgICAgICAgcmVnZXggOiAvdy9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgLy8geiBpcyBub3QgYSBzdGF0ZW1lbnQsIGJ1dCByYXRoZXIgYSBjb25zdGFudCBlcXVhbCB0b1xuICAgICAgICAgICAgLy8gODAwLDAwMCwwMDAsMDAwLiA4MDAgYmlsbGlvbiBzZWNvbmRzIGlzIGFib3V0IDI1LDM2Ny44IHllYXJzLiBTZWVcbiAgICAgICAgICAgIC8vIGFsc28gaHR0cHM6Ly9jc291bmQuZ2l0aHViLmlvL2RvY3MvbWFudWFsL1Njb3JlVG9wLmh0bWwgYW5kXG4gICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vY3NvdW5kL2Nzb3VuZC9zZWFyY2g/cT1zdG9mK3BhdGglM0FFbmdpbmUrZmlsZW5hbWUlM0FzcmVhZC5jLlxuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWMubGFuZ3VhZ2UuY3NvdW5kLXNjb3JlXCIsXG4gICAgICAgICAgICByZWdleCA6IC96L1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFtcImtleXdvcmQuY29udHJvbC5jc291bmQtc2NvcmVcIiwgXCJjb25zdGFudC5udW1lcmljLmludGVnZXIuZGVjaW1hbC5jc291bmQtc2NvcmVcIl0sXG4gICAgICAgICAgICByZWdleCA6IC8oW25OcFBdW3BQXSkoXFxkKykvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm90aGVyLmNzb3VuZC1zY29yZVwiLFxuICAgICAgICAgICAgcmVnZXggOiAvW21uXS8sXG4gICAgICAgICAgICBwdXNoICA6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJlbXB0eVwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IC8kLyxcbiAgICAgICAgICAgICAgICAgICAgbmV4dCAgOiBcInBvcFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1lbnRzLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcImVudGl0eS5uYW1lLmxhYmVsLmNzb3VuZC1zY29yZVwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IC9bQS1aX2Etel1cXHcqL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQucHJlcHJvY2Vzc29yLmNzb3VuZC1zY29yZVwiLFxuICAgICAgICAgICAgcmVnZXggOiAvclxcYi8sXG4gICAgICAgICAgICBuZXh0ICA6IFwicmVwZWF0IHNlY3Rpb25cIlxuICAgICAgICB9LFxuXG4gICAgICAgIHRoaXMubnVtYmVycyxcblxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvci5jc291bmQtc2NvcmVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbIStcXFxcLSovXiUmfDw+I34uXVwiXG4gICAgICAgIH0sXG5cbiAgICAgICAgdGhpcy5wdXNoUnVsZSh7XG4gICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5zdHJpbmcuYmVnaW4uY3NvdW5kLXNjb3JlXCIsXG4gICAgICAgICAgICByZWdleCA6IC9cIi8sXG4gICAgICAgICAgICBuZXh0ICA6IFwicXVvdGVkIHN0cmluZ1wiXG4gICAgICAgIH0pLFxuXG4gICAgICAgIHRoaXMucHVzaFJ1bGUoe1xuICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLmJyYWNlZC1sb29wLmJlZ2luLmNzb3VuZC1zY29yZVwiLFxuICAgICAgICAgICAgcmVnZXggOiAvey8sXG4gICAgICAgICAgICBuZXh0ICA6IFwibG9vcCBhZnRlciBsZWZ0IGJyYWNlXCJcbiAgICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5hZGRSdWxlcyh7XG4gICAgICAgIFwicmVwZWF0IHNlY3Rpb25cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJlbXB0eVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLyQvLFxuICAgICAgICAgICAgICAgIG5leHQgIDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGhpcy5jb21tZW50cyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpYy5pbnRlZ2VyLmRlY2ltYWwuY3NvdW5kLXNjb3JlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFxkKy8sXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcInJlcGVhdCBzZWN0aW9uIGJlZm9yZSBsYWJlbFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwicmVwZWF0IHNlY3Rpb24gYmVmb3JlIGxhYmVsXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiZW1wdHlcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC8kLyxcbiAgICAgICAgICAgICAgICBuZXh0ICA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoaXMuY29tbWVudHMsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImVudGl0eS5uYW1lLmxhYmVsLmNzb3VuZC1zY29yZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1tBLVpfYS16XVxcdyovLFxuICAgICAgICAgICAgICAgIG5leHQgIDogXCJzdGFydFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG5cbiAgICAgICAgXCJxdW90ZWQgc3RyaW5nXCI6IFtcbiAgICAgICAgICAgIHRoaXMucG9wUnVsZSh7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RyaW5nLmVuZC5jc291bmQtc2NvcmVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9cIi9cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdGhpcy5xdW90ZWRTdHJpbmdDb250ZW50cyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nLnF1b3RlZC5jc291bmQtc2NvcmVcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuXG4gICAgICAgIFwibG9vcCBhZnRlciBsZWZ0IGJyYWNlXCI6IFtcbiAgICAgICAgICAgIHRoaXMucG9wUnVsZSh7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWMuaW50ZWdlci5kZWNpbWFsLmNzb3VuZC1zY29yZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcZCsvLFxuICAgICAgICAgICAgICAgIG5leHQgIDogXCJsb29wIGFmdGVyIHJlcGVhdCBjb3VudFwiXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHRoaXMuY29tbWVudHMsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImludmFsaWQuaWxsZWdhbC5jc291bmRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9cXFMuKi9cbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJsb29wIGFmdGVyIHJlcGVhdCBjb3VudFwiOiBbXG4gICAgICAgICAgICB0aGlzLnBvcFJ1bGUoe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJlbnRpdHkubmFtZS5mdW5jdGlvbi5wcmVwcm9jZXNzb3IuY3NvdW5kLXNjb3JlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvW0EtWl9hLXpdXFx3KlxcYi8sXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcImxvb3AgYWZ0ZXIgbWFjcm8gbmFtZVwiXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHRoaXMuY29tbWVudHMsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImludmFsaWQuaWxsZWdhbC5jc291bmRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9cXFMuKi9cbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJsb29wIGFmdGVyIG1hY3JvIG5hbWVcIjogW1xuICAgICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgICB0aGlzLnBvcFJ1bGUoe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5icmFjZWQtbG9vcC5lbmQuY3NvdW5kLXNjb3JlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvfS9cbiAgICAgICAgICAgIH0pXG4gICAgICAgIF1cbiAgICB9KTtcblxuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbm9vcC5pbmhlcml0cyhDc291bmRTY29yZUhpZ2hsaWdodFJ1bGVzLCBDc291bmRQcmVwcm9jZXNzb3JIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuQ3NvdW5kU2NvcmVIaWdobGlnaHRSdWxlcyA9IENzb3VuZFNjb3JlSGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIEx1YUhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIga2V5d29yZHMgPSAoXG4gICAgICAgIFwiYnJlYWt8ZG98ZWxzZXxlbHNlaWZ8ZW5kfGZvcnxmdW5jdGlvbnxpZnxpbnxsb2NhbHxyZXBlYXR8XCIrXG4gICAgICAgICBcInJldHVybnx0aGVufHVudGlsfHdoaWxlfG9yfGFuZHxub3RcIlxuICAgICk7XG5cbiAgICB2YXIgYnVpbHRpbkNvbnN0YW50cyA9IChcInRydWV8ZmFsc2V8bmlsfF9HfF9WRVJTSU9OXCIpO1xuXG4gICAgdmFyIGZ1bmN0aW9ucyA9IChcbiAgICAgIC8vIGJ1aWx0aW5GdW5jdGlvbnNcbiAgICAgICAgXCJzdHJpbmd8eHBjYWxsfHBhY2thZ2V8dG9zdHJpbmd8cHJpbnR8b3N8dW5wYWNrfHJlcXVpcmV8XCIrXG4gICAgICAgIFwiZ2V0ZmVudnxzZXRtZXRhdGFibGV8bmV4dHxhc3NlcnR8dG9udW1iZXJ8aW98cmF3ZXF1YWx8XCIrXG4gICAgICAgIFwiY29sbGVjdGdhcmJhZ2V8Z2V0bWV0YXRhYmxlfG1vZHVsZXxyYXdzZXR8bWF0aHxkZWJ1Z3xcIitcbiAgICAgICAgXCJwY2FsbHx0YWJsZXxuZXdwcm94eXx0eXBlfGNvcm91dGluZXxfR3xzZWxlY3R8Z2NpbmZvfFwiK1xuICAgICAgICBcInBhaXJzfHJhd2dldHxsb2Fkc3RyaW5nfGlwYWlyc3xfVkVSU0lPTnxkb2ZpbGV8c2V0ZmVudnxcIitcbiAgICAgICAgXCJsb2FkfGVycm9yfGxvYWRmaWxlfFwiK1xuXG4gICAgICAgIFwic3VifHVwcGVyfGxlbnxnZmluZHxyZXB8ZmluZHxtYXRjaHxjaGFyfGR1bXB8Z21hdGNofFwiK1xuICAgICAgICBcInJldmVyc2V8Ynl0ZXxmb3JtYXR8Z3N1Ynxsb3dlcnxwcmVsb2FkfGxvYWRsaWJ8bG9hZGVkfFwiK1xuICAgICAgICBcImxvYWRlcnN8Y3BhdGh8Y29uZmlnfHBhdGh8c2VlYWxsfGV4aXR8c2V0bG9jYWxlfGRhdGV8XCIrXG4gICAgICAgIFwiZ2V0ZW52fGRpZmZ0aW1lfHJlbW92ZXx0aW1lfGNsb2NrfHRtcG5hbWV8cmVuYW1lfGV4ZWN1dGV8XCIrXG4gICAgICAgIFwibGluZXN8d3JpdGV8Y2xvc2V8Zmx1c2h8b3BlbnxvdXRwdXR8dHlwZXxyZWFkfHN0ZGVycnxcIitcbiAgICAgICAgXCJzdGRpbnxpbnB1dHxzdGRvdXR8cG9wZW58dG1wZmlsZXxsb2d8bWF4fGFjb3N8aHVnZXxcIitcbiAgICAgICAgXCJsZGV4cHxwaXxjb3N8dGFuaHxwb3d8ZGVnfHRhbnxjb3NofHNpbmh8cmFuZG9tfHJhbmRvbXNlZWR8XCIrXG4gICAgICAgIFwiZnJleHB8Y2VpbHxmbG9vcnxyYWR8YWJzfHNxcnR8bW9kZnxhc2lufG1pbnxtb2R8Zm1vZHxsb2cxMHxcIitcbiAgICAgICAgXCJhdGFuMnxleHB8c2lufGF0YW58Z2V0dXB2YWx1ZXxkZWJ1Z3xzZXRob29rfGdldG1ldGF0YWJsZXxcIitcbiAgICAgICAgXCJnZXRob29rfHNldG1ldGF0YWJsZXxzZXRsb2NhbHx0cmFjZWJhY2t8c2V0ZmVudnxnZXRpbmZvfFwiK1xuICAgICAgICBcInNldHVwdmFsdWV8Z2V0bG9jYWx8Z2V0cmVnaXN0cnl8Z2V0ZmVudnxzZXRufGluc2VydHxnZXRufFwiK1xuICAgICAgICBcImZvcmVhY2hpfG1heG58Zm9yZWFjaHxjb25jYXR8c29ydHxyZW1vdmV8cmVzdW1lfHlpZWxkfFwiK1xuICAgICAgICBcInN0YXR1c3x3cmFwfGNyZWF0ZXxydW5uaW5nfFwiK1xuICAgICAgLy8gbWV0YXRhYmxlTWV0aG9kc1xuICAgICAgICBcIl9fYWRkfF9fc3VifF9fbW9kfF9fdW5tfF9fY29uY2F0fF9fbHR8X19pbmRleHxfX2NhbGx8X19nY3xfX21ldGF0YWJsZXxcIitcbiAgICAgICAgIFwiX19tdWx8X19kaXZ8X19wb3d8X19sZW58X19lcXxfX2xlfF9fbmV3aW5kZXh8X190b3N0cmluZ3xfX21vZGV8X190b251bWJlclwiXG4gICAgKTtcblxuICAgIHZhciBzdGRMaWJhcmllcyA9IChcInN0cmluZ3xwYWNrYWdlfG9zfGlvfG1hdGh8ZGVidWd8dGFibGV8Y29yb3V0aW5lXCIpO1xuXG4gICAgdmFyIGRlcHJlY2F0ZWRJbjUxNTIgPSAoXCJzZXRufGZvcmVhY2h8Zm9yZWFjaGl8Z2NpbmZvfGxvZzEwfG1heG5cIik7XG5cbiAgICB2YXIga2V5d29yZE1hcHBlciA9IHRoaXMuY3JlYXRlS2V5d29yZE1hcHBlcih7XG4gICAgICAgIFwia2V5d29yZFwiOiBrZXl3b3JkcyxcbiAgICAgICAgXCJzdXBwb3J0LmZ1bmN0aW9uXCI6IGZ1bmN0aW9ucyxcbiAgICAgICAgXCJrZXl3b3JkLmRlcHJlY2F0ZWRcIjogZGVwcmVjYXRlZEluNTE1MixcbiAgICAgICAgXCJjb25zdGFudC5saWJyYXJ5XCI6IHN0ZExpYmFyaWVzLFxuICAgICAgICBcImNvbnN0YW50Lmxhbmd1YWdlXCI6IGJ1aWx0aW5Db25zdGFudHMsXG4gICAgICAgIFwidmFyaWFibGUubGFuZ3VhZ2VcIjogXCJzZWxmXCJcbiAgICB9LCBcImlkZW50aWZpZXJcIik7XG5cbiAgICB2YXIgZGVjaW1hbEludGVnZXIgPSBcIig/Oig/OlsxLTldXFxcXGQqKXwoPzowKSlcIjtcbiAgICB2YXIgaGV4SW50ZWdlciA9IFwiKD86MFt4WF1bXFxcXGRBLUZhLWZdKylcIjtcbiAgICB2YXIgaW50ZWdlciA9IFwiKD86XCIgKyBkZWNpbWFsSW50ZWdlciArIFwifFwiICsgaGV4SW50ZWdlciArIFwiKVwiO1xuXG4gICAgdmFyIGZyYWN0aW9uID0gXCIoPzpcXFxcLlxcXFxkKylcIjtcbiAgICB2YXIgaW50UGFydCA9IFwiKD86XFxcXGQrKVwiO1xuICAgIHZhciBwb2ludEZsb2F0ID0gXCIoPzooPzpcIiArIGludFBhcnQgKyBcIj9cIiArIGZyYWN0aW9uICsgXCIpfCg/OlwiICsgaW50UGFydCArIFwiXFxcXC4pKVwiO1xuICAgIHZhciBmbG9hdE51bWJlciA9IFwiKD86XCIgKyBwb2ludEZsb2F0ICsgXCIpXCI7XG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogW3tcbiAgICAgICAgICAgIHN0YXRlTmFtZTogXCJicmFja2V0ZWRDb21tZW50XCIsXG4gICAgICAgICAgICBvbk1hdGNoIDogZnVuY3Rpb24odmFsdWUsIGN1cnJlbnRTdGF0ZSwgc3RhY2spe1xuICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQodGhpcy5uZXh0LCB2YWx1ZS5sZW5ndGggLSAyLCBjdXJyZW50U3RhdGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBcImNvbW1lbnRcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWdleCA6IC9cXC1cXC1cXFs9KlxcWy8sXG4gICAgICAgICAgICBuZXh0ICA6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG9uTWF0Y2ggOiBmdW5jdGlvbih2YWx1ZSwgY3VycmVudFN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PSBzdGFja1sxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiY29tbWVudFwiO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IC9cXF09KlxcXS8sXG4gICAgICAgICAgICAgICAgICAgIG5leHQgIDogXCJzdGFydFwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcblxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwtXFxcXC0uKiRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzdGF0ZU5hbWU6IFwiYnJhY2tldGVkU3RyaW5nXCIsXG4gICAgICAgICAgICBvbk1hdGNoIDogZnVuY3Rpb24odmFsdWUsIGN1cnJlbnRTdGF0ZSwgc3RhY2spe1xuICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQodGhpcy5uZXh0LCB2YWx1ZS5sZW5ndGgsIGN1cnJlbnRTdGF0ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic3RyaW5nLnN0YXJ0XCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVnZXggOiAvXFxbPSpcXFsvLFxuICAgICAgICAgICAgbmV4dCAgOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBvbk1hdGNoIDogZnVuY3Rpb24odmFsdWUsIGN1cnJlbnRTdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT0gc3RhY2tbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN0cmluZy5lbmRcIjtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcXT0qXFxdLyxcbiAgICAgICAgICAgICAgICAgICAgbmV4dCAgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgICAgICAgICAgIC8vIFwiIHN0cmluZ1xuICAgICAgICAgICAgcmVnZXggOiAnXCIoPzpbXlxcXFxcXFxcXXxcXFxcXFxcXC4pKj9cIidcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAgICAgICAgICAgLy8gJyBzdHJpbmdcbiAgICAgICAgICAgIHJlZ2V4IDogXCInKD86W15cXFxcXFxcXF18XFxcXFxcXFwuKSo/J1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGZsb2F0XG4gICAgICAgICAgICByZWdleCA6IGZsb2F0TnVtYmVyXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGludGVnZXJcbiAgICAgICAgICAgIHJlZ2V4IDogaW50ZWdlciArIFwiXFxcXGJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IGtleXdvcmRNYXBwZXIsXG4gICAgICAgICAgICByZWdleCA6IFwiW2EtekEtWl8kXVthLXpBLVowLTlfJF0qXFxcXGJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwrfFxcXFwtfFxcXFwqfFxcXFwvfCV8XFxcXCN8XFxcXF58fnw8fD58PD18PT58PT18fj18PXxcXFxcOnxcXFxcLlxcXFwuXFxcXC58XFxcXC5cXFxcLlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXFtcXFxcKFxcXFx7XVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXF1cXFxcKVxcXFx9XVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrfFxcXFx3K1wiXG4gICAgICAgIH0gXVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxub29wLmluaGVyaXRzKEx1YUhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLkx1YUhpZ2hsaWdodFJ1bGVzID0gTHVhSGlnaGxpZ2h0UnVsZXM7XG4iLCIvKlxuICogVE9ETzogcHl0aG9uIGRlbGltaXRlcnNcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIFB5dGhvbkhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIga2V5d29yZHMgPSAoXG4gICAgICAgIFwiYW5kfGFzfGFzc2VydHxicmVha3xjbGFzc3xjb250aW51ZXxkZWZ8ZGVsfGVsaWZ8ZWxzZXxleGNlcHR8ZXhlY3xcIiArXG4gICAgICAgIFwiZmluYWxseXxmb3J8ZnJvbXxnbG9iYWx8aWZ8aW1wb3J0fGlufGlzfGxhbWJkYXxub3R8b3J8cGFzc3xwcmludHxcIiArXG4gICAgICAgIFwicmFpc2V8cmV0dXJufHRyeXx3aGlsZXx3aXRofHlpZWxkfGFzeW5jfGF3YWl0fG5vbmxvY2FsXCJcbiAgICApO1xuXG4gICAgdmFyIGJ1aWx0aW5Db25zdGFudHMgPSAoXG4gICAgICAgIFwiVHJ1ZXxGYWxzZXxOb25lfE5vdEltcGxlbWVudGVkfEVsbGlwc2lzfF9fZGVidWdfX1wiXG4gICAgKTtcblxuICAgIHZhciBidWlsdGluRnVuY3Rpb25zID0gKFxuICAgICAgICBcImFic3xkaXZtb2R8aW5wdXR8b3BlbnxzdGF0aWNtZXRob2R8YWxsfGVudW1lcmF0ZXxpbnR8b3JkfHN0cnxhbnl8XCIgK1xuICAgICAgICBcImV2YWx8aXNpbnN0YW5jZXxwb3d8c3VtfGJhc2VzdHJpbmd8ZXhlY2ZpbGV8aXNzdWJjbGFzc3xwcmludHxzdXBlcnxcIiArXG4gICAgICAgIFwiYmluZmlsZXxiaW58aXRlcnxwcm9wZXJ0eXx0dXBsZXxib29sfGZpbHRlcnxsZW58cmFuZ2V8dHlwZXxieXRlYXJyYXl8XCIgK1xuICAgICAgICBcImZsb2F0fGxpc3R8cmF3X2lucHV0fHVuaWNocnxjYWxsYWJsZXxmb3JtYXR8bG9jYWxzfHJlZHVjZXx1bmljb2RlfFwiICtcbiAgICAgICAgXCJjaHJ8ZnJvemVuc2V0fGxvbmd8cmVsb2FkfHZhcnN8Y2xhc3NtZXRob2R8Z2V0YXR0cnxtYXB8cmVwcnx4cmFuZ2V8XCIgK1xuICAgICAgICBcImNtcHxnbG9iYWxzfG1heHxyZXZlcnNlZHx6aXB8Y29tcGlsZXxoYXNhdHRyfG1lbW9yeXZpZXd8cm91bmR8XCIgK1xuICAgICAgICBcIl9faW1wb3J0X198Y29tcGxleHxoYXNofG1pbnxhcHBseXxkZWxhdHRyfGhlbHB8bmV4dHxzZXRhdHRyfHNldHxcIiArXG4gICAgICAgIFwiYnVmZmVyfGRpY3R8aGV4fG9iamVjdHxzbGljZXxjb2VyY2V8ZGlyfGlkfG9jdHxzb3J0ZWR8aW50ZXJufFwiICtcbiAgICAgICAgXCJhc2NpaXxicmVha3BvaW50fGJ5dGVzXCJcbiAgICApO1xuXG4gICAgLy92YXIgZnV0dXJlUmVzZXJ2ZWQgPSBcIlwiO1xuICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgXCJpbnZhbGlkLmRlcHJlY2F0ZWRcIjogXCJkZWJ1Z2dlclwiLFxuICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb25cIjogYnVpbHRpbkZ1bmN0aW9ucyxcbiAgICAgICAgXCJ2YXJpYWJsZS5sYW5ndWFnZVwiOiBcInNlbGZ8Y2xzXCIsXG4gICAgICAgIFwiY29uc3RhbnQubGFuZ3VhZ2VcIjogYnVpbHRpbkNvbnN0YW50cyxcbiAgICAgICAgXCJrZXl3b3JkXCI6IGtleXdvcmRzXG4gICAgfSwgXCJpZGVudGlmaWVyXCIpO1xuXG4gICAgdmFyIHN0clByZSA9IFwiW3VVXT9cIjtcbiAgICB2YXIgc3RyUmF3UHJlID0gXCJbclJdXCI7XG4gICAgdmFyIHN0ckZvcm1hdFByZSA9IFwiW2ZGXVwiO1xuICAgIHZhciBzdHJSYXdGb3JtYXRQcmUgPSBcIig/OltyUl1bZkZdfFtmRl1bclJdKVwiO1xuICAgIHZhciBkZWNpbWFsSW50ZWdlciA9IFwiKD86KD86WzEtOV1cXFxcZCopfCg/OjApKVwiO1xuICAgIHZhciBvY3RJbnRlZ2VyID0gXCIoPzowW29PXT9bMC03XSspXCI7XG4gICAgdmFyIGhleEludGVnZXIgPSBcIig/OjBbeFhdW1xcXFxkQS1GYS1mXSspXCI7XG4gICAgdmFyIGJpbkludGVnZXIgPSBcIig/OjBbYkJdWzAxXSspXCI7XG4gICAgdmFyIGludGVnZXIgPSBcIig/OlwiICsgZGVjaW1hbEludGVnZXIgKyBcInxcIiArIG9jdEludGVnZXIgKyBcInxcIiArIGhleEludGVnZXIgKyBcInxcIiArIGJpbkludGVnZXIgKyBcIilcIjtcblxuICAgIHZhciBleHBvbmVudCA9IFwiKD86W2VFXVsrLV0/XFxcXGQrKVwiO1xuICAgIHZhciBmcmFjdGlvbiA9IFwiKD86XFxcXC5cXFxcZCspXCI7XG4gICAgdmFyIGludFBhcnQgPSBcIig/OlxcXFxkKylcIjtcbiAgICB2YXIgcG9pbnRGbG9hdCA9IFwiKD86KD86XCIgKyBpbnRQYXJ0ICsgXCI/XCIgKyBmcmFjdGlvbiArIFwiKXwoPzpcIiArIGludFBhcnQgKyBcIlxcXFwuKSlcIjtcbiAgICB2YXIgZXhwb25lbnRGbG9hdCA9IFwiKD86KD86XCIgKyBwb2ludEZsb2F0ICsgXCJ8XCIgKyBpbnRQYXJ0ICsgXCIpXCIgKyBleHBvbmVudCArIFwiKVwiO1xuICAgIHZhciBmbG9hdE51bWJlciA9IFwiKD86XCIgKyBleHBvbmVudEZsb2F0ICsgXCJ8XCIgKyBwb2ludEZsb2F0ICsgXCIpXCI7XG5cbiAgICB2YXIgc3RyaW5nRXNjYXBlID0gXCJcXFxcXFxcXCh4WzAtOUEtRmEtZl17Mn18WzAtN117M318W1xcXFxcXFxcYWJmbnJ0didcXFwiXXxVWzAtOUEtRmEtZl17OH18dVswLTlBLUZhLWZdezR9KVwiO1xuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFsge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIjLiokXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAgICAgICAgICAgLy8gbXVsdGkgbGluZSBcIlwiXCIgc3RyaW5nIHN0YXJ0XG4gICAgICAgICAgICByZWdleCA6IHN0clByZSArICdcInszfScsXG4gICAgICAgICAgICBuZXh0IDogXCJxcXN0cmluZzNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsICAgICAgICAgICAvLyBcIiBzdHJpbmdcbiAgICAgICAgICAgIHJlZ2V4IDogc3RyUHJlICsgJ1wiKD89LiknLFxuICAgICAgICAgICAgbmV4dCA6IFwicXFzdHJpbmdcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsICAgICAgICAgICAvLyBtdWx0aSBsaW5lICcnJyBzdHJpbmcgc3RhcnRcbiAgICAgICAgICAgIHJlZ2V4IDogc3RyUHJlICsgXCInezN9XCIsXG4gICAgICAgICAgICBuZXh0IDogXCJxc3RyaW5nM1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgICAgICAgICAgIC8vICcgc3RyaW5nXG4gICAgICAgICAgICByZWdleCA6IHN0clByZSArIFwiJyg/PS4pXCIsXG4gICAgICAgICAgICBuZXh0IDogXCJxc3RyaW5nXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogc3RyUmF3UHJlICsgJ1wiezN9JyxcbiAgICAgICAgICAgIG5leHQ6IFwicmF3cXFzdHJpbmczXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsIFxuICAgICAgICAgICAgcmVnZXg6IHN0clJhd1ByZSArICdcIig/PS4pJyxcbiAgICAgICAgICAgIG5leHQ6IFwicmF3cXFzdHJpbmdcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBzdHJSYXdQcmUgKyBcIid7M31cIixcbiAgICAgICAgICAgIG5leHQ6IFwicmF3cXN0cmluZzNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBzdHJSYXdQcmUgKyBcIicoPz0uKVwiLFxuICAgICAgICAgICAgbmV4dDogXCJyYXdxc3RyaW5nXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogc3RyRm9ybWF0UHJlICsgJ1wiezN9JyxcbiAgICAgICAgICAgIG5leHQ6IFwiZnFxc3RyaW5nM1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IHN0ckZvcm1hdFByZSArICdcIig/PS4pJyxcbiAgICAgICAgICAgIG5leHQ6IFwiZnFxc3RyaW5nXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogc3RyRm9ybWF0UHJlICsgXCInezN9XCIsXG4gICAgICAgICAgICBuZXh0OiBcImZxc3RyaW5nM1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IHN0ckZvcm1hdFByZSArIFwiJyg/PS4pXCIsXG4gICAgICAgICAgICBuZXh0OiBcImZxc3RyaW5nXCJcbiAgICAgICAgfSx7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBzdHJSYXdGb3JtYXRQcmUgKyAnXCJ7M30nLFxuICAgICAgICAgICAgbmV4dDogXCJyZnFxc3RyaW5nM1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IHN0clJhd0Zvcm1hdFByZSArICdcIig/PS4pJyxcbiAgICAgICAgICAgIG5leHQ6IFwicmZxcXN0cmluZ1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IHN0clJhd0Zvcm1hdFByZSArIFwiJ3szfVwiLFxuICAgICAgICAgICAgbmV4dDogXCJyZnFzdHJpbmczXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogc3RyUmF3Rm9ybWF0UHJlICsgXCInKD89LilcIixcbiAgICAgICAgICAgIG5leHQ6IFwicmZxc3RyaW5nXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXCt8XFxcXC18XFxcXCp8XFxcXCpcXFxcKnxcXFxcL3xcXFxcL1xcXFwvfCV8QHw8PHw+PnwmfFxcXFx8fFxcXFxefH58PHw+fDw9fD0+fD09fCE9fDw+fD1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiLHw6fDt8XFxcXC0+fFxcXFwrPXxcXFxcLT18XFxcXCo9fFxcXFwvPXxcXFxcL1xcXFwvPXwlPXxAPXwmPXxcXFxcfD18Xj18Pj49fDw8PXxcXFxcKlxcXFwqPVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiW1xcXFxbXFxcXChcXFxce11cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIltcXFxcXVxcXFwpXFxcXH1dXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFtcImtleXdvcmRcIiwgXCJ0ZXh0XCIsIFwiZW50aXR5Lm5hbWUuZnVuY3Rpb25cIl0sXG4gICAgICAgICAgICByZWdleDogXCIoZGVmfGNsYXNzKShcXFxccyspKFtcXFxcdTAwQkYtXFxcXHUxRkZGXFxcXHUyQzAwLVxcXFx1RDdGRlxcXFx3XSspXCJcbiAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInRleHRcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFxzK1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiY29uc3RhbnRzXCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwicXFzdHJpbmczXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiBzdHJpbmdFc2NhcGVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsIC8vIG11bHRpIGxpbmUgXCJcIlwiIHN0cmluZyBlbmRcbiAgICAgICAgICAgIHJlZ2V4OiAnXCJ7M30nLFxuICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICB9XSxcbiAgICAgICAgXCJxc3RyaW5nM1wiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICByZWdleDogc3RyaW5nRXNjYXBlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLCAgLy8gbXVsdGkgbGluZSAnJycgc3RyaW5nIGVuZFxuICAgICAgICAgICAgcmVnZXg6IFwiJ3szfVwiLFxuICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICB9XSxcbiAgICAgICAgXCJxcXN0cmluZ1wiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICByZWdleDogc3RyaW5nRXNjYXBlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXFxcXFwkXCIsXG4gICAgICAgICAgICBuZXh0OiBcInFxc3RyaW5nXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogJ1wifCQnLFxuICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICB9XSxcbiAgICAgICAgXCJxc3RyaW5nXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiBzdHJpbmdFc2NhcGVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcXFxcXCRcIixcbiAgICAgICAgICAgIG5leHQ6IFwicXN0cmluZ1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IFwiJ3wkXCIsXG4gICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgIH1dLFxuICAgICAgICBcInJhd3Fxc3RyaW5nM1wiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsIC8vIG11bHRpIGxpbmUgXCJcIlwiIHN0cmluZyBlbmRcbiAgICAgICAgICAgIHJlZ2V4OiAnXCJ7M30nLFxuICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICB9XSxcbiAgICAgICAgXCJyYXdxc3RyaW5nM1wiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsICAvLyBtdWx0aSBsaW5lICcnJyBzdHJpbmcgZW5kXG4gICAgICAgICAgICByZWdleDogXCInezN9XCIsXG4gICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgIH1dLFxuICAgICAgICBcInJhd3Fxc3RyaW5nXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFxcXFxcJFwiLFxuICAgICAgICAgICAgbmV4dDogXCJyYXdxcXN0cmluZ1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6ICdcInwkJyxcbiAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwicmF3cXN0cmluZ1wiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcXFxcXCRcIixcbiAgICAgICAgICAgIG5leHQ6IFwicmF3cXN0cmluZ1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IFwiJ3wkXCIsXG4gICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgIH1dLFxuICAgICAgICBcImZxcXN0cmluZzNcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgcmVnZXg6IHN0cmluZ0VzY2FwZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIiwgLy8gbXVsdGkgbGluZSBcIlwiXCIgc3RyaW5nIGVuZFxuICAgICAgICAgICAgcmVnZXg6ICdcInszfScsXG4gICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogXCJ7XCIsXG4gICAgICAgICAgICBwdXNoOiBcImZxc3RyaW5nUGFyUnVsZXNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwiZnFzdHJpbmczXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiBzdHJpbmdFc2NhcGVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsICAvLyBtdWx0aSBsaW5lICcnJyBzdHJpbmcgZW5kXG4gICAgICAgICAgICByZWdleDogXCInezN9XCIsXG4gICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogXCJ7XCIsXG4gICAgICAgICAgICBwdXNoOiBcImZxc3RyaW5nUGFyUnVsZXNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwiZnFxc3RyaW5nXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiBzdHJpbmdFc2NhcGVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcXFxcXCRcIixcbiAgICAgICAgICAgIG5leHQ6IFwiZnFxc3RyaW5nXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogJ1wifCQnLFxuICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwie1wiLFxuICAgICAgICAgICAgcHVzaDogXCJmcXN0cmluZ1BhclJ1bGVzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgIH1dLFxuICAgICAgICBcImZxc3RyaW5nXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiBzdHJpbmdFc2NhcGVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogXCInfCRcIixcbiAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIntcIixcbiAgICAgICAgICAgIHB1c2g6IFwiZnFzdHJpbmdQYXJSdWxlc1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICB9XSxcbiAgICAgICAgXCJyZnFxc3RyaW5nM1wiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsIC8vIG11bHRpIGxpbmUgXCJcIlwiIHN0cmluZyBlbmRcbiAgICAgICAgICAgIHJlZ2V4OiAnXCJ7M30nLFxuICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwie1wiLFxuICAgICAgICAgICAgcHVzaDogXCJmcXN0cmluZ1BhclJ1bGVzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgIH1dLFxuICAgICAgICBcInJmcXN0cmluZzNcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLCAgLy8gbXVsdGkgbGluZSAnJycgc3RyaW5nIGVuZFxuICAgICAgICAgICAgcmVnZXg6IFwiJ3szfVwiLFxuICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwie1wiLFxuICAgICAgICAgICAgcHVzaDogXCJmcXN0cmluZ1BhclJ1bGVzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgIH1dLFxuICAgICAgICBcInJmcXFzdHJpbmdcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXFxcXFwkXCIsXG4gICAgICAgICAgICBuZXh0OiBcInJmcXFzdHJpbmdcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAnXCJ8JCcsXG4gICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogXCJ7XCIsXG4gICAgICAgICAgICBwdXNoOiBcImZxc3RyaW5nUGFyUnVsZXNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwicmZxc3RyaW5nXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIid8JFwiLFxuICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwie1wiLFxuICAgICAgICAgICAgcHVzaDogXCJmcXN0cmluZ1BhclJ1bGVzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgIH1dLFxuICAgICAgICBcImZxc3RyaW5nUGFyUnVsZXNcIjogW3svL1RPRE86IG5lc3RlZCB7fVxuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogXCJbXFxcXFtcXFxcKF1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIltcXFxcXVxcXFwpXVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXHMrXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogXCInW14nXSonXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogJ1wiW15cIl0qXCInXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImZ1bmN0aW9uLnN1cHBvcnRcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIighc3whcnwhYSlcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcImNvbnN0YW50c1wiXG4gICAgICAgIH0se1xuICAgICAgICAgICAgdG9rZW46ICdwYXJlbi5ycGFyZW4nLFxuICAgICAgICAgICAgcmVnZXg6IFwifVwiLFxuICAgICAgICAgICAgbmV4dDogJ3BvcCdcbiAgICAgICAgfSx7XG4gICAgICAgICAgICB0b2tlbjogJ3BhcmVuLmxwYXJlbicsXG4gICAgICAgICAgICByZWdleDogXCJ7XCIsXG4gICAgICAgICAgICBwdXNoOiBcImZxc3RyaW5nUGFyUnVsZXNcIlxuICAgICAgICB9XSxcbiAgICAgICAgXCJjb25zdGFudHNcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaW1hZ2luYXJ5XG4gICAgICAgICAgICByZWdleDogXCIoPzpcIiArIGZsb2F0TnVtYmVyICsgXCJ8XFxcXGQrKVtqSl1cXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gZmxvYXRcbiAgICAgICAgICAgIHJlZ2V4OiBmbG9hdE51bWJlclxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGxvbmcgaW50ZWdlclxuICAgICAgICAgICAgcmVnZXg6IGludGVnZXIgKyBcIltsTF1cXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaW50ZWdlclxuICAgICAgICAgICAgcmVnZXg6IGludGVnZXIgKyBcIlxcXFxiXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFtcInB1bmN0dWF0aW9uXCIsIFwiZnVuY3Rpb24uc3VwcG9ydFwiXSwvLyBtZXRob2RcbiAgICAgICAgICAgIHJlZ2V4OiBcIihcXFxcLikoW2EtekEtWl9dKylcXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBrZXl3b3JkTWFwcGVyLFxuICAgICAgICAgICAgcmVnZXg6IFwiW2EtekEtWl8kXVthLXpBLVowLTlfJF0qXFxcXGJcIlxuICAgICAgICB9XVxuICAgIH07XG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxub29wLmluaGVyaXRzKFB5dGhvbkhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLlB5dGhvbkhpZ2hsaWdodFJ1bGVzID0gUHl0aG9uSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=