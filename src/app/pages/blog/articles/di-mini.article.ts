import { BlogArticle } from '../blog-article.model';

export const DI_MINI: BlogArticle = {
  slug: 'quantsmind-document-intelligence-mini',
  category: 'Products',
  title: 'QuantsMind Document Intelligence Mini',
  summary:
    'DI Mini reads PDF, DOCX and TXT documents, extracts their text, and derives structured fields from labels the document itself states. ' +
    'It is a deterministic local application rather than a machine-learning system, and this article sets out exactly what it does and does not attempt to do.',
  maturity: 'Early access · not generally available',
  maturityVariant: 'early-access',
  intro:
    'Turning a folder of documents into a spreadsheet is a small problem with an outsized number of possible approaches. ' +
    'Machine-learning extraction can read a handwriting sample or infer a field that the document never labels. ' +
    'It can also misread a total, silently drop a page, and give you a confidence score that means nothing. ' +
    'QuantsMind Document Intelligence Mini takes the opposite position: when a document states "Invoice Number: 4471" as text, the value is recoverable with no model, no training data and no probability attached to the answer. ' +
    'That narrowness is the design decision, and understanding it is the fastest way to know whether this product fits a given document workflow.',
  sections: [
    {
      heading: 'The problem this product addresses',
      blocks: [
        {
          kind: 'p',
          text:
            'Most business documents mix free text with a small number of labelled fields. An invoice carries a total, a date, a ' +
            'purchase-order reference and a supplier name. A contract carries parties, dates and clause identifiers. A form carries ' +
            'whatever the form was designed to collect. The layout differs between issuers and the wording changes over time, but ' +
            'the fields themselves are usually stated in plain text near a recognisable label.'
        },
        {
          kind: 'p',
          text:
            'The traditional answer is to train an extraction model on labelled examples from your own documents. That works, and it is ' +
            'also a substantial undertaking: you need labelled data covering your real layouts, an evaluation set that represents the ' +
            'documents you will actually process, and the expectation to retrain whenever a form changes. DI Mini makes a different ' +
            'trade. It assumes the labels are present in the text and readable, and it parses what the document states.'
        },
        {
          kind: 'card',
          card: 'distinction',
          title: 'Text extraction is not optical character recognition',
          body:
            'OCR reconstructs glyphs from an image of text — the step required for a scanned page or a photograph. Text extraction ' +
            'starts from characters that already exist. DI Mini performs the second step, which means it needs a PDF that carries a ' +
            'text layer rather than a page scan. A scanned document without a text layer will produce no fields, quietly and without error.',
          points: [
            'Requires: a readable text layer in the source file',
            'Not included: OCR, handwriting recognition, image understanding',
            'Consequence: image-only scans are out of scope, not degraded'
          ]
        }
      ]
    },
    {
      heading: 'Ingestion and supported formats',
      blocks: [
        {
          kind: 'p',
          text:
            'The application reads three formats: PDF, DOCX and TXT. Each arrives through a format-specific reader that produces the ' +
            'same intermediate result — a stream of text with enough positional information to keep fields in reading order. PDF is ' +
            'the format that needs the most care, because a page can carry text in a visually sensible order and an internally ' +
            'unhelpful one; a reader that emits characters in the order they appear in the file will produce a plausible-looking and ' +
            'misordered result, which is far harder to notice than a failure.'
        },
        {
          kind: 'p',
          text:
            'DOCX is a compressed XML container, and TXT is a byte stream, so both are comparatively direct. What matters more than ' +
            'the format itself is that every reader resolves to the same representation before any field logic runs. Extracting a ' +
            'field is then a question about the text, not about the file it came from.'
        },
        {
          kind: 'card',
          card: 'implementation',
          title: 'One text pipeline behind three formats',
          body:
            'Each reader normalises its input into a common text representation with position information. Field derivation operates on ' +
            'that representation alone, so a rule written against an invoice behaves identically whether the invoice arrived as a PDF, ' +
            'a Word document or a plain-text export.'
        }
      ]
    },
    {
      heading: 'Deterministic field extraction',
      blocks: [
        {
          kind: 'p',
          text:
            'A field is derived by locating a label in the extracted text and taking the value that follows it. The label vocabulary is ' +
            'configurable, which matters because issuers disagree: one writes "Invoice No.", another writes "Invoice Number", a third ' +
            'writes "Bill Ref". Once a label is located, the value is read from the remainder of the line or the text between this ' +
            'label and the next recognised one.'
        },
        {
          kind: 'p',
          text:
            'The important property here is determinism. The same document always yields the same fields, and a value that could not ' +
            'be located is reported as missing rather than guessed. That is a meaningfully different failure model from a predictive ' +
            'system, where a confident wrong value is indistinguishable from a correct one.'
        },
        {
          kind: 'card',
          card: 'distinction',
          title: 'Deterministic parsing is not semantic understanding',
          body:
            'The implementation derives fields that the document states in text. It does not infer that "Net 30" implies a due date, ' +
            'classify a document that uses an unfamiliar layout, or recover a total from a table whose cells carry no labels. Those are ' +
            'understanding problems, and they are not solved here.',
          points: [
            'Present: fields the document states as labelled text',
            'Absent: named-entity recognition, classification, embeddings',
            'Absent: semantic search across a document collection'
          ]
        },
        {
          kind: 'card',
          card: 'example',
          title: 'What extraction produces',
          body:
            'For a labelled source document the output is a record of derived fields plus the text it was derived from. The record is ' +
            'exportable as JSON for programmatic use or as CSV for a spreadsheet. Missing fields appear as absent rather than empty ' +
            'guesses, so a downstream process can distinguish "not found" from "found and blank".'
        }
      ]
    },
    {
      heading: 'Operational workflow and deployment',
      blocks: [
        {
          kind: 'p',
          text:
            'The product runs as a single local process that serves its own web interface. There is no cloud account, no hosted tier and ' +
            'no per-seat licensing model visible from the application itself. The documents stay on the machine running the process, ' +
            'which is the practical reason a document-handling tool of this kind is often acceptable to compliance teams that would ' +
            'object to uploading the same files.'
        },
        {
          kind: 'card',
          card: 'requirements',
          title: 'What is required to run it',
          body:
            'A single local process serving a browser interface. No cloud account and no external service dependency are involved in the ' +
            'document path.',
          points: [
            'Deployment: one local process with its own web interface',
            'Data location: files remain on the machine running the process',
            'Access: arranged directly with QuantsMind; no published download'
          ]
        }
      ]
    },
    {
      heading: 'Maturity and limitations',
      blocks: [
        {
          kind: 'p',
          text:
            'The current version is 0.1.0 and the product is offered as early access, not as a generally available release. There is no ' +
            'published download, package-index entry or public repository for the product itself, so its behaviour cannot be checked ' +
            'against public source the way the QuantsMind technologies can. Claims about it in this article are therefore limited to ' +
            'what its documented scope states, and independent verification has not been possible.'
        },
        {
          kind: 'card',
          card: 'maturity',
          title: 'Early access, and what that means in practice',
          body:
            'Version 0.1.0 with access arranged directly through QuantsMind. Nothing here has been independently validated against a ' +
            'public specification or benchmark.',
          points: [
            'Release: v0.1.0, early access',
            'Not included: OCR, classification, named-entity recognition, embeddings, semantic search',
            'Not published: download, package index entry or public repository',
            'Unverified: behaviour against document layouts outside its own test set'
          ]
        }
      ]
    }
  ],
  verification: [
    { label: 'QuantsMind Document Intelligence Mini on the Products page', route: '/products' }
  ],
  conclusion:
    'DI Mini does one thing well and deliberately: it reads labelled text out of PDF, DOCX and TXT documents and exports the result ' +
    'as JSON or CSV, locally and repeatably. For document collections whose fields are stated in text, that is a complete and ' +
    'auditable workflow. For scanned pages, unfamiliar layouts or values that must be inferred rather than read, it is the wrong tool, ' +
    'and the honest way to evaluate it is on your own documents.'
};
