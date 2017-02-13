(ns reddio-frontend.core
  (:require [reagent.core :as reagent :refer [atom]]))

(enable-console-print!)

(println "This text is printed from src/reddio-next/core.cljs. Go ahead and edit it and see reloading in action.")

;; define your app data so that it doesn't get over-written on reload

(defonce app-state (atom {:text "Hello world!"}))

(def root-provider (aget js/window "modules" "RootProvider"))
(def home-top-subreddits(aget js/window "modules" "HomeTopSubreddits"))

(defn hello-world []
  [:div
   [:h1 (:text @app-state)]
   [:h2 "Another one!"]
   [:> root-provider
    [:> home-top-subreddits]]])

(reagent/render-component [hello-world]
                          (. js/document (getElementById "app")))

(defn on-js-reload []
  ;; optionally touch your app-state to force rerendering depending on
  ;; your application
  ;; (swap! app-state update-in [:__figwheel_counter] inc)
)
