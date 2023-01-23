export var rustContent = `
use std::ops::Range;

fn gav(x: i32, y: i32) -> i64 {
    (x - y) * (x + y)
}

fn main() {
    let num = 5;
    let a = vec![1, 2, 3];
    let b = Some(2);
    let c = None;
    let d = Range { start: 1, end: num };
    let e = 1..num;
    let f = "sssss".to_string();
    for a in d {
        for b in e {
            let c = gav(gav(a, b), a);
            assert_eq!(gav(a, b), a * a - b * b);
        }
    }
    let f = d
        .reduce(|a, b| {
            println!("{}", a);
            a * b
        })
        .unwrap();
}
`
