"use client";

import { useCallback } from "react";
import css from "@/css/globals.css";

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

  return (
    <div
      className={css.result_box}
      dangerouslySetInnerHTML={{
        __html: textToHtml(resultText),
      }}
    ></div>
  );
};

export default ViewResultPage;
