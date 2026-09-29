# pi-implement-flow acceptance fixtures

Public, isolated synthetic resources for nanzhi84/pi-implement-flow.
No production data or credentials belong here.

The user explicitly approved changing this repository from private to public.
The original private GitHub plan rejected rule inspection; the public repository
now allows it. Historical release `acceptance-32e3acf` preserves the old negative
scenario and must not be treated as current-version evidence.

## Current structural planning fixtures

| Spec | Expected preflight result |
| --- | --- |
| #1 (child #2) | Valid structure, readable rules; incomplete startup still refused |
| #3 | Missing acceptance agreement |
| #4 (children #5/#6) | Textual dependency cycle |
| #7 (child #8) | Dependency #2 outside Spec |
| #9 (children #10/#11) | Native dependency #11 -> #10 |
| #12 (children #13/#14) | Qualified shorthand refused |
| #15 (children #16/#17) | Invalid zero reference not silently ignored |
| #18 (child #19) | Ambiguous None refused |
| #20 | Code example cannot satisfy planning after false closing marker |
| #21 | NBSP suffix cannot close a Markdown fence |

The source repository README at each evidence SHA contains exact commands and
prerequisites. Tests read existing fixture Issues; they do not mutate these data.
Full T1 startup, implementation, delivery and merge have not been accepted.

Evidence is stored in GitHub Releases named by source commit. Keep published
assets for at least 90 days and while any referring review remains open.
