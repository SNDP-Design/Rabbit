# Rabbit intelligence decision framework

## Decision objective

Answer: “What does this product appear to be, who is it for, how does it create value, and what should a human investigate or do next?”

## Decision inputs

- the normalized knowledge base
- exact source excerpts and source URLs
- evidence coverage and unknown fields
- page type diversity and crawl failures

## Decision output

- headline: the most important evidence-backed conclusion
- confidence: high, medium, or low
- recommendation: the next practical action
- priority signals: the strongest supporting patterns
- risks: uncertainty, unsupported claims, or material caveats
- next questions: what customer or internal evidence is still needed

## Judgment rules

- collective evidence beats a single attractive homepage sentence
- repeated claims across independent pages increase confidence, but repetition is not independent proof
- explicit website statements may be FACT; interpretation is INFERENCE; missing support is UNKNOWN
- a competitor is valid only when named or clearly present in comparison content
- public website evidence cannot establish revenue, retention, conversion, product quality, or regulatory status unless explicitly stated
