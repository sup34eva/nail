#-------------------------------------------------
#
# Project created by QtCreator 2015-01-14T12:42:34
#
#-------------------------------------------------

QT       += core gui

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = nail
TEMPLATE = app

CONFIG += c++14


SOURCES += sources\main.cpp\
        sources\window.cpp \
    sources\glclass.cpp \
    sources\geometrie.cpp

HEADERS  += headers\window.h \
    headers\glclass.h \
    headers\geometrie.h

FORMS    += interfaces\window.ui

INCLUDEPATH += headers
