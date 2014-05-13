open System
open System.IO
open System.Collections

let romToBase64 () =
    let rec bytes acc = function
        | a::b::c::d::e::f::g::h::t -> bytes ([a;b;c;d;e;f;g;h] :: acc) t
        | [] -> List.rev acc
        | _ -> failwith "Partial byte!"
    File.ReadAllLines @"..\..\..\ROMs\35v2.obj"
    |> List.ofArray
    |> List.map (fun line -> Convert.ToInt32((line.Split ':').[1], 8))
    |> List.map (fun i -> [ for b in 9 .. -1 .. 0 -> 1 <<< b &&& i <> 0])
    |> List.concat
    |> bytes []
    |> Seq.map (
        List.rev
        >> List.mapi (fun i b -> if b then int (2. ** float i) else 0)
        >> List.sum
        >> byte)
    |> Seq.toArray
    |> Convert.ToBase64String