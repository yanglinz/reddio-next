(ns reddio-frontend.core
  (:require-macros [secretary.core :refer [defroute]])
  (:require [reagent.core :as r]
            [re-frame.core :as rf]
            [reddio-frontend.lib.core :as lib]
            [reddio-frontend.modules.reddit.core :as reddit]
            [reddio-frontend.screens.routes :refer [hook-history! replace-token!]]
            [reddio-frontend.screens.app :refer [app]]))

(def initial-state {:route "/"
                    :post nil
                    :all-posts []
                    :player-state :uninitialized
                    :duration nil
                    :progress 0
                    :loaded 0})

(rf/reg-event-db :initialize
                 (fn [_ _]
                   initial-state))

(rf/reg-event-db :route-change
                 (fn [db [_ new-path]]
                   (assoc db :route new-path)))

(rf/reg-event-db :play-post
                 (fn [db [_ post all-posts]]
                   (assoc db :post post :all-posts all-posts)))

(defn set-sort-type [cofx event]
  (let [{db :db} cofx
        [_ sort-type] event
        pathname (reddit/listing-pathname (:route db) sort-type)]
    {:db (assoc db :route pathname)
     :change-route pathname}))

(rf/reg-event-fx :set-sort-type set-sort-type)

(defn set-sort-range [cofx event]
  (let [{db :db} cofx
        [_ sort-range] event
        sort-type :top
        pathname (reddit/listing-pathname (:route db) sort-type sort-range)]
    {:db (assoc db :route pathname)
     :change-route pathname}))

(rf/reg-event-fx :set-sort-range set-sort-range)

(defn route-change! [route]
  (replace-token! route))

(rf/reg-fx :change-route route-change!)

(rf/reg-event-db :player-ready
                 (fn [db [_ _]]
                   (assoc db :player-state :ready)))

(rf/reg-event-db :player-start
                 (fn [db [_ _]]
                   (assoc db :player-state :started)))

(rf/reg-event-db :player-play
                 (fn [db [_ _]]
                   (assoc db :player-state :playing)))

(rf/reg-event-db :player-progress
                 (fn [db [_ progress]]
                   (js/console.log :player-progress progress)
                   db))

(rf/reg-event-db :player-duration
                 (fn [db [_ duration]]
                   (js/console.log :player-duration duration)
                   db))

(rf/reg-event-db :player-pause
                 (fn [db [_ _]]
                   (assoc db :player-state :paused)))

(rf/reg-event-db :player-buffer
                 (fn [db [_ _]]
                   (js/console.log :player-buffer)
                   db))

(rf/reg-event-db :player-ended
                 (fn [db [_ _]]
                   (assoc db :post (lib/next-el (filter reddit/playable? (:all-posts db)) (:post db)))))

(rf/reg-event-db :player-error
                 (fn [db [_ _]]
                   (assoc db :post (lib/next-el (filter reddit/playable? (:all-posts db)) (:post db)))))

(rf/reg-event-db :player-command-play
                 (fn [db [_ _]]
                   (assoc db :player-state :playing)))

(rf/reg-event-db :player-command-pause
                 (fn [db [_ _]]
                   (assoc db :player-state :paused)))

(rf/reg-event-db :player-command-next
                 (fn [db [_ _]]
                   (assoc db :post (lib/next-el (filter reddit/playable? (:all-posts db)) (:post db)))))

(rf/reg-event-db :player-command-prev
                 (fn [db [_ _]]
                   (assoc db :post (lib/prev-el (filter reddit/playable? (:all-posts db)) (:post db)))))

(rf/reg-sub :route
            (fn [db _]
              (:route db)))

(rf/reg-sub :post
            (fn [db _]
              (:post db)))

(rf/reg-sub :player-state
            (fn [db _]
              (:player-state db)))

(defn render []
  (r/render-component [app]
                      (.getElementById js/document "app")))

(defn ^:export run []
  (rf/dispatch-sync [:initialize])
  (hook-history!)
  (render))

(defn on-js-reload []
  (render))
