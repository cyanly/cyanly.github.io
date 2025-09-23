---
title: "Embedding JavaScript Engine in Go, a Survey"
date: 2016-02-15
draft: false
---

> **tl;dr**, results:

|             | time    | peak cpu% | peak mem | binary size |
|-------------|---------|-----------|----------|-------------|
| `native GO` | 0.059s  | 96%       | 2,056    | 2.3M        |
| `node fib.js` | 0.157s | 97%      | 22,752   | -           |
| **Otto**    | 165.801s| 112%      | 11,180   | 7.0M        |
| **Duktape** | 9.060s  | 99%       | **4,676**| **5.1M**    |
| **V8**      | **0.108s** | 99%    | 12,676   | 13.0M       |

---

> GO programs are pre-compiled, so there is room for a run-time scripting language:

- Workflow/Job control scripting, rule engines
- Extensions/Plugins
- Application specific scripting (formulas/actions for non-technical users)
- Embedded hardware systems (where CI is hard, physical power is limited)
- Sand-boxed for run-time security

There are many to choose from:

- SQL
- Lua
- VBA
- Javascript
- Python
- roll your own

Why Javascript:

Doesn't have to, but I am working on a project and I am fascinated by both the beauty and beast sides using PostgreSQL's Javascript extension PL/V8.

Now the question is how?

## Baseline #1, Javascript fib.js

```javascript
function fib(n) {
  if (n < 2) return n;
  return fib(n - 2) + fib(n - 1);
}

console.log(fib(35));
```

Result:
```bash
~/temp/gov8$ time node fib.js
9227465

real    0m0.157s
user    0m0.156s
sys     0m0.000s
```
CPU: 97% MEM: 22,752

## Baseline #2, Native GO binary

```go
package main

import "fmt"

func fib(n int) int {
    if n < 2 {
        return n
    }
    return fib(n-2) + fib(n-1)
}

func main() {
    fmt.Println(fib(35))
}
```

Result:
```bash
~/temp/gov8$ time ./fib
9227465

real    0m0.059s
user    0m0.052s
sys     0m0.008s
```
CPU: 96% MEM: 2056

## Otto

Otto is a JavaScript parser and interpreter written natively in Go.

```go
package main

import (
    "github.com/robertkrimen/otto"
)

func DiscardSendSync(msg string) string { return "" }

func main() {
    vm := otto.New()
    vm.Run(`
function fib(n) {
  if (n < 2) return n;
  return fib(n - 2) + fib(n - 1);
}

console.log(fib(35));
    `)
}
```

Result:
```bash
~/temp/gov8$ time ./fibOtto
9227465

real    2m45.801s
user    2m41.944s
sys     0m21.596s
```
CPU: 112% MEM: 11,180

## Duktape

Duktape is an embeddable Javascript engine, with a focus on portability and compact footprint.

```go
package main

import (
    "github.com/olebedev/go-duktape"
    "log"
)

func main() {
    ctx := duktape.New()
    if err := ctx.PevalString(`
function fib(n) {
  if (n < 2) return n;
  return fib(n - 2) + fib(n - 1);
}

print(fib(35));
    `); err != nil {
        log.Fatal(err)
    }
}
```

Result:
```bash
~/temp/gov8$ time ./fibduk
9227465

real    0m9.060s
user    0m9.048s
sys     0m0.004s
```
CPU: 99% MEM: 4,676

## V8

V8 is Google's open source, high performance JavaScript engine. It is written in C++ and is used in Google Chrome.

```go
package main

import (
    "github.com/ry/v8worker"
)

func DiscardSendSync(msg string) string { return "" }

func main() {
    worker := v8worker.New(DiscardSendSync)
    err := worker.Load("fib.js", `
function fib(n) {
  if (n < 2) return n;
  return fib(n - 2) + fib(n - 1);
}

print(fib(35));
    `)
    if err != nil {
        println(err)
    }
}
```

Result:
```bash
~/temp/gov8$ time ./fibv8
9227465

real    0m0.108s
user    0m0.096s
sys     0m0.012s
```
CPU: 99% MEM: 12,676

## Summary

The performance differences are striking. V8 is only 2x slower than native Go, while Otto (being a pure Go interpreter) is nearly 3000x slower. Duktape offers a good middle ground with reasonable performance and the smallest memory footprint.

For production use:
- **V8** if you need maximum JavaScript performance and don't mind the larger binary size
- **Duktape** if you need a balance of performance and small footprint
- **Otto** if you need a pure Go solution and performance isn't critical

All benchmarks were run on the same hardware with the Fibonacci function calculating fib(35) = 9227465.