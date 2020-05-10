import React, { createRef } from "react";

import { useLocalCssVariable } from "../lib/useCssVariable";
import { parseResponsive } from "../lib/responsive";

import styles from "./Text.module.css";

/**
 * Text component inspired by Braid Design System
 * https://github.com/seek-oss/braid-design-system/blob/dc052d40889d6f584971480b21bb6596ff4ec5b1/lib/hooks/typography/basekick.ts
 */
export function Text(props) {
  const className = props.className;
  const size = parseResponsive(props.size || 16);

  const ref = createRef();
  useLocalCssVariable(ref, "--ui-system-text-size", size.mobile);
  useLocalCssVariable(ref, "--ui-system-text-size-tablet", size.tablet);
  useLocalCssVariable(ref, "--ui-system-text-desktop", size.desktop);

  let clsName = [className, styles.Text];
  clsName = clsName.filter(Boolean);
  clsName = clsName.join(" ");

  return (
    <div className={clsName} ref={ref}>
      {props.children}
    </div>
  );
}

export default Text;
