(ns reddio-frontend.core
  (:require-macros [secretary.core :refer [defroute]])
  (:require [reagent.core :as r]
            [reddio-frontend.screens.routes :refer [hook-history!]]
            [reddio-frontend.screens.app :refer [app]]))

(defn render []
  (r/render-component [app]
                      (. js/document (getElementById "app"))))

(defn ^:export run []
  (hook-history!)
  (render))

(defn on-js-reload []
  (render))
