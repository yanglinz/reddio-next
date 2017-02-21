(ns reddio-frontend.core
  (:require-macros [secretary.core :refer [defroute]])
  (:require [reagent.core :as r]
            [secretary.core :as secretary]
            [pushy.core :as pushy]
            [reddio-frontend.bridge :as bridge]
            [reddio-frontend.screens.home :as home]
            [reddio-frontend.screens.listings :as listings]))

(def history (pushy/pushy
              secretary/dispatch!
              (fn [x] (when (secretary/locate-route x) x))))

(defn hook-history! []
  (secretary/set-config! :prefix "/")
  (pushy/start! history))

(defroute "/" []
  (js/console.log "/"))

(defroute "/about" []
  (js/console.log "/about"))

(defn app []
  [:> bridge/root-provider
   [listings/listings {:url-path "/r/listentothis"}]])

(defn init! []
  (hook-history!)
  (r/render-component [app]
                      (. js/document (getElementById "app"))))

(init!)

(defn on-js-reload [])
