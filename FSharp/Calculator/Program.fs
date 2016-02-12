open System
open System.Collections

let calculator input output rom =
    let r = Array.init 8 (fun _ -> Array.create 14 0)
    let s = Array.create 12 0
    let p = ref 0
    let pc, offset, ret = ref 0, ref 0, ref 0
    let carry, carry' = ref false, ref false
    let visible, disp = ref false, ref ""
    let waiting, lastKey = ref 0, ref 0
    let halt = ref false
    let exec code =
        let doCarry res = carry := (res > 9 || res < 0); (res + 10) % 10
        let doOp fn x y = doCarry (fn (fn x y) (if !carry then 1 else 0))
        let iteric c fn (first, last) = carry := c; for i in first..last do fn i
        let iteri fn = iteric !carry fn
        let setreg a b = iteri (fun i -> r.[a].[i] <- r.[b].[i])
        let zeroreg reg = setreg reg 7
        let shiftl a (f, l) = for i in (List.rev [f..l]) do r.[a].[i] <- if i = f then 0 else r.[a].[i - 1]
        let shiftr a (f, l) = for i in f..l do r.[a].[i] <- if i = l then 0 else r.[a].[i + 1]
        let arith op a b c = iteri (fun i -> r.[a].[i] <- (doOp op) r.[b].[i] r.[c].[i])
        let add = arith (+)
        let sub = arith (-)
        let regsgte a b = iteri (fun i -> (doOp (-)) r.[a].[i] r.[b].[i] |> ignore)
        let regsgte1 a = iteric true (fun i -> carry := !carry && r.[a].[i] = 0)
        let negcdec dec = iteric dec (fun i -> r.[2].[i] <- (doOp (-)) 0 r.[2].[i])
        let opreg op a = iteric true (fun i -> r.[a].[i] <- (doOp op) r.[a].[i] 0)
        let ifregzero a = iteri (fun i -> carry := !carry || r.[a].[i] <> 0)
        let exchreg a b = iteri (fun i -> let t = r.[a].[i] in r.[a].[i] <- r.[b].[i]; r.[b].[i] <- t)
        let opp fn = p := (fn !p 1) &&& 0xf
        let iterir fn = for i in 0..13 do fn i
        let move pairs = iterir (fun i -> List.iter (fun (a, b) -> r.[a].[i] <- r.[b].[i]) pairs)
        let n = (code &&& 0b1111111100) >>> 2
        pc := (!pc + 1) % 256
        match code &&& 0b11 with 
        | 0b11 -> if not !carry' then pc := n
        | 0b01 -> ret := !pc; pc := n
        | 0b10 -> [| ifregzero 1; regsgte 0 2; setreg 2 1; zeroreg 2; shiftl 0; sub 2 0 2; setreg 0 2; add 2 0 2
                     regsgte 0 1; shiftr 2; shiftr 1; shiftr 0; sub 0 0 1; sub 0 0 2; add 0 0 1; add 0 0 2; zeroreg 1
                     regsgte1 2; negcdec false; negcdec true; setreg 1 0; opreg (-) 2; ifregzero 2; opreg (+) 2
                     exchreg 1 2; regsgte1 0; add 2 2 2; zeroreg 0; exchreg 0 1; opreg (-) 0; exchreg 0 2; opreg (+) 0
                  |].[16 * (n / 8 &&& 1) + (n / 16)] [|!p,!p; 3,12; 0,2; 0,13; 0,!p; 3,13; 2,2; 13,13|].[n % 8]
        | 0b00 -> let arg = n / 16
                  match n % 16 with
                      | 0 -> () // no-op
                      | 1 -> s.[arg] <- 1
                      | 3 -> p := arg
                      | 4 when arg = 3 -> pc := !lastKey
                      | 4 when arg % 2 = 0 -> let r = arg / 2 in offset := r * 256
                      | 5 -> carry := s.[arg] <> 0; if arg = 0 then waiting := !waiting + 1
                      | 6 -> (if !p < 14 then r.[2].[!p] <- arg); opp (-)
                      | 7 -> opp (-)
                      | 9 -> s.[arg] <- 0
                      | 10 -> match arg with
                              | 0  -> visible := not !visible
                              | 2  -> exchreg 2 6 (0, 13)
                              | 4  -> move [5, 4; 4, 3; 3, 2]
                              | 6  -> move [0, 3; 3, 4; 4, 5]
                              | 8  -> visible := false
                              | 10 -> setreg 2 6 (0, 13)
                              | 12 -> iterir (fun i -> let t = r.[2].[i] in List.iter (fun (a, b) -> r.[a].[i] <- r.[b].[i]) [2,3; 3,4; 4,5]; r.[5].[i] <- t)
                              | 14 -> for i in 0..13 do for j in 0..7 do r.[j].[i] <- 0
                      | 11 -> carry := !p = arg
                      | 12 -> pc := !ret
                      | 13 -> for i in 0..11 do s.[i] <- 0
                      | 15 -> p := (!p + 1) &&& 0xf
    let display () =
        if not !visible then "" else
            let render i a b =
                (if b >= 8 then " "
                 elif i = 2 || i = 13 then (if a >= 8 then "-" else " ")
                 else string a) + (if b = 2 then "." else "")
            Array.mapi2 render r.[0] r.[1] |> Array.rev |> Array.fold (+) ""
    let code = let bits = let toBits b = [|for s in 0..7 -> 0x80uy >>> s &&& b |> min 1uy|]
                          rom |> Convert.FromBase64String |> Array.collect toBits
               [for i in 0..767 -> List.sum [for b in 0..9 -> (int bits.[i * 10 + 9 - b]) <<< b]]
    let rec step () =
        let disp' = display ()
        if disp' <> !disp then output disp'; disp := disp'
        carry' := !carry; carry := false
        exec code.[!offset + !pc]
        if !waiting > 1 then
            match input () with
            | Some k ->
                match List.tryFind (fst >> (=) k)
                 ['0',36; '1',28; '2',27; '3',26; '4',20; '5',19; '6',18; '7',52; '8',51; '9',50; '.',35; '-',54; '+',22
                  '*',30; '/',38; 'p',34; '~',59; '!',0;  'x',58; 'a',44; 's',43; 'c',42; 't',40; 'l',3;  'g',4;  'e',2
                  '^',6;  'q',46; 'f',14; 'w',12; 'r',11; '>',10; '<',8;  ',',56; ' ',62] with
                  | Some (_, addr) -> lastKey := addr; s.[0] <- 1; waiting := 0
                  | None -> halt := k = '`'
            | None -> ()
        if not !halt then step () else disp'
    step ()

