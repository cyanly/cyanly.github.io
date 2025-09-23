---
title: "GoTrade - FIX Trading System in Golang"
date: 2016-01-23
draft: false
---

## GoTrade - a FIX protocol electronic trading and order management system written in Golang
###### *Jan 23, 2016*

---
# GoTrade [![GoDoc](https://godoc.org/github.com/cyanly/gotrade?status.png)](https://godoc.org/github.com/cyanly/gotrade) 
[github.com/cyanly/gotrade](https://github.com/cyanly/gotrade)
> GoTrade is a **FIX** protocol electronic trading and order management system written in Golang, structured for typical multi-asset instituional use

<p align="center">
  <img src="https://cdn.rawgit.com/cyanly/gotrade/gh-pages/orderrouting.svg" alt=""/>
</p>


## Status
This project is currently more of a proof of concept. It is no where near in completeness of a commerical product. This public repo serves as mostly for the purpose of experimenting and share of ideas.

## Getting Started
```
$ go get github.com/cyanly/gotrade
```

## Features

- [x] Trade in real-time via FIX through the broker-neutral API.
- [x] Normalized FIX order flow behavior across multiple FIX versions and asset classes.
- [x] Pure Go.
  - [x] Platform neutral: write once, build for any operating systems and arch (Linux/Windows/OSX etc).
  - [x] Native code performance.
  - [x] Ease of deployment.
  - [x] Lack of OOP verbosity, works for small and big teams.
- [x] Protobuf.
  - [x] Binary encoding format, efficient yet extensible.
  - [x] Easy Language Interoperability (C++, Python, Java, C#, Javascript, etc).
  - [x] Protocol backward compatibility.

## Design
```
└─ gotrade/
   ├─ core/                 -> The low-level API that gives consumers all the knobs they need
   │  ├─ order/
   │  │  └─ execution/
   │  ├─ service/
   └─ proto/...             -> Protobuf messaging protocol of various entities
   └─ services/             -> Core services managing multi-asset order flow
   │  ├─ orderrouter/       -> Centralized management facility for multi-asset global order flow
   │  ├─ marketconnectors/  -> Managing FIX connection to each trading venue, also performs pre-trade risk checks
   │
   └─cmd/...                -> Command-line executables, binary build targets
   
```


## Examples
**OrderRouter** and **MarketConnector** test cases will mock a testdb and messaging bus for end-to-end, message to message test. 

Pre-Requisites:
  - Go 1.3 or higher
  - ``` go get github.com/erikstmartin/go-testdb ```
  - An OSX or Linux machine

Run test cases in services:
```
$ cd $GOPATH/src/github.com/cyanly/gotrade/services
$ go test -v ./...
```

<p align="center">
  <img src="https://cdn.rawgit.com/cyanly/gotrade/gh-pages/servicestest.png" alt=""/>
</p>
