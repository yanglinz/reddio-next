(ns reddio-frontend.core
  (:require [reagent.core :as r]
            [reddio-frontend.bridge :as bridge]
            [reddio-frontend.screens.home :as home]
            [reddio-frontend.screens.listings :as listings]))

(defn app []
  [:> bridge/root-provider
   [listings/listings {:url-path "/r/listentothis"}]])

(r/render-component [app]
                    (. js/document (getElementById "app")))

(defn on-js-reload [])
