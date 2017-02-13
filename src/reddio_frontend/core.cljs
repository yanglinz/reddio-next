(ns reddio-frontend.core
  (:require [reagent.core :as reagent :refer [atom]]
            [reddio-frontend.bridge :as bridge]))

(defn hello-world []
  [:div
   [:h1 "Hello world!"]
   [:> bridge/root-provider
    [:> bridge/home-top-subreddits]]])

(reagent/render-component [hello-world]
                          (. js/document (getElementById "app")))

(defn on-js-reload [])
