(ns reddio-frontend.bridge
  (:require))

(def react-player (aget js/window "ReactPlayer"))

(def root-provider (aget js/window "modules" "RootProvider"))
(def enhance-listings-query (aget js/window "modules" "enhanceListingsQuery"))
(def enhance-home-top-subreddits-query (aget js/window "modules" "enhanceHomeTopSubredditQuery"))
