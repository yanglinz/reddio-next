(ns reddio-frontend.bridge)

(def root-provider (aget js/window "modules" "RootProvider"))
(def home-top-subreddits (aget js/window "modules" "HomeTopSubreddits"))
