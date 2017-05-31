(ns reddio-frontend.modules.reddit.core-test
  (:require [cljs.test :refer-macros [async deftest is testing]]
            [reddio-frontend.modules.reddit.core :as reddit]))

(def l-default-pathname "/r/listentothis")
(def l-hot-pathname "/r/listentothis/hot")
(def l-new-pathname "/r/listentothis/new")
(def l-rising-pathname "/r/listentothis/rising")
(def l-top-default-pathname "/r/listentothis/top")
(def l-top-month-pathname "/r/listentothis/top/?t=month")
(def l-top-all-pathname "/r/listentothis/top/?t=all")
(def l-404-pathname "/foo/bar/baz")

(deftest listing-type
  (is (= (reddit/listing-type l-default-pathname) nil))
  (is (= (reddit/listing-type l-hot-pathname) :hot))
  (is (= (reddit/listing-type l-new-pathname) :new))
  (is (= (reddit/listing-type l-rising-pathname) :rising))
  (is (= (reddit/listing-type l-top-default-pathname) :top))
  (is (= (reddit/listing-type l-top-month-pathname) :top))
  (is (= (reddit/listing-type l-404-pathname) nil)))

(deftest listing-time
  (is (= (reddit/listing-time l-default-pathname) nil))
  (is (= (reddit/listing-time l-hot-pathname) nil))
  (is (= (reddit/listing-time l-new-pathname) nil))
  (is (= (reddit/listing-time l-rising-pathname) nil))
  (is (= (reddit/listing-time l-top-default-pathname) nil))
  (is (= (reddit/listing-time l-top-month-pathname) :month))
  (is (= (reddit/listing-time l-top-all-pathname) :all))
  (is (= (reddit/listing-time l-404-pathname) nil)))

(deftest listing-pathname-default-test
  (is (= (reddit/listing-pathname l-default-pathname :default) l-default-pathname))
  (is (= (reddit/listing-pathname l-hot-pathname :default) l-default-pathname))
  (is (= (reddit/listing-pathname l-new-pathname :default) l-default-pathname))
  (is (= (reddit/listing-pathname l-rising-pathname :default) l-default-pathname))
  (is (= (reddit/listing-pathname l-top-default-pathname :default) l-default-pathname))
  (is (= (reddit/listing-pathname l-top-month-pathname :default) l-default-pathname)))

(deftest listing-pathname-hot-test
  (is (= (reddit/listing-pathname l-default-pathname :hot) l-hot-pathname))
  (is (= (reddit/listing-pathname l-hot-pathname :hot) l-hot-pathname))
  (is (= (reddit/listing-pathname l-new-pathname :hot) l-hot-pathname))
  (is (= (reddit/listing-pathname l-rising-pathname :hot) l-hot-pathname))
  (is (= (reddit/listing-pathname l-top-default-pathname :hot) l-hot-pathname))
  (is (= (reddit/listing-pathname l-top-month-pathname :hot) l-hot-pathname)))

(deftest listing-pathname-top-default-test
  (is (= (reddit/listing-pathname l-default-pathname :top) l-top-default-pathname))
  (is (= (reddit/listing-pathname l-hot-pathname :top) l-top-default-pathname))
  (is (= (reddit/listing-pathname l-new-pathname :top) l-top-default-pathname))
  (is (= (reddit/listing-pathname l-rising-pathname :top) l-top-default-pathname))
  (is (= (reddit/listing-pathname l-top-default-pathname :top) l-top-default-pathname))
  (is (= (reddit/listing-pathname l-top-month-pathname :top) l-top-default-pathname)))

(deftest listing-pathname-top-all-test
  (is (= (reddit/listing-pathname l-default-pathname :top :all) l-top-all-pathname))
  (is (= (reddit/listing-pathname l-hot-pathname :top :all) l-top-all-pathname))
  (is (= (reddit/listing-pathname l-new-pathname :top :all) l-top-all-pathname))
  (is (= (reddit/listing-pathname l-rising-pathname :top :all) l-top-all-pathname))
  (is (= (reddit/listing-pathname l-top-default-pathname :top :all) l-top-all-pathname))
  (is (= (reddit/listing-pathname l-top-month-pathname :top :all) l-top-all-pathname)))
