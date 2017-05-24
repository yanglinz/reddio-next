(ns reddio-frontend.lib.core
  (:require [clojure.walk :as w]
            [camel-snake-kebab.core :refer [->kebab-case-keyword]]))

(defn kebab-case-keywordize-keys
  "Recursively transforms all map keys from strings to kebab-case keywords."
  [m]
  (let [f (fn [[k v]] (if (string? k) [(->kebab-case-keyword k) v] [k v]))]
    (w/postwalk (fn [x] (if (map? x) (into {} (map f x)) x)) m)))
