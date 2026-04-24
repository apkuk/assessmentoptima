/**
 * File: src/features/assessment/components/submitted-answers.tsx
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: Private report appendix showing submitted assessment answers for respondent PDF/export use.
 */
import { likertOptions } from "@/features/assessment/application/assessment-flow";
import { items, scales } from "@/features/assessment/application/model";
import type { AnswerMap } from "@/features/assessment/schemas/assessment";

const answerLabelByValue = new Map(
  likertOptions.map((option) => [option.value, option.label]),
);

export function SubmittedAnswers({ answers }: { answers: AnswerMap }) {
  return (
    <section className="report-card section answer-audit">
      <div className="answer-audit__head">
        <div>
          <p className="panel-label">Submitted answers</p>
          <h2>Answer appendix</h2>
        </div>
        <p>
          Included in the private report for your own records. These item-level
          answers are not part of the public dataset.
        </p>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Domain</th>
              <th>Statement</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const answer = answers[item.id];
              const answerText =
                answer === undefined
                  ? "Not recorded"
                  : `${answer} · ${answerLabelByValue.get(answer)}`;

              return (
                <tr key={item.id}>
                  <td>{scales[item.scale].name}</td>
                  <td>{item.text}</td>
                  <td>{answerText}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
