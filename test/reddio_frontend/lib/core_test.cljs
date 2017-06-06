(ns reddio-frontend.lib.core-test
  (:require [cljs.test :refer-macros [async deftest is testing]]
            [reddio-frontend.lib.core :as core]))

(deftest next-el-test
  (is (= (core/next-el [1 2 3] 2) 3))
  (is (nil? (core/next-el [1] 1))))
