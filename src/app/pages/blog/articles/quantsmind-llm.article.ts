import { BlogArticle } from '../blog-article.model';

export const QUANTSMIND_LLM: BlogArticle = {
  slug: 'quantsmind-llm',
  category: 'Technology',
  title: 'QuantsMind-LLM: Training a Code Language Model from Scratch',
  summary:
    'An open research project implementing a Transformer from scratch — RMSNorm, rotary embeddings, grouped-query attention and SwiGLU — ' +
    'with its own byte-pair-encoding tokenizer, training and fine-tuning loops, and local inference plus an HTTP serving path. ' +
    'This article describes what is implemented and why its published figures are not comparable to benchmark results.',
  maturity: 'Research prototype · no validated release',
  maturityVariant: 'research',
  intro:
    'Language models are usually encountered as finished artefacts, which hides the parts that are genuinely interesting: how a corpus ' +
    'becomes tokens, how those tokens become a training objective, and what the model is actually able to do once trained. ' +
    'QuantsMind-LLM is a research prototype that implements that whole path explicitly, in code you can read. Its value is as a working ' +
    'illustration of the machinery; its figures, as this article will be equally explicit about, are not a benchmark result and should ' +
    'not be read as one.',
  sections: [
    {
      heading: 'The Transformer as implemented here',
      blocks: [
        {
          kind: 'p',
          text:
            'The Transformer is the sequence model that displaced recurrence in most language-modelling work, and its defining mechanism is ' +
            'attention: every position computes a weighted combination of all other positions in the sequence, which makes training highly ' +
            'parallel because the computation for one position does not depend on finishing the previous one. The project implements ' +
            'that architecture directly rather than depending on a framework that provides it, and uses several components now standard ' +
            'in the design.'
        },
        {
          kind: 'p',
          text:
            'RMSNorm normalises activations by their root-mean-square rather than by their mean and variance, which is cheaper than full ' +
            'normalisation. Rotary position embeddings encode position by rotating query and key vectors according to their index, so ' +
            'relative position is represented without an added positional vector. Grouped-query attention shares key and value heads across ' +
            'several query heads, cutting the size of the key-value cache that inference needs. SwiGLU is the gated feed-forward block used ' +
            'in place of a plain two-layer network.'
        },
        {
          kind: 'card',
          card: 'concept',
          title: 'Why these four components travel together',
          body:
            'They are independent ideas that happen to compose well. RMSNorm keeps activations stable without a mean-subtraction pass. ' +
            'Rotary embeddings add position without a learned positional table. Grouped-query attention trades a little capacity for a much ' +
            'smaller inference cache. SwiGLU increases the effective parameter count of the feed-forward block. Modern small models tend ' +
            'to adopt all four together because they were found to work well together, not because they depend on each other.'
        },
        {
          kind: 'card',
          card: 'implementation',
          title: 'What is implemented rather than borrowed',
          body:
            'The architecture, the tokenizer, the training loop, the fine-tuning loop, local inference and an HTTP serving path are all ' +
            'part of the project. Nothing in the stack is delegated to a modelling framework, which is the point of the exercise.',
          points: [
            'Model: Transformer with RMSNorm, rotary embeddings, grouped-query attention, SwiGLU',
            'Tokenizer: byte-pair encoding trained by the project',
            'Training: full training and fine-tuning loops',
            'Inference: local execution plus a FastAPI service for completion and review',
            'Licence: Apache 2.0'
          ]
        }
      ]
    },
    {
      heading: 'From corpus to tokens',
      blocks: [
        {
          kind: 'p',
          text:
            'Language models operate on tokens, not characters or words, and byte-pair encoding derives its vocabulary from the corpus ' +
            'itself: frequent adjacent symbol pairs are merged repeatedly until a target vocabulary size is reached. The advantage over a ' +
            'word-level vocabulary is that no token is out of vocabulary — arbitrary text, including identifiers with unusual ' +
            'spelling, can always be decomposed — at the cost of sequences that are longer for text the corpus does not resemble.'
        },
        {
          kind: 'p',
          text:
            'For a code-oriented model this matters more than for natural language. Source code is full of identifiers that appear a ' +
            'handful of times, and a tokenizer trained on prose will shatter them into pieces, wasting context and making the model\'s job ' +
            'harder. The project therefore trains its own tokenizer on its own corpus.'
        },
        {
          kind: 'card',
          card: 'distinction',
          title: 'A trained tokenizer is only as good as its corpus',
          body:
            'Byte-pair encoding produces merges from frequency in the data it was shown. That makes it sensitive to the training set: a ' +
            'tokenizer fitted on general text handles code poorly, and a tokenizer fitted on a small corpus produces a vocabulary whose ' +
            'merges generalise badly to anything outside that corpus.'
        }
      ]
    },
    {
      heading: 'Training, evaluation and what the numbers mean',
      blocks: [
        {
          kind: 'p',
          text:
            'The training and fine-tuning loops are implemented in the repository, and the model is code-oriented. What matters for ' +
            'anyone assessing the results is that several of the artefacts needed to reproduce the reported configuration are not actually ' +
            'present, and that is where interpretation has to be careful.'
        },
        {
          kind: 'p',
          text:
            'The code corpus committed to the repository is far smaller than the shipped training configuration requests. The committed ' +
            'tokenizer vocabulary does not match the size that configuration declares. And the code-generation evaluation runs on a small ' +
            'set of hand-written problems rather than the full HumanEval and MBPP suites that the project names. Each of these is a ' +
            'discrepancy between what is claimed and what is present, and together they mean the reported figures cannot be reproduced ' +
            'from the repository as it stands.'
        },
        {
          kind: 'card',
          card: 'maturity',
          title: 'The figures are not benchmark results',
          body:
            'Because the training data is smaller than the configuration expects, the tokenizer does not match the declared vocabulary ' +
            'and the evaluation is a small hand-written set rather than the named public suites, the reported numbers cannot be compared ' +
            'to published benchmark results, and no independent assessment of model quality has been carried out.',
          points: [
            'Release: none published; no version validated',
            'Stage: described by the project as a local prototype',
            'Code corpus committed: smaller than the training configuration requests',
            'Tokenizer vocabulary committed: does not match the declared size',
            'Code evaluation: a small hand-written problem set, not HumanEval or MBPP',
            'Independent quality assessment: none'
          ]
        },
        {
          kind: 'card',
          card: 'distinction',
          title: 'Implementation completeness is not model quality',
          body:
            'It is entirely possible for a repository to contain a correct Transformer implementation, a working tokenizer, a functioning ' +
            'training loop and a serving path, and for the resulting model to be poor at code. Those are different questions, and a ' +
            'well-organised implementation is evidence about the first rather than the second.'
        }
      ]
    },
    {
      heading: 'Inference and serving',
      blocks: [
        {
          kind: 'p',
          text:
            'For local use the model runs in-process, which keeps evaluation reproducible and removes a network dependency. For serving ' +
            'there is a FastAPI path exposing completion and review endpoints. Serving does not change what the model can do; it changes ' +
            'who can ask it to do something, and therefore what isolation is needed around it.'
        },
        {
          kind: 'card',
          card: 'requirements',
          title: 'Resource expectations',
          body:
            'Training a Transformer from scratch is a compute-bound activity whose cost is dominated by the corpus size and context length ' +
            'chosen in configuration. Inference is far cheaper but scales with model size and sequence length.',
          points: [
            'Training: dominated by the corpus size and context length in the configuration',
            'Inference: local in-process execution available',
            'Serving: HTTP API for completion and review',
            'Licence: Apache 2.0'
          ]
        }
      ]
    }
  ],
  verification: [
    { label: 'QuantsMind-LLM on the Technology Ecosystem page', route: '/technology' }
  ],
  conclusion:
    'QuantsMind-LLM is a transparent, from-scratch implementation of the modern language-model recipe — architecture, tokenizer, training ' +
    'and serving — that is genuinely useful as a reference. It is not a capable released model: no version has been validated, the ' +
    'committed data and tokenizer do not match the shipped configuration, and its evaluation is far smaller than the benchmarks it ' +
    'names, so its figures should be treated as illustrations rather than measurements.'
};
