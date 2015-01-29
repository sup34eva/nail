#include <window.h>
#include "ui_window.h"
#include <QOpenGLWidget>
#include <QColorDialog>
#include <QFileDialog>

Window::Window(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::Window)
    {
        ui->setupUi(this);
        widget = new QOpenGLWidget;
    }

Window::~Window()
{
    delete ui;
}


void Window::on_actionColorer_triggered()
{
    QColorDialog::getColor(QColor(1, 1, 1), this, "Couleur");
}




void Window::on_actionEnregistrer_sous_triggered()
{
    auto nouveau = QFileDialog::getSaveFileName(this, tr("Enregistrer sous"), QString(), tr("Nail World File (*.nwf)"));
    QFile fichier(nouveau);
    fichier.open(QIODevice::WriteOnly);
}
