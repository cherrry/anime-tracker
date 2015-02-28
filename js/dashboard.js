"use strict";

var React = require("react");

var Dashboard = require("./dashboard/Dashboard.jsx");

var anime_feeds = document.getElementById('anime-feeds');
React.render(React.createElement(Dashboard), anime_feeds);
