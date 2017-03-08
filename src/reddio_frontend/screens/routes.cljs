(ns reddio-frontend.screens.routes
  (:require-macros [secretary.core :refer [defroute]])
  (:require [re-frame.core :as rf]
            [secretary.core :as secretary]
            [pushy.core :as pushy]))

(defroute "/" []
  (rf/dispatch [:route-change "/"]))

(defroute "/about" []
  (rf/dispatch [:route-change "/about"]))

(def history (pushy/pushy
              secretary/dispatch!
              (fn [x] (when (secretary/locate-route x) x))))

(defn hook-history! []
  (secretary/set-config! :prefix "/")
  (pushy/start! history))
