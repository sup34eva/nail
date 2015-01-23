#include <window.h>
#include "ui_window.h"
#include <QOpenGLWidget>

Window::Window(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::Window)
    {
        ui->setupUi(this);
        widget = new QOpenGLWidget;
        this->setWindowTitle("Nail Creator");
    }

Window::~Window()
{
    delete ui;
}
