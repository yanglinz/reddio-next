import React from "react";
import classNames from "classnames";

import styles from "./Text.module.scss";

export function Heading1(props) {
  const size = props.size || "m";
  const clsName = classNames([
    styles.Text,
    styles[`Text-${size}`],
    props.className
  ]);
  return <h1 className={clsName}>{props.children}</h1>;
}

export function Heading2(props) {
  const size = props.size || "m";
  const clsName = classNames([
    styles.Text,
    styles[`Text-${size}`],
    props.className
  ]);
  return <h2 className={clsName}>{props.children}</h2>;
}

export function Heading3(props) {
  const size = props.size || "m";
  const clsName = classNames([
    styles.Text,
    styles[`Text-${size}`],
    props.className
  ]);
  return <h3 className={clsName}>{props.children}</h3>;
}

export function Heading4(props) {
  const size = props.size || "m";
  const clsName = classNames([
    styles.Text,
    styles[`Text-${size}`],
    props.className
  ]);
  return <h4 className={clsName}>{props.children}</h4>;
}

export function Heading5(props) {
  const size = props.size || "m";
  const clsName = classNames([
    styles.Text,
    styles[`Text-${size}`],
    props.className
  ]);
  return <h5 className={clsName}>{props.children}</h5>;
}

export function Heading6(props) {
  const size = props.size || "m";
  const clsName = classNames([
    styles.Text,
    styles[`Text-${size}`],
    props.className
  ]);
  return <h6 className={clsName}>{props.children}</h6>;
}

export function Text(props) {
  const size = props.size || "m";
  const clsName = classNames([
    styles.Text,
    styles[`Text-${size}`],
    props.className
  ]);
  return <p className={clsName}>{props.children}</p>;
}
