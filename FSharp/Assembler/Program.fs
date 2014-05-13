open System.IO
open System.Text.RegularExpressions

let asm code = 
    let (|Pat|_|) (p : string) s = 
        let m = Regex.Match(s, (p.Replace("X", "([^\s]+)") 
                                 .Replace("Y[Z]", "([^\[]+)\[([^\]]+)\]") 
                                 .Replace("[Z]", "\[([^\]]+)\]") 
                                 .Replace("Z", "([\d]+)"))) 
        if m.Success then Some(List.tail [for g in m.Groups -> g.Value]) else None 
    let labelsAndCode = 
        Path.GetFullPath code |> File.ReadAllLines |> List.ofSeq 
        |> List.choose (function 
            | Pat @"^\s*[\.;]" _ | Pat @"^\s*$" _ -> None // skip non-code (blank, comment, .rom, ...) 
            | Pat @"([^\s:]*):*\s+([^;\t]+)" [label; code] -> Some(label, code) 
            | _ -> failwith "Parse error.") 
    let labelLinesMap = 
        labelsAndCode 
        |> List.mapi (fun num (lbl, _) -> if lbl.Length > 0 then Some(lbl, num) else None) 
        |> List.choose id 
        |> Map.ofList 
    let label (lbl : string) = 
        if lbl.StartsWith("@") then System.Convert.ToInt32(lbl.Substring(1), 8) // octal address 
        else Map.find lbl labelLinesMap 
    let (|Fld|_|) = function 
        | "p" -> Some(-1, -1) 
        | "m" -> Some(3, 12) 
        | "x" -> Some(0, 2) 
        | "w" -> Some(0, 13) 
        | "wp" -> Some(0, -1) 
        | "ms" -> Some(3, 13) 
        | "xs" -> Some(2, 2) 
        | "s" -> Some(13, 13) 
        | _ -> failwith "Unsupported field name." 
    let sp = sprintf 
    let parse = function 
        | Pat "return" _ -> "retn" 
        | Pat "no operation" _ -> "nop" 
        | Pat "down rotate" _ -> "downrot" 
        | Pat "clear registers" _ -> "clearregs" 
        | Pat "clear status" _ -> "clears" 
        | Pat "display off" _ -> "dispoff" 
        | Pat "display toggle" _ -> "disptoggle" 
        | Pat "stack -> a" _ -> "stacka" 
        | Pat "c -> stack" _ -> "cstack" 
        | Pat "p \+ 1 -> p" _ -> "incp" 
        | Pat "p - 1 -> p" _ -> "decp" 
        | Pat "keys -> rom address" _ -> "keyrom" 
        | Pat "jsb X" [l] -> sp "jsb(%d)" (label l) 
        | Pat "go to X" [l] -> sp "goto(%d)" (label l) 
        | Pat "X -> sZ" [n; b] -> sp "sets(%s,%s)" b n // 5 –> s3 
        | Pat "select rom Z" [n] -> sp "setrom(%s)" n 
        | Pat "0 -> Y[Z]" [r; Fld (s, e)] -> sp "zeroreg(%s,%d,%d)" r s e // 0 -> a[w] 
        | Pat "0 - c - 1 -> c[Z]" [Fld (s, e)] -> sp "negsubc(%d,%d)" s e // 0 - c - 1 -> c[s] 
        | Pat "0 - c -> c[Z]" [Fld (s, e)] -> sp "negc(%d,%d)" s e // 0 - c -> c[x] 
        | Pat @"[^\s]+ \+ 1 -> Y[Z]" [r; Fld (s, e)] -> sp "increg(%s,%d,%d)" r s e // a + 1 -> a[p] 
        | Pat @"[^\s]+ - 1 -> Y[Z]" [r; Fld (s, e)] -> sp "decreg(%s,%d,%d)" r s e // a - 1 -> a[x] 
        | Pat "X \+ X -> Y[Z]" [r1; r2; r3; Fld (s, e)] -> sp "add(%s,%s,%s,%d,%d)" r3 r1 r2 s e
        | Pat "X - X -> Y[Z]" [r1; r2; r3; Fld (s, e)] -> sp "sub(%s,%s,%s,%d,%d)" r3 r1 r2 s e
        | Pat "X -> Y[Z]" [r1; r2; Fld (s, e)] -> sp "setreg(%s,%s,%d,%d)" r2 r1 s e // a -> b[w] 
        | Pat "X exchange Y[Z]" [r1; r2; Fld (s, e)] -> sp "exchreg(%s,%s,%d,%d)" r1 r2 s e
        | Pat "X exchange X" [r1; r2] -> sp "exchreg(%s,%s,%d,%d)" r1 r2 0 13 // c exchange m 
        | Pat "X -> p" [n] -> sp "setp(%s)" n // 3 –> p 
        | Pat "X -> X" [r2; r1] -> sp "setreg(%s,%s,%d,%d)" r1 r2 0 13 // c exchange m 
        | Pat "shift left Y[Z]" [r; Fld (s, e)] -> sp "shiftl(%s,%d,%d)" r s e // shiftl a[w] 
        | Pat "shift right Y[Z]" [r; Fld (s, e)] -> sp "shiftr(%s,%d,%d)" r s e // shiftr a[w] 
        | Pat "if Y[Z] = 0" [r; Fld (s, e)] -> sp "ifregzero(%s,%d,%d)" r s e // if c[xs] = 0 
        | Pat "if X >= Y[Z]" [r1; r2; Fld (s, e)] -> sp "regsgte(%s,%s,%d,%d)" r1 r2 s e
        | Pat "if Y[Z] >= 1" [r; Fld (s, e)] -> sp "regsgte1(%s,%d,%d)" r s e // if a[p] >= 1 
        | Pat "if sX = 0" [n] -> sp "tests(%s)" n // if s3 = 0 
        | Pat "if p # X" [n] -> sp "testp(%s)" n // if p # 11, 
        | Pat "load constant X" [n] -> sp "loadconst(%s)" n 
        | x -> sp "!!! UNKNOWN !!! %s" x 

    use output = new StreamWriter(@"..\..\..\ROMs\rom35v2.js") 
    labelsAndCode 
    |> List.map snd // code only 
    |> List.map parse 
    |> Seq.iter (fun a -> output.WriteLine(sprintf "    %s," a))

asm @"..\..\..\ROMs\35v2.asm"