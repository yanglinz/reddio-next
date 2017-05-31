(ns reddio-frontend.modules.reddit.core
  (:import goog.Uri)
  (:require [clojure.string :as string]
            [reddio-frontend.lib.core :as lib]))

(def LISTING_TYPES [:hot
                    :new
                    :rising
                    :top])

(def SORT_TIMES [:hour
                 :day
                 :week
                 :month
                 :year
                 :all])

(defn listing-type [pathname]
  "Get the listing type for a pathname"
  (let [path (.getPath (Uri.parse pathname))
        fragments (string/split path "/")
        type (keyword (last fragments))]
    (when (lib/in? LISTING_TYPES type) type)))

(defn listing-time [pathname]
  "Get the listing time for a pathname"
  (let [query (.getQueryData (Uri.parse pathname))
        type (listing-type pathname)
        time (when (= type :top) (.get query "t"))]
    (when (lib/in? SORT_TIMES (keyword time)) (keyword time))))

(defn listing-pathname [pathname listing-type & [t]]
  "Convert any pathname to a particular listing type pathname"
  (let [path (.getPath (Uri.parse pathname))
        fragments (string/split path "/")
        default-fragments (if (lib/in? (map name LISTING_TYPES) (last fragments))
                            (drop-last fragments)
                            fragments)
        modifed-fragments (if (lib/in? LISTING_TYPES listing-type)
                            (concat default-fragments [(name listing-type)])
                            default-fragments)
        modifed-pathname (string/join "/" modifed-fragments)]
    (if (lib/in? SORT_TIMES t)
      (str modifed-pathname "/?t=" (name t))
      modifed-pathname)))

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
