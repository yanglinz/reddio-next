(ns reddio-frontend.bridge
  (:require [reagent.core :as r]))

(def root-provider (aget js/window "modules" "RootProvider"))
(def enhance-home-top-subreddits-query (aget js/window "modules" "enhanceHomeTopSubredditQuery"))
