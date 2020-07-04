import {useState} from "react";

const isSSR = typeof window === "undefined";

export const setCookie = (name, value, options) => {
  const optionsWithDefaults = {
    days: 365,
    path: "/",
    ...options,
  };
  const expires = new Date(
    Date.now() + optionsWithDefaults.days * 864e5
  ).toUTCString();
  // eslint-disable-next-line no-undef
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=${optionsWithDefaults.path}; SameSite=Lax`;
};

export const getCookie = (name) => {
  // eslint-disable-next-line no-undef
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");
};

export default function (key, initialValue) {
  if (isSSR) {
    return [undefined, () => {
    }];
  }
  const [item, setItem] = useState(() => {
    return getCookie(key) || initialValue;
  });

  const updateItem = (value, options) => {
    setItem(value);
    setCookie(key, value, options);
  };

  return [item, updateItem];
}
