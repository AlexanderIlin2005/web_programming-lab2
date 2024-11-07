#!/bin/bash

# Запускаем первую команду в новом окне
osascript -e 'tell application "Terminal" to do script "ssh -p 2222 s381032@se.ifmo.ru -Y -L3565:helios:3565"'

# Пауза для уверенности, что первая команда стартовала
sleep 2

# Запускаем вторую команду в другом новом окне
osascript -e 'tell application "Terminal" to do script "ssh -p 2222 s381032@se.ifmo.ru -Y -L35650:helios:35650"'
