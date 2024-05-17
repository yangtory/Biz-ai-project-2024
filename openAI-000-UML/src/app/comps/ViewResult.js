"use client";

import { useCallback } from "react";
import Mermaid from "../modules/Mermaid";

const ViewResultPage = ({ resultText }) => {
  // 문자열 결과 쪼개기
  const textToHtml = useCallback((text) => {
    const textList = text.split("\n");

    let flag = false;

    const result = textList.map((t) => {
      if (!flag && t.trim().startsWith("```")) {
        flag = true;
        return `<pre class="mermaid_code">`;
      } else if (flag && t.trim().startsWith("```")) {
        flag = false;
        return `</pre>`;
      } else if (flag) {
        return `${t}\n`;
      }
      return `${t}<br>`;
    });
    // 분해된 문자열 다시 하나로 만들기
    return result.join("");
  });

  const getMermaid = useCallback((text) => {
    const textList = text.split("\n");
    let flag = false;
    const result = textList.map((t) => {
      if (t.trim().startsWith("```mermaid")) {
        flag = true;
        return "";
        // flag 가 true 인데 다시 ``` 만나면
      } else if (flag && t.trim().startsWith("```")) {
        flag = false;
        return "\n\n";
      } else if (flag) {
        return `${t}\n`;
      } else {
        return "\n";
      }
    });
    return result.join("\n");
  });
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: textToHtml(resultText),
        }}
      ></div>
      {resultText?.includes("```mermaid") && (
        <Mermaid chart={getMermaid(resultText)} />
      )}
    </>
  );
};

export default ViewResultPage;
