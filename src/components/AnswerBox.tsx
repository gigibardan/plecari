// src/components/AnswerBox.tsx
// Paragraful-răspuns de sus: primul lucru din pagină, răspunde DIRECT la
// întrebarea din titlu. E fragmentul pe care îl "ridică" motoarele AI.
import type {ReactNode} from 'react';

export function AnswerBox({children}: {children: ReactNode}) {
  return (
    <div className="answer-box" role="note">
      {children}
    </div>
  );
}