let rom = // HP-35 v2 ROM
    "N2/4kBdRJEIREFRQsXzDajZ7u+ILiQ+r6vqGuaSoqg//q+r6gwMwqmoEN07MDAACDUQRC7k" +
    "Qn6EwsLiQyjb/q+r6hLmfqO13d27OMTg0oDSzt3qjb0uvpFtqh9uo3zbTI3y67jUVPfj+dR" +
    "X0ocQzlq767EfR1hOVtbLF7i57hMRIPGiZtbou6Y7K/6a6kUX961RJBBLUHOzuVSqzk6wrq" +
    "gag8qlKYrwd3tYHCsR/DLuvb4viIwPNilsApH+LLgwP5qAu/r+n6foSqP67pmmp/romEq+6" +
    "O+oDr7qNhmUtMHFqpLDGmcN6rEmJv0GuskO1UTd7OZ6JM/fqBFUzd6sbCgFMfCQHMs0OKIU" +
    "zNDlkNBKOu/VxOVTlj0U5PmvvP6pMP7o0lyNqev3M4NGOwxuvfKpeufUzqkURPKgqesZu77" +
    "fz8uKFqChaiVAn65VBLN6mUopWYSVaimaU2u7viSbplqpJuhntJ6h3s6jkoi5B4uQze0o65" +
    "oi3K5jiKy9jhUJelG3VQVz+74N6S3463+zJ0suS7Ujvaizuyy5Eko/7/iPM4Knit1Ymo65D" +
    "KRYybYMm0jIYoybY5m3MUOm0jstzGrqZlRsz+mEZDOWJ6hUpemcxq6lcxq6rpVq7rcxoycY" +
    "5gydSMhhjJxQycZxy6TtMVj72MhhmFYJhGJYFTawwu74gQRBDqWi6h3+w6g+ORBEFKRB4tO" +
    "qPzkOByUgsqct3ixay+WRYHAss8twc5bbwQXperq16fsbRCBsrP7LsORAzrMdiGFYNiWIYF" +
    "hmDYVjDAwBDit7WJ/gsu/qrqGLm7Ok6KjKwyu0QpKkl+7N0sSjIjt+7vsmoB4B0O7JKKSX6" +
    "PgQz7/pWRIS2opljoUQ+7tGAOzl+AN/kulnYhHzJPueAdzG1gydZMnH+aMnF9bMnHfZxuWc" +
    "fZ65TgaMNTsuBxDhsMfrm+Oc5nqszFZUBtVJT9mnZT9nsQ2uWzJt32jJtfWTJt/mDJtm2bd" +
    "Mi7rmYjslF7+qesLxZZ+WQ5alzs40uqb5s8uw46rOi4zlmJR20YeZ52YGx15Ok4lJTDBzDY" +
    "NgGIYVgGJY6uWfiS5fobtLrkW67foju74sRJC0t+lfks+DAkLOi6g+OX6f+uRbrm3Mxyleq" +
    "8vsmu7LMXGa2xUAMktmfqMumJCJGYlg2BYRh2BY5v5mT45YsTs4PNsxd6r+wwLpi1tDlqm7" +
    "PzOSrjp+x/pmOC7DHrkw2BYBgWHYliGAYVhWDY3frkuYaul7fqznq8tnzOwwmDYBgmFYgdTH7"

