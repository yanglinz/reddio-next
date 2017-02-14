(ns reddio-frontend.core
  (:require [reagent.core :as r]
            [reddio-frontend.bridge :as bridge]
            [reddio-frontend.screens.home :as home]))

(defn app []
  [:> bridge/root-provider
   [home/top-subreddits]])

(r/render-component [app]
                    (. js/document (getElementById "app")))

(defn on-js-reload [])
