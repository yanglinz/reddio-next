import { useLayoutEffect as _useLayoutEffect } from "react";

const isClient = typeof window !== "undefined";
const noop = () => {};
const useLayoutEffect = isClient ? _useLayoutEffect : noop;

function formatValue(value) {
  let formatted = value;
  if (Number.isInteger(value)) {
    formatted = `${value}px`;
  }
  return formatted;
}

export function useGlobalCssVariable(name, value) {
  useLayoutEffect(() => {
    document.documentElement.style.setProperty(name, formatValue(value));
  }, [name, value]);
}

export function useLocalCssVariable(ref, name, value) {
  useLayoutEffect(() => {
    ref.current.style.setProperty(name, formatValue(value));
  }, [ref, name, value]);
}
