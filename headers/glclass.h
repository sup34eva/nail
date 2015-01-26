#ifndef GLCLASS_H
#define GLCLASS_H

#include <QOpenGLWidget>
#include <QOpenGLFunctions>
#include <QOpenGLShader>
#include <QOpenGLShaderProgram>
#include <QOpenGLBuffer>


class GLclass : public QOpenGLWidget, protected QOpenGLFunctions
{
public:
    GLclass(QWidget* parent = 0);
    ~GLclass();
    QSize sizeHint() const {  return QSize(400, 400); }

protected:
    void initializeGL();
    void paintGL();
    //void resizeGL(int width, int height);

private:

    QOpenGLShaderProgram m_program;
    static QOpenGLBuffer* vertex_buffer;
    static QOpenGLBuffer* indice_buffer;
    GLuint VertexArrayID;

    std::vector<GLfloat> vertices;
    std::vector<quint32> indices;

};

#endif // GLCLASS_H
