(ns reddio-frontend.core
  (:require-macros [secretary.core :refer [defroute]])
  (:require [reagent.core :as r]
            [re-frame.core :as rf]
            [reddio-frontend.screens.routes :refer [hook-history!]]
            [reddio-frontend.screens.app :refer [app]]))

(def initial-state {:route "/"
                    :post nil
                    :all-posts []
                    :sort-type :hot
                    :sort-range nil })

(rf/reg-event-db :initialize
                 (fn [_ _]
                   initial-state))

(rf/reg-event-db :route-change
                 (fn [db [_ new-path]]
                   (assoc db :route new-path)))

(rf/reg-event-db :play-post
                 (fn [db [_ post all-posts]]
                   (assoc db :post post :all-posts all-posts)))

(rf/reg-sub :route
            (fn [db _]
              (:route db)))

(rf/reg-sub :post
            (fn [db _]
              (:post db)))

(rf/reg-sub :sort-type
            (fn [db _]
              (:sort-type db)))

(rf/reg-sub :sort-range
            (fn [db _]
              (:sort-range db)))

(defn render []
  (r/render-component [app]
                      (. js/document (getElementById "app"))))

(defn ^:export run []
  (rf/dispatch-sync [:initialize])
  (hook-history!)
  (render))

(defn on-js-reload []
  (render))
