import { BlogArticle } from '../blog-article.model';

export const QUANTSMIND_AGENT: BlogArticle = {
  slug: 'quantsmind-agent',
  category: 'Technology',
  title: 'QuantsMind-Agent: A Local Coding Agent with Permission Controls',
  summary:
    'QuantsMind-Agent connects an OpenAI-compatible language model to a local project through a PySide6 desktop interface and a ' +
    'headless command-line interface. It reads, writes, edits and deletes files, runs approved commands and inspects Git state, with a ' +
    'deny-by-default permission layer and a human approval prompt gating every call.',
  maturity: 'Alpha · in-repository, unreleased',
  maturityVariant: 'prototype',
  intro:
    'An agent that can edit files and run commands on your machine is a qualitatively different tool from one that only suggests code. ' +
    'The interesting engineering in such a project is therefore not the model integration, which is unremarkable, but the permission ' +
    'model: what the agent is allowed to do, how a request for it is surfaced, and what happens when the model gets it wrong. ' +
    'QuantsMind-Agent is a compact example of that model, and its documentation is unusually direct about where its guarantees stop.',
  sections: [
    {
      heading: 'Two interfaces, one agent',
      blocks: [
        {
          kind: 'p',
          text:
            'The project ships a graphical interface built with PySide6 and Qt, and a headless command-line interface for the same ' +
            'capabilities. That pairing is deliberate rather than redundant. The desktop interface is where a person reviews proposed ' +
            'actions and grants approval, because that review needs a readable transcript of what the agent intends to do. The headless ' +
            'interface is what runs in a terminal, a script or a job where there is no window to approve in — and it is consequently the ' +
            'mode in which the permission layer carries the whole weight.'
        },
        {
          kind: 'p',
          text:
            'Model integration is through an OpenAI-compatible endpoint, which means the agent is not tied to a single hosted model ' +
            'provider: any service or local server that speaks that interface can be pointed at. That is a practical advantage for a tool ' +
            'whose whole job is operating on private code, because the model can be one the operator already controls.'
        },
        {
          kind: 'card',
          card: 'architecture',
          title: 'How the pieces fit',
          body:
            'A model decides what to do; the tool layer exposes the project as operations; the permission layer decides whether an ' +
            'operation may proceed; the user is asked when approval is required. Git-state inspection is a read-only capability alongside ' +
            'the file and command operations.',
          points: [
            'Model: an OpenAI-compatible language model endpoint',
            'Tools: read, write, edit and delete files; run approved commands',
            'Git inspection: read-only status of repository state',
            'Interfaces: PySide6 desktop GUI and a headless CLI',
            'Licence: MIT'
          ]
        }
      ]
    },
    {
      heading: 'Permissions and human approval',
      blocks: [
        {
          kind: 'p',
          text:
            'The permission model is deny-by-default. Each tool declares the permissions it requires, and a call that has not been ' +
            'allowed is refused before it reaches the operating system. When a call needs a permission the session does not hold, the agent ' +
            'raises an approval request that the human must answer, and the answer is what permits the call. Nothing is granted ' +
            'implicitly by the model\'s confidence or by the tool\'s own description of itself.'
        },
        {
          kind: 'p',
          text:
            'This is the part of the design that carries the weight, because a coding agent\'s dangerous operations are the ordinary ones. ' +
            'Deleting a file, overwriting a source tree or running an arbitrary command are all things the model may legitimately judge to ' +
            'be necessary, and none of them should be possible without a decision that a person can see. Git state is treated separately: ' +
            'the agent may inspect it, but commits, pushes, checkouts and resets are deliberately blocked rather than merely gated.'
        },
        {
          kind: 'card',
          card: 'concept',
          title: 'Deny-by-default versus allow-by-default',
          body:
            'Allow-by-default assumes the model is usually right and treats the occasional exception as friction to be minimised. ' +
            'Deny-by-default assumes the model will occasionally propose something destructive and treats every capability as something ' +
            'that must be granted. For an agent operating on a real working tree, the second assumption is the one that matches the ' +
            'actual failure modes.'
        },
        {
          kind: 'card',
          card: 'distinction',
          title: 'An application-level control is not a sandbox',
          body:
            'The command policy is a deny list enforced inside the application. That prevents the agent from issuing a command it has ' +
            'been told not to issue. It does not prevent the process itself — or anything else running as the same user — from doing so. ' +
            'Real containment requires operating-system isolation, and the two should not be conflated when assessing risk.'
        }
      ]
    },
    {
      heading: 'What the agent does with a project',
      blocks: [
        {
          kind: 'p',
          text:
            'The tool surface is deliberately close to what a developer does at a terminal: read a file, write one, edit one, delete one, ' +
            'run a command, and look at the state of the repository. There is no capability here for reaching outside the project ' +
            'directory, and there is no capability for changing repository history. The result is an agent whose blast radius is bounded by ' +
            'the working tree it was pointed at and by the permissions the operator granted.'
        },
        {
          kind: 'p',
          text:
            'Git-state inspection deserves a specific note because it is one of the more useful things such a tool can do. Knowing that ' +
            'the tree is dirty, or which files are staged, changes what the model should propose: it is far easier to ask for a change ' +
            'when you know the repository is in a particular state. Reading that state is safe; mutating it is not, and the two are ' +
            'separated.'
        },
        {
          kind: 'card',
          card: 'implementation',
          title: 'Why repository mutations are blocked outright',
          body:
            'Committing, pushing, checking out and resetting all rewrite or publish history in ways that are difficult to reverse and easy ' +
            'to get wrong. Blocking them removes a class of damage that no approval prompt reliably prevents, because the consequences ' +
            'appear after the prompt, on a remote, or in someone else\'s working tree.'
        }
      ]
    },
    {
      heading: 'Maturity and limitations',
      blocks: [
        {
          kind: 'p',
          text:
            'The declared version is 0.2.0, but it exists only inside the repository: no release has been published and no package is ' +
            'distributed, so the version number describes intent rather than something installable. Platform support is asymmetric as well. ' +
            'Windows is the only platform the graphical interface has been run on; macOS is listed as planned and BSD is unsupported. ' +
            'There is also a documented unresolved issue in which the GUI intermittently aborts on one CPython version.'
        },
        {
          kind: 'card',
          card: 'maturity',
          title: 'Alpha, unpublished, Windows-verified',
          body:
            'The project is best read as source you inspect and run rather than as a released tool. Its permission model is a genuine ' +
            'design strength, but its guarantees are application-level and its platform coverage is narrow.',
          points: [
            'Version: 0.2.0 declared in the repository; no release or package published',
            'Platforms: Windows GUI verified; macOS planned; BSD unsupported',
            'Known issue: intermittent GUI abort on one CPython version, documented as unresolved',
            'Not provided: operating-system sandboxing of agent actions'
          ]
        },
        {
          kind: 'card',
          card: 'requirements',
          title: 'What it needs to run',
          body:
            'The graphical interface brings a Qt binding with it, which is the main non-standard dependency and the reason platform ' +
            'support is limited to where those bindings are well established.',
          points: [
            'GUI: Python with PySide6 and Qt',
            'Headless use: the CLI needs no GUI stack',
            'Model: an OpenAI-compatible endpoint the operator controls',
            'Licence: MIT'
          ]
        }
      ]
    }
  ],
  verification: [
    { label: 'QuantsMind-Agent on the Technology Ecosystem page', route: '/technology' }
  ],
  conclusion:
    'QuantsMind-Agent is a compact but honest coding agent: a conventional tool surface, a real deny-by-default permission layer with ' +
    'human approval, repository mutations blocked outright, and read-only Git inspection where it is safe. It is an unpublished alpha ' +
    'verified on Windows, and its permission guarantees are application-level rather than a substitute for system isolation.'
};
