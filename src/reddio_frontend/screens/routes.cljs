(ns reddio-frontend.screens.routes
  (:require-macros [secretary.core :refer [defroute]])
  (:require [secretary.core :as secretary]
            [pushy.core :as pushy]))

(defroute "/" []
  (js/console.log "/"))

(defroute "/about" []
  (js/console.log "/about"))

(def history (pushy/pushy
              secretary/dispatch!
              (fn [x] (when (secretary/locate-route x) x))))

(defn hook-history! []
  (secretary/set-config! :prefix "/")
  (pushy/start! history))

