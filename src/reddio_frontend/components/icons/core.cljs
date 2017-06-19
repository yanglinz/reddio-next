(ns reddio-frontend.components.icons.core
  (:require))

(defn play-circle []
  [:div.icon-play-circle
   [:svg {:width "24" :height "24" :view-box "0 0 24 24" :xmlns "http://www.w3.org/2000/svg"}
    [:path {:d "M0 0h24v24H0" :fill "none"}]
    [:path {:d "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"}]]])

(defn play-circle-outline []
  [:div.icon-play-circle-outline
   [:svg {:width "24" :height "24" :view-box "0 0 24 24" :xmlns "http://www.w3.org/2000/svg"}
    [:path {:d "M0 0h24v24H0" :fill "none"}]
    [:path {:d "M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"}]]])

(defn pause-circle []
  [:div.icon-pause-circle
   [:svg {:width "24" :height "24" :view-box "0 0 24 24" :xmlns "http://www.w3.org/2000/svg"}
    [:path {:d "M0 0h24v24H0z" :fill "none"}]
    [:path {:d "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"}]]])

(defn queue-music []
  [:div.icon-queue-music
   [:svg {:width "24" :height "24" :view-box "0 0 24 24" :xmlns "http://www.w3.org/2000/svg"}
    [:path {:d "M0 0h24v24H0z" :fill "none"}]
    [:path {:d "M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"}]]])

(defn repeat-one []
  [:div.icon-repeat-one
   [:svg {:width "24" :height "24" :view-box "0 0 24 24" :xmlns "http://www.w3.org/2000/svg"}
    [:path {:d "M0 0h24v24H0z" :fill "none"}]
    [:path {:d "M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-4-2V9h-1l-2 1v1h1.5v4H13z"}]]])

(defn shuffle-switch []
  [:div.icon-repeat-one
   [:svg {:width "24" :height "24" :view-box "0 0 24 24" :xmlns "http://www.w3.org/2000/svg"}
    [:path {:d "M0 0h24v24H0z" :fill "none"}]
    [:path {:d "M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"}]]])

(defn skip-next []
  [:div.icon-skip-next
   [:svg {:width "24" :height "24" :view-box "0 0 24 24" :xmlns "http://www.w3.org/2000/svg"}
    [:path {:d "M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"}]
    [:path {:d "M0 0h24v24H0z" :fill "none"}]]])

(defn skip-previous []
  [:div.icon-repeat-one
   [:svg {:width "24" :height "24" :view-box "0 0 24 24" :xmlns "http://www.w3.org/2000/svg"}
    [:path {:d "M6 6h2v12H6zm3.5 6l8.5 6V6z"}]
    [:path {:d "M0 0h24v24H0z" :fill "none"}]]])
