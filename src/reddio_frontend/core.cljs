(ns reddio-frontend.core
  (:require-macros [secretary.core :refer [defroute]])
  (:require [reagent.core :as r]
            [secretary.core :as secretary]
            [pushy.core :as pushy]
            [reddio-frontend.bridge :as bridge]
            [reddio-frontend.screens.listings.listings :as listings]))

(defroute "/" []
  (js/console.log "/"))

(defroute "/about" []
  (js/console.log "/about"))

(defn app []
  [:> bridge/root-provider
   [listings/listings {:url-path "/r/listentothis"}]])

(def history (pushy/pushy
              secretary/dispatch!
              (fn [x] (when (secretary/locate-route x) x))))

(defn hook-history! []
  (secretary/set-config! :prefix "/")
  (pushy/start! history))

(defn render []
  (r/render-component [app]
                      (. js/document (getElementById "app"))))

(defn ^:export run []
  (hook-history!)
  (render))

(defn on-js-reload []
  (render))
