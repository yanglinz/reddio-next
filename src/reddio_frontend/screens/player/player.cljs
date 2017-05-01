(ns reddio-frontend.screens.player.player
  (:require [reagent.core :as r]
            [re-frame.core :as rf]
            [reddio-frontend.bridge :as bridge]))

(def react-player-adapter (r/adapt-react-class bridge/react-player))

(defn main []
  (let [current-post @(rf/subscribe [:post])
        player-state @(rf/subscribe [:player-state])
        playing (not= player-state :paused)
        data {:url (:url current-post)
              :controls true
              :playing playing
              :on-ready #(rf/dispatch [:player-ready])
              :on-start #(rf/dispatch [:player-start])
              :on-play #(rf/dispatch [:player-play])
              :on-progress #(rf/dispatch [:player-progress %])
              :on-duration #(rf/dispatch [:player-duration %])
              :on-pause #(rf/dispatch [:player-pause])
              :on-buffer #(rf/dispatch [:player-buffer])
              :on-ended #(rf/dispatch [:player-ended])
              :on-error #(rf/dispatch [:player-error])
              :youtube-config #js {:preload true}
              :soundcloud-config #js {:clientId (:frontend-sc-client-id bridge/settings)
                                      :showArtwork true}}]
    (when current-post
      [:div
       [:div.player
        [:div.controls
         [:button {:on-click #(rf/dispatch [:player-command-prev])} "Previous"]
         (when (= player-state :playing)
           [:button {:on-click #(rf/dispatch [:player-command-pause])} "Pause"])
         (when (= player-state :paused)
           [:button {:on-click #(rf/dispatch [:player-command-play])} "Play"])
         [:button {:on-click #(rf/dispatch [:player-command-next])} "Next"]]]
       [:div.iframe
        [react-player-adapter data]]])))
