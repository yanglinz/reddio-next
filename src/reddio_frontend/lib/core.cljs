(ns reddio-frontend.lib.core
  (:require [clojure.walk :as w]
            [camel-snake-kebab.core :refer [->kebab-case-keyword]]))

(defn next-el [coll el]
  "Get the next element in a collection"
  (get (zipmap coll (rest coll)) el))

(defn prev-el [coll el]
  "Get the previous element in a collection"
  (get (zipmap (rest coll) coll) el nil))

(defn kebab-case-keywordize-keys
  "Recursively transforms all map keys from strings to kebab-case keywords."
  [m]
  (let [f (fn [[k v]] (if (string? k) [(->kebab-case-keyword k) v] [k v]))]
    (w/postwalk (fn [x] (if (map? x) (into {} (map f x)) x)) m)))