let test keys expected =
    let keySequence = ref (List.ofSeq keys)
    let testInput () =
        match !keySequence with
        | h :: t -> keySequence := t; Some h
        | [] -> Some '`'
    let res = calculator testInput (fun _ -> ()) rom
    assert (res = expected)

test "~1.2345678909x~35" "-1.234567890-35" // entry
test "2 3+"          " 5.            " // add
test "3 2-"          " 1.            " // subtract
test "3 2*"          " 6.            " // multiply
test "3 2/"          " 1.5           " // divide
test "4f"            " .25           " // reciprocal
test "25q"           " 5.            " // square root
test "pl"            " 1.144729886   " // ln
test "pg"            " .4971498728   " // log
test "pe"            " 23.14069264   " // exp
test "ps"            " .054803665    " // sin
test "pc"            " .9984971498   " // cos
test "pt"            " .0548861507   " // tan
test "pgas"          " 29.81161556   " // sin-1
test "pgac"          " 60.18838444   " // cos-1
test "pat"           " 72.34321286   " // tan-1
test "1 2 3 4wrrrr"  " 3.            " // stack
test "123>456 ,<"    " 123.          " // memory
test "9sctatacas"    " 9.002983113   " // "Calculator Forensics" result
test "9 2^"          " 512.          " // power

calculator
    (fun () -> if Console.KeyAvailable then
                   let k = Console.ReadKey true
                   if k.Key = ConsoleKey.Enter then Some ' '
                   elif k.Key = ConsoleKey.Escape then Some '`'
                   else Some (Char.ToLower k.KeyChar)
               else None)
    (printf "\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b%s")
    rom |> ignore