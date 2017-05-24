(ns reddio-frontend.modules.reddit.core
  (:import goog.Uri)
  (:require))

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
