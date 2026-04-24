# Project Documentation

Keep planning and product documents here: PRDs, architecture notes, data schema decisions, privacy notes, and release checklists.

Primary docs:

- [PRD](./PRD.md)
- [Master Backlog](./master_backlog.md)
- [Master Docs](./master-docs/)
- [Environment Variables](./environment.md)

Assessment science source docs:

- [Assessment Science Research](./master-docs/assessment-science/research.md)
- [WorkStyle Compass v2 Audit And Model](./master-docs/assessment-science/workstyle_compass_v2_assessment_audit_and_model.md)
- [WorkStyle Compass v2 Item Bank](./master-docs/assessment-science/workstyle_compass_v2_item_bank.json)

Active plan docs:

- [Frontend Audit](./plans/frontend-audit.md)
- [Frontend Backlog](./plans/frontend-backlog.md)

## Source Of Truth Map

- [PRD](./PRD.md): product scope, success criteria, public routes, and launch boundaries.
- [Assessment Model](./master-docs/assessment-model.md): implemented WorkStyle Compass v2 model, scale labels, item bank, scoring, composites, pressure-drift logic, and archetypes.
- [Assessment Science Research](./master-docs/assessment-science/research.md): behavioural-science basis and validation posture.
- [Application Architecture](./master-docs/application-architecture.md): L0-L5 ownership, dependency rules, and DRY/SSoT contract.
- [Data Architecture](./master-docs/data-architecture.md): MongoDB collections, persistence boundaries, public export shape, and AI data policy.
- [Product Routes And API](./master-docs/product-routes-and-api.md): page inventory, API routes, route-level requirements, and endpoint contracts.
- [Privacy And Open Data](./master-docs/privacy-and-open-data.md): consent, prohibited data, export allowlists, suppression, and privacy copy.
- [AI Analysis](./master-docs/ai-analysis.md): BYOK analysis contract, provider handling, prompt guardrails, and event logging limits.
- [Brand Guidelines](./master-docs/brand-guidelines.md): visual system, CSS token direction, accessibility, and interaction standards.
- [Delivery And QA](./master-docs/delivery-and-qa.md): verification, deployment, manual QA, and roadmap.
- [How I Built This](./master-docs/how-i-built-this.md): public build-story requirements and sprint evidence.
- [Frontend Backlog](./plans/frontend-backlog.md): current UI polish tickets derived from the frontend audit.

`_docs/research.md` has been superseded by `./master-docs/assessment-science/research.md`; do not add new references to the old path.

`StartingThoughts.md` is still at the repository root because it is currently the active working note. Move it into this directory once it is no longer being edited directly.
