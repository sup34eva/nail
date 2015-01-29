#ifndef WINDOW_H
#define WINDOW_H

#include <QMainWindow>
#include <QOpenGLWidget>

namespace Ui {
class Window;
}
class QOpenGLWidget;

class Window : public QMainWindow
{
    Q_OBJECT

public:
    explicit Window(QWidget *parent = 0);
    ~Window();

private slots:
    void on_actionColorer_triggered();


    void on_actionEnregistrer_sous_triggered();

private:
    Ui::Window *ui;
    QOpenGLWidget *widget;
};

#endif // WINDOW_H
