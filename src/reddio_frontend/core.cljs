(ns reddio-frontend.core
  (:require-macros [secretary.core :refer [defroute]])
  (:require [reagent.core :as r]
            [reddio-frontend.bridge :as bridge]
            [reddio-frontend.screens.routes :refer [hook-history!]]
            [reddio-frontend.components.header :as header]
            [reddio-frontend.screens.listings.listings :as listings]))

(defn app []
  [:> bridge/root-provider
   [:div.app
    [header/header]
    [listings/listings {:url-path "/r/listentothis"}]]])

(defn render []
  (r/render-component [app]
                      (. js/document (getElementById "app"))))

(defn ^:export run []
  (hook-history!)
  (render))

(defn on-js-reload []
  (render))
