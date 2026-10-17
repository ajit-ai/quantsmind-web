import { BlogArticle } from '../blog-article.model';

export const KARKAIN: BlogArticle = {
  slug: 'karkain',
  category: 'Technology',
  title: 'Karkain: A Statically Typed Systems Language with a Self-Hosted Compiler',
  summary:
    'Karkain is an independently developed systems programming language that lowers .kark source through its own lexer, parser, ' +
    'semantic analysis and SSA intermediate representation before emitting C23 and delegating machine-code generation to a host C toolchain. ' +
    'This article traces that pipeline stage by stage and separates what ships in 1.1.0 from what remains a roadmap direction.',
  maturity: 'Developer preview · v1.1.0 published',
  maturityVariant: 'experimental',
  intro:
    'Compiling a language is a good way to learn what a language actually is, because every abstract design decision becomes a concrete ' +
    'question about tokens, types and machine code. Karkain is a case worth tracing because its pipeline is unusually legible: it owns ' +
    'lexing, parsing, type and borrow checking, and an SSA-form intermediate representation, and it stops only at the point where a ' +
    'native C toolchain takes over. That boundary makes it possible to describe precisely which compiler stages belong to the project and ' +
    'which belong to GCC, Clang or MSVC — a distinction that is routinely blurred when languages advertise "native performance".',
  sections: [
    {
      heading: 'Design intent and language surface',
      blocks: [
        {
          kind: 'p',
          text:
            'Karkain is designed as a systems programming language: statically typed, compiled ahead of time, without a garbage ' +
            'collector or a managed runtime. The memory-safety model is ownership-based. A value has one owner at a time; other code ' +
            'borrows a reference for a bounded period rather than aliasing it freely. This is checked before code is generated, so the ' +
            'classes of defect that ownership is designed to remove — use-after-free, double release, dangling references — are rejected ' +
            'by the compiler rather than discovered at runtime.'
        },
        {
          kind: 'p',
          text:
            'Error handling follows from the same choice. Option and Result replace null pointers and exceptions, so absence and failure ' +
            'are values the type system carries. Algebraic data types and pattern matching cover the cases that would otherwise need ' +
            'inheritance hierarchies or out-parameters. The specification is tracked in the repository, and the language surface is ' +
            'expected to keep evolving at this stage.'
        },
        {
          kind: 'card',
          card: 'concept',
          title: 'Ownership and borrowing in one paragraph',
          body:
            'Ownership is a compile-time rule about aliasing. Each value has a single owner. Additional access is granted as a borrow, ' +
            'which is either shared — many readers, no mutation — or exclusive — one writer, no other access — and every borrow is ' +
            'released before the owner moves or goes out of scope. Because the compiler tracks these relationships, it can reject ' +
            'mutating a value that is still borrowed, which is the bug class behind iterator invalidation and data races in languages ' +
            'without such rules.',
          points: [
            'One owner per value at any time',
            'Borrows are shared or exclusive, and time-limited',
            'Errors surface as Option and Result values, not exceptions',
            'Violations are compile errors, not runtime faults'
          ]
        }
      ]
    },
    {
      heading: 'The compilation pipeline, stage by stage',
      blocks: [
        {
          kind: 'p',
          text:
            'A Karkain program is compiled through a deterministic sequence of stages. The lexer tokenises the .kark source into a ' +
            'token stream. The parser consumes that stream and builds an abstract syntax tree using arena allocation, with line tracking ' +
            'retained so diagnostics can point at the source rather than at a byte offset. Macro expansion happens before semantic ' +
            'analysis, so that the checker sees the program the user effectively wrote.'
        },
        {
          kind: 'p',
          text:
            'Semantic analysis performs type checking and borrow checking. This is the stage where an ill-typed program is rejected, and ' +
            'where the ownership rules are enforced: a borrow that outlives its owner or conflicts with a mutable borrow is an error here, ' +
            'long before any code is emitted. A well-formed AST is then lowered to static single-assignment form, an intermediate ' +
            'representation in which every variable is assigned exactly once and control flow is expressed explicitly in a ' +
            'control-flow graph. On the IR, constant folding and dead-code elimination run before a verifier checks types and control flow ' +
            'once more.'
        },
        {
          kind: 'p',
          text:
            'The final stage emits C23. That output is handed to a host C compiler — GCC, Clang or MSVC — which performs machine-code ' +
            'generation and linking. This is where the delegation to an external toolchain happens, and it is the reason a working C ' +
            'compiler is a prerequisite for building Karkain programs rather than an optional optimisation.'
        },
        {
          kind: 'card',
          card: 'architecture',
          title: 'Which stages belong to Karkain',
          body:
            'Karkain owns lexing, parsing, macro expansion, semantic and borrow analysis, lowering to SSA IR, optimisation and the C23 ' +
            'emitter. It does not own machine-code generation or linking; those belong to the host C toolchain. The distinction matters ' +
            'when judging claims about the compiler: correctness of ownership enforcement is Karkain\'s responsibility, while the ' +
            'performance of the resulting binary depends substantially on the downstream C compiler.',
          points: [
            'Frontend: pkg/lexer, pkg/parser',
            'Analysis: pkg/sema — type checking, borrow checking, macro expansion',
            'IR: pkg/ir, pkg/codegen — SSA form, control-flow graph, lowering',
            'Backend: pkg/codegen emits C23; a C compiler links the binary'
          ]
        },
        {
          kind: 'card',
          card: 'distinction',
          title: 'Source generation is not native compilation',
          body:
            'Karkain performs source-to-source lowering: it produces a C23 translation unit that a different compiler then processes. ' +
            'That is different from a compiler that emits machine code or its own object format directly, and it is different again from ' +
            'a language that delegates to an external compiler framework such as LLVM for its entire representation layer. The practical ' +
            'consequence is that Karkain\'s own optimisation passes operate on SSA IR that exists before any C code is written.',
          points: [
            'Karkain: parsing through C23 emission, including its own IR and optimiser',
            'Host toolchain: machine-code generation and linking',
            'Not the case: an external IR framework owning the representation layer'
          ]
        }
      ]
    },
    {
      heading: 'Self-hosting, the runtime and a second execution path',
      blocks: [
        {
          kind: 'p',
          text:
            'Self-hosting is the project\'s independence goal: the compiler written in Karkain compiles Karkain. The front-end is ' +
            'being brought up through a bootstrap path — a version compiled through C first — and it is already the language\'s default ' +
            'engine. In the repository the compiler\'s own sources are laid out as lexer.kark feeding parser.kark, ast.kark alongside ' +
            'atypes.kark, sema.kark alongside checker.kark, and codegen.kark producing main.kark. The practical value is independence rather ' +
            'than speed: once the toolchain builds itself, day-to-day development no longer depends on another language\'s toolchain.'
        },
        {
          kind: 'p',
          text:
            'Alongside native compilation there is a second execution path. Programs can be emitted as Karkain module bytecode (.kbc) ' +
            'and executed by Karkain\'s own stack-based virtual machine and JIT engine. That is a genuinely separate path from native C23 ' +
            'compilation, and it is the route through which the project can move toward a JIT tier later.'
        },
        {
          kind: 'card',
          card: 'implementation',
          title: 'Two ways to run the same program',
          body:
            'Native compilation emits C23 and links with GCC, Clang or MSVC. The bytecode path emits .kbc modules and runs them on the ' +
            'Karkain VM. The same front end and IR serve both, which is why the IR is a project asset rather than an intermediate step ' +
            'that is thrown away.',
          points: [
            'Native: AST to SSA IR to C23 to a system C compiler',
            'Bytecode: AST to SSA IR to .kbc executed by the Karkain VM',
            'Runtime: tasks and channels for concurrency, no garbage collector'
          ]
        },
        {
          kind: 'card',
          card: 'distinction',
          title: 'Self-hosted does not mean self-sufficient',
          body:
            'A self-hosted front-end still bootstraps through C. It builds Karkain programs by emitting C23 and linking with a system C ' +
            'compiler, so the bootstrap stage depends on an external toolchain even though steady-state development does not. This is a ' +
            'normal bootstrap structure, but it means "compiles itself" is not the same claim as "requires nothing external".'
        }
      ]
    },
    {
      heading: 'Standard library and toolchain',
      blocks: [
        {
          kind: 'p',
          text:
            'The standard library is written as .kark modules — the same language applications use — rather than as a C library ' +
            'surfaced through a foreign-function interface. That choice means the standard library participates in the same ownership ' +
            'and error-handling discipline as user code instead of being a boundary where those guarantees stop. The modules shipped in ' +
            '1.1.0 cover a core foundation, strings and text, collections, input and output, encoding, cryptography and mathematics.'
        },
        {
          kind: 'p',
          text:
            'The toolchain is a single binary with subcommands rather than a set of separate tools. The same command checks a file, ' +
            'builds it, runs it and discovers tests, which keeps the feedback loop short for a language still changing shape.'
        },
        {
          kind: 'card',
          card: 'requirements',
          title: 'Prerequisites and daily commands',
          body:
            'A C compiler is required, because it performs the final machine-code step. Target triples are Karkain\'s own model, covering ' +
            'x86_64, aarch64 and wasm32 over windows, linux and wasi; running a foreign target is refused rather than attempted.',
          code: [
            'karkain check hello.kark        # validate syntax and semantics',
            'karkain build hello.kark        # compile to a native executable',
            'karkain run hello.kark          # compile and execute in one step',
            'karkain test <path>             # *_test.kark files are auto-discovered',
            'karkain pkg add <pkg>           # resolve dependencies, write lockfile, fetch'
          ].join('\n'),
          codeLabel: 'Command line'
        },
        {
          kind: 'card',
          card: 'example',
          title: 'A complete program',
          body:
            'The smallest interesting program is three lines. Note that nothing declares a type, no package is imported for output, and ' +
            'there is no memory management to perform.',
          code: 'func main() {\n    print("hello world")\n}',
          codeLabel: 'hello.kark'
        },
        {
          kind: 'card',
          card: 'implementation',
          title: 'Standard library modules in 1.1.0',
          body:
            'The library is organised by area, each area a set of .kark modules. The collection and mathematics areas are the ones still ' +
            'described as under active development.',
          points: [
            'stdlib/core — identity, conversions, comparison over owned types',
            'stdlib/string — text processing on owned byte strings',
            'stdlib/collections — container and algorithm primitives',
            'stdlib/io, stdlib/system — console, filesystem, system-facing operations',
            'stdlib/encoding — structured encodings for data exchange',
            'stdlib/crypto, stdlib/math — cryptographic and numerical helpers'
          ]
        }
      ]
    },
    {
      heading: 'Heterogeneous direction: what works and what does not',
      blocks: [
        {
          kind: 'p',
          text:
            'Karkain\'s stated architecture reaches beyond a single CPU target. The project documents GPU kernel emission through WGSL, ' +
            'OpenCL and SPIR-V, and quantum circuits through OpenQASM 3.0 and QIR, with the ambition that one source file can describe ' +
            'work for several kinds of hardware. It is important to be precise about which parts of that reach are present. The CPU path ' +
            'is the production pipeline behind 1.1.0. SIMD-aware intrinsics and GPU kernel emission are described as evolving, and the ' +
            'quantum and wider hardware targets — NPUs, FPGAs, DPUs, neuromorphic classes — are a documented direction and a research ' +
            'horizon rather than shipping capability.'
        },
        {
          kind: 'card',
          card: 'maturity',
          title: 'Component status in the current release',
          body:
            'Version 1.1.0 is a published release. A published release means the project\'s own gate passed, not that an independent ' +
            'assessment of performance or reliability has been carried out.',
          points: [
            'Compiler core, self-hosting, language pipeline, runtime, standard library: published in 1.1.0',
            'Cross-compilation: target triples for x86_64, aarch64 and wasm32',
            'GPU and quantum backends: documented direction, not shipping capability',
            'JIT tier, additional type-system features, autodiff and quantum safety: planned'
          ]
        },
        {
          kind: 'card',
          card: 'distinction',
          title: 'Reading the roadmap honestly',
          body:
            'A target listed on a roadmap is a statement of direction. The GPU, WebAssembly and quantum paths should not be counted as ' +
            'working features on the basis that they appear in the architecture documentation, and no such capability should be assumed ' +
            'without checking the compiler and its tests.'
        }
      ]
    }
  ],
  verification: [
    { label: 'Karkain project page', route: '/karkain' }
  ],
  conclusion:
    'Karkain 1.1.0 is a working systems language with an unusually explicit compiler: ownership and borrow checking, an SSA ' +
    'intermediate representation, a self-hosted front end already serving as the default engine, and a standard library written in ' +
    'the language itself. What it produces today is C23 handed to a conventional C toolchain, and its experimental reach into GPU, ' +
    'WebAssembly and quantum targets remains direction rather than delivered capability.'
};
