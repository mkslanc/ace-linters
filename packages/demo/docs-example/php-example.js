export var phpContent = `
<?php
e
function nfact($n) {
    if ($n == 0) {
        return 1;
    }
    else {
        return $n * nfact($n - 1);
    }
}

echo "\\n\\nPlease enter a whole number ... ";
$num = trim(fgets(STDIN));

// ===== PROCESS - Determing the factorial of the input number =====
$output = "\\n\\nFactorial " . $num . " = " . nfact($num) . "\\n\\n";
echo $output;

?>
    `;
