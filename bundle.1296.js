(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1296,5454],{

/***/ 81296:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(35454);
exports.scope = "gobstones";


/***/ }),

/***/ 35454:
/***/ ((module) => {

module.exports = `# scope: gobstones

# program
snippet program
	program {
		\${1:// cuerpo...}
	}

# interactive program
snippet interactive program
	interactive program {
		\${1:INIT} -> { \${2:// cuerpo...} }
		\${3:TIMEOUT(\${4:5000}) -> { \${5:// cuerpo...} }
		\${6:K_ENTER} -> { \${7:// cuerpo...} }
		_ -> {}
	}

# procedure
snippet procedure
	procedure \${1:Nombre}(\${2:parametros}) {
		\${3:// cuerpo...}
	}

# function
snippet function
	function \${1:nombre}(\${2:parametros}) {
		return (\${3:expresión..})
	}

# return
snippet return
	return (\${1:expresión...})

# type
snippet type
	type \${1:Nombre}

# is variant
snippet is variant
	is variant {
		case \${1:NombreDelValor1} {}
		case \${2:NombreDelValor2} {}
		case \${3:NombreDelValor3} {}
		case \${4:NombreDelValor4} {}
	}

# is record
snippet is record
	is record {
		field \${1:campo1} // \${2:Tipo}
		field \${3:campo2} // \${4:Tipo}
		field \${5:campo3} // \${6:Tipo}
		field \${7:campo4} // \${8:Tipo}
	}

# type _ is variant
snippet type _ is variant
	type \${1:Nombre} is variant {
		case \${2:NombreDelValor1} {}
		case \${3:NombreDelValor2} {}
		case \${4:NombreDelValor3} {}
		case \${5:NombreDelValor4} {}
	}

# type _ is record
snippet type _ is record
	type \${1:Nombre} is record {
		field \${2:campo1} // \${3:Tipo}
		field \${4:campo2} // \${5:Tipo}
		field \${6:campo3} // \${7:Tipo}
		field \${8:campo4} // \${9:Tipo}
	}

# repeat
snippet repeat
	repeat \${1:cantidad} {
		\${2:// cuerpo...}
	}

# foreach
snippet foreach
	foreach \${1:índice} in \${2:lista} {
		\${3:// cuerpo...}
	}

# while
snippet while
	while (\${1?:condición}) {
		\${2:// cuerpo...}
	}

# if
snippet if
	if (\${1?:condición}) {
		\${2:// cuerpo...}
	}

# elseif
snippet elseif
	elseif (\${1?:condición}) {
		\${2:// cuerpo...}
	}

# else
snippet else
	else {
		\${1:// cuerpo...}
	}

# if (con else)
snippet if (con else)
	if (\${1:condición}) {
		\${2:// cuerpo...}
	} else {
		\${3:// cuerpo....}
	}

# if (con elseif)
snippet if (con elseif)
	if (\${1:condición}) {
		\${2:// cuerpo...}
	} elseif (\${3:condición}) {
		\${4:// cuerpo...}
	}

# if (con elseif y else)
snippet if (con elseif y else)
	if (\${1:condición}) {
		\${2:// cuerpo...}
	} elseif (\${3:condición}) {
		\${4:// cuerpo...}
	} else {
		\${5:// cuerpo....}
	}

# if (con 3 elseif)
snippet if (con 3 elseif)
	if (\${1:condición}) {
		\${2:// cuerpo...}
	} elseif (\${3:condición}) {
		\${4:// cuerpo...}
	} elseif (\${5:condición}) {
		\${6:// cuerpo...}
	} elseif (\${7:condición}) {
		\${8:// cuerpo...}
	}

# choose (2 valores)
snippet choose (2 valores)
	choose
		\${1:Valor1} when (\${2:condición})
		\${3:Valor2} otherwise

# choose (2 valores y boom)
snippet choose (2 valores y boom)
	choose
		\${1:Valor1} when (\${2:condición})
		\${3:Valor2} when (\${4:condición})
		\${5:Valor3} when (\${6:condición})
		\${7:Valor4} when (\${8:condición})
		boom("\${9:No es un valor válido}") otherwise

# matching (4 valores)
snippet matching (4 valores)
	matching (\${1:variable}) select
		\${2:Valor1} on \${3:opción1}
		\${4:Valor2} on \${5:opción2}
		\${6:Valor3} on \${7:opción3}
		\${8:Valor4} on \${9:opción4}
		boom("\${10:No es un valor válido}") otherwise

# select (4 casos)
snippet select (4 casos)
	select
		\${1:Valor1} on (\${2:opción1})
		\${3:Valor2} on (\${4:opción2})
		\${5:Valor3} on (\${6:opción3})
		\${7:Valor4} on (\${8:opción4})
		boom("\${9:No es un valor válido}") otherwise

# switch
snippet switch
	switch (\${1:variable}) {
		\${2:Valor1} -> {\${3:// cuerpo...}}
		\${4:Valor2} -> {\${5:// cuerpo...}}
		\${6:Valor3} -> {\${7:// cuerpo...}}
		\${8:Valor4} -> {\${9:// cuerpo...}}
		_ -> {\${10:// cuerpo...}}
	}

# Poner
snippet Poner
	Poner(\${1:color})

# Sacar
snippet Sacar
	Sacar(\${1:color})

# Mover
snippet Mover
	Mover(\${1:dirección})

# IrAlBorde
snippet IrAlBorde
	IrAlBorde(\${1:dirección})

# VaciarTablero
snippet VaciarTablero
	VaciarTablero()

# BOOM
snippet BOOM
	BOOM("\${1:Mensaje de error}")

# hayBolitas
snippet hayBolitas
	hayBolitas(\${1:color})

# nroBolitas
snippet nroBolitas
	nroBolitas(\${1:color})

# puedeMover
snippet puedeMover
	puedeMover(\${1:dirección})

# siguiente
snippet siguiente
	siguiente(\${1:color|dirección})

# previo
snippet previo
	previo(\${1:color|dirección})

# opuesto
snippet opuesto
	opuesto(\${1:dirección})

# minDir
snippet minDir
	minDir()

# maxDir
snippet maxDir
	maxDir()

# minColor
snippet minColor
	minDir()

# maxColor
snippet maxColor
	maxDir()

# minBool
snippet minBool
	minBool()

# maxBool
snippet maxBool
	maxBool()

# primero
snippet primero
	primero(\${1:lista})

# sinElPrimero
snippet sinElPrimero
	sinElPrimero(\${1:lista})

# esVacía
snippet esVacía
	esVacía(\${1:lista})

# boom
snippet boom
	boom("\${1:Mensaje de error}")

# Azul
snippet Azul
	Azul

# Negro
snippet Negro
	Negro

# Rojo
snippet Rojo
	Rojo

# Verde
snippet Verde
	Verde

# Norte
snippet Norte
	Norte

# Este
snippet Este
	Este

# Sur
snippet Sur
	Sur

# Oeste
snippet Oeste
	Oeste

# True
snippet True
	True

# False
snippet False
	False

# INIT
snippet INIT
	INIT -> {\$1:// cuerpo...}

# TIMEOUT
snippet TIMEOUT
	TIMEOUT(\${1:5000}) -> {\$2:// cuerpo...}

# K_A
snippet K_A
	K_A -> { \${1://cuerpo...} }
# K_CTRL_A
snippet K_CTRL_A
	K_CTRL_A -> { \${1://cuerpo...} }
# K_ALT_A
snippet K_ALT_A
	K_ALT_A -> { \${1://cuerpo...} }
# K_SHIFT_A
snippet K_SHIFT_A
	K_SHIFT_A -> { \${1://cuerpo...} }
# K_CTRL_ALT_A
snippet K_CTRL_ALT_A
	K_CTRL_ALT_A -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_A
snippet K_CTRL_SHIFT_A
	K_CTRL_SHIFT_A -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_A
snippet K_CTRL_ALT_SHIFT_A
	K_CTRL_ALT_SHIFT_A -> { \${1://cuerpo...} }

# K_B
snippet K_B
	K_B -> { \${1://cuerpo...} }
# K_CTRL_B
snippet K_CTRL_B
	K_CTRL_B -> { \${1://cuerpo...} }
# K_ALT_B
snippet K_ALT_B
	K_ALT_B -> { \${1://cuerpo...} }
# K_SHIFT_B
snippet K_SHIFT_B
	K_SHIFT_B -> { \${1://cuerpo...} }
# K_CTRL_ALT_B
snippet K_CTRL_ALT_B
	K_CTRL_ALT_B -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_B
snippet K_CTRL_SHIFT_B
	K_CTRL_SHIFT_B -> { \${1://cuerpo...} }
# K_ALT_SHIFT_C
snippet K_ALT_SHIFT_C
	K_ALT_SHIFT_C -> { \${1://cuerpo...} }
# K_CTRL_BLT_SHIFT_B
snippet K_CTRL_BLT_SHIFT_B
	K_CTRL_ALT_SHIFT_B -> { \${1://cuerpo...} }

# K_C
snippet K_C
	K_C -> { \${1://cuerpo...} }
# K_CTRL_C
snippet K_CTRL_C
	K_CTRL_C -> { \${1://cuerpo...} }
# K_ALT_C
snippet K_ALT_C
	K_ALT_C -> { \${1://cuerpo...} }
# K_SHIFT_C
snippet K_SHIFT_C
	K_SHIFT_C -> { \${1://cuerpo...} }
# K_CTRL_ALT_C
snippet K_CTRL_ALT_C
	K_CTRL_ALT_C -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_C
snippet K_CTRL_SHIFT_C
	K_CTRL_SHIFT_C -> { \${1://cuerpo...} }
# K_ALT_SHIFT_C
snippet K_ALT_SHIFT_C
	K_ALT_SHIFT_C -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_C
snippet K_CTRL_ALT_SHIFT_C
	K_CTRL_ALT_SHIFT_C -> { \${1://cuerpo...} }

# K_D
snippet K_D
	K_D -> { \${1://cuerpo...} }
# K_CTRL_D
snippet K_CTRL_D
	K_CTRL_D -> { \${1://cuerpo...} }
# K_ALT_D
snippet K_ALT_D
	K_DLT_D -> { \${1://cuerpo...} }
# K_SHIFT_D
snippet K_SHIFT_D
	K_SHIFT_D -> { \${1://cuerpo...} }
# K_CTRL_ALT_D
snippet K_CTRL_ALT_D
	K_CTRL_DLT_D -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_D
snippet K_CTRL_SHIFT_D
	K_CTRL_SHIFT_D -> { \${1://cuerpo...} }
# K_ALT_SHIFT_D
snippet K_ALT_SHIFT_D
	K_ALT_SHIFT_D -> { \${1://cuerpo...} }
# K_CTRL_DLT_SHIFT_D
snippet K_CTRL_DLT_SHIFT_D
	K_CTRL_ALT_SHIFT_D -> { \${1://cuerpo...} }

# K_E
snippet K_E
	K_E -> { \${1://cuerpo...} }
# K_CTRL_E
snippet K_CTRL_E
	K_CTRL_E -> { \${1://cuerpo...} }
# K_ALT_E
snippet K_ALT_E
	K_ALT_E -> { \${1://cuerpo...} }
# K_SHIFT_E
snippet K_SHIFT_E
	K_SHIFT_E -> { \${1://cuerpo...} }
# K_CTRL_ALT_E
snippet K_CTRL_ALT_E
	K_CTRL_ALT_E -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_E
snippet K_CTRL_SHIFT_E
	K_CTRL_SHIFT_E -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_E
snippet K_CTRL_ALT_SHIFT_E
	K_CTRL_ALT_SHIFT_E -> { \${1://cuerpo...} }

# K_F
snippet K_F
	K_F -> { \${1://cuerpo...} }
# K_CTRL_F
snippet K_CTRL_F
	K_CTRL_F -> { \${1://cuerpo...} }
# K_ALT_F
snippet K_ALT_F
	K_ALT_F -> { \${1://cuerpo...} }
# K_SHIFT_F
snippet K_SHIFT_F
	K_SHIFT_F -> { \${1://cuerpo...} }
# K_CTRL_ALT_F
snippet K_CTRL_ALT_F
	K_CTRL_ALT_F -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_F
snippet K_CTRL_SHIFT_F
	K_CTRL_SHIFT_F -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_F
snippet K_CTRL_ALT_SHIFT_F
	K_CTRL_ALT_SHIFT_F -> { \${1://cuerpo...} }

# K_G
snippet K_G
	K_G -> { \${1://cuerpo...} }
# K_CTRL_G
snippet K_CTRL_G
	K_CTRL_G -> { \${1://cuerpo...} }
# K_ALT_G
snippet K_ALT_G
	K_ALT_G -> { \${1://cuerpo...} }
# K_SHIFT_G
snippet K_SHIFT_G
	K_SHIFT_G -> { \${1://cuerpo...} }
# K_CTRL_ALT_G
snippet K_CTRL_ALT_G
	K_CTRL_ALT_G -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_G
snippet K_CTRL_SHIFT_G
	K_CTRL_SHIFT_G -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_G
snippet K_CTRL_ALT_SHIFT_G
	K_CTRL_ALT_SHIFT_G -> { \${1://cuerpo...} }

# K_H
snippet K_H
	K_H -> { \${1://cuerpo...} }
# K_CTRL_H
snippet K_CTRL_H
	K_CTRL_H -> { \${1://cuerpo...} }
# K_ALT_H
snippet K_ALT_H
	K_ALT_H -> { \${1://cuerpo...} }
# K_SHIFT_H
snippet K_SHIFT_H
	K_SHIFT_H -> { \${1://cuerpo...} }
# K_CTRL_ALT_H
snippet K_CTRL_ALT_H
	K_CTRL_ALT_H -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_H
snippet K_CTRL_SHIFT_H
	K_CTRL_SHIFT_H -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_H
snippet K_CTRL_ALT_SHIFT_H
	K_CTRL_ALT_SHIFT_H -> { \${1://cuerpo...} }

# K_I
snippet K_I
	K_I -> { \${1://cuerpo...} }
# K_CTRL_I
snippet K_CTRL_I
	K_CTRL_I -> { \${1://cuerpo...} }
# K_ALT_I
snippet K_ALT_I
	K_ALT_I -> { \${1://cuerpo...} }
# K_SHIFT_I
snippet K_SHIFT_I
	K_SHIFT_I -> { \${1://cuerpo...} }
# K_CTRL_ALT_I
snippet K_CTRL_ALT_I
	K_CTRL_ALT_I -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_I
snippet K_CTRL_SHIFT_I
	K_CTRL_SHIFT_I -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_I
snippet K_CTRL_ALT_SHIFT_I
	K_CTRL_ALT_SHIFT_I -> { \${1://cuerpo...} }

# K_J
snippet K_J
	K_J -> { \${1://cuerpo...} }
# K_CTRL_J
snippet K_CTRL_J
	K_CTRL_J -> { \${1://cuerpo...} }
# K_ALT_J
snippet K_ALT_J
	K_ALT_J -> { \${1://cuerpo...} }
# K_SHIFT_J
snippet K_SHIFT_J
	K_SHIFT_J -> { \${1://cuerpo...} }
# K_CTRL_ALT_J
snippet K_CTRL_ALT_J
	K_CTRL_ALT_J -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_J
snippet K_CTRL_SHIFT_J
	K_CTRL_SHIFT_J -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_J
snippet K_CTRL_ALT_SHIFT_J
	K_CTRL_ALT_SHIFT_J -> { \${1://cuerpo...} }

# K_K
snippet K_K
	K_K -> { \${1://cuerpo...} }
# K_CTRL_K
snippet K_CTRL_K
	K_CTRL_K -> { \${1://cuerpo...} }
# K_ALT_K
snippet K_ALT_K
	K_ALT_K -> { \${1://cuerpo...} }
# K_SHIFT_K
snippet K_SHIFT_K
	K_SHIFT_K -> { \${1://cuerpo...} }
# K_CTRL_ALT_K
snippet K_CTRL_ALT_K
	K_CTRL_ALT_K -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_K
snippet K_CTRL_SHIFT_K
	K_CTRL_SHIFT_K -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_K
snippet K_CTRL_ALT_SHIFT_K
	K_CTRL_ALT_SHIFT_K -> { \${1://cuerpo...} }

# K_L
snippet K_L
	K_L -> { \${1://cuerpo...} }
# K_CTRL_L
snippet K_CTRL_L
	K_CTRL_L -> { \${1://cuerpo...} }
# K_ALT_L
snippet K_ALT_L
	K_ALT_L -> { \${1://cuerpo...} }
# K_SHIFT_L
snippet K_SHIFT_L
	K_SHIFT_L -> { \${1://cuerpo...} }
# K_CTRL_ALT_L
snippet K_CTRL_ALT_L
	K_CTRL_ALT_L -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_L
snippet K_CTRL_SHIFT_L
	K_CTRL_SHIFT_L -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_L
snippet K_CTRL_ALT_SHIFT_L
	K_CTRL_ALT_SHIFT_L -> { \${1://cuerpo...} }

# K_M
snippet K_M
	K_M -> { \${1://cuerpo...} }
# K_CTRL_M
snippet K_CTRL_M
	K_CTRL_M -> { \${1://cuerpo...} }
# K_ALT_M
snippet K_ALT_M
	K_ALT_M -> { \${1://cuerpo...} }
# K_SHIFT_M
snippet K_SHIFT_M
	K_SHIFT_M -> { \${1://cuerpo...} }
# K_CTRL_ALT_M
snippet K_CTRL_ALT_M
	K_CTRL_ALT_M -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_M
snippet K_CTRL_SHIFT_M
	K_CTRL_SHIFT_M -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_M
snippet K_CTRL_ALT_SHIFT_M
	K_CTRL_ALT_SHIFT_M -> { \${1://cuerpo...} }

# K_N
snippet K_N
	K_N -> { \${1://cuerpo...} }
# K_CTRL_N
snippet K_CTRL_N
	K_CTRL_N -> { \${1://cuerpo...} }
# K_ALT_N
snippet K_ALT_N
	K_ALT_N -> { \${1://cuerpo...} }
# K_SHIFT_N
snippet K_SHIFT_N
	K_SHIFT_N -> { \${1://cuerpo...} }
# K_CTRL_ALT_N
snippet K_CTRL_ALT_N
	K_CTRL_ALT_N -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_N
snippet K_CTRL_SHIFT_N
	K_CTRL_SHIFT_N -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_N
snippet K_CTRL_ALT_SHIFT_N
	K_CTRL_ALT_SHIFT_N -> { \${1://cuerpo...} }

# K_Ñ
snippet K_Ñ
	K_Ñ -> { \${1://cuerpo...} }
# K_CTRL_Ñ
snippet K_CTRL_Ñ
	K_CTRL_Ñ -> { \${1://cuerpo...} }
# K_ALT_Ñ
snippet K_ALT_Ñ
	K_ALT_Ñ -> { \${1://cuerpo...} }
# K_SHIFT_Ñ
snippet K_SHIFT_Ñ
	K_SHIFT_Ñ -> { \${1://cuerpo...} }
# K_CTRL_ALT_Ñ
snippet K_CTRL_ALT_Ñ
	K_CTRL_ALT_Ñ -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_Ñ
snippet K_CTRL_SHIFT_Ñ
	K_CTRL_SHIFT_Ñ -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_Ñ
snippet K_CTRL_ALT_SHIFT_Ñ
	K_CTRL_ALT_SHIFT_Ñ -> { \${1://cuerpo...} }

# K_O
snippet K_O
	K_O -> { \${1://cuerpo...} }
# K_CTRL_O
snippet K_CTRL_O
	K_CTRL_O -> { \${1://cuerpo...} }
# K_ALT_O
snippet K_ALT_O
	K_ALT_O -> { \${1://cuerpo...} }
# K_SHIFT_O
snippet K_SHIFT_O
	K_SHIFT_O -> { \${1://cuerpo...} }
# K_CTRL_ALT_O
snippet K_CTRL_ALT_O
	K_CTRL_ALT_O -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_O
snippet K_CTRL_SHIFT_O
	K_CTRL_SHIFT_O -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_O
snippet K_CTRL_ALT_SHIFT_O
	K_CTRL_ALT_SHIFT_O -> { \${1://cuerpo...} }

# K_P
snippet K_P
	K_P -> { \${1://cuerpo...} }
# K_CTRL_P
snippet K_CTRL_P
	K_CTRL_P -> { \${1://cuerpo...} }
# K_ALT_P
snippet K_ALT_P
	K_ALT_P -> { \${1://cuerpo...} }
# K_SHIFT_P
snippet K_SHIFT_P
	K_SHIFT_P -> { \${1://cuerpo...} }
# K_CTRL_ALT_P
snippet K_CTRL_ALT_P
	K_CTRL_ALT_P -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_P
snippet K_CTRL_SHIFT_P
	K_CTRL_SHIFT_P -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_P
snippet K_CTRL_ALT_SHIFT_P
	K_CTRL_ALT_SHIFT_P -> { \${1://cuerpo...} }

# K_Q
snippet K_Q
	K_Q -> { \${1://cuerpo...} }
# K_CTRL_Q
snippet K_CTRL_Q
	K_CTRL_Q -> { \${1://cuerpo...} }
# K_ALT_Q
snippet K_ALT_Q
	K_ALT_Q -> { \${1://cuerpo...} }
# K_SHIFT_Q
snippet K_SHIFT_Q
	K_SHIFT_Q -> { \${1://cuerpo...} }
# K_CTRL_ALT_Q
snippet K_CTRL_ALT_Q
	K_CTRL_ALT_Q -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_Q
snippet K_CTRL_SHIFT_Q
	K_CTRL_SHIFT_Q -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_Q
snippet K_CTRL_ALT_SHIFT_Q
	K_CTRL_ALT_SHIFT_Q -> { \${1://cuerpo...} }

# K_R
snippet K_R
	K_R -> { \${1://cuerpo...} }
# K_CTRL_R
snippet K_CTRL_R
	K_CTRL_R -> { \${1://cuerpo...} }
# K_ALT_R
snippet K_ALT_R
	K_ALT_R -> { \${1://cuerpo...} }
# K_SHIFT_R
snippet K_SHIFT_R
	K_SHIFT_R -> { \${1://cuerpo...} }
# K_CTRL_ALT_R
snippet K_CTRL_ALT_R
	K_CTRL_ALT_R -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_R
snippet K_CTRL_SHIFT_R
	K_CTRL_SHIFT_R -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_R
snippet K_CTRL_ALT_SHIFT_R
	K_CTRL_ALT_SHIFT_R -> { \${1://cuerpo...} }

# K_S
snippet K_S
	K_S -> { \${1://cuerpo...} }
# K_CTRL_S
snippet K_CTRL_S
	K_CTRL_S -> { \${1://cuerpo...} }
# K_ALT_S
snippet K_ALT_S
	K_ALT_S -> { \${1://cuerpo...} }
# K_SHIFT_S
snippet K_SHIFT_S
	K_SHIFT_S -> { \${1://cuerpo...} }
# K_CTRL_ALT_S
snippet K_CTRL_ALT_S
	K_CTRL_ALT_S -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_S
snippet K_CTRL_SHIFT_S
	K_CTRL_SHIFT_S -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_S
snippet K_CTRL_ALT_SHIFT_S
	K_CTRL_ALT_SHIFT_S -> { \${1://cuerpo...} }

# K_T
snippet K_T
	K_T -> { \${1://cuerpo...} }
# K_CTRL_T
snippet K_CTRL_T
	K_CTRL_T -> { \${1://cuerpo...} }
# K_ALT_T
snippet K_ALT_T
	K_ALT_T -> { \${1://cuerpo...} }
# K_SHIFT_T
snippet K_SHIFT_T
	K_SHIFT_T -> { \${1://cuerpo...} }
# K_CTRL_ALT_T
snippet K_CTRL_ALT_T
	K_CTRL_ALT_T -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_T
snippet K_CTRL_SHIFT_T
	K_CTRL_SHIFT_T -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_T
snippet K_CTRL_ALT_SHIFT_T
	K_CTRL_ALT_SHIFT_T -> { \${1://cuerpo...} }

# K_U
snippet K_U
	K_U -> { \${1://cuerpo...} }
# K_CTRL_U
snippet K_CTRL_U
	K_CTRL_U -> { \${1://cuerpo...} }
# K_ALT_U
snippet K_ALT_U
	K_ALT_U -> { \${1://cuerpo...} }
# K_SHIFT_U
snippet K_SHIFT_U
	K_SHIFT_U -> { \${1://cuerpo...} }
# K_CTRL_ALT_U
snippet K_CTRL_ALT_U
	K_CTRL_ALT_U -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_U
snippet K_CTRL_SHIFT_U
	K_CTRL_SHIFT_U -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_U
snippet K_CTRL_ALT_SHIFT_U
	K_CTRL_ALT_SHIFT_U -> { \${1://cuerpo...} }

# K_V
snippet K_V
	K_V -> { \${1://cuerpo...} }
# K_CTRL_V
snippet K_CTRL_V
	K_CTRL_V -> { \${1://cuerpo...} }
# K_ALT_V
snippet K_ALT_V
	K_ALT_V -> { \${1://cuerpo...} }
# K_SHIFT_V
snippet K_SHIFT_V
	K_SHIFT_V -> { \${1://cuerpo...} }
# K_CTRL_ALT_V
snippet K_CTRL_ALT_V
	K_CTRL_ALT_V -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_V
snippet K_CTRL_SHIFT_V
	K_CTRL_SHIFT_V -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_V
snippet K_CTRL_ALT_SHIFT_V
	K_CTRL_ALT_SHIFT_V -> { \${1://cuerpo...} }

# K_W
snippet K_W
	K_W -> { \${1://cuerpo...} }
# K_CTRL_W
snippet K_CTRL_W
	K_CTRL_W -> { \${1://cuerpo...} }
# K_ALT_W
snippet K_ALT_W
	K_ALT_W -> { \${1://cuerpo...} }
# K_SHIFT_W
snippet K_SHIFT_W
	K_SHIFT_W -> { \${1://cuerpo...} }
# K_CTRL_ALT_W
snippet K_CTRL_ALT_W
	K_CTRL_ALT_W -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_W
snippet K_CTRL_SHIFT_W
	K_CTRL_SHIFT_W -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_W
snippet K_CTRL_ALT_SHIFT_W
	K_CTRL_ALT_SHIFT_W -> { \${1://cuerpo...} }

# K_X
snippet K_X
	K_X -> { \${1://cuerpo...} }
# K_CTRL_X
snippet K_CTRL_X
	K_CTRL_X -> { \${1://cuerpo...} }
# K_ALT_X
snippet K_ALT_X
	K_ALT_X -> { \${1://cuerpo...} }
# K_SHIFT_X
snippet K_SHIFT_X
	K_SHIFT_X -> { \${1://cuerpo...} }
# K_CTRL_ALT_X
snippet K_CTRL_ALT_X
	K_CTRL_ALT_X -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_X
snippet K_CTRL_SHIFT_X
	K_CTRL_SHIFT_X -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_X
snippet K_CTRL_ALT_SHIFT_X
	K_CTRL_ALT_SHIFT_X -> { \${1://cuerpo...} }

# K_Y
snippet K_Y
	K_Y -> { \${1://cuerpo...} }
# K_CTRL_Y
snippet K_CTRL_Y
	K_CTRL_Y -> { \${1://cuerpo...} }
# K_ALT_Y
snippet K_ALT_Y
	K_ALT_Y -> { \${1://cuerpo...} }
# K_SHIFT_Y
snippet K_SHIFT_Y
	K_SHIFT_Y -> { \${1://cuerpo...} }
# K_CTRL_ALT_Y
snippet K_CTRL_ALT_Y
	K_CTRL_ALT_Y -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_Y
snippet K_CTRL_SHIFT_Y
	K_CTRL_SHIFT_Y -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_Y
snippet K_CTRL_ALT_SHIFT_Y
	K_CTRL_ALT_SHIFT_Y -> { \${1://cuerpo...} }

# K_Z
snippet K_Z
	K_Z -> { \${1://cuerpo...} }
# K_CTRL_Z
snippet K_CTRL_Z
	K_CTRL_Z -> { \${1://cuerpo...} }
# K_ALT_Z
snippet K_ALT_Z
	K_ALT_Z -> { \${1://cuerpo...} }
# K_SHIFT_Z
snippet K_SHIFT_Z
	K_SHIFT_Z -> { \${1://cuerpo...} }
# K_CTRL_ALT_Z
snippet K_CTRL_ALT_Z
	K_CTRL_ALT_Z -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_Z
snippet K_CTRL_SHIFT_Z
	K_CTRL_SHIFT_Z -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_Z
snippet K_CTRL_ALT_SHIFT_Z
	K_CTRL_ALT_SHIFT_Z -> { \${1://cuerpo...} }

# K_0
snippet K_0
	K_0 -> { \${1://cuerpo...} }
# K_CTRL_0
snippet K_CTRL_0
	K_CTRL_0 -> { \${1://cuerpo...} }
# K_ALT_0
snippet K_ALT_0
	K_ALT_0 -> { \${1://cuerpo...} }
# K_SHIFT_0
snippet K_SHIFT_0
	K_SHIFT_0 -> { \${1://cuerpo...} }
# K_CTRL_ALT_0
snippet K_CTRL_ALT_0
	K_CTRL_ALT_0 -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_0
snippet K_CTRL_SHIFT_0
	K_CTRL_SHIFT_0 -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_0
snippet K_CTRL_ALT_SHIFT_0
	K_CTRL_ALT_SHIFT_0 -> { \${1://cuerpo...} }

# K_1
snippet K_1
	K_1 -> { \${1://cuerpo...} }
# K_CTRL_1
snippet K_CTRL_1
	K_CTRL_1 -> { \${1://cuerpo...} }
# K_ALT_1
snippet K_ALT_1
	K_ALT_1 -> { \${1://cuerpo...} }
# K_SHIFT_1
snippet K_SHIFT_1
	K_SHIFT_1 -> { \${1://cuerpo...} }
# K_CTRL_ALT_1
snippet K_CTRL_ALT_1
	K_CTRL_ALT_1 -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_1
snippet K_CTRL_SHIFT_1
	K_CTRL_SHIFT_1 -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_1
snippet K_CTRL_ALT_SHIFT_1
	K_CTRL_ALT_SHIFT_1 -> { \${1://cuerpo...} }

# K_2
snippet K_2
	K_2 -> { \${1://cuerpo...} }
# K_CTRL_2
snippet K_CTRL_2
	K_CTRL_2 -> { \${1://cuerpo...} }
# K_ALT_2
snippet K_ALT_2
	K_ALT_2 -> { \${1://cuerpo...} }
# K_SHIFT_2
snippet K_SHIFT_2
	K_SHIFT_2 -> { \${1://cuerpo...} }
# K_CTRL_ALT_2
snippet K_CTRL_ALT_2
	K_CTRL_ALT_2 -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_2
snippet K_CTRL_SHIFT_2
	K_CTRL_SHIFT_2 -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_2
snippet K_CTRL_ALT_SHIFT_2
	K_CTRL_ALT_SHIFT_2 -> { \${1://cuerpo...} }

# K_3
snippet K_3
	K_3 -> { \${1://cuerpo...} }
# K_CTRL_3
snippet K_CTRL_3
	K_CTRL_3 -> { \${1://cuerpo...} }
# K_ALT_3
snippet K_ALT_3
	K_ALT_3 -> { \${1://cuerpo...} }
# K_SHIFT_3
snippet K_SHIFT_3
	K_SHIFT_3 -> { \${1://cuerpo...} }
# K_CTRL_ALT_3
snippet K_CTRL_ALT_3
	K_CTRL_ALT_3 -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_3
snippet K_CTRL_SHIFT_3
	K_CTRL_SHIFT_3 -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_3
snippet K_CTRL_ALT_SHIFT_3
	K_CTRL_ALT_SHIFT_3 -> { \${1://cuerpo...} }

# K_4
snippet K_4
	K_4 -> { \${1://cuerpo...} }
# K_CTRL_4
snippet K_CTRL_4
	K_CTRL_4 -> { \${1://cuerpo...} }
# K_ALT_4
snippet K_ALT_4
	K_ALT_4 -> { \${1://cuerpo...} }
# K_SHIFT_4
snippet K_SHIFT_4
	K_SHIFT_4 -> { \${1://cuerpo...} }
# K_CTRL_ALT_4
snippet K_CTRL_ALT_4
	K_CTRL_ALT_4 -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_4
snippet K_CTRL_SHIFT_4
	K_CTRL_SHIFT_4 -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_4
snippet K_CTRL_ALT_SHIFT_4
	K_CTRL_ALT_SHIFT_4 -> { \${1://cuerpo...} }

# K_5
snippet K_5
	K_5 -> { \${1://cuerpo...} }
# K_CTRL_5
snippet K_CTRL_5
	K_CTRL_5 -> { \${1://cuerpo...} }
# K_ALT_5
snippet K_ALT_5
	K_ALT_5 -> { \${1://cuerpo...} }
# K_SHIFT_5
snippet K_SHIFT_5
	K_SHIFT_5 -> { \${1://cuerpo...} }
# K_CTRL_ALT_5
snippet K_CTRL_ALT_5
	K_CTRL_ALT_5 -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_5
snippet K_CTRL_SHIFT_5
	K_CTRL_SHIFT_5 -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_5
snippet K_CTRL_ALT_SHIFT_5
	K_CTRL_ALT_SHIFT_5 -> { \${1://cuerpo...} }

# K_6
snippet K_6
	K_6 -> { \${1://cuerpo...} }
# K_CTRL_6
snippet K_CTRL_6
	K_CTRL_6 -> { \${1://cuerpo...} }
# K_ALT_6
snippet K_ALT_6
	K_ALT_6 -> { \${1://cuerpo...} }
# K_SHIFT_6
snippet K_SHIFT_6
	K_SHIFT_6 -> { \${1://cuerpo...} }
# K_CTRL_ALT_6
snippet K_CTRL_ALT_6
	K_CTRL_ALT_6 -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_6
snippet K_CTRL_SHIFT_6
	K_CTRL_SHIFT_6 -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_6
snippet K_CTRL_ALT_SHIFT_6
	K_CTRL_ALT_SHIFT_6 -> { \${1://cuerpo...} }

# K_7
snippet K_7
	K_7 -> { \${1://cuerpo...} }
# K_CTRL_7
snippet K_CTRL_7
	K_CTRL_7 -> { \${1://cuerpo...} }
# K_ALT_7
snippet K_ALT_7
	K_ALT_7 -> { \${1://cuerpo...} }
# K_SHIFT_7
snippet K_SHIFT_7
	K_SHIFT_7 -> { \${1://cuerpo...} }
# K_CTRL_ALT_7
snippet K_CTRL_ALT_7
	K_CTRL_ALT_7 -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_7
snippet K_CTRL_SHIFT_7
	K_CTRL_SHIFT_7 -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_7
snippet K_CTRL_ALT_SHIFT_7
	K_CTRL_ALT_SHIFT_7 -> { \${1://cuerpo...} }

# K_8
snippet K_8
	K_8 -> { \${1://cuerpo...} }
# K_CTRL_8
snippet K_CTRL_8
	K_CTRL_8 -> { \${1://cuerpo...} }
# K_ALT_8
snippet K_ALT_8
	K_ALT_8 -> { \${1://cuerpo...} }
# K_SHIFT_8
snippet K_SHIFT_8
	K_SHIFT_8 -> { \${1://cuerpo...} }
# K_CTRL_ALT_8
snippet K_CTRL_ALT_8
	K_CTRL_ALT_8 -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_8
snippet K_CTRL_SHIFT_8
	K_CTRL_SHIFT_8 -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_8
snippet K_CTRL_ALT_SHIFT_8
	K_CTRL_ALT_SHIFT_8 -> { \${1://cuerpo...} }

# K_9
snippet K_9
	K_9 -> { \${1://cuerpo...} }
# K_CTRL_9
snippet K_CTRL_9
	K_CTRL_9 -> { \${1://cuerpo...} }
# K_ALT_9
snippet K_ALT_9
	K_ALT_9 -> { \${1://cuerpo...} }
# K_SHIFT_9
snippet K_SHIFT_9
	K_SHIFT_9 -> { \${1://cuerpo...} }
# K_CTRL_ALT_9
snippet K_CTRL_ALT_9
	K_CTRL_ALT_9 -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_9
snippet K_CTRL_SHIFT_9
	K_CTRL_SHIFT_9 -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_9
snippet K_CTRL_ALT_SHIFT_9
	K_CTRL_ALT_SHIFT_9 -> { \${1://cuerpo...} }

# K_F1
snippet K_F1
	K_F1 -> { \${1://cuerpo...} }
# K_CTRL_F1
snippet K_CTRL_F1
	K_CTRL_F1 -> { \${1://cuerpo...} }
# K_ALT_F1
snippet K_ALT_F1
	K_ALT_F1 -> { \${1://cuerpo...} }
# K_SHIFT_F1
snippet K_SHIFT_F1
	K_SHIFT_F1 -> { \${1://cuerpo...} }
# K_CTRL_ALT_F1
snippet K_CTRL_ALT_F1
	K_CTRL_ALT_F1 -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_F1
snippet K_CTRL_SHIFT_F1
	K_CTRL_SHIFT_F1 -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_F1
snippet K_CTRL_ALT_SHIFT_F1
	K_CTRL_ALT_SHIFT_F1 -> { \${1://cuerpo...} }

# K_F2
snippet K_F2
	K_F2 -> { \${1://cuerpo...} }
# K_CTRL_F2
snippet K_CTRL_F2
	K_CTRL_F2 -> { \${1://cuerpo...} }
# K_ALT_F2
snippet K_ALT_F2
	K_ALT_F2 -> { \${1://cuerpo...} }
# K_SHIFT_F2
snippet K_SHIFT_F2
	K_SHIFT_F2 -> { \${1://cuerpo...} }
# K_CTRL_ALT_F2
snippet K_CTRL_ALT_F2
	K_CTRL_ALT_F2 -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_F2
snippet K_CTRL_SHIFT_F2
	K_CTRL_SHIFT_F2 -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_F2
snippet K_CTRL_ALT_SHIFT_F2
	K_CTRL_ALT_SHIFT_F2 -> { \${1://cuerpo...} }

# K_F3
snippet K_F3
	K_F3 -> { \${1://cuerpo...} }
# K_CTRL_F3
snippet K_CTRL_F3
	K_CTRL_F3 -> { \${1://cuerpo...} }
# K_ALT_F3
snippet K_ALT_F3
	K_ALT_F3 -> { \${1://cuerpo...} }
# K_SHIFT_F3
snippet K_SHIFT_F3
	K_SHIFT_F3 -> { \${1://cuerpo...} }
# K_CTRL_ALT_F3
snippet K_CTRL_ALT_F3
	K_CTRL_ALT_F3 -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_F3
snippet K_CTRL_SHIFT_F3
	K_CTRL_SHIFT_F3 -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_F3
snippet K_CTRL_ALT_SHIFT_F3
	K_CTRL_ALT_SHIFT_F3 -> { \${1://cuerpo...} }

# K_A
snippet K_A
	K_A -> { \${1://cuerpo...} }
# K_CTRL_A
snippet K_CTRL_A
	K_CTRL_A -> { \${1://cuerpo...} }
# K_ALT_A
snippet K_ALT_A
	K_ALT_A -> { \${1://cuerpo...} }
# K_SHIFT_A
snippet K_SHIFT_A
	K_SHIFT_A -> { \${1://cuerpo...} }
# K_CTRL_ALT_A
snippet K_CTRL_ALT_A
	K_CTRL_ALT_A -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_A
snippet K_CTRL_SHIFT_A
	K_CTRL_SHIFT_A -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_A
snippet K_CTRL_ALT_SHIFT_A
	K_CTRL_ALT_SHIFT_A -> { \${1://cuerpo...} }

# K_F5
snippet K_F5
	K_F5 -> { \${1://cuerpo...} }
# K_CTRL_F5
snippet K_CTRL_F5
	K_CTRL_F5 -> { \${1://cuerpo...} }
# K_ALT_F5
snippet K_ALT_F5
	K_ALT_F5 -> { \${1://cuerpo...} }
# K_SHIFT_F5
snippet K_SHIFT_F5
	K_SHIFT_F5 -> { \${1://cuerpo...} }
# K_CTRL_ALT_F5
snippet K_CTRL_ALT_F5
	K_CTRL_ALT_F5 -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_F5
snippet K_CTRL_SHIFT_F5
	K_CTRL_SHIFT_F5 -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_F5
snippet K_CTRL_ALT_SHIFT_F5
	K_CTRL_ALT_SHIFT_F5 -> { \${1://cuerpo...} }

# K_F6
snippet K_F6
	K_F6 -> { \${1://cuerpo...} }
# K_CTRL_F6
snippet K_CTRL_F6
	K_CTRL_F6 -> { \${1://cuerpo...} }
# K_ALT_F6
snippet K_ALT_F6
	K_ALT_F6 -> { \${1://cuerpo...} }
# K_SHIFT_F6
snippet K_SHIFT_F6
	K_SHIFT_F6 -> { \${1://cuerpo...} }
# K_CTRL_ALT_F6
snippet K_CTRL_ALT_F6
	K_CTRL_ALT_F6 -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_F6
snippet K_CTRL_SHIFT_F6
	K_CTRL_SHIFT_F6 -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_F6
snippet K_CTRL_ALT_SHIFT_F6
	K_CTRL_ALT_SHIFT_F6 -> { \${1://cuerpo...} }

# K_F7
snippet K_F7
	K_F7 -> { \${1://cuerpo...} }
# K_CTRL_F7
snippet K_CTRL_F7
	K_CTRL_F7 -> { \${1://cuerpo...} }
# K_ALT_F7
snippet K_ALT_F7
	K_ALT_F7 -> { \${1://cuerpo...} }
# K_SHIFT_F7
snippet K_SHIFT_F7
	K_SHIFT_F7 -> { \${1://cuerpo...} }
# K_CTRL_ALT_F7
snippet K_CTRL_ALT_F7
	K_CTRL_ALT_F7 -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_F7
snippet K_CTRL_SHIFT_F7
	K_CTRL_SHIFT_F7 -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_F7
snippet K_CTRL_ALT_SHIFT_F7
	K_CTRL_ALT_SHIFT_F7 -> { \${1://cuerpo...} }

# K_F8
snippet K_F8
	K_F8 -> { \${1://cuerpo...} }
# K_CTRL_F8
snippet K_CTRL_F8
	K_CTRL_F8 -> { \${1://cuerpo...} }
# K_ALT_F8
snippet K_ALT_F8
	K_ALT_F8 -> { \${1://cuerpo...} }
# K_SHIFT_F8
snippet K_SHIFT_F8
	K_SHIFT_F8 -> { \${1://cuerpo...} }
# K_CTRL_ALT_F8
snippet K_CTRL_ALT_F8
	K_CTRL_ALT_F8 -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_F8
snippet K_CTRL_SHIFT_F8
	K_CTRL_SHIFT_F8 -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_F8
snippet K_CTRL_ALT_SHIFT_F8
	K_CTRL_ALT_SHIFT_F8 -> { \${1://cuerpo...} }

# K_F9
snippet K_F9
	K_F9 -> { \${1://cuerpo...} }
# K_CTRL_F9
snippet K_CTRL_F9
	K_CTRL_F9 -> { \${1://cuerpo...} }
# K_ALT_F9
snippet K_ALT_F9
	K_ALT_F9 -> { \${1://cuerpo...} }
# K_SHIFT_F9
snippet K_SHIFT_F9
	K_SHIFT_F9 -> { \${1://cuerpo...} }
# K_CTRL_ALT_F9
snippet K_CTRL_ALT_F9
	K_CTRL_ALT_F9 -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_F9
snippet K_CTRL_SHIFT_F9
	K_CTRL_SHIFT_F9 -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_F9
snippet K_CTRL_ALT_SHIFT_F9
	K_CTRL_ALT_SHIFT_F9 -> { \${1://cuerpo...} }

# K_F10
snippet K_F10
	K_F10 -> { \${1://cuerpo...} }
# K_CTRL_F10
snippet K_CTRL_F10
	K_CTRL_F10 -> { \${1://cuerpo...} }
# K_ALT_F10
snippet K_ALT_F10
	K_ALT_F10 -> { \${1://cuerpo...} }
# K_SHIFT_F10
snippet K_SHIFT_F10
	K_SHIFT_F10 -> { \${1://cuerpo...} }
# K_CTRL_ALT_F10
snippet K_CTRL_ALT_F10
	K_CTRL_ALT_F10 -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_F10
snippet K_CTRL_SHIFT_F10
	K_CTRL_SHIFT_F10 -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_F10
snippet K_CTRL_ALT_SHIFT_F10
	K_CTRL_ALT_SHIFT_F10 -> { \${1://cuerpo...} }

# K_F11
snippet K_F11
	K_F11 -> { \${1://cuerpo...} }
# K_CTRL_F11
snippet K_CTRL_F11
	K_CTRL_F11 -> { \${1://cuerpo...} }
# K_ALT_F11
snippet K_ALT_F11
	K_ALT_F11 -> { \${1://cuerpo...} }
# K_SHIFT_F11
snippet K_SHIFT_F11
	K_SHIFT_F11 -> { \${1://cuerpo...} }
# K_CTRL_ALT_F11
snippet K_CTRL_ALT_F11
	K_CTRL_ALT_F11 -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_F11
snippet K_CTRL_SHIFT_F11
	K_CTRL_SHIFT_F11 -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_F11
snippet K_CTRL_ALT_SHIFT_F11
	K_CTRL_ALT_SHIFT_F11 -> { \${1://cuerpo...} }

# K_F12
snippet K_F12
	K_F12 -> { \${1://cuerpo...} }
# K_CTRL_F12
snippet K_CTRL_F12
	K_CTRL_F12 -> { \${1://cuerpo...} }
# K_ALT_F12
snippet K_ALT_F12
	K_ALT_F12 -> { \${1://cuerpo...} }
# K_SHIFT_F12
snippet K_SHIFT_F12
	K_SHIFT_F12 -> { \${1://cuerpo...} }
# K_CTRL_ALT_F12
snippet K_CTRL_ALT_F12
	K_CTRL_ALT_F12 -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_F12
snippet K_CTRL_SHIFT_F12
	K_CTRL_SHIFT_F12 -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_F12
snippet K_CTRL_ALT_SHIFT_F12
	K_CTRL_ALT_SHIFT_F12 -> { \${1://cuerpo...} }

# K_RETURN
snippet K_RETURN
	K_RETURN -> { \${1://cuerpo...} }
# K_CTRL_RETURN
snippet K_CTRL_RETURN
	K_CTRL_RETURN -> { \${1://cuerpo...} }
# K_ALT_RETURN
snippet K_ALT_RETURN
	K_ALT_RETURN -> { \${1://cuerpo...} }
# K_SHIFT_RETURN
snippet K_SHIFT_RETURN
	K_SHIFT_RETURN -> { \${1://cuerpo...} }
# K_CTRL_ALT_RETURN
snippet K_CTRL_ALT_RETURN
	K_CTRL_ALT_RETURN -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_RETURN
snippet K_CTRL_SHIFT_RETURN
	K_CTRL_SHIFT_RETURN -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_RETURN
snippet K_CTRL_ALT_SHIFT_RETURN
	K_CTRL_ALT_SHIFT_RETURN -> { \${1://cuerpo...} }

# K_SPACE
snippet K_SPACE
	K_SPACE -> { \${1://cuerpo...} }
# K_CTRL_SPACE
snippet K_CTRL_SPACE
	K_CTRL_SPACE -> { \${1://cuerpo...} }
# K_ALT_SPACE
snippet K_ALT_SPACE
	K_ALT_SPACE -> { \${1://cuerpo...} }
# K_SHIFT_SPACE
snippet K_SHIFT_SPACE
	K_SHIFT_SPACE -> { \${1://cuerpo...} }
# K_CTRL_ALT_SPACE
snippet K_CTRL_ALT_SPACE
	K_CTRL_ALT_SPACE -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_SPACE
snippet K_CTRL_SHIFT_SPACE
	K_CTRL_SHIFT_SPACE -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_SPACE
snippet K_CTRL_ALT_SHIFT_SPACE
	K_CTRL_ALT_SHIFT_SPACE -> { \${1://cuerpo...} }

# K_ESCAPE
snippet K_ESCAPE
	K_ESCAPE -> { \${1://cuerpo...} }
# K_CTRL_ESCAPE
snippet K_CTRL_ESCAPE
	K_CTRL_ESCAPE -> { \${1://cuerpo...} }
# K_ALT_ESCAPE
snippet K_ALT_ESCAPE
	K_ALT_ESCAPE -> { \${1://cuerpo...} }
# K_SHIFT_ESCAPE
snippet K_SHIFT_ESCAPE
	K_SHIFT_ESCAPE -> { \${1://cuerpo...} }
# K_CTRL_ALT_ESCAPE
snippet K_CTRL_ALT_ESCAPE
	K_CTRL_ALT_ESCAPE -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_ESCAPE
snippet K_CTRL_SHIFT_ESCAPE
	K_CTRL_SHIFT_ESCAPE -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_ESCAPE
snippet K_CTRL_ALT_SHIFT_ESCAPE
	K_CTRL_ALT_SHIFT_ESCAPE -> { \${1://cuerpo...} }

# K_BACKSPACE
snippet K_BACKSPACE
	K_BACKSPACE -> { \${1://cuerpo...} }
# K_CTRL_BACKSPACE
snippet K_CTRL_BACKSPACE
	K_CTRL_BACKSPACE -> { \${1://cuerpo...} }
# K_ALT_BACKSPACE
snippet K_ALT_BACKSPACE
	K_ALT_BACKSPACE -> { \${1://cuerpo...} }
# K_SHIFT_BACKSPACE
snippet K_SHIFT_BACKSPACE
	K_SHIFT_BACKSPACE -> { \${1://cuerpo...} }
# K_CTRL_ALT_BACKSPACE
snippet K_CTRL_ALT_BACKSPACE
	K_CTRL_ALT_BACKSPACE -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_BACKSPACE
snippet K_CTRL_SHIFT_BACKSPACE
	K_CTRL_SHIFT_BACKSPACE -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_BACKSPACE
snippet K_CTRL_ALT_SHIFT_BACKSPACE
	K_CTRL_ALT_SHIFT_BACKSPACE -> { \${1://cuerpo...} }

# K_TAB
snippet K_TAB
	K_TAB -> { \${1://cuerpo...} }
# K_CTRL_TAB
snippet K_CTRL_TAB
	K_CTRL_TAB -> { \${1://cuerpo...} }
# K_ALT_TAB
snippet K_ALT_TAB
	K_ALT_TAB -> { \${1://cuerpo...} }
# K_SHIFT_TAB
snippet K_SHIFT_TAB
	K_SHIFT_TAB -> { \${1://cuerpo...} }
# K_CTRL_ALT_TAB
snippet K_CTRL_ALT_TAB
	K_CTRL_ALT_TAB -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_TAB
snippet K_CTRL_SHIFT_TAB
	K_CTRL_SHIFT_TAB -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_TAB
snippet K_CTRL_ALT_SHIFT_TAB
	K_CTRL_ALT_SHIFT_TAB -> { \${1://cuerpo...} }

# K_UP
snippet K_UP
	K_UP -> { \${1://cuerpo...} }
# K_CTRL_UP
snippet K_CTRL_UP
	K_CTRL_UP -> { \${1://cuerpo...} }
# K_ALT_UP
snippet K_ALT_UP
	K_ALT_UP -> { \${1://cuerpo...} }
# K_SHIFT_UP
snippet K_SHIFT_UP
	K_SHIFT_UP -> { \${1://cuerpo...} }
# K_CTRL_ALT_UP
snippet K_CTRL_ALT_UP
	K_CTRL_ALT_UP -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_UP
snippet K_CTRL_SHIFT_UP
	K_CTRL_SHIFT_UP -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_UP
snippet K_CTRL_ALT_SHIFT_UP
	K_CTRL_ALT_SHIFT_UP -> { \${1://cuerpo...} }

# K_DOWN
snippet K_DOWN
	K_DOWN -> { \${1://cuerpo...} }
# K_CTRL_DOWN
snippet K_CTRL_DOWN
	K_CTRL_DOWN -> { \${1://cuerpo...} }
# K_ALT_DOWN
snippet K_ALT_DOWN
	K_ALT_DOWN -> { \${1://cuerpo...} }
# K_SHIFT_DOWN
snippet K_SHIFT_DOWN
	K_SHIFT_DOWN -> { \${1://cuerpo...} }
# K_CTRL_ALT_DOWN
snippet K_CTRL_ALT_DOWN
	K_CTRL_ALT_DOWN -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_DOWN
snippet K_CTRL_SHIFT_DOWN
	K_CTRL_SHIFT_DOWN -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_DOWN
snippet K_CTRL_ALT_SHIFT_DOWN
	K_CTRL_ALT_SHIFT_DOWN -> { \${1://cuerpo...} }

# K_LEFT
snippet K_LEFT
	K_LEFT -> { \${1://cuerpo...} }
# K_CTRL_LEFT
snippet K_CTRL_LEFT
	K_CTRL_LEFT -> { \${1://cuerpo...} }
# K_ALT_LEFT
snippet K_ALT_LEFT
	K_ALT_LEFT -> { \${1://cuerpo...} }
# K_SHIFT_LEFT
snippet K_SHIFT_LEFT
	K_SHIFT_LEFT -> { \${1://cuerpo...} }
# K_CTRL_ALT_LEFT
snippet K_CTRL_ALT_LEFT
	K_CTRL_ALT_LEFT -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_LEFT
snippet K_CTRL_SHIFT_LEFT
	K_CTRL_SHIFT_LEFT -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_LEFT
snippet K_CTRL_ALT_SHIFT_LEFT
	K_CTRL_ALT_SHIFT_LEFT -> { \${1://cuerpo...} }

# K_RIGHT
snippet K_RIGHT
	K_RIGHT -> { \${1://cuerpo...} }
# K_CTRL_RIGHT
snippet K_CTRL_RIGHT
	K_CTRL_RIGHT -> { \${1://cuerpo...} }
# K_ALT_RIGHT
snippet K_ALT_RIGHT
	K_ALT_RIGHT -> { \${1://cuerpo...} }
# K_SHIFT_RIGHT
snippet K_SHIFT_RIGHT
	K_SHIFT_RIGHT -> { \${1://cuerpo...} }
# K_CTRL_ALT_RIGHT
snippet K_CTRL_ALT_RIGHT
	K_CTRL_ALT_RIGHT -> { \${1://cuerpo...} }
# K_CTRL_SHIFT_RIGHT
snippet K_CTRL_SHIFT_RIGHT
	K_CTRL_SHIFT_RIGHT -> { \${1://cuerpo...} }
# K_CTRL_ALT_SHIFT_RIGHT
snippet K_CTRL_ALT_SHIFT_RIGHT
	K_CTRL_ALT_SHIFT_RIGHT -> { \${1://cuerpo...} }

# recorrido (simple)
snippet recorrido (simple)
	\${1:// Ir al inicio}
	while (not \${2:// es último elemento}) {
		\${3:// Procesar el elemento}
		\${4:// Ir al próximo elemento}
	}
	\${5:// Finalizar}

# recorrido (de acumulación)
snippet recorrido (de acumulación)
	\${1:// Ir al inicio}
	\${2:cantidadVistos} := \${3:// contar elementos en lugar actual}
	while (not \${4:// es último elemento}) {
		\${4:// Ir al próximo elemento}
		\${2:cantidadVistos} := \${2:cantidadVistos} + \${3:// contar elementos en lugar actual}
	}
	return (\${2:cantidadVistos})

# recorrido (de búsqueda)
snippet recorrido (de búsqueda)
	\${1:// Ir al inicio}
	while (not \${2:// encontré lo que buscaba}) {
		\${3:// Ir al próximo elemento}
	}
	return (\${2:// encontré lo que buscaba })

# recorrido (de búsqueda con borde)
snippet recorrido (de búsqueda con borde)
	\${1:// Ir al inicio}
	while (not \${2:// encontré lo que buscaba} && not \${3:// es último elemento}) {
		\${4:// Ir al próximo elemento}
	}
	return (\${2:// encontré lo que buscaba })

# recorrido (de tipos enumerativos)
snippet recorrido (de tipos enumerativos)
	\${1:elementoActual} := \${2:minElemento()}
	while (\${1:elementoActual} /= \${3:maxElemento()}) {
		\${4:// Procesar con elemento actual}
		\${1:elementoActual} := siguiente(\${1:elementoActual})
	}
	\${4:// Procesar con elemento actual}

# recorrido (de búsqueda sobre lista)
snippet recorrido (de búsqueda sobre lista)
	\${1:listaRecorrida} := \${2:lista}
	while (primero(\${1:listaRecorrida}) /= \${3://elemento buscado}) {
		\${1:elementoActual} := sinElPrimero(\${1:elementoActual})
	}
	return (primero(\${1:listaRecorrida}))

# recorrido (de búsqueda sobre lista con borde)
snippet recorrido (de búsqueda sobre lista con borde)
	\${1:listaRecorrida} := \${2:lista}
	while (not esVacía(\${1:listaRecorrida}) && primero(\${1:listaRecorrida}) /= \${3://elemento buscado}) {
		\${1:elementoActual} := sinElPrimero(\${1:elementoActual})
	}
	return (not esVacía(\${1:listaRecorrida}))

# docs (procedimiento)
snippet docs (procedimiento)
	/*
		@PROPÓSITO: \${1:...}
		@PRECONDICIÓN: \${2:...}
	*/

# docs (procedimiento con parámetros)
snippet docs (procedimiento con parámetros)
	/*
		@PROPÓSITO: \${1:...}
		@PRECONDICIÓN: \${2:...}
		@PARÁMETROS:
				* \${3:nombreDelParámetro} : \${4:Tipo} - \${5:descripción}
	*/

# docs (función)
snippet docs (función)
	/*
		@PROPÓSITO: \${1:...}
		@PRECONDICIÓN: \${2:...}
		@TIPO: \${3:...}
	*/

# docs (función con parámetros)
snippet docs (función con parámetros)
	/*
		@PROPÓSITO: \${1:...}
		@PRECONDICIÓN: \${2:...}
		@PARÁMETROS:
				* \${3:nombreDelParámetro} : \${4:Tipo} - \${5:descripción}
		@TIPO: \${6:...}
	*/
`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFBbUIsaUJBQWlCLFFBQVEscUJBQXFCO0FBQ2pFLEtBQUssa0JBQWtCLG1CQUFtQixpQkFBaUI7QUFDM0Q7QUFDQSxvQkFBb0IsaUJBQWlCOztBQUVyQztBQUNBO0FBQ0EsSUFBSSxrQkFBa0IsTUFBTTtBQUM1Qix1QkFBdUIsaUJBQWlCLGdCQUFnQixpQkFBaUIsUUFBUSxxQkFBcUI7QUFDdEcsS0FBSyxrQkFBa0IsbUJBQW1CLGlCQUFpQjtBQUMzRDtBQUNBLHdCQUF3QixpQkFBaUI7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixvQkFBb0I7QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLG9CQUFvQjtBQUNwQjtBQUNBLFNBQVMsc0JBQXNCLEtBQUssUUFBUSxLQUFLO0FBQ2pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixvQkFBb0I7QUFDcEIsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixvQkFBb0I7QUFDcEI7QUFDQSxTQUFTLHNCQUFzQixLQUFLLFFBQVEsS0FBSztBQUNqRCxZQUFZO0FBQ1o7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL3NuaXBwZXRzL2dvYnN0b25lcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9zbmlwcGV0cy9nb2JzdG9uZXMuc25pcHBldHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuc25pcHBldFRleHQgPSByZXF1aXJlKFwiLi9nb2JzdG9uZXMuc25pcHBldHNcIik7XG5leHBvcnRzLnNjb3BlID0gXCJnb2JzdG9uZXNcIjtcbiIsIm1vZHVsZS5leHBvcnRzID0gYCMgc2NvcGU6IGdvYnN0b25lc1xuXG4jIHByb2dyYW1cbnNuaXBwZXQgcHJvZ3JhbVxuXHRwcm9ncmFtIHtcblx0XHRcXCR7MTovLyBjdWVycG8uLi59XG5cdH1cblxuIyBpbnRlcmFjdGl2ZSBwcm9ncmFtXG5zbmlwcGV0IGludGVyYWN0aXZlIHByb2dyYW1cblx0aW50ZXJhY3RpdmUgcHJvZ3JhbSB7XG5cdFx0XFwkezE6SU5JVH0gLT4geyBcXCR7MjovLyBjdWVycG8uLi59IH1cblx0XHRcXCR7MzpUSU1FT1VUKFxcJHs0OjUwMDB9KSAtPiB7IFxcJHs1Oi8vIGN1ZXJwby4uLn0gfVxuXHRcdFxcJHs2OktfRU5URVJ9IC0+IHsgXFwkezc6Ly8gY3VlcnBvLi4ufSB9XG5cdFx0XyAtPiB7fVxuXHR9XG5cbiMgcHJvY2VkdXJlXG5zbmlwcGV0IHByb2NlZHVyZVxuXHRwcm9jZWR1cmUgXFwkezE6Tm9tYnJlfShcXCR7MjpwYXJhbWV0cm9zfSkge1xuXHRcdFxcJHszOi8vIGN1ZXJwby4uLn1cblx0fVxuXG4jIGZ1bmN0aW9uXG5zbmlwcGV0IGZ1bmN0aW9uXG5cdGZ1bmN0aW9uIFxcJHsxOm5vbWJyZX0oXFwkezI6cGFyYW1ldHJvc30pIHtcblx0XHRyZXR1cm4gKFxcJHszOmV4cHJlc2nDs24uLn0pXG5cdH1cblxuIyByZXR1cm5cbnNuaXBwZXQgcmV0dXJuXG5cdHJldHVybiAoXFwkezE6ZXhwcmVzacOzbi4uLn0pXG5cbiMgdHlwZVxuc25pcHBldCB0eXBlXG5cdHR5cGUgXFwkezE6Tm9tYnJlfVxuXG4jIGlzIHZhcmlhbnRcbnNuaXBwZXQgaXMgdmFyaWFudFxuXHRpcyB2YXJpYW50IHtcblx0XHRjYXNlIFxcJHsxOk5vbWJyZURlbFZhbG9yMX0ge31cblx0XHRjYXNlIFxcJHsyOk5vbWJyZURlbFZhbG9yMn0ge31cblx0XHRjYXNlIFxcJHszOk5vbWJyZURlbFZhbG9yM30ge31cblx0XHRjYXNlIFxcJHs0Ok5vbWJyZURlbFZhbG9yNH0ge31cblx0fVxuXG4jIGlzIHJlY29yZFxuc25pcHBldCBpcyByZWNvcmRcblx0aXMgcmVjb3JkIHtcblx0XHRmaWVsZCBcXCR7MTpjYW1wbzF9IC8vIFxcJHsyOlRpcG99XG5cdFx0ZmllbGQgXFwkezM6Y2FtcG8yfSAvLyBcXCR7NDpUaXBvfVxuXHRcdGZpZWxkIFxcJHs1OmNhbXBvM30gLy8gXFwkezY6VGlwb31cblx0XHRmaWVsZCBcXCR7NzpjYW1wbzR9IC8vIFxcJHs4OlRpcG99XG5cdH1cblxuIyB0eXBlIF8gaXMgdmFyaWFudFxuc25pcHBldCB0eXBlIF8gaXMgdmFyaWFudFxuXHR0eXBlIFxcJHsxOk5vbWJyZX0gaXMgdmFyaWFudCB7XG5cdFx0Y2FzZSBcXCR7MjpOb21icmVEZWxWYWxvcjF9IHt9XG5cdFx0Y2FzZSBcXCR7MzpOb21icmVEZWxWYWxvcjJ9IHt9XG5cdFx0Y2FzZSBcXCR7NDpOb21icmVEZWxWYWxvcjN9IHt9XG5cdFx0Y2FzZSBcXCR7NTpOb21icmVEZWxWYWxvcjR9IHt9XG5cdH1cblxuIyB0eXBlIF8gaXMgcmVjb3JkXG5zbmlwcGV0IHR5cGUgXyBpcyByZWNvcmRcblx0dHlwZSBcXCR7MTpOb21icmV9IGlzIHJlY29yZCB7XG5cdFx0ZmllbGQgXFwkezI6Y2FtcG8xfSAvLyBcXCR7MzpUaXBvfVxuXHRcdGZpZWxkIFxcJHs0OmNhbXBvMn0gLy8gXFwkezU6VGlwb31cblx0XHRmaWVsZCBcXCR7NjpjYW1wbzN9IC8vIFxcJHs3OlRpcG99XG5cdFx0ZmllbGQgXFwkezg6Y2FtcG80fSAvLyBcXCR7OTpUaXBvfVxuXHR9XG5cbiMgcmVwZWF0XG5zbmlwcGV0IHJlcGVhdFxuXHRyZXBlYXQgXFwkezE6Y2FudGlkYWR9IHtcblx0XHRcXCR7MjovLyBjdWVycG8uLi59XG5cdH1cblxuIyBmb3JlYWNoXG5zbmlwcGV0IGZvcmVhY2hcblx0Zm9yZWFjaCBcXCR7MTrDrW5kaWNlfSBpbiBcXCR7MjpsaXN0YX0ge1xuXHRcdFxcJHszOi8vIGN1ZXJwby4uLn1cblx0fVxuXG4jIHdoaWxlXG5zbmlwcGV0IHdoaWxlXG5cdHdoaWxlIChcXCR7MT86Y29uZGljacOzbn0pIHtcblx0XHRcXCR7MjovLyBjdWVycG8uLi59XG5cdH1cblxuIyBpZlxuc25pcHBldCBpZlxuXHRpZiAoXFwkezE/OmNvbmRpY2nDs259KSB7XG5cdFx0XFwkezI6Ly8gY3VlcnBvLi4ufVxuXHR9XG5cbiMgZWxzZWlmXG5zbmlwcGV0IGVsc2VpZlxuXHRlbHNlaWYgKFxcJHsxPzpjb25kaWNpw7NufSkge1xuXHRcdFxcJHsyOi8vIGN1ZXJwby4uLn1cblx0fVxuXG4jIGVsc2VcbnNuaXBwZXQgZWxzZVxuXHRlbHNlIHtcblx0XHRcXCR7MTovLyBjdWVycG8uLi59XG5cdH1cblxuIyBpZiAoY29uIGVsc2UpXG5zbmlwcGV0IGlmIChjb24gZWxzZSlcblx0aWYgKFxcJHsxOmNvbmRpY2nDs259KSB7XG5cdFx0XFwkezI6Ly8gY3VlcnBvLi4ufVxuXHR9IGVsc2Uge1xuXHRcdFxcJHszOi8vIGN1ZXJwby4uLi59XG5cdH1cblxuIyBpZiAoY29uIGVsc2VpZilcbnNuaXBwZXQgaWYgKGNvbiBlbHNlaWYpXG5cdGlmIChcXCR7MTpjb25kaWNpw7NufSkge1xuXHRcdFxcJHsyOi8vIGN1ZXJwby4uLn1cblx0fSBlbHNlaWYgKFxcJHszOmNvbmRpY2nDs259KSB7XG5cdFx0XFwkezQ6Ly8gY3VlcnBvLi4ufVxuXHR9XG5cbiMgaWYgKGNvbiBlbHNlaWYgeSBlbHNlKVxuc25pcHBldCBpZiAoY29uIGVsc2VpZiB5IGVsc2UpXG5cdGlmIChcXCR7MTpjb25kaWNpw7NufSkge1xuXHRcdFxcJHsyOi8vIGN1ZXJwby4uLn1cblx0fSBlbHNlaWYgKFxcJHszOmNvbmRpY2nDs259KSB7XG5cdFx0XFwkezQ6Ly8gY3VlcnBvLi4ufVxuXHR9IGVsc2Uge1xuXHRcdFxcJHs1Oi8vIGN1ZXJwby4uLi59XG5cdH1cblxuIyBpZiAoY29uIDMgZWxzZWlmKVxuc25pcHBldCBpZiAoY29uIDMgZWxzZWlmKVxuXHRpZiAoXFwkezE6Y29uZGljacOzbn0pIHtcblx0XHRcXCR7MjovLyBjdWVycG8uLi59XG5cdH0gZWxzZWlmIChcXCR7Mzpjb25kaWNpw7NufSkge1xuXHRcdFxcJHs0Oi8vIGN1ZXJwby4uLn1cblx0fSBlbHNlaWYgKFxcJHs1OmNvbmRpY2nDs259KSB7XG5cdFx0XFwkezY6Ly8gY3VlcnBvLi4ufVxuXHR9IGVsc2VpZiAoXFwkezc6Y29uZGljacOzbn0pIHtcblx0XHRcXCR7ODovLyBjdWVycG8uLi59XG5cdH1cblxuIyBjaG9vc2UgKDIgdmFsb3JlcylcbnNuaXBwZXQgY2hvb3NlICgyIHZhbG9yZXMpXG5cdGNob29zZVxuXHRcdFxcJHsxOlZhbG9yMX0gd2hlbiAoXFwkezI6Y29uZGljacOzbn0pXG5cdFx0XFwkezM6VmFsb3IyfSBvdGhlcndpc2VcblxuIyBjaG9vc2UgKDIgdmFsb3JlcyB5IGJvb20pXG5zbmlwcGV0IGNob29zZSAoMiB2YWxvcmVzIHkgYm9vbSlcblx0Y2hvb3NlXG5cdFx0XFwkezE6VmFsb3IxfSB3aGVuIChcXCR7Mjpjb25kaWNpw7NufSlcblx0XHRcXCR7MzpWYWxvcjJ9IHdoZW4gKFxcJHs0OmNvbmRpY2nDs259KVxuXHRcdFxcJHs1OlZhbG9yM30gd2hlbiAoXFwkezY6Y29uZGljacOzbn0pXG5cdFx0XFwkezc6VmFsb3I0fSB3aGVuIChcXCR7ODpjb25kaWNpw7NufSlcblx0XHRib29tKFwiXFwkezk6Tm8gZXMgdW4gdmFsb3IgdsOhbGlkb31cIikgb3RoZXJ3aXNlXG5cbiMgbWF0Y2hpbmcgKDQgdmFsb3JlcylcbnNuaXBwZXQgbWF0Y2hpbmcgKDQgdmFsb3Jlcylcblx0bWF0Y2hpbmcgKFxcJHsxOnZhcmlhYmxlfSkgc2VsZWN0XG5cdFx0XFwkezI6VmFsb3IxfSBvbiBcXCR7MzpvcGNpw7NuMX1cblx0XHRcXCR7NDpWYWxvcjJ9IG9uIFxcJHs1Om9wY2nDs24yfVxuXHRcdFxcJHs2OlZhbG9yM30gb24gXFwkezc6b3BjacOzbjN9XG5cdFx0XFwkezg6VmFsb3I0fSBvbiBcXCR7OTpvcGNpw7NuNH1cblx0XHRib29tKFwiXFwkezEwOk5vIGVzIHVuIHZhbG9yIHbDoWxpZG99XCIpIG90aGVyd2lzZVxuXG4jIHNlbGVjdCAoNCBjYXNvcylcbnNuaXBwZXQgc2VsZWN0ICg0IGNhc29zKVxuXHRzZWxlY3Rcblx0XHRcXCR7MTpWYWxvcjF9IG9uIChcXCR7MjpvcGNpw7NuMX0pXG5cdFx0XFwkezM6VmFsb3IyfSBvbiAoXFwkezQ6b3BjacOzbjJ9KVxuXHRcdFxcJHs1OlZhbG9yM30gb24gKFxcJHs2Om9wY2nDs24zfSlcblx0XHRcXCR7NzpWYWxvcjR9IG9uIChcXCR7ODpvcGNpw7NuNH0pXG5cdFx0Ym9vbShcIlxcJHs5Ok5vIGVzIHVuIHZhbG9yIHbDoWxpZG99XCIpIG90aGVyd2lzZVxuXG4jIHN3aXRjaFxuc25pcHBldCBzd2l0Y2hcblx0c3dpdGNoIChcXCR7MTp2YXJpYWJsZX0pIHtcblx0XHRcXCR7MjpWYWxvcjF9IC0+IHtcXCR7MzovLyBjdWVycG8uLi59fVxuXHRcdFxcJHs0OlZhbG9yMn0gLT4ge1xcJHs1Oi8vIGN1ZXJwby4uLn19XG5cdFx0XFwkezY6VmFsb3IzfSAtPiB7XFwkezc6Ly8gY3VlcnBvLi4ufX1cblx0XHRcXCR7ODpWYWxvcjR9IC0+IHtcXCR7OTovLyBjdWVycG8uLi59fVxuXHRcdF8gLT4ge1xcJHsxMDovLyBjdWVycG8uLi59fVxuXHR9XG5cbiMgUG9uZXJcbnNuaXBwZXQgUG9uZXJcblx0UG9uZXIoXFwkezE6Y29sb3J9KVxuXG4jIFNhY2FyXG5zbmlwcGV0IFNhY2FyXG5cdFNhY2FyKFxcJHsxOmNvbG9yfSlcblxuIyBNb3Zlclxuc25pcHBldCBNb3ZlclxuXHRNb3ZlcihcXCR7MTpkaXJlY2Npw7NufSlcblxuIyBJckFsQm9yZGVcbnNuaXBwZXQgSXJBbEJvcmRlXG5cdElyQWxCb3JkZShcXCR7MTpkaXJlY2Npw7NufSlcblxuIyBWYWNpYXJUYWJsZXJvXG5zbmlwcGV0IFZhY2lhclRhYmxlcm9cblx0VmFjaWFyVGFibGVybygpXG5cbiMgQk9PTVxuc25pcHBldCBCT09NXG5cdEJPT00oXCJcXCR7MTpNZW5zYWplIGRlIGVycm9yfVwiKVxuXG4jIGhheUJvbGl0YXNcbnNuaXBwZXQgaGF5Qm9saXRhc1xuXHRoYXlCb2xpdGFzKFxcJHsxOmNvbG9yfSlcblxuIyBucm9Cb2xpdGFzXG5zbmlwcGV0IG5yb0JvbGl0YXNcblx0bnJvQm9saXRhcyhcXCR7MTpjb2xvcn0pXG5cbiMgcHVlZGVNb3Zlclxuc25pcHBldCBwdWVkZU1vdmVyXG5cdHB1ZWRlTW92ZXIoXFwkezE6ZGlyZWNjacOzbn0pXG5cbiMgc2lndWllbnRlXG5zbmlwcGV0IHNpZ3VpZW50ZVxuXHRzaWd1aWVudGUoXFwkezE6Y29sb3J8ZGlyZWNjacOzbn0pXG5cbiMgcHJldmlvXG5zbmlwcGV0IHByZXZpb1xuXHRwcmV2aW8oXFwkezE6Y29sb3J8ZGlyZWNjacOzbn0pXG5cbiMgb3B1ZXN0b1xuc25pcHBldCBvcHVlc3RvXG5cdG9wdWVzdG8oXFwkezE6ZGlyZWNjacOzbn0pXG5cbiMgbWluRGlyXG5zbmlwcGV0IG1pbkRpclxuXHRtaW5EaXIoKVxuXG4jIG1heERpclxuc25pcHBldCBtYXhEaXJcblx0bWF4RGlyKClcblxuIyBtaW5Db2xvclxuc25pcHBldCBtaW5Db2xvclxuXHRtaW5EaXIoKVxuXG4jIG1heENvbG9yXG5zbmlwcGV0IG1heENvbG9yXG5cdG1heERpcigpXG5cbiMgbWluQm9vbFxuc25pcHBldCBtaW5Cb29sXG5cdG1pbkJvb2woKVxuXG4jIG1heEJvb2xcbnNuaXBwZXQgbWF4Qm9vbFxuXHRtYXhCb29sKClcblxuIyBwcmltZXJvXG5zbmlwcGV0IHByaW1lcm9cblx0cHJpbWVybyhcXCR7MTpsaXN0YX0pXG5cbiMgc2luRWxQcmltZXJvXG5zbmlwcGV0IHNpbkVsUHJpbWVyb1xuXHRzaW5FbFByaW1lcm8oXFwkezE6bGlzdGF9KVxuXG4jIGVzVmFjw61hXG5zbmlwcGV0IGVzVmFjw61hXG5cdGVzVmFjw61hKFxcJHsxOmxpc3RhfSlcblxuIyBib29tXG5zbmlwcGV0IGJvb21cblx0Ym9vbShcIlxcJHsxOk1lbnNhamUgZGUgZXJyb3J9XCIpXG5cbiMgQXp1bFxuc25pcHBldCBBenVsXG5cdEF6dWxcblxuIyBOZWdyb1xuc25pcHBldCBOZWdyb1xuXHROZWdyb1xuXG4jIFJvam9cbnNuaXBwZXQgUm9qb1xuXHRSb2pvXG5cbiMgVmVyZGVcbnNuaXBwZXQgVmVyZGVcblx0VmVyZGVcblxuIyBOb3J0ZVxuc25pcHBldCBOb3J0ZVxuXHROb3J0ZVxuXG4jIEVzdGVcbnNuaXBwZXQgRXN0ZVxuXHRFc3RlXG5cbiMgU3VyXG5zbmlwcGV0IFN1clxuXHRTdXJcblxuIyBPZXN0ZVxuc25pcHBldCBPZXN0ZVxuXHRPZXN0ZVxuXG4jIFRydWVcbnNuaXBwZXQgVHJ1ZVxuXHRUcnVlXG5cbiMgRmFsc2VcbnNuaXBwZXQgRmFsc2Vcblx0RmFsc2VcblxuIyBJTklUXG5zbmlwcGV0IElOSVRcblx0SU5JVCAtPiB7XFwkMTovLyBjdWVycG8uLi59XG5cbiMgVElNRU9VVFxuc25pcHBldCBUSU1FT1VUXG5cdFRJTUVPVVQoXFwkezE6NTAwMH0pIC0+IHtcXCQyOi8vIGN1ZXJwby4uLn1cblxuIyBLX0FcbnNuaXBwZXQgS19BXG5cdEtfQSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BXG5zbmlwcGV0IEtfQ1RSTF9BXG5cdEtfQ1RSTF9BIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19BTFRfQVxuc25pcHBldCBLX0FMVF9BXG5cdEtfQUxUX0EgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX1NISUZUX0FcbnNuaXBwZXQgS19TSElGVF9BXG5cdEtfU0hJRlRfQSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfQVxuc25pcHBldCBLX0NUUkxfQUxUX0Fcblx0S19DVFJMX0FMVF9BIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX1NISUZUX0FcbnNuaXBwZXQgS19DVFJMX1NISUZUX0Fcblx0S19DVFJMX1NISUZUX0EgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX1NISUZUX0FcbnNuaXBwZXQgS19DVFJMX0FMVF9TSElGVF9BXG5cdEtfQ1RSTF9BTFRfU0hJRlRfQSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG5cbiMgS19CXG5zbmlwcGV0IEtfQlxuXHRLX0IgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQlxuc25pcHBldCBLX0NUUkxfQlxuXHRLX0NUUkxfQiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQUxUX0JcbnNuaXBwZXQgS19BTFRfQlxuXHRLX0FMVF9CIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19TSElGVF9CXG5zbmlwcGV0IEtfU0hJRlRfQlxuXHRLX1NISUZUX0IgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX0JcbnNuaXBwZXQgS19DVFJMX0FMVF9CXG5cdEtfQ1RSTF9BTFRfQiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9TSElGVF9CXG5zbmlwcGV0IEtfQ1RSTF9TSElGVF9CXG5cdEtfQ1RSTF9TSElGVF9CIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19BTFRfU0hJRlRfQ1xuc25pcHBldCBLX0FMVF9TSElGVF9DXG5cdEtfQUxUX1NISUZUX0MgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQkxUX1NISUZUX0JcbnNuaXBwZXQgS19DVFJMX0JMVF9TSElGVF9CXG5cdEtfQ1RSTF9BTFRfU0hJRlRfQiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG5cbiMgS19DXG5zbmlwcGV0IEtfQ1xuXHRLX0MgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQ1xuc25pcHBldCBLX0NUUkxfQ1xuXHRLX0NUUkxfQyAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQUxUX0NcbnNuaXBwZXQgS19BTFRfQ1xuXHRLX0FMVF9DIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19TSElGVF9DXG5zbmlwcGV0IEtfU0hJRlRfQ1xuXHRLX1NISUZUX0MgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX0NcbnNuaXBwZXQgS19DVFJMX0FMVF9DXG5cdEtfQ1RSTF9BTFRfQyAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9TSElGVF9DXG5zbmlwcGV0IEtfQ1RSTF9TSElGVF9DXG5cdEtfQ1RSTF9TSElGVF9DIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19BTFRfU0hJRlRfQ1xuc25pcHBldCBLX0FMVF9TSElGVF9DXG5cdEtfQUxUX1NISUZUX0MgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX1NISUZUX0NcbnNuaXBwZXQgS19DVFJMX0FMVF9TSElGVF9DXG5cdEtfQ1RSTF9BTFRfU0hJRlRfQyAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG5cbiMgS19EXG5zbmlwcGV0IEtfRFxuXHRLX0QgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfRFxuc25pcHBldCBLX0NUUkxfRFxuXHRLX0NUUkxfRCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQUxUX0RcbnNuaXBwZXQgS19BTFRfRFxuXHRLX0RMVF9EIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19TSElGVF9EXG5zbmlwcGV0IEtfU0hJRlRfRFxuXHRLX1NISUZUX0QgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX0RcbnNuaXBwZXQgS19DVFJMX0FMVF9EXG5cdEtfQ1RSTF9ETFRfRCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9TSElGVF9EXG5zbmlwcGV0IEtfQ1RSTF9TSElGVF9EXG5cdEtfQ1RSTF9TSElGVF9EIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19BTFRfU0hJRlRfRFxuc25pcHBldCBLX0FMVF9TSElGVF9EXG5cdEtfQUxUX1NISUZUX0QgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfRExUX1NISUZUX0RcbnNuaXBwZXQgS19DVFJMX0RMVF9TSElGVF9EXG5cdEtfQ1RSTF9BTFRfU0hJRlRfRCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG5cbiMgS19FXG5zbmlwcGV0IEtfRVxuXHRLX0UgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfRVxuc25pcHBldCBLX0NUUkxfRVxuXHRLX0NUUkxfRSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQUxUX0VcbnNuaXBwZXQgS19BTFRfRVxuXHRLX0FMVF9FIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19TSElGVF9FXG5zbmlwcGV0IEtfU0hJRlRfRVxuXHRLX1NISUZUX0UgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX0VcbnNuaXBwZXQgS19DVFJMX0FMVF9FXG5cdEtfQ1RSTF9BTFRfRSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9TSElGVF9FXG5zbmlwcGV0IEtfQ1RSTF9TSElGVF9FXG5cdEtfQ1RSTF9TSElGVF9FIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9TSElGVF9FXG5zbmlwcGV0IEtfQ1RSTF9BTFRfU0hJRlRfRVxuXHRLX0NUUkxfQUxUX1NISUZUX0UgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuXG4jIEtfRlxuc25pcHBldCBLX0Zcblx0S19GIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0ZcbnNuaXBwZXQgS19DVFJMX0Zcblx0S19DVFJMX0YgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0FMVF9GXG5zbmlwcGV0IEtfQUxUX0Zcblx0S19BTFRfRiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfU0hJRlRfRlxuc25pcHBldCBLX1NISUZUX0Zcblx0S19TSElGVF9GIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9GXG5zbmlwcGV0IEtfQ1RSTF9BTFRfRlxuXHRLX0NUUkxfQUxUX0YgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfU0hJRlRfRlxuc25pcHBldCBLX0NUUkxfU0hJRlRfRlxuXHRLX0NUUkxfU0hJRlRfRiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfU0hJRlRfRlxuc25pcHBldCBLX0NUUkxfQUxUX1NISUZUX0Zcblx0S19DVFJMX0FMVF9TSElGVF9GIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cblxuIyBLX0dcbnNuaXBwZXQgS19HXG5cdEtfRyAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9HXG5zbmlwcGV0IEtfQ1RSTF9HXG5cdEtfQ1RSTF9HIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19BTFRfR1xuc25pcHBldCBLX0FMVF9HXG5cdEtfQUxUX0cgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX1NISUZUX0dcbnNuaXBwZXQgS19TSElGVF9HXG5cdEtfU0hJRlRfRyAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfR1xuc25pcHBldCBLX0NUUkxfQUxUX0dcblx0S19DVFJMX0FMVF9HIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX1NISUZUX0dcbnNuaXBwZXQgS19DVFJMX1NISUZUX0dcblx0S19DVFJMX1NISUZUX0cgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX1NISUZUX0dcbnNuaXBwZXQgS19DVFJMX0FMVF9TSElGVF9HXG5cdEtfQ1RSTF9BTFRfU0hJRlRfRyAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG5cbiMgS19IXG5zbmlwcGV0IEtfSFxuXHRLX0ggLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfSFxuc25pcHBldCBLX0NUUkxfSFxuXHRLX0NUUkxfSCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQUxUX0hcbnNuaXBwZXQgS19BTFRfSFxuXHRLX0FMVF9IIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19TSElGVF9IXG5zbmlwcGV0IEtfU0hJRlRfSFxuXHRLX1NISUZUX0ggLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX0hcbnNuaXBwZXQgS19DVFJMX0FMVF9IXG5cdEtfQ1RSTF9BTFRfSCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9TSElGVF9IXG5zbmlwcGV0IEtfQ1RSTF9TSElGVF9IXG5cdEtfQ1RSTF9TSElGVF9IIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9TSElGVF9IXG5zbmlwcGV0IEtfQ1RSTF9BTFRfU0hJRlRfSFxuXHRLX0NUUkxfQUxUX1NISUZUX0ggLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuXG4jIEtfSVxuc25pcHBldCBLX0lcblx0S19JIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0lcbnNuaXBwZXQgS19DVFJMX0lcblx0S19DVFJMX0kgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0FMVF9JXG5zbmlwcGV0IEtfQUxUX0lcblx0S19BTFRfSSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfU0hJRlRfSVxuc25pcHBldCBLX1NISUZUX0lcblx0S19TSElGVF9JIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9JXG5zbmlwcGV0IEtfQ1RSTF9BTFRfSVxuXHRLX0NUUkxfQUxUX0kgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfU0hJRlRfSVxuc25pcHBldCBLX0NUUkxfU0hJRlRfSVxuXHRLX0NUUkxfU0hJRlRfSSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfU0hJRlRfSVxuc25pcHBldCBLX0NUUkxfQUxUX1NISUZUX0lcblx0S19DVFJMX0FMVF9TSElGVF9JIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cblxuIyBLX0pcbnNuaXBwZXQgS19KXG5cdEtfSiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9KXG5zbmlwcGV0IEtfQ1RSTF9KXG5cdEtfQ1RSTF9KIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19BTFRfSlxuc25pcHBldCBLX0FMVF9KXG5cdEtfQUxUX0ogLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX1NISUZUX0pcbnNuaXBwZXQgS19TSElGVF9KXG5cdEtfU0hJRlRfSiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfSlxuc25pcHBldCBLX0NUUkxfQUxUX0pcblx0S19DVFJMX0FMVF9KIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX1NISUZUX0pcbnNuaXBwZXQgS19DVFJMX1NISUZUX0pcblx0S19DVFJMX1NISUZUX0ogLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX1NISUZUX0pcbnNuaXBwZXQgS19DVFJMX0FMVF9TSElGVF9KXG5cdEtfQ1RSTF9BTFRfU0hJRlRfSiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG5cbiMgS19LXG5zbmlwcGV0IEtfS1xuXHRLX0sgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfS1xuc25pcHBldCBLX0NUUkxfS1xuXHRLX0NUUkxfSyAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQUxUX0tcbnNuaXBwZXQgS19BTFRfS1xuXHRLX0FMVF9LIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19TSElGVF9LXG5zbmlwcGV0IEtfU0hJRlRfS1xuXHRLX1NISUZUX0sgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX0tcbnNuaXBwZXQgS19DVFJMX0FMVF9LXG5cdEtfQ1RSTF9BTFRfSyAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9TSElGVF9LXG5zbmlwcGV0IEtfQ1RSTF9TSElGVF9LXG5cdEtfQ1RSTF9TSElGVF9LIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9TSElGVF9LXG5zbmlwcGV0IEtfQ1RSTF9BTFRfU0hJRlRfS1xuXHRLX0NUUkxfQUxUX1NISUZUX0sgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuXG4jIEtfTFxuc25pcHBldCBLX0xcblx0S19MIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0xcbnNuaXBwZXQgS19DVFJMX0xcblx0S19DVFJMX0wgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0FMVF9MXG5zbmlwcGV0IEtfQUxUX0xcblx0S19BTFRfTCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfU0hJRlRfTFxuc25pcHBldCBLX1NISUZUX0xcblx0S19TSElGVF9MIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9MXG5zbmlwcGV0IEtfQ1RSTF9BTFRfTFxuXHRLX0NUUkxfQUxUX0wgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfU0hJRlRfTFxuc25pcHBldCBLX0NUUkxfU0hJRlRfTFxuXHRLX0NUUkxfU0hJRlRfTCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfU0hJRlRfTFxuc25pcHBldCBLX0NUUkxfQUxUX1NISUZUX0xcblx0S19DVFJMX0FMVF9TSElGVF9MIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cblxuIyBLX01cbnNuaXBwZXQgS19NXG5cdEtfTSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9NXG5zbmlwcGV0IEtfQ1RSTF9NXG5cdEtfQ1RSTF9NIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19BTFRfTVxuc25pcHBldCBLX0FMVF9NXG5cdEtfQUxUX00gLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX1NISUZUX01cbnNuaXBwZXQgS19TSElGVF9NXG5cdEtfU0hJRlRfTSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfTVxuc25pcHBldCBLX0NUUkxfQUxUX01cblx0S19DVFJMX0FMVF9NIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX1NISUZUX01cbnNuaXBwZXQgS19DVFJMX1NISUZUX01cblx0S19DVFJMX1NISUZUX00gLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX1NISUZUX01cbnNuaXBwZXQgS19DVFJMX0FMVF9TSElGVF9NXG5cdEtfQ1RSTF9BTFRfU0hJRlRfTSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG5cbiMgS19OXG5zbmlwcGV0IEtfTlxuXHRLX04gLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfTlxuc25pcHBldCBLX0NUUkxfTlxuXHRLX0NUUkxfTiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQUxUX05cbnNuaXBwZXQgS19BTFRfTlxuXHRLX0FMVF9OIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19TSElGVF9OXG5zbmlwcGV0IEtfU0hJRlRfTlxuXHRLX1NISUZUX04gLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX05cbnNuaXBwZXQgS19DVFJMX0FMVF9OXG5cdEtfQ1RSTF9BTFRfTiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9TSElGVF9OXG5zbmlwcGV0IEtfQ1RSTF9TSElGVF9OXG5cdEtfQ1RSTF9TSElGVF9OIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9TSElGVF9OXG5zbmlwcGV0IEtfQ1RSTF9BTFRfU0hJRlRfTlxuXHRLX0NUUkxfQUxUX1NISUZUX04gLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuXG4jIEtfw5FcbnNuaXBwZXQgS1/DkVxuXHRLX8ORIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX8ORXG5zbmlwcGV0IEtfQ1RSTF/DkVxuXHRLX0NUUkxfw5EgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0FMVF/DkVxuc25pcHBldCBLX0FMVF/DkVxuXHRLX0FMVF/DkSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfU0hJRlRfw5FcbnNuaXBwZXQgS19TSElGVF/DkVxuXHRLX1NISUZUX8ORIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF/DkVxuc25pcHBldCBLX0NUUkxfQUxUX8ORXG5cdEtfQ1RSTF9BTFRfw5EgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfU0hJRlRfw5FcbnNuaXBwZXQgS19DVFJMX1NISUZUX8ORXG5cdEtfQ1RSTF9TSElGVF/DkSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfU0hJRlRfw5FcbnNuaXBwZXQgS19DVFJMX0FMVF9TSElGVF/DkVxuXHRLX0NUUkxfQUxUX1NISUZUX8ORIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cblxuIyBLX09cbnNuaXBwZXQgS19PXG5cdEtfTyAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9PXG5zbmlwcGV0IEtfQ1RSTF9PXG5cdEtfQ1RSTF9PIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19BTFRfT1xuc25pcHBldCBLX0FMVF9PXG5cdEtfQUxUX08gLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX1NISUZUX09cbnNuaXBwZXQgS19TSElGVF9PXG5cdEtfU0hJRlRfTyAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfT1xuc25pcHBldCBLX0NUUkxfQUxUX09cblx0S19DVFJMX0FMVF9PIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX1NISUZUX09cbnNuaXBwZXQgS19DVFJMX1NISUZUX09cblx0S19DVFJMX1NISUZUX08gLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX1NISUZUX09cbnNuaXBwZXQgS19DVFJMX0FMVF9TSElGVF9PXG5cdEtfQ1RSTF9BTFRfU0hJRlRfTyAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG5cbiMgS19QXG5zbmlwcGV0IEtfUFxuXHRLX1AgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfUFxuc25pcHBldCBLX0NUUkxfUFxuXHRLX0NUUkxfUCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQUxUX1BcbnNuaXBwZXQgS19BTFRfUFxuXHRLX0FMVF9QIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19TSElGVF9QXG5zbmlwcGV0IEtfU0hJRlRfUFxuXHRLX1NISUZUX1AgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX1BcbnNuaXBwZXQgS19DVFJMX0FMVF9QXG5cdEtfQ1RSTF9BTFRfUCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9TSElGVF9QXG5zbmlwcGV0IEtfQ1RSTF9TSElGVF9QXG5cdEtfQ1RSTF9TSElGVF9QIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9TSElGVF9QXG5zbmlwcGV0IEtfQ1RSTF9BTFRfU0hJRlRfUFxuXHRLX0NUUkxfQUxUX1NISUZUX1AgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuXG4jIEtfUVxuc25pcHBldCBLX1Fcblx0S19RIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX1FcbnNuaXBwZXQgS19DVFJMX1Fcblx0S19DVFJMX1EgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0FMVF9RXG5zbmlwcGV0IEtfQUxUX1Fcblx0S19BTFRfUSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfU0hJRlRfUVxuc25pcHBldCBLX1NISUZUX1Fcblx0S19TSElGVF9RIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9RXG5zbmlwcGV0IEtfQ1RSTF9BTFRfUVxuXHRLX0NUUkxfQUxUX1EgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfU0hJRlRfUVxuc25pcHBldCBLX0NUUkxfU0hJRlRfUVxuXHRLX0NUUkxfU0hJRlRfUSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfU0hJRlRfUVxuc25pcHBldCBLX0NUUkxfQUxUX1NISUZUX1Fcblx0S19DVFJMX0FMVF9TSElGVF9RIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cblxuIyBLX1JcbnNuaXBwZXQgS19SXG5cdEtfUiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9SXG5zbmlwcGV0IEtfQ1RSTF9SXG5cdEtfQ1RSTF9SIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19BTFRfUlxuc25pcHBldCBLX0FMVF9SXG5cdEtfQUxUX1IgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX1NISUZUX1JcbnNuaXBwZXQgS19TSElGVF9SXG5cdEtfU0hJRlRfUiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfUlxuc25pcHBldCBLX0NUUkxfQUxUX1Jcblx0S19DVFJMX0FMVF9SIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX1NISUZUX1JcbnNuaXBwZXQgS19DVFJMX1NISUZUX1Jcblx0S19DVFJMX1NISUZUX1IgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX1NISUZUX1JcbnNuaXBwZXQgS19DVFJMX0FMVF9TSElGVF9SXG5cdEtfQ1RSTF9BTFRfU0hJRlRfUiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG5cbiMgS19TXG5zbmlwcGV0IEtfU1xuXHRLX1MgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfU1xuc25pcHBldCBLX0NUUkxfU1xuXHRLX0NUUkxfUyAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQUxUX1NcbnNuaXBwZXQgS19BTFRfU1xuXHRLX0FMVF9TIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19TSElGVF9TXG5zbmlwcGV0IEtfU0hJRlRfU1xuXHRLX1NISUZUX1MgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX1NcbnNuaXBwZXQgS19DVFJMX0FMVF9TXG5cdEtfQ1RSTF9BTFRfUyAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9TSElGVF9TXG5zbmlwcGV0IEtfQ1RSTF9TSElGVF9TXG5cdEtfQ1RSTF9TSElGVF9TIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9TSElGVF9TXG5zbmlwcGV0IEtfQ1RSTF9BTFRfU0hJRlRfU1xuXHRLX0NUUkxfQUxUX1NISUZUX1MgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuXG4jIEtfVFxuc25pcHBldCBLX1Rcblx0S19UIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX1RcbnNuaXBwZXQgS19DVFJMX1Rcblx0S19DVFJMX1QgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0FMVF9UXG5zbmlwcGV0IEtfQUxUX1Rcblx0S19BTFRfVCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfU0hJRlRfVFxuc25pcHBldCBLX1NISUZUX1Rcblx0S19TSElGVF9UIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9UXG5zbmlwcGV0IEtfQ1RSTF9BTFRfVFxuXHRLX0NUUkxfQUxUX1QgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfU0hJRlRfVFxuc25pcHBldCBLX0NUUkxfU0hJRlRfVFxuXHRLX0NUUkxfU0hJRlRfVCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfU0hJRlRfVFxuc25pcHBldCBLX0NUUkxfQUxUX1NISUZUX1Rcblx0S19DVFJMX0FMVF9TSElGVF9UIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cblxuIyBLX1VcbnNuaXBwZXQgS19VXG5cdEtfVSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9VXG5zbmlwcGV0IEtfQ1RSTF9VXG5cdEtfQ1RSTF9VIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19BTFRfVVxuc25pcHBldCBLX0FMVF9VXG5cdEtfQUxUX1UgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX1NISUZUX1VcbnNuaXBwZXQgS19TSElGVF9VXG5cdEtfU0hJRlRfVSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfVVxuc25pcHBldCBLX0NUUkxfQUxUX1Vcblx0S19DVFJMX0FMVF9VIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX1NISUZUX1VcbnNuaXBwZXQgS19DVFJMX1NISUZUX1Vcblx0S19DVFJMX1NISUZUX1UgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX1NISUZUX1VcbnNuaXBwZXQgS19DVFJMX0FMVF9TSElGVF9VXG5cdEtfQ1RSTF9BTFRfU0hJRlRfVSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG5cbiMgS19WXG5zbmlwcGV0IEtfVlxuXHRLX1YgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfVlxuc25pcHBldCBLX0NUUkxfVlxuXHRLX0NUUkxfViAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQUxUX1ZcbnNuaXBwZXQgS19BTFRfVlxuXHRLX0FMVF9WIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19TSElGVF9WXG5zbmlwcGV0IEtfU0hJRlRfVlxuXHRLX1NISUZUX1YgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX1ZcbnNuaXBwZXQgS19DVFJMX0FMVF9WXG5cdEtfQ1RSTF9BTFRfViAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9TSElGVF9WXG5zbmlwcGV0IEtfQ1RSTF9TSElGVF9WXG5cdEtfQ1RSTF9TSElGVF9WIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9TSElGVF9WXG5zbmlwcGV0IEtfQ1RSTF9BTFRfU0hJRlRfVlxuXHRLX0NUUkxfQUxUX1NISUZUX1YgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuXG4jIEtfV1xuc25pcHBldCBLX1dcblx0S19XIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX1dcbnNuaXBwZXQgS19DVFJMX1dcblx0S19DVFJMX1cgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0FMVF9XXG5zbmlwcGV0IEtfQUxUX1dcblx0S19BTFRfVyAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfU0hJRlRfV1xuc25pcHBldCBLX1NISUZUX1dcblx0S19TSElGVF9XIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9XXG5zbmlwcGV0IEtfQ1RSTF9BTFRfV1xuXHRLX0NUUkxfQUxUX1cgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfU0hJRlRfV1xuc25pcHBldCBLX0NUUkxfU0hJRlRfV1xuXHRLX0NUUkxfU0hJRlRfVyAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfU0hJRlRfV1xuc25pcHBldCBLX0NUUkxfQUxUX1NISUZUX1dcblx0S19DVFJMX0FMVF9TSElGVF9XIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cblxuIyBLX1hcbnNuaXBwZXQgS19YXG5cdEtfWCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9YXG5zbmlwcGV0IEtfQ1RSTF9YXG5cdEtfQ1RSTF9YIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19BTFRfWFxuc25pcHBldCBLX0FMVF9YXG5cdEtfQUxUX1ggLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX1NISUZUX1hcbnNuaXBwZXQgS19TSElGVF9YXG5cdEtfU0hJRlRfWCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfWFxuc25pcHBldCBLX0NUUkxfQUxUX1hcblx0S19DVFJMX0FMVF9YIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX1NISUZUX1hcbnNuaXBwZXQgS19DVFJMX1NISUZUX1hcblx0S19DVFJMX1NISUZUX1ggLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX1NISUZUX1hcbnNuaXBwZXQgS19DVFJMX0FMVF9TSElGVF9YXG5cdEtfQ1RSTF9BTFRfU0hJRlRfWCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG5cbiMgS19ZXG5zbmlwcGV0IEtfWVxuXHRLX1kgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfWVxuc25pcHBldCBLX0NUUkxfWVxuXHRLX0NUUkxfWSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQUxUX1lcbnNuaXBwZXQgS19BTFRfWVxuXHRLX0FMVF9ZIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19TSElGVF9ZXG5zbmlwcGV0IEtfU0hJRlRfWVxuXHRLX1NISUZUX1kgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX1lcbnNuaXBwZXQgS19DVFJMX0FMVF9ZXG5cdEtfQ1RSTF9BTFRfWSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9TSElGVF9ZXG5zbmlwcGV0IEtfQ1RSTF9TSElGVF9ZXG5cdEtfQ1RSTF9TSElGVF9ZIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9TSElGVF9ZXG5zbmlwcGV0IEtfQ1RSTF9BTFRfU0hJRlRfWVxuXHRLX0NUUkxfQUxUX1NISUZUX1kgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuXG4jIEtfWlxuc25pcHBldCBLX1pcblx0S19aIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX1pcbnNuaXBwZXQgS19DVFJMX1pcblx0S19DVFJMX1ogLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0FMVF9aXG5zbmlwcGV0IEtfQUxUX1pcblx0S19BTFRfWiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfU0hJRlRfWlxuc25pcHBldCBLX1NISUZUX1pcblx0S19TSElGVF9aIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9aXG5zbmlwcGV0IEtfQ1RSTF9BTFRfWlxuXHRLX0NUUkxfQUxUX1ogLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfU0hJRlRfWlxuc25pcHBldCBLX0NUUkxfU0hJRlRfWlxuXHRLX0NUUkxfU0hJRlRfWiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfU0hJRlRfWlxuc25pcHBldCBLX0NUUkxfQUxUX1NISUZUX1pcblx0S19DVFJMX0FMVF9TSElGVF9aIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cblxuIyBLXzBcbnNuaXBwZXQgS18wXG5cdEtfMCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF8wXG5zbmlwcGV0IEtfQ1RSTF8wXG5cdEtfQ1RSTF8wIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19BTFRfMFxuc25pcHBldCBLX0FMVF8wXG5cdEtfQUxUXzAgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX1NISUZUXzBcbnNuaXBwZXQgS19TSElGVF8wXG5cdEtfU0hJRlRfMCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfMFxuc25pcHBldCBLX0NUUkxfQUxUXzBcblx0S19DVFJMX0FMVF8wIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX1NISUZUXzBcbnNuaXBwZXQgS19DVFJMX1NISUZUXzBcblx0S19DVFJMX1NISUZUXzAgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX1NISUZUXzBcbnNuaXBwZXQgS19DVFJMX0FMVF9TSElGVF8wXG5cdEtfQ1RSTF9BTFRfU0hJRlRfMCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG5cbiMgS18xXG5zbmlwcGV0IEtfMVxuXHRLXzEgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfMVxuc25pcHBldCBLX0NUUkxfMVxuXHRLX0NUUkxfMSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQUxUXzFcbnNuaXBwZXQgS19BTFRfMVxuXHRLX0FMVF8xIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19TSElGVF8xXG5zbmlwcGV0IEtfU0hJRlRfMVxuXHRLX1NISUZUXzEgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUXzFcbnNuaXBwZXQgS19DVFJMX0FMVF8xXG5cdEtfQ1RSTF9BTFRfMSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9TSElGVF8xXG5zbmlwcGV0IEtfQ1RSTF9TSElGVF8xXG5cdEtfQ1RSTF9TSElGVF8xIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9TSElGVF8xXG5zbmlwcGV0IEtfQ1RSTF9BTFRfU0hJRlRfMVxuXHRLX0NUUkxfQUxUX1NISUZUXzEgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuXG4jIEtfMlxuc25pcHBldCBLXzJcblx0S18yIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMXzJcbnNuaXBwZXQgS19DVFJMXzJcblx0S19DVFJMXzIgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0FMVF8yXG5zbmlwcGV0IEtfQUxUXzJcblx0S19BTFRfMiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfU0hJRlRfMlxuc25pcHBldCBLX1NISUZUXzJcblx0S19TSElGVF8yIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF8yXG5zbmlwcGV0IEtfQ1RSTF9BTFRfMlxuXHRLX0NUUkxfQUxUXzIgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfU0hJRlRfMlxuc25pcHBldCBLX0NUUkxfU0hJRlRfMlxuXHRLX0NUUkxfU0hJRlRfMiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfU0hJRlRfMlxuc25pcHBldCBLX0NUUkxfQUxUX1NISUZUXzJcblx0S19DVFJMX0FMVF9TSElGVF8yIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cblxuIyBLXzNcbnNuaXBwZXQgS18zXG5cdEtfMyAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF8zXG5zbmlwcGV0IEtfQ1RSTF8zXG5cdEtfQ1RSTF8zIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19BTFRfM1xuc25pcHBldCBLX0FMVF8zXG5cdEtfQUxUXzMgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX1NISUZUXzNcbnNuaXBwZXQgS19TSElGVF8zXG5cdEtfU0hJRlRfMyAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfM1xuc25pcHBldCBLX0NUUkxfQUxUXzNcblx0S19DVFJMX0FMVF8zIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX1NISUZUXzNcbnNuaXBwZXQgS19DVFJMX1NISUZUXzNcblx0S19DVFJMX1NISUZUXzMgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX1NISUZUXzNcbnNuaXBwZXQgS19DVFJMX0FMVF9TSElGVF8zXG5cdEtfQ1RSTF9BTFRfU0hJRlRfMyAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG5cbiMgS180XG5zbmlwcGV0IEtfNFxuXHRLXzQgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfNFxuc25pcHBldCBLX0NUUkxfNFxuXHRLX0NUUkxfNCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQUxUXzRcbnNuaXBwZXQgS19BTFRfNFxuXHRLX0FMVF80IC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19TSElGVF80XG5zbmlwcGV0IEtfU0hJRlRfNFxuXHRLX1NISUZUXzQgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUXzRcbnNuaXBwZXQgS19DVFJMX0FMVF80XG5cdEtfQ1RSTF9BTFRfNCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9TSElGVF80XG5zbmlwcGV0IEtfQ1RSTF9TSElGVF80XG5cdEtfQ1RSTF9TSElGVF80IC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9TSElGVF80XG5zbmlwcGV0IEtfQ1RSTF9BTFRfU0hJRlRfNFxuXHRLX0NUUkxfQUxUX1NISUZUXzQgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuXG4jIEtfNVxuc25pcHBldCBLXzVcblx0S181IC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMXzVcbnNuaXBwZXQgS19DVFJMXzVcblx0S19DVFJMXzUgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0FMVF81XG5zbmlwcGV0IEtfQUxUXzVcblx0S19BTFRfNSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfU0hJRlRfNVxuc25pcHBldCBLX1NISUZUXzVcblx0S19TSElGVF81IC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF81XG5zbmlwcGV0IEtfQ1RSTF9BTFRfNVxuXHRLX0NUUkxfQUxUXzUgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfU0hJRlRfNVxuc25pcHBldCBLX0NUUkxfU0hJRlRfNVxuXHRLX0NUUkxfU0hJRlRfNSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfU0hJRlRfNVxuc25pcHBldCBLX0NUUkxfQUxUX1NISUZUXzVcblx0S19DVFJMX0FMVF9TSElGVF81IC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cblxuIyBLXzZcbnNuaXBwZXQgS182XG5cdEtfNiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF82XG5zbmlwcGV0IEtfQ1RSTF82XG5cdEtfQ1RSTF82IC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19BTFRfNlxuc25pcHBldCBLX0FMVF82XG5cdEtfQUxUXzYgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX1NISUZUXzZcbnNuaXBwZXQgS19TSElGVF82XG5cdEtfU0hJRlRfNiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfNlxuc25pcHBldCBLX0NUUkxfQUxUXzZcblx0S19DVFJMX0FMVF82IC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX1NISUZUXzZcbnNuaXBwZXQgS19DVFJMX1NISUZUXzZcblx0S19DVFJMX1NISUZUXzYgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX1NISUZUXzZcbnNuaXBwZXQgS19DVFJMX0FMVF9TSElGVF82XG5cdEtfQ1RSTF9BTFRfU0hJRlRfNiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG5cbiMgS183XG5zbmlwcGV0IEtfN1xuXHRLXzcgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfN1xuc25pcHBldCBLX0NUUkxfN1xuXHRLX0NUUkxfNyAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQUxUXzdcbnNuaXBwZXQgS19BTFRfN1xuXHRLX0FMVF83IC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19TSElGVF83XG5zbmlwcGV0IEtfU0hJRlRfN1xuXHRLX1NISUZUXzcgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUXzdcbnNuaXBwZXQgS19DVFJMX0FMVF83XG5cdEtfQ1RSTF9BTFRfNyAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9TSElGVF83XG5zbmlwcGV0IEtfQ1RSTF9TSElGVF83XG5cdEtfQ1RSTF9TSElGVF83IC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9TSElGVF83XG5zbmlwcGV0IEtfQ1RSTF9BTFRfU0hJRlRfN1xuXHRLX0NUUkxfQUxUX1NISUZUXzcgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuXG4jIEtfOFxuc25pcHBldCBLXzhcblx0S184IC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMXzhcbnNuaXBwZXQgS19DVFJMXzhcblx0S19DVFJMXzggLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0FMVF84XG5zbmlwcGV0IEtfQUxUXzhcblx0S19BTFRfOCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfU0hJRlRfOFxuc25pcHBldCBLX1NISUZUXzhcblx0S19TSElGVF84IC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF84XG5zbmlwcGV0IEtfQ1RSTF9BTFRfOFxuXHRLX0NUUkxfQUxUXzggLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfU0hJRlRfOFxuc25pcHBldCBLX0NUUkxfU0hJRlRfOFxuXHRLX0NUUkxfU0hJRlRfOCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfU0hJRlRfOFxuc25pcHBldCBLX0NUUkxfQUxUX1NISUZUXzhcblx0S19DVFJMX0FMVF9TSElGVF84IC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cblxuIyBLXzlcbnNuaXBwZXQgS185XG5cdEtfOSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF85XG5zbmlwcGV0IEtfQ1RSTF85XG5cdEtfQ1RSTF85IC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19BTFRfOVxuc25pcHBldCBLX0FMVF85XG5cdEtfQUxUXzkgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX1NISUZUXzlcbnNuaXBwZXQgS19TSElGVF85XG5cdEtfU0hJRlRfOSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfOVxuc25pcHBldCBLX0NUUkxfQUxUXzlcblx0S19DVFJMX0FMVF85IC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX1NISUZUXzlcbnNuaXBwZXQgS19DVFJMX1NISUZUXzlcblx0S19DVFJMX1NISUZUXzkgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX1NISUZUXzlcbnNuaXBwZXQgS19DVFJMX0FMVF9TSElGVF85XG5cdEtfQ1RSTF9BTFRfU0hJRlRfOSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG5cbiMgS19GMVxuc25pcHBldCBLX0YxXG5cdEtfRjEgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfRjFcbnNuaXBwZXQgS19DVFJMX0YxXG5cdEtfQ1RSTF9GMSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQUxUX0YxXG5zbmlwcGV0IEtfQUxUX0YxXG5cdEtfQUxUX0YxIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19TSElGVF9GMVxuc25pcHBldCBLX1NISUZUX0YxXG5cdEtfU0hJRlRfRjEgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX0YxXG5zbmlwcGV0IEtfQ1RSTF9BTFRfRjFcblx0S19DVFJMX0FMVF9GMSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9TSElGVF9GMVxuc25pcHBldCBLX0NUUkxfU0hJRlRfRjFcblx0S19DVFJMX1NISUZUX0YxIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9TSElGVF9GMVxuc25pcHBldCBLX0NUUkxfQUxUX1NISUZUX0YxXG5cdEtfQ1RSTF9BTFRfU0hJRlRfRjEgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuXG4jIEtfRjJcbnNuaXBwZXQgS19GMlxuXHRLX0YyIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0YyXG5zbmlwcGV0IEtfQ1RSTF9GMlxuXHRLX0NUUkxfRjIgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0FMVF9GMlxuc25pcHBldCBLX0FMVF9GMlxuXHRLX0FMVF9GMiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfU0hJRlRfRjJcbnNuaXBwZXQgS19TSElGVF9GMlxuXHRLX1NISUZUX0YyIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9GMlxuc25pcHBldCBLX0NUUkxfQUxUX0YyXG5cdEtfQ1RSTF9BTFRfRjIgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfU0hJRlRfRjJcbnNuaXBwZXQgS19DVFJMX1NISUZUX0YyXG5cdEtfQ1RSTF9TSElGVF9GMiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfU0hJRlRfRjJcbnNuaXBwZXQgS19DVFJMX0FMVF9TSElGVF9GMlxuXHRLX0NUUkxfQUxUX1NISUZUX0YyIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cblxuIyBLX0YzXG5zbmlwcGV0IEtfRjNcblx0S19GMyAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9GM1xuc25pcHBldCBLX0NUUkxfRjNcblx0S19DVFJMX0YzIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19BTFRfRjNcbnNuaXBwZXQgS19BTFRfRjNcblx0S19BTFRfRjMgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX1NISUZUX0YzXG5zbmlwcGV0IEtfU0hJRlRfRjNcblx0S19TSElGVF9GMyAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfRjNcbnNuaXBwZXQgS19DVFJMX0FMVF9GM1xuXHRLX0NUUkxfQUxUX0YzIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX1NISUZUX0YzXG5zbmlwcGV0IEtfQ1RSTF9TSElGVF9GM1xuXHRLX0NUUkxfU0hJRlRfRjMgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX1NISUZUX0YzXG5zbmlwcGV0IEtfQ1RSTF9BTFRfU0hJRlRfRjNcblx0S19DVFJMX0FMVF9TSElGVF9GMyAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG5cbiMgS19BXG5zbmlwcGV0IEtfQVxuXHRLX0EgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQVxuc25pcHBldCBLX0NUUkxfQVxuXHRLX0NUUkxfQSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQUxUX0FcbnNuaXBwZXQgS19BTFRfQVxuXHRLX0FMVF9BIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19TSElGVF9BXG5zbmlwcGV0IEtfU0hJRlRfQVxuXHRLX1NISUZUX0EgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX0FcbnNuaXBwZXQgS19DVFJMX0FMVF9BXG5cdEtfQ1RSTF9BTFRfQSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9TSElGVF9BXG5zbmlwcGV0IEtfQ1RSTF9TSElGVF9BXG5cdEtfQ1RSTF9TSElGVF9BIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9TSElGVF9BXG5zbmlwcGV0IEtfQ1RSTF9BTFRfU0hJRlRfQVxuXHRLX0NUUkxfQUxUX1NISUZUX0EgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuXG4jIEtfRjVcbnNuaXBwZXQgS19GNVxuXHRLX0Y1IC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0Y1XG5zbmlwcGV0IEtfQ1RSTF9GNVxuXHRLX0NUUkxfRjUgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0FMVF9GNVxuc25pcHBldCBLX0FMVF9GNVxuXHRLX0FMVF9GNSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfU0hJRlRfRjVcbnNuaXBwZXQgS19TSElGVF9GNVxuXHRLX1NISUZUX0Y1IC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9GNVxuc25pcHBldCBLX0NUUkxfQUxUX0Y1XG5cdEtfQ1RSTF9BTFRfRjUgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfU0hJRlRfRjVcbnNuaXBwZXQgS19DVFJMX1NISUZUX0Y1XG5cdEtfQ1RSTF9TSElGVF9GNSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfU0hJRlRfRjVcbnNuaXBwZXQgS19DVFJMX0FMVF9TSElGVF9GNVxuXHRLX0NUUkxfQUxUX1NISUZUX0Y1IC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cblxuIyBLX0Y2XG5zbmlwcGV0IEtfRjZcblx0S19GNiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9GNlxuc25pcHBldCBLX0NUUkxfRjZcblx0S19DVFJMX0Y2IC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19BTFRfRjZcbnNuaXBwZXQgS19BTFRfRjZcblx0S19BTFRfRjYgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX1NISUZUX0Y2XG5zbmlwcGV0IEtfU0hJRlRfRjZcblx0S19TSElGVF9GNiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfRjZcbnNuaXBwZXQgS19DVFJMX0FMVF9GNlxuXHRLX0NUUkxfQUxUX0Y2IC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX1NISUZUX0Y2XG5zbmlwcGV0IEtfQ1RSTF9TSElGVF9GNlxuXHRLX0NUUkxfU0hJRlRfRjYgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX1NISUZUX0Y2XG5zbmlwcGV0IEtfQ1RSTF9BTFRfU0hJRlRfRjZcblx0S19DVFJMX0FMVF9TSElGVF9GNiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG5cbiMgS19GN1xuc25pcHBldCBLX0Y3XG5cdEtfRjcgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfRjdcbnNuaXBwZXQgS19DVFJMX0Y3XG5cdEtfQ1RSTF9GNyAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQUxUX0Y3XG5zbmlwcGV0IEtfQUxUX0Y3XG5cdEtfQUxUX0Y3IC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19TSElGVF9GN1xuc25pcHBldCBLX1NISUZUX0Y3XG5cdEtfU0hJRlRfRjcgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX0Y3XG5zbmlwcGV0IEtfQ1RSTF9BTFRfRjdcblx0S19DVFJMX0FMVF9GNyAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9TSElGVF9GN1xuc25pcHBldCBLX0NUUkxfU0hJRlRfRjdcblx0S19DVFJMX1NISUZUX0Y3IC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9TSElGVF9GN1xuc25pcHBldCBLX0NUUkxfQUxUX1NISUZUX0Y3XG5cdEtfQ1RSTF9BTFRfU0hJRlRfRjcgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuXG4jIEtfRjhcbnNuaXBwZXQgS19GOFxuXHRLX0Y4IC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0Y4XG5zbmlwcGV0IEtfQ1RSTF9GOFxuXHRLX0NUUkxfRjggLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0FMVF9GOFxuc25pcHBldCBLX0FMVF9GOFxuXHRLX0FMVF9GOCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfU0hJRlRfRjhcbnNuaXBwZXQgS19TSElGVF9GOFxuXHRLX1NISUZUX0Y4IC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9GOFxuc25pcHBldCBLX0NUUkxfQUxUX0Y4XG5cdEtfQ1RSTF9BTFRfRjggLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfU0hJRlRfRjhcbnNuaXBwZXQgS19DVFJMX1NISUZUX0Y4XG5cdEtfQ1RSTF9TSElGVF9GOCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfU0hJRlRfRjhcbnNuaXBwZXQgS19DVFJMX0FMVF9TSElGVF9GOFxuXHRLX0NUUkxfQUxUX1NISUZUX0Y4IC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cblxuIyBLX0Y5XG5zbmlwcGV0IEtfRjlcblx0S19GOSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9GOVxuc25pcHBldCBLX0NUUkxfRjlcblx0S19DVFJMX0Y5IC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19BTFRfRjlcbnNuaXBwZXQgS19BTFRfRjlcblx0S19BTFRfRjkgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX1NISUZUX0Y5XG5zbmlwcGV0IEtfU0hJRlRfRjlcblx0S19TSElGVF9GOSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfRjlcbnNuaXBwZXQgS19DVFJMX0FMVF9GOVxuXHRLX0NUUkxfQUxUX0Y5IC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX1NISUZUX0Y5XG5zbmlwcGV0IEtfQ1RSTF9TSElGVF9GOVxuXHRLX0NUUkxfU0hJRlRfRjkgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX1NISUZUX0Y5XG5zbmlwcGV0IEtfQ1RSTF9BTFRfU0hJRlRfRjlcblx0S19DVFJMX0FMVF9TSElGVF9GOSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG5cbiMgS19GMTBcbnNuaXBwZXQgS19GMTBcblx0S19GMTAgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfRjEwXG5zbmlwcGV0IEtfQ1RSTF9GMTBcblx0S19DVFJMX0YxMCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQUxUX0YxMFxuc25pcHBldCBLX0FMVF9GMTBcblx0S19BTFRfRjEwIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19TSElGVF9GMTBcbnNuaXBwZXQgS19TSElGVF9GMTBcblx0S19TSElGVF9GMTAgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX0YxMFxuc25pcHBldCBLX0NUUkxfQUxUX0YxMFxuXHRLX0NUUkxfQUxUX0YxMCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9TSElGVF9GMTBcbnNuaXBwZXQgS19DVFJMX1NISUZUX0YxMFxuXHRLX0NUUkxfU0hJRlRfRjEwIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9TSElGVF9GMTBcbnNuaXBwZXQgS19DVFJMX0FMVF9TSElGVF9GMTBcblx0S19DVFJMX0FMVF9TSElGVF9GMTAgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuXG4jIEtfRjExXG5zbmlwcGV0IEtfRjExXG5cdEtfRjExIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0YxMVxuc25pcHBldCBLX0NUUkxfRjExXG5cdEtfQ1RSTF9GMTEgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0FMVF9GMTFcbnNuaXBwZXQgS19BTFRfRjExXG5cdEtfQUxUX0YxMSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfU0hJRlRfRjExXG5zbmlwcGV0IEtfU0hJRlRfRjExXG5cdEtfU0hJRlRfRjExIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9GMTFcbnNuaXBwZXQgS19DVFJMX0FMVF9GMTFcblx0S19DVFJMX0FMVF9GMTEgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfU0hJRlRfRjExXG5zbmlwcGV0IEtfQ1RSTF9TSElGVF9GMTFcblx0S19DVFJMX1NISUZUX0YxMSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfU0hJRlRfRjExXG5zbmlwcGV0IEtfQ1RSTF9BTFRfU0hJRlRfRjExXG5cdEtfQ1RSTF9BTFRfU0hJRlRfRjExIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cblxuIyBLX0YxMlxuc25pcHBldCBLX0YxMlxuXHRLX0YxMiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9GMTJcbnNuaXBwZXQgS19DVFJMX0YxMlxuXHRLX0NUUkxfRjEyIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19BTFRfRjEyXG5zbmlwcGV0IEtfQUxUX0YxMlxuXHRLX0FMVF9GMTIgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX1NISUZUX0YxMlxuc25pcHBldCBLX1NISUZUX0YxMlxuXHRLX1NISUZUX0YxMiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfRjEyXG5zbmlwcGV0IEtfQ1RSTF9BTFRfRjEyXG5cdEtfQ1RSTF9BTFRfRjEyIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX1NISUZUX0YxMlxuc25pcHBldCBLX0NUUkxfU0hJRlRfRjEyXG5cdEtfQ1RSTF9TSElGVF9GMTIgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX1NISUZUX0YxMlxuc25pcHBldCBLX0NUUkxfQUxUX1NISUZUX0YxMlxuXHRLX0NUUkxfQUxUX1NISUZUX0YxMiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG5cbiMgS19SRVRVUk5cbnNuaXBwZXQgS19SRVRVUk5cblx0S19SRVRVUk4gLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfUkVUVVJOXG5zbmlwcGV0IEtfQ1RSTF9SRVRVUk5cblx0S19DVFJMX1JFVFVSTiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQUxUX1JFVFVSTlxuc25pcHBldCBLX0FMVF9SRVRVUk5cblx0S19BTFRfUkVUVVJOIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19TSElGVF9SRVRVUk5cbnNuaXBwZXQgS19TSElGVF9SRVRVUk5cblx0S19TSElGVF9SRVRVUk4gLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX1JFVFVSTlxuc25pcHBldCBLX0NUUkxfQUxUX1JFVFVSTlxuXHRLX0NUUkxfQUxUX1JFVFVSTiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9TSElGVF9SRVRVUk5cbnNuaXBwZXQgS19DVFJMX1NISUZUX1JFVFVSTlxuXHRLX0NUUkxfU0hJRlRfUkVUVVJOIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9TSElGVF9SRVRVUk5cbnNuaXBwZXQgS19DVFJMX0FMVF9TSElGVF9SRVRVUk5cblx0S19DVFJMX0FMVF9TSElGVF9SRVRVUk4gLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuXG4jIEtfU1BBQ0VcbnNuaXBwZXQgS19TUEFDRVxuXHRLX1NQQUNFIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX1NQQUNFXG5zbmlwcGV0IEtfQ1RSTF9TUEFDRVxuXHRLX0NUUkxfU1BBQ0UgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0FMVF9TUEFDRVxuc25pcHBldCBLX0FMVF9TUEFDRVxuXHRLX0FMVF9TUEFDRSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfU0hJRlRfU1BBQ0VcbnNuaXBwZXQgS19TSElGVF9TUEFDRVxuXHRLX1NISUZUX1NQQUNFIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9TUEFDRVxuc25pcHBldCBLX0NUUkxfQUxUX1NQQUNFXG5cdEtfQ1RSTF9BTFRfU1BBQ0UgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfU0hJRlRfU1BBQ0VcbnNuaXBwZXQgS19DVFJMX1NISUZUX1NQQUNFXG5cdEtfQ1RSTF9TSElGVF9TUEFDRSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfU0hJRlRfU1BBQ0VcbnNuaXBwZXQgS19DVFJMX0FMVF9TSElGVF9TUEFDRVxuXHRLX0NUUkxfQUxUX1NISUZUX1NQQUNFIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cblxuIyBLX0VTQ0FQRVxuc25pcHBldCBLX0VTQ0FQRVxuXHRLX0VTQ0FQRSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9FU0NBUEVcbnNuaXBwZXQgS19DVFJMX0VTQ0FQRVxuXHRLX0NUUkxfRVNDQVBFIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19BTFRfRVNDQVBFXG5zbmlwcGV0IEtfQUxUX0VTQ0FQRVxuXHRLX0FMVF9FU0NBUEUgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX1NISUZUX0VTQ0FQRVxuc25pcHBldCBLX1NISUZUX0VTQ0FQRVxuXHRLX1NISUZUX0VTQ0FQRSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfRVNDQVBFXG5zbmlwcGV0IEtfQ1RSTF9BTFRfRVNDQVBFXG5cdEtfQ1RSTF9BTFRfRVNDQVBFIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX1NISUZUX0VTQ0FQRVxuc25pcHBldCBLX0NUUkxfU0hJRlRfRVNDQVBFXG5cdEtfQ1RSTF9TSElGVF9FU0NBUEUgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX1NISUZUX0VTQ0FQRVxuc25pcHBldCBLX0NUUkxfQUxUX1NISUZUX0VTQ0FQRVxuXHRLX0NUUkxfQUxUX1NISUZUX0VTQ0FQRSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG5cbiMgS19CQUNLU1BBQ0VcbnNuaXBwZXQgS19CQUNLU1BBQ0Vcblx0S19CQUNLU1BBQ0UgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQkFDS1NQQUNFXG5zbmlwcGV0IEtfQ1RSTF9CQUNLU1BBQ0Vcblx0S19DVFJMX0JBQ0tTUEFDRSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQUxUX0JBQ0tTUEFDRVxuc25pcHBldCBLX0FMVF9CQUNLU1BBQ0Vcblx0S19BTFRfQkFDS1NQQUNFIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19TSElGVF9CQUNLU1BBQ0VcbnNuaXBwZXQgS19TSElGVF9CQUNLU1BBQ0Vcblx0S19TSElGVF9CQUNLU1BBQ0UgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX0JBQ0tTUEFDRVxuc25pcHBldCBLX0NUUkxfQUxUX0JBQ0tTUEFDRVxuXHRLX0NUUkxfQUxUX0JBQ0tTUEFDRSAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9TSElGVF9CQUNLU1BBQ0VcbnNuaXBwZXQgS19DVFJMX1NISUZUX0JBQ0tTUEFDRVxuXHRLX0NUUkxfU0hJRlRfQkFDS1NQQUNFIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9TSElGVF9CQUNLU1BBQ0VcbnNuaXBwZXQgS19DVFJMX0FMVF9TSElGVF9CQUNLU1BBQ0Vcblx0S19DVFJMX0FMVF9TSElGVF9CQUNLU1BBQ0UgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuXG4jIEtfVEFCXG5zbmlwcGV0IEtfVEFCXG5cdEtfVEFCIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX1RBQlxuc25pcHBldCBLX0NUUkxfVEFCXG5cdEtfQ1RSTF9UQUIgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0FMVF9UQUJcbnNuaXBwZXQgS19BTFRfVEFCXG5cdEtfQUxUX1RBQiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfU0hJRlRfVEFCXG5zbmlwcGV0IEtfU0hJRlRfVEFCXG5cdEtfU0hJRlRfVEFCIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9UQUJcbnNuaXBwZXQgS19DVFJMX0FMVF9UQUJcblx0S19DVFJMX0FMVF9UQUIgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfU0hJRlRfVEFCXG5zbmlwcGV0IEtfQ1RSTF9TSElGVF9UQUJcblx0S19DVFJMX1NISUZUX1RBQiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfU0hJRlRfVEFCXG5zbmlwcGV0IEtfQ1RSTF9BTFRfU0hJRlRfVEFCXG5cdEtfQ1RSTF9BTFRfU0hJRlRfVEFCIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cblxuIyBLX1VQXG5zbmlwcGV0IEtfVVBcblx0S19VUCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9VUFxuc25pcHBldCBLX0NUUkxfVVBcblx0S19DVFJMX1VQIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19BTFRfVVBcbnNuaXBwZXQgS19BTFRfVVBcblx0S19BTFRfVVAgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX1NISUZUX1VQXG5zbmlwcGV0IEtfU0hJRlRfVVBcblx0S19TSElGVF9VUCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfVVBcbnNuaXBwZXQgS19DVFJMX0FMVF9VUFxuXHRLX0NUUkxfQUxUX1VQIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX1NISUZUX1VQXG5zbmlwcGV0IEtfQ1RSTF9TSElGVF9VUFxuXHRLX0NUUkxfU0hJRlRfVVAgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX1NISUZUX1VQXG5zbmlwcGV0IEtfQ1RSTF9BTFRfU0hJRlRfVVBcblx0S19DVFJMX0FMVF9TSElGVF9VUCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG5cbiMgS19ET1dOXG5zbmlwcGV0IEtfRE9XTlxuXHRLX0RPV04gLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfRE9XTlxuc25pcHBldCBLX0NUUkxfRE9XTlxuXHRLX0NUUkxfRE9XTiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQUxUX0RPV05cbnNuaXBwZXQgS19BTFRfRE9XTlxuXHRLX0FMVF9ET1dOIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19TSElGVF9ET1dOXG5zbmlwcGV0IEtfU0hJRlRfRE9XTlxuXHRLX1NISUZUX0RPV04gLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX0RPV05cbnNuaXBwZXQgS19DVFJMX0FMVF9ET1dOXG5cdEtfQ1RSTF9BTFRfRE9XTiAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9TSElGVF9ET1dOXG5zbmlwcGV0IEtfQ1RSTF9TSElGVF9ET1dOXG5cdEtfQ1RSTF9TSElGVF9ET1dOIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9TSElGVF9ET1dOXG5zbmlwcGV0IEtfQ1RSTF9BTFRfU0hJRlRfRE9XTlxuXHRLX0NUUkxfQUxUX1NISUZUX0RPV04gLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuXG4jIEtfTEVGVFxuc25pcHBldCBLX0xFRlRcblx0S19MRUZUIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0xFRlRcbnNuaXBwZXQgS19DVFJMX0xFRlRcblx0S19DVFJMX0xFRlQgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0FMVF9MRUZUXG5zbmlwcGV0IEtfQUxUX0xFRlRcblx0S19BTFRfTEVGVCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfU0hJRlRfTEVGVFxuc25pcHBldCBLX1NISUZUX0xFRlRcblx0S19TSElGVF9MRUZUIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX0FMVF9MRUZUXG5zbmlwcGV0IEtfQ1RSTF9BTFRfTEVGVFxuXHRLX0NUUkxfQUxUX0xFRlQgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfU0hJRlRfTEVGVFxuc25pcHBldCBLX0NUUkxfU0hJRlRfTEVGVFxuXHRLX0NUUkxfU0hJRlRfTEVGVCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfU0hJRlRfTEVGVFxuc25pcHBldCBLX0NUUkxfQUxUX1NISUZUX0xFRlRcblx0S19DVFJMX0FMVF9TSElGVF9MRUZUIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cblxuIyBLX1JJR0hUXG5zbmlwcGV0IEtfUklHSFRcblx0S19SSUdIVCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9SSUdIVFxuc25pcHBldCBLX0NUUkxfUklHSFRcblx0S19DVFJMX1JJR0hUIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19BTFRfUklHSFRcbnNuaXBwZXQgS19BTFRfUklHSFRcblx0S19BTFRfUklHSFQgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX1NISUZUX1JJR0hUXG5zbmlwcGV0IEtfU0hJRlRfUklHSFRcblx0S19TSElGVF9SSUdIVCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG4jIEtfQ1RSTF9BTFRfUklHSFRcbnNuaXBwZXQgS19DVFJMX0FMVF9SSUdIVFxuXHRLX0NUUkxfQUxUX1JJR0hUIC0+IHsgXFwkezE6Ly9jdWVycG8uLi59IH1cbiMgS19DVFJMX1NISUZUX1JJR0hUXG5zbmlwcGV0IEtfQ1RSTF9TSElGVF9SSUdIVFxuXHRLX0NUUkxfU0hJRlRfUklHSFQgLT4geyBcXCR7MTovL2N1ZXJwby4uLn0gfVxuIyBLX0NUUkxfQUxUX1NISUZUX1JJR0hUXG5zbmlwcGV0IEtfQ1RSTF9BTFRfU0hJRlRfUklHSFRcblx0S19DVFJMX0FMVF9TSElGVF9SSUdIVCAtPiB7IFxcJHsxOi8vY3VlcnBvLi4ufSB9XG5cbiMgcmVjb3JyaWRvIChzaW1wbGUpXG5zbmlwcGV0IHJlY29ycmlkbyAoc2ltcGxlKVxuXHRcXCR7MTovLyBJciBhbCBpbmljaW99XG5cdHdoaWxlIChub3QgXFwkezI6Ly8gZXMgw7psdGltbyBlbGVtZW50b30pIHtcblx0XHRcXCR7MzovLyBQcm9jZXNhciBlbCBlbGVtZW50b31cblx0XHRcXCR7NDovLyBJciBhbCBwcsOzeGltbyBlbGVtZW50b31cblx0fVxuXHRcXCR7NTovLyBGaW5hbGl6YXJ9XG5cbiMgcmVjb3JyaWRvIChkZSBhY3VtdWxhY2nDs24pXG5zbmlwcGV0IHJlY29ycmlkbyAoZGUgYWN1bXVsYWNpw7NuKVxuXHRcXCR7MTovLyBJciBhbCBpbmljaW99XG5cdFxcJHsyOmNhbnRpZGFkVmlzdG9zfSA6PSBcXCR7MzovLyBjb250YXIgZWxlbWVudG9zIGVuIGx1Z2FyIGFjdHVhbH1cblx0d2hpbGUgKG5vdCBcXCR7NDovLyBlcyDDumx0aW1vIGVsZW1lbnRvfSkge1xuXHRcdFxcJHs0Oi8vIElyIGFsIHByw7N4aW1vIGVsZW1lbnRvfVxuXHRcdFxcJHsyOmNhbnRpZGFkVmlzdG9zfSA6PSBcXCR7MjpjYW50aWRhZFZpc3Rvc30gKyBcXCR7MzovLyBjb250YXIgZWxlbWVudG9zIGVuIGx1Z2FyIGFjdHVhbH1cblx0fVxuXHRyZXR1cm4gKFxcJHsyOmNhbnRpZGFkVmlzdG9zfSlcblxuIyByZWNvcnJpZG8gKGRlIGLDunNxdWVkYSlcbnNuaXBwZXQgcmVjb3JyaWRvIChkZSBiw7pzcXVlZGEpXG5cdFxcJHsxOi8vIElyIGFsIGluaWNpb31cblx0d2hpbGUgKG5vdCBcXCR7MjovLyBlbmNvbnRyw6kgbG8gcXVlIGJ1c2NhYmF9KSB7XG5cdFx0XFwkezM6Ly8gSXIgYWwgcHLDs3hpbW8gZWxlbWVudG99XG5cdH1cblx0cmV0dXJuIChcXCR7MjovLyBlbmNvbnRyw6kgbG8gcXVlIGJ1c2NhYmEgfSlcblxuIyByZWNvcnJpZG8gKGRlIGLDunNxdWVkYSBjb24gYm9yZGUpXG5zbmlwcGV0IHJlY29ycmlkbyAoZGUgYsO6c3F1ZWRhIGNvbiBib3JkZSlcblx0XFwkezE6Ly8gSXIgYWwgaW5pY2lvfVxuXHR3aGlsZSAobm90IFxcJHsyOi8vIGVuY29udHLDqSBsbyBxdWUgYnVzY2FiYX0gJiYgbm90IFxcJHszOi8vIGVzIMO6bHRpbW8gZWxlbWVudG99KSB7XG5cdFx0XFwkezQ6Ly8gSXIgYWwgcHLDs3hpbW8gZWxlbWVudG99XG5cdH1cblx0cmV0dXJuIChcXCR7MjovLyBlbmNvbnRyw6kgbG8gcXVlIGJ1c2NhYmEgfSlcblxuIyByZWNvcnJpZG8gKGRlIHRpcG9zIGVudW1lcmF0aXZvcylcbnNuaXBwZXQgcmVjb3JyaWRvIChkZSB0aXBvcyBlbnVtZXJhdGl2b3MpXG5cdFxcJHsxOmVsZW1lbnRvQWN0dWFsfSA6PSBcXCR7MjptaW5FbGVtZW50bygpfVxuXHR3aGlsZSAoXFwkezE6ZWxlbWVudG9BY3R1YWx9IC89IFxcJHszOm1heEVsZW1lbnRvKCl9KSB7XG5cdFx0XFwkezQ6Ly8gUHJvY2VzYXIgY29uIGVsZW1lbnRvIGFjdHVhbH1cblx0XHRcXCR7MTplbGVtZW50b0FjdHVhbH0gOj0gc2lndWllbnRlKFxcJHsxOmVsZW1lbnRvQWN0dWFsfSlcblx0fVxuXHRcXCR7NDovLyBQcm9jZXNhciBjb24gZWxlbWVudG8gYWN0dWFsfVxuXG4jIHJlY29ycmlkbyAoZGUgYsO6c3F1ZWRhIHNvYnJlIGxpc3RhKVxuc25pcHBldCByZWNvcnJpZG8gKGRlIGLDunNxdWVkYSBzb2JyZSBsaXN0YSlcblx0XFwkezE6bGlzdGFSZWNvcnJpZGF9IDo9IFxcJHsyOmxpc3RhfVxuXHR3aGlsZSAocHJpbWVybyhcXCR7MTpsaXN0YVJlY29ycmlkYX0pIC89IFxcJHszOi8vZWxlbWVudG8gYnVzY2Fkb30pIHtcblx0XHRcXCR7MTplbGVtZW50b0FjdHVhbH0gOj0gc2luRWxQcmltZXJvKFxcJHsxOmVsZW1lbnRvQWN0dWFsfSlcblx0fVxuXHRyZXR1cm4gKHByaW1lcm8oXFwkezE6bGlzdGFSZWNvcnJpZGF9KSlcblxuIyByZWNvcnJpZG8gKGRlIGLDunNxdWVkYSBzb2JyZSBsaXN0YSBjb24gYm9yZGUpXG5zbmlwcGV0IHJlY29ycmlkbyAoZGUgYsO6c3F1ZWRhIHNvYnJlIGxpc3RhIGNvbiBib3JkZSlcblx0XFwkezE6bGlzdGFSZWNvcnJpZGF9IDo9IFxcJHsyOmxpc3RhfVxuXHR3aGlsZSAobm90IGVzVmFjw61hKFxcJHsxOmxpc3RhUmVjb3JyaWRhfSkgJiYgcHJpbWVybyhcXCR7MTpsaXN0YVJlY29ycmlkYX0pIC89IFxcJHszOi8vZWxlbWVudG8gYnVzY2Fkb30pIHtcblx0XHRcXCR7MTplbGVtZW50b0FjdHVhbH0gOj0gc2luRWxQcmltZXJvKFxcJHsxOmVsZW1lbnRvQWN0dWFsfSlcblx0fVxuXHRyZXR1cm4gKG5vdCBlc1ZhY8OtYShcXCR7MTpsaXN0YVJlY29ycmlkYX0pKVxuXG4jIGRvY3MgKHByb2NlZGltaWVudG8pXG5zbmlwcGV0IGRvY3MgKHByb2NlZGltaWVudG8pXG5cdC8qXG5cdFx0QFBST1DDk1NJVE86IFxcJHsxOi4uLn1cblx0XHRAUFJFQ09ORElDScOTTjogXFwkezI6Li4ufVxuXHQqL1xuXG4jIGRvY3MgKHByb2NlZGltaWVudG8gY29uIHBhcsOhbWV0cm9zKVxuc25pcHBldCBkb2NzIChwcm9jZWRpbWllbnRvIGNvbiBwYXLDoW1ldHJvcylcblx0Lypcblx0XHRAUFJPUMOTU0lUTzogXFwkezE6Li4ufVxuXHRcdEBQUkVDT05ESUNJw5NOOiBcXCR7MjouLi59XG5cdFx0QFBBUsOBTUVUUk9TOlxuXHRcdFx0XHQqIFxcJHszOm5vbWJyZURlbFBhcsOhbWV0cm99IDogXFwkezQ6VGlwb30gLSBcXCR7NTpkZXNjcmlwY2nDs259XG5cdCovXG5cbiMgZG9jcyAoZnVuY2nDs24pXG5zbmlwcGV0IGRvY3MgKGZ1bmNpw7NuKVxuXHQvKlxuXHRcdEBQUk9Qw5NTSVRPOiBcXCR7MTouLi59XG5cdFx0QFBSRUNPTkRJQ0nDk046IFxcJHsyOi4uLn1cblx0XHRAVElQTzogXFwkezM6Li4ufVxuXHQqL1xuXG4jIGRvY3MgKGZ1bmNpw7NuIGNvbiBwYXLDoW1ldHJvcylcbnNuaXBwZXQgZG9jcyAoZnVuY2nDs24gY29uIHBhcsOhbWV0cm9zKVxuXHQvKlxuXHRcdEBQUk9Qw5NTSVRPOiBcXCR7MTouLi59XG5cdFx0QFBSRUNPTkRJQ0nDk046IFxcJHsyOi4uLn1cblx0XHRAUEFSw4FNRVRST1M6XG5cdFx0XHRcdCogXFwkezM6bm9tYnJlRGVsUGFyw6FtZXRyb30gOiBcXCR7NDpUaXBvfSAtIFxcJHs1OmRlc2NyaXBjacOzbn1cblx0XHRAVElQTzogXFwkezY6Li4ufVxuXHQqL1xuYDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==