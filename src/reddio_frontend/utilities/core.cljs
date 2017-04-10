(ns reddio-frontend.utilities.core
  (:import goog.Uri)
  (:require [clojure.walk :as w]
            [camel-snake-kebab.core :refer [->kebab-case-keyword]]))

(defn kebab-case-keywordize-keys
  "Recursively transforms all map keys from strings to kebab-case keywords."
  [m]
  (let [f (fn [[k v]] (if (string? k) [(->kebab-case-keyword k) v] [k v]))]
    (w/postwalk (fn [x] (if (map? x) (into {} (map f x)) x)) m)))

(defn youtube? [domain]
  "Predicate for whether a post is a youtube post"
  (or (= domain "www.youtube.com") (= domain "youtu.be")))

(defn soundcloud? [domain]
  "Predicate for whether a post is a soundcloud post"
  (= domain "soundcloud.com"))

(defn playable? [post]
  "Predicate for whether a post is playable"
  (let [domain (.getDomain (Uri.parse (:url post)))]
    (or (youtube? domain) (soundcloud? domain))))
