let disassemble code = 
    let n = (code &&& 0b1111111100) >>> 2 
    match code &&& 0b11 with 
    | 0b11 -> sprintf "goto(%d)" n, sprintf "goto %d" n 
    | 0b01 -> sprintf "jsb(%d)" n, sprintf "jsb %d" n 
    | 0b10 ->
        let instr = [| 
            "ifregzero(b,%s)", "if b[%s] = 0" 
            "regsgte(a,c,%s)", "if a >= c[%s]" 
            "setreg(c,b,%s)",  "b -> c[%s]" 
            "zeroreg(c,%s)",   "0 -> c[%s]" 
            "shiftl(a,%s)",    "shiftl a[%s]" 
            "sub(c,a,c,%s)",   "a - c -> c[%s]" 
            "setreg(a,c,%s)",  "c -> a[%s]" 
            "add(c,a,c,%s)",   "a + c -> c[%s]" 
            "regsgte(a,b,%s)", "if a >= b[%s]" 
            "shiftr(c,%s)",    "shiftr c[%s]" 
            "shiftr(b,%s)",    "shiftr b[%s]" 
            "shiftr(a,%s)",    "shiftr a[%s]" 
            "sub(a,a,b,%s)",   "a - b -> a[%s]" 
            "sub(a,a,c,%s)",   "a - c -> a[%s]" 
            "add(a,a,b,%s)",   "a + b -> a[%s]" 
            "add(a,a,c,%s)",   "a + c -> a[%s]" 
            "zeroreg(b,%s)",   "0 -> b[%s]" 
            "regsgte1(c,%s)",  "if c[%s] >= 1" 
            "negc(%s)",        "0 - c -> c[%s]" 
            "negsubc(%s)",     "0 - c - 1 -> c[%s]" 
            "setreg(b,a,%s)",  "a -> b[%s]" 
            "decreg(c,%s)",    "c - 1 -> c[%s]" 
            "ifregzero(c,%s)", "if c[%s] = 0" 
            "increg(c,%s)",    "c + 1 -> c[%s]" 
            "exchreg(b,c,%s)", "b <-> c[%s]" 
            "regsgte1(a,%s)",  "if a[%s] >= 1" 
            "add(c,c,c,%s)",   "c + c -> c[%s]" 
            "zeroreg(a,%s)",   "0 -> a[%s]" 
            "exchreg(a,b,%s)", "a <-> b[%s]" 
            "decreg(a,%s)",    "a - 1 -> a[%s]" 
            "exchreg(a,c,%s)", "a <-> c[%s]" 
            "increg(a,%s)",    "a + 1 -> a[%s]" |] 
        let f = n / 8 
        let i = instr.[16 * (f &&& 1) + (f / 2)] 
        let field = [| 
            "-1,-1", "p" 
            "3,12",  "m" 
            "0,2",   "x" 
            "0,13",  "w" 
            "0,-1",  "wp" 
            "3,13",  "ms" 
            "2,2",   "xs" 
            "13,13", "s" |] 
        let fld (tup : string * string -> string) = (tup i).Replace("%s", tup field.[n % 8]) 
        fld fst, fld snd 
    | 0b00 ->
        let arg = n / 16 
        match n % 16 with 
            | 0 -> "nop", "no operation" 
            | 1 when arg < 12 -> sprintf "sets(%d,1)" arg, sprintf "1 -> s%d" arg
            | 3 -> sprintf "setp(%d)" arg, sprintf "%d -> p" arg 
            | 4 when arg = 3 -> "keyrom", "key -> rom" 
            | 4 when arg % 2 = 0 -> let r = arg / 2 in sprintf "setrom(%d)" r, sprintf "rom %d" r
            | 5 when arg < 12 -> sprintf "tests(%d)" arg, sprintf "if s%d = 0" arg
            | 6 when arg < 10 -> sprintf "loadconst(%d)" arg, sprintf "load %d" arg
            | 7 when arg = 0 -> "decp", "p - 1 -> p"
            | 9 when arg < 12 -> sprintf "sets(%d,0)" arg, sprintf "0 -> s%d" arg
            | 10 when arg % 2 = 0 -> 
                    [| "disptoggle",        "disptoggle" 
                       "exchreg(c,m,0,13)", "c <-> m" 
                       "cstack",            "c -> stack" 
                       "stacka",            "stack -> a" 
                       "dispoff",           "dispoff" 
                       "setreg(c,m,0,13)",  "m -> c" 
                       "downrot",           "rotd" 
                       "clearregs",         "clearregs" |].[arg / 2] 
            | 11 -> sprintf "testp(%d)" arg, sprintf "if p # %d" arg 
            | 12 when arg = 0  -> "retn", "return"
            | 13 when arg = 0  -> "clears", "clearstatus"
            | 14 when arg = 11 -> "// NOT USED BY HP-35", "data -> c"
            | 15 when arg = 0  -> "incp", "p + 1 -> p"

open System
open System.IO

let output = new StreamWriter(@"..\..\ROMs\rom35v2.js") 
output.WriteLine("var rom = [");
// Disassemble bits from http://www.pmonta.com/calculators/hp-35/35v2.obj
File.ReadAllLines @"..\..\ROMs\35v2.obj"
|> Seq.map (fun line -> Convert.ToInt32((line.Split ':').[1], 8)) 
|> Seq.map disassemble 
|> Seq.iteri (fun i (js, asm) ->
    output.WriteLine(("    " + js + ",").PadRight(25, ' ') + (sprintf "// %s" asm))) 
output.WriteLine("];");
output.Close()