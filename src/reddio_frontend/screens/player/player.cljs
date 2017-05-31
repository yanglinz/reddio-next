(ns reddio-frontend.screens.player.player
  (:require [reagent.core :as r]
            [re-frame.core :as rf]
            [reddio-frontend.bridge :as bridge]
            [reddio-frontend.components.icons :as icons]))

(def WIDTH 640)
(def HEIGHT 360)
(def COMPACT_WIDTH 320)
(def COMPACT_HEIGHT 180)

(def react-player-adapter (r/adapt-react-class bridge/react-player))

(defn main-controls [current-post player-state]
  (let [initialized (not (nil? current-post))
        playing (not= player-state :paused)
        no-op identity]
    [:div.controls
     {:class (str (if initialized "initialized" "uninitialized"))}
     [:div.control.control-shuffle
      {:on-click no-op}
      [icons/shuffle-switch]]
     [:div.control.control-prev
      {:on-click (if initialized #(rf/dispatch [:player-command-prev]) no-op)}
      [icons/skip-previous]]
     (if (= player-state :paused)
       [:div.control.control-play
        {:on-click (if initialized #(rf/dispatch [:player-command-play]) no-op)}
        [icons/play-circle]]
       [:div.control.control-pause
        {:on-click (if initialized #(rf/dispatch [:player-command-pause]) no-op)}
        [icons/pause-circle]])
     [:div.control.control-next
      {:on-click (if initialized #(rf/dispatch [:player-command-next]) no-op)}
      [icons/skip-next]]
     [:div.control.control-repeat
      {:on-click no-op}
      [icons/repeat-one]]]))

(defn main []
  (let [current-post @(rf/subscribe [:post])
        player-state @(rf/subscribe [:player-state])
        route @(rf/subscribe [:route])
        initialized (not (nil? current-post))
        playing (not= player-state :paused)
        compact? (= route "/")]
    [:div
     [:div.player
      [main-controls current-post player-state]]
     (when initialized
       [:div.iframe
        (let [data {:url (:url current-post)
                    :width (if compact? COMPACT_WIDTH WIDTH)
                    :height (if compact? COMPACT_HEIGHT HEIGHT)
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
          [react-player-adapter data])])]))
