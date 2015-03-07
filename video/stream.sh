#!/bin/bash

raspivid -o - -t 0 -w 800 -h 400 -fps 24 |cvlc -vvv stream:///dev/stdin --sout '#standard{access=http,mux=ts,dst=0.0.0.0:8080}' :demux=h264