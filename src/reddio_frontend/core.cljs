(ns reddio-frontend.core
  (:require-macros [secretary.core :refer [defroute]])
  (:require [reagent.core :as r]
            [re-frame.core :as rf]
            [reddio-frontend.modules.reddit.core :as reddit]
            [reddio-frontend.screens.routes :refer [hook-history!]]
            [reddio-frontend.screens.app :refer [app]]))

(def initial-state {:route "/"
                    :post nil
                    :all-posts []
                    :sort-type :hot
                    :sort-range :day
                    :player-state :uninitialized
                    :duration nil
                    :progress 0
                    :loaded 0})

(defn next-el [coll el]
  "Get the next element in a collection"
  (get (zipmap coll (rest coll)) el))

(defn prev-el [coll el]
  "Get the previous element in a collection"
  (get (zipmap (rest coll) coll) el nil))

(rf/reg-event-db :initialize
                 (fn [_ _]
                   initial-state))

(rf/reg-event-db :route-change
                 (fn [db [_ new-path]]
                   (assoc db :route new-path)))

(rf/reg-event-db :play-post
                 (fn [db [_ post all-posts]]
                   (assoc db :post post :all-posts all-posts)))

(rf/reg-event-db :set-sort-type
                 (fn [db [_ sort-type]]
                   (assoc db :sort-type sort-type)))

(rf/reg-event-db :set-sort-range
                 (fn [db [_ sort-range]]
                   (assoc db :sort-range sort-range)))

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
                   (assoc db :post (next-el (filter reddit/playable? (:all-posts db)) (:post db)))))

(rf/reg-event-db :player-error
                 (fn [db [_ _]]
                   (assoc db :post (next-el (filter reddit/playable? (:all-posts db)) (:post db)))))

(rf/reg-event-db :player-command-play
                 (fn [db [_ _]]
                   (assoc db :player-state :playing)))

(rf/reg-event-db :player-command-pause
                 (fn [db [_ _]]
                   (assoc db :player-state :paused)))

(rf/reg-event-db :player-command-next
                 (fn [db [_ _]]
                   (assoc db :post (next-el (filter reddit/playable? (:all-posts db)) (:post db)))))

(rf/reg-event-db :player-command-prev
                 (fn [db [_ _]]
                   (assoc db :post (prev-el (filter reddit/playable? (:all-posts db)) (:post db)))))

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
