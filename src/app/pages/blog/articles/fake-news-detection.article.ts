import { BlogArticle } from '../blog-article.model';

export const FAKE_NEWS_DETECTION: BlogArticle = {
  slug: 'quantsmind-fake-news-detection',
  category: 'Labs',
  title: 'QuantsMind AI Fake News Detection: A Feasibility Study',
  summary:
    'A feasibility study into classifying news text, containing a cleaning pipeline, a training script, an evaluation harness and a small ' +
    'HTTP prediction service, with a Dockerfile and Python packaging configuration. Its reported accuracy comes from a synthetic ' +
    'template-generated dataset and must not be relied on.',
  maturity: 'Feasibility study · accuracy not validated',
  maturityVariant: 'prototype',
  intro:
    'Automatic fake-news detection is one of those problems where the demo and the deployment look identical and behave completely ' +
    'differently. A classifier trained on real news and machine-generated text can reach a near-perfect score in a controlled setting and ' +
    'still fail on the first document it meets in the wild, because the training data taught it the difference between two data ' +
    'collection processes rather than the difference between true and false claims. This project is an honest feasibility study that ' +
    'documents itself in exactly those terms, which makes it worth reading as a case study in how such numbers come about.',
  sections: [
    {
      heading: 'Preprocessing and training',
      blocks: [
        {
          kind: 'p',
          text:
            'The study is structured as a conventional text-classification pipeline. A cleaning stage normalises raw news items — lowercasing, ' +
            'removing punctuation and other artefacts, stripping stop words and normalising whitespace — so that the model sees words ' +
            'rather than formatting. A training script fits a classifier on those cleaned texts with the item\'s headline and body as the ' +
            'features and its label as the target. A packaging configuration makes the whole thing installable, and a Dockerfile defines ' +
            'the environment it runs in.'
        },
        {
          kind: 'p',
          text:
            'Cleaning at this stage is conventional and mostly uncontroversial. The consequential design decision is not in the pipeline ' +
            'but in the data, and it is the subject of the section below — because a perfectly reasonable pipeline over data that does ' +
            'not represent the target distribution produces a number that means nothing while looking entirely convincing.'
        },
        {
          kind: 'card',
          card: 'implementation',
          title: 'What the study contains',
          body:
            'The repository holds a cleaning pipeline, a training script, an evaluation harness, a small HTTP prediction service, a ' +
            'Dockerfile and Python packaging configuration — the full set of pieces needed to demonstrate the approach end to end, and ' +
            'nothing that would make it an operational system.',
          points: [
            'Pipeline: text cleaning and normalisation',
            'Training: a script that fits a classifier on cleaned text',
            'Evaluation: a harness producing a committed report',
            'Service: a small HTTP prediction endpoint',
            'Packaging: Dockerfile and Python packaging configuration',
            'Licence: no licence file present'
          ]
        }
      ]
    },
    {
      heading: 'Why the reported accuracy is not a result',
      blocks: [
        {
          kind: 'p',
          text:
            'The committed evaluation report shows a perfect score. That score was measured on a synthetic dataset generated from a ' +
            'handful of title and body templates. When one class of documents is assembled from a few templates and the other from ' +
            'different few templates, the templates themselves are a perfect classifier — any model that learns the templates scores ' +
            '100%, and one that has learned nothing meaningful may score the same.'
        },
        {
          kind: 'p',
          text:
            'This is synthetic-data leakage in its simplest form: the thing the model is being asked to learn is present in the data in ' +
            'a form that does not exist in the real problem. Real fake and real genuine news overlap in vocabulary, style and sources; ' +
            'they are written by the same kind of people, about the same kind of events, often by copying each other. A synthetic set with ' +
            'disjoint templates has none of that difficulty, so the score measures template separation rather than claim verification.'
        },
        {
          kind: 'card',
          card: 'distinction',
          title: 'Template separation versus fact verification',
          body:
            'The study measures how well a classifier separates two generation processes. The task people want is determining whether a ' +
            'specific claim is true, which requires evidence about the world rather than about how a text was produced. Those are ' +
            'different problems, and a score from the first says nothing about the second.'
        },
        {
          kind: 'card',
          card: 'example',
          title: 'Why a perfect score is a warning sign',
          body:
            'On genuinely hard classification problems, a perfect score almost always indicates a leak between training and evaluation ' +
            'data, a synthetic source that is separable by construction, or an evaluation that reuses training examples. Any of those ' +
            'makes the number a measurement of the setup rather than of the model.'
        }
      ]
    },
    {
      heading: 'Inference without a trained checkpoint',
      blocks: [
        {
          kind: 'p',
          text:
            'No trained model checkpoint is included in the project, and the consequence is more serious than a missing convenience file. ' +
            'When no checkpoint is present, the prediction service falls back to loading an untuned base model with an untrained ' +
            'classification head. A classifier head that has never been trained produces essentially arbitrary outputs — in the worst case ' +
            'a constant class — and those outputs are returned by a service that looks and behaves like a working classifier.'
        },
        {
          kind: 'p',
          text:
            'That is the most dangerous failure mode in the whole project, because it does not announce itself. There is no exception, no ' +
            'refusal and no degraded mode: the service responds confidently with a label derived from an untrained head. Any consumer of ' +
            'the service would have no way to distinguish that from a trained model\'s output.'
        },
        {
          kind: 'card',
          card: 'distinction',
          title: 'A responding service is not a working classifier',
          body:
            'HTTP 200 with a label in the body demonstrates that the service is reachable and the request path works. It says nothing about ' +
            'the model behind it. When the model is untuned, the response is well-formed and meaningless.'
        }
      ]
    },
    {
      heading: 'What error would mean in a real deployment',
      blocks: [
        {
          kind: 'p',
          text:
            'Even with training data and a checkpoint, this class of system carries two failure directions that matter differently. A false ' +
            'positive labels genuine reporting as false, which can discredit legitimate journalism and is usually the error that damages ' +
            'trust most. A false negative lets fabricated material pass, which compounds over time because false stories are shared more ' +
            'widely than corrections.'
        },
        {
          kind: 'p',
          text:
            'Neither direction can be tuned away by accuracy alone, because the cost of the two errors is asymmetric and context-dependent: ' +
            'a classifier used by an archive needs very few false positives, while one used to prioritise review may tolerate them in ' +
            'exchange for catching more fabrications. A single accuracy figure conceals that choice entirely.'
        },
        {
          kind: 'card',
          card: 'concept',
          title: 'False positives and false negatives, in practice',
          body:
            'A false positive marks true reporting as fake. A false negative passes fabricated content as genuine. Because false material ' +
            'travels further than corrections while the penalty for wrongly discrediting a source falls on that source, the two errors ' +
            'carry different costs, and a system should be tuned against those costs rather than against overall accuracy.'
        }
      ]
    },
    {
      heading: 'Maturity and limitations',
      blocks: [
        {
          kind: 'p',
          text:
            'This is documented as a feasibility study, and the limitations are unusually well recorded for a project at this stage. The ' +
            'reported accuracy is not independently validated and must not be relied on; the synthetic dataset cannot measure ' +
            'real-world detection; no trained checkpoint ships; and the service\'s behaviour without one is not evidence of model ' +
            'performance. There is no licence file and no release.'
        },
        {
          kind: 'card',
          card: 'maturity',
          title: 'Feasibility study, with accuracy explicitly unvalidated',
          body:
            'The project demonstrates that the approach can be assembled and measured. It makes no claim about real-world accuracy, and ' +
            'the framework in which it should be read is the framework of a feasibility study.',
          points: [
            'Stage: feasibility study; no release and no licence file',
            'Evaluation data: synthetic, generated from a small set of title and body templates',
            'Reported score: perfect, and therefore uninformative about real-world detection',
            'Checkpoint: none included; service falls back to an untuned base model with an untrained head',
            'Not provided: an independently validated accuracy figure'
          ]
        }
      ]
    }
  ],
  verification: [
    { label: 'QuantsMind AI Fake News Detection System on the QuantsMind Labs page', route: '/labs' }
  ],
  conclusion:
    'QuantsMind AI Fake News Detection System is a well-documented feasibility study: a cleaning pipeline, a training script, an ' +
    'evaluation harness and a prediction service, assembled correctly and honestly labelled. Its perfect score comes from separable ' +
    'synthetic templates and measures nothing about real-world detection, and its service returns confident labels from an untrained ' +
    'head when no checkpoint is present. It should be read as an exercise in methodology, never as a fact-checking system.'
};
