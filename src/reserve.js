var socketio = require('socket.io');
var express = require('express');
var http = require('http');
var fs = require('fs');

var seats = [
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
];

export const reserveController = (req, res, err) => {
    const path = req.data.map
}